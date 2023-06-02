const jsonfile = require("jsonfile");

// Read from a JSON file using async/await
const readJsonFile = async (filePath) => {
  try {
    const data = await jsonfile.readFile(filePath);
    return data;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
};

// Write to a JSON file using async/await
const writeJsonFile = async (filePath, data) => {
  try {
    await jsonfile.writeFile(filePath, data, { spaces: 2 });
    console.log("Data written successfully!");
  } catch (err) {
    console.error("Error writing file:", err);
    throw err;
  }
};

module.exports = { readJsonFile, writeJsonFile };
