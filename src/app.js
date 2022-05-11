import boot from './bootloaders/index.js';

const App = (() => {
  let instance;

  const createInstance = async () => {
    const initialApp = {
      models: {},
    };
    const app = await boot(initialApp);
    return app;
  };

  return {
    getInstance: async () => {
      if (!instance) {
        instance = await createInstance();
      }
      return instance;
    },
  };
})();

export default App;
