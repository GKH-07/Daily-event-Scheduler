import React from "react";

export default function EventCard({ data }) {
  const { start_time, end_time, name } = data;

  const startTime = start_time < 10 ? `0${start_time}` : start_time;
  const endTime = end_time < 10 ? `0${end_time}` : end_time;

  const diff = end_time - start_time;

  return (
    <div className="flex border-y">
      <div className="max-w-32 w-32 flex flex-col justify-between">
        <div className="flex flex-col gap-1">
          <div
            style={{
              height: `${diff * 25}px`,
            }}
            className="flex flex-col justify-between"
          >
            <p className="text-sm text-zinc-500">{startTime}:00</p>
            <p className="text-sm text-zinc-500">{endTime}:00</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-blue-300 p-2 px-3 rounded-md flex items-center justify-between">
        <h1 className="font-semibold">{name}</h1>
        <p className="text-sm text-zinc-600">{diff} hour(s)</p>
      </div>
    </div>
  );
}
