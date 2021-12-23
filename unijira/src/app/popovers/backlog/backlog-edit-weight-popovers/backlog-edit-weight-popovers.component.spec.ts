import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {BacklogEditWeightPopoversComponent} from './backlog-edit-weight-popovers.component';

describe('BacklogEditWeightPopoversComponent', () => {
  let component: BacklogEditWeightPopoversComponent;
  let fixture: ComponentFixture<BacklogEditWeightPopoversComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogEditWeightPopoversComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BacklogEditWeightPopoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
