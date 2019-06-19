import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContatoModalPage } from '../contato-modal/contato-modal.page';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  contatos: any;

  constructor(public modalController: ModalController, private storage: Storage, private http: HttpClient) {
    this.contatos = [];
    this.http.get("http://5d0ab6c4c5896f0014e86dcb.mockapi.io/contact").subscribe(
      (data) => {
        this.contatos = data;
      }
    );
  }

  add(contato) {
    this.http.post("http://5d0ab6c4c5896f0014e86dcb.mockapi.io/contact", contato).subscribe(
      (data) => {
        this.contatos.push(data)
      }
    )
  }

  remove(contato) {
    this.http.delete("http://5d0ab6c4c5896f0014e86dcb.mockapi.io/contact/" + contato.id).subscribe(
      (data) => {
        var i = this.contatos.indexOf(contato)
        this.contatos.splice(i, 1)
      }
    )
  }

  async modal() {
    const modal = await this.modalController.create({
      component: ContatoModalPage
    });
    await modal.present();

    modal.onDidDismiss().then((contato) => {
      this.add(contato.data)
    })
  }


}
