import { call, put, takeLatest } from 'redux-saga/effects'
import { FETCH_RECORDS, CHANGE_PAY, CREATE_NEXT_MONTH_DATA } from '../types/records'
import db from '../../firebase'
import { collection, getDocs, updateDoc, doc, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore'
import { fetchRecordsSuccess, changePaySuccess, createNextMonthDataSuccess } from '../actions/recordsAction'

interface Data {
  year: number
  month: number
  payPerson: string
  isCheck: boolean
  id?: string
  type: string
}

const colRef = collection(db, 'records')
const q = query(colRef, orderBy('createdAt'))

function* fetchRecords(): any {
  try {
    const snapshot = yield call(getDocs, q)

    const data = snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
    if (data.length) {
      yield put(fetchRecordsSuccess(data))
    }
    return null
  } catch (error) {
    console.log(error)
  }
}

function* changePay({ id, isCheck }: { id: string; isCheck: boolean; type: string }): any {
  try {
    const targetDoc = doc(db, 'records', id)
    yield updateDoc(targetDoc, { isCheck: !isCheck })

    const snapshot = yield call(getDocs, q)
    const data = snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
    if (data.length) {
      yield put(changePaySuccess(data))
    }
  } catch (error) {
    console.log(error)
  }
}

function* createNextMonthData({ year, month, payPerson, isCheck }: Data): any {
  yield call(addDoc, colRef, { year, month, payPerson, isCheck, createdAt: serverTimestamp() })
  const snapshot = yield call(getDocs, q)
  const data = snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
  if (data.length) {
    yield put(createNextMonthDataSuccess(data))
  }
}

const sagaArr = [
  takeLatest(FETCH_RECORDS, fetchRecords),
  takeLatest(CHANGE_PAY, changePay),
  takeLatest(CREATE_NEXT_MONTH_DATA, createNextMonthData),
]
export default sagaArr
