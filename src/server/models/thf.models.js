import mongoose from "mongoose";
const { Schema } = mongoose;

const THFSchema = new Schema(
  {
    hashfetti: {
      type: String,
      required: true,
    },
    hashtags: {
      type: [String],
      required: true,
    },
    startsAt: {
      type: Date,
      required: true,
    },
    endsAt: {
      type: Date,
      required: true,
    },
    regions: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false }
);

delete mongoose.connection.models["thf"];
export default mongoose.model("thf", THFSchema);
