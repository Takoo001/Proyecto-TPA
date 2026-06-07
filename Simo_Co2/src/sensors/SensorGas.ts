import { Sensor } from "../interfaces/Sensor";

export class SensorGas implements Sensor {
    id: string;
    tipo: string = "gas";
    unidad: string = "m³";
    private baseValue: number = 55;

    constructor(id: string) {
        this.id = id;
    }

    generarDato(): number {
        const fluctuacion = (Math.random() - 0.5) * 25;
        const pico = Math.random() < 0.08 ? Math.random() * 40 : 0;
        this.baseValue = Math.max(15, Math.min(150, this.baseValue + fluctuacion * 0.25));
        return parseFloat((this.baseValue + pico).toFixed(2));
    }
}