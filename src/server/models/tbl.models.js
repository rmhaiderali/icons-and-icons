import mongoose from "mongoose";
const { Schema } = mongoose;

const TBLSchema = new Schema(
  {
    animation: {
      type: String,
      required: true,
    },
    hashmoji: {
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
    pausesAt: {
      type: Number,
      required: true,
    },
    regions: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false }
);

const TBL = mongoose.model("tbl", TBLSchema);
export default TBL;
