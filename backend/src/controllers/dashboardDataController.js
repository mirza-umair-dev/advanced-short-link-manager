import ClickAnalysis from "../models/ClickAnalysis.js";
import Link from "../models/Link.js";

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
      uniqueVisitors,
      countries,
      operatingSystems,
      browsers,
      devices
    });
  } catch (error) {
    return res.json(error);
  }
};

export { getDashboardData };
