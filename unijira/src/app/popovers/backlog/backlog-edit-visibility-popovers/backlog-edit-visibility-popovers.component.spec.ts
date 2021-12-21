import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BacklogEditVisibilityPopoversComponent } from './backlog-edit-visibility-popovers.component';

describe('BacklogEditVisibilityPopoversComponent', () => {
  let component: BacklogEditVisibilityPopoversComponent;
  let fixture: ComponentFixture<BacklogEditVisibilityPopoversComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogEditVisibilityPopoversComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BacklogEditVisibilityPopoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
