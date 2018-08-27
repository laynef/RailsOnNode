import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import Application from './component';

if (process.env.NODE_ENV !== 'production') {
  enableProdMode();
}

@NgModule({
  declarations: [Application],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [Application]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));