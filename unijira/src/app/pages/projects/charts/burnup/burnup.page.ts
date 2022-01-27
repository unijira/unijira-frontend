import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../../store/session.service';
import {ActivatedRoute} from '@angular/router';
import {Item} from '../../../../models/item/Item';
import {MeasureUnit} from '../../../../models/item/MeasureUnit';
import {ItemType} from '../../../../models/item/ItemType';
import {ItemStatus} from '../../../../models/item/ItemStatus';

@Component({
  selector: 'app-burnup',
  templateUrl: './burnup.page.html',
  styleUrls: ['./burnup.page.scss'],
})
export class BurnupPage implements OnInit {

  public primaryXAxis: any;
  public primaryYAxis: any;
  public chartData: any[] = [];

  items: Item[] = [];

  constructor(private sessionService: SessionService,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(params => this.sessionService.loadProject(params.id));

    this.items = [
      new Item(0, '', '', MeasureUnit.storyPoints, 10, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-01')),
      new Item(0, '', '', MeasureUnit.storyPoints, 7, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-05')),
      new Item(0, '', '', MeasureUnit.storyPoints, 4, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-03')),
      new Item(0, '', '', MeasureUnit.storyPoints, 10, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-07')),
    ];

    this.items = this.items.sort((a, b) => (a.doneOn > b.doneOn) ? 1 : ((b.doneOn > a.doneOn) ? -1 : 0));
    let sum = 0;
    this.items.forEach(i => {
      sum += i.evaluation;
      const data = { date: i.doneOn, points: sum}
      this.chartData.push(data);
    });
  }

  ngOnInit() {


    // this.chartData = [
    //   { x: new Date(2000, 6, 11), y: 10 }, { x: new Date(2002, 3, 7), y: 30 },
    //   { x: new Date(2004, 3, 6), y: 15 }, { x: new Date(2006, 3, 30), y: 65 },
    //   { x: new Date(2008, 3, 8), y: 90 }, { x: new Date(2010, 3, 8), y: 85 }
    // ];
    this.primaryXAxis = {
      valueType: 'DateTime',
      labelFormat: 'y-MMM-dd'
    };
    this.primaryYAxis = {
      valueType: 'Category'
    };
  }

}
