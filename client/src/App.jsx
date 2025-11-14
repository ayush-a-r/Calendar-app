import React from "react";
import Calendar from "./components/Calendar";

export default function App() {
  return (
    <div>
      <header className="bg-white shadow py-3 mb-4">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Calendar</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        <Calendar />
      </main>
    </div>
  );
}
