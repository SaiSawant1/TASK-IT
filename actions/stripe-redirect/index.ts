"use server";

import { db } from "@/lib/db";
import { ReturnType, InputType } from "./types";
import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { StripeRedirectSchema } from "./schema";
import { fetchCurrentOrg } from "../redis-org/redis-fetch-current-org";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

const handler = async (dataInput: InputType): Promise<ReturnType> => {
  const session = await auth();
  const { data } = await fetchCurrentOrg();

  if (!session?.user.id || !data?.orgId) {
    return { error: "unauthorize" };
  }

  const settingsURL = absoluteUrl(`/organization/${data.orgId}`);
  let url = "";

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId: data.orgId,
      },
    });

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsURL,
      });

      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsURL,
        cancel_url: settingsURL,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: session.user.email!,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Task-It pro",
                description: "Unlimited boards for your organization",
              },
              unit_amount: 20000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId: data.orgId,
        },
      });
      url = stripeSession.url || "";
    }
  } catch (err) {
    console.log(err);
    return {
      error: "something went wrong cant redired to stripe",
    };
  }
  revalidatePath(`/organization/${data.orgId}`);
  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirectSchema, handler);
