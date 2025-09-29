import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-show-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './show-form.html',
  styleUrl: './show-form.css',
})
export class ShowForm {
  @Input() editingShow: any = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  model: any = {
    title: '',
    description: '',
    price: '',
    posterUrl: '',
    schedules: [{ date: '', time: '' }],
  };

  ngOnChanges() {
    this.model = this.editingShow
      ? { ...this.editingShow }
      : {
          title: '',
          description: '',
          price: '',
          posterUrl: '',
          schedules: [{ date: '', time: '' }],
        };
  }
  resetForm() {
    this.model = {
      title: '',
      description: '',
      price: '',
      posterUrl: '',
      schedules: [{ date: '', time: '' }],
    };
  }

  addSchedule() {
    this.model.schedules.push({ date: '', time: '' });
  }

  removeSchedule(index: number) {
    this.model.schedules.splice(index, 1);
  }
}
