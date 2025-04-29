const express = require('express');
const Task = require('../Db/models/Task');
const Project = require('../Db/models/Project');
const auth = require('../middleware/auth');
const router = express.Router();

// Create
router.post('/:projectId', auth, async (req, res) => {
  const { title, description, status } = req.body;
  const project = await Project.findOne({ _id: req.params.projectId, user: req.user.userId });

  if (!project) return res.status(404).json({ error: 'Project not found or unauthorized' });

  const task = await Task.create({
    title,
    description,
    status,
    project: project._id,
    user: req.user.userId,
  });
  res.status(201).json(task);
});

// Read
router.get('/:projectId', auth, async (req, res) => {
  const project = await Project.findOne({ _id: req.params.projectId, user: req.user.userId });
  if (!project) return res.status(404).json({ error: 'Project not found or unauthorized' });

  const tasks = await Task.find({ project: req.params.projectId, user: req.user.userId });
  res.json(tasks);
});

// Update
router.put('/:taskId', auth, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.taskId, user: req.user.userId });
  if (!task) return res.status(404).json({ message: 'Unauthorized' });

  const updated = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete('/:taskId', auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.taskId, user: req.user.userId });
  if (!task) return res.status(404).json({ message: 'Not found or unauthorized' });

  res.json({ message: 'Deleted' });
});

module.exports = router;
