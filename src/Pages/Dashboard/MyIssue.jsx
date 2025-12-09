import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from '../../Hooks/UseAuth';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const MyIssue = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();
    const { data: issue = [] } = useQuery({
        queryKey: ['my-issue', user.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/issues?email=${user.email}`);
            return res.data;
        }
    })
    return (
        <div>
            my issue page {issue.length}
        </div>
    );
};

export default MyIssue;