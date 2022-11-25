import { Bot, Context } from "./deps.deno.ts";

import "https://deno.land/x/dotenv@v3.2.0/load.ts";

type MyContext = Context;

export const bot = new Bot<MyContext>(Deno.env.get("TOKEN") || "");

const payToken = Deno.env.get("PAY_TOKEN") || "";
bot.command("start", async (ctx) => {
  await ctx.replyWithInvoice(
    "Donation 10 INR",
    "This is a test payment.",
    `${ctx.message?.from.id}-${ctx.me.id}-${ctx.message?.message_id}`,
    payToken,
    "INR",
    [{ label: "Test product", amount: Math.trunc(10 * 100) }],
    {
      max_tip_amount: 100 * 100,
      suggested_tip_amounts: [5 * 100, 10 * 100, 25 * 100, 50 * 100],
    }
  );
});

bot.on("callback_query:data", async (ctx) => {
  await ctx.answerCallbackQuery();
});

bot.on("pre_checkout_query", async (ctx) => {
  await ctx.answerPreCheckoutQuery(true, ctx.preCheckoutQuery.id);
});

bot.on(":successful_payment", async (ctx) => {
  console.log(ctx.message?.successful_payment);
  const _msg = `Thank your for ${
    ctx.message?.successful_payment.total_amount / 100
  } ${ctx.message?.successful_payment.currency} donation.`;
  await ctx.reply(_msg);
});
