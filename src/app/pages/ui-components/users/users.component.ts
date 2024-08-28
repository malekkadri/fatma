import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormModalComponent } from './user-form-modal/user-form-modal.component';
import { UserService, User } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userColumns: string[] = ['id', 'username', 'email', 'national_id', 'actions'];
  userDataSource: User[] = [];
  adminDataSource: User[] = [];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchAdmins();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.userDataSource = users || [];
      },
      error => {
        this.showSnackBar('Failed to load users', 'error');
      }
    );
  }

  fetchAdmins() {
    this.userService.getAdmins().subscribe(
      admins => {
        this.adminDataSource = admins || [];
      },
      error => {
        this.showSnackBar('Failed to load admins', 'error');
      }
    );
  }

  onEditUser(index: number, isAdmin: boolean) {
    const dataSource = isAdmin ? this.adminDataSource : this.userDataSource;
    const user = dataSource[index];
    const dialogRef = this.dialog.open(UserFormModalComponent, {
      width: '400px',
      data: { user, isEditing: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        dataSource[index] = result;
        this.showSnackBar('User updated successfully', 'success');
      }
    });
  }

  onAddUser(isAdmin: boolean) {
    const dialogRef = this.dialog.open(UserFormModalComponent, {
      width: '400px',
      data: { isEditing: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.addUser(result).subscribe(user => {
          if (isAdmin) {
            this.adminDataSource.push(user);
            this.adminDataSource = [...this.adminDataSource];
          } else {
            this.userDataSource.push(user);
            this.userDataSource = [...this.userDataSource];
          }
          this.showSnackBar('User added successfully', 'success');
        }, error => {
          this.showSnackBar('Failed to add user', 'error');
        });
      }
    });
  }

  onDeleteUser(index: number, isAdmin: boolean) {
    const dataSource = isAdmin ? this.adminDataSource : this.userDataSource;
    dataSource.splice(index, 1);
    if (isAdmin) {
      this.adminDataSource = [...this.adminDataSource];
    } else {
      this.userDataSource = [...this.userDataSource];
    }
    this.showSnackBar('User deleted successfully', 'success');
  }

  showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [type === 'success' ? 'snack-bar-success' : 'snack-bar-error'],
    });
  }
}
