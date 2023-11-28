const User = require("../../database/schemas/User");
const { sendEmail } = require("../helpers/sentEmail");
require("dotenv").config();

const controller = {
  add: async (req, res) => {
    try {
      const { body } = req;
      const newUser = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        birthday: body.birthday,
        admin: body.admin,
        receiveSupportRequest: body.receiveSupportRequest,
        communities: body.communities
      });

      newUser
        .save()
        .then(async (doc) => {
          console.log(doc);

          //await transporter.sendMail(mailOptions, (error, info) => {
          await sendEmail(body.email, "New User", `welcome culture coins`);
        })
        .catch((err) => {
          console.error(err);
        });

      res.status(200).json({
        status: "test",
        ok: true,
        data: {},
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        ok: false,
      });
    }
  },
  getUserByEmail: async (req, res) => {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      //res.json(user);
      res.status(200).json({
        ok: true,
        data: user,
      });
    } catch (err) {
      res.status(500).json({ message: err.message, ok: false });
    }
  }
  /*notifySupports: async (req, res) => {
    try {
      const supports = await User.find({ support: true });
      const supportEmails = supports.map((user) => user.email);

      const { body } = req;
      const subject = body.subject;
      const text = body.text;
 
      await sendEmail(supportEmails, subject, text);
 
      res.status(200).json({
        status: "Notification sent to support users",
        ok: true,
        data: {},
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        error: "Internal server error",
      });
    }
  },*/

};

module.exports = controller;  