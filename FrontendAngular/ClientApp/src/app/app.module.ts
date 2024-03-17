import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProviderComponent } from './provider/provider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProviderDetailsComponent } from './subProvider/provider-details/provider-details.component';
import { ProviderUpdateComponent } from './subProvider/provider-update/provider-update.component';
import { ProductComponent } from './product/product.component';
import { MessageComponent } from './message/message.component';
import { ToastrModule } from 'ngx-toastr';
import { ProductDetailsComponent } from './subProduct/product-details/product-details.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProviderComponent,
    ProviderDetailsComponent,
    ProviderUpdateComponent,
    ProductComponent,
    MessageComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'provider', component: ProviderComponent },
      { path: 'subProvider/details/:id', component: ProviderDetailsComponent },
      { path: 'subProvider/update/:id', component: ProviderUpdateComponent },
      { path: 'product', component: ProductComponent },
      { path: 'message', component: MessageComponent },
      { path: 'subProduct/details/:id', component: ProductDetailsComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
