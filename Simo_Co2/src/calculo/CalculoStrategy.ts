export interface CalculoStrategy {
    nombre: string;
    calcular(consumo: number, tipo: string): number;
}