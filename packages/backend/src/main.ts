import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './module/app.module';
import * as bodyParser from 'body-parser';

const corsOption = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3400',
    'http://localhost:3500'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

async function bookstore() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' })); // Set the limit according to your needs
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  const config = new DocumentBuilder()
    .setTitle('LMS')
    .setDescription('Node JS + Nest JS + Mongoose + MongoDB')
    .setVersion('1.0.0')
    .setContact('Email', 'mailto:rahathossenmanik@gmail.com', 'rahathossenmanik@gmail.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors(corsOption);

  await app.listen(process.env.PORT || 3000);
}
bookstore();
