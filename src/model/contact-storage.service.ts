import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Contact  {
  firstname: String;
  lastname: String;
  emails: Array<String>;
  phones: Array<String>;
}

@Injectable()
export class ContactStorageService {
  private manager: Storage;
  private contacts: Array<Contact> = [];

  constructor() {
    this.initStorage();
  }

  initStorage() {
    const name = localStorage.getItem('_dbname');
    this.manager = new Storage({
      name: name || "default",
      storeName: '_contacts',
      driverOrder: ['indexeddb', 'websql', 'localstorage']
    });

    this.manager.get("contacts").then((result) => {
      this.contacts = result ? <Array<Contact>> result : [];
      console.log("Contacts found: ", this.contacts);
    }, (error) => {
      console.log("ERROR: ", error);
    });
  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
    this.manager.set("contacts", this.contacts);
  }

}
