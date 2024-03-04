import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { ApiAccessService } from '../api-access.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: 'sign-in-form.component.html',
  styles: ``
})
export class SignInFormComponent implements OnInit{

  studentForm: FormGroup;

  constructor(
    private router: Router,
    private api: ApiAccessService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
    });
  }

  onSubmit() {
    if(this.studentForm.valid) {
      const newStudent = this.studentForm.value;
      this.api.saveStudent(newStudent)
      .subscribe((student) => { console.log('L\'étudiant a bien été enregistré sue la base : ', student);
      })
      this.router.navigate(['/students'])
    }
  }
}
