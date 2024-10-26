import React from "react";
import Icon from "../Icon";

export default function AuthTemp({ children }) {
  return (
    <div className="w-full min-h-screen flex justify-center items-center p-2">
      {/* Heading */}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="w-14 h-14 bg-white rounded-full flex flex-col justify-center items-center">
          <Icon name="lock" className="text-3xl" />
        </div>
        <h1 className="font-semibold text-xl">Content Locked</h1>
        <div className="h-3"></div>
        <div className="max-w-72 w-full">{children}</div>
      </div>
    </div>
  );
}
