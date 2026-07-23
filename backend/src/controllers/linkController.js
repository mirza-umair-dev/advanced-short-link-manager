import { nanoid } from "nanoid";
import Link from "../models/Link.js";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import ClickAnalysis from "../models/ClickAnalysis.js";

const generateLink = async (req, res) => {
  const { originalLink } = req.body;
  const clientUrl = process.env.CLIENT_URI;
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
    let shortId = nanoid(6);
    while(await Link.exists({shortId})){
      shortId =nanoid(6);
    }

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

const getLinkandAnlytics = async (req, res) => {
  const { shortId } = req.params;

  try {
    const link = await Link.findOne({ shortId });

    if (!link) {
      return res.status(404).json({
        success: false,
        message: "No link found!",
      });
    }
     const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      req.ip;
    const parser = new UAParser(req.headers["user-agent"]);
    const result = parser.getResult();

    const referrer = req.headers.referer || "Direct";


    const geo = geoip.lookup(ipAddress);
    await ClickAnalysis.create({
      link: link._id,
      ipAddress,
      location: {
        country: geo?.country || "Unknown",
        city: geo?.city || "Unknown",
        region: geo?.region || "Unknown",
      },
      device: {
        browser: result.browser.name || "Unknown",
        os: result.os.name || "Unknown",
        type: result.device.type || "Desktop",
      },

      referrer,
    });

    link.clicks += 1;
    await link.save();

    return res.redirect(link.originalLink);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getDashboardData = async (req, res) => {
  const user = req.user;

  try {
    const totalLinks = await Link.countDocuments({ createdBy: req.user._id });
    const links = await Link.find({ createdBy: req.user._id });
    const latestLinks = await Link.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    const LinkIds = links.map((item) => item._id);

    const browsers = await ClickAnalysis.aggregate([
      {
        $match: {
          link: { $in: LinkIds },
        },
      },
      {
        $group: {
          _id: "$device.browser",
          total: { $sum: 1 },
        },
      },
    ]);

    const operatingSystems = await ClickAnalysis.aggregate([
      {
        $match: {
          link: { $in: LinkIds },
        },
      },
      {
        $group: {
          _id: "$device.os",
          total: { $sum: 1 },
        },
      },
    ]);
    const referrers = await ClickAnalysis.aggregate([
      {
        $match: {
          link: { $in: LinkIds },
        },
      },
      {
        $group: {
          _id: "$referrer",
          total: { $sum: 1 },
        },
      },
    ]);

    const devices = await ClickAnalysis.aggregate([
      {
        $match: {
          link: { $in: LinkIds },
        },
      },
      {
        $group: {
          _id: "$device.type",
          total: { $sum: 1 },
        },
      },
    ]);

    const countries = await ClickAnalysis.aggregate([
      {
        $match: {
          link: { $in: LinkIds },
        },
      },
      {
        $group: {
          _id: "$location.country",
          total: { $sum: 1 },
        },
      },
    ]);

    const uniqueVisitors = await ClickAnalysis.distinct("ipAddress", {
      link: {
        $in: LinkIds,
      },
    });

    return res.status(200).json({
      latestLinks,
      totalLinks,
      uniqueVisitors:uniqueVisitors.length,
      countries,
      operatingSystems,
      referrers,
      browsers,
      devices,
    });
  } catch (error) {
    return res.status(500).json({success:false,message:'Internal Server error!'});
  }
};

export { generateLink,deleteLink,getLinkandAnlytics,getDashboardData };
