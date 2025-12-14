"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useConvexUser, useConvexUserId } from "@/components/ClerkUserSync";
import { children as childrenStorage, sessions as sessionsStorage, payments as paymentsStorage } from "@/lib/storage";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const user = useConvexUser();
  const userId = useConvexUserId();
  const [userChildren, setUserChildren] = useState(childrenStorage.getByUser(userId || ""));
  const [userSessions, setUserSessions] = useState(sessionsStorage.getByUser(userId || ""));
  const [userPayments, setUserPayments] = useState(paymentsStorage.getByUser(userId || ""));

  useEffect(() => {
    if (userId) {
      setUserChildren(childrenStorage.getByUser(userId));
      setUserSessions(sessionsStorage.getByUser(userId));
      setUserPayments(paymentsStorage.getByUser(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (user && user.role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [user, router]);

  if (!user || user.role === "admin") {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome, {user.name}!</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Upcoming Sessions</h3>
              <p className="text-3xl font-bold text-primary-600">
              {userSessions?.filter((s) => s.status === "scheduled").length || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Completed Sessions</h3>
            <p className="text-3xl font-bold text-green-600">
              {userSessions?.filter((s) => s.status === "completed").length || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Payments</h3>
            <p className="text-3xl font-bold text-blue-600">
              ₹{userPayments?.reduce((sum, p) => sum + (p.status === "completed" ? p.amount : 0), 0) || 0}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Children Profiles</h2>
              <Link
                href="/dashboard/children/new"
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                + Add Child
              </Link>
            </div>
            {userChildren && userChildren.length > 0 ? (
              <div className="space-y-4">
                {userChildren.map((child) => (
                  <div key={child._id} className="border border-gray-200 rounded-md p-4">
                    <h3 className="font-semibold text-gray-800">{child.name}</h3>
                    <p className="text-sm text-gray-600">Age: {child.age}</p>
                    <p className="text-sm text-gray-600">Diagnosis: {child.diagnosis}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No children profiles yet.</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booked Sessions</h2>
            {userSessions && userSessions.length > 0 ? (
              <div className="space-y-4">
                {userSessions.map((session) => {
                  const sessionChild = session.childId ? childrenStorage.getById(session.childId) : null;
                  return (
                    <div key={session._id} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800">{session.therapyType}</h3>
                          <p className="text-sm text-gray-600">
                            {formatDate(session.sessionDate)} at {session.sessionTime}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            session.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : session.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {session.status}
                        </span>
                      </div>
                      {sessionChild && (
                        <p className="text-sm text-gray-600">Child: {sessionChild.name}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-2">{session.concern}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-600">No sessions booked yet.</p>
            )}
            <Link
              href="/booking"
              className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-semibold"
            >
              Book New Session →
            </Link>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment History</h2>
          {userPayments && userPayments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Amount</th>
                    <th className="text-left py-2 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userPayments.map((payment) => (
                    <tr key={payment._id} className="border-b">
                      <td className="py-2 px-4">{formatTime(payment.paymentDate)}</td>
                      <td className="py-2 px-4">₹{payment.amount}</td>
                      <td className="py-2 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            payment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : payment.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No payment history yet.</p>
          )}
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Progress Notes</h2>
          {userChildren && userChildren.length > 0 ? (
            <div className="space-y-4">
              {userChildren.map((child) => {
                const childSessions = userSessions?.filter((s) => s.childId === child._id) || [];
                return (
                  <div key={child._id} className="border border-gray-200 rounded-md p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{child.name}</h3>
                    {childSessions.length > 0 ? (
                      <p className="text-sm text-gray-600">
                        {childSessions.filter((s) => s.status === "completed").length} completed
                        session(s). Progress notes available from therapist.
                      </p>
                    ) : (
                      <p className="text-sm text-gray-600">No sessions yet.</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">No progress notes available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

