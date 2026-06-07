import { Sensor } from "../interfaces/Sensor";

export class SensorLuz implements Sensor {
    id: string;
    tipo: string = "luz";
    unidad: string = "kWh";
    private baseValue: number = 30;

    constructor(id: string) {
        this.id = id;
    }

    generarDato(): number {
        const fluctuacion = (Math.random() - 0.5) * 15;
        this.baseValue = Math.max(5, Math.min(80, this.baseValue + fluctuacion * 0.2));
        return parseFloat(this.baseValue.toFixed(2));
    }
}