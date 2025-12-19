import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const AdminDashboardHome = () => {
    const axiosSecure = UseAxiosSecure();

    const { data = {
        issueStats: [{}],
        paymentStats: [{}],
        latestIssues: [],
        latestPayments: [],
        latestUsers: []
    }, isLoading } = useQuery({
        queryKey: ["admin-dashboard-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-dashboard-stats");
            return res.data;
        }
    });
    const COLORS = ["#ef4444", "#facc15", "#38bdf8", "#22c55e"];

    const issueData = [
        { name: "Pending", value: data.issueStats?.[0]?.pending || 0 },
        { name: "Working", value: data.issueStats?.[0]?.working || 0 },
        { name: "In Progress", value: data.issueStats?.[0]?.inProgress || 0 },
        { name: "Resolved", value: data.issueStats?.[0]?.resolved || 0 },
        { name: "Rejected", value: data.issueStats?.[0]?.rejected || 0 }
    ];

    const paymentData = [
        {
            name: "Payments",
            amount: data.paymentStats[0]?.totalPayments
        }
    ];
    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(data)
    return (
        <div className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="stat bg-base-100 shadow hover:shadow-md transition-shadow">
                    <div className="stat-title">Total Issues</div>
                    <div className="stat-value text-primary">{data.issueStats[0]?.totalIssues || 0}</div>
                </div>

                <div className="stat bg-base-100 shadow hover:shadow-md transition-shadow">
                    <div className="stat-title">Resolved Issues</div>
                    <div className="stat-value text-success">{data.issueStats[0]?.resolved || 0}</div>
                </div>

                <div className="stat bg-base-100 shadow hover:shadow-md transition-shadow">
                    <div className="stat-title">Pending Issues</div>
                    <div className="stat-value text-warning">{data.issueStats[0]?.pending || 0}</div>
                </div>

                <div className="stat bg-base-100 shadow hover:shadow-md transition-shadow">
                    <div className="stat-title">Rejected Issues</div>
                    <div className="stat-value text-error">{data.issueStats[0]?.rejected || 0}</div>
                </div>

                <div className="stat bg-base-100 shadow hover:shadow-md transition-shadow">
                    <div className="stat-title">Total Payments</div>
                    <div className="stat-value text-secondary">${data.paymentStats?.[0]?.totalPayments || 0}</div>
                    <div className="stat-desc">Transactions: {data.paymentStats?.[0]?.totalTransactions}</div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie
                            data={issueData}
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            dataKey="value"
                            label
                        >
                            {issueData?.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>

                <h2 className="text-lg font-semibold mb-4">
                    Payment Summary
                </h2>

                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={paymentData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#a855f7" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-base-100 shadow-lg rounded-xl p-4">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Latest Issues</h2>
                    <ul className="space-y-3">
                        {data?.latestIssues?.map((issue) => (
                            <li
                                key={issue._id}
                                className="p-3 border rounded-lg hover:shadow-md transition-shadow flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="font-semibold text-md">{issue.title}</h3>
                                    <p className="text-sm text-gray-500">{new Date(issue.createdAt).toLocaleString()}</p>
                                </div>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold 
              ${issue.status === "resolved" ? "bg-green-100 text-green-800" : ""}
              ${issue.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
              ${issue.status === "rejected" ? "bg-red-100 text-red-800" : ""}
              ${issue.status === "working" ? "bg-blue-100 text-blue-800" : ""}
              ${issue.status === "in_progress" ? "bg-blue-100 text-blue-800" : ""}
            `}
                                >
                                    {issue.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-base-100 shadow-lg rounded-xl p-4">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Latest Payments</h2>
                    <ul className="space-y-3">
                        {data?.latestPayments?.map((payment) => (
                            <li
                                key={payment._id}
                                className="p-3 border rounded-lg hover:shadow-md transition-shadow flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-semibold">${(Number(payment.amount) || 0).toFixed(2)}</p>
                                    <p className="text-sm text-gray-500">{payment.email}</p>
                                </div>
                                <span className="text-xs text-gray-600">
                                    {new Date(payment.paidAt).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-base-100 shadow-lg rounded-xl p-4">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Latest Registered Users</h2>
                    <ul className="space-y-3">
                        {data?.latestUsers?.map((user) => (
                            <li
                                key={user._id}
                                className="p-3 border rounded-lg hover:shadow-md transition-shadow flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="font-semibold text-md">{user.name}</h3>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                                <span className="text-xs text-gray-600">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
    );
};

export default AdminDashboardHome;