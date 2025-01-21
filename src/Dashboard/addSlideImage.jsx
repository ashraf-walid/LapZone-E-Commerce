import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { BiImageAdd } from "react-icons/bi";

const storage = getStorage();

export default function AddSlideImage() {
    
    const [imageFile, setImageFile] = useState(null); 
    const [isUploading, setIsUploading] = useState(false); 

    const handleImageUpload = async () => {
        if (imageFile) {
            const storageRef = ref(storage, `slideImages/${imageFile.name}`);
            await uploadBytes(storageRef, imageFile);
            return await getDownloadURL(storageRef);
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(imageFile){
        setIsUploading(true);
        const imageUrl = await handleImageUpload();
        const SlideImage = { image: imageUrl };
        try {
            await addDoc(collection(db, 'slideImages'), SlideImage);
            setIsUploading(false);
            alert('Image has been added successfully');
            setImageFile(null);
            } catch (e) {
                console.error("Error adding document: ", e);
            }} else {
                alert('No image has been attached');
            }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md text-right rtl w-[60%] m-auto">
                <h2 className="text-xl font-semibold mb-4">Add a New Image</h2>
                <div className="mb-4">
                    <input 
                        type="file" 
                        accept="image/*" 
                        id='file-input'
                        onChange={(e) => { setImageFile(e.target.files[0]) }}
                        className="border border-gray-300 p-2 rounded w-full text-right"
                        style={{ display: 'none' }} 
                    />
                    <label htmlFor='file-input' className="cursor-pointer border border-gray-300 p-2 rounded w-full text-right flex justify-end items-center">
                        <span className="text-gray-400 text-sm">{!imageFile ? <BiImageAdd /> : imageFile.name}</span>
                    </label>

                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300 w-full mt-4"
                        disabled={isUploading} 
                    >
                        {isUploading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </>
    );
}

