import profileImage from '../images/profile3.png';
import { useRef, useState } from 'react';

export default function SignInForm() {
  const mobileInputRef = useRef(null); 
  const [error, setError] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        const mobileNumber = mobileInputRef.current.value;

        // Basic validation
        if (mobileNumber.length < 10 ) {
        setError(true); // Show error message
        } else {
        setError(false);
        alert(`Mobile number: ${mobileNumber}`);
        }

        // Simulate sending the mobile number to the server
        // the URL in the fetch() request determines which server will handle the request.
        fetch('http://localhost:3000/api/send-otp', {
            // sending data to the server :
            method: 'POST',
            // actual data we’re sending
            body: JSON.stringify({ mobile: mobileNumber }),
            //  These specify that we are sending JSON data. The server will know to expect a JSON body in the request.
            headers: {
            'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // This will show the response from the server
            if (data.success) {
                // Redirect to OTP verification page
                window.location.href = '/verify-otp';
            } else {
                // Handle error (e.g., invalid number, server error)
                setError(true);
            }
            })
            .catch(err => {
            console.error('Error:', err);
            setError(true);
            });
    };

    function handleInputChange(e) {
        setError(false);
        // if(e.target.value.length === 10){
            
        // }
        console.log(e.target.value);
    }

    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <div className="flex flex-col items-center mb-6">
                    <img src={profileImage} alt="Illustration" className="w-32 mb-4" />
                    <h2 className="text-xl font-bold text-gray-800">Let`s get started!</h2>
                    <p className="text-gray-600 text-sm mt-2">Use your mobile number to sign in or sign up.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="mobile">
                        Mobile number
                    </label>
                    <input
                        onChange={handleInputChange}
                        type="text"
                        id="mobile"
                        ref={mobileInputRef} 
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                        error ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+201"
                    />
                    {error && <p className="text-red-500 text-xs italic mt-1">Required</p>}

                    <button
                        type="submit"
                        className={`w-full bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-lg mt-4 ${
                        error ? 'opacity-50 cursor-not-allowed' : 'bg-blue-600 text-white'
                        }`}
                        disabled={error}
                    >
                        Continue
                    </button>
                </form>

                <p className="text-center text-sm text-blue-600 mt-4">
                    <a href="#">or sign in with email</a>
                </p>

                <p className="text-center text-xs text-gray-500 mt-6">
                    By continuing, you agree to our{' '}
                    <a href="#" className="underline">Privacy Policy</a> and{' '}
                    <a href="#" className="underline inline-block">Terms of Use</a>.
                </p>
            </div>
        </div>
    );
}

