import React from 'react'
import { useState } from 'react'
import FormModel from './FormModel';
import ProductsTable from './ProductsTable';
function ProductsTableContainer() {
    const [formModel, setformModel] = useState(false)

    const handleFormModel = () => {
        setformModel(!formModel)
    }
    return (
        <div>
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold mb-4">Products Management</h2>
                <button className='bg-blue-500 text-white py-1 px-2 rounded mb-2' onClick={handleFormModel}>Add Product</button>
            </div>
            {!formModel && <div className="overflow-auto">
                <ProductsTable />
            </div>}

            {formModel && <div className='overflow-auto'><FormModel handleFormModel={handleFormModel} /></div>}
        </div>
    )
}

export default ProductsTableContainer;