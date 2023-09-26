import React from 'react'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.header}>
      <a href='/'>Help</a>
      <a href='/'>Contact</a>
      <a href='/'>Account</a>
      <a href='/'>Card</a>
    </div>
  )
}

export default Navbar
