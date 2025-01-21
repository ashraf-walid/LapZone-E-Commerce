/* eslint-disable react/prop-types */
import { FcGoogle } from 'react-icons/fc';
import { Loader2 } from 'lucide-react';

export default function SignInPrompt({ onSignIn, onCancel, isSubmitting }) {
  return (
    <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in Required</h2>
      <p className="text-gray-600 text-sm mb-6">
        Please sign in to continue with your order. This helps us secure your information and track your orders.
      </p>
      
      <button 
        onClick={onSignIn}
        disabled={isSubmitting}
        className="w-full bg-white border border-gray-300 text-gray-700 flex items-center justify-center px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition-colors duration-200"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin w-5 h-5 mr-2" />
        ) : (
          <>
            <FcGoogle className="text-2xl mr-2" />
            <span>Continue with Google</span>
          </>
        )}
      </button>

      <button
        onClick={onCancel}
        className="mt-4 text-gray-500 text-sm hover:text-gray-700 transition-colors duration-200"
      >
        Cancel
      </button>
    </div>
  );
}