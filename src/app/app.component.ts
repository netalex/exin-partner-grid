import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  template: `
  <div class="app-container">
      <router-outlet></router-outlet>
    </div>

  ` ,
  styles: [`
    .app-container {
      margin: 0 auto;
      padding: 1rem;
}
  `]
})
export class AppComponent {
  title = 'exin-partner-grid';
}
