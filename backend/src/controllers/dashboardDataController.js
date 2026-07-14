import Link from "../models/Link.js";



const getDashboardData = async (req,res) => {
    const user = req.user;

    try {
        const totalLinks = await Link.countDocuments({createdBy: req.user._id});
        const links = await Link.find({createdBy: req.user._id});
        const latestLinks = await Link.find({createdBy: userId})
        .sort({ createdAt: -1 })
        .limit(5);
        const uniqueVisitors = await ClickTrack.distinct("ipAddress",{link: link._id}
);

    return res.json(
        {
            
                links,
                latestLinks,
                uniqueVisitors
                
        }
    );
        
    } catch (error) {
        return res.json(error);
    }
    
}


export {getDashboardData};