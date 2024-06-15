import { Command } from "commander";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

const program = new Command();
program
  .option("-a, --action <type>", "choose action", "list")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
console.log("parsed options:", argv);

async function invokeAction({ action, id, name, email, phone }) {
switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(JSON.parse(contacts));
    break;

    case "get":
      const contact = await getContactById(id);
      console.log(contact);
    break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
    break;

    case "remove":
      const removedContact = await removeContact(id);
      console.log(removedContact);
    break;

    default:
        console.warn("\x1B[31m Unknown action type!");
}
}

invokeAction(argv);