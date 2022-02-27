import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nft-multisender',
  templateUrl: './nft-multisender.component.html',
  styleUrls: ['./nft-multisender.component.scss']
})
export class NftMultisenderComponent implements OnInit {
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
