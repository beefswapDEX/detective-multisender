import { ActionReducerMap, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { setAddress, clearAddress, setChain, clearChain } from './web3.actions';
import { AddressState, ChainState } from './web3.state';

export const defaultAddress: AddressState = {
  address: undefined
};
export const defaultChain: ChainState = {
  chainId: undefined
};

const _addressReducer = createReducer(
  defaultAddress,
  on(setAddress, (state, action) => {
    return {
      ...state,
      address: action.address
    }
  }),
  on(clearAddress, () => defaultAddress)
);
const _chainReducer = createReducer(
  defaultChain,
  on(setChain, (state, action) => {
    return {
      ...state,
      chainId: action.chainId
    }
  }),
  on(clearChain, () => defaultChain)
);

interface AppState {
  addressState: AddressState;
  chainState: ChainState;
}
export const selectWeb3ModuleState = createFeatureSelector<AppState>('web3Module');
export const selectFeatureAddress = createSelector(
  selectWeb3ModuleState,
  state => state.addressState.address
);
export const selectFeatureChain = createSelector(
  selectWeb3ModuleState,
  state => state.chainState.chainId
);

export function addressReducer(state:any, action:any) {
  return _addressReducer(state, action);
}
export function chainReducer(state:any, action:any) {
  return _chainReducer(state, action);
}

export const web3Reducer: ActionReducerMap<AppState> = {
  addressState: addressReducer,
  chainState: chainReducer
};