import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonCard, IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  imports: [ FormBuilder, FormGroup, ReactiveFormsModule, Validators, CommonModule,
    IonCard, IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton]
})

export class LoginPagePage {
  loginForm: FormGroup;
  

  constructor(private fb: FormBuilder) { 
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
