import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { min } from 'rxjs';
import { DocumentDto } from '../models/document/documentDto';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  documents: DocumentDto[] = [];

  constructor(private documentService: DocumentService) { }


  userForm = new FormGroup({

    targetWarehouse: new FormControl('', Validators.required),
    vendor: new FormControl('', Validators.required),
    providerId: new FormControl('', Validators.required),
    storageId: new FormControl('', Validators.required),
    labelNames: new FormControl('', Validators.required),
  });

  onSubmit() { }

  ngOnInit(): void {
    this.getAll();
  }


  getAll(): void {
    this.documentService.getAll()
      .subscribe(documents => this.documents = documents);
  }

  createDocument(targetWarehouse: string, providerId: string, labelNames: string): void {
    targetWarehouse = targetWarehouse.trim();
    if (!targetWarehouse) { return; }
    providerId = providerId.trim();
    if (!providerId) { return; }
    this.documentService.createDocument({ targetWarehouse, providerId, labelNames } as DocumentDto)
      .subscribe(document => {
        this.documents.push(document); this.getAll(); //location.reload()
      });
  }

  delete(document: DocumentDto): void {
    this.documents = this.documents.filter(p => p !== document);
    this.documentService.delete(document.id).subscribe();
  }

}
