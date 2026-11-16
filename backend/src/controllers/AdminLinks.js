import Link from "../models/Link.js";

const getAdminLinks = async (req, res) => {
  try {
    const links = await Link.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      links,
    });
  } catch (error) {
    console.error("Get admin links error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch links",
    });
  }
};

export default getAdminLinks;