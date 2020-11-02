import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";

import { environment } from 'src/environments/environment';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BaseComponent } from './layout/base/base.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faHome, faUserCircle, faSignOutAlt, faCog, faSearch, faEye, faEyeSlash, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './layout/helpers/user/user.component';
import { CommonModule } from '@angular/common';
import { ScrollTopComponent } from './layout/helpers/scroll-top/scroll-top.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BaseComponent,
    UserComponent,
    ScrollTopComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    // 3. Initialize
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFirestoreModule, // firestore
    AngularFireAuthModule,
    FontAwesomeModule,
    NgbModule, // auth
    // AngularFireStorageModule, // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private library: FaIconLibrary) {
    library.addIcons(faHome, faUserCircle, faSignOutAlt, faCog, faSearch, faEyeSlash, faEye, faChevronUp);
  }
}
