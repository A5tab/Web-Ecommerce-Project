import React from 'react'

function DashboardOverview() {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white shadow rounded-lg">
                    <h3 className="text-lg font-medium text-gray-700">Total Products</h3>
                    <p className="text-3xl font-bold text-gray-800">120</p>
                </div>
                <div className="p-6 bg-white shadow rounded-lg">
                    <h3 className="text-lg font-medium text-gray-700">Total Orders</h3>
                    <p className="text-3xl font-bold text-gray-800">320</p>
                </div>
                <div className="p-6 bg-white shadow rounded-lg">
                    <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
                    <p className="text-3xl font-bold text-gray-800">450</p>
                </div>
                <div className="p-6 bg-white shadow rounded-lg">
                    <h3 className="text-lg font-medium text-gray-700">Revenue</h3>
                    <p className="text-3xl font-bold text-gray-800">$12,345</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardOverview