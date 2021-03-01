import { ApiProperty } from '@nestjs/swagger';

export class CreateUserLocalDto {
  @ApiProperty({
    example: 'huyenNguyen',
    description: 'UserName',
  })
  username: string;

  @ApiProperty({
    example: 'huyen',
    description: 'FirstName',
  })
  firstName: string;

  @ApiProperty({
    example: 'nguyen',
    description: 'LastName',
  })
  lastName: string;

  @ApiProperty({
    example: 'abc@example.com',
    description: 'Email',
  })
  email: string;

  @ApiProperty({
    example: '123456@abc',
    description: 'Password',
  })
  password: string;
}
