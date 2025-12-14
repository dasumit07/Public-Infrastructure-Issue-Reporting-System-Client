import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from './UseAxiosSecure';

const UseRole = () => {
    const axiosSecure = UseAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['role'],
        queryFn: async () => {
            const res = await axiosSecure.get('/role');
            return res.data;
        },
    });

    return {
        role: data?.role,
        isLoading,
        isError
    };
};

export default UseRole;