import React from 'react';
import { FaSearchLocation, FaUserShield } from 'react-icons/fa';
import { GrMapLocation } from 'react-icons/gr';
import { MdOutlineReportProblem } from 'react-icons/md';
import { RiGovernmentFill, RiUserCommunityFill } from 'react-icons/ri';

const OurFeatures = () => {
    return (
        <section class="py-20 bg-gray-50">
  <div class="container mx-auto text-center">
    
    <h2 class="text-4xl font-bold  bg-linear-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text">Our Key Features</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14 w-11/12 mx-auto">

      <div class="p-6 bg-white rounded-2xl shadow hover:scale-105 transition ease-in-out">
        <div class="text-teal-600 text-5xl mb-4 flex items-center justify-center"><MdOutlineReportProblem /></div>
        <h3 class="font-semibold text-xl">Easy Issue Reporting</h3>
        <p class="text-gray-500 mt-2">“Submit problems related to roads, lights, water lines in just minutes.”</p>
      </div>

      <div class="p-6 bg-white rounded-2xl shadow hover:scale-105 transition ease-in-out">
        <div class="text-teal-600 text-5xl mb-4 flex items-center justify-center"><FaSearchLocation /></div>
        <h3 class="font-semibold text-xl">Real-Time Tracking</h3>
        <p class="text-gray-500 mt-2">“Track your reported issues from pending to solved.”</p>
      </div>

      <div class="p-6 bg-white rounded-2xl shadow hover:scale-105 transition ease-in-out">
        <div class="text-teal-600 text-5xl mb-4 flex items-center justify-center"><GrMapLocation /></div>
        <h3 class="font-semibold text-xl">Location-Based Reports</h3>
        <p class="text-gray-500 mt-2">“Pinpoint the exact location for quicker response.”</p>
      </div>

      <div class="p-6 bg-white rounded-2xl shadow hover:scale-105 transition ease-in-out">
        <div class="text-teal-600 text-5xl mb-4 flex items-center justify-center"><RiGovernmentFill /></div>
        <h3 class="font-semibold text-xl">Quick Government Response</h3>
        <p class="text-gray-500 mt-2">“Authorities get instant notifications for every issue.”</p>
      </div>

      <div class="p-6 bg-white rounded-2xl shadow hover:scale-105 transition ease-in-out">
        <div class="text-teal-600 text-5xl mb-4 flex items-center justify-center"><RiUserCommunityFill /></div>
        <h3 class="font-semibold text-xl">Community Transparency</h3>
        <p class="text-gray-500 mt-2">“Everyone can see ongoing issues and solutions.”</p>
      </div>

      <div class="p-6 bg-white rounded-2xl shadow hover:scale-105 transition ease-in-out">
        <div class="text-teal-600 text-5xl mb-4 flex items-center justify-center"><FaUserShield /></div>
        <h3 class="font-semibold text-xl">Secure & User Friendly</h3>
        <p class="text-gray-500 mt-2">“Your data is safe and the system is easy to use.”</p>
      </div>

    </div>

  </div>
</section>

    );
};

export default OurFeatures;