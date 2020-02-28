import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GigService } from '../gig.service';
import { GigResource, PerformerResource } from '../gigsResource';


@Component({
  selector: 'app-gig-detail',
  templateUrl: './gig-detail.component.html',
  styleUrls: ['./gig-detail.component.scss']
})
export class GigDetailComponent implements OnInit {

  gig: GigResource;
  performers: PerformerResource[] = [];

  constructor(private route: ActivatedRoute,
              private gigService: GigService,
              private location: Location) { }

  ngOnInit() {
    this.getGig();
  }

  getGig(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.gigService.getGig(id)
      .subscribe(gig => {
        this.gig = gig;
        this.performers = this.gigService.getPerformers(gig);
      });
  }

  goBack(): void {
    this.location.back();
  }

}
