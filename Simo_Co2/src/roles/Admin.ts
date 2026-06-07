import { Usuario } from "./Usuario";

export class Admin extends Usuario {
    constructor(nombre: string = "Administrador") {
        super("admin", nombre);
    }

    puedeConfigurar(): boolean {
        return true;
    }

    cambiarNormativa(): boolean {
        return true;
    }

    agregarWidget(): boolean {
        return true;
    }
}