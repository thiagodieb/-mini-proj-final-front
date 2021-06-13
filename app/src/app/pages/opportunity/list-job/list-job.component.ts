import { Component, OnInit, ViewChild } from '@angular/core';
import { Opportunity } from 'src/app/models/opportunity.model';
import { SearchJobService } from 'src/app/shared/services/search-job.service';
import { JobService } from 'src/app/shared/services/job.service';
import Util from '../../../shared/utils/util';
import { TagsService } from 'src/app/shared/services/tags.service';
import {NgSelectComponent} from '@ng-select/ng-select';

@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['./list-job.component.css']
})
export class ListJobComponent implements OnInit {

  TIME_READY_INITIAL_LIST = 1000;
  tags: any[] = [];
  selectedTags: any;
  isLoadingResults = false;
  jobs: Opportunity[];
  isFirstLoad = true;
  haveMore = true;
  isPagination = true;
  tagsSelected = null;
  searchingJobsByTag = false;
  // @ts-ignore
  @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;

  constructor(
    private searchJobs: SearchJobService,
    private jobService: JobService,
    private tagService: TagsService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.getJobs();
    }, this.TIME_READY_INITIAL_LIST);
    this.allTags();
  }

  getJobs(): void {
    this.isLoadingResults = true;
    this.jobService.get().subscribe(res => {
      if (!Util.empty(res)) {
        this.haveMore = res.hasNextPage;
        this.jobs = (this.jobs !== undefined) ? this.jobs.concat(res.docs) : res.docs;
      }
    });
    this.isLoadingResults = false;
    this.isFirstLoad = false;
  }

  search(tags: string) {
    this.isLoadingResults = true;
    this.tagService.search(tags).subscribe(res => {
      this.jobs = (!Util.empty(res)) ? res : [];
    });
    this.isLoadingResults = false;
  }

  allTags() {
    this.tagService.restApi.get().subscribe(res => {
      this.tags = (!Util.empty(res)) ? res.map(tag => tag.name) : [];
    });
  }

  searchJobsByTag() {
    console.log('tags selecteds: ', this.tagsSelected);
    this.searchingJobsByTag = true;
    this.isLoadingResults = true;
    this.haveMore = false;
    this.isPagination = false;
    setTimeout(() => {
      if (Util.empty(this.tagsSelected)) {
        this.getJobs();
      } else {
        this.search(this.tagsSelected);
      }
      this.isLoadingResults = false;
    }, this.TIME_READY_INITIAL_LIST);
  }

  cancelSearchByTag() {
    this.tagsSelected = [];
    this.searchingJobsByTag = false;
    this.ngSelectComponent.clearModel();
    this.isLoadingResults = true;
    this.jobs = [];
    setTimeout(() => {
      this.getJobs();
    }, this.TIME_READY_INITIAL_LIST);
  }

  onChange(newValue) {
    this.tagsSelected = newValue.join(',');
  }

  getMoreJobs(): void {
      if (this.haveMore && this.isPagination) {
        this.jobService.paginatePage();
        this.getJobs();
      }
  }
}
