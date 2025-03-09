import { Component } from '@angular/core';
import { UserPhoto } from '../services/photo.service';
import { PhotosService } from '../photoServices/photos.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  photo: UserPhoto[] = [];
  nombreUser!: string;
  constructor(public photosService: PhotosService) {}
  
 ngOnInit(){
  this.photosService.sharedNombre.subscribe(nombreUser => this.nombreUser = nombreUser);
  this.photosService.sharedPhoto.subscribe(photo => this.photo = photo);
 }

}
