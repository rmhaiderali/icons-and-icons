import mongoose from "mongoose"

const { log } = console

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/iconsandicons"

mongoose.connection.on("error", (err) => console.error(err))

mongoose.connection.once("open", () => log("connected to the mongodb"))

await mongoose.connect(MONGODB_URI)
