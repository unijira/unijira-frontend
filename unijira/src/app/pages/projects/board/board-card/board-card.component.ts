import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../models/Item';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent implements OnInit {

  @Input()
  itemsToShow: Item[] = [];

  constructor() { }

  ngOnInit() {}


}
