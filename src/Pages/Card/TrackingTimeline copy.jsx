import React from 'react';

const TrackingTimeline = ({ issue }) => {
    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text">
                Issue Tracking Timeline
            </h2>

            <ul className="timeline timeline-vertical">

                {[...(issue.timeline || [])]
                    .sort((a, b) => new Date(b.at) - new Date(a.at))
                    .map((item, index, arr) => (
                        <li key={index}>

                            {index !== 0 && <hr />}


                            <div
                                className={`${index % 2 === 0
                                    ? "timeline-start text-end"
                                    : "timeline-end"
                                    } timeline-box`}
                            >
                                <div className="space-y-1">


                                    {item.status && (
                                        <span className={`badge badge-sm text-white
                  ${item.status === "pending" && "bg-yellow-500"}
                  ${item.status === "in_progress" && "bg-blue-500"}
                  ${item.status === "working" && "bg-blue-500"}
                  ${item.status === "resolved" && "bg-green-600"}
                  ${item.status === "closed" && "bg-gray-700"}
                `}>
                                            {item.status}
                                        </span>
                                    )}


                                    <p className="font-semibold text-gray-700">
                                        {item.message}
                                    </p>


                                    <p className="text-xs text-gray-500">
                                        Updated by{" "}
                                        <span className="font-medium">
                                            {item.name} ({item.updatedBy})
                                        </span>
                                    </p>


                                    <p className="text-xs text-gray-400">
                                        {new Date(item.at).toLocaleString()}
                                    </p>
                                </div>
                            </div>


                            <div className="timeline-middle">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={`h-5 w-5
                ${item.updatedBy === "Citizen" && "text-green-500"}
                ${item.updatedBy === "Staff" && "text-blue-500"}
                ${item.updatedBy === "Admin" && "text-red-500"}
              `}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                         
                            {index !== arr.length - 1 && <hr />}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default TrackingTimeline;