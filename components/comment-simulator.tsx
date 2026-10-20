"use client";

import { useState } from "react";
import { CAMPAIGN_TEMPLATES } from "@/lib/templates/campaign-templates";
import { matchKeywords } from "@/lib/utils/keyword-matcher";

const templates = CAMPAIGN_TEMPLATES.filter((template) => template.slug.startsWith("ko-"));
const initialTemplate = templates[0];
type Result = { matched: boolean; keyword: string | null; comment: string; message: string };

export default function CommentSimulator() {
  const [templateSlug, setTemplateSlug] = useState(initialTemplate.slug);
  const [keywordText, setKeywordText] = useState(initialTemplate.keywords.join(", "));
  const [message, setMessage] = useState(initialTemplate.dmMessage);
  const [comment, setComment] = useState(initialTemplate.triggerExample);
  const [username, setUsername] = useState("하늘");
  const [wholeWord, setWholeWord] = useState(true);
  const [result, setResult] = useState<Result | null>(null);
  const keywords = keywordText.split(/[,\n]/).map((word) => word.trim()).filter(Boolean);
  const canTest = keywords.length > 0 && comment.trim().length > 0 && message.trim().length > 0;
  const inputClass = "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form className="space-y-5 rounded-2xl border border-border bg-surface p-5 sm:p-7"
        onChange={() => setResult(null)}
        onSubmit={(event) => {
          event.preventDefault();
          if (!canTest) return;
          const match = matchKeywords(comment, keywords, wholeWord);
          setResult({ matched: match.matched, keyword: match.matchedKeyword, comment,
            message: message.replace(/\{username\}/g, () => username.trim() || "방문자") });
        }}>
        <h2 className="text-xl font-semibold">자동화 설정</h2>
        <div className="space-y-2">
          <label htmlFor="sim-template" className="block text-sm font-medium">한국어 템플릿</label>
          <select id="sim-template" className={inputClass} value={templateSlug}
            onChange={(event) => {
              const template = templates.find((item) => item.slug === event.target.value)!;
              setTemplateSlug(template.slug);
              setKeywordText(template.keywords.join(", "));
              setMessage(template.dmMessage);
              setComment(template.triggerExample);
            }}>
            {templates.map((template) => <option key={template.slug} value={template.slug}>{template.title}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="sim-keywords" className="block text-sm font-medium">댓글 키워드</label>
          <input id="sim-keywords" className={inputClass} value={keywordText} maxLength={500} required
            onChange={(event) => setKeywordText(event.target.value)} aria-describedby="sim-keywords-hint" />
          <p id="sim-keywords-hint" className="text-xs text-muted">쉼표로 구분하세요. 하나라도 맞으면 실행합니다.</p>
        </div>
        <fieldset className="space-y-2">
          <legend className="mb-2 text-sm font-medium">키워드 판정</legend>
          <label className="flex min-h-10 items-center gap-2 text-sm"><input type="radio" name="match" checked={wholeWord} onChange={() => setWholeWord(true)} />단어 일치 — ‘정보 주세요’</label>
          <label className="flex min-h-10 items-center gap-2 text-sm"><input type="radio" name="match" checked={!wholeWord} onChange={() => setWholeWord(false)} />포함 일치 — ‘정보요’, ‘정보주세요’도 포함</label>
        </fieldset>
        <div className="space-y-2">
          <label htmlFor="sim-message" className="block text-sm font-medium">보낼 DM</label>
          <textarea id="sim-message" className={inputClass} rows={4} maxLength={1000} required value={message}
            onChange={(event) => setMessage(event.target.value)} aria-describedby="sim-message-hint" />
          <p id="sim-message-hint" className="text-xs text-muted">{"{username}"}은 댓글 작성자 이름으로 바뀝니다. 예시 링크를 바꿔 보세요.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><label htmlFor="sim-username" className="block text-sm font-medium">댓글 작성자</label>
            <input id="sim-username" className={inputClass} value={username} maxLength={100} onChange={(event) => setUsername(event.target.value)} /></div>
          <div className="space-y-2"><label htmlFor="sim-comment" className="block text-sm font-medium">테스트 댓글</label>
            <input id="sim-comment" className={inputClass} value={comment} maxLength={1000} required onChange={(event) => setComment(event.target.value)} /></div>
        </div>
        <button type="submit" disabled={!canTest} className="min-h-12 w-full rounded-xl bg-accent px-5 py-3 font-semibold text-white hover:bg-accent-hover disabled:opacity-40">댓글 테스트</button>
      </form>

      <section aria-label="테스트 결과" className="space-y-5">
        <div className="rounded-2xl border border-border p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-widest text-muted">미리보기</p>
          <h2 className="mt-3 text-2xl font-semibold">내 댓글에 어떤 DM이 갈까요?</h2>
          <div aria-live="polite" aria-atomic="true" className="mt-8 min-h-56">
            {!result ? <p className="text-sm leading-7 text-muted">왼쪽에서 키워드와 메시지를 바꾼 뒤 ‘댓글 테스트’를 눌러 보세요. 조건에 맞으면 보낼 DM을 보여드립니다.</p> : (
              <div className="space-y-5">
                <div className="rounded-xl bg-surface p-4"><p className="text-xs text-muted">입력한 댓글</p><p className="mt-2 break-words">{result.comment}</p></div>
                <p className={`text-sm font-semibold ${result.matched ? "text-success" : "text-warning"}`}>
                  {result.matched ? `‘${result.keyword}’ 키워드 일치 · DM 미리보기` : "일치하는 키워드 없음 · 발송 대상이 아닙니다"}
                </p>
                {result.matched && <div className="whitespace-pre-wrap break-words rounded-2xl border border-orange-200 bg-orange-50 p-5 text-sm leading-7 text-zinc-900">{result.message}</div>}
              </div>
            )}
          </div>
          <p className="mt-5 border-t border-border pt-4 text-xs leading-6 text-muted">이 체험은 브라우저 안에서만 실행됩니다. 실제 DM 발송이나 Instagram 연결, 설정 저장은 하지 않습니다.</p>
        </div>
        <div className="rounded-2xl border border-border p-6 text-sm leading-7 text-muted">
          <h3 className="font-semibold text-foreground">한국어 댓글에 맞게 설정하세요</h3>
          <p className="mt-2">단어 일치는 ‘정보’와 ‘정보 주세요’를 구분 없이 찾지만, ‘정보요’는 다른 단어로 봅니다. 붙여 쓰는 댓글까지 받으려면 포함 일치를 선택하세요. ‘개인정보’처럼 원하지 않는 단어도 포함될 수 있습니다.</p>
        </div>
      </section>
    </div>
  );
}
