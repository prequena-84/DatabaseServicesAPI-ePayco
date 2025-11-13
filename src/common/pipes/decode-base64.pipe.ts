import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class DecodeBase64Pipe implements PipeTransform {
    transform(value: any, _metadata: ArgumentMetadata) {
        if (typeof value === 'object' && value !== null) {
            for (const key in value) {
                if (typeof value[key] === 'string') {
                    try {
                        // Decodificar Base64
                        const decoded = Buffer.from(value[key], 'base64').toString('utf-8');
                        
                        // Verificar si contiene solo números
                        if (/^\d+$/.test(decoded)) {
                            value[key] = Number(decoded);
                        } else {
                            value[key] = decoded;
                        }
                    } catch (err) {
                        // Si falla la decodificación, dejar el valor original
                        console.warn(`No se pudo decodificar Base64 para key: ${key}`, err);
                    };
                };
            };
        };
        return value;
    };
};