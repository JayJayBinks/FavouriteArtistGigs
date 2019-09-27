import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isArrayLike } from 'rxjs/internal-compatibility';
import { isNotNullOrUndefined } from '../../../node_modules/codelyzer/util/isNotNullOrUndefined';
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
  performer: PerformerResource = { name: '' };

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
        this.getPerformers(gig);
      });
  }

  private getPerformers(gig) {
    if (isNotNullOrUndefined(gig.performers)) {
      if (isArrayLike(gig.performers.performer)) {
        gig.performers.performer.forEach(performer => this.performers.push(performer));
      } else {
        this.performer = gig.performers.performer;
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

}
