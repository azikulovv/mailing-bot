import { BotContext } from "@/types";
import { Markup, Scenes } from "telegraf";
import { container } from "@/app/container";

type State = {
  title: string;
  content: string;
  chatsId: string;
};

let state: State = {
  chatsId: "",
  content: "",
  title: "",
};

export const createScene = new Scenes.WizardScene<BotContext>(
  "createScene",

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

    const keyboard = Markup.inlineKeyboard(
      [
        Markup.button.callback(
          ctx.i18n.t("create-mail.inline-button.confirm"),
          "confirm_create-mail"
        ),
        Markup.button.callback(ctx.i18n.t("create-mail.inline-button.edit"), "edit_create-mail"),
        Markup.button.callback(
          ctx.i18n.t("create-mail.inline-button.cancel"),
          "cancel_create-mail"
        ),
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

    if (action === "confirm_create-mail") {
      await ctx.deleteMessage();

      // Логика сохранение рассылки в БД
      await container.mail.create.execute({
        title: state.title,
        content: state.content,
        chatsId: state.chatsId,
      });

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
