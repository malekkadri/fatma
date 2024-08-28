import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.css']
})
export class UserFormModalComponent {
  userForm: FormGroup;
  isEditing: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditing = data.isEditing;
    this.userForm = this.fb.group({
      username: [data.user?.username || '', Validators.required],
      email: [data.user?.email || '', [Validators.required, Validators.email]],
      password: ['', this.isEditing ? [] : Validators.required], // Password is only required for new users
      national_id: [data.user?.national_id || '', Validators.required]
    });
  }

  onSave() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
