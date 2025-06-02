// Importación de class Router y Servidor
import routerInstancia from '../class/class-router'

// Servicios VRouter Servicios
import AGREGAR_TRANSACCION from '../routers/transaccion/router-agregar'
import ACTUALIZAR_TRANSACCION from '../routers/transaccion/router.modificar'
import REPORTE_TRANSACCION from '../routers/reporte/router-reporte'
import CONSULTA_TRANSACCION from '../routers/consulta/router-consulta-id-transaccion'

// Importación de tipos
import type { TRequest,TResponse } from 'types/TRouter'

// Instancia de la clase Servido y Router
const CR = new routerInstancia(), Router = CR.Router()

// Importación de la descripcion del servicio
Router.get('/', async( _req:TRequest, res:TResponse ): Promise<void> => {
    try {
        res.status(200).send({
            message:'Bienvenido al Servicio de Transacciones',
        })
    } catch (err) {
        res.status(500).send({
            mensaje:`error en la peticion: ${err}`,
        })
    }
}) 

Router.use('/agregar', AGREGAR_TRANSACCION)
Router.use('/consulta-id-transaccion',CONSULTA_TRANSACCION)
Router.use('/actualizar',ACTUALIZAR_TRANSACCION)
Router.use('/reporte', REPORTE_TRANSACCION)

export default Router