"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useConvexUserId } from "@/components/ClerkUserSync";

export default function CreateSlots() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
  const createSlot = useMutation(api.slots.create);
  const userId = useConvexUserId();
  const [slots, setSlots] = useState<Array<{ time: string; status: "available" | "blocked" }>>([]);

  const timeSlots = [
    "09:00", "09:45", "10:30", "11:15", "12:00", "12:45",
    "13:30", "14:15", "15:00", "15:45", "16:30", "17:15",
  ];

  const handleCreateSlots = async () => {
    if (!userId) return;

    try {
      for (const slot of slots) {
        await createSlot({
          date,
          time: slot.time,
          duration: 45,
          status: slot.status,
          createdBy: userId,
        });
      }
      alert("Slots created successfully!");
      router.push("/admin/dashboard");
    } catch (error: any) {
      alert("Error creating slots: " + error.message);
    }
  };

  const toggleSlot = (time: string) => {
    setSlots((prev) => {
      const existing = prev.find((s) => s.time === time);
      if (existing) {
        return prev.filter((s) => s.time !== time);
      }
      return [...prev, { time, status: "available" }];
    });
  };

  const setSlotStatus = (time: string, status: "available" | "blocked") => {
    setSlots((prev) => {
      const filtered = prev.filter((s) => s.time !== time);
      return [...filtered, { time, status }];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Create Slots for {new Date(date).toLocaleDateString()}
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Select time slots to create (45 minutes each). You can mark them as available or blocked.
            </p>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map((time) => {
                const slot = slots.find((s) => s.time === time);
                return (
                  <div key={time} className="border-2 rounded-md p-3 text-center">
                    <p className="font-semibold mb-2">{time}</p>
                    {slot ? (
                      <div className="space-y-2">
                        <span
                          className={`block px-2 py-1 rounded text-xs ${
                            slot.status === "available"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {slot.status}
                        </span>
                        <button
                          onClick={() => setSlotStatus(time, slot.status === "available" ? "blocked" : "available")}
                          className="text-xs text-primary-600 hover:text-primary-700"
                        >
                          Toggle
                        </button>
                        <button
                          onClick={() => toggleSlot(time)}
                          className="text-xs text-red-600 hover:text-red-700 block w-full"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleSlot(time)}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Add
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleCreateSlots}
              disabled={slots.length === 0}
              className="bg-primary-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Slots
            </button>
            <button
              onClick={() => router.back()}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-semibold hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
