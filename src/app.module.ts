import {Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (ConfigService : ConfigService)=>({uri:ConfigService.get("MONGOOSE_URI")}),
      inject:[ConfigService]
    }),
    TodoModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
