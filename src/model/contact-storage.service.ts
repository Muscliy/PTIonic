import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

export interface Contact {
  firstname: String;
  lastname: String;
  emails: Array<String>;
  phone: String;
}

@Injectable()
export class ContactStorageService {
  private manager: Storage;
  private contactMap: any = {};

  constructor() {
    this.initStorage();
  }

  initStorage() {
    const name = localStorage.getItem("_dbname");
    this.manager = new Storage({
      name: name || "default",
      storeName: "_contacts",
      driverOrder: ["indexeddb", "websql", "localstorage"]
    });

    this.manager.forEach((value, key, index) => {
      this.contactMap[key] = value;
    });
  }

  addContact(contact) {
    this.manager.set(contact.phone, contact);
    this.contactMap[contact.phone] = contact;
  }

  getAllContacts() {
    return this.contactMap.values();
  }

  addContacts(contacts) {
    contacts.forEach(element => {
      this.addContact(element);
    });
  }
}
