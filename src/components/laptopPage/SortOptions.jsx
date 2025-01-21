import React from 'react';
import { FaStar, FaSortAmountDown, FaSortAmountUp, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

export function SortOptions({ value, onChange }) {
    const options = [
        { label: "Featured", value: "featured", icon: <FaStar /> },
        { label: "Price: Low to High", value: "price-asc", icon: <FaSortAmountUp /> },
        { label: "Price: High to Low", value: "price-desc", icon: <FaSortAmountDown /> },
        { label: "Name: A to Z", value: "name-asc", icon: <FaSortAlphaDown /> },
        { label: "Name: Z to A", value: "name-desc", icon: <FaSortAlphaUp /> },
    ];

    return (
        <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Sort By</h3>
            <div className="flex flex-col gap-2">
                {options.map((option) => (
                    <button
                        key={option.value}
                        className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-200 ${
                            value === option.value ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
                        }`}
                        onClick={() => onChange(option.value)}
                    >
                        {React.cloneElement(option.icon, {
                            color: value === option.value ? "#FFD700" : "#6B7280", 
                            size: 20, 
                        })}
                        <span>{option.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
