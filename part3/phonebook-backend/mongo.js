const mongoose = require("mongoose");

if (process.argv.length < 3) {
  // eslint-disable-next-line max-len
  console.log("Please provide the password and/or contact details as arguments: node mongo.js <password>, [<person>, <number>]");
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}
const [, , password] = process.argv;

// eslint-disable-next-line max-len
const url = `mongodb+srv://fullso:${password}@cluster2-ostce.mongodb.net/test?retryWrites=true`;

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

if (process.argv.length === 5) {
  const [
    , , , name,
    number
  ] = process.argv;

  const person = new Person({
    name,
    number,
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach(({ name, number }) => {
      console.log(`${name} ${number}`);
    });
    mongoose.connection.close();
  });
}
