import { Injectable } from '@angular/core';
import Web3 from 'web3';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class GasPriceService {
  private web3: Web3;

  constructor() {
    this.web3 = new Web3(window.ethereum)
  }

  get standardInHex() {
    const toWei = this.web3.utils.toWei('21', 'gwei')
    return this.web3.utils.toHex(toWei)
  }
}
