import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Item} from "../../../../models/item/Item";
import {Sprint} from "../../../../models/Sprint";
import {Project} from "../../../../models/projects/Project";
import {Subscription} from "rxjs";
import {Backlog} from "../../../../models/Backlog";
import {FormControl} from "@angular/forms";
import {SessionService} from "../../../../store/session.service";
import {ActivatedRoute} from "@angular/router";
import {BacklogAPIService} from "../../../../services/backlog-api.service";
import {TranslateService} from "@ngx-translate/core";
import {ItemStatus} from "../../../../models/item/ItemStatus";
import {MeasureUnit} from "../../../../models/item/MeasureUnit";
import {unsubscribeAll} from "../../../../util";
import {SprintStatus} from "../../../../models/SprintStatus";
import {ItemType} from "../../../../models/item/ItemType";

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.page.html',
  styleUrls: ['./burndown.page.scss'],
})
export class BurndownPage implements OnInit, OnDestroy, AfterViewInit {

  primaryXAxis: any;
  primaryYAxis: any;
  chartData: any[] = [];
  startEndChartData: any[] = [];
  tooltip: any;
  marker: any;

  items: Item[] = [];
  sprints: Sprint[] = [];
  selectedSprint: Sprint;

  project: Project;
  projectSubscription: Subscription;
  backlog: Backlog;

  sprintSelectedFC: FormControl = new FormControl('');
  selectionSubscription: Subscription;
  translationsSubscriptions: Subscription[];

  measureUnitKey = 'charts.workingHours';

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
                  this.backlogService.getSprintInsertions(p.id, b.id, this.sprints[0].id).subscribe(ins => {
                    let items = [];
                    ins.forEach(i => items.push(i.item && i.item.status == ItemStatus.done));
                    this.itemsToChartData(items);
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

    this.sprints.push(
      new Sprint(0, new Date('2019-12-28'), new Date('2020-01-30'), null, 0, SprintStatus.inactive),
      new Sprint(0, new Date('2019-12-12'), new Date('2020-01-12'), null, 0, SprintStatus.inactive),
    );
    this.selectedSprint = this.sprints[0];

    const items = [
      new Item(0, '', '', MeasureUnit.storyPoints, 10, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-01')),
      new Item(0, '', '', MeasureUnit.storyPoints, 7, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-05')),
      new Item(0, '', '', MeasureUnit.storyPoints, 4, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-05')),
      new Item(0, '', '', MeasureUnit.storyPoints, 10, '', ItemType.task, ItemStatus.done, null, 1, 0, null, null, null, new Date('2020-01-07')),
    ];
    this.itemsToChartData(items)



    this.selectionSubscription = this.sprintSelectedFC.statusChanges.subscribe(() => {
      if (this.project && this.backlog && this.sprints.length > 0) {
        this.selectedSprint = this.sprints[this.sprintSelectedFC.value];
        this.backlogService.getSprintInsertions(this.project.id, this.backlog.id,
          this.sprints[this.sprintSelectedFC.value].id).subscribe(ins => {
          let items = [];
          ins.forEach(i => items.push(i.item && i.item.status == ItemStatus.done));
          this.itemsToChartData(items);
        });
      }
    });
  }

  ngOnInit() {

    this.tooltip = {enable: true};
    this.marker = { visible: true, width: 10, height: 10 };

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
  }

  itemsToChartData(items) {
    if (items.length > 0 && this.selectedSprint) {
      items.sort((a, b) => (a.doneOn > b.doneOn) ? 1 : ((b.doneOn > a.doneOn) ? -1 : 0));
      let sum = items.map(item => item.evaluation).reduce((a, b) => a + b);
      const map = new Map();
      items.forEach(i => {
        sum -= i.evaluation;
        map.set(i.doneOn.toDateString(), sum)
      });

      this.chartData.push({date: this.selectedSprint.startingDate,
        points: items.map(item => item.evaluation).reduce((a, b) => a + b)});
      map.forEach((v, k, m) => {
        this.chartData.push({date: new Date(k), points: v});
      });

      this.startEndChartData = [
        {date: this.selectedSprint.startingDate, points: items.map(item => item.evaluation).reduce((a, b) => a + b)},
        {date: this.selectedSprint.endingDate, points: 0}
      ];
    }
  }

}
