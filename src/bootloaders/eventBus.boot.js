import fs from 'fs';
import path from 'path';
import EventEmitter from 'events';

class EventBus extends EventEmitter {}

export default async (appParam) => {
  const app = appParam;
  const eventBus = new EventBus();
  const { pathname } = new URL('../events', import.meta.url);

  const eventFiles = fs.readdirSync(pathname);

  const registerEvent = async (eventFile) => {
    const { handler } = await import(path.join(pathname, eventFile));
    const eventName = eventFile.slice(0, -3);

    const eventHandlerWrapper = async (payload, meta = {}) => {
      const maxRetries = meta.maxRetries || 3;
      const createdAt = meta.createdAt || new Date().getTime();
      const retryCount = meta.retryCount || 0;

      try {
        await handler(...payload);
      } catch (error) {
        if (retryCount < maxRetries) {
          eventBus.emit(eventName, payload, {
            ...meta,
            maxRetries,
            createdAt,
            retryCount: retryCount + 1,
          });
        } else {
          console.error(error);
        }
      }
    };

    eventBus.on(eventName, eventHandlerWrapper);
  };

  await Promise.all(eventFiles.map(registerEvent));

  app.eventBus = {
    dispatch: (...args) => eventBus.emit(...args),
  };

  return app;
};
