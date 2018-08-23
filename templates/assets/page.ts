import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  template: `
    <h1 style="text-align: center;">Hello World</h1>
  `,
  selector: 'app',
  styleUrl: [
    // Route Path
  ]
})

class AppComponent {

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