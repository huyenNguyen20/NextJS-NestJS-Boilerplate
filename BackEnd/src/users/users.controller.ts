import {
  Controller,
  Response,
  Body,
  Put,
  Request,
  Post,
  Delete,
  UseGuards,
  Get,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {Express} from "express";
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { CaslAbilityFactory } from '../shared/casl/casl-ability.factory';
import { PoliciesGuard } from './guards/casl-policy.guard';
import { AppAbility } from '../shared/casl/casl-ability.factory';
import { CheckPolicies } from './decorators/checkPolicy.decorator';
import { UpdateUserDto } from '../shared/dto/updateUserDto.dto';
import { User, Users } from './schemas/users.schema';
import { Action } from '../shared/casl/action';




@ApiTags('User CRUD Methods')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  //Admin Route
  @ApiOperation({ summary: 'Fetch Users - Admin Only' })
  @ApiResponse({ status: 200, description: '{ "success": true, "response": { "users": []}}' })
  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Users))
  async fetchUsers(@Response() res) {
    const resp = await this.usersService.getUsers();
    return res.status(HttpStatus.OK).json(resp);
  }

  @ApiOperation({ summary: 'Delete Users - Admin Only' })
  @ApiResponse({ status: 200, description: 'Delete User Successfully' })
  @Delete()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, Users))
  async deleteUsers(@Response() res) {
    const resp = await this.usersService.deleteUsers();
    return res.status(HttpStatus.OK).json(resp);
  }

  @ApiOperation({ summary: 'Fetch User Profile - Admin and User with the ID' })
  @ApiResponse({ status: 200, description: '{ "success": true, "response": { "user": []}}' })
  @Get('/profile/:id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  async fetchUser(@Param() params, @Request() req, @Response() res) {
    //Check Permission for an instance of User
    const ability = this.caslAbilityFactory.createForUser(req.user);
    const user = await this.usersService.getUser(params.id);
    if (user && ability.can(Action.Read, user)) {
      //Fetch User Profile
      const profile = await this.usersService.getProfile(params.id);
      return res.status(HttpStatus.OK).json(profile);
    } else {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Unauthorized' });
    }
  }

  @ApiOperation({ summary: 'Update User Profile - Admin and User with the ID' })
  @ApiResponse({ status: 200, description: 'Update User Profile Successfully' })
  @Put('/profile/:id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, User))
  async updateUser(
    @Param() params,
    @Request() req,
    @Response() res,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    //Check Permission for an instance of User
    const ability = this.caslAbilityFactory.createForUser(req.user);
    const user = await this.usersService.getUser(params.id);
    if (user && ability.can(Action.Update, user)) {
      //UpdateUser
      const resp = await this.usersService.modifyUser(params.id, updateUserDto);
      return res.status(HttpStatus.OK).json(resp);
    }
    return res.status(HttpStatus.FORBIDDEN).json({ message: 'Unauthorized' });
  }

  @ApiOperation({ summary: 'Delete User Profile - Admin and User with the ID' })
  @ApiResponse({ status: 200, description: 'Delete User Profile Successfully' })
  @Delete('/profile/:id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, User))
  async deleteUser(@Param() params, @Request() req, @Response() res) {
    //Check Permission for an instance of User
    const ability = this.caslAbilityFactory.createForUser(req.user);
    const user = await this.usersService.getUser(params.id);
    if (user && ability.can(Action.Update, user)) {
      //Delete User
      const resp = await this.usersService.deleteUser(params.id);
      return res.status(HttpStatus.OK).json(resp);
    }
    return res.status(HttpStatus.FORBIDDEN).json({ message: 'Unauthorized' });
  }
  // User Routes
  @ApiOperation({ summary: 'Fetch Personal Profile' })
  @ApiResponse({
    status: 200,
    description: 'Fetch Personal Profile Successfully',
  })
  @Get('/profile')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, User))
  async fetchProfile(@Request() req, @Response() res) {
    const resp = await this.usersService.getProfile(req.user.id);
    return res.status(HttpStatus.OK).json(resp);
  }

  @ApiOperation({ summary: 'Update Personal Profile' })
  @ApiResponse({
    status: 200,
    description: 'Update Personal Profile Successfully',
  })
  @Put('/profile')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, User))
  async updateProfile(
    @Request() req,
    @Response() res,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const resp = await this.usersService.modifyUser(req.user.id, updateUserDto);
    return res.status(HttpStatus.OK).json(resp);
  }

  @ApiOperation({ summary: 'Upload Profile Image' })
  @ApiResponse({
    status: 200,
    description: '{sucess: true, response: {message : "Update User Profile Successfully"}',
  })
  @Post('/profile/uploadImage')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, User))
  @UseInterceptors(FileInterceptor('imageFile'))
  async uploadProfileImage(
    @Request() req,
    @Response() res,
    @UploadedFile() file : Express.Multer.File
  ) {
    const img = file.filename;
    try {
      const resp = await this.usersService.modifyUser(req.user.id, {
        avatarUrl: `${process.env.SERVER_SIDE_URL}/images/${img}`,
      });
      if (resp.success) {
        res.status(200).json(resp);
      } else throw Error(resp.response.message || 'Something went wrong');
    } catch (err) {
      res.status(500).json({ success: false, message: err.message || err.toString() });
    }
  }
}
