import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactStorageService, Contact } from '../../model/contact-storage.service';
import { MediaStorageService } from '../../model/media-stroage.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private contactStorage: ContactStorageService, private mediaStorage: MediaStorageService ) {
    let contact: Contact = {
      firstname: 'Jack',
      lastname: 'Johnson',
      emails: [
        'jj@gmail.com',
        'jackjohnson@yahoo.cn'
      ],
      phones: []
    }

    let medias = [{
      hash: 'dshskldjlka',
      type: 'voice',
      url: 'dsgakhdlaj;djkla;s',
    }, {
      hash: '457ujnmdjs',
      type: 'vedio',
      url: 'dfhjkl;ldkdsjaksdlal',
    }]

    setTimeout(() => {
      this.contactStorage.addContact(contact);
      this.mediaStorage.addMedias(medias);
    }, 1000);
  }

}
