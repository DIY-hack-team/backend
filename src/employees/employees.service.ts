import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { CreateEmployeeDto } from './models/createEmployee.dto';
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
      userName: createEmployeeDto.userName,
      legalEntity: createEmployeeDto.legalEntity,
      organisation: createEmployeeDto.organisation,
      businessRole: createEmployeeDto.businessRole,
      costCenter: createEmployeeDto.costCenter,
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
