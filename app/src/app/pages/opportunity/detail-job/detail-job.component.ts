import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Opportunity } from 'src/app/models/opportunity.model';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/shared/services/job.service';
import { environment } from 'src/environments/environment';
import Util from '../../../shared/utils/util';

@Component({
  selector: 'app-detail-job',
  templateUrl: './detail-job.component.html',
  styleUrls: ['./detail-job.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailJobComponent implements OnInit {

  job: Opportunity;
  formLink: string;
  relatedJobs = [];
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private jobService: JobService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // tslint:disable-next-line:radix
      const jobId: number = parseInt(params.get('id'));
      this.jobService.restApi.getById(jobId).subscribe(res  => {
        this.job = res;
        console.log('get job by id', this.job)
        this.isLoadingResults =  false;
      }, err  => {
        this.isLoadingResults =  false;
      });
    });
    this.formLink = environment.form_link;
  }

  isEmpty(value) {
    return Util.empty(value);
  }
}
