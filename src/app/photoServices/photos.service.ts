import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserPhoto } from '../services/photo.service';
@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private nombreUser = new BehaviorSubject<any> (null);
  private photo = new BehaviorSubject<any> (null);
  sharedPhoto = this.photo.asObservable();
  sharedNombre = this.nombreUser.asObservable(); 
  constructor() {
    this.nextPhoto([{ filepath: "none", webviewPath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRogTtOMPG5E_dGwITV6PsDJGAzJWZKQxIcZQ&s" }])
   }

  nextNombre(text: string){
    this.nombreUser.next(text);
  }

  nextPhoto(photo: UserPhoto[]){
    this.photo.next(photo);
  }

}
