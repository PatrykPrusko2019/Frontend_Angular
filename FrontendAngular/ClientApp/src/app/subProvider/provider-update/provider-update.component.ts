import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProviderDto } from '../../models/provider/providerDto';
import { ProviderService } from '../../provider/provider.service';

@Component({
  selector: 'app-provider-update',
  templateUrl: './provider-update.component.html',
  styleUrls: ['./provider-update.component.css']
})
export class ProviderUpdateComponent implements OnInit {
  provider: ProviderDto | undefined;

  constructor(
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getById();
  }

  getById(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.providerService.getById(id)
      .subscribe(provider => this.provider = provider);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.provider) {
      this.providerService.update(this.provider)
        .subscribe(() => this.goBack());
    }
  }


}
