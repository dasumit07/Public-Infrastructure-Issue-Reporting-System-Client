import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Loading from "../Loading";
import { useNavigate, useSearchParams } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { MdWorkspacePremium } from "react-icons/md";

const CitizenProfile = () => {
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const hasVerified = useRef(false);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting }
    } = useForm();


    const { data: user, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await axiosSecure.get("/profile");
            return res.data;
        }
    });

    const updateProfileMutation = useMutation({
        mutationFn: (data) =>


            axiosSecure.patch("/profile", data),
        onSuccess: () => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Profile updated successfully",
                showConfirmButton: false,
                timer: 1500
            });
            setEditMode(false);
            queryClient.invalidateQueries(["profile"]);
        }
    });

    const subscribeMutation = useMutation({
        mutationFn: () => axiosSecure.post("/subscribe"),
        onSuccess: (res) => {
            window.location.replace(res.data.url);
        }
    });

    const verifySubscriptionMutation = useMutation({
        mutationFn: (sessionId) =>
            axiosSecure.patch(`/subscription-success?session_id=${sessionId}`),
        onSuccess: () => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "🎉 Premium activated!",
                showConfirmButton: false,
                timer: 1500
            });
            queryClient.invalidateQueries(["profile"]);
            navigate("/dashboard/profile", { replace: true });
        }
    });

    useEffect(() => {
        if (sessionId && !hasVerified.current) {
            hasVerified.current = true;
            verifySubscriptionMutation.mutate(sessionId);
        }
    }, [sessionId]);

    useEffect(() => {
        if (user) {
            reset({
                displayName: user.displayName,
                photoURL: user.photoURL
            });
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        const photoFile = data.image[0];

        const formData = new FormData();
        formData.append("image", photoFile);

        const imgRes = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageApiKey}`,
            formData
        );

        const photoURL = imgRes.data.data.display_url;
        const updateData = {
            displayName: data?.displayName,
            photoURL:  photoURL
        }
        updateProfileMutation.mutate(updateData);
    };

    if (isLoading) return <Loading></Loading>

    return (
        <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow-xl rounded-2xl">

            {/* PROFILE HEADER */}
            <div className="flex flex-col items-center gap-4">
                <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-28 h-28 rounded-full border-4 border-teal-500 object-cover"
                />

                <h2 className="text-2xl font-bold flex items-center gap-2">
                    {user.displayName}
                    {user.isPremium && (
                        <span className="badge badge-warning text-white">
                            <MdWorkspacePremium /> Premium
                        </span>
                    )}
                </h2>

                <p className="text-gray-500">{user.email}</p>
            </div>

            {/* BLOCKED WARNING */}
            {user.status === "blocked" && (
                <div className="alert alert-error mt-6">
                    ⚠ Your account is blocked. Please contact authorities.
                </div>
            )}

            {/* EDIT PROFILE */}
            {user.status === "active" && (
                <div className="mt-6 space-y-4">
                    {editMode ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <input
                                {...register("displayName", { required: true })}
                                className="input input-bordered w-full"
                                placeholder="Display Name"
                            />

                            <input

                                type="file"
                                className="file-input file-input-accent border rounded w-full"
                                {...register("image")}
                            />

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-success"
                                >
                                    {isSubmitting ? "Saving..." : "Save"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setEditMode(false)}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="btn btn-outline btn-primary hover:scale-105 transition ease-in-out"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            )}

            {/* SUBSCRIPTION */}
            {!user.isPremium && user.status === "active" && (
                <div className="mt-8 border-t pt-6 text-center">
                    <div className="mb-3">
                        <p className="text-sm text-gray-800 leading-tight">
                            <strong className="text-yellow-500">Upgrade to Premium</strong> and increases
                            visibility.{" "}
                            <span className="font-medium text-red-500">This feature may involve an additional cost of 1000 TK</span>
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            Click <span className="font-semibold">Subscribe Now</span> for Unlimited issue submission!
                        </p>
                    </div>
                    <button
                        onClick={() => subscribeMutation.mutate()}
                        className="btn bg-teal-600 text-white hover:bg-teal-700 hover:scale-105 transition ease-in-out"
                    >
                        Subscribe Now
                    </button>
                </div>
            )}
        </div>
    );
};

export default CitizenProfile;
