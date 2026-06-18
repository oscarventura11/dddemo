import "reflect-metadata";
import { Container } from "inversify";
import { CategoryRepository } from "../../domain/repositories/CategoryRepository";
import { FakeCategoryRepository } from "../repositories/FakeCategoryRepository";
import { CategoryState } from "../../application/state/CategoryState";
import { CategoryReadService } from "../../application/services/CategoryReadService";
import { CategoryWriteService } from "../../application/services/CategoryWriteService";

import { NotificationRepository } from "../../../shared/notification/domain/repositories/NotificationRepository";
import { LocalNotificationRepository } from "../../../shared/notification/infrastructure/repositories/LocalNotificationRepository";
import { NotificationState } from "../../../shared/notification/application/state/NotificationState";
import { NotificationService } from "../../../shared/notification/application/services/NotificationService";
import { ErrorManager } from "../../../shared/error/application/services/ErrorManager";
import { AppErrorManager } from "../../../shared/error/application/services/AppErrorManager";

import { ConsolidationPolicy } from "../../../shared/policy/domain/repositories/PolicyProvider";
import { CategoryConsolidationPolicy } from "../../../shared/policy/infrastructure/providers/CategoryConsolidationPolicy";
import { PolicyState } from "../../../shared/policy/application/state/PolicyState";
import { PolicyService } from "../../../shared/policy/application/services/PolicyService";

const container = new Container();

// Category Module
container.bind<CategoryState>(CategoryState).toSelf().inSingletonScope();
container
  .bind<CategoryReadService>(CategoryReadService)
  .toSelf()
  .inSingletonScope();
container
  .bind<CategoryWriteService>(CategoryWriteService)
  .toSelf()
  .inSingletonScope();
container
  .bind(CategoryRepository)
  .to(FakeCategoryRepository)
  .inSingletonScope();

// Shared: Notification
container
  .bind<NotificationState>(NotificationState)
  .toSelf()
  .inSingletonScope();
container
  .bind<NotificationService>(NotificationService)
  .toSelf()
  .inSingletonScope();
container
  .bind(NotificationRepository)
  .to(LocalNotificationRepository)
  .inSingletonScope();

// Shared: Error
container.bind(ErrorManager).to(AppErrorManager).inSingletonScope();

// Shared: Policy
container.bind<PolicyState>(PolicyState).toSelf().inSingletonScope();
container.bind<PolicyService>(PolicyService).toSelf().inSingletonScope();
container
  .bind<ConsolidationPolicy>(ConsolidationPolicy)
  .to(CategoryConsolidationPolicy)
  .inSingletonScope();

export { container };
