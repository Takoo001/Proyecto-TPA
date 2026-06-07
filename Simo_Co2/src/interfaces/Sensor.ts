export interface Sensor {
    id: string;
    tipo: string;
    unidad: string;
    generarDato(): number;
}