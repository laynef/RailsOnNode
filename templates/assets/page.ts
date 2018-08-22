import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  template: `
    <div style="text-align: center;">Hello World</div>
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