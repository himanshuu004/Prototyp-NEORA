"use client";

import { useParams } from "next/navigation";
import { children as childrenStorage, sessions as sessionsStorage, progressNotes as progressNotesStorage } from "@/lib/storage";

export default function ClientDetail() {
  const params = useParams();
  const childId = params.id as string;
  const child = childrenStorage.getById(childId);
  const allSessions = sessionsStorage.getAll();
  const progressNotes = progressNotesStorage.getByChild(childId);

  if (!child) {
    return <div className="p-8">Loading...</div>;
  }

  const childSessions = allSessions?.filter((s) => s.childId === childId) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">{child.name}'s Profile</h1>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800">Name</h3>
              <p className="text-gray-600">{child.name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Age</h3>
              <p className="text-gray-600">{child.age}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Diagnosis</h3>
              <p className="text-gray-600">{child.diagnosis}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Created</h3>
              <p className="text-gray-600">{new Date(child.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-800 mb-2">Therapy Plan</h3>
            <p className="text-gray-600">{child.therapyPlan}</p>
          </div>
          {child.notes && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800 mb-2">Notes</h3>
              <p className="text-gray-600">{child.notes}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sessions</h2>
          {childSessions.length > 0 ? (
            <div className="space-y-4">
              {childSessions.map((session) => (
                <div key={session._id} className="border border-gray-200 rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{session.therapyType}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(session.sessionDate).toLocaleDateString()} at {session.sessionTime}
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
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No sessions yet.</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Progress Notes</h2>
          {progressNotes && progressNotes.length > 0 ? (
            <div className="space-y-4">
              {progressNotes.map((note) => (
                <div key={note._id} className="border border-gray-200 rounded-md p-4">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(note.date).toLocaleDateString()}
                  </p>
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-800 mb-1">Notes:</h4>
                    <p className="text-gray-600">{note.notes}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Progress:</h4>
                    <p className="text-gray-600">{note.progress}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No progress notes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}


