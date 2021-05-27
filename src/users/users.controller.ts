import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './models/create_user.dto';
import { UpdateUserDto } from './models/update_user.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get users list' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Empty list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User list returned' })
  async findAll(@Res({ passthrough: true }) res: Response) {
    const users = await this.usersService.findAll();
    if (users.length == 0) {
      res.status(HttpStatus.NO_CONTENT);
    }
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User returned' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update user with specific id' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User version changed',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'User updated' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user with specific id' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'User deleted' })
  remove(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
    this.usersService.remove(+id);
    res.status(HttpStatus.NO_CONTENT);
  }
}
