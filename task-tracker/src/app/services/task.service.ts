import { Injectable } from '@angular/core';
import { Task } from '../../task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseURL = 'http://localhost:5166/Task';

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.baseURL);
  }

  addTask(newTask: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.baseURL, newTask, {
      headers: this.httpOptions.headers,
      responseType: 'text' as 'json',
    });
  }

  editTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.baseURL}/${task.id}`, task);
  }

  deleteTask(task: Task): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${task.id}`, {
      headers: this.httpOptions.headers,
      responseType: 'text' as 'json',
    });
  }
}
