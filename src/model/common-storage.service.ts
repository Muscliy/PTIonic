import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable()
export class CommonStorageService {
  private manager: Storage;

  constructor() {
    this.initStorage();
  }

  initStorage() {
    const name = localStorage.getItem("_dbname");
    this.manager = new Storage({
      name: "default",
      driverOrder: ["localstorage"]
    });
  }
}
