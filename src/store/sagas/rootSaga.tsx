import { all } from 'redux-saga/effects'
import recordsSaga from './recordsSaga'

function* rootSaga() {
  yield all([...recordsSaga])
}

export default rootSaga
