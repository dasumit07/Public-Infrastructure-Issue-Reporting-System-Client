import React from 'react';
import { BsGraphUpArrow } from 'react-icons/bs';
import { FaCheckCircle, FaCity, FaTools } from 'react-icons/fa';

const OurImpactOnCity = () => {
    return (
        <div className='bg-gray-50'>
                    <h2 className="text-3xl font-bold mt-8 text-center mb-5 text-teal-700">
           Our Impact on the City
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            “Together, we’re making our city safer, cleaner, and more efficient.”
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-5 md:px-20">
        <div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg transition hover:scale-105 ease-in-out">
           <div class=" text-5xl mb-4 flex items-center justify-center"><FaTools /></div>
           <h3 className="font-semibold text-xl mb-2 text-teal-600">10,000+ Issues Reported</h3>
           <p className="text-gray-600 text-sm">
              “So many problems have been reported by citizens, most of which have been resolved.”
           </p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg hover:scale-105 transition ease-in-out">
           <div class=" text-5xl mb-4 flex items-center justify-center"><FaCheckCircle /></div>
           <h3 className="font-semibold text-xl mb-2 text-teal-600">82% Problems Resolved</h3>
           <p className="text-gray-600 text-sm">
              “Most of the reports have been successfully resolved by the relevant authorities.”
           </p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg hover:scale-105 transition ease-in-out">
           <div class=" text-5xl mb-4 flex items-center justify-center"><FaCity /></div>
           <h3 className="font-semibold text-xl mb-2 text-teal-600">40+ City Zones Covered</h3>
           <p className="text-gray-600 text-sm">
              “Different areas of the city are connected to the platform.”
           </p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg hover:scale-105 transition ease-in-out">
           <div class=" text-5xl mb-4 flex items-center justify-center"><BsGraphUpArrow /></div>
           <h3 className="font-semibold text-xl mb-2 text-teal-600">Faster Response Time</h3>
           <p className="text-gray-600 text-sm">
              “The average response time for reports has been reduced to less than 3 hours.”
           </p>
        </div>
        </div>
                </div>
    );
};

export default OurImpactOnCity;