import type { I18nContext } from "@edjopato/telegraf-i18n";
import type { Message, Update } from "telegraf/typings/core/types/typegram";
import type { Context, NarrowedContext, Scenes } from "telegraf";

export type TextContext = NarrowedContext<BotContext, Update.MessageUpdate<Message.TextMessage>>;

export interface WizardSession extends Scenes.WizardSessionData {}

export interface BotContext extends Context {
  scene: Scenes.SceneContextScene<BotContext, WizardSession>;
  wizard: Scenes.WizardContextWizard<BotContext>;
  session: Scenes.WizardSession<WizardSession>;
  i18n: I18nContext;
}
