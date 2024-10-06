// src/pages/NotFound.jsx

import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl mt-4">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 text-lg text-blue-500 underline hover:text-blue-700">
            Go back to Home
        </Link>
        </div>
    );
}
