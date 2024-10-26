import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Icon from "./Icon";
import CreateEventModal from "./modals/CreateEventModal";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onNewEvent }) {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleModalClose = () => {
    onNewEvent();
    setIsEventModalOpen(false);
  };

  const handleLogout = () => {
    try {
      logout();
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex justify-between py-3 text-sm">
      <h1 className="px-3 py-1 h-8 rounded-md bg-white border">
        {user || "Name"}
      </h1>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEventModalOpen(true)}
          className="flex h-8 justify-center items-center bg-blue-500 px-3 py-1 rounded-md text-white"
        >
          <Icon name="add" className="text-xl" />
          <span>Create Event</span>
        </button>
        <button
          onClick={handleLogout}
          className="h-8 px-3 py-1 rounded-md bg-red-200 font-semibold border border-red-300"
        >
          Logout
        </button>
      </div>

      {isEventModalOpen && <CreateEventModal handleClose={handleModalClose} />}
    </div>
  );
}
