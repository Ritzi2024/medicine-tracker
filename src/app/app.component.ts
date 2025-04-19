import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    MatSidenavModule, 
    MatIconModule, 
    MatButtonModule, 
    HeaderComponent,
    MatListModule,
    RouterLink
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'medicine-tracker';
  options = [{
    name: 'Dashboard',
    icon: 'dashboard',
    link: '/'
  }, {
    name: 'Manage Medicines',
    icon: 'medication',
    link: 'manage-medicine-list'
  }]
}
