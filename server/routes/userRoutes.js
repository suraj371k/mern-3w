const express = require('express');
const multer = require('multer');
const User = require('../models/User');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get('/' , (req , res) => {
  res.send("You are on the home page")
})


router.post('/submit', upload.array('images', 10), async (req, res) => {
  try {
    const { name, socialHandle } = req.body;
    const images = req.files.map(file => file.path);

    const newUser = new User({ name, socialHandle, images });
    await newUser.save();

    res.status(201).json({ message: 'Submission successful!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/submissions', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
