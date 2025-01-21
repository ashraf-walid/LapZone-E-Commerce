import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { db } from '../firebaseConfig';
import { collection, addDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { BiImageAdd } from "react-icons/bi";
import { LaptopsFields } from './constants';

const defaultProduct = LaptopsFields.reduce((acc, field) => {
    acc[field.name] = field.type === 'checkbox' ? false : '';
    return acc;
}, {});

const storage = getStorage();

function AddProduct() {
    const [product, setProduct] = useState(defaultProduct);
    const [imageFiles, setImageFiles] = useState([null, null, null, null, null]);

    const handleImageUpload = async () => {
        const urls = await Promise.all(imageFiles.map(async (file) => {
            if (file) {
                const storageRef = ref(storage, `images/${file.name}`);
                await uploadBytes(storageRef, file);
                return await getDownloadURL(storageRef);
            }
            return null;
        }));
        return urls.filter(url => url !== null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imageUrls = await handleImageUpload();
        const productWithImages = { ...product, images: imageUrls };

        try {
            const docRef = await addDoc(collection(db, 'laptopCollection'), productWithImages);
            await setDoc(docRef, { ...productWithImages, id: docRef.id });
            alert('Product added successfully');
            setProduct(defaultProduct);
            setImageFiles([null, null, null, null, null]);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl max-sm:w-screen mx-auto overflow-auto">
            <h2 className="text-2xl font-semibold text-center mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6">
                    {LaptopsFields.map((field) => {
                        if (field.type === 'checkbox') {
                            return (
                                <div key={field.name} className="flex items-center justify-between">
                                    <label className="text-gray-700 font-medium">{field.placeholder}</label>
                                    <Switch
                                        checked={product[field.name]}
                                        onChange={(value) => setProduct({ ...product, [field.name]: value })}
                                        className={`${product[field.name] ? 'bg-blue-600' : 'bg-gray-300'}
                                            relative inline-flex h-6 w-11 items-center rounded-full`}
                                    >
                                        <span
                                            className={`${
                                                product[field.name] ? 'translate-x-6' : 'translate-x-1'
                                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                        />
                                    </Switch>
                                </div>
                            );
                        } else {
                            return (
                                <div key={field.name} className="flex flex-col">
                                    <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-2">
                                        {field.placeholder}
                                    </label>
                                    <input
                                        id={field.name}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={product[field.name]}
                                        onChange={(e) => setProduct({ ...product, [field.name]: e.target.value })}
                                        className="border border-gray-300 p-2 rounded w-full"
                                    />
                                </div>
                            );
                        }
                    })}
                </div>

                <div className="my-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Upload Images</h3>
                    <div className="flex flex-wrap gap-4">
                        {imageFiles.map((_, index) => (
                            <label key={index} className="cursor-pointer">
                                <div className="w-24 h-24 max-sm:w-16 max-sm:h-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center hover:border-blue-500">
                                    {imageFiles[index] ? (
                                        <img
                                            src={URL.createObjectURL(imageFiles[index])}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    ) : (
                                        <BiImageAdd className="text-gray-400 text-2xl" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const newFiles = [...imageFiles];
                                        newFiles[index] = e.target.files[0];
                                        setImageFiles(newFiles);
                                    }}
                                />
                            </label>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}

export default AddProduct;
