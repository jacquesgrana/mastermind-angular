import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  errorType: string = '';
  errorComment: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
			this.errorType = data['errorType'];
      this.errorComment = data['errorComment'];
      console.log('error : type : ' + this.errorType + ' / comment : ' + this.errorComment);
    });

  }
}
