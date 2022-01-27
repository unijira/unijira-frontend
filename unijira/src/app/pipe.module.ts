import {NgModule} from '@angular/core';
import {TimePipe} from './pipes/time.pipe';
import {FilteredPipe} from './pipes/filtered.pipe';
import {TruncatePipe} from './pipes/truncate.pipe';


@NgModule({
  declarations: [TimePipe, FilteredPipe, TruncatePipe],
  exports: [TimePipe, FilteredPipe, TruncatePipe]
})
export class PipeModule {}

