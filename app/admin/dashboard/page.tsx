"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useConvexUser, useConvexUserId } from "@/components/ClerkUserSync";
import { slots as slotsStorage, sessions as sessionsStorage, children as childrenStorage, payments as paymentsStorage, users as usersStorage } from "@/lib/storage";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const user = useConvexUser();
  const userId = useConvexUserId();
  const [activeTab, setActiveTab] = useState<"slots" | "clients" | "sessions" | "payments">("slots");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome, {user.name}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            {[
              { id: "slots" as const, label: "Slot Management" },
              { id: "clients" as const, label: "Client Management" },
              { id: "sessions" as const, label: "Session Records" },
              { id: "payments" as const, label: "Payment Monitoring" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "slots" && userId && <SlotManagement userId={userId} />}
        {activeTab === "clients" && userId && <ClientManagement userId={userId} />}
        {activeTab === "sessions" && userId && <SessionRecords userId={userId} />}
        {activeTab === "payments" && <PaymentMonitoring />}
      </div>
    </div>
  );
}

function SlotManagement({ userId }: { userId: string }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState(slotsStorage.getByDate(selectedDate));
  const [allSessions, setAllSessions] = useState(sessionsStorage.getAll());

  useEffect(() => {
    if (selectedDate) {
      setSlots(slotsStorage.getByDate(selectedDate));
      setAllSessions(sessionsStorage.getAll());
    }
  }, [selectedDate]);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Slot Management</h2>
        <div className="mb-4">
          <label htmlFor="slotDate" className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            id="slotDate"
            value={selectedDate}
            min={today}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <Link
          href={`/admin/slots/create?date=${selectedDate || today}`}
          className="inline-block bg-primary-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-primary-700"
        >
          Create Slots for Date
        </Link>
      </div>

      {selectedDate && slots && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Slots for {new Date(selectedDate).toLocaleDateString()}
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {slots.map((slot) => {
              const session = allSessions?.find((s) => s.slotId === slot._id);
              return (
                <div
                  key={slot._id}
                  className={`p-3 rounded-md border-2 text-center ${
                    slot.status === "booked"
                      ? "border-blue-500 bg-blue-50"
                      : slot.status === "blocked"
                      ? "border-red-500 bg-red-50"
                      : "border-green-500 bg-green-50"
                  }`}
                >
                  <p className="font-semibold">{slot.time}</p>
                  <p className="text-xs mt-1">{slot.status}</p>
                  {session && (
                    <p className="text-xs mt-1 text-gray-600">
                      {usersStorage.getById(session.userId)?.name || "Booked"}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ClientManagement({ userId }: { userId: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [allChildren, setAllChildren] = useState(childrenStorage.getAll());

  const filteredChildren = allChildren?.filter((child) =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Client Management</h2>
          <Link
            href="/admin/clients/new"
            className="bg-primary-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-primary-700"
          >
            + Add Client
          </Link>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="space-y-4">
          {filteredChildren && filteredChildren.length > 0 ? (
            filteredChildren.map((child) => {
              return (
                <div key={child._id} className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{child.name}</h3>
                      <p className="text-sm text-gray-600">Age: {child.age}</p>
                      <p className="text-sm text-gray-600">Diagnosis: {child.diagnosis}</p>
                      <p className="text-sm text-gray-600 mt-2">{child.therapyPlan}</p>
                      {child.notes && (
                        <p className="text-sm text-gray-500 mt-1">Notes: {child.notes}</p>
                      )}
                    </div>
                    <Link
                      href={`/admin/clients/${child._id}`}
                      className="text-primary-600 hover:text-primary-700 font-semibold"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-600">No clients found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function SessionRecords({ userId }: { userId: string }) {
  const [allSessions, setAllSessions] = useState(sessionsStorage.getAll());
  const [allUsers, setAllUsers] = useState(usersStorage.getAll());
  const [allChildren, setAllChildren] = useState(childrenStorage.getAll());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Session Records</h2>
      {allSessions && allSessions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Date</th>
                <th className="text-left py-2 px-4">Time</th>
                <th className="text-left py-2 px-4">Client</th>
                <th className="text-left py-2 px-4">Therapy Type</th>
                <th className="text-left py-2 px-4">Status</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allSessions.map((session) => {
                const sessionUser = allUsers.find((u) => u._id === session.userId);
                const sessionChild = session.childId ? allChildren.find((c) => c._id === session.childId) : null;
                return (
                  <tr key={session._id} className="border-b">
                    <td className="py-2 px-4">{formatDate(session.sessionDate)}</td>
                    <td className="py-2 px-4">{session.sessionTime}</td>
                    <td className="py-2 px-4">
                      {sessionUser?.name || "Unknown"}
                      {sessionChild && ` (${sessionChild.name})`}
                    </td>
                    <td className="py-2 px-4">{session.therapyType}</td>
                    <td className="py-2 px-4">
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
                    </td>
                    <td className="py-2 px-4">
                      <Link
                        href={`/admin/sessions/${session._id}`}
                        className="text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        View/Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No sessions found.</p>
      )}
    </div>
  );
}

function PaymentMonitoring() {
  const [allPayments, setAllPayments] = useState(paymentsStorage.getAll());
  const [allUsers, setAllUsers] = useState(usersStorage.getAll());

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const getUserName = (userId: string) => {
    return allUsers?.find((u) => u._id === userId)?.name || "Unknown";
  };

  const totalCompleted = allPayments?.reduce(
    (sum, p) => sum + (p.status === "completed" ? p.amount : 0),
    0
  ) || 0;
  const totalPending = allPayments?.reduce(
    (sum, p) => sum + (p.status === "pending" ? p.amount : 0),
    0
  ) || 0;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Completed</h3>
          <p className="text-3xl font-bold text-green-600">₹{totalCompleted}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">₹{totalPending}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Payments</h3>
          <p className="text-3xl font-bold text-blue-600">{allPayments?.length || 0}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment History</h2>
        {allPayments && allPayments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Date</th>
                  <th className="text-left py-2 px-4">Client</th>
                  <th className="text-left py-2 px-4">Amount</th>
                  <th className="text-left py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {allPayments.map((payment) => (
                  <tr key={payment._id} className="border-b">
                    <td className="py-2 px-4">{formatDate(payment.paymentDate)}</td>
                    <td className="py-2 px-4">{getUserName(payment.userId)}</td>
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
          <p className="text-gray-600">No payments found.</p>
        )}
      </div>
    </div>
  );
}
