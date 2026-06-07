import { Sensor } from "../interfaces/Sensor";

export class SensorAgua implements Sensor {
    id: string;
    tipo: string = "agua";
    unidad: string = "m³";
    private baseValue: number = 45;

    constructor(id: string) {
        this.id = id;
    }

    generarDato(): number {
        const fluctuacion = (Math.random() - 0.5) * 20;
        const pico = Math.random() < 0.1 ? Math.random() * 30 : 0;
        this.baseValue = Math.max(10, Math.min(120, this.baseValue + fluctuacion * 0.3));
        return parseFloat((this.baseValue + pico).toFixed(2));
    }
}