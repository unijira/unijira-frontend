import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentsPageRoutingModule } from './documents-routing.module';

import { DocumentsPage } from './documents.page';
import {TranslateModule} from '@ngx-translate/core';
import {NgxDropzoneModule} from "ngx-dropzone";
import {PipeModule} from "../../../pipe.module";
import {NgxPopperjsModule} from "ngx-popperjs";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DocumentsPageRoutingModule,
    NgxDropzoneModule,
    PipeModule,
    NgxPopperjsModule
  ],
  declarations: [DocumentsPage]
})
export class DocumentsPageModule {}
