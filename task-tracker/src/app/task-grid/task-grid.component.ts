import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TaskCardComponent } from '../task-card/task-card.component';
import { Task } from '../../task';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-grid',
  standalone: true,
  imports: [MatCardModule, TaskCardComponent, CommonModule],
  providers: [TaskService],
  templateUrl: './task-grid.component.html',
  styleUrl: './task-grid.component.scss',
})
export class TaskGridComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
}
