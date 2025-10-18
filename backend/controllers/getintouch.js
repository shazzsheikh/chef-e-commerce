const getintouch = require("../models/getintouch.js");

exports.Set = async (req, res) => {
  try {
    const field = req.body;
    const newEntry = new getintouch(field);
    await newEntry.save();

    res.status(200).json({ message: "Sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server issues" });
  }
};

exports.Get = async (req, res) => {
  try {
    const data = await getintouch.find();
    res.status(200).json(data); // send data back to frontend
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server issues" });
  }
};
