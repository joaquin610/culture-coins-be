const Acknowledgment = require("../../database/schemas/Acknowledgment");


const controller = {
  add: async (req, res) => {
    try {
      const { body } = req;
      let newAcknowledgment = new Acknowledgment({
        userTo: body.userTo,
        userFrom: body.userFrom,
        message: body.message,
      });
      newAcknowledgment
        .save()
        .then((doc) => {
          console.log(doc);
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
};

module.exports = controller;
