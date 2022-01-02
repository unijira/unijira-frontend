import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(
    private title: Title,
    private translateService: TranslateService) { }

  public setTitle(key: string, translate: boolean = true): void {

    if(translate) {
      this.translateService.get(key).subscribe(title => this.title.setTitle(['Unijira', title].filter(k => k).join(' \u{2013} ')));
    } else {
      this.title.setTitle(['Unijira', key].filter(k => k).join(' \u{2013} '));
    }

  }

}
