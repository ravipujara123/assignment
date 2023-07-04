import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({});

  userLoginForm!: any
  email!: string;
  password!: string;
  emailError: boolean = false;
  passError: boolean = false;

  constructor(private router: Router, private service: CommonService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}')]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
    })
  }

  onSubmit() {
    this.service.button.next(true);
    if (this.loginForm.value.email == 'admin123@gmail.com') {
      localStorage.setItem('Login', JSON.stringify(this.loginForm.value));
      this.router.navigate(['/dashboard']);
      alert(" Admin Logine sucessfully");
      this.loginForm.reset();
    } else {
      alert('user not found')
    }
  }
}




