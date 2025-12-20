import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import UseAuth from '../../Hooks/UseAuth';
import {
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    Cell,
    BarChart,
    XAxis,
    YAxis,
    Bar
} from 'recharts';
import Loading from '../Loading';

const CitizenDashboardHome = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const { data = {
        issueStats: {
            totalIssues: 0,
            pending: 0,
            working: 0,
            inProgress: 0,
            resolved: 0
        },
        paymentStats: {
            totalPayments: 0,
            totalTransactions: 0
        }
    }, isLoading } = useQuery({
        queryKey: ['citizen-dashboard-stats', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/citizen-dashboard-stats?email=${user.email}`
            );
            return res.data;
        }
    });

    const COLORS = ["#ef4444", "#facc15", "#38bdf8", "#22c55e"];

    const issueData = [
        { name: "Pending", value: data.issueStats.pending },
        { name: "Working", value: data.issueStats.working },
        { name: "In Progress", value: data.issueStats.inProgress },
        { name: "Resolved", value: data.issueStats.resolved }
    ];
    const paymentData = [
        {
            name: "Payments",
            amount: data.paymentStats.totalPayments
        }
    ];
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 animate__animated animate__fadeIn">

            <div className="stat bg-base-100 shadow rounded-xl hover:shadow-md transition-shadow">
                <div className="stat-title">Total Issues</div>
                <div className="stat-value text-primary">
                    {data.issueStats.totalIssues}
                </div>
            </div>

            <div className="stat bg-base-100 shadow rounded-xl hover:shadow-md transition-shadow">
                <div className="stat-title">Pending</div>
                <div className="stat-value text-error">
                    {data.issueStats.pending}
                </div>
            </div>

            <div className="stat bg-base-100 shadow rounded-xl hover:shadow-md transition-shadow">
                <div className="stat-title">In Progress</div>
                <div className="stat-value text-info">
                    {data.issueStats.inProgress}
                </div>
            </div>

            <div className="stat bg-base-100 shadow rounded-xl hover:shadow-md transition-shadow">
                <div className="stat-title">Working</div>
                <div className="stat-value text-warning">
                    {data.issueStats.working}
                </div>
            </div>

            <div className="stat bg-base-100 shadow rounded-xl hover:shadow-md transition-shadow">
                <div className="stat-title">Resolved</div>
                <div className="stat-value text-success">
                    {data.issueStats.resolved}
                </div>
            </div>

            <div className="stat bg-base-100 shadow rounded-xl">
                <div className="stat-title">Total Payments</div>
                <div className="stat-value text-secondary">
                    $ {data.paymentStats.totalPayments}
                </div>
                <div className="stat-desc">
                    Transactions: {data.paymentStats.totalTransactions}
                </div>
            </div>

            <div className="md:col-span-3 bg-base-100 shadow rounded-xl p-4">
                <h2 className="text-lg font-semibold mb-4">
                    Issue Status Breakdown
                </h2>

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
                            {issueData.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-base-100 shadow rounded-xl p-4 md:col-span-3">
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
        </div>
    );
};

export default CitizenDashboardHome;
