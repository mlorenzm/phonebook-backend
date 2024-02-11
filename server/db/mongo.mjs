import mongoose from "mongoose";

// Stablish connection
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://mlorenzomohamed:${password}@cluster0.cjxdn3x.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

// Define Schema for Contact (how are they going to be stored in DB)
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Define corresponding model and associate it to schema
const Contact = mongoose.model("Contact", contactSchema);

// Add a contact with this specific info
const contact = new Contact({
  name: name,
  number: number,
});

// If only given the password (given by length of the argument list, not ideal)

if (process.argv.length == 3) {
  console.log("phonebook:");
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(contact);
    });
    mongoose.connection.close();
  });
} else {
  contact.save().then((result) => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
