import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProviderDto } from '../../models/provider/providerDto';
import { ProviderService } from '../../provider/provider.service';

@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.css']
})
export class ProviderDetailsComponent implements OnInit {
  provider: ProviderDto | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: ProviderService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getById();
  }

  getById(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.heroService.getById(id)
      .subscribe(provider => this.provider = provider);
  }

  goBack(): void {
    this.location.back();
  }

  

}
