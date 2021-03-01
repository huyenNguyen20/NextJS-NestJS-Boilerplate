import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: '123456@abc', description: 'Password' })
  readonly password: string;
}
