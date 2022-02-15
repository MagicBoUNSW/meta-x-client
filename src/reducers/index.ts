import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import account, { AccountState } from './account';
import vehicle, { VehicleState } from './vehicle';
import table, { TableState } from "./table";
import score, { ScoreState } from "./score";
import result, {ResultState} from "./result"
import criteria, { CriteriaState } from './criteria';
 
export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly loadingBar: any;
  readonly account: AccountState;
  readonly vehicle: VehicleState;
  readonly table: TableState;
  readonly score: ScoreState;
  readonly result: ResultState;
  readonly criteria: CriteriaState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  loadingBar,
  account,
  vehicle,
  table,
  score,
  result,
  criteria
});

export default rootReducer;
