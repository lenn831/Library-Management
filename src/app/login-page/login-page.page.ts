import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, Routes } from '@angular/router';
import { IonCard, IonContent, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule,
    IonCard, IonContent, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton]
})

export class LoginPagePage {
  loginForm: FormGroup;
  
  routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login-page', loadComponent: () => import('./login-page.page').then(m => m.LoginPagePage) },
    {path: 'tabs', loadChildren: () => import('../tabs/tabs.routes').then(m => m.routes) }
  ]


  constructor(private fb: FormBuilder, private router: Router) { 
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

login() {
  if (this.loginForm.invalid) return;

  const { username, password } = this.loginForm.value;

  if (username === 'admin' && password === 'admin123') {
    sessionStorage.setItem('isLoggedIn', 'true');
    this.router.navigateByUrl('/tabs/tab1');
  } else {
    alert('Invalid username or password');
  }
}
}
