import ProductForm from "./ProductForm";

function FormModel({ handleFormModel, product = null }) {
    const isUpdate = product !== null; // if product is not null, it means we are updating an existing product

    return (
        <div className="min-w-full bg-white rounded-lg shadow">
            <div className="bg-slate-300 p-8 rounded-lg shadow-lg w-full max-w-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                    {isUpdate ? "Update Product" : "Add New Product"}
                </h2>
                <ProductForm handleFormModel={handleFormModel} product={product} />
            </div>
        </div>
    );
}

export default FormModel;
