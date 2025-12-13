import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";


const PaymentHistory = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['all-payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-payments');
            return res.data
        }
    })

    return (
        <div>
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
                            payments.map((payment, i) =>
                                 <tr key={payment.issueId}>
                            <th>{i+1}</th>
                            <td>{payment.transactionId}</td>
                            <td>{payment.issueName}</td>
                            <td>${payment.amount}</td>
                            <td>{payment.email}</td>
                            <td>{payment.paidAt}</td>
                        </tr>
                            )
                        }
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;