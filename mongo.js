const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Invalid number of arguments");
  process.exit(1);
}

const pass = process.argv[2];

const url = `mongodb+srv://Angel:${pass}@cluster0.3s3ex.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  console.log("phonebook:");

  Person.find({}).then((result) => {
    result.map(({ name, number }) => console.log(name, number));
    process.exit(1);
  });
} else if (process.argv.length === 5) {
  const [name, number] = process.argv.slice(3, 5);

  const person = new Person({ name, number });

  person
    .save()
    .then((result) => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
      process.exit(1);
    })
    .catch((err) => console.error(err));
}
