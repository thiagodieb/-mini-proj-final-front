import { Injectable } from '@angular/core';
import { Opportunity } from 'src/app/models/opportunity.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SearchJobService {

  find(tags: any[], jobs: any[]){
    let found = [];

    jobs.map((job) => {
      job.tags.map((tag) => {

        let jobTagFound = tags.find((tagFind) => {
          return tagFind == tag
        })

        if(jobTagFound){
          if(job['count'] === undefined){
            job['count'] = 1;
          }else{
            job['count'] = job['count'] + 1;
          }

          found.push(job);
        }
      })
    });

    return _.orderBy(
      _.uniq(found),
      ['count'], ['desc']
    );
  }
}
