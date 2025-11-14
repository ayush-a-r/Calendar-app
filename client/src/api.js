const API = "http://localhost:4000";

export const api = {
  list: () =>
    fetch(API + "/api/events").then((r) => r.json()),

  create: (ev) =>
    fetch(API + "/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ev),
    }).then((r) => r.json()),

  update: (id, ev) =>
    fetch(API + "/api/events/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ev),
    }).then((r) => r.json()),

  remove: (id) =>
    fetch(API + "/api/events/" + id, { method: "DELETE" }),
};
