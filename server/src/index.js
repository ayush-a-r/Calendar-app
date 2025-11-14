require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./db");

const eventsRouter = require("./routes/events");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/events", eventsRouter);

const PORT = process.env.PORT || 4000;

connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log("Server running on port", PORT));
});
