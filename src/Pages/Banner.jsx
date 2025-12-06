import React from 'react';

const Banner = () => {
    return (
        <div className='mt-14'>
            <section className="w-11/12 mx-auto bg-teal-800 h-[80vh] flex items-center">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    <div className="text-center lg:ml-5 lg:text-left">
      <h1 className="text-5xl font-bold text-white">
        Report City Issues Effortlessly
      </h1>
      <p className="mt-4 text-white/90 text-lg">
        Our platform allows citizens to report issues such as potholes, broken streetlights, water leakage and more directly to the relevant authorities
      </p>
      <div className="mt-6 flex gap-4 justify-center lg:justify-start">
        <button className="px-6 py-3 bg-teal-500 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold hover:scale-105 transition ease-in-out rounded-2xl ">Report an Issue</button>
      </div>
    </div>
    <div className="flex justify-center">
      <img src="https://i.ibb.co.com/23jRV6LF/Chat-GPT-Image-Dec-6-2025-05-38-16-PM.png" alt="Service Illustration" className="w-3/4"/>
    </div>

  </div>
</section>

        </div>
    );
};

export default Banner;