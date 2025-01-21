
import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot , deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';

const storage = getStorage();

export function MangeSlideImage(){
    const [slides, setSlides] = useState([]);
    const [editSlide, setEditSlide] = useState(null);
    const [newData, setNewData] = useState({});
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const storedSlides = sessionStorage.getItem('slides');
        if (storedSlides) {
            setSlides(JSON.parse(storedSlides));
        } else {
            const unsubscribe = onSnapshot(
                collection(db, 'slideImages'),
                (snapshot) => {
                    const slidesList = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setSlides(slidesList);

                    sessionStorage.setItem('slides', JSON.stringify(slidesList));
                },
                (error) => {
                    console.error("Error fetching slide images:", error);
                }
            );
            return () => unsubscribe();
        }
    }, []);
    
    const handleEditClick = (slide) => {
        if(slide){
        setEditSlide(slide);
        setNewData(slide);
        }
    };

    const handleDeleteProduct = async () => {
        if (editSlide && editSlide.id) {
            const confirmDelete = window.confirm(`Are you sure you want to permanently delete this slide?`);
            if (confirmDelete) {
                try {
                    const productDoc = doc(db, "slideImages", editSlide.id);
                    await deleteDoc(productDoc);
                    alert("Slide has been deleted successfully");
                    setEditSlide(null); 
                } catch (error) {
                    console.error("Error deleting slide:", error);
                    alert("An error occurred while deleting the product. Please try again.");
                }
            }
        }
    };
    
    const handleSaveChanges = async () => {
        if (editSlide) {
            try {
                const slideRef = doc(db, 'slideImages', editSlide.id);
                const updatedData = { ...newData };
    
                if (imageFile) {
                    const imageUrl = await handleImageUpload();
                    updatedData.image = imageUrl;
                }
    
                await updateDoc(slideRef, updatedData);
                setEditSlide(null);
                alert("Changes have been saved successfully");
                setImageFile(null); 
            } catch (error) {
                console.error("Error updating document:", error);
                alert("Changes could not be saved, please try again");
            }
        }
    };
    
    const handleImageUpload = async () => {
        if (imageFile) {
            const storageRef = ref(storage, `slideImages/${imageFile.name}`);
            await uploadBytes(storageRef, imageFile);
            return await getDownloadURL(storageRef);
        }
        return null;
    };
    
    return (
        <>
            <h1 className="text-2xl font-bold mb-5 text-center">Slide Management</h1>
            {slides.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-11/12 mx-auto">
                    {slides.map((slide) => (
                        <li key={slide.id} className="border rounded-lg shadow-lg p-4 text-right">
                            <img src={slide.image} alt="Slide Image" 
                                className="w-full h-40 object-cover rounded-md mb-3" />
                            <button 
                                onClick={() => handleEditClick(slide)} 
                                className="mt-3 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                            >
                                Edit
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-600">No available products at the moment</p>
            )}
            {editSlide && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-5 w-96 h-[600px] overflow-y-auto mt-11">
                        <h2 className="text-xl font-bold mb-3">Edit Product</h2>
                        <h3 className="mb-2 font-semibold">Upload New Image</h3> 
                        {/* update image */}
                        <input 
                            type="file" 
                            accept="image/*" 
                            id='file-input' 
                            onChange={(e) => { setImageFile(e.target.files[0]) }}
                            className="border border-gray-300 p-2 rounded w-full text-right"
                            style={{ display: 'none' }} 
                        />
                        <label htmlFor='file-input' className="cursor-pointer border border-gray-300 p-2 rounded w-full text-right flex justify-between items-center">
                            <span className="text-gray-400 text-sm">{!imageFile ? 'No image selected yet' : imageFile.name}</span>
                            <span className="text-gray-400 text-sm">Choose Image</span>
                        </label>
                        
                        <div className="flex justify-between">
                            <button 
                                onClick={handleSaveChanges} 
                                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            >
                                Save Changes
                            </button>
                            <button 
                                onClick={() => setEditSlide(null)} 
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDeleteProduct} 
                                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
    
                    </div>
                </div>
            )}
        </>
    );
}    
