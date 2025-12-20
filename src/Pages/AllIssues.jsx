import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../Hooks/UseAxiosSecure';
import Card from './Card/Card';
import Loading from './Loading';

const AllIssues = () => {
    const axiosSecure = UseAxiosSecure();

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');

    const [page, setPage] = useState(1);
    const [limit] = useState(9);

    const { data: issuesData = {}, isLoading, refetch } = useQuery({
        queryKey: ['all-issues', search, status, priority, category, page],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (status) params.append('status', status);
            if (priority) params.append('priority', priority);
            if (category) params.append('category', category);
            params.append('page', page);
            params.append('limit', limit);

            const res = await axiosSecure.get(`/issues/all?${params.toString()}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        refetch();
    };
    useEffect(() => {
        refetch();
    }, [status, priority, category, refetch]);
    if (isLoading) return <Loading></Loading>

    return (
        <div className='mt-20'>
            <h1 className="text-center text-3xl font-bold mt-10">
                All Issues
            </h1>

            <form className='md:flex justify-center ml-8 gap-2 mt-5' onSubmit={handleSubmit}>
                <input
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border px-4 py-2 rounded mb-3"
                />
                <button type="submit" className='btn bg-teal-400 text-white px-4 py-2'>Search</button>
                <div className='md:flex gap-1'>
                    <select className="select select-warning w-[100px]" value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="working">Working</option>
                        <option value="resolved">Resolved</option>
                    </select>
                    <select className="select select-warning w-[110px]" value={priority} onChange={e => setPriority(e.target.value)}>
                        <option value="">All Priority</option>
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                    </select>
                    <select className="select select-warning w-[130px]" value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Road Damage">Road Damage</option>
                        <option value="Street Light">Street Light</option>
                        <option value="Garbage">Garbage</option>
                        <option value="Water Logging">Water Logging</option>
                        <option value="Illegal Parking">Illegal Parking</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

            </form>

            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6 w-11/12 mx-auto my-10">
                {issuesData.data?.length > 0 ? issuesData.data.map(issue => (
                    <Card key={issue._id} issue={issue} />
                )) : <div className='m-8 text-center font-bold text-2xl text-red-500'>No Issue Available</div>}
            </div>
            <div className="flex justify-center gap-2 my-5">
                {Array.from({ length: issuesData.totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-4 py-2 border hover:cursor-pointer ${page === i + 1 ? 'bg-teal-400 text-white' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllIssues;