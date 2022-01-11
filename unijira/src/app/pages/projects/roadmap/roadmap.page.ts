/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable max-len */
/* eslint-disable one-var */
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

import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadCldr } from "@syncfusion/ej2-base";
import {
  ToolbarItem,
  EditSettingsModel,
  EditDialogFieldDirective,
} from '@syncfusion/ej2-angular-gantt';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { SessionService } from 'src/app/store/session.service';

import { TranslateService } from '@ngx-translate/core';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { ItemType } from 'src/app/models/item/ItemType';
import { ItemRoadmap } from 'src/app/models/item/ItemRoadmap';
import { Roadmap } from 'src/app/models/projects/Roadmap';
import { PageService } from 'src/app/services/page.service';
import { RoadmapService } from 'src/app/services/roadmap/roadmap.service';
declare var require: any;
  L10n.load({
        'it': {
          gantt: {
                  "id": "id",
                  "name": "Nome",
                  "startDate": "Data inizio",
                  "endDate": "Data fine",
                  "duration": "Durata",
                  "progress": "Progresso",
                  "dependency": "Dipendenza",
                  "notes": "Note",
                  "type": "Tipo",
                  "offset": "Compensare",
                  "resourceName": "Nome Risorsa",
                  "resourceID": "ID Risorsa",
                  "day": "giorno",
                  "hour": "ora",
                  "minute": "minuto",
                  "days": "giorni",
                  "hours": "ore",
                  "minutes": "minuti",
                  "generalTab": "Generale",
                  "customTab": "Colonne personalizzate",
                  "writeNotes": "Scrivi nota",
                  "addDialogTitle": "Nuovo titolo",
                  "editDialogTitle": "Modifica titolo",
                  "saveButton": "Salva",
                  "add": "Aggiungi",
                  "edit": "Modifica",
                  "update": "Aggiorna",
                  "delete": "Elimina",
                  "cancel": "Annulla",
                  "search": "Cerca",
                  "addTask": "Aggiungi Item",
                  "editTask": "Modifica Item",
                  "deleteTask": "Elimina Item",
                  "expandAllTasks": "Espandere tutto",
                  "collapseAll": "Comprimi tutto",
                  "expandAll": "Espandere tutto",
                  "emptyRecord": "Non ci sono record da visualizzare",
                  "confirmDelete": "Sei sicuro di voler eliminare questo item?"

          },
          datepicker: {
            today:"oggi"
          }
        }
      });
@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.page.html',
  styleUrls: ['./roadmap.page.scss'],
})
export class RoadmapPage {
  @ViewChild('adddialog', { static: true }) adddialog: DialogComponent;
  // Data for Gantt
  public data: any[] = [];
  private itemTypeEnum= ItemType;
  public dataDropDown: string[] = []; //DataDropDown
  public dataFathersDropDown: any[] = []; //DataDropDownFathers
  public enabled = false; //To show the Father select on the add item dialog
  private dataTmp: any[] = [];
  private subtasksTmp: any[] = [];
  private subTasksEpic: any[]=[];
  private subtasksTmpStory: any[]= [];
  public taskSettings: object;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItem[];
  public editDialogFields: EditDialogFieldDirective;
  public columns: object[];
  public sortSettings: object;
  public visible: Boolean = false;
  public splitterSettings: object;
  public epicItem = '';
  public alert = false;
  public itemAdded= false;
  public todayDate: Date= new Date();
  public minStartDate: object= new Date(this.todayDate);
  public minEndDate: object= new Date(this.todayDate);
  public Status = 'Open';
  public projectId: number;
  public backlogId: number;
  public roadmapId: number;
  public startingDate: Date= new Date();
  public endingDate: Date= new Date();
  public returnedItem: ItemRoadmap=new ItemRoadmap(null,'','','',null,'',null,null,null,null,);
  public itemRoadmap: ItemRoadmap= new ItemRoadmap(null,'','','',null,'',null,null,null,null,);
  public roadmap: Roadmap = new Roadmap(null,null,null,null);
  public animationSettingsDialog: Object = {
    effect: 'Zoom',
    duration: 400,
    delay: 0,
  };

  //End  Data for Gantt
  constructor(
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private roadmapService: RoadmapService,
    private pageService: PageService

  ) {    this.pageService.setTitle('Roadmap');

    this.activatedRoute.params.subscribe((params) =>{
      this.sessionService.loadProject(params['id']);
      this.projectId=params['id'];
    });
    if(translateService.currentLang === 'it'){
    setCulture('it');
      loadCldr(
        require("cldr-data/main/it/numbers.json"),
        require("cldr-data/main/it/ca-gregorian.json"),
        require("cldr-data/main/it/timeZoneNames.json"),
      );
    }
    this.translateService.onLangChange.subscribe(()=>{
    if(translateService.currentLang === 'it'){
      setCulture('it');
      loadCldr(
        require("cldr-data/main/it/numbers.json"),
        require("cldr-data/main/it/ca-gregorian.json"),
        require("cldr-data/main/it/timeZoneNames.json"),
      );
    }
    else {
      setCulture('en');

    }
  });
}
  public ngOnInit(): void {
      this.roadmapService.getBacklog(this.projectId).subscribe(backlog =>{
          this.backlogId=backlog[0].id;
      });
      setTimeout(()=> {
        this.roadmapService.getRoadmap(this.projectId,this.backlogId).subscribe( roadmap => {
          this.roadmapId= roadmap[0].id;
        });
      }, 200);
     this.initGantt();
  }

  public initGantt(){
    // Init taskSetting
    this.taskSettings = {
      id: 'TaskID',
      itemType: 'ItemType',
      name: 'TaskName',
      status: 'Status',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
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
      position: '30%',
    };
    this.sortSettings = {
      columns: [{ field: 'TaskID', direction: 'Ascending' }],
    };
  }
  // Click add Button function
  public addokButton: EmitType<object> = () => {
    this.alert = false;
    this.itemAdded = false;
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
      this.startingDate= taskStartDate.value.toISOString().split('T')[0];
      this.endingDate=taskEndDate.value.toISOString().split('T')[0];
      this.itemRoadmap.description= tasknameObj.value;
      this.itemRoadmap.summary= tasknameObj.value ;
      this.itemRoadmap.type= itemType.value;
      this.roadmap.startingDate= this.startingDate;
      this.roadmap.endingDate= this.endingDate;
      this.roadmap.roadmapId= this.roadmapId;
      this.addItem(this.itemRoadmap);
      setTimeout(()=> {
      this.roadmap.item=this.returnedItem;
      this.addItemRoadmap(this.projectId,this.backlogId,this.roadmapId,this.roadmap);
      }, 600);
      if (itemType.value === this.itemTypeEnum.epic) {
        record = {
          TaskName: tasknameObj.value,
          Status: this.Status,
          TaskID: currentId,
          StartDate: taskStartDate.value,
          EndDate: taskEndDate.value,
          ItemType: itemType.value,
        };
        this.data = this.data.concat(record);
        this.adddialog.hide();
        // else add like subtask
      } else {
        this.subtasksTmp = [];
        this.subtasksTmpStory=[];
        this.dataTmp = [];
        var index = 0;
        let recordFather: object = {};
        var father = (document.getElementById('father') as any)
          .ej2_instances[0];
        if (father.value === null) {
          this.alert=true;
          this.openDialogAlert();
        } else {
          // If father is epic
          if(father.value.split(' - ')[1] === this.itemTypeEnum.epic){
            var i =0;
          for( i=0; i< this.data.length; i++) {
            if (this.data[i].TaskName === father.value.split(' - ')[0]) {
              //task has a subtasks already
              if (this.data[i].subtasks !== undefined) {
                this.subtasksTmp = this.data[i].subtasks;
                recordFather = {
                  TaskName: this.data[i].TaskName,
                  TaskID: this.data[i].TaskID,
                  StartDate: this.data[i].StartDate,
                  Status: this.data[i].Status,
                  EndDate: this.data[i].EndDate,
                  ItemType: this.data[i].ItemType,
                  subtasks: this.subtasksTmp.concat({
                    TaskName: tasknameObj.value,
                    TaskID: currentId,
                    Status: this.Status,
                    StartDate: taskStartDate.value,
                    EndDate: taskEndDate.value,
                    ItemType: itemType.value,
                  }),
                };
                //No subtasks
              } else {
                recordFather = {
                  TaskName: this.data[i].TaskName,
                  TaskID: this.data[i].TaskID,
                  Status: this.data[i].Status,
                  StartDate: this.data[i].StartDate,
                  EndDate: this.data[i].EndDate,
                  ItemType: this.data[i].ItemType,
                  subtasks: [
                    {
                      TaskName: tasknameObj.value,
                      TaskID: currentId,
                      StartDate: taskStartDate.value,
                      Status: this.Status,
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
              break;
            }

            index = index + 1;
          }
          father.value = null;
        }
        else if(this.itemTypeEnum.story === father.value.split(' - ')[1])
          {
            if(itemType.value === this.itemTypeEnum.story){
              this.alert=true;
              this.openDialogAlertEqualTypeAndFather();
            }
            else {
              i=0;
              var j=0;
              for( i=0; i< this.data.length; i++){
                if(this.itemAdded){
                  break;
                }
              index=0;
              this.subTasksEpic=this.data[i].subtasks;
                for( j=0; j< this.subTasksEpic.length; j++){
                if (this.subTasksEpic[j].TaskName === father.value.split(' - ')[0]) {
                  if (this.subTasksEpic[j].subtasks !== undefined) {
                    this.subtasksTmpStory = this.subTasksEpic[j].subtasks;
                    recordFather = {
                      TaskName: this.subTasksEpic[j].TaskName,
                      TaskID: this.subTasksEpic[j].TaskID,
                      StartDate: this.subTasksEpic[j].StartDate,
                      Status: this.subTasksEpic[j].Status,
                      EndDate: this.subTasksEpic[j].EndDate,
                      ItemType: this.subTasksEpic[j].ItemType,
                      subtasks: this.subtasksTmpStory.concat({
                        TaskName: tasknameObj.value,
                        TaskID: currentId,
                        StartDate: taskStartDate.value,
                        EndDate: taskEndDate.value,
                        ItemType: itemType.value,
                      }),
                    };
                  }
                  else {
                    recordFather = {
                      TaskName: this.subTasksEpic[j].TaskName,
                      TaskID: this.subTasksEpic[j].TaskID,
                      StartDate: this.subTasksEpic[j].StartDate,
                      Status: this.subTasksEpic[j].Status,
                      EndDate: this.subTasksEpic[j].EndDate,
                      ItemType: this.subTasksEpic[j].ItemType,
                      subtasks: [
                        {
                          TaskName: tasknameObj.value,
                          TaskID: currentId,
                          StartDate: taskStartDate.value,
                          Status: this.Status,
                          EndDate: taskEndDate.value,
                          ItemType: itemType.value,
                        },
                      ]
                    };
                  }
                  delete this.data[i].subtasks[index];
                  this.data[i].subtasks = this.data[i].subtasks.concat(recordFather);
                  this.data[i].subtasks.forEach((item) => {
                  if (item.TaskID > 0) {
                    this.dataTmp = this.dataTmp.concat(item);
                  }
                });
                this.data[i].subtasks = this.dataTmp;
                this.dataTmp=[];
                this.data.forEach((item)=>{
                  this.dataTmp=this.dataTmp.concat(item);
                });
                this.data=this.dataTmp;
                this.itemAdded=true;
                }
                index=index+1;
                if(this.itemAdded){
                  break;
                }
               }

            }
          }
        }

      }
    }
      if (this.alert === false) {
        if(itemType.value === this.itemTypeEnum.epic || itemType.value=== this.itemTypeEnum.story){
          this.dataFathersDropDown=this.dataFathersDropDown.concat(tasknameObj.value+" - "+itemType.value);
        }
        tasknameObj.value = '';
        taskEndDate.value = null;
        taskStartDate.value = null;
        itemType.value = null;
        if(father !== undefined){
        father.value = null;
      }
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
        this.dataDropDown = [this.itemTypeEnum.epic];
      } else {
        this.dataDropDown = [this.itemTypeEnum.epic, this.itemTypeEnum.story, this.itemTypeEnum.task, this.itemTypeEnum.issue];
      }
    }
  }
  onLoad(args: any) {

  }
  queryTaskbarInfo(args: any) {
 if (args.data.ItemType === this.itemTypeEnum.epic) {
      args.taskbarBgColor = '#904ee2';
    } else if (args.data.ItemType === this.itemTypeEnum.story) {
      args.taskbarBgColor = '#63ba3c';
    } else if (args.data.ItemType === this.itemTypeEnum.task) {
      args.taskbarBgColor = '#00bfff';
    }
    else {
      args.taskbarBgColor = '#e5493a';
    }
  }
  actionBegin(args: any) {
  }
  showFathersDropDown(args: any) {
    if (args.itemData !== null && args.itemData.value !== this.itemTypeEnum.epic) {
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
public openDialogAlertEqualTypeAndFather = function(): void {
    DialogUtility.alert({
      title: 'Attention!',
      showCloseIcon: true,
      content: 'Item type and father can\'t be equal',
      closeOnEscape: true,
      animationSettings: { effect: 'Zoom' },
    });
  };
  export() {

    /**let csv = '';
    csv += Object.keys(this.tickets[0]).join(';') + '\n';
    csv += Object.values(this.filteredTickets).map(ticket => Object.values(ticket).join(';')).join('\n');

    const blob = new Blob([csv], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'tickets.csv');
    a.click();
    */

  }
  CreaItem(){
    this.adddialog.show();
     this.enabled=false;
      if (this.dataDropDown.length === 0) {
        this.dataDropDown = [this.itemTypeEnum.epic];
      } else {
        this.dataDropDown = [this.itemTypeEnum.epic, this.itemTypeEnum.story, this.itemTypeEnum.task, this.itemTypeEnum.issue];
      }
  }
  addItem(item: ItemRoadmap)
  {
    this.roadmapService.addItem(item).subscribe(data => {
      this.returnedItem=data;
    });
  }
  addItemRoadmap(idProject: number, idBacklog: number, idRoadmap: number, roadmap: Roadmap ){
    this.roadmapService.addItemToRoadmap(idProject,idBacklog,idRoadmap,roadmap).subscribe(data => {
      console.log(data);
    });
  }
}
