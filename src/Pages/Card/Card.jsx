import React from 'react';
import { Link } from 'react-router';
import { IoLocationSharp } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";

const Card = ({ issue }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm border hover:shadow-lg transition animate__animated animate__fadeInDown">
            {/* Image */}
            <img
                src={issue.imageUrl}
                alt={issue.title}
                className="w-full h-40 object-cover rounded-xl"
            />

            {/* Title */}
            <h2 className="text-lg font-semibold mt-3">{issue.title}</h2>

            {/* Category */}
            <p className="text-sm text-gray-500 mt-1">
                Category: <span className="font-medium">{issue.category}</span>
            </p>

            {/* Status + Priority Badges */}
            <div className="flex items-center gap-2 mt-2">
                <span
                    className={`px-3 py-1  rounded-full text-white text-xs
            ${issue.status === "pending" ? "bg-yellow-500" : ""}
            ${issue.status === "in_progress" ? "bg-blue-600" : ""}
            ${issue.status === "working" ? "bg-blue-600" : ""}
            ${issue.status === "resolved" ? "bg-green-600" : ""}
            ${issue.status === "closed" ? "bg-gray-600" : ""}
            
          `}
                >
                    {issue.status}
                </span>
                {
                    issue.priority === "High" ? <span className='px-3 py-1 text-xs rounded-full text-white bg-red-600'>{issue.priority}</span> : <span className='px-3 py-1 text-xs rounded-full text-white bg-gray-600'>{issue.priority}</span>
                }
            </div>

            {/* Location */}
            <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
                <IoLocationSharp /> {issue.location}
            </p>

            {/* Upvote + Details */}
            <div className="flex items-center justify-between mt-4">
                {/* Upvote */}
                <button
                    className="flex items-center gap-1 text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
                >
                    <AiFillLike /> UpVote
                </button>

                {/* View Details */}
                <Link to={`/issues/${issue._id}`}><button className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition">
                    View Details
                </button></Link>
            </div>
        </div>

    );
};

export default Card;