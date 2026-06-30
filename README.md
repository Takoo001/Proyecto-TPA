# SIMO CO2 — Sistema de Monitoreo de Huella de Carbono

**Taller de Programación Aplicada · 3° Semestre · Ingeniería Civil en Informática**  
Universidad de Los Lagos 

---

## Descripción

SIMO CO2 es una plataforma web de visualización industrial diseñada para monitorear el consumo energético y la huella de carbono en plantas de producción. El sistema simula sensores industriales en tiempo real y presenta métricas clave a través de un dashboard interactivo con gráficos animados.

La arquitectura está dividida en módulos desacoplados, lo que permite extender el sistema —agregar nuevos sensores, gráficos o normativas— sin modificar el núcleo existente.

---

## Funcionalidades

- Monitoreo en tiempo real con tres sensores (agua, electricidad, gas) generando lecturas cada 300ms
- Simulación trimestral: cada 10 segundos equivale a una semana; el gráfico se reinicia al completar 12 semanas
- Cambio de normativa en vivo entre Normativa Chilena DS-138 e ISO 14064 Europea
- Dashboard con gráfico de barras semanal animado y gráfico de dona con impacto de CO₂ por sensor
- Generación de informes PDF con descarga directa desde el dashboard
- Control de acceso por roles: Operador y Administrador

---

## Arquitectura — Módulos y Patrones GoF

| Módulo | Nombre | Patrón | Descripción |
|--------|--------|--------|-------------|
| A | Emulación de Sensores | — | Genera lecturas de agua, electricidad y gas |
| B | Distribución de Datos | Observer | Propaga cambios a todos los widgets suscritos |
| C | Visualización | — | WidgetLinea, WidgetTorta y WidgetBarras implementan IWidget |
| D | Motor de Cálculo | Strategy | Intercambia la fórmula de kg CO₂ según la normativa activa |
| E | Repositorio Global | Singleton | Estado único compartido: sensores, normativa e historial |

---

## Estructura del Proyecto

```
simoco2/
├── index.html              # Pantalla de login
├── dashboard.html          # Dashboard principal
├── style.css               # Estilos unificados (login + dashboard)
├── images/
│   └── logos/
│       ├── logo_1.png
│       └── logo_2.png
└── src/                    # Codigo TypeScript
    ├── types/
    │   └── index.ts
    └── modules/
        ├── sensorEmulator/
        ├── dataDistribution/
        ├── visualization/
        ├── environmentalCalc/
        ├── repository/
        └── roles/
```

---

## Instalación y Ejecución

**Requisitos**
- [Visual Studio Code](https://code.visualstudio.com/)
- Extensión **Live Server** de Ritwick Dey

**Pasos**

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/simoco2.git
   cd simoco2
   ```

2. Abre el proyecto en VS Code:
   ```bash
   code .
   ```

3. Instala la extensión Live Server desde el panel de Extensiones (`Ctrl+Shift+X`).

4. Haz clic derecho sobre `index.html` y selecciona **Open with Live Server**.  
   El navegador abrirá en `http://127.0.0.1:5500`.

---

## Flujo de la simulación

```
Cada 300ms   →  Sensor genera lectura  →  Observer notifica widgets  →  Gráficos se animan
Cada 10s     →  Se consolida la semana  →  Barra fija en el gráfico trimestral
A las 12 sem →  Nuevo trimestre         →  Los graficos se reinicia, historial se conserva
```

---

## Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| HTML5 + CSS3 | Estructura y estilos |
| JavaScript ES6+ | Lógica de patrones y simulación |
| TypeScript | Tipado estático de interfaces y clases |
| [ECharts 5](https://echarts.apache.org/) | Gráficos animados |
| [jsPDF 2.5](https://github.com/parallax/jsPDF) | Generación de PDF en el navegador |
| Live Server | Servidor de desarrollo local |

---
