//const db = require("../../database/schemas")

const controller = {
  test: async (req, res) => {
    res.status(200).json({
      status: "test",
      ok: true,
      data: [],
    });
  },

  add: async (req, res) => {
    try {
      const { body } = req;
      let a = req.body;
      
      let newAcknowledgment = {
        userTo: body.userTo,
        userFrom: body.userFrom,
        message: body.message,
      };

      //let result = await req.db.Acknowledgment.create(newAcknowledgment);
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
