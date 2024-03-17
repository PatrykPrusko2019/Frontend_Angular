import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../models/product/productDto';
import { ProductService } from './product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  products: ProductDto[] = [];

  constructor(private productService: ProductService) { }


  userForm = new FormGroup({

    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.pattern("^[0-9]*$")),
    unitPieces: new FormControl('', Validators.pattern("^[0-9]*$")),
    admissionDocumentId: new FormControl('', Validators.pattern("^[0-9]*$")),
  });

  onSubmit() { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.productService.getAll()
      .subscribe(products => this.products = products);
  }

  createProduct(name: string, code: string, price: string, unitPieces: string, admissionDocumentId: string): void {
    name = name.trim();
    if (!name) {  return; }
    price = price;
    if (!price) { return; }
    code = code.trim();
    if (!code) { return; }
    unitPieces = unitPieces.trim();
    if (!unitPieces) { return; }
    admissionDocumentId = admissionDocumentId.trim();
    if (!admissionDocumentId) { return; }
    this.productService.createProduct({ name, code, price, unitPieces, admissionDocumentId } as ProductDto)
      .subscribe(product => {
        this.products.push(product); this.getAll(); //location.reload()
      });
  }
}
