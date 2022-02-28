import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Web3Service } from 'src/app/shared/web3-service/web3.service';

@Component({
  selector: 'app-token-multisender',
  templateUrl: './token-multisender.component.html',
  styleUrls: ['./token-multisender.component.scss']
})
export class TokenMultisenderComponent implements OnInit {
  step = 1;
  preparationData: FormGroup
  constructor(private readonly web3Service: Web3Service) {
    this.preparationData = new FormGroup({
      token: new FormControl(null, [Validators.required]),
      receiverWithAmount: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.web3Service.detectAccountChange()
    console.log(this.web3Service.userTokens);
    
  }

  navigateStep(step: number) {
    if(step <= 3) {
      this.step = step;
    }
  }

}
