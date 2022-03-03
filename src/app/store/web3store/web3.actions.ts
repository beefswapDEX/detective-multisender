import { createAction, props } from '@ngrx/store';
import { AddressState, ChainState } from './web3.state';

export enum WalletActionTypes {
  INSERT_ADDRESS = "[Address Component] Insert",
  CLEAR_ADDRESS = "[Address Component] Clear",
  INSERT_CHAIN = "[Chain Component] Insert",
  CLEAR_CHAIN = "[Chain Component] Clear"
}

export const setAddress = createAction(
  WalletActionTypes.INSERT_ADDRESS, props<AddressState>()
);
export const setChain = createAction(
  WalletActionTypes.INSERT_CHAIN, props<ChainState>()
);
export const clearAddress = createAction(WalletActionTypes.CLEAR_ADDRESS);
export const clearChain = createAction(WalletActionTypes.CLEAR_CHAIN);