import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { CreateEmployeeDto } from './models/createEmployee.dto';
import { EmployeeFilterFieldsDto } from './models/employee.filter.dto';
import { Employee } from './models/employees.entity';

@Injectable()
export class EmployeesService {
  getByFilter(
    limit: number,
    offset: number,
    filters: EmployeeFilterFieldsDto,
  ): Promise<Employee[]> {
    // do search by filter there
    return;
  }
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

  async findAll(): Promise<Employee[]> {
    return await this.employeesRepo.find();
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
