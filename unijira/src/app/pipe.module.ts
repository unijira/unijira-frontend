import {NgModule} from '@angular/core';
import {TimePipe} from './pipes/time.pipe';
import {FilteredPipe} from './pipes/filtered.pipe';


@NgModule({
  declarations: [TimePipe, FilteredPipe],
  exports: [TimePipe, FilteredPipe]
})
export class PipeModule {}

