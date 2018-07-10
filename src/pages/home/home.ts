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
    let contacts: Contact[] = [{
      firstname: 'Jack',
      lastname: 'Johnson',
      emails: [
        'jj@gmail.com',
        'jackjohnson@yahoo.cn'
      ],
      phone: '13888888101'
    },{
      firstname: 'Lucy',
      lastname: 'Will',
      emails: [
        'jj@gmail.com',
        'jackjohnson@yahoo.cn'
      ],
      phone: '13888888102'
    }]

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
      this.contactStorage.addContacts(contacts);
      this.mediaStorage.addMedias(medias);
    }, 1000);
  }

}
