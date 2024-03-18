import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DocumentService } from '../../document/document.service';
import { DocumentDto } from '../../models/document/documentDto';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {
  document: DocumentDto | undefined;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private location: Location
  ) { }

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



}
