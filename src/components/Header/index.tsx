import React from 'react'
import styles from './index.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <h3>月份</h3>
      <h3>應繳人</h3>
      <h3>是否已繳</h3>
    </div>
  )
}

export default Header
