const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { readJsonFile, writeJsonFile } = require("../middlewares/FileOp");
const actionLogFilePath = "actions.json";

module.exports = {
  loginController: async (req, res) => {
    const { username, email } = req.body;

    try {
      const user = await User.findOne({ Email: email, Username: username });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const actionLog = await readJsonFile(actionLogFilePath);

      const userEntry = actionLog.actions.find(
        (entry) => entry.id === user._id.toString()
      );

      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate());
      const currentDateString = currentDate.toLocaleDateString();

      if (userEntry && userEntry.date !== currentDateString) {
        userEntry.date = currentDateString;
        userEntry.actionAllowed = 0;
        writeJsonFile(actionLogFilePath, actionLog);
      }

      if (userEntry && userEntry.actionAllowed >= userEntry.maxActions) {
        return res.status(400).json({ error: "Max actions reached" });
      } else {
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET_KEY
        );

        res.json({
          user,
          token,
          message: `User ${username} login successfully`,
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getUserDashboardController: (req, res) => {
    res.status(200).send({ ok: true });
  },
};
