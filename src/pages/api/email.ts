export const prerender = false;

import type { APIRoute, APIContext } from "astro";
import Mailjet from "node-mailjet";

import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

export const POST: APIRoute = async ({
  request,
  clientAddress,
}: APIContext) => {
  if (request.headers.get("Content-Type") !== "application/json") {
    return new Response(null, { status: 400 });
  }

  const body = await request.json();

  if (!body.email || !body.message) {
    return new Response(null, { status: 400 });
  }

  // Call reCaptcha API to verify the user
  const captchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${
      import.meta.env.RECAPTCHA_SECRET_KEY
    }&response=${body["g-recaptcha-response"]}`,
    {
      method: "POST",
    },
  );
  const result = await captchaResponse.json();

  if (
    result.success !== true ||
    result.hostname !== "david.bertet.fr" ||
    result.action !== "submit" ||
    result.score <= 0.5
  ) {
    return new Response(null, { status: 400 });
  }

  const sent = await sendEmail(
    body.email,
    import.meta.env.EMAIL,
    `Portfolio: New contact from ${body.name || body.email}!`,
    `${body.message}\n\nIP: ${clientAddress}`,
  );

  if (!sent) {
    return new Response(null, { status: 500 });
  }

  return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
};

const sendEmail = async (
  from: string,
  to: string,
  subject: string,
  body: string,
) => {
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);

  const mailjet = new Mailjet({
    apiKey: import.meta.env.MJ_APIKEY_PUBLIC,
    apiSecret: import.meta.env.MJ_APIKEY_PRIVATE,
  });

  const result = await mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: { Email: to },
        ReplyTo: { Email: from },
        To: [{ Email: to }],
        Subject: purify.sanitize(subject),
        TextPart: purify.sanitize(body),
      },
    ],
  });

  return result.response.status == 200;
};
