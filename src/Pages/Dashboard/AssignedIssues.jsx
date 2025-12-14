import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const AssignedIssues = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: issues = [], } = useQuery({
        queryKey: ['assigned-issues'],
        queryFn: async () => {
            const res = await axiosSecure.get('/staff/issues');
            return res.data;
        }
    })
    return (
        <div>
            Assigned issues {issues.length}
        </div>
    );
};

export default AssignedIssues;