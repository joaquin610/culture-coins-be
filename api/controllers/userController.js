const User = require("../../database/schemas/User");
const {sendResponse}  = require ("../helpers/sendResponse");
const { sendEmail } = require("../helpers/sentEmail");
require("dotenv").config();

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
        skills: body.skills
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
      sendResponse(res, 200, true ,newUser);
    } catch (error) {
      console.log(error);
      sendResponse(res, 400, false ,null, 'Internal server error');
    }
  },
  getUserByEmail: async (req, res) => {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email });
      user.password = undefined;
      if (!user) {
       return sendResponse(res, 404, false ,null,'User not found');
      }
      return sendResponse(res, 200, true , user);

    } catch (err) {
      res.status(500).json({ message: err.message, ok: false });
    }
  },
  putUpdate: async (req, res) => {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email });  
      if (!user) {
        return res.status(404).json({ message: 'User not found', ok: false });
      }  
      const { password, ...updatedFields } = req.body;
      Object.assign(user, updatedFields);  
      await user.save(); 
      user.password = undefined;
      return sendResponse(res, 200, true, user); 
    } catch (err) {

      res.status(500).json({ message: err.message, ok: false });
    }
  }
};

module.exports = controller;  