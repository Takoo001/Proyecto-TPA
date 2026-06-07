import { Sensor } from "../interfaces/Sensor";
import { Widget, SensorPayload } from "../interfaces/Widget";
import { CalculoStrategy } from "../calculo/CalculoStrategy";
import { NormativaChile } from "../calculo/NormativaChile";

export interface HistoricoEntry {
    timestamp: number;
    sensorId: string;
    tipo: string;
    valor: number;
    co2: number;
    unidad: string;
}

// PATRÓN SINGLETON
// Un único punto de verdad para todo el estado de la aplicación.
export class Repositorio {
    private static instancia: Repositorio;

    sensores: Map<string, Sensor> = new Map();
    widgets: Map<string, Widget> = new Map();
    historico: HistoricoEntry[] = [];
    estrategiaActual: CalculoStrategy = new NormativaChile();
    normativaActual: string = "Chile";
    private maxHistorico: number = 100;

    private constructor() {}

    static getInstancia(): Repositorio {
        if (!Repositorio.instancia) {
            Repositorio.instancia = new Repositorio();
        }
        return Repositorio.instancia;
    }

    registrarSensor(sensor: Sensor): void {
        this.sensores.set(sensor.id, sensor);
    }

    registrarWidget(widget: Widget): void {
        this.widgets.set(widget.id, widget);
    }

    agregarHistorico(entry: HistoricoEntry): void {
        this.historico.push(entry);
        if (this.historico.length > this.maxHistorico) {
            this.historico.shift();
        }
    }

    cambiarEstrategia(estrategia: CalculoStrategy, nombre: string): void {
        this.estrategiaActual = estrategia;
        this.normativaActual = nombre;
        console.log(`[Repositorio] Normativa cambiada a: ${nombre}`);
    }

    getCO2Total(): number {
        const recientes = this.historico.slice(-10);
        return parseFloat(recientes.reduce((sum, e) => sum + e.co2, 0).toFixed(3));
    }
}