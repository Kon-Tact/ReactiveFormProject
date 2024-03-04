import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiAccessService } from './api-access.service';
import { student } from './student';
import { Router } from '@angular/router';
import { DataserviceService } from './dataservice.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: `
  .example-form {
  min-width: 150px;
  max-width: 500px;
  width: 100%;
}

.example-full-width {
  width: 100%;
}`

})

export class AppComponent implements OnInit{

  studentList: student[];
  studentForm: FormGroup;
  

  constructor(
    private api: ApiAccessService,
    private fb: FormBuilder,
    private router: Router,
    private dataServ: DataserviceService) {}

  ngOnInit() {
    this.api.getStudentList()
    .subscribe(studentList => this.studentList = studentList);
    this.dataSource = this.studentList;

    this.initForm();
  }

  initForm() {
    this.studentForm = this.fb.group({
      name: [''],
      phoneNumber: [''],
      email: [''],
      address: [''],
    });
  }

  onSubmit() {
    if(this.studentForm.valid) {
      const newStudent = this.studentForm.value;
      this.api.saveStudent(newStudent)
      .subscribe((student) => { console.log('L\'étudiant a bien été enregistré sue la base : ', student);
      this.ngOnInit();
      })
    }
    
  }

  deleteStudent(student: student) {
    console.log(student.id);
    
    this.api.deleteStudent(student)
    .subscribe(() => { 
      this.studentList = this.studentList.filter(s => s.id !== student.id);
    })
  }

  fillTestValues() {
    
    let randoName: string = "";
    let randoPN: string = ("6" + Math.floor(Math.random() * 100000000));
    console.log(randoPN);
    let randoMail: string = "";
    let randoAdresse: string =  String(Math.floor(Math.random() * 30) + 1);
    
    this.dataServ.getRandoData("lastname").subscribe(lastname => {
      randoName = lastname;

      this.dataServ.getRandoData("firstname").subscribe(firstname => {
        randoMail = randoName.toLowerCase().replace(/\s/g, '') + "." + firstname.toLowerCase().replace(/\s/g, '') + "@email.com";
        randoName = randoName + " " + firstname;

        this.dataServ.getRandoData("rue").subscribe(rue => {
          randoAdresse = randoAdresse + " " + rue;
          this.studentForm.patchValue({
            name: randoName,
            phoneNumber: randoPN,
            email: randoMail,
            address: randoAdresse,
          })
        })    
      })
    })

    
    
    
  }

  goToSignIn(){
    this.router.navigate(['/signin']);
  }

  dataSource: any[];
  displayedColumns: String[] = ['id', 'name', 'phoneNumber', 'email', 'address', 'delete'];
}
