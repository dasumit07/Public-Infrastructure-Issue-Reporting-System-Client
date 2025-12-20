import React from "react";
import { IoMdDoneAll } from "react-icons/io";

const AboutUs = () => {
    return (
        <div className="w-11/12 mx-auto py-12 mt-15 animate__animated animate__fadeIn">
  
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-linear-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text">
                    About Us
                </h1>
                <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                    Public Infrastructure Issue Reporting System
                </p>
            </div>

       
            <div className="space-y-12">
           
                <section>
                    <h2 className="text-2xl font-semibold mb-3 bg-linear-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text">
                        Public Infrastructure Issue Reporting System
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        The Public Infrastructure Issue Reporting System is a modern digital
                        platform designed to empower citizens to report, track, and monitor
                        public infrastructure issues efficiently. Citizens can report
                        problems such as broken streetlights, potholes, water leakage,
                        garbage overflow, damaged footpaths, and other civic concerns.
                    </p>
                </section>

                {/* Section 2 */}
                <section>
                    <h2 className="text-2xl font-semibold mb-3 bg-linear-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text">
                        Why We Built This Platform
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Many public infrastructure issues remain unresolved due to delayed
                        response, lack of transparency, and the absence of a centralized
                        reporting system. This platform was created to provide a structured
                        and transparent workflow that ensures issues are managed
                        efficiently from reporting to resolution.
                    </p>
                </section>

         
                <section>
                    <h2 className="text-2xl font-semibold mb-3 bg-linear-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text">How It Works</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Citizens submit issues with details, photos, and location.</li>
                        <li>Admins review reports and assign issues to staff.</li>
                        <li>Staff verify issues and update progress.</li>
                        <li>
                            Issues move through clear stages: Pending → In Progress → Working
                            → Resolved → Closed.
                        </li>
                        <li>
                            Citizens can track their issues and receive updates anytime.
                        </li>
                        <li>Premium citizens receive priority support.</li>
                    </ul>
                </section>

      
                <section>
                    <h2 className="text-2xl font-semibold mb-3 bg-linear-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text">Key Benefits</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <li className="flex items-center gap-1"><IoMdDoneAll /> Improved transparency</li>
                        <li className="flex items-center gap-1"><IoMdDoneAll /> Faster issue resolution</li>
                        <li className="flex items-center gap-1"><IoMdDoneAll /> Centralized reporting system</li>
                        <li className="flex items-center gap-1"><IoMdDoneAll /> Better infrastructure data analysis</li>
                        <li className="flex items-center gap-1"><IoMdDoneAll /> Stronger citizen–authority collaboration</li>
                        <li className="flex items-center gap-1"><IoMdDoneAll /> More efficient city services</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3 bg-linear-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text">Our Mission</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Our mission is to provide a reliable, user-friendly, and transparent
                        platform that connects citizens with authorities and ensures public
                        infrastructure issues are addressed efficiently and responsibly.
                    </p>
                </section>

           
                <section>
                    <h2 className="text-2xl font-semibold mb-3 bg-linear-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text">Our Vision</h2>
                    <p className="text-gray-700 leading-relaxed">
                        We envision smarter and more responsive cities where citizens play
                        an active role in improving public infrastructure through technology,
                        collaboration, and transparency.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
