import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Response } from 'express';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './models/createEmployee.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { EmployeeFilterDto } from './models/employee.filter.dto';
@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get employees list' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Empty list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User list returned' })
  async findAll(@Res({ passthrough: true }) res: Response) {
    const employees = await this.employeeService.findAll();
    if (employees.length == 0) {
      res.status(HttpStatus.NO_CONTENT);
    }
    return employees;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new employee' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Employee created' })
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeService.create(createEmployeeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':ldap')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get employee by ldap' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Employee not found',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Employee returned' })
  findOne(@Param('ldap') ldap: number) {
    return this.employeeService.findOne(+ldap);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':filter')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get employees by filter' })
  async getByFilter(@Body() body: EmployeeFilterDto) {
    const { limit, offset, filters } = body;
    return this.employeeService.getByFilter(limit, offset, filters);
  }
}
