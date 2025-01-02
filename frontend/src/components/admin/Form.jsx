import React, { useState } from "react";
import { formFields } from "./formFields";
import uploadIcons from "../../assets/icons/uploadIcon.png";
import ErrorMessage from "../ErrorMessage";
import axios from "axios";

function Form({ handleFormModel, product }) {
    const MAX_IMAGES = 5;

    // Initialize form values
    const [formValues, setFormValues] = useState({
        title: product?.title || "",
        description: product?.description || "",
        price: product?.price || 0,
        category: product?.category || "",
        features: product?.features || "",
        mainImage: product?.mainImage || null,
        images: product?.images || [],
        stock: product?.stock || 0,
    });

    // Handle image uploads
    const handleUploadImage = (filesToBeUploaded) => {
        const existingImages = [...formValues.images];

        filesToBeUploaded.forEach((image) => {
            if (!existingImages.some((img) => img === image || img.name === image.name)) {
                existingImages.push(image);
            }
        });

        if (existingImages.length > MAX_IMAGES) {
            alert(`You can only upload up to ${MAX_IMAGES} images.`);
            return;
        }

        setFormValues((prevState) => ({
            ...prevState,
            images: existingImages,
        }));
    };

    // Handle input changes
    const onChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "mainImage") {
            const mainImageFile = files[0];
            setFormValues((prevState) => ({
                ...prevState,
                mainImage: mainImageFile,
            }));
        } else if (name === "images") {
            const uploadedImages = Array.from(files);
            handleUploadImage(uploadedImages);
        } else {
            setFormValues((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(formValues).forEach((key) => {
            if (key === "images") {
                formValues.images.forEach((image) => {
                    if (image instanceof File) {
                        formData.append("images", image);
                    } else {
                        formData.append("existingImages", image); // Handle existing Cloudinary URLs
                    }
                });
            } else if (key === "mainImage" && formValues.mainImage instanceof File) {
                formData.append("images", formValues.mainImage);
            } else {
                formData.append(key, formValues[key]);
            }
        });

        try {
            const url = product
                ? `http://localhost:3000/api/v1/product/update-products/${product._id}`
                : "http://localhost:3000/api/v1/product/add-product";

            const method = product ? "put" : "post"; // Use PUT for updating, POST for adding

            const response = await axios({
                method,
                url,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert(product ? "Product updated successfully!" : "Product added successfully!");
            handleFormModel(); // Close modal or reset form
            window.location.reload();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit the form. Please try again.");
        }
    };

    const [focusedFields, setFocusedFields] = useState({});

    const onBlur = (fieldName) => {
        setFocusedFields((prevState) => ({
            ...prevState,
            [fieldName]: true,
        }));
    };

    const validateInput = (fieldName) => {
        const field = formFields.find((f) => f.name === fieldName);
        const value = formValues[fieldName];

        if (!field) return false;

        if (field.required && !value) return field.errorMessage;

        if (field.pattern && value && !new RegExp(field.pattern).test(value)) {
            return field.errorMessage;
        }

        if (field.min !== undefined && value < field.min) return field.errorMessage;
        if (field.max !== undefined && value > field.max) return field.errorMessage;

        if (field.minLength !== undefined && value.length < field.minLength) {
            return field.errorMessage;
        }

        return false;
    };

    return (
        <form onSubmit={handleSubmit}>
            {formFields.map((field) => {
                const isFocused = !!focusedFields[field.name];
                const errorMessage = validateInput(field.name);
                const isInvalid = !!errorMessage && isFocused;

                if (field.type === "select") {
                    return (
                        <div className="mb-4" key={field.id}>
                            <label htmlFor={field.id}>{field.label}</label>
                            <select
                                id={field.id}
                                name={field.name}
                                value={formValues[field.name]}
                                onChange={onChange}
                                onBlur={() => onBlur(field.name)}
                                required={field.required}
                                className="w-full mt-2 p-2 border rounded-md"
                            >
                                {field.options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <ErrorMessage errorMessage={errorMessage} isFocused={isInvalid} />
                        </div>
                    );
                } else if (field.type === "textarea") {
                    return (
                        <div className="mb-4" key={field.id}>
                            <label htmlFor={field.id}>{field.label}</label>
                            <textarea
                                id={field.id}
                                name={field.name}
                                value={formValues[field.name]}
                                onChange={onChange}
                                onBlur={() => onBlur(field.name)}
                                placeholder={field.placeholder}
                                className="w-full mt-2 p-2 border rounded-md"
                                rows={field.rows}
                                required={field.required}
                            />
                            <ErrorMessage errorMessage={errorMessage} isFocused={isInvalid} />
                        </div>
                    );
                } else if (field.type === "file") {
                    return (
                        <div className="mb-4" key={field.id}>
                            <label htmlFor={field.id}>
                                <div className="bg-white flex items-center p-2 border rounded-md cursor-pointer">
                                    <img src={uploadIcons} alt="" />
                                    {field.label}
                                    <div className="flex gap-2">
                                        {field.name === "mainImage" && formValues.mainImage && (
                                            <img
                                                src={
                                                    formValues.mainImage instanceof File
                                                        ? URL.createObjectURL(formValues.mainImage)
                                                        : formValues.mainImage
                                                }
                                                alt="Main"
                                                className="h-16 w-16 object-cover rounded-md"
                                            />
                                        )}
                                        {field.name === "images" &&
                                            formValues.images.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={
                                                        img instanceof File
                                                            ? URL.createObjectURL(img)
                                                            : img
                                                    }
                                                    alt={`Uploaded ${index}`}
                                                    className="h-16 w-16 object-cover rounded-md"
                                                />
                                            ))}
                                    </div>
                                </div>
                            </label>
                            <input
                                id={field.id}
                                name={field.name}
                                type="file"
                                multiple={field.multiple}
                                onChange={onChange}
                                className="hidden"
                            />
                        </div>
                    );
                } else {
                    return (
                        <div className="mb-4" key={field.id}>
                            <label htmlFor={field.id}>{field.label}</label>
                            <input
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                value={formValues[field.name]}
                                onChange={onChange}
                                onBlur={() => onBlur(field.name)}
                                placeholder={field.placeholder}
                                className="w-full mt-2 p-2 border rounded-md"
                                required={field.required}
                            />
                            <ErrorMessage errorMessage={errorMessage} isFocused={isInvalid} />
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
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                    {product ? "Update Product" : "Add Product"}
                </button>
            </div>
        </form>
    );
}

export default Form;
