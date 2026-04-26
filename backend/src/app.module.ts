import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST', 'localhost'),
        port: Number(config.get<string>('DATABASE_PORT', '5433')),
        username: config.get<string>('DATABASE_USER', 'todo'),
        password: config.get<string>('DATABASE_PASSWORD', 'todo'),
        database: config.get<string>('DATABASE_NAME', 'todo_app'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TodosModule,
  ],
})
export class AppModule {}
