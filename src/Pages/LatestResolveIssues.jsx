import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

import Card from "./Card/Card";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import Loading from "./Loading";


const LatestResolveIssues = () => {
    const axiosSecure = UseAxiosSecure();

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ["latestResolvedIssues"],
        queryFn: async () => {
            const res = await axiosSecure.get("/issues/latest-resolved");
            return res.data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div className="w-11/12 mx-auto mt-12">
            <div className="lg:flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-linear-to-r from-teal-700 to-teal-600 text-transparent bg-clip-text">
                    Latest Resolved Issues
                </h1>

                <Link
                    to="/all-issues"
                    className="font-bold bg-linear-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text hover:underline"
                >
                    View all Issues
                </Link>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {issues.map(issue => (
                    <Card key={issue._id} issue={issue}></Card>
                ))}
            </div>
        </div>
    );
};

export default LatestResolveIssues;