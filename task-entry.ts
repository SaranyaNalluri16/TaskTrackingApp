import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For two-way data binding with ngModel
import { Router } from '@angular/router'; // For navigation between pages
import { CommonModule } from '@angular/common'; // Common Angular directives like ngIf, ngFor

@Component({
  selector: 'app-task-entry', // Component selector used in HTML
  standalone: true, // Allows this component to be used without being declared in a module
  templateUrl: './task-entry.html', // HTML template file
  imports: [FormsModule, CommonModule] // Required modules for template
})
export class TaskEntryComponent {

  // Task object to store form input values
  task = {
    name: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending'
  };

  constructor(private router: Router) {} // Inject Router for navigation

  // Called when the form is submitted
  onSubmit() {
    // Validation: Ensure all required fields are filled
    if (!this.task.name || !this.task.description || !this.task.dueDate) {
      alert('All fields are required.');
      return;
    }

    // Validation: Ensure due date is today or in the future
    const today = new Date().toISOString().split('T')[0];
    if (this.task.dueDate < today) {
      alert('Due date must be today or in the future.');
      return;
    }

    // Get existing tasks from local storage or initialize empty array
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Add new task to the list
    tasks.push(this.task);

    // Save updated tasks list back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Navigate to the View Tasks page
    this.router.navigate(['/view-tasks']);
  }
}
