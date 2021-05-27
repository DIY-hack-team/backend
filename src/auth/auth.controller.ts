import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginRequestDTO } from './dto/login-request.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { JwtAuthGuard } from './jwt.auth.guard';
import { LocalAuthGuard } from './local.auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary:
      "It's validate user token. Endpoint gives UnauthorizedError on failed",
  })
  auth(@Request() req): LoginResponseDTO {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary:
      "It's checks user name and password. Gives access token on success",
  })
  login(@Request() req, @Body() body: LoginRequestDTO): LoginResponseDTO {
    return req.user;
  }
}
