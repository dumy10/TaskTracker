import { Component, OnInit } from '@angular/core';
import { TaskGridComponent } from '../task-grid/task-grid.component';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AddTaskComponent } from '../add-task/add-task.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-tasks-view',
  standalone: true,
  imports: [
    TaskGridComponent,
    CommonModule,
    TaskCardComponent,
    TaskListComponent,
    MatIconModule,
    RouterModule,
    AddTaskComponent,
  ],
  templateUrl: './tasks-view.component.html',
  styleUrl: './tasks-view.component.scss',
})
export class TasksViewComponent implements OnInit {
  isList: boolean = true;
  notificationMessage: string;

  constructor(private notificationService: NotificationService) {}
  ngOnInit(): void {
    this.notificationService.notificationSubject.subscribe(
      (hasNotifications) =>
        (this.notificationMessage = hasNotifications
          ? 'New notifications, please refresh the page'
          : '')
    );
  }
}
