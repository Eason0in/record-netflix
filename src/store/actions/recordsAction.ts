import {
  CREATE_NEXT_MONTH_DATA,
  FETCH_RECORDS,
  FETCH_RECORDS_SUCCESS,
  CHANGE_PAY,
  CHANGE_PAY_SUCCESS,
  CREATE_NEXT_MONTH_DATA_SUCCESS,
} from '../types/records'

interface Data {
  year: number
  month: number
  payPerson: string
  isCheck: boolean
  id: string
}

export const createNextMonthData = (year: number, month: number, payPerson: string, isCheck: boolean) => ({
  type: CREATE_NEXT_MONTH_DATA,
  year,
  month,
  payPerson,
  isCheck,
})

export const fetchRecords = () => ({
  type: FETCH_RECORDS,
})

export const changePay = (id: string, isCheck: boolean) => ({
  type: CHANGE_PAY,
  id,
  isCheck,
})
export const changePaySuccess = (data: Data[]) => ({
  type: CHANGE_PAY_SUCCESS,
  data,
})
export const fetchRecordsSuccess = (data: Data[]) => ({
  type: FETCH_RECORDS_SUCCESS,
  data,
})
export const createNextMonthDataSuccess = (data: Data[]) => ({
  type: CREATE_NEXT_MONTH_DATA_SUCCESS,
  data,
})
