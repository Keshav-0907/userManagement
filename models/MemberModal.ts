import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    organisation: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation' },
    addedOn:{ type: Date, default: Date.now }
});

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);
export default Member;