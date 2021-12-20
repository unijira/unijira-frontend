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
  @Output() closeModal = new EventEmitter<boolean>();
  ngOnInit() {
    console.log(this.task);
  }
  emitData(data) {
    this.outputData.emit(data);
  }

  editAssegnatario() {
    alert('Edit assegnatario');
  }

  editDescrizione() {
    alert('Edit descrizione');
  }

  editNome() {
    alert('Edit nome');
  }

  allega() {
    alert('Allega');
  }

  addChildren() {
    alert('Add children');
  }

  addLink() {
    alert('Add link');
  }

  close() {
    alert('Close');
    this.closeModal.emit(true);
  }

  like() {
    alert('Like');
  }

  share() {
    alert('Share');
  }

  visibility() {
    alert('Visibility');
  }

  lock() {
    alert('Lock');
  }

  edit() {
    alert('Edit');
  }

}
