import {
  Controller,
  Response,
  Body,
  Request,
  Post,
  UseGuards,
  Get,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserLocalDto } from '../shared/dto/createUserLocal.dto';
import { LoginUserDto } from '../shared/dto/loginUser.dto';


require('dotenv').config();
@ApiTags('User Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Register User By UserName and Password' })
  @ApiResponse({ status: 201, description: 'Registration Successfully' })
  @Post('/local/signup')
  async signupLocal(@Response() res, @Body() user: CreateUserLocalDto) {
    const result = await this.usersService.signUpWithLocalStrategy(user);
    if (result.success) return res.status(HttpStatus.CREATED).json(result);
    else return res.status(HttpStatus.BAD_REQUEST).json(result);
  }

  @ApiOperation({ summary: 'Login User By UserName and Password' })
  @ApiResponse({ status: 200, description: '{sucess: true; cookie: "nest-cookie=jwtToken; expires=Date.toString()"; message: "Login Successfully"}' })
  @Post('/local/login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Response() res, @Body() user: LoginUserDto) {
    const resp = await this.authService.login(req.user);
    return res.status(HttpStatus.OK).json({
      success: true, 
      cookie: `nest-cookie=${resp.token}; expires=${new Date(Date.now() + 60 * 60 * 1000).toString()}`, 
      message: "Login Successfully"
    });
  }

  @ApiOperation({ summary: 'Initialize Google OAuth' })
  @ApiResponse({
    status: 200,
    description: 'Google OAuth will redirect to the provided Callback URL',
  })
  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  authWithGoogle() {} //eslint-disable-line

  @ApiOperation({ summary: 'Login Google OAuth' })
  @ApiResponse({ status: 200, description: 'Redirect to /oAuth Redirect with cookie="nest-cookie=jwtToken"' })
  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  async authWithGoogleCallBack(@Request() req, @Response() res) {
    if (!req.user)
      return res
        .status(HttpStatus.SERVICE_UNAVAILABLE)
        .redirect(`${process.env.CLIENT_SIDE_URL}/login`);
    const resp = await this.authService.login(req.user);
    res.cookie('nest-cookie', resp.token, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
    return res.status(HttpStatus.OK).redirect(`${process.env.CLIENT_SIDE_URL}/oAuthRedirect`);
  }

  @ApiOperation({ summary: 'Logout User' })
  @ApiResponse({ status: 200, description: '{success: true, message: "Logout Successfully"}' })
  @Get('/logout')
  async logout(@Response() res) {
    res.clearCookie('nest-cookie');
    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: 'Logout Successfully' });
  }
}
