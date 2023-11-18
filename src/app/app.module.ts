import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ItemComponent } from './components/dogs/item/item.component';
import { ListComponent } from './components/dogs/list/list.component';
import { ErrInterceptor } from './interceptors/err.interceptor';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { DogService } from './services/dog.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ItemComponent,
    FilterByNamePipe,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],

  providers: [
    DogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
