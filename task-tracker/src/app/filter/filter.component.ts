import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Status } from '../../status';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  statuses: Status[] = [];
  @Output() statusSelected: EventEmitter<Status> = new EventEmitter();

  ngOnInit(): void {
    this.statuses = Object.values(Status);
  }

  selectStatus(status: Status) {
    this.statusSelected.emit(status);
  }
}
