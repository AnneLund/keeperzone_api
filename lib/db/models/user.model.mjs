import mongoose, { Schema } from "mongoose";
mongoose.set("runValidators", true);

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String, default: "/users/no-user.png" },
  clubs: [{ type: Schema.Types.ObjectId, ref: "club" }],
  hashedPassword: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  created: { type: Date, default: Date.now },
});
export default mongoose.models.user || mongoose.model("user", userSchema);
