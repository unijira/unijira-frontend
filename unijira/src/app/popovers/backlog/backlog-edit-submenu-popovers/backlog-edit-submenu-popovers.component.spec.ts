import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BacklogEditSubmenuPopoversComponent } from './backlog-edit-submenu-popovers.component';

describe('BacklogEditSubmenuPopoversComponent', () => {
  let component: BacklogEditSubmenuPopoversComponent;
  let fixture: ComponentFixture<BacklogEditSubmenuPopoversComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BacklogEditSubmenuPopoversComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BacklogEditSubmenuPopoversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
