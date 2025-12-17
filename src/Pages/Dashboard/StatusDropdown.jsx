
import { FaChevronDown } from 'react-icons/fa';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const StatusDropdown = ({ issue, refetch }) => {
    const axiosSecure = UseAxiosSecure();
    const allowedNextStatus = {
        pending: "in_progress",
        in_progress: "working",
        working: "resolved",
        resolved: "closed"
    };
    const handleChangeStatus = async (issueId, newStatus) => {
        try {
            await axiosSecure.put(`/issues/${issueId}`, {
                status: newStatus
            });
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Status changed to ${newStatus}`,
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        }
    };
    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-sm bg-teal-500 text-white flex items-center gap-1"
            >
                Change Status <FaChevronDown />
            </div>

            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-10 w-44 p-2 shadow"
            >
                <li><button
                    disabled={allowedNextStatus[issue.status] !== "pending"}
                    onClick={() => handleChangeStatus(issue._id, "pending")}>Pending</button></li>
                <li><button
                    disabled={allowedNextStatus[issue.status] !== "in_progress"}
                    onClick={() => handleChangeStatus(issue._id, "in_progress")}>In Progress</button></li>
                <li><button
                    disabled={allowedNextStatus[issue.status] !== "working"}
                    onClick={() => handleChangeStatus(issue._id, "working")}>Working</button></li>
                <li><button
                    disabled={allowedNextStatus[issue.status] !== "resolved"}
                    onClick={() => handleChangeStatus(issue._id, "resolved")}>Resolved</button></li>
                <li><button
                    disabled={allowedNextStatus[issue.status] !== "closed"}
                    onClick={() => handleChangeStatus(issue._id, "closed")}>Closed</button></li>
            </ul>
        </div>
    );
};

export default StatusDropdown;