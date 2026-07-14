import Link from "../models/Link.js";
import ClickTrack from "../models/ClickAnalysis.js";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";

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
    console.log(geo);
    await ClickTrack.create({
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
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default getLinkandAnlytics;
