// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { EmployeeService } from '../services/employee.service';
// import {  DialogRef } from '@angular/cdk/dialog';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// @Component({
//   selector: 'app-add-edit',
//   templateUrl: './add-edit.component.html',
//   styleUrls: ['./add-edit.component.css']
// })
// export class AddEditComponent implements OnInit{
//   empForm:FormGroup;

//   education:string[]=[
//     'School',
//     'Intemediate',
//     'Diploma',
//     'Graduate',
//     'Post Graduate'
//   ]

//   constructor(private _fb: FormBuilder,
//      private _empService:EmployeeService,
//      private _dialogRef:DialogRef<AddEditComponent>,
//      @Inject(MAT_DIALOG_DATA) public data:any
//     ){
//   this.empForm =  this._fb.group({
//     firstname:'',
//     lastname:'',
//     email:'',
//     dob:'',
//     gender:'',
//     education:'',
//     company:'',
//     experience:'',
//     salary:''
//   });
// }
//   onFormSubmit(){
//     if(this.empForm.valid){
//         if(this.data){
//           this._empService.UpdateEmployee(this.data.id, this.empForm.value).subscribe({
//             next: (res :any) =>{
//               alert('Employee Updated successfully');
//               this._dialogRef.close(res);     // automatically refresh the page.
//             },
//             error:(err)=>{
//               console.log(err);
//             }
//           })
//         }else {
//           this._empService.addEmployee(this.empForm.value).subscribe({
//             next: (res :any) =>{
//               alert('Employee addeed successfully');
//               this._dialogRef.close(res);
//             },
//             error:(err)=>{
//               console.log(err);
//             }
//           })
//         }
//     }
//   }
//   ngOnInit(): void{
//     this.empForm.patchValue(this.data);
//   }
// }

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'School',
    'Intermediate',
    'Diploma',
    'Graduate',
    'Post Graduate'
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: DialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', [Validators.required, Validators.min(0)]],
      salary: ['', [Validators.required, Validators.min(0)]]     
    });
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService.UpdateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (res: any) => {
            alert('Employee Updated successfully');
            this._dialogRef.close(res); // automatically refresh the page.
          },
          error: (err) => {
            console.log(err);
          }
        });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (res: any) => {
            alert('Employee added successfully');
            this._dialogRef.close(res);
          },
          error: (err) => {
            console.log(err); 
          }
        });
      }
    }
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
}
