import p1 from './images/products/1.jpeg'
import p0001 from './images/products/details/0001.jpg'
import p0002 from './images/products/details/0002.jpg'
import p0003 from './images/products/details/0003.jpg'
import p0004 from './images/products/details/0004.jpg'

import p2 from './images/products/2.jpg'
import p3 from './images/products/3.jpg'
import p4 from './images/products/4.jpg'
import p5 from './images/products/5.jpg'
import p6 from './images/products/6.jpg'
import p7 from './images/products/7.jpeg'
import p8 from './images/products/8.jpeg'
import p9 from './images/products/9.jpg'
import p10 from './images/products/10.jpg'
import p11 from './images/products/11.jpeg'
import p12 from './images/products/12.jpeg'
import p13 from './images/products/13.jpg'
import p14 from './images/products/14.jpg'
import p15 from './images/products/15.jpg'

export const Products = [
    {
        id: 1,
        productName: 'Laptop ASUS TUF Gaming',
        price: 46000,
        productImage: p1,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'Powerful gaming laptop with AMD Ryzen 7, 8GB RAM, and 512GB SSD.',
        cpu: 'AMD Ryzen 7',
        ram: '8GB',
        storage: '512GB SSD',
        os: 'Windows 11',
        displaySize: '15.6"',
        rating: 4.6,
        reviews: [
            { user: 'John', comment: 'Great performance for gaming.', rating: 5 },
            { user: 'Anna', comment: 'Amazing display and smooth gameplay.', rating: 4 }
        ]
    },
    {
        id: 2,
        productName: 'Laptop ASUS TUF Gaming',
        price: 51000,
        productImage: p2,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'Gaming laptop with AMD Ryzen 5, 16GB RAM, and 1TB SSD.',
        cpu: 'AMD Ryzen 5',
        ram: '16GB',
        storage: '1TB SSD',
        os: 'FreeDOS',
        displaySize: '15.6"',
        rating: 4.5,
        reviews: [
            { user: 'Michael', comment: 'Solid for everyday tasks and gaming.', rating: 4 },
            { user: 'Sara', comment: 'Great for heavy multitasking.', rating: 5 }
        ]
    },
    {
        id: 3,
        productName: 'Laptop ASUS TUF Gaming',
        price: 56000,
        productImage: p3,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'High-end gaming laptop with Intel Core i7, 16GB RAM, and 512GB SSD.',
        cpu: 'Intel Core i7-12700H',
        ram: '16GB',
        storage: '512GB SSD',
        os: 'Windows 11',
        displaySize: '15.6"',
        rating: 4.8,
        reviews: [
            { user: 'Tom', comment: 'Handles heavy games effortlessly.', rating: 5 },
            { user: 'Emma', comment: 'Excellent cooling and performance.', rating: 5 }
        ]
    },
    {
        id: 4,
        productName: 'Laptop Lenovo Legion',
        price: 42650,
        productImage: p4,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'Gaming laptop with Intel Core i7, 16GB RAM, and 512GB SSD.',
        cpu: 'Intel Core i7-13700H',
        ram: '16GB',
        storage: '512GB SSD',
        os: 'Ubuntu',
        displaySize: '15.6"',
        rating: 4.5,
        reviews: [
            { user: 'Alex', comment: 'Great for gaming and programming.', rating: 4 },
            { user: 'Lily', comment: 'Sturdy build and fast performance.', rating: 5 }
        ]
    },
    {
        id: 5,
        productName: 'Laptop HP Pavilion',
        price: 32000,
        productImage: p5,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'Budget laptop with Intel Core i3, 8GB RAM, and 512GB SSD.',
        cpu: 'Intel Core i3-1215U',
        ram: '8GB',
        storage: '512GB SSD',
        os: 'Windows 11',
        displaySize: '15.6"',
        rating: 4.2,
        reviews: [
            { user: 'Sophia', comment: 'Affordable and good performance.', rating: 4 },
            { user: 'Jake', comment: 'Good for general use.', rating: 4 }
        ]
    },
    {
        id: 6,
        productName: 'Laptop Lenovo IdeaPad',
        price: 29000,
        productImage: p6,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'Affordable laptop with Intel Core i3, 4GB RAM, and 1TB HDD.',
        cpu: 'Intel Core i3-1115G4',
        ram: '4GB',
        storage: '1TB HDD',
        os: 'Windows 11',
        displaySize: '15.6"',
        rating: 4.0,
        reviews: [
            { user: 'Lucas', comment: 'Solid performance for basic tasks.', rating: 4 },
            { user: 'Grace', comment: 'Good for everyday use.', rating: 4 }
        ]
    },
    {
        id: 7,
        productName: 'Laptop Lenovo Yoga',
        price: 52000,
        productImage: p7,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'Versatile laptop with Intel Core i7, 8GB RAM, and 512GB SSD.',
        cpu: 'Intel Core i7-1355U',
        ram: '8GB',
        storage: '512GB SSD',
        os: 'Windows 11',
        displaySize: '15.6"',
        rating: 4.7,
        reviews: [
            { user: 'Ella', comment: 'Very versatile and good for multitasking.', rating: 5 },
            { user: 'Harry', comment: 'Lightweight and powerful.', rating: 4 }
        ]
    },
    {
        id: 8,
        productName: 'Laptop Acer Swift',
        price: 65000,
        productImage: p8,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'Premium laptop with AMD Ryzen 7, 8GB RAM, and 512GB SSD.',
        cpu: 'AMD Ryzen 7',
        ram: '8GB',
        storage: '512GB SSD',
        os: 'Windows 11',
        displaySize: '15.6"',
        rating: 4.8,
        reviews: [
            { user: 'Ethan', comment: 'Smooth performance and excellent display.', rating: 5 },
            { user: 'Isabella', comment: 'Great for multitasking.', rating: 5 }
        ]
    },
    {
        id: 9,
        productName: 'Laptop Acer Swift',
        price: 75000,
        productImage: p9,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'High-end gaming laptop with AMD Ryzen 7, 16GB RAM, and 512GB SSD.',
        cpu: 'AMD Ryzen 7',
        ram: '16GB',
        storage: '512GB SSD',
        os: 'Windows 11',
        displaySize: '14"',
        rating: 4.9,
        reviews: [
            { user: 'Nathan', comment: 'Best performance in its category.', rating: 5 },
            { user: 'Ava', comment: 'Incredible speed and power.', rating: 4 }
        ]
    },
    {
        id: 10,
        productName: 'Laptop Lenovo Yoga',
        price: 47000,
        productImage: p10,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'Affordable laptop with Intel Core i3, 4GB RAM, and 256GB SSD.',
        cpu: 'Intel Core i3-1215U',
        ram: '4GB',
        storage: '256GB SSD',
        os: 'Windows 11',
        displaySize: '15.6"',
        rating: 4.3,
        reviews: [
            { user: 'Lucas', comment: 'Good performance and battery life.', rating: 4 },
            { user: 'Grace', comment: 'Great design and portability.', rating: 4 }
        ]
    },
    {
        id: 11,
        productName: 'Laptop Dell Inspiron',
        price: 45000,
        productImage: p11,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'Powerful laptop with Intel Core i5, 8GB RAM, and 512GB SSD.',
        cpu: 'Intel Core i5-1135G7',
        ram: '8GB',
        storage: '512GB SSD',
        os: 'Windows 11',
        displaySize: '15.6"',
        rating: 4.4,
        reviews: [
            { user: 'James', comment: 'Good performance for both work and play.', rating: 4 },
            { user: 'Maria', comment: 'Battery life could be better.', rating: 4 }
        ]
    },
    {
        id: 12,
        productName: 'Laptop HP Spectre x360',
        price: 72000,
        productImage: p12,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'Premium convertible laptop with Intel Core i7, 16GB RAM, and 1TB SSD.',
        cpu: 'Intel Core i7-1165G7',
        ram: '16GB',
        storage: '1TB SSD',
        os: 'Windows 11',
        displaySize: '13.3"',
        rating: 4.9,
        reviews: [
            { user: 'Sophie', comment: 'Amazing display and sleek design.', rating: 5 },
            { user: 'John', comment: 'Perfect for productivity and creative tasks.', rating: 5 }
        ]
    },
    {
        id: 13,
        productName: 'Laptop Microsoft Surface Laptop 4',
        price: 71000,
        productImage: p13,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'Slim and portable laptop with AMD Ryzen 5, 8GB RAM, and 512GB SSD.',
        cpu: 'AMD Ryzen 5 4680U',
        ram: '8GB',
        storage: '512GB SSD',
        os: 'Windows 11',
        displaySize: '13.5"',
        rating: 4.7,
        reviews: [
            { user: 'Alice', comment: 'Perfect for travel and remote work.', rating: 5 },
            { user: 'Ethan', comment: 'Stylish, lightweight, and powerful.', rating: 5 }
        ]
    },
    {
        id: 14,
        productName: 'Laptop ASUS ZenBook 14',
        price: 63000,
        productImage: p14,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'Ultra-thin laptop with Intel Core i7, 16GB RAM, and 512GB SSD.',
        cpu: 'Intel Core i7-1165G7',
        ram: '16GB',
        storage: '512GB SSD',
        os: 'Windows 11',
        displaySize: '14"',
        rating: 4.8,
        reviews: [
            { user: 'Olivia', comment: 'Great for on-the-go productivity.', rating: 5 },
            { user: 'William', comment: 'Fast performance and lightweight design.', rating: 5 }
        ]
    },
    {
        id: 15,
        productName: 'Laptop Acer Aspire 5',
        price: 31000,
        productImage: p15,
        imageDetails : [
            {one : p0001},
            {two : p0002},
            {three : p0003},
            {four : p0004},
        ] ,
        description: 'Budget-friendly laptop with Intel Core i3, 8GB RAM, and 256GB SSD.',
        cpu: 'Intel Core i3-1005G1',
        ram: '8GB',
        storage: '256GB SSD',
        os: 'Windows 11',
        displaySize: '15.6"',
        rating: 4.2,
        reviews: [
            { user: 'Emma', comment: 'Affordable laptop for everyday tasks.', rating: 4 },
            { user: 'Michael', comment: 'Good for students and casual users.', rating: 4 }
        ]
    }    
];
