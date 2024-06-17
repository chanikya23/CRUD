import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'salary',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }
  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openAddEditForm() {
    const dialogRef = this._dialog.open(AddEditComponent);
  } 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert(`Employee ${id} deleted!`);
        this.getEmployeeList();
      },
      error: console.log,
    });
  }
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if (val){
          this.getEmployeeList();
        }
      }
    })
  }
}

// import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { AddEditComponent } from './add-edit/add-edit.component';
// import { EmployeeService } from './services/employee.service';
// import { MatSort } from '@angular/material/sort';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatTableDataSource } from '@angular/material/table';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   displayedColumns: string[] = [
//     'id',
//     'firstname',
//     'lastname',
//     'email',
//     'dob',
//     'gender',
//     'education',
//     'company',
//     'experience',
//     'salary',
//     'action'
//   ];
//   dataSource = new MatTableDataSource<any>();

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   constructor(private _dialog: MatDialog, private _empService: EmployeeService) {}

//   ngOnInit(): void {
//     this.getEmployeeList();
//   }

//   openAddEditForm(): void {
//     const dialogRef = this._dialog.open(AddEditComponent);
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.getEmployeeList();
//       }
//     });
//   }

//   getEmployeeList(): void {
//     this._empService.getEmployeeList().subscribe({
//       next: (res) => {
//         this.dataSource.data = res;
//         this.dataSource.sort = this.sort;
//         this.dataSource.paginator = this.paginator;
//       },
//       error: (err) => {
//         console.error('Error fetching employee list', err);
//       }
//     });
//   }

//   applyFilter(event: Event): void {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }

//   deleteEmployee(id: number): void {
//     this._empService.deleteEmployee(id).subscribe({
//       next: () => {
//         alert(`Employee ${id} deleted!`);
//         this.getEmployeeList();
//       },
//       error: (err) => {
//         console.error('Error deleting employee', err);
//       }
//     });
//   }

//   openEditForm(data: any): void {
//     const dialogRef = this._dialog.open(AddEditComponent, {
//       data,
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.getEmployeeList();
//       }
//     });
//   }
// }
