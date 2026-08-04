const express= require('express');
const cookieParser= require('cookie-parser');
const cors= require('cors');

const authRoutes= require('./routes/auth.routes');
const interviewRoutes= require('./routes/interview.routes')

const app= express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/interview', interviewRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ message: 'Invalid JSON request body' });
  }

  if (error.name === 'MulterError') {
    return res.status(400).json({ message: error.message });
  }

  console.error(error);
  return res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
});


module.exports= app;
