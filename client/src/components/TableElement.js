import React, {  useContext, useState } from 'react'
import {AgGridReact} from 'ag-grid-react';
import {addRow, deleteRows, putRows} from '../http/tableAPI';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import ModalError from './modal/ModalError'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

import addIcon from '../img/add.svg'
import editIcon from '../img/edit.svg'
import deleteIcon from '../img/delete.svg'

const TableElement = observer ( ({table}) => {

    const {tables} = useContext(Context)

    // Атрибуты таблицы
    const columnDefs = []
    // Записи таблицы
    const rowData = []

    // Инициализация атрибутов
    let columnName = table.tableAtr.map( el =>{
        return el.column_name
    })
    columnName.forEach( el => {
        if (el.includes('id')){
            columnDefs.push({
                field: el,
                lockPosition: 'left',
                editable: false
            })
        } else {
            columnDefs.push({
                field: el,
                lockPosition: 'left',
                editable: true,
            })
        }
    })
    // Всем таблицам кроме movies запрещаем редактирование
    if (table.tableName !== 'movies') {
        columnDefs.forEach( (el, index) =>{
            el.editable = false
        })
    }
    // Инициализацияя строк
    table.tableRecords.forEach( record => {
        rowData.push(record)
    })

    // Размер столбцов определяется автоматически, указаны только минимальная ширина некоторых
    const onGridSizeChanged = (params) => {
        params.api.sizeColumnsToFit({
            defaultMinWidth: 80,
            columnLimits: [
                { key: 'movie_title', minWidth: 150 },
                { key: 'genre', minWidth: 100 },
                { key: 'first_name', minWidth: 100 },
                { key: 'last_name', minWidth: 100 },
                { key: 'release_date', minWidth: 150 },
                { key: 'date_of_birth', minWidth: 150 }
            ]
        })
    }
    // Выделение строки при наведении мыши (true - отключено)
    const suppressRowHoverHighlight = true
    // Выбор нескольких строк
    let rowSelect = ''
    // Полученые выбранных строк
    let selectedRows = []
    const onSelectionChanged = (params) => {
        const selectedData = params.api.getSelectedRows()
        selectedRows = selectedData
    }
    // Ввод в верхнюю строку
    const [inputRow, setInputRow] = useState({})

    // Модальное окно
    const [modalActive, setModalActive] = useState(false)
    // Текст ошибки и ответа
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    // Отправка запроса на создание; обнавление стора
    function requestAddRow(row){
        addRow(row)
        .then(data => {
            if(data){
                tables.addRecMovie(row)
                setInputRow([])
                setData(data)
                setModalActive(true)
            }
        })
        .catch(error => {
            setError(error.request.response)
            setModalActive(true)
        })
    }

    // Отправка запроса на обновления строк; обновление стора
    function requestUpdateRow(row){
        putRows(row)
        .then( (data) => {
            if(data){
                tables.updateRecMovie(row)
                setData(data)
                setModalActive(true)
            }
        })
        .catch(error => {
            setError(error.request.response)
            setModalActive(true)
        })
    }

    // Отправка запроса на удаление; обновление стора
    function requestDeleteRow(){
        const selectedRowsId = selectedRows.map(el => el["movie_id"])
        deleteRows(selectedRowsId)
        .then(data => {
            if(data){
                tables.deleteRecMovie(selectedRowsId)
                setData(data)
                setModalActive(true)
            }
        })
        .catch(error => {
            setError(error.request.response)
            setModalActive(true)
        })
    }

    return (
        <div className='tables__table'>
            <div className='table__title'>
                <h2 className='title__name'>Table {table.tableName}</h2>
                {table.tableName === 'movies' &&
                <div className='title__api'>
                    <button className='api__button' onClick={ () => requestAddRow(inputRow)}>
                        <img src={addIcon} className='icon-api' alt='add'></img>
                    </button>
                    <button className='api__button'>
                        <img src={editIcon} className='icon-api' alt='edit' onClick={ () => requestUpdateRow(rowData)}></img>
                    </button>
                    <button className='api__button' onClick={ () => requestDeleteRow()}>
                        <img src={deleteIcon} className='icon-api' alt='delete'></img>
                    </button>
                </div>
                }
            </div>
            <div id="myGrid" className='ag-theme-alpine'>
                <AgGridReact
                    // Размеры
                    onGridSizeChanged={onGridSizeChanged}
                    domLayout={'autoHeight'}
                    // Редактирование
                    pinnedTopRowData={(table.tableName === 'movies') ? [inputRow] : []}
                    onSelectionChanged={onSelectionChanged}
                    suppressRowHoverHighlight={suppressRowHoverHighlight}
                    // eslint-disable-next-line
                    rowSelection={(table.tableName === 'movies') ? rowSelect = 'multiple' : rowSelect = ''}
                    // Значения
                    rowData={rowData}
                    columnDefs={columnDefs}/>
            </div>
            {table.tableName === 'movies' &&
                <ModalError data={data} setData={setData} error={error} setError={setError} active={modalActive} setActive={setModalActive} />
            }
        </div>
    )
})

export default TableElement