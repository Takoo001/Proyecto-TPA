import { Widget, SensorPayload } from "../interfaces/Widget";

export class GraficoCircular implements Widget {
    id: string;
    tipo: string = "circular";
    private lastData: SensorPayload | null = null;

    constructor(id: string) {
        this.id = id;
    }

    update(data: SensorPayload): void {
        this.lastData = data;
        console.log(`[Widget:${this.id}] Circular — CO₂: ${data.co2} kg`);
    }

    getLastData(): SensorPayload | null {
        return this.lastData;
    }
}