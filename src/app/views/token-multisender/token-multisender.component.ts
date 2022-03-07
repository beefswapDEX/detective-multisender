import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from "rxjs/operators";
import keys from 'src/app/config/constants/keys';
import { NetworkOptionModel, networkOptions } from 'src/app/config/constants/networks';
import { UserTokenModel } from 'src/app/config/models/user-token.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage-service/local-storage.service';
import { TokenService } from 'src/app/shared/services/token-service/token.service';
import { TxService } from 'src/app/shared/services/tx-service/tx.service';
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
interface SummaryTransaction {
  totalNumberAddress: number,
  totalAmountSent: number,
  totalNumberOfTransaction: number,
  tokenBalance: number,
  approximateCost: any,
  bnbBalance: number,
  tokenSymbol: string,
}
@Component({
  selector: 'app-token-multisender',
  templateUrl: './token-multisender.component.html',
  styleUrls: ['./token-multisender.component.scss']
})
export class TokenMultisenderComponent implements OnInit {
  @ViewChild("receiverInput") private receiverInput
  step = 1;
  address: string | undefined;
  openDropdown: boolean = false
  preparationData: FormGroup
  selectedNetwork: NetworkOptionModel[] = [];
  filteredUserTokens: UserTokenModel[] = [];
  receiverValidData: ReceiverWithAmount[] = [];
  receiverErrorData: ErrorDataModel[] = [];
  isInsufficientBalance: boolean = true;
  codeMirrorOptions: any = {
    theme: "base16-light",
    mode: "application/json",
    lineNumbers: true,
    autoRefresh: true
  };
  balance: any = BIG_ZERO;
  summaryTransaction: SummaryTransaction = {
    totalNumberAddress: 0,
    totalAmountSent: 0,
    totalNumberOfTransaction: 0,
    tokenBalance: 0,
    approximateCost: 0,
    bnbBalance: 0,
    tokenSymbol: '',
  };

  constructor(
        private readonly web3Service: Web3Service,
        private readonly tokenService: TokenService,
        private readonly txService: TxService,
        private readonly localStorageService: LocalStorageService
    ) {
    this.preparationData = new FormGroup({
      token: new FormControl("", [Validators.required, CustomValidators.addressValidator]),
      receiverWithAmount: new FormControl(null, {
          validators:[Validators.required],
        }
      )
    })
  }
  
  ngOnInit(): void {
    if(this.step == 1) {
      setTimeout(() => this.receiverInput.codeMirror.refresh(), 500 )
    }
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
    this.preparationData.controls.receiverWithAmount.valueChanges
    .pipe(debounceTime(1000))
    .subscribe(() => {
      this.validateReceiver()
    })
    this.preparationData.controls.token.valueChanges.subscribe(() => {
      if(this.preparationData.controls.token.valid) {
        this.tokenService.setTokenAddress(this.preparationData.controls.token.value)
        this.getBalance()
      } else {
        this.balance = BIG_ZERO;
      }
    })
  }

  async navigateStep(step: number) {
    if(step <= 3) {
      if(step === 3 ) {
        await this.txService.multisendToken()
      }
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
    const filteredToken = this.localStorageService.getItem(keys.web3service.user_tokens).filter((token: any) => 
          token.label.toLocaleLowerCase().includes(this.preparationData.controls.token.value?.toLocaleLowerCase())
        )
    this.filteredUserTokens = filteredToken
  }

  selectToken(item: UserTokenModel) {
    this.preparationData.controls.token.setValue(item.value)
    this.searchToken()   
  }

  async getBalance() {
    const balance = await this.tokenService.getBalance()
    this.balance = Number(balance)
    if(this.receiverValidData.length > 0) {
      this.calculateCostAndBalance()
    }
  }

  // TODO: Add validation for duplicate address
  validateReceiver() {
    var addressDataWithAmount : ReceiverWithAmount[] = [];
    var errorData : ErrorDataModel[] = [];
    const lineCount = this.receiverInput.codeMirror.lineCount();
    for (let index = 0; index < lineCount; index++) {
      var lineData = this.receiverInput.codeMirror.getLine(index)
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
          this.highlightText(index, lineData, '#90a959')
          addressDataWithAmount.push({address: address, amount: amount})
        } else {
          this.highlightText(index, lineData, '#fc3c63')
          errorData.push({line: index+1, errorDesc: "Address or Amount is not valid"})
        }
      }
    }
    this.receiverValidData = addressDataWithAmount;
    this.receiverErrorData = errorData;
    this.tokenService.parseAddress(this.receiverValidData)
    this.calculateCostAndBalance();
  }

  highlightText(index: number, lineData: string, color: string) {
    // highlight inline text with error / not
    this.receiverInput.codeMirror.markText({line:index,ch:0}, {line:index, ch:lineData.length},{css: `color: ${color}`});
  }

  calculateCostAndBalance() {
    var totalAmount: number = 0;
    this.receiverValidData.forEach((value: any) => {
      totalAmount += value.amount
    })
    this.isInsufficientBalance = this.balance < totalAmount;
    if (!this.isInsufficientBalance && this.receiverValidData.length > 0) {
      this.summaryTransaction = {
        totalNumberAddress: this.receiverValidData.length,
        totalAmountSent: totalAmount,
        totalNumberOfTransaction: this.tokenService.totalNumberTx,
        tokenBalance: this.balance,
        approximateCost: this.tokenService.totalCostInEth,
        bnbBalance: 0,
        tokenSymbol: this.tokenService.tokenSymbol
      }
    }
  }

  removeReceiver(index: number) {
    this.receiverValidData.splice(index, 1)
    this.calculateCostAndBalance()
  }

}
