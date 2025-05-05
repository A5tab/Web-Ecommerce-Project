
import React from 'react';

function Services() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-gray-900 text-gray-200 py-20 px-6 sm:px-10 lg:px-20">
            <div className="max-w-5xl mx-auto bg-indigo-900/40 border border-indigo-700 rounded-2xl p-10 shadow-2xl">
                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-indigo-500 mb-10">
                    Our Services
                </h1>
                <ul className="list-disc list-inside space-y-5 text-indigo-100 text-lg">
                    <li><strong>Fast Delivery:</strong> Get your products within 2-3 working days.</li>
                    <li><strong>Easy Returns:</strong> Hassle-free 7-day return policy for all items.</li>
                    <li><strong>Gift Services:</strong> Add custom gift messages and wrapping.</li>
                    <li><strong>Live Chat Support:</strong> 24/7 support from our expert team.</li>
                    <li><strong>Secure Payments:</strong> All payments are encrypted and safe.</li>
                </ul>
            </div>
        </div>
    );
}

export default Services;