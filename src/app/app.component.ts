import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { MainGridComponent } from "./features/main-grid/main-grid.component";

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],/* RouterOutlet */
  template: `
  <div class="app-container">
      <router-outlet></router-outlet>
    </div>

  ` ,
  styles: [`
  .center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

  `]
})
export class AppComponent {
  title = 'exin-partner-grid';
}
