import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import axiosInstance from "../utils/axiosInstance";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const dateFormatted = () => {
    return `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;
  };

  const fetchEvents = async () => {
    const date = new Date().toISOString().split("T")[0];
    try {
      const res = await axiosInstance.get(`/events/${date}`);
      if (res.status === 200) {
        setEvents(res?.data);
      }
    } catch (error) {
      alert("Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-screen-lg w-full">
        <Navbar onNewEvent={fetchEvents} />
        <div className="border p-5 w-full h-full bg-zinc-50 rounded-md flex flex-col gap-5">
          <div>
            <h1 className="font-bold text-2xl">Today's Schedule</h1>
            <p className="text-sm text-zinc-500">{dateFormatted()}</p>
          </div>

          <div className="border-t" />

          <div>
            {loading
              ? "Loading..."
              : events &&
                events.map((event) => (
                  <EventCard key={event?._id} data={event} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
