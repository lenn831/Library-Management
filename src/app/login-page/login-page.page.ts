import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonCard, IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule,
    IonCard, IonContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton]
})

export class LoginPagePage {
  loginForm: FormGroup;
  
  constructor(
  private fb: FormBuilder,
  private router: Router,
  private authService: AuthService
  ) {
  this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
}

login(): void {
  if (this.loginForm.invalid) return;

  const { username, password } = this.loginForm.value;

  if (!this.authService.login(username, password)) {
    alert('Invalid username or password');
    return;
  }

  if (this.authService.getRole() === 'student') {
    this.router.navigateByUrl('/student');
  } else {
    this.router.navigateByUrl('/tabs/tab1');
  }
}
}
