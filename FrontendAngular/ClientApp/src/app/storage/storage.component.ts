import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { min } from 'rxjs';
import { StorageDto } from '../models/storage/storageDto';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
  storages: StorageDto[] = [];

  constructor(private storageService: StorageService) { }


  userForm = new FormGroup({

    name: new FormControl('', Validators.required),
    symbol: new FormControl('', Validators.required),
  });

  onSubmit() { }

  ngOnInit(): void {
    this.getAll();
  }


  getAll(): void {
    this.storageService.getAll()
      .subscribe(storages => this.storages = storages);
  }


}
