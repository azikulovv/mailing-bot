import { BotContext } from "@/types";
import { Markup, Scenes } from "telegraf";
import { container } from "@/app/container";

type State = {
  title: string;
  chatIds: string;
  forwardMessageId: number;
};

let state: Partial<State> = {};

const scenes = {
  confirm: "confirm_create-newsletter",
  edit: "edit_create-newsletter",
  cancel: "cancel_create-newsletter",
};

export const createScene = new Scenes.WizardScene<BotContext>(
  "createScene",

  async (ctx: BotContext) => {
    await ctx.reply("Напишите заголовок рассылки: ");
    return ctx.wizard.next();
  },

  async (ctx) => {
    state.title = (ctx.message as any).text;

    await ctx.reply("Перешлите готовое сообщение для рассылки: ");
    return ctx.wizard.next();
  },

  async (ctx) => {
    state.forwardMessageId = ctx.message?.message_id;

    await ctx.reply("Пришлите id групп и чатов \nПример: 12345678,124125,5151124");
    return ctx.wizard.next();
  },

  async (ctx) => {
    state.chatIds = (ctx.message as any).text;

    const keyboard = Markup.inlineKeyboard(
      [
        Markup.button.callback(ctx.i18n.t("create-mail.inline-button.confirm"), scenes.confirm),
        Markup.button.callback(ctx.i18n.t("create-mail.inline-button.edit"), scenes.edit),
        Markup.button.callback(ctx.i18n.t("create-mail.inline-button.cancel"), scenes.cancel),
      ],
      { columns: 1 }
    );

    await ctx.reply(JSON.stringify(state), {
      reply_markup: keyboard.reply_markup,
    });

    return ctx.wizard.next();
  },

  async (ctx) => {
    if (!("callback_query" in ctx.update)) return;

    const action = (ctx.update.callback_query as any).data;

    switch (action) {
      // * Confirm
      case scenes.confirm:
        await ctx.deleteMessage();

        // Логика сохранение рассылки в БД
        await container.newsletter.create.execute({
          title: state.title as string,
          chatIds: state.chatIds as string,
          forwardMessageId: Number(state.forwardMessageId) as number,
        });

        await ctx.reply(ctx.i18n.t("create-mail.success"), {
          reply_markup: Markup.inlineKeyboard([Markup.button.callback("Главное меню", "start")])
            .reply_markup,
        });
        return ctx.scene.leave();

      // * Edit
      case scenes.edit:
        await ctx.reply(ctx.i18n.t("create-mail.retry"));
        ctx.wizard.selectStep(1);
        return;

      // * Cancel
      case scenes.cancel:
        await ctx.reply(ctx.i18n.t("create-mail.cancelled"));
        return ctx.scene.leave();
    }
  }
);
