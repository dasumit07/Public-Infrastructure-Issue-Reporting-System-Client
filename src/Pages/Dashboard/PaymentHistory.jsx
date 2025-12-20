import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loading from "../Loading";
import { useState } from "react";
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';

const PaymentHistory = () => {
    const axiosSecure = UseAxiosSecure();
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['all-payments', fromDate, toDate],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (fromDate) params.append('from', fromDate);
            if (toDate) params.append('to', toDate);

            const res = await axiosSecure.get(`/all-payments?${params.toString()}`);
            return res.data;
        },
    });
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="animate__animated animate__fadeIn">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2 m-3">
                Payment History
            </h1>
            <div className="flex gap-2 mb-4 ml-3 items-center">
                <p>From</p>
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="input input-bordered w-[150px]"
                    placeholder="From"
                />
                <p>To</p>
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="input input-bordered w-[150px]"
                    placeholder="To"
                />


            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Name</th>
                            <th>Paid Amount</th>
                            <th>Paid By</th>
                            <th>Paid At</th>
                            <th>Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.length > 0 ? payments.map((payment, i) =>
                                <tr key={payment._id}>
                                    <th>{i + 1}</th>
                                    <td>{payment.transactionId}</td>

                                    {payment?.issueName
                                        ? <td>{payment.issueName}</td>
                                        : <td>{payment.name}</td>
                                    }

                                    <td>${payment.amount}</td>
                                    <td>{payment.email}</td>
                                    <td>{new Date(payment.paidAt).toLocaleDateString()}</td>

                                   
                                    <td>
                                        <PDFDownloadLink
                                            document={<InvoicePDF payment={payment} />}
                                            fileName={`invoice-${payment.transactionId}.pdf`}
                                        >
                                            {({ loading }) =>
                                                loading ? (
                                                    <span className="text-xs text-gray-500">Preparing...</span>
                                                ) : (
                                                    <button className="btn btn-xs bg-teal-500 text-white">
                                                        Download
                                                    </button>
                                                )
                                            }
                                        </PDFDownloadLink>
                                    </td>
                                </tr>
                            )
                                : (
                                    <tr>
                                        <td colSpan="7" className="text-center font-bold text-2xl text-red-500">
                                            No Payment Available
                                        </td>
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