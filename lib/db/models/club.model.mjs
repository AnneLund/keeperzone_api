import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const clubSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  departments: [{ type: Schema.Types.ObjectId, ref: "department" }],
  created: { type: Date, default: Date.now },
});

export default mongoose.models.club || mongoose.model("club", clubSchema);
