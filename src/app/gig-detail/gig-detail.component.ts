import { Component, Input, OnInit } from '@angular/core';
import { Gig } from '../gig';

@Component({
  selector: 'app-gig-detail',
  templateUrl: './gig-detail.component.html',
  styleUrls: ['./gig-detail.component.scss']
})
export class GigDetailComponent implements OnInit {

  @Input() gig: Gig;

  constructor() { }

  ngOnInit() {
  }

}
