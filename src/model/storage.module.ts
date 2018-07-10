import { NgModule } from '@angular/core';
import { StorageService } from './storage.service';
import { ContactStorageService } from './contact-storage.service';
import { MediaStorageService } from './media-stroage.service';
import { CommonStorageService } from './common-storage.service';

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    CommonStorageService,
    MediaStorageService,
    ContactStorageService,
    StorageService,
  ],
})
export class StorageModule { }
