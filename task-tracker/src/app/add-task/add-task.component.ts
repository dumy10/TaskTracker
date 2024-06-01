import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { TaskService } from '../services/task.service';
import { Status } from '../../status';
import { Task } from '../../task';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
    MatButtonModule,
  ],
  providers: [TaskService],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  taskName: string;
  taskDescription: string;
  assignedTo: string;

  constructor(
    private router: Router,
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  onSubmit(): void {
    if (!this.taskName) {
      alert('Task name is required');
      return;
    }

    if (!this.taskDescription) {
      alert('Task description is required');
      return;
    }

    if (!this.assignedTo) {
      this.assignedTo = 'No one';
    }

    const newTask = <Task>{
      title: this.taskName,
      description: this.taskDescription,
      assignedTo: this.assignedTo,
      status: Status.ToDo,
    };

    this.taskService.addTask(newTask).subscribe(() => {
      this.notificationService.sendMessage('BroadcastMessage', [newTask]);
      this.router.navigate(['/']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
