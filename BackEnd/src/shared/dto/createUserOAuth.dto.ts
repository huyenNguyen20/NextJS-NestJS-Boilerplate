import { ApiProperty } from '@nestjs/swagger';

export class CreateUserOAuthDto {
  @ApiProperty({
    example: 'jakhfuhaiakhfahfuafjahfjha',
    description: 'OAuthId',
  })
  OAuthId: string;

  @ApiProperty({
    example: 'abc@example.com',
    description: 'Email',
  })
  email: string;

  @ApiProperty({
    example: 'HuyenNguyen',
    description: 'Display Name',
  })
  displayName: string;

  @ApiProperty({
    example: 'agaagkjkahfjkhafjha',
    description: 'Avatar Url',
  })
  avatarUrl: string;
}
