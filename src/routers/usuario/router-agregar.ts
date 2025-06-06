import bodyParser from 'body-parser'
import routerInstancia from '../../class/class-router'
import agregarUsuario from  '../../modules/agregar/agregar-usuario'
import type { IUsuario } from 'interfaces/IUsuario'
import type { TRequest,TResponse } from 'types/TRouter'

const CR = new routerInstancia(), Router = CR.Router()
Router.use(bodyParser.json())

Router.post('/', async ( req:TRequest, res:TResponse ): Promise<void> => {
    try {
        const datoUsuario:IUsuario = req.body;
        const respUsuario = await agregarUsuario(datoUsuario)

        res.status(200).send({
            data:respUsuario.data,
            message: respUsuario.message,
        })
    } catch(err) {
        res.status(500).send({
            data:null,
            message:`Error en el registro de datos: ${err}`,
        })
    }
})

export default Router