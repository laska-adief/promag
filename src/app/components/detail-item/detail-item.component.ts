import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss'],
})
export class DetailItemComponent implements OnInit {
  itemForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<DetailItemComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log('dialogData', this.dialogData);
    this.initItemForm();
    if (this.dialogData.action === 'view') {
      this.itemForm.disable();
    }
  }

  initItemForm() {
    this.itemForm = this.fb.group(this.dynamicFormControlForm());
    console.log(this.itemForm);
  }

  dynamicFormControlForm() {
    const formGroupFields: any = {};
    this.dialogData.displayedItemDetail.forEach((control: any) => {
      const value = control.value ? control.value : '';
      formGroupFields[control.inputName] = new FormControl(value);
    });
    formGroupFields['url_photo'] = new FormControl(
      this.dialogData.displayedItemDetail.url_photo
    );
    return formGroupFields;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSaveItem() {
    if (this.dialogData.action === 'add') {
      this.onAddItem();
    } else if (this.dialogData.action === 'view') {
      this.onEditItem();
    }
  }

  onAddItem() {
    const itemValue = this.itemForm.getRawValue();
    const dataAddItem = {
      data: this.dialogData.data,
      action: 'add',
      payload: { ...itemValue },
    };
    this.dialogRef.close(dataAddItem);
  }

  onEditItem() {
    const itemValue = this.itemForm.getRawValue();
    const dataAddItem = {
      data: this.dialogData.data,
      action: 'edit',
      payload: { ...itemValue },
    };
    this.dialogRef.close(dataAddItem);
  }

  onDeleteItem(data: string, id: string) {
    const dataDeletedItem = { data: data, id: id, action: 'delete' };
    this.dialogRef.close(dataDeletedItem);
  }

  editInputItem(formControl: any) {
    this.itemForm.get(formControl)?.disabled
      ? this.itemForm.get(formControl)?.enable()
      : this.itemForm.get(formControl)?.disable();
  }
}
