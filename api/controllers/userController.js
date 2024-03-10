const User = require("../../database/schemas/User");
const { sendResponse } = require("../helpers/sendResponse");
const { sendEmail } = require("../helpers/sentEmail");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const controller = {
  add: async (req, res) => {
    try {
      const { body } = req;
      const newUser = new User({
        nickName: body.nickName,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        admin: body.admin,
        receiveSupportRequest: body.receiveSupportRequest,
        communities: body.communities,
        teams: body.teams,
        avatar: body.avatar ?? "",
      });

      newUser
        .save()
        .then(async (doc) => {
          await sendEmail(body.email, "New User", `welcome culture coins`);
        })
        .catch((err) => {
          console.error(err);
        });
      sendResponse(res, 200, true, newUser);
    } catch (error) {
      console.log(error);
      sendResponse(res, 400, false, null, "Internal server error");
    }
  },
  addLogin: async (req, res) => {
    try {
      const email = req._json.mail;
      const user = await User.findOne({ email });
      if (!user) {
        try {
          const { body } = req;
          const newUser = new User({
            nickName: req._json.displayName,
            firstName: req._json.givenName,
            lastName: req._json.surname,
            email: req._json.mail,
            admin: false,
            receiveSupportRequest: false,
            communities: [],
            teams: [],
          });

          newUser
            .save()
            .then(async (doc) => {
              await sendEmail(
                req._json.mail,
                "New User",
                `welcome culture coins`
              );
            })
            .catch((err) => {
              console.error(err);
            });
          sendResponse(res, 200, true, newUser);
        } catch (error) {
          console.log(error);
          sendResponse(res, 400, false, null, "Internal server error");
        }
      }
    } catch (error) {}
  },
  getUserByEmail: async (req, res) => {
    const token = req.headers["authorization"];

    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        const email = user.email;

        const userFind = await User.findOne({ email });
        if (!userFind) {
          return sendResponse(res, 404, false, null, "User not found");
        }
        return sendResponse(res, 200, true, userFind);
      });
    } catch (err) {
      res.status(500).json({ message: err.message, ok: false });
    }
  },
  updateUser: async (req, res) => {
    const { _id, nickName, receiveSupportRequest, avatar, communities, teams } = req.body;

    try {
      const existingUser = await User.findOne({ nickName });
    
      if (existingUser && String(existingUser._id) !== String(_id)) {
        throw "Nickname already in use";
      }
    
      const user = await User.findOneAndUpdate(
        { _id },
        { nickName, receiveSupportRequest, avatar, communities, teams },
        { new: true }
      );

      if (!user) {
        throw "User not found";
      }

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
      sendResponse(res, 500, false, null, "Internal Error");
    }
  },
  register: async (req, res) => {
    try {
      const { nickName, firstName, lastName, email, password }= req.body


      if (!(email.match("@igglobal.com") || email.match("@infogain.com"))) throw "Invalid email";

      const userFind = await User.findOne({ $or: [{ email }, { nickName }] });
      

      if (!userFind) {
        const newUser = new User({
          nickName: nickName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          admin: false,
          receiveSupportRequest: false,
          communities: [],
          teams: [],
          avatar: "",
        });

        newUser
          .save()
          .then(async (doc) => {
            await sendEmail(email, "New User", `welcome culture coins`);
          })
          .catch((err) => {
            console.error(err);
          });

        sendResponse(res, 200, true, newUser);
      } else {
        sendResponse(res, 409, false, null, "User or nickname already exists");
      }
    } catch (error) {
      console.log(error);
      sendResponse(res, 400, false, null, error ?? "Internal server error");
    }
  },
  login: async (req, res) => {
    try {
      const { body } = req;
      const email = body.username;
      const password = body.password;

      const userFind = await User.findOne({ email, password });
      if (userFind) {
        sendResponse(res, 200, true, { token: req.token });
      } else {
        sendResponse(
          res,
          404,
          false,
          null,
          "The email or password you entered is incorrect."
        );
      }
    } catch (error) {
      console.log(error);
      sendResponse(res, 400, false, null, "Internal server error");
    }
  },
};

module.exports = controller;
