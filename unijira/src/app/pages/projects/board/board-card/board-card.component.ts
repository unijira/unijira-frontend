import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../models/item/Item';
import {ItemType} from "../../../../models/item/ItemType";

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent implements OnInit {

  @Input()
  itemsToShow: Item[] = [];

  @Input()
  searchedText: string = '';

  itemType = ItemType;


  constructor() { }

  ngOnInit() {}


}
