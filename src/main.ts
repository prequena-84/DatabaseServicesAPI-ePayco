import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filter/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0', () => {
    console.log(`API Entorno ${process.env.NODE_ENV} corriendo en localhost:${process.env.PORT ?? 3000}/api/v1/service/db`) 
  });
};
bootstrap();