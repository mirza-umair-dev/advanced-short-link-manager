import mongoose from "mongoose";

const clicktrackSchema = new mongoose.Schema({
    link: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Link',
        required: true,
        index: true 
    },

    location: {
        country: { type: String, default: "Unknown" },
        city: { type: String, default: "Unknown" },
        region: { type: String, default: "Unknown" }
    },

    device: {
        browser: { type: String, default: "Unknown" },
        os: { type: String, default: "Unknown" },      
        type: { type: String, default: "Unknown" }    
    },

   
    referrer: { 
        type: String, 
        default: "Direct" 
    },

    ipAddress: { type: String }
}, { 
    timestamps: true 
});

const ClickTrack = mongoose.model('ClickTrack', clicktrackSchema);
export default ClickTrack;