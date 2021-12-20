import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BacklogEditLockPopoversComponent } from './backlog-edit-lock-popovers.component';

describe('BacklogEditLockPopoversComponent', () => {
  let component: BacklogEditLockPopoversComponent;
  let fixture: ComponentFixture<BacklogEditLockPopoversComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogEditLockPopoversComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BacklogEditLockPopoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
