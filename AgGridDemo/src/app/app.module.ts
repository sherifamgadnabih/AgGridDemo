import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent, QuickViewModal } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { ProductService } from './product.service';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { WinAuthInterceptor } from './Interceptor';


@NgModule({
  declarations: [
    AppComponent,
    QuickViewModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    HttpModule,

  ],
  providers: [ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WinAuthInterceptor,
      multi: true
    },
  ],
  entryComponents: [QuickViewModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
