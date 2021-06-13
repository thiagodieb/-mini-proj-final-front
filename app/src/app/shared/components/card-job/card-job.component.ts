import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Opportunity } from 'src/app/models/opportunity.model';

@Component({
  selector: 'app-card-job',
  templateUrl: './card-job.component.html',
  styleUrls: ['./card-job.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CardJobComponent implements OnInit {

  @Input() job: Opportunity;

  constructor() { }

  ngOnInit() {
  }
  
}
