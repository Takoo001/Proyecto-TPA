export interface SensorPayload {
    sensorId: string;
    tipo: string;
    valor: number;
    co2: number;
    unidad: string;
    timestamp: number;
}

export interface Widget {
    id: string;
    tipo: string;
    update(data: SensorPayload): void;
    getLastData(): SensorPayload | null;
}