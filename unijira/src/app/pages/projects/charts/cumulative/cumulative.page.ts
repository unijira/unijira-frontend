import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SessionService} from '../../../../store/session.service';
import {ActivatedRoute} from '@angular/router';
import {Item} from '../../../../models/item/Item';
import {ItemStatus} from '../../../../models/item/ItemStatus';
import {Project} from '../../../../models/projects/Project';
import {Subscription} from 'rxjs';
import {isDarkColorTheme, unsubscribeAll} from '../../../../util';
import {TranslateService} from '@ngx-translate/core';
import {PageService} from '../../../../services/page.service';
import {ProjectService} from '../../../../services/project/project.service';
import {ItemStatusHistory} from '../../../../models/item/ItemStatusHistory';
import * as moment from 'moment';

@Component({
  selector: 'app-cumulative',
  templateUrl: './cumulative.page.html',
  styleUrls: ['./cumulative.page.scss'],
})
export class CumulativePage implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chartContainer') chartContainer: any;

  primaryXAxis: any;
  primaryYAxis: any;
  chartData: Map<string, any[]> = new Map<string, any[]>();
  tooltip: any;
  marker: any;
  margin: any;

  items: Item[] = [];
  history: ItemStatusHistory[];

  project: Project;
  projectSubscription: Subscription;

  translationsSubscriptions: Subscription[];
  startDateField: Date = null;
  endDateField: Date = null;
  noData: boolean = null;

  constructor(private sessionService: SessionService,
              private activatedRoute: ActivatedRoute,
              private projectService: ProjectService,
              private translateService: TranslateService,
              private pageService: PageService) {

    this.chartData.set(ItemStatus.open, []);
    this.chartData.set(ItemStatus.todo, []);
    this.chartData.set(ItemStatus.done, []);

    this.pageService.setTitle(['charts','charts.cumulative']);

    this.activatedRoute.params.subscribe(params => {

      this.sessionService.loadProject(params.id);

      this.projectSubscription = this.projectService.getProject(params.id).subscribe((p) => {

        this.project = p;

        if(p) {
          this.projectService.getItemsStatusHistoryByProject(p.id).subscribe((history) => {
            if(history === null) {
              this.history = [];
            } else {
              this.history = history;
              this.loadChartData();
            }
          });
        }

      });

    });
  }

  get background() {
    return isDarkColorTheme() ? '#1E1E1E' : '#FFFFFF'; // FIXME: esisterà un metodo migliore per ottenere i colori da ionic?
  }

  get openCharts() {
    return this.chartData.get(ItemStatus.open);
  }

  get todoCharts() {
    return this.chartData.get(ItemStatus.todo);
  }

  get doneCharts() {
    return this.chartData.get(ItemStatus.done);
  }

  get startDate(): Date {
    return moment(this.startDateField ?? new Date(), 'YYYY-MM-DD').toDate();
  }

  get endDate(): Date {
    return moment(this.endDateField ?? new Date(), 'YYYY-MM-DD').toDate();
  }

  get endDateMinusOne(): Date {
    if(this.endDate === null) {
      return moment(Date.now(), 'YYYY-MM-DD').add(10, 'years').toDate();
    }

    return moment(this.endDateField ?? new Date(), 'YYYY-MM-DD').subtract(1, 'days').toDate();
  }

  get startDatePlusOne(): Date {
    if(this.startDate === null) {
      return moment(Date.now(), 'YYYY-MM-DD').subtract(10, 'years').toDate();
    }

    return moment(this.startDateField ?? new Date(), 'YYYY-MM-DD').add(1, 'days').toDate();
  }

  loadChartData() {
    if (history === null || history.length === 0) {
      return;
    }

    this.chartData.set(ItemStatus.open, []);
    this.chartData.set(ItemStatus.todo, []);
    this.chartData.set(ItemStatus.done, []);

    const countMap: Map<string, number> = new Map<string, number>();
    countMap.set(ItemStatus.open, 0);
    countMap.set(ItemStatus.todo, 0);
    countMap.set(ItemStatus.done, 0);

    if (this.startDateField !== null &&
      this.endDateField !== null &&
      new Date(this.history[0].changeDate).getTime() >= new Date(this.startDateField).getTime() &&
      new Date(this.history[0].changeDate).getTime() <= new Date(this.endDateField).getTime()
    ) {
      this.chartData.get(ItemStatus.open).push({
        date: new Date(this.history[0].changeDate),
        points: countMap.get(ItemStatus.open)
      });
      this.chartData.get(ItemStatus.todo).push({
        date: new Date(this.history[0].changeDate),
        points: countMap.get(ItemStatus.todo)
      });
      this.chartData.get(ItemStatus.done).push({
        date: new Date(this.history[0].changeDate),
        points: countMap.get(ItemStatus.done)
      });
    }
    this.history.sort((a, b) => new Date(a.changeDate).getTime() - new Date(b.changeDate).getTime())
      .filter((item) => ((this.startDateField === null || new Date(item.changeDate).getTime() >= new Date(this.startDateField).getTime())
        && (this.endDateField === null || new Date(item.changeDate).getTime() <= new Date(this.endDateField).getTime())))
      .forEach((item) => {
        if (item.oldStatus !== null) {
          countMap.set(item.oldStatus, countMap.get(item.oldStatus) - 1);
          this.chartData.get(item.oldStatus).push({
            date: new Date(item.changeDate),
            points: countMap.get(item.oldStatus)
          });
        }
        countMap.set(item.newStatus, countMap.get(item.newStatus) + 1);
        this.chartData.get(item.newStatus).push({
          date: new Date(item.changeDate),
          points: countMap.get(item.newStatus)
        });
      });
    if (this.chartContainer !== undefined) {
      this.chartContainer.refresh();
    }
  }

  ngOnInit() {

    this.tooltip = {enable: true};
    this.marker = { visible: true, width: 10, height: 10 };
    this.margin = { left: 40, right: 40, top: 40, bottom: 40 };

    this.translationsSubscriptions = [
      this.translateService.stream('charts.date').subscribe((t: string) => {
        this.primaryXAxis = {
          valueType: 'DateTime',
          labelFormat: 'MMM-dd',
          title: t
        };

      }),
      this.translateService.stream('charts.cumulative.tickets').subscribe(t => {
        this.primaryYAxis = {
          labelFormat: '{value}',
          title: t
        };
        this.primaryYAxis.title = t;
      })
    ];

  }

  ngOnDestroy() {
    unsubscribeAll(
      this.projectSubscription,
      this.translationsSubscriptions[0],
      this.translationsSubscriptions[1]
    );
  }

  ngAfterViewInit() {

    setTimeout(() => {
      if(this.chartContainer !== undefined) {
        this.chartContainer.refresh();
      }
    }, 500);
  }

  changeDate(begin: boolean, value: string) {
    let dateVar: Date;
    if(value === null) {
      dateVar = moment(Date.now() ?? new Date(), 'YYYY-MM-DD').toDate();
    }
    else {
      dateVar = moment(value ?? new Date(), 'YYYY-MM-DD').toDate();
    }

    if(begin) {
      this.startDateField = dateVar;
    }
    else {
      this.endDateField = dateVar;
    }

    this.loadChartData();
  }

  resetDate() {
    if(this.startDateField !== null || this.endDateField !== null) {
      this.startDateField = null;
      this.endDateField = null;
      this.loadChartData();
    }
  }
}
