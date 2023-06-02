const User = require("../models/User");
const { readJsonFile, writeJsonFile } = require("../middlewares/FileOp");
const actionLogFilePath = "actions.json";

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Failed to fetch users" });
    }
  },
  logAction: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const currentDate = new Date().toLocaleDateString();
      const actionLog = await readJsonFile(actionLogFilePath);

      const userEntry = actionLog.actions.find(
        (entry) => entry.id === req.user.userId
      );

      if (userEntry && userEntry.actionAllowed >= userEntry.maxActions) {
        return res.status(400).json({ error: "Max actions reached" });
      } else {
        const user = await User.findById(req.user.userId);

        if (userEntry) {
          userEntry.actionAllowed += 1;
          userEntry.date = currentDate;
        } else {
          const maxActions = user.NumOfActions;
          actionLog.actions.push({
            id: req.user.userId,
            maxActions: maxActions,
            date: currentDate,
            actionAllowed: 1,
          });
        }

        writeJsonFile(actionLogFilePath, actionLog);
        res.json({
          message: "Action logged successfully",
          actionLog,
          ok: true,
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to log action" });
    }
  },
};
