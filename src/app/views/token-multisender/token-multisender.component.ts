import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from "rxjs/operators";
import keys from 'src/app/config/constants/keys';
import { NetworkOptionModel, networkOptions } from 'src/app/config/constants/networks';
import { UserTokenModel } from 'src/app/config/models/user-token.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';
import { Web3Service } from 'src/app/shared/services/web3-service/web3.service';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { BIG_ZERO } from 'src/app/utils/bigNumber';
interface ErrorDataModel {
  line: number,
  errorDesc: string
}
interface ReceiverWithAmount {
  address: string,
  amount: number 
}
@Component({
  selector: 'app-token-multisender',
  templateUrl: './token-multisender.component.html',
  styleUrls: ['./token-multisender.component.scss']
})
export class TokenMultisenderComponent implements OnInit {
  @ViewChild("receiverInput") private reveiverInput
  step = 1;
  address: string | undefined;
  openDropdown: boolean = false
  preparationData: FormGroup
  selectedNetwork: NetworkOptionModel[] = [];
  filteredUserTokens: UserTokenModel[] = [];
  receiverValidData: ReceiverWithAmount[] = [];
  receiverErrorData: ErrorDataModel[] = [];
  isInsufficientBalance: boolean = false;
  searchTokenText: string = "";
  content: any;
  balance: any = BIG_ZERO;
  constructor(
        private readonly web3Service: Web3Service,
        private readonly localStorageService: LocalStorageService
    ) {
    this.preparationData = new FormGroup({
      token: new FormControl(null, [Validators.required, CustomValidators.addressValidator]),
      receiverWithAmount: new FormControl(null, {
          validators:[Validators.required],
        }
      )
    })
  }
  
  ngOnInit(): void {
    this.web3Service.detectAccountChange()
    this.web3Service.detectNetworkChange()
    this.web3Service.address$?.subscribe((val) => {
      this.address = val;
    })
    this.web3Service.chainId$?.subscribe((val) => {
      this.selectedNetwork = networkOptions.filter((network) => {
        return network.chainId === val;
      });
    })
    this.preparationData.get('receiverWithAmount').valueChanges
    .pipe(debounceTime(1000))
    .subscribe(() => {
      this.validateReceiver()
    })
    this.preparationData.get('token').valueChanges.subscribe(() => {
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
    const searchTokenData = this.localStorageService.getItem(keys.web3service.user_tokens).filter((token: any) => 
          token.label.toLocaleLowerCase().includes(this.searchTokenText.toLocaleLowerCase())
        )
    this.filteredUserTokens = searchTokenData
  }

  selectToken(item: UserTokenModel) {
    this.searchTokenText = item.value
    this.searchToken()   
  }

  async getBalance() {
    const balance = await this.web3Service.getBalance(this.preparationData.controls.token.value, this.address)
    this.balance = Number(balance)
    if(this.receiverValidData.length > 0) {
      this.calculateBalance()
    }
  }

  // TODO: Add validation for duplicate address
  validateReceiver() {
    var addressDataWithAmount : ReceiverWithAmount[] = [];
    var errorData : ErrorDataModel[] = [];
    const lineCount = this.reveiverInput.codeMirror.lineCount();
    for (let index = 0; index < lineCount; index++) {
      var lineData = this.reveiverInput.codeMirror.getLine(index)
      var dataSplit = lineData.split(";");
      var address = dataSplit[0]
      var amount = Number(dataSplit[1])
      // validate null value
      if ((address == undefined || amount == undefined) || (address == null || amount == null)) {
        errorData.push({line: index+1, errorDesc: "Data null"})
        this.highlightText(index, lineData, '#fc3c63')
      } else {
        const isAddress = this.web3Service.validateAddress(address)
        // check address is valid
        if (isAddress && !isNaN(amount)) {
          this.highlightText(index, lineData, 'unset')
          addressDataWithAmount.push({address: address, amount: amount})
        } else {
          this.highlightText(index, lineData, '#fc3c63')
          errorData.push({line: index+1, errorDesc: "Address or Amount is not valid"})
        }
      }
    }
    this.receiverValidData = addressDataWithAmount;
    this.receiverErrorData = errorData;
    this.calculateBalance()
  }

  highlightText(index: number, lineData: string, color: string) {
    this.reveiverInput.codeMirror.markText({line:index,ch:0}, {line:index, ch:lineData.length},{css: `color: ${color}`});
  }

  calculateBalance() {
    var totalAmount: number = 0;
    this.receiverValidData.forEach((value: any) => {
      totalAmount += value.amount
    })
    this.isInsufficientBalance = this.balance < totalAmount;
  }

}
