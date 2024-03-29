import { Component, OnInit } from '@angular/core';
import { ProviderDto } from '../models/provider/providerDto';
import { ProviderService } from './provider.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { min } from 'rxjs';


@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  providers: ProviderDto[] = [];

  constructor(private providerService: ProviderService) { }


  userForm = new FormGroup({

    companyName: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
  });

  onSubmit() { }

  ngOnInit(): void {
    this.getAll();
  }


  getAll(): void {
    this.providerService.getAll()
      .subscribe(providers => this.providers = providers);
  }

  createProvider(companyName: string, city: string, street: string, zipCode: string): void {
    companyName = companyName.trim();
    if (!companyName) { return; }
    street = street.trim();
    if (!street) { return; }
    city = city.trim();
    if (!city) { return; }
    zipCode = zipCode.trim();
    if (!zipCode) { return; }
    this.providerService.createProvider({ companyName, city, street, zipCode } as ProviderDto)
      .subscribe(provider => {
        this.providers.push(provider); this.getAll(); //location.reload()
      });
  }

  delete(provider: ProviderDto): void {
    this.providers = this.providers.filter(p => p !== provider);
    this.providerService.delete(provider.id).subscribe();
  }


}
