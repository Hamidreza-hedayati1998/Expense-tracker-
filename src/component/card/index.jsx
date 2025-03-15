import React from 'react'
import style from './card.module.scss'
const Card = ({children}) => {
  return (
    <div className={style.conatiner}>
      {children}
    </div>
  )
}

export default Card