import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  regForm: FormGroup;
  showPassword: boolean;
  constructor(private fb: FormBuilder) {
    this.regForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  get regFormControls() {
    return this.regForm.controls;
  }

  submit() {
    Object.keys(this.regForm.controls).forEach(field => {
      const control = this.regForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
