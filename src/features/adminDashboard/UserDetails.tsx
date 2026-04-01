import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../shared/services/axios";

// -------- TYPES --------
type UserType = {
    _id: string;
    name: string;
    email: string;
    role: "student" | "tutor" | "premiumTutor" | "admin";
    isBlocked?: boolean;
    isPremium?: boolean;
    userCreditBalance?: number;
    enrolledCourses?: string[];
tutorProfile?: {
  createdCourses?: string[];
};
};

type CourseType = {
    _id: string;
    title: string;
    totalEnrollments?: number;
};

type EnrollmentType = {
    _id: string;
    courseId?: {
        title: string;
    };
};

export default function UserDetails() {
    const { id } = useParams<{ id: string }>();

    const [user, setUser] = useState<UserType | null>(null);
    const [activeTab, setActiveTab] = useState<"profile" | "learning" | "courses">("profile");

    const [courses, setCourses] = useState<CourseType[]>([]);
    const [enrollments, setEnrollments] = useState<EnrollmentType[]>([]);

    const [loading, setLoading] = useState(false);

    // -------- FETCH USER --------
    useEffect(() => {
        if (!id) return;

        const fetchUser = async () => {
            try {
                const res = await api.get(`/admin/users/${id}`);
                setUser(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUser();
    }, [id]);

    // -------- FETCH BASED ON TAB --------
    useEffect(() => {
        if (!id || !user) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                // ✅ LEARNING (FOR BOTH STUDENT + TUTOR)
                if (activeTab === "learning") {
                    if (enrollments.length > 0) return;
                    const res = await api.get(`/admin/users/${id}`);
                    setEnrollments(res.data.data || []);
                }

                // ✅ COURSES (FOR TUTOR)
                if (
                    (user.role === "tutor" || user.role === "premiumTutor" || user.tutorProfile) &&
                    activeTab === "courses"
                ) {
                    if (courses.length > 0) return;
                    const res = await api.get(`/admin/users/${id}/courses`);
                    setCourses(res.data.data || []);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab, user, id]);

    // -------- BAN / UNBAN --------
    const toggleBlock = async () => {
        if (!id) return;
        await api.patch(`/admin/users/${id}/block`);
        const res = await api.get(`/admin/users/${id}`);
        setUser(res.data.data);
    };

    // -------- TABS --------
    const getTabs = () => {
        if (!user) return [];

        const tabs = ["profile"];

        const isTutor =
            user.role === "tutor" || user.role === "premiumTutor";

        const isStudent =
            (user.enrolledCourses?.length ?? 0) > 0 || (user.userCreditBalance ?? 0) > 0;
        // student features
        if (!isTutor || isStudent) {
            tabs.push("learning");
        }

        // tutor features
        if (isTutor) {
            tabs.push("courses");
        }

        return tabs;
    };

    // -------- LOADING --------
    if (!user) {
        return <div className="p-6 text-gray-400">Loading...</div>;
    }

    if (user.role === "admin") {
        return <p>Admins are not viewable</p>;
    }

    // -------- UI --------
    return (
        <div className="p-6 text-gray-100">
            <h1 className="text-2xl font-semibold mb-6">User Details</h1>

            {/* -------- TABS -------- */}
            <div className="flex gap-2 mb-6 border-b border-gray-800 pb-2">
                {getTabs().map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-4 py-2 text-sm rounded-t-md transition ${activeTab === tab
                            ? "bg-[#161a1f] border border-gray-700 border-b-transparent text-white"
                            : "text-gray-500 hover:text-gray-300"
                            }`}
                    >
                        {tab.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* -------- PROFILE -------- */}
            {activeTab === "profile" && (
                <div className="bg-[#161a1f] border border-gray-700 rounded-xl p-5 space-y-4">
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    <p className="text-sm text-gray-400">{user.email}</p>

                    <div className="flex gap-2">
                        <span className="text-xs px-3 py-1 border border-gray-600 rounded">
                            {user.role}
                        </span>

                        {user.isBlocked && (
                            <span className="text-xs px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/30 rounded">
                                Blocked
                            </span>
                        )}
                    </div>

                    {/* ✅ SHOW CREDITS FOR BOTH */}
                    {((user.enrolledCourses?.length ?? 0) > 0 ||
                        (user.userCreditBalance ?? 0) > 0) && (
                            <p className="text-sm text-gray-400">
                                Credits: {user.userCreditBalance ?? 0}
                            </p>
                        )}

                    <button
                        onClick={toggleBlock}
                        className="px-4 py-2 text-sm border border-red-500 text-red-400 rounded"
                    >
                        {user.isBlocked ? "Unban" : "Ban"}
                    </button>
                </div>
            )}

            {/* -------- LEARNING (FOR BOTH) -------- */}
            {activeTab === "learning" && (
                <div className="bg-[#161a1f] border border-gray-700 rounded-lg p-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : enrollments.length === 0 ? (
                        <p>No enrolled courses</p>
                    ) : (
                        <ul>
                            {enrollments.map((e) => (
                                <li key={e._id}>{e.courseId?.title || "No title"}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* -------- COURSES -------- */}
            {activeTab === "courses" && (
                <div className="grid gap-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : courses.length === 0 ? (
                        <p>No courses</p>
                    ) : (
                        courses.map((c) => (
                            <div
                                key={c._id}
                                className="border border-gray-700 p-4 rounded"
                            >
                                <h3>{c.title}</h3>
                                <p>Enrollments: {c.totalEnrollments || 0}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}