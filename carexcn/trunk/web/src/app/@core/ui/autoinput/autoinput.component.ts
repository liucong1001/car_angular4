import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-ys-autoinput',
  templateUrl: './autoinput.component.html',
  styleUrls: ['./autoinput.component.scss'],
})
export class AutoinputComponent implements OnInit {
  text: string;
  results: string[];
  constructor() { }

  ngOnInit() {
  }

  search(event) {
    // this.mylookupservice.getResults(event.query).then(data => {
    //   this.results = data;
    // });
  }
}
