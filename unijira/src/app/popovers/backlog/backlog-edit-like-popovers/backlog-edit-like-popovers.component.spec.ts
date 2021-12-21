import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BacklogEditLikePopoversComponent } from './backlog-edit-like-popovers.component';

describe('BacklogEditLikePopoversComponent', () => {
  let component: BacklogEditLikePopoversComponent;
  let fixture: ComponentFixture<BacklogEditLikePopoversComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogEditLikePopoversComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BacklogEditLikePopoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
