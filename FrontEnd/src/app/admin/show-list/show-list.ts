import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-show-list',
  imports: [CommonModule],
  templateUrl: './show-list.html',
  styleUrl: './show-list.css',
})
export class ShowList {
  @Input() shows: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();
}
