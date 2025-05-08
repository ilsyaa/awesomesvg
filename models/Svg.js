import mongoose from "mongoose";

const SvgSchema = new mongoose.Schema({
    pack: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pack",
        required: true,
    },
    style: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Style",
        required: true,
    },
    viewBox: {
        type: Array,
        required: true,
    },
    path: {
        type: Array,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
})

export default mongoose.models.Svg || mongoose.model("Svg", SvgSchema);