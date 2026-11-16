import Link from "../models/Link.js"

const getAdminLinks = async (req,res) => {
    try {
        const links = await Link.find();

        return res.status(200).json({
            links
        })
        
    } catch (error) {
       res.status(400).json({
        message:'Internal Server error'
       });
    }

}


export default getAdminLinks;