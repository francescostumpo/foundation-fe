export type EventType = string; // Represents the type of an event (a string)

export type Handler<T = any> = (event: T) => void; // A function that handles events

export interface EventBus {
  on(type: EventType, handler: Handler): void; // Register a handler for an event
  off(type: EventType, handler: Handler): void; // Unregister a handler for an event
  emit(type: EventType, event: any): void; // Emit an event with data
  once(type: EventType, handler: Handler): void; // Register a one-time handler for an event
  offOnce(type: EventType, handler: Handler): void; // Unregister a one-time handler
  onWildcard(handler: Handler): void; // Register a handler for all events
  offWildcard(handler: Handler): void; // Unregister a handler for all events
}
