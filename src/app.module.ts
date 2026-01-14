import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { SequelizeModule } from '@nestjs/sequelize';


@Module({
  imports: [AuthModule, UsersModule, ShiftsModule, AssignmentsModule, SequelizeModule.forRoot({
     dialect: 'postgres',
      uri: 'postgresql://neondb_owner:npg_M7JpHwtZXFc0@ep-holy-sky-ahwvwiig-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
      autoLoadModels: true,
      synchronize: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
