import { expect, it } from "vitest";
import { createTransport } from "nodemailer";

it("renders Korean login email with the patched Nodemailer transport without sending mail", async () => {
  const transport = createTransport({ jsonTransport: true });
  const result = await transport.sendMail({
    from: "OpenReply 한국어판 <login@example.com>",
    to: "test@example.com",
    subject: "OpenReply 로그인",
    text: "로그인 링크: https://example.com/api/auth/callback/nodemailer?token=test",
  });
  const message = JSON.parse(result.message);
  expect(message.subject).toBe("OpenReply 로그인");
  expect(message.text).toContain("https://example.com/api/auth/callback/nodemailer?token=test");
  expect(message.to[0].address).toBe("test@example.com");
  transport.close();
});
