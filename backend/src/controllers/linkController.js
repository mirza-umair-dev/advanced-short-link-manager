import { nanoid } from "nanoid";
import Link from "../models/Link.js";

const generateLink = async (req, res) => {
  const { originalLink } = req.body;
  const clientUrl = process.env.CLIENT_URL;
  if (!originalLink) {
    return res.status(404).json({ success: false, message: "Paste the link!" });
  }

  try {
    const existingLink = await Link.findOne({ originalLink,createdBy: req.user._id });
    if (existingLink) {
      return res.status(200).json({
        originalLink: existingLink.originalLink,
        shortId: existingLink.shortId,
        shortUrl: `${clientUrl}/${existingLink.shortId}`,
        clicks: existingLink.clicks,
        createdBy: req.user._id,
      });
    }
    const shortId = nanoid(6);
    const link = await Link.create({
      originalLink,
      shortId,
      createdBy: req.user._id,
      clicks: 0,
    });
    return res.status(201).json({
      success: true,
      originalLink: link.originalLink,
      shortId: link.shortId,
      shortUrl: `${clientUrl}/${link.shortId}`,
      clicks: link.clicks,
      createdBy: link.createdBy,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal sever error!" });
  }
};

const getLink = async (req, res) => {
  const { shortId } = req.params;

  if (!shortId) {
    return res
      .status(404)
      .json({ success: false, message: "Short Link not found" });
  }
  try {
    const link = await Link.findOne({ shortId });
    if (!link) {
      return res.status(404).json({ success: false, message: "No link Found" });
    }
    link.clicks++;
    await link.save();
    return res.redirect(link.originalLink);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal sever error!" });
  }
};

const deleteLink = async (req,res) => {
  const {shortId} = req.params;
  if (!shortId) {
    return res
      .status(404)
      .json({ success: false, message: "Short Link not found" });
  }
  try {
    const link = await Link.findOne({ shortId });
    if (!link) {
      return res.status(404).json({ success: false, message: "No link Found" });
    }
    if(link.createdBy.toString() !== req.user._id.toString() && req.user.role !== "admin"){
       return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
    }

    await link.deleteOne();
     return res.status(200).json({
            success: true,
            message: "Link deleted successfully"
        });
  } catch (error) {
     return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        });
  }

}

export { generateLink, getLink,deleteLink };
