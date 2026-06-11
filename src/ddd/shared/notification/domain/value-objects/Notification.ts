export enum NotificationType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning"
}

export class Notification {
  constructor(
    public readonly message: string,
    public readonly type: NotificationType = NotificationType.INFO
  ) {}

  public static create(message: string, type: NotificationType): Notification {
    return new Notification(message, type);
  }
}
