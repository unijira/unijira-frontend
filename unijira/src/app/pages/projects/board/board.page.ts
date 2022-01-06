import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../store/session.service';
import {ProjectService} from '../../../services/common/project.service';
import {UsersService} from '../../../services/common/users.service';
import {ActivatedRoute} from '@angular/router';
import {Sprint} from '../../../models/Sprint';
import {SprintInsertion} from '../../../models/SprintInsertion';
import {Item, ItemStatus, ItemType} from '../../../models/Item';
import {UserInfo} from '../../../models/users/UserInfo';
import {Subscription} from 'rxjs';
import {Project} from '../../../models/projects/Project';
import {ItemAssignment} from "../../../models/ItemAssignment";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {cloneDeep} from "lodash";

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {

  sprint: Sprint;
  projectSubscription: Subscription;
  project: Project;
  tags: string[] = [];
  types: string[] = [];
  epics: Item[] = [];

  stories: Item[] = [];
  storiesToShow: Item[] = [];

  toDoItems: Item[] = [];
  toDoItemsToShow: Item[] = [];

  openedItems: Item[] = [];
  openedItemsToShow: Item[] = [];

  doneItems: Item[] = [];
  doneItemsToShow: Item[] = [];

  tagsCheckedFC: FormControl = new FormControl([]);
  typesCheckedFC: FormControl = new FormControl([]);
  epicCheckedFC: FormControl = new FormControl([]);
  searchFC: FormControl = new FormControl('');

  formGroup: FormGroup = new FormGroup({
    tags: this.tagsCheckedFC,
    types: this.typesCheckedFC,
    search: this.searchFC,
    epic: this.epicCheckedFC
  })


  constructor(
    private sessionService: SessionService,
    private projectService: ProjectService,
    private userService: UsersService,
    private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(params => this.sessionService.loadProject(params.id));

    this.projectSubscription = this.sessionService.getProject().subscribe((p) => {

      this.project = p;

    });

    const insertion = [
      new SprintInsertion(0, 1, new Item(0, '', 'item 0', '', 1,
        'backend', 'task', ItemStatus.OPEN,
        new UserInfo(0, 'user0', new URL("https://redcapes.it/wp-content/uploads/2020/03/giorno-giovanna-vento-aureo-trasferisce-17esimo-secolo-cosplay-v4-426434.jpg"), true, false, '', ''),
        null, null, null)),
      new SprintInsertion(1, 1, new Item(1, '',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan ipsum nec volutpat imperdiet. Nam felis nunc, tempus non dignissim.', '', 1,
        'frontend', 'story', ItemStatus.OPEN,
        new UserInfo(0, 'user0', new URL("https://redcapes.it/wp-content/uploads/2020/03/giorno-giovanna-vento-aureo-trasferisce-17esimo-secolo-cosplay-v4-426434.jpg"), true, false, '', ''),
        new Item(9, '', 'FATHER', '', 1, '', 'epic', ItemStatus.OPEN, null, null, null, null), null, [new ItemAssignment(0, null,
          new UserInfo(0, 'user0', new URL("https://redcapes.it/wp-content/uploads/2020/03/giorno-giovanna-vento-aureo-trasferisce-17esimo-secolo-cosplay-v4-426434.jpg"),true, false, '', ''),),
          new ItemAssignment(0, null,
            new UserInfo(0, 'user0', new URL("https://redcapes.it/wp-content/uploads/2020/03/giorno-giovanna-vento-aureo-trasferisce-17esimo-secolo-cosplay-v4-426434.jpg"),true, false, '', ''),)])),
    ];

    this.sprint = new Sprint(0, new Date('2021-02-01'), new Date('2021-03-01'), insertion, 0);

    this.formGroup.statusChanges.subscribe(() => {
      this.filterItems();
    });


  }

  ngOnInit() {
    this.sprint.insertions.forEach(ins => {
      const splitted = ins.item.tags.split(';');
      this.tags = this.tags.concat(splitted);
      this.types.push(ins.item.type);
      if (ins.item.type === ItemType.STORY) {
        this.stories.push(ins.item);
        this.storiesToShow.push(ins.item);
      }

      if (ins.item.type === ItemType.EPIC) {
        this.epics.push(ins.item);
      }

      if (ins.item.type === ItemType.ISSUE || ins.item.type === ItemType.TASK) {
        switch (ins.item.status) {
          case ItemStatus.DONE:
            this.doneItems.push(ins.item);
            this.doneItemsToShow.push(ins.item)
            break;
          case ItemStatus.OPEN:
            this.openedItems.push(ins.item);
            this.openedItemsToShow.push(ins.item)
            break;
          default:
            this.toDoItems.push(ins.item);
            this.toDoItemsToShow.push(ins.item)
        }
      }
    });

    this.tags = [...new Set(this.tags)];
    this.epics = [...new Set(this.epics)];
  }

  filterItems() {
    this.doneItemsToShow = cloneDeep(this.doneItems);
    this.toDoItemsToShow = cloneDeep(this.toDoItems);
    this.openedItemsToShow = cloneDeep(this.openedItems);
    this.storiesToShow = cloneDeep(this.stories);

    if (this.tagsCheckedFC.value.length > 0) {
      this.doneItemsToShow = this.doneItemsToShow.filter
      (item => item.tags.split(';').some(tag => this.tagsCheckedFC.value.includes(tag)));
      this.toDoItemsToShow = this.toDoItemsToShow.filter
      (item => item.tags.split(';').some(tag => this.tagsCheckedFC.value.includes(tag)));
      this.openedItemsToShow = this.openedItemsToShow.filter
      (item => item.tags.split(';').some(tag => this.tagsCheckedFC.value.includes(tag)));
      this.storiesToShow = this.storiesToShow.filter
      (item => item.tags.split(';').some(tag => this.tagsCheckedFC.value.includes(tag)));
    }

    if (this.typesCheckedFC.value.length > 0) {
      this.doneItemsToShow = this.doneItemsToShow.filter(item => this.typesCheckedFC.value.includes(item.type));
      this.toDoItemsToShow = this.toDoItemsToShow.filter(item => this.typesCheckedFC.value.includes(item.type));
      this.openedItemsToShow = this.openedItemsToShow.filter(item => this.typesCheckedFC.value.includes(item.type));
      this.storiesToShow = this.storiesToShow.filter(item => this.typesCheckedFC.value.includes(item.type));
    }

    if (this.epicCheckedFC.value.length > 0) {
      this.doneItemsToShow = this.doneItemsToShow.filter(item => this.epicCheckedFC.value.includes(item.father.id));
    }

    this.doneItemsToShow = this.doneItemsToShow.filter(item => item.description.includes(this.searchFC.value));
    this.toDoItemsToShow = this.toDoItemsToShow.filter(item => item.description.includes(this.searchFC.value));
    this.openedItemsToShow = this.openedItemsToShow.filter(item => item.description.includes(this.searchFC.value));
    this.storiesToShow = this.storiesToShow.filter(item => item.description.includes(this.searchFC.value));

  }

}
