const express = require('express');
const Event = require('../models/Event');
const router = express.Router();

// Get events
router.get('/', async (req, res) => {
  const events = await Event.find({}).sort({ start: 1 });
  res.json(events);
});

// Create event
router.post('/', async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json(event);
});

// Update event
router.put('/:id', async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(event);
});

// Delete event
router.delete('/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
