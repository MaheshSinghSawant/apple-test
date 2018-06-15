import React from 'react'
import style from './Button.css'

const Button = ({ onClickHandler, buttonText }) => {
  return(
    <div
      className={ style.Button }
      onClick={ () => onClickHandler() }
    >
      { buttonText }
    </div>
  )
}

export default Button
