import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { SiBoosty } from 'react-icons/si';
import UseAxiosSecure from './UseAxiosSecure';

const BoostButton = ({issue}) => {
    const axiosSecure = UseAxiosSecure();
    const handleBoost = async(issue) => {
            const paymentInfo = {
                issueId: issue._id,
                title: issue.title,
                reporterEmail: issue.reporterEmail,
                trackingId: issue.trackingId
            }
            const res = await axiosSecure.post('/create-payment-intent', paymentInfo);
            window.location.href = res.data.url;
            
        };
    return (
        <div>
            <div
                role="status"
                aria-live="polite"
                className="my-3 flex items-start gap-3 bg-yellow-50 border-l-4 border-yellow-300 p-3 rounded-md"
            >
                <div className="text-yellow-600 mt-0.5">
                    <FiAlertCircle size={18} />
                </div>

                <div>
                    <p className="text-sm text-gray-800 leading-tight">
                        <strong>Boost makes your issue High Priority</strong> and increases
                        visibility.{" "}
                        <span className="font-medium">This feature may involve an additional cost of 100 TK per issue..</span>
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                        Click <span className="font-semibold">Boost</span> to prioritize your issue.
                    </p>
                </div>
            </div>
            <button
                onClick={() => handleBoost(issue)}
                className="btn w-full bg-teal-400 hover:bg-linear-to-r from-teal-700 to-teal-500 text-white font-semibold rounded-2xl py-2 hover:scale-105 transition ease-in-out flex items-center justify-center gap-2"
            >
                <SiBoosty /> <span>Boost</span>
            </button>
        </div>
    );
};

export default BoostButton;