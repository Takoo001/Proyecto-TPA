import { Widget } from "../interfaces/Widget";
import { GraficoLinea } from "../widgets/GraficoLinea";
import { GraficoCircular } from "../widgets/GraficoCircular";

// PATRÓN FACTORY
// El dashboard pide "dame un widget de tipo X" sin saber
// qué clase concreta se instancia.
export class WidgetFactory {
    private static contador: number = 0;

    static crear(tipo: "linea" | "circular"): Widget {
        const id = `W${++this.contador}-${tipo.toUpperCase()}`;
        switch (tipo) {
            case "linea":    return new GraficoLinea(id);
            case "circular": return new GraficoCircular(id);
            default:
                throw new Error(`Tipo de widget desconocido: ${tipo}`);
        }
    }
}