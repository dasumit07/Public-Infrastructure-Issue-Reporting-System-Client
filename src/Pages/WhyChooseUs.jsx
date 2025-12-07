import React from 'react';
import { CiMobile3 } from 'react-icons/ci';
import { LuHandshake, LuScanEye } from 'react-icons/lu';
import { SiBoosty } from 'react-icons/si';

const WhyChooseUs = () => {
   return (
      <div className='bg-gray-50 mb-5'>
         <h2 className="text-3xl font-bold mt-8 text-center mb-5 text-teal-700">
            Why Choose Our Platform
         </h2>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-5 md:px-20">
            <div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg transition hover:scale-105 ease-in-out">
               <div className=" text-5xl mb-4 flex items-center justify-center"><SiBoosty /></div>
               <h3 className="font-semibold text-xl mb-2 text-teal-600">Fast Issue Resolution</h3>
               <p className="text-gray-600 text-sm">
                  “The problem you report is quickly reached by the relevant authorities.”
               </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg hover:scale-105 transition ease-in-out">
               <div className=" text-5xl mb-4 flex items-center justify-center"><CiMobile3 /></div>
               <h3 className="font-semibold text-xl mb-2 text-teal-600">Easy to Use Platform</h3>
               <p className="text-gray-600 text-sm">
                  “Easy interface—just take a photo, give a location, and submit.”
               </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg hover:scale-105 transition ease-in-out">
               <div className=" text-5xl mb-4 flex items-center justify-center"><LuScanEye /></div>
               <h3 className="font-semibold text-xl mb-2 text-teal-600">Transparent Tracking</h3>
               <p className="text-gray-600 text-sm">
                  “You can track the status of your submitted reports in real time.”
               </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg hover:scale-105 transition ease-in-out">
               <div className=" text-5xl mb-4 flex items-center justify-center"><LuHandshake /></div>
               <h3 className="font-semibold text-xl mb-2 text-teal-600">City Collaboration</h3>
               <p className="text-gray-600 text-sm">
                  “This platform strengthens the connection between citizens and the government.”
               </p>
            </div>
         </div>
      </div>
   );
};

export default WhyChooseUs;