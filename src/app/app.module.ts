import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageStickyNotesComponent } from './Components/manage-sticky-notes/manage-sticky-notes.component';
import {StickyModule} from 'ng2-sticky-kit';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ResizableModule } from 'angular-resizable-element';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

const routes : Routes=[
      {
        path:'',
        component:ManageStickyNotesComponent,
      },
      {
        path:'managestickynotes',
        component:ManageStickyNotesComponent,
        pathMatch:'full'
      }

]

@NgModule({
  declarations: [
    AppComponent,
    ManageStickyNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    ResizableModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StickyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
