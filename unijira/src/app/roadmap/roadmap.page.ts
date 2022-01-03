/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-debugger */
/* eslint-disable radix */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ToolbarItem,
  EditSettingsModel,
  EditDialogFieldDirective,
  GanttComponent,
} from '@syncfusion/ej2-angular-gantt';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { SessionService } from '../store/session.service';
import { DialogUtility } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.page.html',
  styleUrls: ['./roadmap.page.scss'],
})
export class RoadmapPage {
  @ViewChild('gantt', { static: true }) gantt: GanttComponent;
  @ViewChild('taskname', { static: true }) taskname: TextBoxComponent;
  @ViewChild('editdialog', { static: true }) editdialog: DialogComponent;
  @ViewChild('adddialog', { static: true }) adddialog: DialogComponent;
  constructor(
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) =>
      this.sessionService.loadProject(params['id'])
    );
  }

  // Data for Gantt
  public data: any[] = [];
  public enabled = false; //To show the Father select on the add item dialog
  public dataTmp: any[] = [];
  public subtasksTmp: any[] = [];
  public taskSettings: object;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItem[];
  public editDialogFields: EditDialogFieldDirective;
  public rowData: any;
  public columns: object[];
  public sortSettings: object;
  public visible: Boolean = false;
  public splitterSettings: object;
  public epicItem = '';
  public alert = false;
  public animationSettingsDialog: Object = {
    effect: 'Zoom',
    duration: 400,
    delay: 0,
  };

  //End  Data for Gantt
  public dataDropDown: string[] = []; //DataDropDown
  public dataFathersDropDown: any[] = [];

  public ngOnInit(): void {
    // Init columns
    this.columns = [
      { field: 'TaskID', headerText: ' ID', width: 100 },
      {
        field: 'ItemType',
        headerText: ' Type',
        editType: 'stringedit',
        mappingName: 'itemType',
        width: 120,
      },
      { field: 'TaskName', headerText: ' Name', width: 250 },
      { field: 'StartDate', headerText: 'Start Date' },
      { field: 'EndDate', headerText: 'End Date' },
      { field: 'Duration', headerText: 'Duration' },
    ];
    // Init taskSetting
    this.taskSettings = {
      id: 'TaskID',
      itemType: 'ItemType',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      dependency: '',
      child: 'subtasks',
      mode: 'Dialog',
    };
    // Init editing
    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      allowTaskbarEditing: true,
      showDeleteConfirmDialog: true,

    };
    //Iinit toolbar
    this.toolbar = ['Add', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
    this.splitterSettings = {
      position: '27.5%',
    };
    this.sortSettings = {
      columns: [{ field: 'TaskID', direction: 'Ascending' }],
    };
  }

  // Click add Button function
  public addokButton: EmitType<object> = () => {
    this.alert = false;
    // Get all param
    var tasknameObj = (document.getElementById('taskName') as any)
      .ej2_instances[0];
    let obj: any = (document.getElementById('ganttDefault') as any)
      .ej2_instances[0];
    var taskStartDate: any = (document.getElementById('startDate') as any)
      .ej2_instances[0];
    var taskEndDate: any = (document.getElementById('endDate') as any)
      .ej2_instances[0];
    var itemType = (document.getElementById('itemType') as any)
      .ej2_instances[0];
    let currentId: any = (parseInt(obj.ids[obj.ids.length - 1]) + 1).toString();
    if (currentId === 'NaN') {
      currentId = 1;
    }
    console.log(taskEndDate.value, tasknameObj.value);
    if (
      taskStartDate.value === null ||
      tasknameObj.value === null ||
      taskEndDate.value === null ||
      itemType.value === null
    ) {
      this.alert = true;
      this.openDialogAlert();
    }
    let record: object = {};
    // If epic add like father
    if (this.alert === false) {
      if (itemType.value === 'epic') {

        this.dataFathersDropDown=this.dataFathersDropDown.concat(tasknameObj.value);
        console.log(this.dataFathersDropDown);
        record = {
          TaskName: tasknameObj.value,
          TaskID: currentId,
          StartDate: taskStartDate.value,
          EndDate: taskEndDate.value,
          ItemType: itemType.value,
        };
        this.data = this.data.concat(record);
        // else add like subtask
      } else {
        this.subtasksTmp = [];
        this.dataTmp = [];
        var index = 0;
        var father = (document.getElementById('father') as any)
          .ej2_instances[0];
        if (father.value === null) {
          this.alert=true;
          this.openDialogAlert();
        } else {
          let recordFather: object = {};
          this.data.find((obje) => {
            if (obje.TaskName === father.value) {
              //task has a subtasks already
              if (obje.subtasks !== undefined) {
                this.subtasksTmp = obje.subtasks;
                recordFather = {
                  TaskName: obje.TaskName,
                  TaskID: obje.TaskID,
                  StartDate: obje.StartDate,
                  EndDate: obje.EndDate,
                  ItemType: obje.ItemType,
                  subtasks: this.subtasksTmp.concat({
                    TaskName: tasknameObj.value,
                    TaskID: currentId,
                    StartDate: taskStartDate.value,
                    EndDate: taskEndDate.value,
                    ItemType: itemType.value,
                  }),
                };
                //No subtasks
              } else {
                recordFather = {
                  TaskName: obje.TaskName,
                  TaskID: obje.TaskID,
                  StartDate: obje.StartDate,
                  EndDate: obje.EndDate,
                  ItemType: obje.ItemType,
                  subtasks: [
                    {
                      TaskName: tasknameObj.value,
                      TaskID: currentId,
                      StartDate: taskStartDate.value,
                      EndDate: taskEndDate.value,
                      ItemType: itemType.value,
                    },
                  ],
                };
              }
              //add the new task into data
              delete this.data[index];
              this.data = this.data.concat(recordFather);
              this.data.forEach((item) => {
                if (item.TaskID > 0) {
                  this.dataTmp = this.dataTmp.concat(item);
                }
              });
              this.data = this.dataTmp;
              console.log(this.data);
            }

            index = index + 1;
          });
          father.value = null;
        }
      }
      if (this.alert === false) {
        tasknameObj.value = '';
        taskEndDate.value = null;
        taskStartDate.value = null;
        itemType.value = null;
        this.adddialog.hide();
        this.sortSettings = {
          columns: [{ field: 'TaskID', direction: 'Ascending' }],
        };
      }
    }
  };
  //cancel button
  public addcancelButton: EmitType<object> = () => {
    this.adddialog.hide();
  };
  // declere the ok and cancel buttons for the add dialog
  public button: Object = [
    {
      click: this.addokButton.bind(this),
      buttonModel: {
        content: 'OK',
        isPrimary: true,
      },
    },
    {
      click: this.addcancelButton.bind(this),
      buttonModel: {
        content: 'Cancel',
      },
    },
  ];

  public onActionComplete(args: any): void {
    if (args.action === 'add' && args.requestType === 'add') {
      console.log(args.data.taskData);
    }
  }

  public renderDialog(data) {
    this.editdialog.show();
    var tasknameObj = document.getElementById('taskname') as any;
    tasknameObj.value = data.TaskName;
  }
  public renderAddDialog() {
    this.adddialog.show();
  }
  public toolbarClick(args: any) {
    if (args.item.properties.id === 'ganttDefault_add') {
      args.cancel = true;
      this.adddialog.show();
      this.enabled=false;
      if (this.dataDropDown.length === 0) {
        this.dataDropDown = ['epic'];
      } else {
        this.dataDropDown = ['epic', 'story', 'task', 'issue'];
      }
    }
  }
  onLoad(args: any) {
    console.log(args);
  }
  queryTaskbarInfo(args: any) {
    if (args.data.ItemType === 'epic') {
      args.taskbarBgColor = 'grey';
    } else if (args.data.ItemType === 'task') {
      args.taskbarBgColor = 'yellow';
    } else if (args.data.ItemType === 'issue') {
      args.taskbarBgColor = 'red';
    }
  }
  actionBegin(args: any) {
    console.log(args);
  }
  showFathersDropDown(args: any) {
    if (args.itemData.value !== 'epic') {
      this.enabled = true;
    } else {
      this.enabled = false;
    }
  }
  // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
  public openDialogAlert = function(): void {
    DialogUtility.alert({
      title: 'Attention!',
      showCloseIcon: true,
      content: 'Insert all requirements',
      closeOnEscape: true,
      animationSettings: { effect: 'Zoom' },
    });
  };
}
