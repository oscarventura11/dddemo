import { signal, Signal } from "@preact/signals";
import { injectable } from "inversify";
import { Notification } from "../../domain/value-objects/Notification";

@injectable()
export class NotificationState {
  private readonly _current = signal<Notification | null>(null);

  public get current(): Signal<Notification | null> {
    return this._current;
  }

  public set(notification: Notification | null): void {
    this._current.value = notification;
  }
}
