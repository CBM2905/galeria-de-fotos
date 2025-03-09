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
  constructor() { }

  nextNombre(text: string){
    this.nombreUser.next(text);
  }

  nextPhoto(photo: UserPhoto){
    this.photo.next(photo);
  }

}
