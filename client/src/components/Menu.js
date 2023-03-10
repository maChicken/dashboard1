import React from 'react'
import { NavLink } from 'react-router-dom'
import { TABLES_ROUTE, WHAT_ROUTE } from '../utils/consts'

import tableIcon from '../img/table.svg'
import whatIcon from '../img/what.svg'

function Menu( {statusMenu} ) {
    return (
        <div className={statusMenu ? "menu" : "menu menu-hidden"}>
            <div className='menu__title'>
                <div className='title-menu'>Dashboard</div>
            </div>
            <div className='menu__line'></div>
            <div className='element__container'>
                <NavLink to={TABLES_ROUTE} className = {({ isActive }) => (isActive ? 'nav__element nav__element-active' : 'nav__element')}>
                    <span className='nav__img'>
                        <img src={tableIcon} className='img-nav' alt="tables"></img>
                    </span>
                    <span className='nav__txt'>Tables</span>
                </NavLink>
            </div>
            <div className='element__container'>
                <NavLink to={WHAT_ROUTE} className = {({ isActive }) => (isActive ? 'nav__element nav__element-active' : 'nav__element')}>
                    <span className='nav__img'>
                        <img src={whatIcon} className='img-nav' alt="what"></img>
                    </span>
                    <span className='nav__txt'>FAQ</span>
                </NavLink>
            </div>
        </div>
    )
  }

export default Menu