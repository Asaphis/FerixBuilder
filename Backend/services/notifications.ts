import type { DeliveryEvent } from "../../shared/contracts/workspace";

/** Backend boundary for future customer notifications. */
export type NotificationChannel = "in_app" | "email";

export type NotificationDispatch = {
  event: DeliveryEvent;
  channels: NotificationChannel[];
};

export interface NotificationService {
  dispatch(input: NotificationDispatch): Promise<void>;
}

/** Safe bootstrap implementation: no provider is activated yet. */
export const notificationService: NotificationService = {
  async dispatch() {
    return Promise.resolve();
  },
};
