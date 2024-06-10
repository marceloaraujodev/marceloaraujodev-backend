import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
  recruiter: Boolean,
  developer: Boolean,
  other: Boolean
},
{timestamps: true})

const Visitor = mongoose.model('Visitor', VisitorSchema);

export default Visitor;