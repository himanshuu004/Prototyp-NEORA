"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useConvexUserId } from "@/components/ClerkUserSync";

export default function SessionDetail() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as Id<"sessions">;
  const session = useQuery(api.sessions.get, sessionId ? { sessionId } : "skip");
  const progressNotes = useQuery(api.progressNotes.getBySession, sessionId ? { sessionId } : "skip");
  const updateSessionStatus = useMutation(api.sessions.updateStatus);
  const createProgressNote = useMutation(api.progressNotes.create);
  const userId = useConvexUserId();
  const sessionUser = useQuery(api.users.get, session?.userId ? { userId: session.userId } : "skip");
  const sessionChild = useQuery(api.children.get, session?.childId ? { childId: session.childId } : "skip");
  const allUsers = useQuery(api.users.getAll);

  const [formData, setFormData] = useState({
    notes: "",
    progress: "",
  });
  const [loading, setLoading] = useState(false);

  if (!session) {
    return <div className="p-8">Loading...</div>;
  }

  const handleStatusUpdate = async (status: "scheduled" | "completed" | "cancelled") => {
    try {
      await updateSessionStatus({ sessionId, status });
      alert("Status updated successfully!");
    } catch (error: any) {
      alert("Error updating status: " + error.message);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session.childId || !userId) return;

    setLoading(true);
    try {
      await createProgressNote({
        sessionId,
        childId: session.childId,
        therapistId: userId,
        notes: formData.notes,
        progress: formData.progress,
      });
      setFormData({ notes: "", progress: "" });
      alert("Progress note added successfully!");
    } catch (error: any) {
      alert("Error adding note: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Session Details</h1>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold text-gray-800">Client</h3>
              <p className="text-gray-600">{sessionUser?.name || "Unknown"}</p>
            </div>
            {sessionChild && (
              <div>
                <h3 className="font-semibold text-gray-800">Child</h3>
                <p className="text-gray-600">{sessionChild.name}</p>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-800">Date</h3>
              <p className="text-gray-600">{new Date(session.sessionDate).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Time</h3>
              <p className="text-gray-600">{session.sessionTime}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Therapy Type</h3>
              <p className="text-gray-600">{session.therapyType}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Status</h3>
              <p className="text-gray-600">
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
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Concern</h3>
            <p className="text-gray-600">{session.concern}</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-800 mb-4">Update Status</h3>
            <div className="flex space-x-3">
              <button
                onClick={() => handleStatusUpdate("scheduled")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Scheduled
              </button>
              <button
                onClick={() => handleStatusUpdate("completed")}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Completed
              </button>
              <button
                onClick={() => handleStatusUpdate("cancelled")}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Cancelled
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Progress Note</h2>
          <form onSubmit={handleAddNote} className="space-y-4">
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                required
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-1">
                Progress
              </label>
              <textarea
                id="progress"
                required
                rows={4}
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add Note"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Progress Notes</h2>
          {progressNotes && progressNotes.length > 0 ? (
            <div className="space-y-4">
              {progressNotes.map((note) => {
                const therapist = allUsers?.find((u) => u._id === note.therapistId);
                return (
                  <div key={note._id} className="border border-gray-200 rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {therapist?.name || "Unknown Therapist"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(note.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h4 className="font-semibold text-gray-700 mb-1">Notes:</h4>
                      <p className="text-gray-600 mb-3">{note.notes}</p>
                      <h4 className="font-semibold text-gray-700 mb-1">Progress:</h4>
                      <p className="text-gray-600">{note.progress}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600">No progress notes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
