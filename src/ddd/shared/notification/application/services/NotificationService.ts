import { inject, injectable } from "inversify";
import { Notification, NotificationType } from "../../domain/value-objects/Notification";
import { NotificationRepository } from "../../domain/repositories/NotificationRepository";
import { NotificationState } from "../state/NotificationState";

@injectable()
export class NotificationService {
  constructor(
    @inject(NotificationRepository) private readonly _repository: NotificationRepository,
    @inject(NotificationState) private readonly _state: NotificationState
  ) {}

  public success(message: string): void {
    this.notify(message, NotificationType.SUCCESS);
  }

  public error(message: string): void {
    this.notify(message, NotificationType.ERROR);
  }

  private notify(message: string, type: NotificationType): void {
    const notification = Notification.create(message, type);
    this._repository.notify(notification);
    this._state.set(notification);
  }

  public clear(): void {
    this._state.set(null);
  }
}
