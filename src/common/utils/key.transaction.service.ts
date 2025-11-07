import * as crypto from "crypto"

export default function numberTransaction(): string {
    return crypto.randomBytes(10).toString('hex')
};