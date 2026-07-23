import ClickAnalysis from "../models/ClickAnalysis.js";
import Link from "../models/Link.js";
import User from "../models/User.js";

const adminDashboardData = async (req, res) => {

  try {

    const [
    totalLinks,
    totalClicks,
    totalUsers,
    latestLinks,
    browsers,
    operatingSystems,
    devices,
    countries,
    referrers,
    uniqueVisitors
] = await Promise.all([
    Link.countDocuments(),
    ClickAnalysis.countDocuments(),
    User.countDocuments(),
    Link.find().sort({ createdAt: -1 }).limit(10),
    ClickAnalysis.aggregate([{
        $group: {
          _id: "$device.browser",
          total: { $sum: 1 },
        },
      },]),
    ClickAnalysis.aggregate([{
        $group: {
          _id: "$device.os",
          total: { $sum: 1 },
        },
      }]),
    ClickAnalysis.aggregate([ {
        $group: {
          _id: "$device.type",
          total: { $sum: 1 },
        },
      }]),
    ClickAnalysis.aggregate([ {
        $group: {
          _id: "$location.country",
          total: { $sum: 1 },
        },
      }]),
    ClickAnalysis.aggregate([ {
        $group: {
          _id: "$referrer",
          total: { $sum: 1 },
        },
      }]),
    ClickAnalysis.distinct("ipAddress")
]);

    return res.status(200).json({
      latestLinks,
      totalLinks,
      totalClicks,
      totalUsers,
      uniqueVisitors:uniqueVisitors.length,
      countries,
      operatingSystems,
      browsers,
      referrers,
      devices
    });
  } catch (error) {
    return res.status(500).json({
        success: false,
        message:'Internal server error'
    });
}
};

export default adminDashboardData;