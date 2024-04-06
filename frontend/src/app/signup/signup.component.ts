import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    address: ''
  };


  constructor() { }

  submitForm() {

  }
}
