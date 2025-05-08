import mongoose from "mongoose";

const PackSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    terms: {
        type: Array,
        required: true,
    },
    voted: {
        type: Boolean,
        required: true,
    },
    packs: {
        type: Array,
        required: true,
    },
})

export default mongoose.models.Icon || mongoose.model("Icon", PackSchema);