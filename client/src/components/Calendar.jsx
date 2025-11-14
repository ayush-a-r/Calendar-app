import React, { useEffect, useMemo, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
} from "date-fns";

import EventModal from "./EventModal";
import { api } from "../api";

function generateMatrix(date) {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));

  let day = start;
  const matrix = [];
  let row = [];

  while (day <= end) {
    row.push(day);
    if (row.length === 7) {
      matrix.push(row);
      row = [];
    }
    day = addDays(day, 1);
  }

  return matrix;
}

export default function Calendar() {
  const [current, setCurrent] = useState(new Date());
  const matrix = useMemo(() => generateMatrix(current), [current]);

  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  // Load events when month changes
  useEffect(() => {
    api.list().then(setEvents);
  }, []);

  // Events belonging to one day
  function eventsForDay(day) {
    return events.filter((ev) => {
      const s = new Date(ev.start);
      return (
        s.getFullYear() === day.getFullYear() &&
        s.getMonth() === day.getMonth() &&
        s.getDate() === day.getDate()
      );
    });
  }

  function openCreate(day) {
    setSelectedDay(day);
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(ev) {
    setEditing(ev);
    setModalOpen(true);
  }

  async function saveEvent(data) {
    if (editing) await api.update(editing._id, data);
    else await api.create(data);

    const updated = await api.list();
    setEvents(updated);
    setModalOpen(false);
  }

  async function deleteEvent(ev) {
    await api.remove(ev._id);
    const updated = await api.list();
    setEvents(updated);
    setModalOpen(false);
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-3 py-1 border rounded"
          onClick={() => setCurrent(subMonths(current, 1))}
        >
          Prev
        </button>

        <div className="font-bold text-xl">
          {format(current, "MMMM yyyy")}
        </div>

        <button
          className="px-3 py-1 border rounded"
          onClick={() => setCurrent(addMonths(current, 1))}
        >
          Next
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 text-center font-semibold">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mt-2">
        {matrix.flat().map((day, i) => (
          <div
            key={i}
            className={`p-2 h-[100px] rounded border bg-white ${
              day.getMonth() !== current.getMonth() ? "opacity-40" : ""
            }`}
          >
            <div className="flex justify-between text-sm">
              <span>{format(day, "d")}</span>
              <button
                className="text-xs border rounded px-1"
                onClick={() => openCreate(day)}
              >
                +
              </button>
            </div>

            <div className="mt-1 space-y-1">
              {eventsForDay(day).map((ev) => (
                <div
                  key={ev._id}
                  onClick={() => openEdit(ev)}
                  className="text-xs text-white px-1 rounded cursor-pointer"
                  style={{ background: ev.color }}
                >
                  {ev.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <EventModal
        open={modalOpen}
        initial={
          editing ||
          (selectedDay && {
            title: "",
            description: "",
            start: new Date(
              selectedDay.getFullYear(),
              selectedDay.getMonth(),
              selectedDay.getDate(),
              9
            ).toISOString(),
            end: new Date(
              selectedDay.getFullYear(),
              selectedDay.getMonth(),
              selectedDay.getDate(),
              10
            ).toISOString(),
            allday: false,
            color: "#3b82f6",
          })
        }
        onClose={() => setModalOpen(false)}
        onSave={saveEvent}
        onDelete={deleteEvent}
      />
    </div>
  );
}
