import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0e1629] text-white px-4">
      <h1 className="text-6xl font-bold text-[#3b82f6] mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-center text-gray-300 mb-6">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-2 px-6 rounded-2xl shadow-md transition"
      >
        Go to Homepage
      </button>
    </div>
  );
}
