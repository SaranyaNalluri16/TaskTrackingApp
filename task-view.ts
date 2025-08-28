import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-view', // Component name
  standalone: true,
  templateUrl: './task-view.html', // Template file
  imports: [CommonModule, RouterModule, FormsModule] // Required modules
})
export class TaskViewComponent {

  tasks: any[] = []; // All tasks
  editIndex: number | null = null; // Task being edited
  editedTask: any = {}; // Temporary edited task

  // Filtering & sorting variables
  searchTerm: string = '';
  statusFilter: string = '';
  priorityFilter: string = '';
  sortField: string = '';

  // Load tasks from local storage
  ngOnInit() {
    const data = localStorage.getItem('tasks');
    this.tasks = data ? JSON.parse(data) : [];
  }

  // Delete a task
  deleteTask(index: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks.splice(index, 1);
      this.saveTasksToStorage();
    }
  }

  // Begin editing a task
  startEdit(index: number) {
    this.editIndex = index;
    this.editedTask = { ...this.tasks[index] };
  }

  // Cancel editing
  cancelEdit() {
    this.editIndex = null;
    this.editedTask = {};
  }

  // Save task after editing
  saveEdit() {
    if (!this.editedTask.name || !this.editedTask.description || !this.editedTask.dueDate) {
      alert('All fields are required.');
      return;
    }
    this.tasks[this.editIndex!] = { ...this.editedTask };
    this.saveTasksToStorage();
    this.cancelEdit();
  }

  // Mark as completed
  updateStatusToCompleted(index: number) {
    this.tasks[index].status = 'Completed';
    this.saveTasksToStorage();
  }

  // Change status manually
  setStatus(index: number, status: string) {
    this.tasks[index].status = status;
    this.saveTasksToStorage();
  }

  // Save when dropdown changes
  updateStatus(index: number) {
    this.saveTasksToStorage();
  }

  // Save tasks to local storage
  saveTasksToStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Filter tasks by search & filters
  get filteredTasks() {
    return this.tasks.filter(task =>
      task.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (!this.statusFilter || task.status === this.statusFilter) &&
      (!this.priorityFilter || task.priority === this.priorityFilter)
    );
  }

  // Sort tasks after filtering
  get sortedTasks() {
    const sorted = [...this.filteredTasks];
    if (this.sortField === 'priority') {
      const order: Record<string, number> = { Low: 1, Medium: 2, High: 3 };
      sorted.sort((a, b) => order[a.priority] - order[b.priority]);
    } else if (this.sortField === 'status') {
      const order: Record<string, number> = { Pending: 1, 'In Progress': 2, Completed: 3 };
      sorted.sort((a, b) => order[a.status] - order[b.status]);
    }
    return sorted;
  }
}
