const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const response = await axios.post('https://api.brevo.com/v3/smtp/email', {
      sender: { name: name, email: email },
      to: [{ email: "tiffanymesser15@gmail.com" }],
      subject: 'Contact Form Submission',
      htmlContent: `<p>Name: ${name}</p><p>Message: ${message}</p>`
    }, {
      headers: {
        'api-key': process.env.BREVO_API_KEY.trim(),
        'Content-Type': 'application/json'
      }
    });

    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});