import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SessionService} from '../../../../store/session.service';
import {ActivatedRoute} from '@angular/router';
import {Item} from '../../../../models/item/Item';
import {MeasureUnit} from '../../../../models/item/MeasureUnit';
import {ItemStatus} from '../../../../models/item/ItemStatus';
import {BacklogAPIService} from '../../../../services/backlog-api.service';
import {Sprint} from '../../../../models/Sprint';
import {Project} from '../../../../models/projects/Project';
import {Subscription} from 'rxjs';
import {isDarkColorTheme, unsubscribeAll} from '../../../../util';
import {FormControl} from '@angular/forms';
import {Backlog} from '../../../../models/Backlog';
import {TranslateService} from '@ngx-translate/core';
import {ItemType} from '../../../../models/item/ItemType';
import {SprintStatus} from '../../../../models/SprintStatus';
import {DateUtils} from "../../../../classes/date-utils";

@Component({
  selector: 'app-burnup',
  templateUrl: './burnup.page.html',
  styleUrls: ['./burnup.page.scss'],
})
export class BurnupPage implements OnInit, OnDestroy, AfterViewInit {

  primaryXAxis: any;
  primaryYAxis: any;
  chartData: any[] = [];
  startEndChartData: any[] = [];
  tooltip: any;
  marker: any;

  items: Item[] = [];
  sprints: Sprint[] = [];
  selectedSprint: Sprint;
  margin: any;

  project: Project;
  projectSubscription: Subscription;
  backlog: Backlog;

  sprintSelectedFC: FormControl = new FormControl('');
  selectionSubscription: Subscription;
  translationsSubscriptions: Subscription[];

  measureUnitKey = 'charts.workingHours';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('chartContainer') chartContainer: any;

  constructor(private sessionService: SessionService,
              private activatedRoute: ActivatedRoute,
              private backlogService: BacklogAPIService,
              private translateService: TranslateService) {

    this.activatedRoute.params.subscribe(params => this.sessionService.loadProject(params.id));
    this.projectSubscription = this.sessionService.getProject().subscribe(p => {

      this.project = p;
      if (p) {
        this.backlogService.getFirstBacklog(this.project.id).subscribe(b => {
          if (b) {
            this.backlog = b;
            this.backlogService.getSprintList(p.id, b.id).subscribe(s =>{
              if (s) {
                this.sprints = s.filter(i => i.startingDate && i.endingDate);
                if (this.sprints.length > 0) {
                  this.backlogService.getSprintInsertions(p.id, b.id, s[0].id).subscribe(ins => {
                    const itemsDone = [];
                    const allItems = [];
                    ins.forEach(i =>{
                      if (i.item && i.item.status === ItemStatus.done) {
                        itemsDone.push(i.item);
                      }
                      if (i.item && i.item.evaluation) {
                        allItems.push(i.item);
                      }
                    });
                    this.itemsToChartData(itemsDone, allItems);
                    console.log(itemsDone);
                    console.log(allItems);
                    this.sprintSelectedFC.setValue(0);
                    this.selectedSprint = this.sprints[0];

                    if (ins[0]) {
                      switch (ins[0].item.measureUnit) {
                        case MeasureUnit.storyPoints:
                          this.measureUnitKey = 'charts.storyPoints';
                          break;
                        case MeasureUnit.workingDays:
                          this.measureUnitKey = 'charts.workingDays';
                          break;
                        case MeasureUnit.workingHours:
                          this.measureUnitKey = 'charts.workingHours';
                          break;
                      }
                    }

                  });
                } else {
                  this.sprintSelectedFC.disable();

                }
              }
            });
          }

        });
      }
    });

    // this.sprints.push(
    //   new Sprint(0, new Date('2019-12-28'), new Date('2020-01-30'), null, 0, SprintStatus.inactive),
    //   new Sprint(0, new Date('2019-12-12'), new Date('2020-01-12'), null, 0, SprintStatus.inactive),
    // );
    // this.selectedSprint = this.sprints[0];
    //
    // const items = [
    //   new Item(0, '', '', MeasureUnit.storyPoints, 10, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-01')),
    //   new Item(0, '', '', MeasureUnit.storyPoints, 7, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-05')),
    //   new Item(0, '', '', MeasureUnit.storyPoints, 4, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-05')),
    //   new Item(0, '', '', MeasureUnit.storyPoints, 10, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-07')),
    // ];
    //
    // const allitems = [
    //   new Item(0, '', '', MeasureUnit.storyPoints, 10, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-01')),
    //   new Item(0, '', '', MeasureUnit.storyPoints, 7, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-05')),
    //   new Item(0, '', '', MeasureUnit.storyPoints, 4, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-05')),
    //   new Item(0, '', '', MeasureUnit.storyPoints, 10, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-07')),
    //   new Item(0, '', '', MeasureUnit.storyPoints, 10, '', ItemType.task, ItemStatus.todo, null, 1, 0, null, null, null, null),
    //   new Item(0, '', '', MeasureUnit.storyPoints, 10, '', ItemType.task, ItemStatus.todo, null, 1, 0, null, null, null, null),
    // ];
    // this.itemsToChartData(items, allitems);


    this.selectionSubscription = this.sprintSelectedFC.statusChanges.subscribe(() => {
      if (this.project && this.backlog && this.sprints.length > 0) {
        this.selectedSprint = this.sprints[this.sprintSelectedFC.value];
        this.backlogService.getSprintInsertions(this.project.id, this.backlog.id,
          this.sprints[this.sprintSelectedFC.value].id).subscribe(ins => {
          const itemsDone = [];
          const allItems = [];
          ins.forEach(i =>{
            if (i.item && i.item.status === ItemStatus.done) {
              itemsDone.push(i.item);
            }
            if (i.item && i.item.evaluation)
              {allItems.push(i.item);}
          });
          this.itemsToChartData(itemsDone, allItems);
        });
      }
    });
  }


  get background() {
    return isDarkColorTheme() ? '#1E1E1E' : '#FFFFFF'; // FIXME: esisterà un metodo migliore per ottenere i colori da ionic?
  }

  ngOnInit() {

    this.tooltip = {enable: true};
    this.marker = { visible: true, width: 10, height: 10 };
    this.margin = { left: 40, right: 40, top: 40, bottom: 40 };

    this.translationsSubscriptions = [
      this.translateService.get(this.measureUnitKey).subscribe(t => {
        this.primaryYAxis = {
          labelFormat: '{value}',
          title: t
        };
      }),

      this.translateService.get('charts.date').subscribe(t => {
        this.primaryXAxis = {
          valueType: 'DateTime',
          labelFormat: 'MMM-dd',
          title: t
        };
      })

    ];


  }

  ngOnDestroy() {
    unsubscribeAll(this.projectSubscription,
      this.selectionSubscription,
      this.translationsSubscriptions[0],
      this.translationsSubscriptions[1]);
  }

  ngAfterViewInit() {
    this.sprintSelectedFC.updateValueAndValidity();
    setTimeout(() => {
      if(this.chartContainer !== undefined) {
        this.chartContainer.refresh();
      }
    }, 500)
  }

  itemsToChartData(itemsDone, allItems) {
    this.chartData = [];
    if (itemsDone.length > 0 && this.selectedSprint) {
      console.log(itemsDone);
      console.log(allItems);
      itemsDone.sort((a, b) => (a.doneOn > b.doneOn) ? 1 : ((b.doneOn > a.doneOn) ? -1 : 0));
      let sum = 0;
      const map = new Map();
      itemsDone.forEach(i => {
        sum += i.evaluation;
        map.set(DateUtils.toLocalDate(i.doneOn), sum);
      });

      this.chartData.push({date: this.selectedSprint.startingDate, points: 0});
      map.forEach((v, k) => {
        if (! (new Date(this.selectedSprint.startingDate) > new Date(k))) {
          this.chartData.push({date: k, points: v});
        }
      });

      console.log(this.chartData);

      this.startEndChartData = [
        {date: this.selectedSprint.startingDate, points: 0},
        {date: this.selectedSprint.endingDate, points: allItems.map(item => item.evaluation).reduce((a, b) => a + b)}
      ];
    }
  }

}
