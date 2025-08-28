/*import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskEntryComponent } from './component/task-entry/task-entry';
import { TaskViewComponent } from './component/task-view/task-view';
import { AppRoutingModule } from './app-routing.module';


const routes: Routes = [
  { path: '', redirectTo: 'add-task', pathMatch: 'full' },
  { path: 'add-task', component: TaskEntryComponent },
  { path: 'view-tasks', component: TaskViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}*/

import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { TaskEntryComponent } from './component/task-entry/task-entry';
import { TaskViewComponent } from './component/task-view/task-view';

const routes: Routes = [
  { path: '', redirectTo: 'add-task', pathMatch: 'full' },
  { path: 'add-task', component: TaskEntryComponent },
  { path: 'view-tasks', component: TaskViewComponent }
];

export const AppRoutingModule = provideRouter(routes);
