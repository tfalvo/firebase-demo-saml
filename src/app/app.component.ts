import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<User> = this.auth.user;
  samlProfile: any = null;

  constructor(public app: FirebaseApp, public auth: AngularFireAuth) {
    this.auth.user.subscribe(user => console.log(user.email));
  }

  signInSAML() {
    const provider = new auth.SAMLAuthProvider('saml.jumpcloud-demo');

    this.auth.auth.signInWithPopup(provider).then(userCredential => {
      this.samlProfile = userCredential.additionalUserInfo.profile;
    })
  }

  signOut() {
    this.auth.auth.signOut();
    this.samlProfile = null;
  }
}
