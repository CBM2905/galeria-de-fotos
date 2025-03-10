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

  b0 = -7.8979
  b1 = 0.0399
  b2 = 0.0698
  e = Math.exp(1)
  cuttOff = 0.3109



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
    let pxy = this.predictProbability(Glucose, BMI);
    let res = this.scaling(pxy);
    addDoc(collection(this.firestore, "test"), {Nombre: Nombre, Glucose: Glucose, BMI: BMI, Probabilidad: pxy, Resultado: res});
    console.log(this.test$);
  }

  update(Nombre: string, Glucose: number, BMI: number, uid: any){
    let pxy = this.predictProbability(Glucose, BMI);
    let res = this.scaling(pxy);
    let refDoc = doc(this.firestore, "test", uid);
    updateDoc(refDoc, {Nombre: Nombre, Glucose: Glucose, BMI: BMI, Probabilidad: pxy, Resultado: res});
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
          type: "number"
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


  predictProbability(Glucose: number, BMI: number){
    let sum = this.b0+(this.b1*Glucose)+(this.b2*BMI);
    let pxy = (this.e**sum)/(1+(this.e**sum));
    return pxy
  }

  scaling(pxy: number){
    if(pxy > this.cuttOff){
      return "Tiene diabetes"
    }
    return "No tiene diabetes"
  }

  async showPredictAlert(data: Test){
    let alert = await this.alertController.create({
      header: "Prediccion",
      message: "Este paciente tiene " + data.Resultado + " con una probabilidad de " + data.Probabilidad
    })
    await alert.present();    
  }



}


export interface Test {
  Nombre: String,
  Glucose: number,
  BMI: number,
  Probabilidad: number,
  Resultado: String,
  uid: String
}
