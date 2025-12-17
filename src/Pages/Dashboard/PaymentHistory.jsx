import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loading from "../Loading";


const PaymentHistory = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['all-payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-payments');
            return res.data
        }
    })
    if(isLoading){
            return <Loading></Loading>
        }
    return (
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2 m-3">
                Payment History
            </h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Issue Name</th>
                            <th>Paid Amount</th>
                            <th>Paid By</th>
                            <th>Paid At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                         payments.length > 0 ?   payments.map((payment, i) =>
                                 <tr key={payment.issueId}>
                            <th>{i+1}</th>
                            <td>{payment.transactionId}</td>
                            <td>{payment.issueName}</td>
                            <td>${payment.amount}</td>
                            <td>{payment.email}</td>
                            <td>{payment.paidAt}</td>
                        </tr>
                            ) : <><><div className='m-8 text-center font-bold text-2xl text-red-500'>No Payment Available</div></></>
                        }
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;