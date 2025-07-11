import { loggerService } from '../logger/logger.service';
import type { EventType, Handler } from './interface/EventBus';

export const eventBusService = () => {
  // A map to hold event handlers for different event types
  const handlers: { [key: string]: Set<Handler> } = {};

  // A map to hold once-only event handlers for different event types
  const onceHandlers: { [key: string]: Set<Handler> } = {};

  /**
   * Registers a handler for a specific event type.
   * @param {EventType} type - The event type to listen for.
   * @param {Handler} handler - The function to call when the event is emitted.
   */
  const on = (type: EventType, handler: Handler) => {
    // If the event type does not exist, create a new Set for it
    if (!handlers[type]) {
      handlers[type] = new Set<Handler>();
    }
    // Add the handler to the Set for this event type
    loggerService().info(`${type} Event received.`);
    handlers[type].add(handler);
  };

  /**
   * Unregisters a handler for a specific event type.
   * @param {EventType} type - The event type to stop listening for.
   * @param {Handler} handler - The function to remove from the event.
   */
  const off = (type: EventType, handler: Handler) => {
    // If the event type exists, remove the handler from its Set
    if (handlers[type]) {
      loggerService().warn(`${type} Event removed.`);
      handlers[type].delete(handler);
    }
  };

  /**
   * Emits an event of a specific type, calling all registered handlers.
   * @param {EventType} type - The event type to emit.
   * @param {any} event - The event data to pass to the handlers.
   */
  const emit = (type: EventType, event: any) => {
    // Call regular handlers for this event type
    if (handlers[type]) {
      handlers[type].forEach((handler) => handler(event));
    }

    // Call once-only handlers for this event type and remove them
    if (onceHandlers[type]) {
      onceHandlers[type].forEach((handler) => {
        loggerService().info(`${type} Event - ${event} - emitted.`);
        handler(event); // Call the handler with the event data
        onceHandlers[type]?.delete(handler); // Remove after executing
      });
    }
  };

  /**
   * Registers a handler that will be called only once for a specific event type.
   * @param {EventType} type - The event type to listen for.
   * @param {Handler} handler - The function to call when the event is emitted.
   */
  const once = (type: EventType, handler: Handler) => {
    // If the event type does not exist in onceHandlers, create a new Set
    if (!onceHandlers[type]) {
      onceHandlers[type] = new Set<Handler>();
    }
    // Add the handler to the Set for this event type
    loggerService().info(`${type} Event received once.`);
    onceHandlers[type].add(handler);
  };

  /**
   * Unregisters a once-only handler for a specific event type.
   * @param {EventType} type - The event type to stop listening for.
   * @param {Handler} handler - The function to remove from the once handlers.
   */
  const offOnce = (type: EventType, handler: Handler) => {
    // If the once handler set exists for this type, remove the handler
    if (onceHandlers[type]) {
      loggerService().warn(`${type} Event removed.`);
      onceHandlers[type].delete(handler);
    }
  };

  /**
   * Registers a handler that listens to all event types.
   * @param {Handler} handler - The function to call for any emitted event.
   */
  const onWildcard = (handler: Handler) => {
    // Add the handler to all existing event types' handlers
    Object.keys(handlers).forEach((type) => {
      loggerService().info(`All events received.`);
      handlers[type]?.add(handler);
    });
  };

  /**
   * Unregisters a wildcard handler from all event types.
   * @param {Handler} handler - The function to remove from all event types.
   */
  const offWildcard = (handler: Handler) => {
    // Remove the handler from all event types' handlers
    Object.keys(handlers).forEach((type) => {
      if (handlers[type]) {
        loggerService().warn(`${type} Event removed.`);
        handlers[type].delete(handler);
      }
    });
  };

  // Return the event bus API, providing it to the Nuxt application
  return {
    provide: {
      eventBus: { on, off, emit, once, offOnce, onWildcard, offWildcard },
    },
  };
};
