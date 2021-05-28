import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { CreateEmployeeDto } from './models/createEmployee.dto';
import { EmployeeFindAllDto } from './models/employees-find-all.dto';
import { Employee } from './models/employees.entity';

@Injectable()
export class EmployeesService {
  constructor(
    private connection: Connection,
    @InjectRepository(Employee)
    private employeesRepo: Repository<Employee>,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<{ ldap: number }> {
    const employee = this.employeesRepo.create({
      name: createEmployeeDto.userName,
      legal_entity: createEmployeeDto.legalEntity,
      organisation: createEmployeeDto.organisation,
      business_role: createEmployeeDto.businessRole,
      cost_center: createEmployeeDto.costCenter,
      ldap: createEmployeeDto.ldap,
    });
    const result: Employee = await this.employeesRepo.save(employee);
    return { ldap: result.ldap };
  }

  async findAll(params: EmployeeFindAllDto): Promise<Employee[]> {
    const whereStack = [];
    if (params.search) {
      let stmt: string;
      let search: string | number;
      if (
        !isNaN(Number(params.search)) &&
        params.search.slice(0, 2) == '60' &&
        params.search.length === 8
      ) {
        stmt = 'ldap = :search';
        search = Number(params.search);
      } else {
        stmt = 'name ilike :search';
        search = `%${params.search}%`;
      }
      whereStack.push({
        stmt: stmt,
        params: {
          search: search,
        },
      });
    }

    if (params.domain) {
      // TODO: search domain
    }

    const queryBuilder = this.employeesRepo.createQueryBuilder();
    if (whereStack.length > 0) {
      queryBuilder.where(whereStack[0].stmt, whereStack[0].params);
    }

    if (whereStack.length > 1) {
      whereStack.slice(1).forEach((item) => {
        queryBuilder.andWhere(item.stmt, item.params);
      });
    }

    return queryBuilder.getMany();
  }

  async findOne(ldap: number): Promise<Employee> {
    const employee = await this.employeesRepo.findOne(ldap);
    if (employee) {
      return employee;
    } else {
      throw new NotFoundException(
        `Entity Employee with ldap = ${ldap} not found`,
      );
    }
  }
}
