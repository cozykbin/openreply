import { afterEach, describe, expect, it, vi } from "vitest";
import {
  PermissionError,
  subscribeInstagramAccountToWebhooks,
} from "@/lib/meta/client";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("Meta account webhook subscriptions", () => {
  it("requests comment, message, button-tap and read events on the connected account", async () => {
    vi.stubEnv("META_GRAPH_API_VERSION", "v25.0");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );
    vi.stubGlobal("fetch", fetchMock);

    expect(await subscribeInstagramAccountToWebhooks("professional-id", "test-token"))
      .toEqual({ success: true });

    const [url, request] = fetchMock.mock.calls[0];
    expect(url).toBe("https://graph.instagram.com/v25.0/professional-id/subscribed_apps");
    expect(request.method).toBe("POST");
    expect(request.headers.Authorization).toBe("Bearer test-token");
    expect(JSON.parse(request.body).subscribed_fields).toEqual(
      expect.arrayContaining(["comments", "messages", "messaging_postbacks", "messaging_seen"])
    );
  });

  it("surfaces rejected subscriptions so the connection cannot report them as successful", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: { code: 200, message: "Permission denied" } }),
        { status: 403 })
    ));

    await expect(subscribeInstagramAccountToWebhooks("professional-id", "test-token"))
      .rejects.toBeInstanceOf(PermissionError);
  });
});
