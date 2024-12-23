const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv').config();
const uri = process.env.DATABASE;

const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() =>console.log("MongoDB connected successfully")).catch((err)=>console.error('MongoDB connection error',err));


app.use(express.json());
app.use(express.urlencoded({extended:true}))

const corsOption = {
    origin:'http://localhost:3000',
    methods:"GET,HEAD,PUT,POST,DELETE,PATCH",
    Credential:true,
    optionSuccessStatus:204,
}

app.use(cors(corsOption));
app.use('/auth',authRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });