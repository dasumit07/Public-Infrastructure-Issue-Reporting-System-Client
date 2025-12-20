import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { IoLocationSharp } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";

const Card = ({ issue }) => {
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();
    const { user } = UseAuth();
    const [upvoteCount, setUpvoteCount] = useState(
        issue.upVotes ? issue.upVotes.length : 0
    );
    const [hasUpvoted, setHasUpvoted] = useState(
        issue.upVotes?.includes(user?.email)
    );
    const { data: profile } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await axiosSecure.get("/profile");
            return res.data;
        }
    });
    const isBlocked = profile?.status === "blocked";
    const handleUpvote = async () => {

        if (!user) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please login to upvote"
            });
            return navigate("/auth/login");
        }


        if (issue.reporterEmail === user.email) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You cannot upvote your own issue"
            });
        }

        if (hasUpvoted) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You already upvoted"
            });
        }

        try {
            const res = await axiosSecure.post(
                `/issues/${issue._id}/upvote`
            );

            setUpvoteCount(res.data.upvoteCount);
            setHasUpvoted(true);
            toast.success("Upvoted successfully 👍");
        } catch (error) {
            toast.error(error.response?.data?.message || "Upvote failed");
        }
    };

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

            {/* Status + Priority */}
            <div className="flex items-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-white text-xs
          ${issue.status === "pending" && "bg-yellow-500"}
          ${issue.status === "in_progress" && "bg-blue-600"}
          ${issue.status === "working" && "bg-blue-600"}
          ${issue.status === "resolved" && "bg-green-600"}
          ${issue.status === "rejected" && "bg-red-600"}
        `}>
                    {issue.status}
                </span>

                <span className={`px-3 py-1 text-xs rounded-full text-white
          ${issue.priority === "High" ? "bg-red-600" : "bg-gray-600"}
        `}>
                    {issue.priority}
                </span>
            </div>

            {/* Location */}
            <p className="text-sm text-gray-600 mt-2 flex items-center gap-1">
                <IoLocationSharp /> {issue.location}
            </p>

            {/* Upvote + Details */}
            <div className="flex items-center justify-between mt-4">
                {/* Upvote */}
                <button
                    onClick={handleUpvote}
                    disabled={hasUpvoted || isBlocked}
                    className={`flex items-center gap-1 text-sm px-3 py-1 rounded-full transition
                   ${hasUpvoted || isBlocked
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-gray-100 hover:bg-gray-200"}
                   `}
                >
                    <AiFillLike />
                    {upvoteCount}
                </button>

                {/* Details */}
                <Link to={`/issues/${issue._id}`}>
                    <button className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Card;
