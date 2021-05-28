import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostcentersService } from './costcenters.service';
import { CostcentersController } from './costcenters.controller';
import { Costcenter } from './models/costcenter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Costcenter])],
  controllers: [CostcentersController],
  providers: [CostcentersService],
})
export class CostcentersModule {}
