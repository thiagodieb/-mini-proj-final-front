import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MetaModule } from '@ngx-meta/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListJobComponent } from './pages/opportunity/list-job/list-job.component';
import { DetailJobComponent } from './pages/opportunity/detail-job/detail-job.component';
import { CardJobComponent } from './shared/components/card-job/card-job.component';
import { FormContactComponent } from './shared/components/form-contact/form-contact.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { PermalinkPipe } from './shared/pipes/permalink.pipe';
import { JobService } from './shared/services/job.service';
import { HttpClientModule } from '@angular/common/http';
import { EncodeUriPipe } from './shared/pipes/encode-uri.pipe';
import { RelatedComponent } from './pages/opportunity/detail-job/related/related.component';
import { SearchJobService } from './shared/services/search-job.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceholderCardComponent } from './shared/components/placeholder-card/placeholder-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ListJobComponent,
    DetailJobComponent,
    CardJobComponent,
    FormContactComponent,
    TruncatePipe,
    PermalinkPipe,
    EncodeUriPipe,
    RelatedComponent,
    PlaceholderCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MetaModule.forRoot(),
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  providers: [JobService, SearchJobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
