import { Component, inject, input } from '@angular/core';
import { Firestore, collection, addDoc, CollectionReference, collectionData, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { PhotosService } from '../photoServices/photos.service';
import { UserPhoto } from '../services/photo.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  photo: UserPhoto[] = [];
  nombreUser!: string;
  private firestore: Firestore = inject(Firestore);
  test$!: Observable<Test[]>;
  constructor(private alertController: AlertController, private photoService: PhotosService) {
    const userColl = collection(this.firestore, "test");
    this.test$ = collectionData(userColl, {idField: "uid"}) as Observable<Test[]>;
    this.setNameShared();
  }

  
  crear(Nombre: string, Glucose: number, BMI: number){
    addDoc(collection(this.firestore, "test"), {Nombre: Nombre, Glucose: Glucose, BMI: BMI});
    console.log(this.test$);
  }

  update(Nombre: string, Glucose: number, BMI: number, uid: any){
    let refDoc = doc(this.firestore, "test", uid);
    updateDoc(refDoc, {Nombre: Nombre, Glucose: Glucose, BMI: BMI});
  }

  delete(uid: any){
    let refDoc = doc(this.firestore, "test", uid);
    deleteDoc(refDoc);
  }

  async showCreateAlert(){
    let alert = await this.alertController.create({
      header: "Agregar paciente",
      inputs: [
        {
          name: "Nombre",
          placeholder: "ingrese el nombre",
          type: "text"
        },
        {
          id: "Glucosa",
          name: "Glucosa",
          placeholder: "Ingrese Glucosa",
          type: "text"
        },
        {
          id: "BMI",
          name: "BMI",
          placeholder: "indice de masa corporal",
          type: "number"
        }
      ],
      buttons: [
        {
          text: "Agregar",
          handler: data => {
            let nombre = data.Nombre;
            let glucose = data.Glucosa;
            let BMI = data.BMI;

            this.crear(nombre,glucose,BMI);
          }
        }
      ]
    });
    alert.present();
  }


 

  async showUpdateAlert(info: any){
    let alert = await this.alertController.create({
      header: "Editar informacion",
      inputs: [
        {
          name: "Nombre",
          placeholder: info.Nombre,
          value: info.Nombre,
          type: 'text'
        },
        {
          name: "Glucosa",
          placeholder: info.Glucose,
          type: "number",
          value: info.Glucose
        },
        {
          name: "BMI",
          placeholder: info.BMI,
          type: "number",
          value: info.BMI
        }
      ],
      buttons: [
        {
          text: "editar",
          handler: data => {
            let nombre = data.Nombre;
            let glucose = data.Glucosa;
            let bmi = data.BMI;

            this.update(nombre,glucose,bmi,info.uid);
          }
        }
      ]
    })
    await alert.present();
    
  }

  ngOnInit(){
    this.photoService.sharedNombre.subscribe(nombreUser => this.nombreUser = nombreUser);
    this.photoService.sharedPhoto.subscribe(photo => this.photo = photo);
    console.log(this.photo)
  }

  setNameShared(){
    this.photoService.nextNombre("i am");
  }
  
}


export interface Test {
  Nombre: String,
  Glucose: number,
  BMI: number,

  uid: String
}
