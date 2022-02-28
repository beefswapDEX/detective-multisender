import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Web3 from "web3";
import { AbiItem } from 'web3-utils'
import { CHAIN_ID } from 'src/app/config/constants/networks';
import contracts from 'src/app/config/constants/contracts';
import keys from 'src/app/config/constants/keys';
import bep20Abi from 'src/app/config/abi/erc20.json';
import detectiveMultisender from 'src/app/config/abi/detectiveMultisender.json'

import { MaxUint256 } from '@ethersproject/constants';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
declare let window: any;

interface UserTokenModel {
  label: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: Web3;
  address$: Observable<string> | undefined;
  httpOptions: any;
  userTokens: UserTokenModel[] = [];

  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly httpClient: HttpClient
    ) {
    this.web3 = new Web3(window.ethereum)
    this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};
    this.address$ = localStorage.getItem(keys.web3service.address)
    this.userTokens = localStorage.getItem(keys.web3service.user_tokens)
  }

  async connectAccount(): Promise<any> {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await this.enableMetaMaskAccount();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      await this.enableMetaMaskAccount();
    } else {
      window.alert('Non-Ethereum browser detected. You Should consider using MetaMask!');
    }
  }

  async detectAccountChange(): Promise<any> {
    window.ethereum.on("accountsChanged", (accounts: any) => {
      if (!accounts.length) {
        this.localStorage.removeItem(keys.web3service.address)
        this.localStorage.removeItem(keys.web3service.user_tokens)
        console.log("User disconnect wallet");
      } else {
        this.localStorage.setItem(keys.web3service.address, accounts.result[0]);
        this.getUserTokens(this.localStorage.getItem(keys.web3service.address))
      }
    })
  }
  
  private async enableMetaMaskAccount(): Promise<any> {
    await window.ethereum.send('eth_requestAccounts')
      .then((accounts: any) => {
        this.localStorage.setItem(keys.web3service.address, accounts.result[0]);
        this.getUserTokens(this.localStorage.getItem(keys.web3service.address))
      })
      .catch((e: any) => {
        console.log(e);
        if (e.code === 4001) {
          window.alert(e.message);
        }
      })
  }

  getUserTokens(account: string) {
		return this.httpClient.get(`${environment.covalenthq_gateway}/address/${account}/balances_v2/?format=JSON&nft=false&no-nft-fetch=true&key=${environment.covalenthq_apikey}`).subscribe((value: any) => {
      let res = value.data.items.map((data: any) => {
        const {contract_address, contract_ticker_symbol} = data;
        return {
          label: `${contract_ticker_symbol} - ${contract_address}`,
          value: `${contract_address}`
        }
      })
      this.userTokens = res;
      this.localStorage.setItem(keys.web3service.user_tokens, this.userTokens)
    });
	}
}
