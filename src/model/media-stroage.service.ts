import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import * as _ from 'lodash';

export type MediaType = "video" | "image" | "voice";

export interface Media {
  hash: String;
  type: MediaType;
  url: String;
}

@Injectable()
export class MediaStorageService {
  private manager: Storage;
  private mediaMap: any = {};

  constructor() {
    this.initStorage()
  }

  initStorage() {
    const name = localStorage.getItem('_dbname');
    this.manager = new Storage({
      name: name || 'default',
      storeName: "_medias",
      driverOrder: ["indexeddb", "websql", "localstorage"]
    });

    this.manager.forEach((value, key, index) => {
      this.mediaMap[key] = value;
    })
  }

  addMedia(media) {
    this.manager.set(media.hash, media);
    this.mediaMap[media.hash] = media;
  }

  getAllMedias() {
    return this.mediaMap.values();
  }

  addMedias(medias) {
    medias.forEach(element => {
      this.addMedia(element);
    });
  }
}
