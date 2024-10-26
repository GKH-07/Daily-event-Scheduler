import React from "react";

export default function ModalTemp({
  title = "Title",
  handleSubmit,
  handleClose,
  children,
}) {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-60 flex justify-center items-center">
      <div className="max-w-[30rem] w-full rounded-lg shadow bg-white">
        <h1 className="text-lg font-semibold text-black px-2 py-2 border-b">
          {title}
        </h1>
        <div className="p-2">{children}</div>

        <div className="flex justify-end p-2 gap-2 border-t">
          <button
            onClick={handleClose}
            className="w-24 px-3 py-1 border bg-zinc-50 rounded-md"
          >
            Discard
          </button>
          <button
            onClick={handleSubmit}
            className="w-24 px-3 py-1 bg-blue-300 border border-blue-400 font-medium rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
