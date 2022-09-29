import { useEffect } from 'react'
import styles from './index.module.scss'
import Header from '../Header'
import { useSelector, useDispatch } from 'react-redux'
import { InitState } from '../../store/reducers/recordsReducer'
import { fetchRecords, changePay, createNextMonthData } from '../../store/actions/recordsAction'

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const peopleList = ['A', 'B', 'C', 'D', 'E']

interface Data {
  year: number
  month: number
  payPerson: string
  isCheck: boolean
  id: string
}

const curMon = new Date().getMonth() + 1
const curYear = new Date().getFullYear()

const Record = () => {
  const dispatch = useDispatch()

  const handleChangeCheckbox = (id: string, isCheck: boolean) => {
    dispatch(changePay(id, isCheck))
  }

  const data = useSelector<InitState, Data[]>((state) => state.records)

  useEffect(() => {
    dispatch(fetchRecords())
  }, [dispatch])

  useEffect(() => {
    if (data.length) {
      const { month, year } = data.slice(-1)[0]
      if (`${curYear}${curMon}` > `${year}${month}`) {
        const monthIndex = months.findIndex((mon) => mon === curMon)
        const peopleListIndex = monthIndex % peopleList.length

        dispatch(createNextMonthData(curYear, curMon, peopleList[peopleListIndex], false))
      }
    }
  }, [data, dispatch])

  return (
    <section className={styles.record}>
      <h1>2022 年</h1>

      <div className={styles.content}>
        <Header />
        <ul>
          {data.map(({ month, payPerson, isCheck, id }) => {
            return (
              <li key={id}>
                <h5>{month}月</h5>
                <p>{payPerson}</p>
                <div>
                  <input
                    type="checkbox"
                    checked={isCheck}
                    onChange={() => handleChangeCheckbox(id, isCheck)}
                    className={styles.checkbox}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Record
