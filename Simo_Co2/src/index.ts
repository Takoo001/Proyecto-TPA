import { SensorFactory }   from "./factory/SensorFactory";
import { WidgetFactory }   from "./factory/WidgetFactory";
import { DataDistributor } from "./distributor/DataDistributor";
import { Repositorio }     from "./repository/Repositorio";
import { NormativaChile }  from "./calculo/NormativaChile";
import { NormativaEU }     from "./calculo/NormativaEU";

console.log("=== SIMO CO2 — Avance 3 ===\n");

const repo  = Repositorio.getInstancia();
const repo2 = Repositorio.getInstancia();
console.log("Singleton OK:", repo === repo2);

const sAgua = SensorFactory.crear("agua");
const sLuz  = SensorFactory.crear("luz");
const sGas  = SensorFactory.crear("gas");
repo.registrarSensor(sAgua);
repo.registrarSensor(sLuz);
repo.registrarSensor(sGas);
console.log(`Sensores creados: ${repo.sensores.size}`);

const wLinea    = WidgetFactory.crear("linea");
const wCircular = WidgetFactory.crear("circular");
repo.registrarWidget(wLinea);
repo.registrarWidget(wCircular);

const distributor = new DataDistributor();
distributor.subscribe(wLinea);
distributor.subscribe(wCircular);
console.log(`Observers suscritos: ${distributor.getObserversCount()}`);

repo.cambiarEstrategia(new NormativaChile(), "Chile");

console.log("\n--- Simulación con Normativa Chile ---");
let ciclo = 0;
const interval = setInterval(() => {
    if (ciclo === 5) {
        repo.cambiarEstrategia(new NormativaEU(), "EU");
        console.log("\n[Strategy] Normativa cambiada a EU\n");
    }
    if (ciclo >= 7) {
        clearInterval(interval);
        console.log(`\nCO₂ Total acumulado: ${repo.getCO2Total()} kg`);
        console.log("=== Fin ===");
        return;
    }
    [sAgua, sLuz, sGas].forEach(sensor => {
        const valor = sensor.generarDato();
        const co2   = repo.estrategiaActual.calcular(valor, sensor.tipo);
        const payload = {
            sensorId: sensor.id, tipo: sensor.tipo,
            valor, co2, unidad: sensor.unidad, timestamp: Date.now()
        };
        repo.agregarHistorico({ ...payload });
        distributor.notify(payload);
        console.log(`[${sensor.tipo.padEnd(4)}] ${valor.toFixed(2).padStart(7)} ${sensor.unidad}  →  CO₂: ${co2.toFixed(3)} kg  (${repo.normativaActual})`);
    });
    ciclo++;
}, 800);