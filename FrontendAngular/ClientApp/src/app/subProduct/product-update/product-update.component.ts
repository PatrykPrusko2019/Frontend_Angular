import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDto } from '../../models/product/productDto';
import { ProductService } from '../../product/product.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  product: ProductDto | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) { }

  userForm = new FormGroup({

    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    price: new FormControl('', Validators.pattern("^[0-9]*$")),
    unitPieces: new FormControl('', Validators.pattern("^[0-9]*$")),
    admissionDocumentId: new FormControl('', Validators.pattern("^[0-9]*$")),
  });

  onSubmit() { }


  ngOnInit(): void {
    this.getById();
  }

  getById(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.productService.getById(id)
      .subscribe(product => this.product = product);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.product) {
      this.productService.update(this.product)
        .subscribe(() => this.goBack());
    }
  }


}
