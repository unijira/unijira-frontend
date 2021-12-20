import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BacklogEditLinkPopoversComponent } from './backlog-edit-link-popovers.component';

describe('BacklogEditLinkPopoversComponent', () => {
  let component: BacklogEditLinkPopoversComponent;
  let fixture: ComponentFixture<BacklogEditLinkPopoversComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogEditLinkPopoversComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BacklogEditLinkPopoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
