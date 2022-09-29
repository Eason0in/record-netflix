import { CREATE_NEXT_MONTH_DATA_SUCCESS, FETCH_RECORDS_SUCCESS, CHANGE_PAY_SUCCESS } from '../types/records'

interface Data {
  year: number
  month: number
  payPerson: string
  isCheck: boolean
  id: string
}

export interface InitState {
  records: Data[]
}

const initState: InitState = {
  records: [],
}

const recordsReducer = (state = initState, action: any) => {
  const { data } = action
  switch (action.type) {
    case CREATE_NEXT_MONTH_DATA_SUCCESS:
      return { ...state, records: data }
    case FETCH_RECORDS_SUCCESS:
      return { ...state, records: data }
    case CHANGE_PAY_SUCCESS:
      return { ...state, records: data }

    default:
      return state
  }
}

export default recordsReducer
