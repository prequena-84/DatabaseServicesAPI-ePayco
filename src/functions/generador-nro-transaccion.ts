import crypto from "crypto"

export default function nroTransaccion(): string {
    // randomBytes(3)
    return crypto.randomBytes(10).toString('hex')
}