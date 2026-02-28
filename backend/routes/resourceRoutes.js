const express = require("express");
const router = express.Router();

const { createResource, getResources } = require("../controllers/resourceController");
const upload = require("../middleware/uploadMiddleware");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Create
router.post(
  "/",
  verifyToken,
  authorizeRoles("admin", "trainer"),
  upload.single("image"),
  createResource
);

// Get all
router.get("/", verifyToken, getResources);

module.exports = router;