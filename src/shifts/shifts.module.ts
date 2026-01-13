import { Module } from '@nestjs/common';
import { ShiftsController } from './shifts.controller';
import { AuthService } from './auth/auth.service';
import { ShiftsService } from './shifts.service';

@Module({
  controllers: [ShiftsController],
  providers: [AuthService, ShiftsService]
})
export class ShiftsModule {}
