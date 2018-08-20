import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';

const route = /* CLI: Route Path */;

@Component({
  template: `
  
  `,
  selector: 'app',
  styleUrl: [`./${route}`]
})

class AppComponent {
  title = 'angular';
}

class Redux {
  
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    Redux
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }