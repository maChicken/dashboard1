import Tables from './pages/tables'
import What from './pages/faq'
import { TABLES_ROUTE, WHAT_ROUTE } from './utils/consts'

export const routes = [
    {
        path: TABLES_ROUTE,
        Component: Tables
    },
    {
        path: WHAT_ROUTE,
        Component: What
    }
]