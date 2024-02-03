const User = require("../../database/schemas/User");
const { sendResponse } = require("../helpers/sendResponse");
const { sendEmail } = require("../helpers/sentEmail");
require("dotenv").config();
const jwt = require('jsonwebtoken');

const controller = {
  add: async (req, res) => {
    try {
      const { body } = req;
      const newUser = new User({
        nickName: body.nickName,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        birthday: body.birthday,
        admin: body.admin,
        receiveSupportRequest: body.receiveSupportRequest,
        communities: body.communities,
        skills: body.skills,
        teams: body.teams
      });

      newUser
        .save()
        .then(async (doc) => {
          console.log(doc);

          await sendEmail(body.email, "New User", `welcome culture coins`);
        })
        .catch((err) => {
          console.error(err);
        });
      sendResponse(res, 200, true, newUser);
    } catch (error) {
      console.log(error);
      sendResponse(res, 400, false, null, 'Internal server error');
    }
  },
  addLogin: async (req, res) => {
     try {
      const email = req._json.mail; 
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        try {
          const { body } = req;
          const newUser = new User({
            nickName: req._json.displayName,
            firstName: req._json.givenName,
            lastName: req._json.surname,
            email: req._json.mail,
            password: null,
            birthday: null,
            admin: false,
            receiveSupportRequest: false,
            communities:[],
            skills: [],
            teams: []
          });
    
          newUser
            .save()
            .then(async (doc) => {
              console.log(doc);
              await sendEmail(req._json.mail, "New User", `welcome culture coins`);
            })
            .catch((err) => {
              console.error(err);
            });
          sendResponse(res, 200, true, newUser);
        } catch (error) {
          console.log(error);
          sendResponse(res, 400, false, null, 'Internal server error');
        }
      }

     } catch (error) {

     }
  },
  getUserByEmail: async (req, res) => {
    
    //const { email } = req.params;
    const token = req.headers['authorization'];

    try {
      
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {

        const email = user.email;

        const userFind = await User.findOne({ email });
        if (!userFind) {
          return sendResponse(res, 404, false, null, 'User not found');
        }
        return sendResponse(res, 200, true, userFind);
      });

    } catch (err) {
      res.status(500).json({ message: err.message, ok: false });
    }
  },
  updateUser: async (req, res) => {
    const { _id } = req.body;
    const updateData = req.body;
    try {
      const user = await User.findOneAndUpdate(
        { _id: _id },
        updateData,
        { new: true }
      );

      if (!user) {
        throw 'User not found';
      }

      delete user.password;
      return sendResponse(res, 200, true, user);

    } catch (err) {
      res.status(404).json({ message: err, ok: false });
    }
  },
  getListUsers: async (req, res) => {
    try {
      const users = await User.find();
      return sendResponse(res, 200, true, users);
    } catch (error) {
      sendResponse(res, 500, false ,null, "Internal Error");
    }
  },
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