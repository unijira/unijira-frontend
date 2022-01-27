import { Injectable } from '@angular/core';

import * as introJs from 'intro.js/intro.js';

@Injectable({
  providedIn: 'root',
})
export class IntrojsService {
  introJS = null;

  show(options: any) {
    this.introJS = introJs();
    this.introJS.start();

    this.introJS
      .setOptions(options)
      .start();
  }
}
