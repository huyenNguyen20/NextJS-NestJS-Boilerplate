import { AppAbility } from './casl-ability.factory';

interface IPolicyHandler {
  handle(ability: AppAbility): boolean | Promise<boolean>;
}

type PolicyHandlerCallback = (
  ability: AppAbility,
) => boolean | Promise<boolean>;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
