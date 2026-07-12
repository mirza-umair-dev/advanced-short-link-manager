import {nanoid} from "nanoid";
import Link from "../models/Link.js";

const generateLink = async (req, res) => {
  const { originalLink } = req.body;
  const clientUrl = process.env.CLIENT_URL;
  if (!originalLink) {
    return res.status(404).json({ success: false, message: "Paste the link!" });
  }
  
  try {
    const existingLink = Link.findOne({ originalLink });
    if (existingLink) {
      return res.status(200).json({
        originalLink: existingLink.originalLink,
        shortId: existingLink.shortId,
        shortUrl: `${clientUrl}/${existingLink.shortId}`,
        clicks: existingLink.clicks,
      });
    }
    const shortId = nanoid(6);
    const link = await Link.create({
      originalLink,
      shortId,
      clicks: 0,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal sever error!" });
  }
};


const getLink = async (req,res) => {
  const {shortId} = req.params;

  if(!shortId){
    return res.status(404).json({ success: false, message: "Short Link not found" });
  }
  try {
    const link = await Link.findOne({shortId});
    if(!link){
      return res.status(404).json({ success: false, message: "No link Found" });
    }
  res.status(200).json({
    originalLink,
    shortId,
    clicks,
    createdBy
  })
    return res.redirect(link.originalLink);
  } catch (error) {
    
  }
}


export {generateLink,getLink};