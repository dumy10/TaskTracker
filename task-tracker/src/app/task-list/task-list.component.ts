import { Component, OnInit } from '@angular/core';
import { Task } from '../../task';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { FilterComponent } from '../filter/filter.component';
import { Status } from '../../status';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    TaskCardComponent,
    FilterComponent,
    MatButtonModule,
    MatIconModule,
    MatCardActions,
    MatCardModule,
    EditTaskComponent,
  ],
  providers: [TaskService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.taskService
      .getTasks()
      .subscribe((tasks) => (this.filteredTasks = this.tasks = tasks));
  }

  handleSelectedStatus(status: Status): void {
    this.filteredTasks = this.tasks.filter((task) => task.status === status);
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.taskService.editTask(task).subscribe((task) => {
        this.notificationService.sendMessage('BroadcastMessage', [task]);
      });
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe((task) => {
      this.notificationService.sendMessage('BroadcastMessage', [task]);
      this.taskService
        .getTasks()
        .subscribe((tasks) => (this.filteredTasks = this.tasks = tasks));
    });
  }
}
