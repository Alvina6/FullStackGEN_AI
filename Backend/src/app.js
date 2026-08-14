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

app.use("/",(req,res)=>{
  res.send("server is running")
})


module.exports= app;
