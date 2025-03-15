import React from 'react'
import styles from './naveside.module.scss'
import { FaHome,FaMoneyBill,FaFile } from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";
import { HiWrench } from "react-icons/hi2";
import { IoMdPerson } from "react-icons/io";
import { MdRocketLaunch } from "react-icons/md";
const Menuside = () => {
  return (
    <div>
        <div className={styles.container}>
            <ul className={styles.list}>
              <li><span><FaHome /></span>Dashbord</li>
              <li><span><FiBarChart2 /></span>Tables</li>
              <li><span><FaMoneyBill /></span>Billing</li>
              <li><span><HiWrench /></span>RTL</li>
            </ul>
            <div>
              <h1>ACCOUNT PAGES</h1>
              <div>
                <ul className={styles.listPage}>
                 
                  <li><span><IoMdPerson /></span>Profile</li>
                  <li><span><FaFile /></span>SignIn</li>
                  <li><span><MdRocketLaunch /></span>signUp</li>
                </ul>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Menuside