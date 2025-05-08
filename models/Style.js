import mongoose from "mongoose";

const StyleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

export default mongoose.models.Style || mongoose.model("Style", StyleSchema);