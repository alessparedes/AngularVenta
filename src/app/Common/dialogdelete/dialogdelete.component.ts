import { Component, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  templateUrl: './dialogdelete.component.html',
  styleUrls: ['./dialogdelete.component.scss']
})
export class DialogdeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogdeleteComponent>) { }

  ngOnInit(): void {
  }

}
