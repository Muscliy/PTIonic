import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ContactStorageService } from "./contact-storage.service";
import { MediaStorageService } from "./media-stroage.service";
import { CommonStorageService } from "./common-storage.service";

@Injectable()
export class StorageService {
  private manager: Storage;
  private dbName: string = "default";

  constructor(
    private contactStorage: ContactStorageService,
    private mediaStorage: MediaStorageService,
    private commonStorage: CommonStorageService
  ) {
    this.manager = new Storage({
      driverOrder: ['localstorage']
    });
    if (localStorage.getItem('_dbname')) {
      localStorage.setItem('_dbname', 'default')
    }
  }

  changeStorage(name) {
    localStorage.setItem("_dbname", name);
    this.changeTableConfig();
  }

  changeTableConfig() {
    this.contactStorage.initStorage();
    this.mediaStorage.initStorage();
  }
}
