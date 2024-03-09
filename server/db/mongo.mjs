import mongoose from "mongoose";
import {} from "dotenv/config";

// Stablish connection

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// Define Schema for Contact (how are they going to be stored in DB)
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});
contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Define corresponding model and associate it to schema
const Contact = mongoose.model("Contact", contactSchema);

export { Contact };
