import {Pipe, PipeTransform} from '@angular/core';
import {ReleaseStatus} from '../../../../models/releases/ReleaseStatus';

@Pipe({
  name: 'releaseStatus'
})
export class ReleaseStatusPipe implements PipeTransform {

  transform(value: string | ReleaseStatus, ...args: string[]): string {

    switch (value) {
      case ReleaseStatus.draft:
        return 'projects.releases.status.draft';
      case ReleaseStatus.released:
        return 'projects.releases.status.released';
      case ReleaseStatus.archived:
        return 'projects.releases.status.archived';
      default:
        return 'projects.releases.status.unknown';
    }

  }

}
