import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'huyenNguyen', description: 'Username' })
  readonly username: string;

  @ApiProperty({ example: '123456@abc', description: 'Password' })
  readonly password: string;
}
