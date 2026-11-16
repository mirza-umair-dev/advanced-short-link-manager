
import ClickAnalysis from "../models/ClickAnalysis.js";
import Link from "../models/Link.js";

const adminAnalyticsData = async (req, res) => {
  try {
    const [
      totalLinks,
      totalClicks,
      uniqueVisitors,
      browsers,
      devices,
      operatingSystems,
      referrers,
      countries,
      trafficData,
      topLinks,
    ] = await Promise.all([
      Link.countDocuments(),

      ClickAnalysis.countDocuments(),

      Link.distinct("_id"),

      ClickAnalysis.distinct("ipAddress"),

      ClickAnalysis.aggregate([
        {
          $group: {
            _id: "$device.browser",
            total: { $sum: 1 },
          },
        },
        { $sort: { total: -1 } },
      ]),

      ClickAnalysis.aggregate([
        {
          $group: {
            _id: "$device.type",
            total: { $sum: 1 },
          },
        },
        { $sort: { total: -1 } },
      ]),

      ClickAnalysis.aggregate([
        {
          $group: {
            _id: "$device.os",
            total: { $sum: 1 },
          },
        },
        { $sort: { total: -1 } },
      ]),

      ClickAnalysis.aggregate([
        {
          $group: {
            _id: "$referrer",
            total: { $sum: 1 },
          },
        },
        { $sort: { total: -1 } },
      ]),

      ClickAnalysis.aggregate([
        {
          $group: {
            _id: "$location.country",
            total: { $sum: 1 },
          },
        },
        { $sort: { total: -1 } },
      ]),

      ClickAnalysis.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
              day: { $dayOfMonth: "$createdAt" },
            },
            clicks: { $sum: 1 },
            visitors: {
              $addToSet: "$ipAddress",
            },
          },
        },
        {
          $project: {
            _id: 0,
            date: {
              $dateFromParts: {
                year: "$_id.year",
                month: "$_id.month",
                day: "$_id.day",
              },
            },
            clicks: 1,
            visitors: {
              $size: "$visitors",
            },
          },
        },
        { $sort: { date: 1 } },
      ]),

      Link.find()
        .populate("createdBy", "name email")
        .sort({ clicks: -1 })
        .limit(10),
    ]);

    const averageClicks =
      totalLinks > 0 ? totalClicks / totalLinks : 0;

    return res.status(200).json({
      success: true,
      totalLinks,
      totalClicks,
      averageClicks,
      uniqueVisitors: uniqueVisitors.length,
      browsers,
      devices,
      operatingSystems,
      referrers,
      countries,
      trafficData,
      topLinks,
    });

  } catch (error) {
    console.error("Admin analytics error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch admin analytics",
    });
  }
};

export default adminAnalyticsData;
