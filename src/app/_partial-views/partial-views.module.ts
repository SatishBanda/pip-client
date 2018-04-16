import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { ModalModule, PopoverModule } from "ngx-bootstrap";
import { FormsModule } from '@angular/forms';
import { CloseModalConfirmationComponent } from './close-modal-confirmation/close-modal-confirmation.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { GlobalService } from '../services/global.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    FormsModule
  ],
  declarations: [CloseModalConfirmationComponent, DeleteConfirmationComponent],
  providers: [GlobalService],
  exports: [CloseModalConfirmationComponent, DeleteConfirmationComponent]
})
export class PartialViews { }
