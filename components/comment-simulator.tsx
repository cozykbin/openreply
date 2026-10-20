"use client";

import { useEffect, useRef, useState } from "react";
import { CAMPAIGN_TEMPLATES } from "@/lib/templates/campaign-templates";
import { matchKeywords } from "@/lib/utils/keyword-matcher";
import { extractFirstUrl, renderMessageWithoutLink } from "@/lib/tracking/message";
import { followGateDecision, FOLLOW_GATE_DEFAULTS, FOLLOW_STATUS_UNAVAILABLE_MESSAGE } from "@/lib/follow-gate";

const templates = CAMPAIGN_TEMPLATES.filter((template) => template.slug.startsWith("ko-"));
const initialTemplate = templates[0];
type Turn = { side: "bot" | "user"; text: string; button?: string; link?: boolean };
type Result = { matched: boolean; keyword: string | null; comment: string; turns: Turn[]; complete: boolean };
type TestFollowStatus = "not-following" | "following" | "unavailable";

function safeLink(value: string) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

export default function CommentSimulator() {
  const [templateSlug, setTemplateSlug] = useState(initialTemplate.slug);
  const [keywordText, setKeywordText] = useState(initialTemplate.keywords.join(", "));
  const [message, setMessage] = useState(initialTemplate.dmMessage);
  const [link, setLink] = useState(initialTemplate.followGate?.trackedDestinationUrl ?? "https://example.com/guide");
  const [comment, setComment] = useState(initialTemplate.triggerExample);
  const [username, setUsername] = useState("하늘");
  const [wholeWord, setWholeWord] = useState(true);
  const [requireFollow, setRequireFollow] = useState(true);
  const [opening, setOpening] = useState<string>(FOLLOW_GATE_DEFAULTS.openingDmMessage);
  const [retry, setRetry] = useState<string>(FOLLOW_GATE_DEFAULTS.followPromptMessage);
  const [followStatus, setFollowStatus] = useState<TestFollowStatus>("not-following");
  const [result, setResult] = useState<Result | null>(null);
  const conversationEnd = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (result) conversationEnd.current?.scrollIntoView({ block: "nearest" });
  }, [result]);
  const keywords = keywordText.split(/[,\n]/).map((word) => word.trim()).filter(Boolean);
  const validLink = safeLink(link);
  const canTest = keywords.length > 0 && comment.trim().length > 0 && message.trim().length > 0 && validLink && (!requireFollow || (opening.trim() && retry.trim()));
  const inputClass = "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground";
  const personalize = (text: string) => renderMessageWithoutLink({ message: text, commenterName: username.trim() || "방문자" });
  const finalTurn = (): Turn => ({ side: "bot", text: personalize(message), link: true });

  function checkFollow(buttonLabel: string) {
    if (!result?.matched || result.complete) return;
    const decision = followGateDecision(followStatus === "following" ? true : followStatus === "not-following" ? false : null);
    const next: Turn = decision === "confirmed" ? finalTurn() : {
      side: "bot", text: decision === "unavailable" ? FOLLOW_STATUS_UNAVAILABLE_MESSAGE : personalize(retry),
      button: FOLLOW_GATE_DEFAULTS.followPromptButtonLabel,
    };
    const userTurn: Turn = { side: "user", text: buttonLabel };
    setResult({ ...result, turns: [...result.turns, userTurn, next].slice(-25), complete: decision === "confirmed" });
  }

  return (
    <div className="grid items-start gap-7 lg:grid-cols-[1fr_1.05fr]">
      <form className="space-y-5 rounded-2xl border border-border bg-surface p-5 sm:p-7"
        onChange={() => setResult(null)}
        onSubmit={(event) => {
          event.preventDefault();
          if (!canTest) return;
          const match = matchKeywords(comment, keywords, wholeWord);
          setResult({ matched: match.matched, keyword: match.matchedKeyword, comment, complete: !requireFollow,
            turns: !match.matched ? [] : requireFollow
              ? [{ side: "bot", text: personalize(opening), button: FOLLOW_GATE_DEFAULTS.openingDmButtonLabel }]
              : [finalTurn()] });
        }}>
        <h2 className="text-xl font-semibold">자료 공유 자동화</h2>
        <div className="space-y-2">
          <label htmlFor="sim-template" className="block text-sm font-medium">한국어 템플릿</label>
          <select id="sim-template" className={inputClass} value={templateSlug} onChange={(event) => {
            const template = templates.find((item) => item.slug === event.target.value)!;
            setTemplateSlug(template.slug); setKeywordText(template.keywords.join(", ")); setMessage(template.dmMessage);
            setLink(template.followGate?.trackedDestinationUrl ?? extractFirstUrl(template.dmMessage) ?? "https://example.com/guide");
            setComment(template.triggerExample); setRequireFollow(Boolean(template.followGate));
          }}>{templates.map((template) => <option key={template.slug} value={template.slug}>{template.title}</option>)}</select>
        </div>
        <div className="space-y-2">
          <label htmlFor="sim-keywords" className="block text-sm font-medium">댓글 키워드</label>
          <input id="sim-keywords" className={inputClass} value={keywordText} maxLength={500} required onChange={(event) => setKeywordText(event.target.value)} />
          <label className="flex min-h-10 items-center gap-2 text-sm"><input type="checkbox" checked={!wholeWord} onChange={(event) => setWholeWord(!event.target.checked)} />붙여 쓴 댓글도 포함 (정보요, 정보주세요)</label>
        </div>
        <label className="flex min-h-11 items-center gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 text-sm font-semibold"><input type="checkbox" checked={requireFollow} onChange={(event) => setRequireFollow(event.target.checked)} />팔로우 확인 후에만 링크 전달</label>
        <div className="space-y-2">
          <label htmlFor="sim-link" className="block text-sm font-medium">공유할 링크</label>
          <input id="sim-link" type="url" className={inputClass} value={link} maxLength={2048} required onChange={(event) => setLink(event.target.value)} />
        </div>
        <div className="space-y-2">
          <label htmlFor="sim-message" className="block text-sm font-medium">확인 후 보낼 DM</label>
          <textarea id="sim-message" className={inputClass} rows={3} maxLength={1000} required value={message} onChange={(event) => setMessage(event.target.value)} />
          <p className="text-xs leading-6 text-muted">{"{username}"}은 작성자 이름으로 바뀝니다. 링크는 메시지 아래 버튼으로 표시됩니다.</p>
        </div>
        {requireFollow && <details className="rounded-xl border border-border p-4">
          <summary className="cursor-pointer text-sm font-medium">첫 DM · 재확인 문구 수정</summary>
          <label htmlFor="sim-opening" className="mb-2 mt-4 block text-xs font-medium">댓글 직후 첫 DM</label>
          <textarea id="sim-opening" className={inputClass} rows={3} maxLength={1000} value={opening} onChange={(event) => setOpening(event.target.value)} />
          <label htmlFor="sim-retry" className="mb-2 mt-4 block text-xs font-medium">팔로우가 확인되지 않을 때</label>
          <textarea id="sim-retry" className={inputClass} rows={3} maxLength={1000} value={retry} onChange={(event) => setRetry(event.target.value)} />
        </details>}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><label htmlFor="sim-username" className="block text-sm font-medium">댓글 작성자</label><input id="sim-username" className={inputClass} value={username} maxLength={100} onChange={(event) => setUsername(event.target.value)} /></div>
          <div className="space-y-2"><label htmlFor="sim-comment" className="block text-sm font-medium">테스트 댓글</label><input id="sim-comment" className={inputClass} value={comment} maxLength={1000} required onChange={(event) => setComment(event.target.value)} /></div>
        </div>
        <button type="submit" disabled={!canTest} className="min-h-12 w-full rounded-xl bg-accent px-5 py-3 font-semibold text-white hover:bg-accent-hover disabled:opacity-40">댓글 테스트</button>
      </form>

      <section aria-label="Instagram DM 체험" className="space-y-4 lg:sticky lg:top-6">
        {requireFollow && <fieldset className="rounded-xl border border-border bg-surface px-5 pb-4 pt-2">
          <legend className="px-1 text-xs font-semibold text-muted">테스트용 팔로우 상태</legend>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
            {([["not-following", "미팔로우"], ["following", "팔로우 완료"], ["unavailable", "확인 실패"]] as const).map(([value,label]) =>
              <label key={value} className="flex min-h-9 items-center gap-2"><input type="radio" name="test-follow" checked={followStatus === value} onChange={() => setFollowStatus(value)} />{label}</label>)}
          </div>
          <p className="mt-2 text-xs leading-6 text-muted">실제 계정 조회가 아닌 체험용 상태입니다. ‘미팔로우’로 버튼을 눌러본 뒤 ‘팔로우 완료’로 바꿔 다시 눌러보세요.</p>
        </fieldset>}
        <div className="overflow-hidden rounded-3xl border border-border bg-white">
          <header className="flex items-center gap-3 border-b border-border px-5 py-4"><span className="grid h-10 w-10 place-items-center rounded-full bg-zinc-900 text-xs font-semibold text-white">OR</span><div><h2 className="text-sm font-semibold">나의 Instagram 계정</h2><p className="mt-1 text-xs text-muted">DM 대화 미리보기</p></div><span aria-hidden="true" className="ml-auto text-xl">···</span></header>
          <div aria-live="polite" aria-atomic="true" className="max-h-[36rem] min-h-80 space-y-5 overflow-y-auto px-5 py-7 sm:px-7">
            {!result ? <div className="py-10 text-center"><p className="text-sm font-semibold">댓글부터 시작해 보세요</p><p className="mt-3 text-sm leading-7 text-muted">조건에 맞는 댓글을 남기면<br />팔로우 확인 버튼이 있는 첫 DM이 도착합니다.</p></div> : <>
              <p className="text-center text-xs leading-6 text-muted">게시물에 남긴 댓글: {result.comment}</p>
              {!result.matched ? <p className="rounded-xl bg-surface p-4 text-center text-sm text-warning">일치하는 키워드가 없어 DM을 보내지 않습니다.</p> : <>
                <p className="text-center text-xs font-medium text-success">‘{result.keyword}’ 키워드 일치</p>
                {result.turns.map((turn,index) => <div key={index} className={`flex ${turn.side === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[90%] overflow-hidden rounded-2xl text-sm ${turn.side === "user" ? "rounded-br-md bg-violet-600 px-4 py-3 text-white" : "rounded-bl-md bg-zinc-50 p-4 text-zinc-900"}`}>
                    <p className="whitespace-pre-wrap break-words leading-7">{turn.text}</p>
                    {turn.button && <button type="button" disabled={index !== result.turns.length-1 || result.complete}
                      onClick={() => checkFollow(turn.button!)} className="mt-4 min-h-11 w-full rounded-xl bg-zinc-100 px-4 py-3 font-semibold disabled:opacity-45">{turn.button}</button>}
                    {turn.link && validLink && <a href={validLink} target="_blank" rel="noopener noreferrer" aria-label="공유 링크 열기" className="mt-4 block rounded-xl bg-zinc-100 px-8 py-3 text-center text-xl">🔗</a>}
                  </div>
                </div>)}
                {result.complete && <p className="text-center text-xs font-medium text-success">{requireFollow ? "팔로우 확인 완료 · 링크 전달" : "링크 DM 미리보기"}</p>}
              </>}
            </>}
            <div ref={conversationEnd} />
          </div>
          <p className="border-t border-border bg-surface px-5 py-4 text-xs leading-6 text-muted">체험은 브라우저 안에서만 동작합니다. 실제 Instagram 조회·DM 발송·설정 저장은 하지 않습니다.</p>
        </div>
      </section>
    </div>
  );
}
