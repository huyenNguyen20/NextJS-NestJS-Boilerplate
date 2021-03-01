import { Injectable } from '@nestjs/common';
import { Action } from './action';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { User, Users } from '../../users/schemas/users.schema';

type Subjects =
  | InferSubjects<typeof User | typeof Users>
  | 'User'
  | 'Users'
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(
        [Action.Read, Action.Update, Action.Delete],
        [User, 'User', Users, 'Users'],
      ); // read-write access to everything
      cannot(Action.Create, [User, Users]);
    } else {
      can([Action.Read, Action.Update], [User, 'User'], { email: user.email }); // read-only access to everything
      cannot([Action.Delete, Action.Create], [User, 'User']);
    }
    return build();
  }
}
