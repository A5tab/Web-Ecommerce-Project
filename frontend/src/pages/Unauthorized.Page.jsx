import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#0d1117] text-white px-4">
            <h1 className="text-6xl font-bold text-blue-500 mb-4">403</h1>
            <h2 className="text-2xl font-semibold mb-2">Access Denied</h2>
            <p className="text-lg text-gray-300 mb-6 text-center max-w-md">
                Sorry, you don't have the necessary permissions to access this page. Please check your account privileges or return to a safe page.
            </p>
            <button
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-2xl shadow-md transition-transform active:scale-95"
            >
                Go to Homepage
            </button>
        </div>
    );
}
