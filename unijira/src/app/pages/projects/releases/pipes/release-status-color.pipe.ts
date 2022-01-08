import {Pipe, PipeTransform} from '@angular/core';
import {ReleaseStatus} from '../../../../models/releases/ReleaseStatus';

@Pipe({
  name: 'releaseStatusColor'
})
export class ReleaseStatusColorPipe implements PipeTransform {

  transform(value: string | ReleaseStatus, ...args: string[]): string {

    switch (value) {
      case ReleaseStatus.draft:
        return 'tertiary';
      case ReleaseStatus.released:
        return 'success';
      case ReleaseStatus.archived:
        return 'danger';
      default:
        return 'primary';
    }

  }

}
