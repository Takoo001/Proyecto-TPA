import { Widget, SensorPayload } from "../interfaces/Widget";

export class GraficoLinea implements Widget {
    id: string;
    tipo: string = "linea";
    private historial: SensorPayload[] = [];
    private maxPuntos: number = 200;

    constructor(id: string) {
        this.id = id;
    }

    update(data: SensorPayload): void {
        this.historial.push(data);
        if (this.historial.length > this.maxPuntos) {
            this.historial.shift();
        }
        console.log(`[Widget:${this.id}] Línea — ${data.tipo}: ${data.valor} ${data.unidad}, CO₂: ${data.co2} kg`);
    }

    getLastData(): SensorPayload | null {
        return this.historial.length > 0
            ? this.historial[this.historial.length - 1]
            : null;
    }

    getHistorial(): SensorPayload[] {
        return [...this.historial];
    }
}