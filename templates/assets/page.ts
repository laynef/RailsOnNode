import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  template: `
  
  `,
  selector: 'app',
  styleUrl: [/* Route Path */]
})

class AppComponent {
  title = 'angular';
}

class Redux {
  
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [Redux],
  bootstrap: [AppComponent]
})

export class AppModule { }