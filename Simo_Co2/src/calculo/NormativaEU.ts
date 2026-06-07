import { CalculoStrategy } from "../calculo/CalculoStrategy";

// Factores de emisión europeos (kg CO2 por unidad)
// Fuente: European Environment Agency (EEA) 2024
export class NormativaEU implements CalculoStrategy {
    nombre: string = "Normativa Europea";

    calcular(consumo: number, tipo: string): number {
        const factores: Record<string, number> = {
            agua: 0.344,  // kg CO2 por m³ (promedio europeo)
            luz:  0.233,  // kg CO2 por kWh (mix eléctrico UE)
            gas:  1.884,  // kg CO2 por m³ gas natural
        };
        const factor = factores[tipo] ?? 0.3;
        return parseFloat((consumo * factor).toFixed(3));
    }
}