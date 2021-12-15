import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss']
})
export class ModalPopupComponent implements OnInit {
  @Input() open: boolean = false;
  userFormAction: string = '';
  @Output() formValues = new EventEmitter();
  @Output() modalState = new EventEmitter();
  @Input() set userDetails(data: any) {
    if(data) {
      if(data?.type) {
        this.userFormAction = data?.type;
        if(this.userFormAction === 'view') {
          this.userForm.disable();
        } else if (this.userFormAction === 'create') {
          this.userForm.enable();
          this.userForm.reset();
        } else {
          this.userForm.enable();
        }
      }
      this.userForm.patchValue(data);
    }
  }
  userForm: FormGroup = this.fb.group({
    name: this.fb.control('', Validators.required),
    email: this.fb.control('', [Validators.required, Validators.email]),
    address: this.fb.group({
      city: this.fb.control('', Validators.required),
      zipcode: this.fb.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    }),
    phone: this.fb.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get userControls() {
    return this.userForm.controls;
  }


  getUserValue() {
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.controls[key].markAllAsTouched();
    });
    if(this.userForm.valid) {
      this.formValues.emit({...this.userForm.getRawValue(), type: this.userFormAction});
    }
  }

  emitState() {
    this.open = false;
    this.modalState.emit(this.open)
  }
}
