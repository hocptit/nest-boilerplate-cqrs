import * as dotenv from 'dotenv';
import { BootstrapConsole } from 'nestjs-console';

import { AppModule } from './app.module';

dotenv.config();

const bootstrap = new BootstrapConsole({
  module: AppModule,
  useDecorators: true,
  contextOptions: {
    logger: false,
  },
});
bootstrap.init().then(async (app) => {
  try {
    await app.init();
    await bootstrap.boot();
    await app.close();
    process.exit(0);
  } catch (e) {
    console.error(e);
    await app.close();
    process.exit(1);
  }
});
