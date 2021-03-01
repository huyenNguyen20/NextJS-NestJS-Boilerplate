import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/users.schema';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { PoliciesGuard } from './guards/casl-policy.guard';
import { CaslAbilityFactory } from '../shared/casl/casl-ability.factory';
import { MulterModule} from '@nestjs/platform-express';
import multer from 'multer';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MulterModule.register({
      dest: "public/images",
      fileFilter: (req, file, cb) => {
                    if (!file.originalname.match(/\.(jpg|jpeg|gif|png)$/)) {
                      // You can always pass an error if something goes wrong:
                      cb(new Error('You can only upload image files'), null);
                    }
                    // To accept the file pass `true`, like so:
                    cb(null, true);
                  }
    })
  ],
  providers: [UsersService, JwtStrategy, PoliciesGuard, CaslAbilityFactory],
  controllers: [UsersController],
  exports: [
    UsersService,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
})
export class UsersModule {}
