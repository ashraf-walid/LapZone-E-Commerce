import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <AlertCircle 
            size={100} 
            className="text-red-500 opacity-80"
            strokeWidth={1.5}
          />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404
        </h1>
        
        <p className="text-gray-600 mb-6 text-lg">
            Sorry, the page you are looking for doest exist.
        </p>
        
        <Link 
          to="/" 
          className="flex items-center justify-center w-full bg-blue-500 text-white 
                     py-3 rounded-lg hover:bg-blue-600 transition-colors 
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <Home className="mr-2" size={20} />
          Back to Home Page
        </Link>
      </div>
      
      <div className="mt-8 text-center text-gray-500">
        <p>Did you encounter a problem? You could:</p>
        <div className="flex justify-center space-x-4 mt-4">
          <button 
            onClick={() => window.location.reload()}
            className="text-blue-500 hover:underline"
          >
            Reload the page
          </button>
          <a 
            href="/contact" 
            className="text-blue-500 hover:underline"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}