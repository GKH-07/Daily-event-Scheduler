import React, { useState } from "react";
import ModalTemp from "../layouts/ModalTemp";
import axiosInstance from "../../utils/axiosInstance";

export default function CreateEventModal({ handleClose }) {
  const [formData, setFormData] = useState({
    title: "",
    start_time: "",
    end_time: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const startTime = formData.start_time.split(":")[0];
      const endTime = formData.end_time.split(":")[0];
      const res = await axiosInstance.post("/events/add", {
        name: formData.title,
        start_time: startTime,
        end_time: endTime,
        date: new Date().toISOString().split("T")[0],
      });
      if (res.status === 200) {
        handleClose();
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data);
    }
  };

  const handleTimeInput = (e) => {
    let hour = e.target.value.split(":")[0];
    e.target.value = `${hour}:00`;
    handleChange(e);
  };

  return (
    <ModalTemp
      title="Add Event"
      handleSubmit={handleSubmit}
      handleClose={handleClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h1 className="font-medium">Title of the event</h1>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            className="border rounded-md px-4 py-2 outline-none h-11 w-full"
            placeholder="Placement drive"
          />
        </div>
        <div>
          <h1 className="font-medium">Start Time</h1>
          <input
            type="time"
            name="start_time"
            onChange={handleTimeInput}
            step="3600000"
            id="time"
            className="border rounded-md px-4 py-2 outline-none h-11 w-full"
            placeholder="Start time (in 24-hour format)"
          />
        </div>

        <div>
          <h1 className="font-medium">End Time</h1>
          <input
            type="time"
            name="end_time"
            onChange={handleTimeInput}
            step="3600"
            className="border rounded-md px-4 py-2 outline-none h-11 w-full"
          />
        </div>
      </form>
    </ModalTemp>
  );
}
