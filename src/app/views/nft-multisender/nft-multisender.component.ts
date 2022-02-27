import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-nft-multisender',
  templateUrl: './nft-multisender.component.html',
  styleUrls: ['./nft-multisender.component.scss']
})
export class NftMultisenderComponent implements OnInit {
  step = 1;
  preparationData: FormGroup
  
  constructor() {
    this.preparationData = new FormGroup({
      token: new FormControl(null, [Validators.required]),
      receiverWithAmount: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  navigateStep(step: number) {
    if(step <= 3) {
      this.step = step;
    }
  }
}
