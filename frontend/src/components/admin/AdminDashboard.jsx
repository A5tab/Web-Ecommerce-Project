import React, { useState } from "react";
import DashboardOverview from "./DashboardOverview";
import Orders from "./Orders";
import Settings from "./Settings";
import ProductsTableContainer from "./ProductsTableContainer";
const AdminDashboard = () => {
    const [selectedTab, setSelectedTab] = useState("Products");

    const tabs = ["Dashboard", "Products", "Orders", "Settings"];

    const renderTabContent = () => {
        switch (selectedTab) {
            case "Dashboard":
                return (<DashboardOverview />);

            case "Products":
                return (
                    <ProductsTableContainer />
                );

            case "Orders":
                return (<Orders />);
            case "Settings":
                return (
                    <Settings />
                );

            default:
                return <div className="text-gray-700">Select a tab to view content.</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <header className="bg-white shadow">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                </div>
            </header>

            <nav className="bg-gray-800 text-gray-200">
                <div className="container mx-auto px-6 py-3 flex space-x-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`py-2 px-4 rounded-lg ${selectedTab === tab
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </nav>

            <main className="container mx-auto px-6 py-6">{renderTabContent()}</main>
        </div>
    );
};

export default AdminDashboard;
