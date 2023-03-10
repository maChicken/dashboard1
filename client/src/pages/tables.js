import React, { useContext }  from "react"
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import {fetchTables} from '../http/tableAPI'
import TableElement from "../components/TableElement"
import NavBar from "../components/NavBar"

const Tables = observer( () => {
  const {tables} = useContext(Context)
  // Запрос на получение имен таблиц и их записей
  fetchTables().then(data => tables.setTables(data))
  return (
    <div className="tables">
      <NavBar />
      <div>
        {tables.tables.map( (el, index) => {
          return <TableElement key={index} table={el}/>
        })}
      </div>
    </div>
  )
})

export default Tables;
