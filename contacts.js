import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';

const __dirname = dirname(fileURLToPath(import.meta.url));

const contactsPath = join(__dirname, "/db/contacts.json");

const getAllContacts = async () => {
    try {
        const contactsData = await fs.readFile(contactsPath);
            return JSON.parse(contactsData);
        } catch (err) {
        console.log(err.message);
            return [];
}
};


export const listContacts = async () => {
    try {
    const data = await fs.readFile(contactsPath);
        return data.toString();
    } catch (err) {
        console.log(err.message);
    }
};

export const getContactById = async (contactId) => {
    try {
    const contacts = await getAllContacts();
    const contact = contacts.find((contact) => contact.id === contactId);

    if (contact) {
        console.log(JSON.stringify(contact, null, 2));
    } else {
        console.log("Contact not found");
    }
    } catch (err) {
        console.log(err.message);
    }
};

export const addContact = async (name, email, phone) => {
    try {
    const contacts = await getAllContacts();
    const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    } catch (err) {
        console.log(err);
    }
};

export const removeContact = async (contactId) => {
    try {
    const contacts = await getAllContacts();

    const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId
    );

    if (contacts.length === updatedContacts.length) {
        console.log("No contact found with the given ID");
    } else {
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
        console.log(`Contact with ID ${contactId} has been removed.`);
    }
    } catch (err) {
        console.log("Error removing contact:", err.message);
    }
};