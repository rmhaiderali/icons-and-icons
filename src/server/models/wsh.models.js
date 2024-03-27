import mongoose from "mongoose";
const { Schema } = mongoose;

const WSHSchema = new Schema(
  {
    Date: {
      type: Date,
      required: true,
    },
    IOTD: {
      type: Boolean,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Caption: {
      type: String || null,
      required: true,
    },
    Query: {
      type: String,
      required: true,
    },
    JPG: {
      type: String || null,
      required: true,
    },
    SVG: {
      Light: { type: String, required: true },
      Dark: { type: String, required: true },
    },
    Regions: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false }
);

delete mongoose.connection.models["wsh"];
export default mongoose.model("wsh", WSHSchema);
