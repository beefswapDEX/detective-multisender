import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-token-multisender',
  templateUrl: './token-multisender.component.html',
  styleUrls: ['./token-multisender.component.scss']
})
export class TokenMultisenderComponent implements OnInit {
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
