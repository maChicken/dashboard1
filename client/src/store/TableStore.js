import {makeAutoObservable} from 'mobx'

export default class TableStore {
    constructor() {
        this._movie = {
            tableName: '',
            tableRecords: '',
            tableAtr: ''
        }
        this._characters = {
            tableName: '',
            tableRecords: '',
            tableAtr: ''
        }
        this._tables = []
        makeAutoObservable(this)
    }

    setTables(tables) {
        this._movie.tableName = tables.tablesName[0]
        this._movie.tableRecords= tables.tablesRows[0]
        this._movie.tableAtr = tables.tablesAtr[0]
        this._characters.tableName = tables.tablesName[1]
        this._characters.tableRecords = tables.tablesRows[1]
        this._characters.tableAtr = tables.tablesAtr[1]
        this._tables[0] = this._movie
        this._tables[1] = this._characters
    }

    get tables() {
        return this._tables
    }

    deleteRecMovie(ids) {
        let newRecords = []
        this._movie.tableRecords.forEach( el => {
            if (!(ids.includes(el.movie_id))) {
                newRecords.push(el)
            }
        })
        this._movie.tableRecords = newRecords
        newRecords = []
        this._characters.tableRecords.forEach( el => {
            if (!(ids.includes(el.movie_id))) {
                newRecords.push(el)
            }
        })
        this._characters.tableRecords = newRecords
    }

    addRecMovie(rec) {
        const id = (this._movie.tableRecords[this._movie.tableRecords.length-1].movie_id)
        rec['movie_id'] = id + 1
        this._movie.tableRecords.push(rec)
    }

    updateRecMovie(recs) {
        this._movie.tableRecords = recs
    }
}