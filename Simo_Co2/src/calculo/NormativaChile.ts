import { CalculoStrategy } from "../calculo/CalculoStrategy";

// Factores de emisión chilenos (kg CO2 por unidad)
// Fuente: Ministerio del Medio Ambiente Chile
export class NormativaChile implements CalculoStrategy {
    nombre: string = "Normativa Chile";

    calcular(consumo: number, tipo: string): number {
        const factores: Record<string, number> = {
            agua: 0.149,  // kg CO2 por m³
            luz:  0.295,  // kg CO2 por kWh (red SIC Chile)
            gas:  2.04,   // kg CO2 por m³ gas natural
        };
        const factor = factores[tipo] ?? 0.5;
        return parseFloat((consumo * factor).toFixed(3));
    }
}