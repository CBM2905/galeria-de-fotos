import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({ projectId: "pwa01-fa3ab", appId: "1:453895253447:web:761ee89599e66ecb6e3de2", storageBucket: "pwa01-fa3ab.firebasestorage.app", apiKey: "AIzaSyCef0n62pEqzVs3K3yLIoGtS2JWnqv_QcI", authDomain: "pwa01-fa3ab.firebaseapp.com", messagingSenderId: "453895253447" })), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule {}
