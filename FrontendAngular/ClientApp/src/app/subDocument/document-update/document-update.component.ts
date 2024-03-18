
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DocumentDto } from '../../models/document/documentDto';
import { DocumentService } from '../../document/document.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-update',
  templateUrl: './document-update.component.html',
  styleUrls: ['./document-update.component.css']
})
export class DocumentUpdateComponent implements OnInit {
  document: DocumentDto | undefined;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private location: Location
  ) { }

  userForm = new FormGroup({

    targetWarehouse: new FormControl('', Validators.required),
    vendor: new FormControl('', Validators.required),
    approvedDocument: new FormControl('', Validators.required),
    labelNames: new FormControl('', Validators.required),
  });

  onSubmit() { }


  ngOnInit(): void {
    this.getById();
  }

  getById(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.documentService.getById(id)
      .subscribe(document => this.document = document);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.document) {
      this.documentService.update(this.document)
      .subscribe(() => this.goBack());
  }
}


}

