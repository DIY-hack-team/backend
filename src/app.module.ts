import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './env';

import { EmployeesModule } from './employees/employees.module';
import { ProdTeamModule } from './prodTeam/prodTeams.module';
import { Employee } from './employees/models/employees.entity';
import { ProdTeam } from './prodTeam/models/prodTeam.entity';
import { AuthModule } from './auth/auth.module';
import { DomainsModule } from './domains/domains.module';
import { Domain } from './domains/models/domain.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/models/product.entity';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/models/project.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.PG_HOST,
      port: env.PG_PORT,
      username: env.PG_USERNAME,
      password: env.PG_PASSWORD || null,
      database: env.PG_DATABASE,
      synchronize: env.TYPEORM_SYNCHRONIZE,
      entities: [Employee, ProdTeam, Domain, Product, Project],
      logging: env.TYPEORM_LOGGING,
    }),
    AuthModule,
    EmployeesModule,
    ProdTeamModule,
    DomainsModule,
    ProductsModule,
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
