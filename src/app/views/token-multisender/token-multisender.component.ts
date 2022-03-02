import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import keys from 'src/app/config/constants/keys';
import { UserTokenModel } from 'src/app/config/models/user-token.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';
import { Web3Service } from 'src/app/shared/services/web3-service/web3.service';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { BIG_ZERO } from 'src/app/utils/bigNumber';

@Component({
  selector: 'app-token-multisender',
  templateUrl: './token-multisender.component.html',
  styleUrls: ['./token-multisender.component.scss']
})
export class TokenMultisenderComponent implements OnInit {
  step = 1;
  openDropdown: boolean = false
  preparationData: FormGroup
  filteredUserTokens: UserTokenModel[] = [];
  searchTokenText: string = "";
  balance: any = BIG_ZERO;
  constructor(
        private readonly web3Service: Web3Service,
        private readonly localStorageService: LocalStorageService
    ) {
    this.preparationData = new FormGroup({
      token: new FormControl(null, [Validators.required, CustomValidators.addressValidator]),
      receiverWithAmount: new FormControl(null, [Validators.required])
    })
  }
  
  ngOnInit(): void {
    this.web3Service.detectAccountChange()
    this.web3Service.detectNetworkChange()
    this.preparationData.valueChanges.subscribe(()=> {
      if(this.preparationData.controls.token.valid) {
        this.getBalance()
      } else {
        this.balance = BIG_ZERO;
      }
    })
  }

  navigateStep(step: number) {
    if(step <= 3) {
      this.step = step;
    }
  }

  onFocus() {
    this.openDropdown = true
    this.searchToken()
  }

  onBlur() {
    setTimeout(() => {
      this.openDropdown = !this.openDropdown
    }, 100);
  }

  searchToken(): void {
    const searchTokenData = this.localStorageService.getItem(keys.web3service.user_tokens).filter((token) => 
          token.label.toLocaleLowerCase().includes(this.searchTokenText.toLocaleLowerCase())
        )
    this.filteredUserTokens = searchTokenData
  }

  selectToken(item: UserTokenModel) {
    this.searchTokenText = item.value
    this.searchToken()   
  }

  async getBalance() {
    const balance = await this.web3Service.getBalance(this.preparationData.controls.token.value, this.localStorageService.getItem(keys.web3service.address))
    this.balance = balance
  }

}
