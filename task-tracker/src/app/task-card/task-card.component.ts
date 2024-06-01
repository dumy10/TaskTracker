import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { TaskService } from '../services/task.service';
import { Task } from '../../task';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    EditTaskComponent,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input() task: Task;

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  editTask(task: Task) {
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

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe((task) => {
      this.notificationService.sendMessage('BroadcastMessage', [task]);
      window.location.reload();
    });
  }
}
