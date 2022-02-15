const path = require("path");
const fs = require("fs");
const pdf = require("html-pdf");
const absPath = path.join(__dirname, "../documents");

const User = require("../models/User");
const Pickup = require("../models/Pickup");
const pdfTemplate = require("../documents");
require("dotenv").config();

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

/**
 * @desc Send mail
 */
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SEND_GRID_TOKEN,
    },
  })
);

/**
 * @desc Get pickup data
 * @param {*} req
 * @param {*} res
 */
const getFinalizedServices = async (req, res) => {
  const finalizedServices = await Pickup.find({ status: "FINISHED" });
  res.status(200).json({ services: finalizedServices });
};

/**
 * @desc Send invoice via mail
 * @param {*} req
 * @param {*} res
 */
const sendInvoice = async (req, res) => {
  const user = await User.findOne({ _id: req.body.userId });

  pdf
    .create(pdfTemplate(req.body), {})
    .toFile(`${absPath}/services.pdf`, (err) => {
      if (err) {
        console.log("Something went wrong while creating invoice!");
      }
    });

  fs.readFile(`${absPath}/services.pdf`, function (err, data) {
    const attachment = data;

    transporter.sendMail({
      to: user.email,
      from: "ombalapure@outlook.com",
      subject: "FixIt - Invoice",
      attachments: [
        {
          content: attachment,
          filename: "fixit_invoice.pdf",
          type: "application/pdf",
          disposition: "attachment",
          content_id: "fixit_invoice",
        },
      ],
      html: `<h4>Hi ${user.name}!</h4>
        <p>We have attached an invoice to this mail.</p>
        <p>Your vehicle will be out for delivery very soon.</p>
        <p><b>Thanks,</b></p>
        <p><b><i>FixIt ©<i></b></p>
      `,
    });
  });

  res.status(200).json({ msg: "Invoice sent successfully!" });
};

/**
 * @desc Get invoice
 * @param {*} req
 * @param {*} res
 */
const getInvoice = async (req, res) => {
  console.log("DIR NAME:", __dirname);
  res.sendFile(`${absPath}/services.pdf`);
};

module.exports = {
  getFinalizedServices,
  sendInvoice,
  getInvoice,
};
