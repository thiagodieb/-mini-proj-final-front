import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Opportunity } from 'src/app/models/opportunity.model';
import * as _ from 'lodash';
import { SearchJobService } from 'src/app/shared/services/search-job.service';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RelatedComponent implements OnInit {

  @Input() jobCurrent: Opportunity;
  relatedJobs = [];
  isLoadingResults: boolean = true;
  jobs: Opportunity[];

  constructor(private searchJob: SearchJobService, private jobService: JobService) { }

  ngOnInit() {
    this.jobService.restApi.get().subscribe(res  => {
      this.jobs = res;
      this.fetchRelatedJobs(res);
    }, err  => {
      this.isLoadingResults =  false;
    });

  }

  fetchRelatedJobs(jobs: Opportunity[]){
    let currentTags: any[] = this.jobCurrent.tags;
    let related = this.searchJob.find(currentTags, jobs)

    _.remove(related, {
      id: this.jobCurrent.id
    });
    this.isLoadingResults = false;
    this.relatedJobs = related.slice(0, 3);
    console.log('related', this.relatedJobs)
  }
}
