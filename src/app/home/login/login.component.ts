import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { PatformDetectorService } from '../../core/platform-detector/patform-detector.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  @ViewChild('userNameInput', { static: false })
  userNameInput!: ElementRef<HTMLInputElement>;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private platformDetectorService: PatformDetectorService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password:  ['', Validators.required]
    });
  }

  submit(): void {
    const email = this.form.get('email')!.value;
    const password = this.form.get('password')!.value;
    this.authService.authenticate(email, password).subscribe(
      () => {

        this.router.navigate(['/']).finally(() => window.location.reload());
      },
      err => {
        console.log(err);
        this.form.reset();
        this.platformDetectorService.isPlatformBrowser() &&
          this.userNameInput.nativeElement.focus();
        alert('Senha ou email inválidos');
      }
    );
  }
}
