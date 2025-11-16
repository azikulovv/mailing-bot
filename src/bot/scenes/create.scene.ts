import { Markup, Scenes } from "telegraf";
import { BotContext } from "@/types";

type State = {
  title: string;
  content: string;
  chatsId: string[];
};

let state: Partial<State> = {};

export const createWizard = new Scenes.WizardScene<BotContext>(
  "createWizard",

  async (ctx: BotContext) => {
    await ctx.reply("Напишите название рассылки: ");
    return ctx.wizard.next();
  },

  async (ctx) => {
    state.title = (ctx.message as any).text;

    await ctx.reply("Напишите контент рассылки: ");
    return ctx.wizard.next();
  },

  async (ctx) => {
    state.content = (ctx.message as any).text;

    await ctx.reply("Пришлите id групп и чатов \nПример: 12345678,124125,5151124");
    return ctx.wizard.next();
  },

  async (ctx) => {
    state.chatsId = (ctx.message as any).text;

    await ctx.reply(JSON.stringify(state), {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.button.callback(
            ctx.i18n.t("create-mail.inline-button.confirm"),
            "confirm_create-mail"
          ),
        ],
        [Markup.button.callback(ctx.i18n.t("create-mail.inline-button.edit"), "edit_create-mail")],
        [
          Markup.button.callback(
            ctx.i18n.t("create-mail.inline-button.cancel"),
            "cancel_create-mail"
          ),
        ],
      ]).reply_markup,
    });

    return ctx.wizard.next();
  },

  async (ctx) => {
    if (!("callback_query" in ctx.update)) return;

    const action = (ctx.update.callback_query as any).data;

    if (action === "confirm_create-mail") {
      await ctx.deleteMessage();

      await ctx.reply(ctx.i18n.t("create-mail.success"), {
        reply_markup: Markup.inlineKeyboard([Markup.button.callback("Главное меню", "start")])
          .reply_markup,
      });
      return ctx.scene.leave();
    }

    if (action === "edit_create-mail") {
      await ctx.reply(ctx.i18n.t("create-mail.retry"));
      ctx.wizard.selectStep(1);
      return;
    }

    if (action === "cancel_create-mail") {
      await ctx.reply(ctx.i18n.t("create-mail.cancelled"));
      return ctx.scene.leave();
    }
  }
);
