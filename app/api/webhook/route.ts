import Stripe from "stripe";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = Stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOKS_SECRET!,
    );
  } catch {
    return new NextResponse("webhooks error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscribtion = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    if (!session?.metadata?.orgId) {
      return new NextResponse("Org ID is required", { status: 400 });
    }
    await db.orgSubscription.create({
      data: {
        orgId: session?.metadata.orgId,
        stripeSubscriptionId: subscribtion.id,
        stripeCustomerId: subscribtion.customer as string,
        stripePriceId: subscribtion.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscribtion.current_period_end * 1000,
        ),
      },
    });
  }
  if (event.type === "invoice.payment_succeeded") {
    const subscribtion = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );

    await db.orgSubscription.update({
      where: {
        stripeSubscriptionId: subscribtion.id,
      },
      data: {
        stripePriceId: subscribtion.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscribtion.current_period_end * 1000,
        ),
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
