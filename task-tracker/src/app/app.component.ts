import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TasksViewComponent } from './tasks-view/tasks-view.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule,
    TasksViewComponent,
    RouterLink,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private notificationService: NotificationService) {
    this.notificationService.initWebSocket();
  }

  ngOnInit(): void {}
  title = 'task-tracker';
}
