import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-token-multisender',
  templateUrl: './token-multisender.component.html',
  styleUrls: ['./token-multisender.component.scss']
})
export class TokenMultisenderComponent implements OnInit {
  step = 1;
  constructor() { }

  ngOnInit(): void {
  }

  navigateStep(step: number) {
    if(step <= 3) {
      this.step = step;
    }
  }

}
