require("dotenv").config();

const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_PASS = process.env.NODEMAILER_PASS;

module.exports = { NODEMAILER_USER, NODEMAILER_PASS };
