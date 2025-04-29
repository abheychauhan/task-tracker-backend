const express = require('express');
const connectToDb = require('./Db/db');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/project');
const taskRoutes = require('./routes/task');
const cors = require('cors');


app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({extended:this.true}))

// connect to the database
connectToDb();



app.use('/task-tracker/auth' , authRoutes);
app.use('/task-tracker/projects', projectRoutes);
app.use('/task-tracker/tasks', taskRoutes);

app.listen(4000, () => console.log('Server running on http://localhost:4000'));