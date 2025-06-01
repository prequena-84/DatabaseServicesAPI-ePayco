import { connectDB, mongoose } from '../../config/config-mongo'
import Transaccion from '../../db/models/transaccion'

import type {  IReporte, IReporteResp, } from 'interfaces/IReporte-transacciones'

export default async function reportCliente(): Promise<IReporteResp> {
    try {

        await connectDB()

        // queda pendiente definir la estructura del reporte
        const report/*:IReporte[]*/ = await Transaccion.aggregate([
            {
                $lookup: {
                  from: "usuarios",        // Tabla a unificar
                  localField: "usuario_doc",      // Campo en Usuario (tabla importada)
                  foreignField: "documento",  // Campo en Transaccion
                  as: "Usuario", // Nombre del campo donde se guardará la información combinada
                }
            },
            {
                $unwind: "$Usuario"
            },
        ])  

        return {
            data:report,
            message: 'Reporte de Trasacciones',
        }
    } catch(err) {

        console.error('Error en reporte', err);

        return {
            data:null,
            message: 'Error en Reporte de Trasacciones',
        }
    } finally {
        mongoose.connection.close()
    }
}