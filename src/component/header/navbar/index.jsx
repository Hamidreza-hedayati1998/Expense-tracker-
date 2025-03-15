import React from 'react'
import styles from './header.module.scss'
import { FaHome,FaBell } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
const Header = () => {
  return (
    <div className={styles.containerheader}>
        <div className={styles.leftlist}>
            <div className={styles.textright}>
                <span><FaHome/></span>/profile
            </div>
            <div>
              <h1 className='text-xl'>Profile</h1>
            </div>
            
        </div>
        <div className={styles.rightlist}>
             <div className={styles.inputwrap}>
                <span><IoSearch /></span>
                <input className={styles.inputsearch} type="text"   />
             </div>
            <li><span><MdPerson/></span>signin</li>
            <li><IoIosSettings /></li>
            <li><FaBell /></li>
           
        </div>
    </div>
  )
}

export default Header