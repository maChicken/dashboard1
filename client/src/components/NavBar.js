import React, {useState} from "react"
import { NavLink } from 'react-router-dom'
import { TABLES_ROUTE } from '../utils/consts'
import menuIcon from "../img/menu.svg"
import homeIcon from "../img/home.svg"
import Menu from "../components/Menu"


function NavBar( ) {
    let path = window.location.pathname


    const [statusMenu, setStatusMenu] = useState(true)
    const [isScroll, setScroll] = useState(false)

    //Записываем, сколько проскроллено по вертикали
    let scrollpos = window.scrollY
    //Отслеживаем событие "скролл"
    window.addEventListener('scroll', function() {
        scrollpos = window.scrollY;
        //Если прокрутили больше, чем 25, то выполняется функция добавления класса
        if (scrollpos >= 25) { setScroll(true) }
        else { setScroll(false) }
    } )

    return (
        [
            <Menu statusMenu={statusMenu} key="key1" />,
            <div className={isScroll ? "navbar navbar-scroll" : "navbar"} key="key2">
                <div className="navbar__left">
                    <div className="navbar__url">
                        <NavLink to={TABLES_ROUTE}>
                            <img src={homeIcon} className="url__home" alt="home"></img>
                        </NavLink>
                        <span className="url__path">{' ' + path[0] + ' ' + path[1].toUpperCase() + path.slice(2)}</span>
                    </div>
                    <div className="navbar__path">{path[1].toUpperCase() + path.slice(2)}</div>
                </div>
                    <div className="navbar__right">
                        <button className="navbar__menu" onClick={() => setStatusMenu(!statusMenu)}>
                            <img src={menuIcon} className="img-menu" alt="menu"></img>
                        </button>
                        <p>made with love</p>
                    </div>
            </div>
        ]
    )
}

export default NavBar