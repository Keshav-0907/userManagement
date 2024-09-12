import mongoose from "mongoose";

const organisationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    adminName: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true
    },
    membersCount: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    allMembers: {
        type: [String],
        default: []
    }
})

const Organisation = mongoose.models.Organisation2 || mongoose.model("Organisation2", organisationSchema);

export default Organisation;