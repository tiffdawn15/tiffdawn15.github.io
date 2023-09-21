const express = require("express");
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Welcome to CORS server 😁");
});

var nodemailer = require("nodemailer");

// Api endpoint for fetching receipt data
app.post("/sendEmail", (req, res) => {
  console.log("Sending email");

  console.log(req.body);

  async function send() {
    const html = `<h1>${req.body.name}</h1> <h2>${req.body.email}</h2> <p>${req.body.comment}`;
    console.log(html);

    let transporter = nodemailer.createTransport({
      host: "imap.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "tffnmssr@gmail.com",
        pass: "cefc hdwl uxdp lywg",
      },
    });

    const info = await transporter.sendMail({
      from: req.email,
      to: "tiffanymesser15@gmail.com",
      subject: "Contactform",
      html: html,
    });

    console.log("Message sent: " + info.messageId);
  }

  send().catch((e) => console.log(e));
});


app.listen(8080, () => {
  console.log("listening on port 8080");
});
