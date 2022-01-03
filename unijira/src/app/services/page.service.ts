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

  public setTitle(key: string | string[], translate: boolean = true): void {

    if(typeof key === 'string') {
      key = [key];
    }

    if(translate) {
      this.translateService.get(key).subscribe(keys => this.title.setTitle('Unijira \u{2013} ' + [...Object.values(keys)].filter(k => k).join(' \u{BB} ')));
    } else {
      this.title.setTitle('Unijira \u{2013} ' + [...key].filter(k => k).join(' \u{BB} '));
    }

  }

}
