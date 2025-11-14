import React, { useEffect, useState } from "react";

export default function EventModal({ open, initial, onClose, onSave, onDelete }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [allday, setAllday] = useState(false);
  const [color, setColor] = useState("#3b82f6");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setDescription(initial.description || "");

      setStart(
        initial.start
          ? new Date(initial.start).toISOString().slice(0, 16)
          : ""
      );
      setEnd(
        initial.end ? new Date(initial.end).toISOString().slice(0, 16) : ""
      );

      setAllday(!!initial.allday);
      setColor(initial.color || "#3b82f6");
    } else {
      setTitle("");
      setDescription("");
      setStart("");
      setEnd("");
      setAllday(false);
      setColor("#3b82f6");
    }
  }, [initial, open]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !start || !end) return alert("Title, start, end required");

    onSave({
      title,
      description,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
      allday,
      color,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form className="bg-white rounded-lg p-4 w-[420px]" onSubmit={handleSubmit}>
        <h2 className="text-lg font-semibold mb-3">
          {initial ? "Edit Event" : "Create Event"}
        </h2>

        <input
          className="w-full p-2 border mb-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 border mb-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Start</label>
        <input
          type="datetime-local"
          className="w-full p-2 border mb-2 rounded"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />

        <label>End</label>
        <input
          type="datetime-local"
          className="w-full p-2 border mb-2 rounded"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />

        <div className="flex items-center gap-3 mb-3">
          <input
            id="allday"
            type="checkbox"
            checked={allday}
            onChange={(e) => setAllday(e.target.checked)}
          />
          <label htmlFor="allday">All day</label>

          <input
            type="color"
            className="ml-auto"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          {initial && (
            <button
              type="button"
              className="px-3 py-1 border rounded text-red-600"
              onClick={() => onDelete(initial)}
            >
              Delete
            </button>
          )}

          <button
            type="button"
            className="px-3 py-1 border rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            {initial ? "Save" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
