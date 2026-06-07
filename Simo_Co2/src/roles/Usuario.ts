export class Usuario {
    rol: string;
    nombre: string;

    constructor(rol: string, nombre: string = "Anónimo") {
        this.rol = rol;
        this.nombre = nombre;
    }

    puedeVerDashboard(): boolean {
        return true;
    }

    puedeConfigurar(): boolean {
        return false;
    }
}