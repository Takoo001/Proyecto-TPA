import { Usuario } from "./Usuario";

export class Operador extends Usuario {
    constructor(nombre: string = "Operador") {
        super("operador", nombre);
    }

    verAlertas(): boolean {
        return true;
    }
}