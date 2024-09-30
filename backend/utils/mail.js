const nodemailer = require("nodemailer");
const { NODEMAILER_PASS, NODEMAILER_USER } = require("./envConfig");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  service: `gmail`,
  secure: false,
  auth: {
    user: "ajmalmirsha.dev@gmail.com",
    pass: "ynqwntswidazrhpm",
  },
});

const sendSampleMail = async () => {
  try {
    console.log("on sendSampleMail");

    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <jakayla68@ethereal.email>', // sender address
      to: "ajmalmirsha.info@gmail.com , sadhasjkd@gmails.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?guyss</b>", // html body
    });
    // const info = await transporter.sendMail({
    //   from: `<jakayla68@ethereal.email>`,
    //   to: "ajmalmirsha.info@gmail.com",
    //   subject: "Testing",
    //   text: "Hello world?",
    //   html: "<b>Hello world?</b>",
    // });

    console.log("Message sent: %s", info.messageId, info);
  } catch (error) {
    console.log("Error", error);
  }
};

sendSampleMail();

module.exports = { sendSampleMail };
