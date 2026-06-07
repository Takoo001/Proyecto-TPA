import { Sensor } from "../interfaces/Sensor";
import { SensorAgua } from "../sensors/SensorAgua";
import { SensorLuz } from "../sensors/SensorLuz";
import { SensorGas } from "../sensors/SensorGas";

// PATRÓN FACTORY
// Centraliza la creación de sensores. Si se añade un nuevo tipo,
// solo se modifica esta clase — el resto del sistema no se toca.
export class SensorFactory {
    private static contador: number = 0;

    static crear(tipo: "agua" | "luz" | "gas"): Sensor {
        const id = `S${++this.contador}-${tipo.toUpperCase()}`;
        switch (tipo) {
            case "agua": return new SensorAgua(id);
            case "luz":  return new SensorLuz(id);
            case "gas":  return new SensorGas(id);
            default:
                throw new Error(`Tipo de sensor desconocido: ${tipo}`);
        }
    }
}