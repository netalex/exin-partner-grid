import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainGridComponent } from "../features/main-grid/main-grid.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainGridComponent],
  template: `
  <div class="center-container">
    <app-main-grid />
  </div>
  ` ,
  styles: [`
  .center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Altezza totale della viewport */
}

  `]
})
export class AppComponent {
  title = 'exin-partner-grid';
}
