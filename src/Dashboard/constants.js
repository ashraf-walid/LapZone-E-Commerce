export const categories = [
  "Keyboards",
  "Mice",
  "Headsets",
  "External Storage",
  "Laptop Stands",
  "Bags & Cases",
  "Chargers",
  "Docking Stations",
  "Cables & Adapters",
  "Cooling Pads",
  'Monitors',
  'Speakers',
  'Microphones',
];

export const brands = [
  "Razer",
  "Logitech",
  "Corsair",
  "SteelSeries",
  "HP",
  "Dell",
  "Asus",
  "Apple",
  "Microsoft",
  "Lenovo",
];

export const sharedFields = [
  { name: "name", type: "text", placeholder: "Product Name", required: true },
  { name: "price", type: "number", placeholder: "Price", required: true },
  { name: "originalPrice",type: "number",placeholder: "Original Price (Before Discount)",required: false,},
  { name: "discount",type: "number",placeholder: "Discount (%)",required: false,},
  { name: "description",type: "textarea",placeholder: "Description",required: true,},
  { name: "category",type: "text",placeholder: "Category (Laptop / Accessory)",required: true,},
  { name: "brand", type: "text", placeholder: "Brand", required: true },
  { name: "stock",type: "number",placeholder: "Available Stock",required: true,}, 
  { name: "isFeatured",type: "checkbox",placeholder: "Mark as Featured?",required: false,},
  { name: "isTrending", type: "checkbox", placeholder: "Mark as Trending?", required: false },
];

export const laptopSpecificFields = [
  { name: "cpu", type: "text", placeholder: "CPU", required: true },
  { name: "ram", type: "text", placeholder: "RAM", required: true },
  { name: "storage", type: "text", placeholder: "Storage", required: true },
  { name: "os", type: "text", placeholder: "Operating System", required: true },
  { name: "screenSize",type: "text",placeholder: "Screen Size",required: true,},
  { name: "graphicCard",type: "text",placeholder: "Graphic Card",required: false,},
  { name: "graphicMemory",type: "text",placeholder: "Graphic Memory",required: false,},
  { name: "batteryCapacity",type: "text",placeholder: "Battery Capacity",required: false,},
  { name: "weight", type: "text", placeholder: "Weight", required: false },
  { name: "ports",type: "text",placeholder: "Ports (USB, HDMI, ...)",required: false,},
  { name: "connectivity",type: "text",placeholder: "Connectivity (WiFi, Bluetooth, ...)",required: false,},
];

export const accessorySpecificFields = [
  { name: "compatibility",type: "text",placeholder: "Compatible Devices",required: true },
  { name: "features",type: "textarea",placeholder: "Special Features",required: true }, 
  { name: "color", type: "text", placeholder: "Color", required: true },
];

export const LaptopsFields = [...sharedFields, ...laptopSpecificFields];
export const AccessoryFields = [...sharedFields, ...accessorySpecificFields];


