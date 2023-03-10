import {Routes, Route, Navigate} from 'react-router-dom'
import {routes} from '../routes'
import { TABLES_ROUTE } from '../utils/consts'

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} />
            )}
            <Route path='*' element={<Navigate to={TABLES_ROUTE}/>} />
        </Routes>
    )
}

export default AppRouter
