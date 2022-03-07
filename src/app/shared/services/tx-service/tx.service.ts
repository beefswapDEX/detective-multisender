import { Injectable } from '@angular/core';
import { TokenService } from '../token-service/token.service';
import { Web3Service } from '../web3-service/web3.service';
import { AbiItem } from 'web3-utils'
import upgradeableProxySenderAbi from 'src/app/config/abi/upgradeableProxySender.json';
import erc20Abi from 'src/app/config/abi/erc20.json';
import EternalStorageProxyForDetectiveMultisender from 'src/app/config/abi/EternalStorageProxyForDetectiveMultisender.json';
import contract from 'src/app/config/constants/contracts';
import BN from 'bignumber.js'
import Web3 from 'web3';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { selectFeatureAddress, selectFeatureChain } from 'src/app/store/web3store/web3.reducer';
import { BIG_ZERO } from 'src/app/utils/bigNumber';
import { GasPriceService } from '../gas-service/gas-price.service';
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class TxService {
  private web3: Web3;
  chainId: number;
  account: string;
  txs: [] = []
  txHashToIndex = {}
  approval: any

  constructor(
      private tokenService: TokenService,
      private web3Service: Web3Service,
      private gasService: GasPriceService,
      private readonly httpClient: HttpClient,
      private addressStore: Store<{address: string}>,
      private chainStore: Store<{chainId: string}>
  ) {
    this.web3 = new Web3(window.ethereum)
    this.addressStore.pipe(select(selectFeatureAddress)).subscribe((val) => {
      this.account = val
    })
    this.addressStore.pipe(select(selectFeatureChain)).subscribe((val) => {
      this.chainId = this.web3.utils.hexToNumber(val)
    })
  }

  async multisendToken(): Promise<any> {
    const token_address = this.tokenService.tokenAddress
    let {addressToSend, balanceToSend, currentFee} =  this.tokenService;
    var ethValue = BIG_ZERO;
    if(token_address === "0x000000000000000000000000000000000000bEEF"){
      // balanceToSend.forEach((amount) => {
      //   ethValue.plus(amount)
      // })
      // const totalInEth = this.web3.utils.fromWei(ethValue.toString())
      // ethValue = new BN(currentFee).plus(totalInEth)
      ethValue = new BN(currentFee)
    } else {
      ethValue = new BN(currentFee)
    }
    const multisender = new this.web3.eth.Contract(upgradeableProxySenderAbi as AbiItem[], contract.upgradeableProxySender[this.chainId]);
    try {
      // await this.approve()
      let encodedData = await multisender.methods.multisendToken(token_address, addressToSend, balanceToSend).encodeABI({from: this.account})
      let gas = await this.web3.eth.estimateGas({
          from: this.account,
          data: encodedData,
          value: this.web3.utils.toHex(this.web3.utils.toWei(ethValue.toString())),
          to: contract.upgradeableProxySender[this.chainId]
      })
      multisender.methods.multisendToken(token_address, addressToSend, balanceToSend).send({
        from: this.account,
        gasPrice: this.gasService.standardInHex,
        gas: this.web3.utils.toHex(gas + 150000),
        value: this.web3.utils.toHex(this.web3.utils.toWei(ethValue.toString())),
      });
    } catch (e: any) {
      console.log('MultiSend ',e);
    }
  }

  async approve(): Promise<any> {
    const token = new this.web3.eth.Contract(erc20Abi as AbiItem[], this.tokenService.tokenAddress);
    try {
      // return token.methods['approve(address,uint256)'](this.tokenService.tokenAddress, this.tokenService.totalBalanceWithDecimals)
      // .send({from: this.account, gasPrice: this.gasService.standardInHex})
      await token.methods.approve(contract.upgradeableProxySender[this.chainId], this.tokenService.totalBalanceWithDecimals)
      .send({ 
        from: this.account,
        gasPrice: this.gasService.standardInHex
      })
    } catch (e: any) {
      console.log(e);
    }
  }
}
