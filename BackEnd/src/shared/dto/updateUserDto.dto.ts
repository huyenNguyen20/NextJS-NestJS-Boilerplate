import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'huyen', description: 'First Name' })
  readonly firstName: string;

  @ApiProperty({ example: 'Nguyen', description: 'Last Name' })
  readonly lastName: string;

  @ApiProperty({ example: 'huyenNguyen', description: 'Display Name' })
  readonly displayName: string;

  @ApiProperty({ example: 'Not Available', description: 'Url of User Avatar' })
  readonly avatarUrl: string;
}
