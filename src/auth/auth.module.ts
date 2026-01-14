import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { RolesGuard } from './roles.guard';
import { APP_GUARD } from '@nestjs/core/constants';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'your_jwt_secret_key',
      signOptions: { expiresIn: '100000s' },
    }),
  ],
  providers: [AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    { 
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
