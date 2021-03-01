import { ApiProperty } from '@nestjs/swagger';

export class resetPasswordEmailDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'Email' })
  readonly email: string;
}
