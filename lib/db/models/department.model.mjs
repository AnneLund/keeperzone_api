import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const departmentSchema = new Schema({
  name: { type: String, required: true },
  club: { type: Schema.Types.ObjectId, ref: "club" },
  picture: { type: String, default: "/departments/no-department.png" },
  created: { type: Date, default: Date.now },
});

export default mongoose.models.department ||
  mongoose.model("department", departmentSchema);
