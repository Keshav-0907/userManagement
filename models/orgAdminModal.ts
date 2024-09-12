import mongoose from "mongoose";


const orgAdminSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    orgId:{
        type: String,
    },
    role:{
        type: String,
    },
})

const OrgAdmin = mongoose.models.OrgAdmin || mongoose.model("OrgAdmin", orgAdminSchema);
export default OrgAdmin;