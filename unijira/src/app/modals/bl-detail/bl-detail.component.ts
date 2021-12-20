import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Task } from '../../models/Task';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-bl-detail',
  templateUrl: './bl-detail.component.html',
  styleUrls: ['./bl-detail.component.scss'],
})
export class BlDetailComponent implements OnInit {
  @Input()
  task: Task;
  @Output() outputData = new EventEmitter<Task>();

  arr: any[] = [1, 2, 3, 4, 5];

  ngOnInit() {
    console.log(this.task);
  }
  emitData(data) {
    this.outputData.emit(data);
  }
}
