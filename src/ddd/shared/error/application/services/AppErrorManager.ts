import { inject, injectable } from "inversify";
import { ErrorManager } from "./ErrorManager";
import { NotificationService } from "../../../notification/application/services/NotificationService";

@injectable()
export class AppErrorManager extends ErrorManager {
  constructor(
    @inject(NotificationService)
    private readonly _notificationService: NotificationService,
  ) {
    super();
  }

  public handleError(error: any): void {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[ErrorManager]", error);
    this._notificationService.error(message);
  }
}
