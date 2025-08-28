import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Angular common directives
import { FormsModule } from '@angular/forms'; // For ngModel binding
import { RouterModule } from '@angular/router'; // For navigation

@Component({
  selector: 'app-root', // Root component selector
  standalone: true,
  templateUrl: './app.html', // Root template
  styleUrls: ['./app.css'], // Root styles
  imports: [CommonModule, FormsModule, RouterModule]
})
export class AppComponent {}
