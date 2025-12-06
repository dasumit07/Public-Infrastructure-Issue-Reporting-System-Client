import React from 'react';
import { GrUserAdmin } from 'react-icons/gr';
import { IoIosCloudDone } from 'react-icons/io';
import { MdOutlinePendingActions, MdOutlineReportProblem } from 'react-icons/md';

const HowItWorks = () => {
    return (
        <div className='bg-gray-50'>
            <h2 className="text-3xl font-bold text-center mb-5 text-teal-700">
   How CityFix Works
</h2>
<p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
   Our smart reporting system connects citizens with authorities for faster, transparent, and efficient issue resolution.
</p>
<div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-5 md:px-20">
<div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg transition hover:scale-105 ease-in-out">
    <h2 className='mb-3 text-teal-600 font-semibold text-lg'>Step-1</h2>
   <div class="text-teal-600 text-5xl mb-4 flex items-center justify-center"><MdOutlineReportProblem /></div>
   <h3 className="font-semibold text-xl mb-2">Submit a Report</h3>
   <p className="text-gray-600 text-sm">
      Citizens submit issues with photos & location.
   </p>
</div>
<div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg hover:scale-105 transition ease-in-out">
    <h2 className='mb-3 text-teal-600 font-semibold text-lg'>Step-2</h2>
   <div class="text-teal-600 text-5xl mb-4 flex items-center justify-center"><GrUserAdmin /></div>
   <h3 className="font-semibold text-xl mb-2">Admin Verification</h3>
   <p className="text-gray-600 text-sm">
      Admin checks the report and assigns a staff member.
   </p>
</div>
<div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg hover:scale-105 transition ease-in-out">
    <h2 className='mb-3 text-teal-600 font-semibold text-lg'>Step-3</h2>
   <div class="text-teal-600 text-5xl mb-4 flex items-center justify-center"><MdOutlinePendingActions /></div>
   <h3 className="font-semibold text-xl mb-2">Staff Action</h3>
   <p className="text-gray-600 text-sm">
      Assigned staff verifies and updates progress.
   </p>
</div>
<div className="p-6 bg-white shadow-md rounded-xl text-center hover:shadow-lg hover:scale-105 transition ease-in-out">
    <h2 className='mb-3 text-teal-600 font-semibold text-lg'>Step-4</h2>
   <div class="text-teal-600 text-5xl mb-4 flex items-center justify-center"><IoIosCloudDone /></div>
   <h3 className="font-semibold text-xl mb-2">Resolved & Closed</h3>
   <p className="text-gray-600 text-sm">
      Timeline updates & citizens get notified instantly.
   </p>
</div>
</div>
        </div>
    );
};

export default HowItWorks;