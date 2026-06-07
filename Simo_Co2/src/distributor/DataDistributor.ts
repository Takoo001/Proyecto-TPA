import { Widget, SensorPayload } from "../interfaces/Widget";

export class DataDistributor {
    private observers: Map<string, Widget> = new Map();

    subscribe(widget: Widget): void {
        this.observers.set(widget.id, widget);
        console.log(`[Distributor] Widget ${widget.id} suscrito.`);
    }

    unsubscribe(widgetId: string): void {
        this.observers.delete(widgetId);
        console.log(`[Distributor] Widget ${widgetId} desuscrito.`);
    }

    notify(payload: SensorPayload): void {
        this.observers.forEach(widget => widget.update(payload));
    }

    getObserversCount(): number {
        return this.observers.size;
    }
}