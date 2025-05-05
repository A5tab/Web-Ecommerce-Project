import { useForm, Controller } from "react-hook-form";
import { formFields } from "./formFields";
import { useState } from "react";
import { Input, Select, RTE, FileInput } from "../formscomponents"
import { ToastContainer, toast } from "react-toastify";
import { useAdminProducts } from "../../context/AdminProductsProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function ProductForm({ handleFormModel, product }) {

    const axiosPrivate = useAxiosPrivate();
    const { state, dispatch } = useAdminProducts();

    if (state.loading) return <p className="text-gray-500 font-bold">Loading...</p>;
    if (state.error) return <p className="text-red-500">{state.error}</p>;

    const handleFormSubmit = async (data) => {
        try {
            const url = product ?
                `/product/update-products/${product._id}` :
                `/product/add-product`
            const method = product ? "put" : "post"

            console.log(typeof data.features);
            
            data.features = data.features.trim().split(",");
            const response = await axiosPrivate(
                {
                    method,
                    data,
                    url,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            if (response && response.status === 200) {
                toast(response.data.message);
                dispatch({ type: `${product ? "UPDATE" : "ADD"}_PRODUCT`, payload: response.data.data });
            }
            handleFormModel(false);

        } catch (error) {
            toast.error(`Error while ${product ? "updating" : "adding"} product: ${error.message}`);
        }
    };
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        clearErrors,
        isSubmitting,
        getValues,
    } = useForm({
        defaultValues: {
            title: product?.title || "",
            description: product?.description || "",
            price: product?.price || 0,
            category: product?.category || "",
            features: product?.features || [],
            mainImage: product?.mainImage || [],
            images: product?.images || [],
            stock: product?.stock || 0,
            errorMessage: product?.errorMessage || ''
        },
        mode: "onBlur",
    });

    // Track which fields have been interacted with
    const [interactedFields, setInteractedFields] = useState({});

    const handleFocus = (fieldName) => {
        if (!interactedFields[fieldName]) {
            setInteractedFields((prev) => ({ ...prev, [fieldName]: true }));
            setValue(fieldName, ""); // Clear default value on first focus
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                {formFields.map((formField) => {
                    if (formField.type === "select") {
                        return (
                            <div className="mb-4" key={formField.id}>
                                <Select
                                    label={formField.label}
                                    componentId={formField.id}
                                    errorMessage={formField.errorMessage}
                                    name={formField.name}
                                    className="w-full mt-2 p-2 border rounded-md"
                                    options={formField.options}
                                    {...register(formField.name, {
                                        required: formField.required && `${formField.label} is required`,
                                    })}
                                    onFocus={() => {
                                        errors[formField.name] && clearErrors(formField.name);
                                    }}
                                />
                                {errors[formField.name] && (
                                    <p className="text-red-500">{errors[formField.name].message}</p>
                                )}
                            </div>
                        );
                    } else if (formField.type === "rte") {
                        return (
                            <div className="mb-4" key={formField.id}>
                                <RTE
                                    label={formField.label}
                                    componentId={formField.id}
                                    errorMessage={formField.errorMessage}
                                    name={formField.name}
                                    control={control}
                                    defaultValue={getValues("description")}
                                />
                            </div>
                        );
                    } else if (formField.type === "file") {
                        return (
                            <div className="mb-4" key={formField.id}>
                                <Controller
                                    name={formField.name}
                                    control={control}
                                    rules={{
                                        required: formField.required && `${formField.label} is required`,
                                    }}
                                    render={({ field: { onChange, value } }) => {
                                        const formattedValue = Array.isArray(value) ? value : [value];
                                        return (
                                            <FileInput
                                                label={formField.label}
                                                componentId={formField.id}
                                                errorMessage={formField.errorMessage}
                                                name={formField.name}
                                                className="w-full mt-2 p-2 border rounded-md"
                                                multiple={formField.multiple || false}
                                                required={formField.required || false}
                                                maxFiles={formField.maxFiles || 1}
                                                accept={formField.accept}
                                                onChange={(files) => {
                                                    onChange(...formattedValue, ...files);
                                                }}
                                                value={formattedValue}
                                            />
                                        )
                                    }
                                    }
                                />
                                {errors[formField.name] && (
                                    <p className="text-red-500">{errors[formField.name].message}</p>
                                )}
                            </div>
                        );
                    } else {
                        return (
                            <div className="mb-4" key={formField.id}>
                                <Input
                                    componentId={formField.id}
                                    placeholder={formField.placeholder}
                                    label={formField.label}
                                    type={formField.type}
                                    errorMessage={formField.errorMessage}
                                    name={formField.name}
                                    pattern={formField.pattern}
                                    className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    {...register(formField.name, {
                                        required: formField.required && `${formField.label} is required`,
                                        pattern: formField.pattern
                                            ? {
                                                value: formField.pattern,
                                                message: formField.errorMessage,
                                            }
                                            : undefined,
                                        min: formField.type === "number" ? { value: 1, message: "Must be at least 1" } : undefined,
                                        validate: (value) =>
                                            formField.type === "number" && isNaN(value) ? "Only numbers are allowed" : true,
                                    })}
                                    onFocus={() => {
                                        errors[formField.name] && clearErrors(formField.name);
                                        if (["price", "stock"].includes(formField.name)) {
                                            handleFocus(formField.name);
                                        }
                                    }}
                                    onChange={(e) => {
                                        if (formField.type === "number") {
                                            const numValue = Number(e.target.value);
                                            if (!isNaN(numValue) && numValue >= 0) {
                                                setValue(formField.name, numValue);
                                                clearErrors(formField.name);
                                            }
                                        } else {
                                            setValue(formField.name, e.target.value);
                                        }
                                    }}
                                />
                                {errors[formField.name] && (
                                    <p className="text-red-500">{errors[formField.name].message}</p>
                                )}
                            </div>
                        );
                    }
                })}

                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={handleFormModel}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                    >
                        Cancel
                    </button>
                    <button disabled={isSubmitting} type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                        {product ? "Update Product" : "Add Product"}
                    </button>
                </div>

            </form>
            <ToastContainer />
        </div>
    );
}

export default ProductForm;
