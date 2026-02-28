const Resource = require("../models/Resource");

// Create resource
exports.createResource = async (req, res) => {
  try {
    const { title, category, type, url, description } = req.body;

    const resource = new Resource({
      title,
      category,
      type,
      url,
      description,
      image: req.file ? req.file.filename : "",
      createdBy: req.user.id,
    });

    await resource.save();

    res.status(201).json({
      message: "Resource uploaded successfully",
      resource,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all resources
exports.getResources = async (req, res) => {
  const resources = await Resource.find().sort({ createdAt: -1 });
  res.json(resources);
};