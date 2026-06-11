import { Notification } from "../value-objects/Notification";

export abstract class NotificationRepository {
  public abstract notify(notification: Notification): void;
}
