import type { EventBusCallbackType } from "@/configs/types/plugins";

export class EventBus {
  private events: Record<string, EventBusCallbackType<any>[]> = {};

  public on<T>(eventName: string, callback: EventBusCallbackType<T>) {
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      this.events[eventName] = [callback];
    }
  }

  public off<T>(eventName: string, callback: EventBusCallbackType<T>) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback);
    } else {
      this.events[eventName] = [];
    }
  }

  public emit<T>(eventName: string, params?: T) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback(params);
      });
    }
  }

  public once<T>(eventName: string, callback: EventBusCallbackType<T>) {
    const handler = (params: T) => {
      callback(params);
      this.off(eventName, callback);
    };

    if (this.events[eventName]) {
      this.events[eventName].push(handler);
    } else {
      this.events[eventName] = [handler];
    }
  }
}

export const eventBus = new EventBus();
