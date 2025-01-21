import { motion } from 'framer-motion';
import { Laptop2, Cpu, Battery, Wifi } from 'lucide-react';

export function LaptopsHeader() {
    const features = [
        { icon: Laptop2, text: 'Latest Models' },
        { icon: Cpu, text: 'Outstanding Performance' },
        { icon: Battery, text: 'Long Battery Life' },
        { icon: Wifi, text: 'High-Speed Connectivity' }
    ];

    return (
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover the Latest Laptops</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">
                        A diverse collection of laptops to suit all needs and budgets.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm"
                        >
                            <feature.icon className="w-8 h-8 mb-3" />
                            <span className="text-sm font-medium text-center">{feature.text}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
