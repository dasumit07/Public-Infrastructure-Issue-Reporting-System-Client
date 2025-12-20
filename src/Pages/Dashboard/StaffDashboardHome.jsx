import React from 'react';
import UseAuth from '../../Hooks/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const StaffDashboardHome = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const { data = { stats: {}, todayTasks: [] }, isLoading } = useQuery({
        queryKey: ["staff-dashboard", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/staff-dashboard-stats?email=${user.email}`
            );
            return res.data;
        }
    });
    const COLORS = ["#ef4444", "#facc15", "#38bdf8", "#22c55e"];
    const issueData = [
        { name: "Pending", value: data.stats.pending },
        { name: "Working", value: data.stats.working },
        { name: "In Progress", value: data.stats.inProgress },
        { name: "Resolved", value: data.stats.resolvedIssues }
    ];
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 animate__animated animate__fadeIn">

            <div className="stat bg-base-100 shadow hover:shadow-md transition-shadow">
                <div className="stat-title">Assigned Issues</div>
                <div className="stat-value text-primary">
                    {data.stats.assignedIssues}
                </div>
            </div>

            <div className="stat bg-base-100 shadow hover:shadow-md transition-shadow">
                <div className="stat-title">Resolved</div>
                <div className="stat-value text-success">
                    {data.stats.resolvedIssues}
                </div>
            </div>

            <div className="stat bg-base-100 shadow hover:shadow-md transition-shadow">
                <div className="stat-title">Working</div>
                <div className="stat-value text-warning">
                    {data.stats.working}
                </div>
            </div>

            <div className="stat bg-base-100 shadow hover:shadow-md transition-shadow">
                <div className="stat-title">In Progress</div>
                <div className="stat-value text-info">
                    {data.stats.inProgress}
                </div>
            </div>

            <div className="stat bg-base-100 shadow hover:shadow-md transition-shadow">
                <div className="stat-title">Pending</div>
                <div className="stat-value text-error">
                    {data.stats.pending}
                </div>
            </div>
            <div className="bg-base-100 shadow rounded-xl p-4 md:col-span-3">
                <h2 className="text-lg font-semibold mb-4">
                    Issue Status Overview
                </h2>

                <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                        <Pie data={issueData} dataKey="value" outerRadius={90} label>
                            {issueData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-base-100 shadow rounded-xl p-4 md:col-span-2">
      <h2 className="text-lg font-semibold mb-4">Today’s Tasks</h2>

      {data.todayTasks.length === 0 ? (
        <p className="text-gray-500">No tasks for today 🎉</p>
      ) : (
        <ul className="space-y-3">
          {data.todayTasks.map(task => (
            <li key={task._id} className="border p-3 rounded-lg">
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-500">
                {task.location}
              </p>
              <span className={`px-3 py-1  rounded-full text-white text-xs
            ${task.status === "pending" ? "bg-yellow-500" : ""}
            ${task.status === "in_progress" ? "bg-blue-600" : ""}
            ${task.status === "working" ? "bg-blue-600" : ""}
            ${task.status === "resolved" ? "bg-green-600" : ""}
            ${task.status === "closed" ? "bg-gray-600" : ""}
            ${task.status === "rejected" ? "bg-red-600" : ""}
            
          `}>
                {task.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
        </div>
    );
};

export default StaffDashboardHome;