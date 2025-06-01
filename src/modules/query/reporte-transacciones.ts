import { connectDB, mongoose } from '../../config/config-mongo'
import Usuario from '../../db/models/usuario'

import type {  IReporte, IReporteResp, } from 'interfaces/IReporte-transacciones'

export default async function reportCliente(): Promise<IReporteResp> {
    try {
        await connectDB()

        const report:IReporte[] = await Usuario.aggregate([
            {
                $lookup: {
                  from: "Transaccion",        // Tabla a unificar
                  localField: "usuario_doc",      // Campo de ID colección de Tabla a unificar
                  foreignField: "documento",         // Campo de ID colección de clientes
                  as: "Repote_Transacciones", // Nombre del campo donde se guardará la información combinada
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
        return {
            data:null,
            message: 'Reporte de Cliente',
        }
    } finally {
        mongoose.connection.close()
    }
}