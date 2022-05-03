import App from './app.js';

App.getInstance().then((app) => {
  app.server.listen(app.server.get('PORT'), () => {
    console.info(`Listening on port ${app.server.get('PORT')}`);
  });

  global.app = Object.freeze(app);
});
