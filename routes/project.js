const express = require('express');
const Project = require('../Db/models/Project');
const auth = require('../middleware/auth');
const router = express.Router();

// Create
router.post('/', auth, async (req, res) => {
  const { name, description } = req.body;
  try {
    const project = await Project.create({ name, description, user: req.user.userId });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Read all
router.get('/', auth, async (req, res) => {
  const projects = await Project.find({ user: req.user.userId });
  res.json(projects);
});



// Delete
router.delete('/:id', auth, async (req, res) => {
  const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
  if (!project) return res.status(404).json({ message: 'Not found or unauthorized' });
  res.json({ message: 'Deleted' });
});

module.exports = router;
