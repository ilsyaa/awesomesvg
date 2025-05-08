import mongoose from "mongoose";

const PackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

export default mongoose.models.Pack || mongoose.model("Pack", PackSchema);