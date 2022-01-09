import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/item/Item';

@Component({
  selector: 'app-singoloitem',
  templateUrl: './singoloitem.page.html',
  styleUrls: ['./singoloitem.page.scss'],
})
export class SingoloitemPage implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

}
