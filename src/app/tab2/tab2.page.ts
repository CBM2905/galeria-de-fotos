import { Component } from '@angular/core';
import { PhotoService, UserPhoto } from '../services/photo.service';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  nameUser!: string;
  alertButtons = [
    {
      text: "actualizar",
      handler: (data: { Nombre: string; }) => {
        this.setName(data.Nombre);
      }
    }
  ]
  alertInputs = [
    {
      name: "Nombre",
      placeholder: "ingrese el nombre nuevo"
    }
  ]
  constructor(public photoService: PhotoService,
    public actionSheetController: ActionSheetController) {}


  // Agregar foto
  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }

  setName(name: string){
    this.nameUser = name;
  }

  
}
