import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  captcha: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
