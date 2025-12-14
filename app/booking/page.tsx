"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useConvexUser, useConvexUserId } from "@/components/ClerkUserSync";
import { children as childrenStorage, slots as slotsStorage, sessions as sessionsStorage } from "@/lib/storage";
import Link from "next/link";

export default function Booking() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const user = useConvexUser();
  const userId = useConvexUserId();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [userChildren, setUserChildren] = useState(childrenStorage.getByUser(userId || ""));
  const [availableSlots, setAvailableSlots] = useState(slotsStorage.getAvailable(selectedDate));

  useEffect(() => {
    if (userId) {
      setUserChildren(childrenStorage.getByUser(userId));
    }
  }, [userId]);

  useEffect(() => {
    if (selectedDate) {
      setAvailableSlots(slotsStorage.getAvailable(selectedDate));
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    clientType: "child" as "child" | "adult",
    childId: "",
    concern: "",
    therapyType: "Speech Therapy",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (user && formData.name === "") {
      setFormData((prev) => ({ ...prev, name: user.name }));
    }
  }, [user, formData.name]);

  if (!isLoaded || !isSignedIn || !userId || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to book a session.
          </p>
          <Link
            href="/login"
            className="inline-block text-white px-6 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'rgba(230, 82, 139)' }}
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !selectedDate) {
      setError("Please select a date and time slot");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const slot = availableSlots?.find((s) => s._id === selectedSlot);
      if (!slot || !userId) {
        throw new Error("Selected slot not found or user not logged in");
      }

      sessionsStorage.create({
        userId,
        childId: formData.clientType === "child" && formData.childId ? formData.childId : undefined,
        slotId: selectedSlot,
        therapyType: formData.therapyType,
        concern: formData.concern,
        sessionDate: selectedDate,
        sessionTime: slot.time,
        status: "scheduled",
      });

      alert("Booking successful! Check your dashboard for details.");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Book a Session</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                required
                min={today}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedSlot(null);
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {selectedDate && availableSlots && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Slots (45 minutes each)
                </label>
                {availableSlots.length === 0 ? (
                  <p className="text-gray-600">No available slots for this date.</p>
                ) : (
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot._id}
                        type="button"
                        onClick={() => setSelectedSlot(slot._id)}
                        className={`px-4 py-2 rounded-md border-2 transition-all cursor-pointer ${
                          selectedSlot === slot._id ? "text-white" : "border-gray-300"
                        }`}
                        style={selectedSlot === slot._id ? { 
                          backgroundColor: 'rgba(37, 142, 203)', 
                          borderColor: 'rgba(37, 142, 203)' 
                        } : {
                          borderColor: 'rgba(209, 213, 219, 1)'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedSlot !== slot._id) {
                            e.currentTarget.style.borderColor = 'rgba(37, 142, 203)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedSlot !== slot._id) {
                            e.currentTarget.style.borderColor = 'rgba(209, 213, 219, 1)';
                          }
                        }}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label htmlFor="clientType" className="block text-sm font-medium text-gray-700 mb-1">
                Client Type
              </label>
              <select
                id="clientType"
                value={formData.clientType}
                onChange={(e) =>
                  setFormData({ ...formData, clientType: e.target.value as "child" | "adult" })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="child">Child</option>
                <option value="adult">Adult</option>
              </select>
            </div>

            {formData.clientType === "child" && userChildren && userChildren.length > 0 && (
              <div>
                <label htmlFor="childId" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Child (Optional)
                </label>
                <select
                  id="childId"
                  value={formData.childId}
                  onChange={(e) => setFormData({ ...formData, childId: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Create new profile</option>
                  {userChildren.map((child) => (
                    <option key={child._id} value={child._id}>
                      {child.name} (Age: {child.age})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="therapyType" className="block text-sm font-medium text-gray-700 mb-1">
                Therapy Type
              </label>
              <select
                id="therapyType"
                required
                value={formData.therapyType}
                onChange={(e) => setFormData({ ...formData, therapyType: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Speech Therapy">Speech Therapy</option>
                <option value="Occupational Therapy">Occupational Therapy</option>
                <option value="Special Education">Special Education</option>
                <option value="Behaviour & Life Skills">Behaviour & Life Skills</option>
                <option value="Adult Speech & Voice Therapy">Adult Speech & Voice Therapy</option>
              </select>
            </div>

            <div>
              <label htmlFor="concern" className="block text-sm font-medium text-gray-700 mb-1">
                Concern / Reason for Session
              </label>
              <textarea
                id="concern"
                required
                rows={4}
                value={formData.concern}
                onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Please describe your concern or reason for booking this session..."
              />
            </div>

            <button
              type="submit"
              disabled={loading || !selectedSlot}
              className="w-full text-white py-2 rounded-md font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'rgba(230, 82, 139)' }}
            >
              {loading ? "Booking..." : "Book Session"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

