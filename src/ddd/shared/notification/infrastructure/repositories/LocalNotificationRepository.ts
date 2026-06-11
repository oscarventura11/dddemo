import { injectable } from "inversify";
import { NotificationRepository } from "../../domain/repositories/NotificationRepository";
import { Notification } from "../../domain/value-objects/Notification";

@injectable()
export class LocalNotificationRepository extends NotificationRepository {
  public notify(notification: Notification): void {
    console.log("[Notification] " + notification.type + ": " + notification.message);
  }
}
