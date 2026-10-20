import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCT_NAME, REPOSITORY_URL, SETUP_GUIDE_URL, UPSTREAM_URL } from "@/lib/brand";
import { CAMPAIGN_TEMPLATES } from "@/lib/templates/campaign-templates";

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} - 댓글을 대화로`,
  description: "댓글에 키워드를 남기면 링크를 DM으로 보내세요. 한국어 화면과 템플릿으로 직접 운영하는 Instagram 자동화.",
};

const features = [
  ["01", "키워드는 우리말로", "정보, 자료, 신청. 익숙한 키워드로 시작하고, 붙여 쓰는 댓글까지 받을지 직접 정하세요."],
  ["02", "보낼 내용도 우리 방식으로", "자료 공유, 상품 안내, 행사 신청 템플릿을 골라 메시지와 링크를 바꾸면 됩니다."],
  ["03", "발송 흐름은 한눈에", "원본 OpenReply의 대기열, 중복 방지, 재시도와 발송 기록으로 자동화를 운영하세요."],
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-border">
        <nav aria-label="메인 메뉴" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="text-base font-semibold tracking-tight">{PRODUCT_NAME}</Link>
          <div className="flex items-center gap-5 text-sm">
            <a href={REPOSITORY_URL} className="text-muted hover:text-foreground">GitHub ↗</a>
            <Link href="/login" className="rounded-lg border border-border px-4 py-2 font-medium">로그인</Link>
          </div>
        </nav>
      </header>
      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-sm font-semibold text-accent">직접 운영하는 Instagram 댓글 자동 DM</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">댓글을 남기면,<br />링크가 DM으로.</h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-muted">반복해서 보내던 링크, 이제 자동으로 보내세요. 한국어 화면에서 키워드와 메시지를 정하고 내 서버에서 운영하는 OpenReply입니다.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/playground" className="rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-accent-hover">로그인 없이 체험하기 →</Link>
              <a href={SETUP_GUIDE_URL} className="rounded-xl border border-border px-6 py-3.5 text-sm font-semibold">한국어 설치 안내 ↗</a>
            </div>
            <p className="mt-5 text-xs leading-6 text-muted">소프트웨어 무료 · 직접 호스팅 · Meta 발송 정책 적용</p>
          </div>
          <figure className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <figcaption className="flex items-center justify-between border-b border-border pb-5 text-sm"><span className="font-semibold">자료 링크 보내기</span><span className="text-xs text-muted">작동 예시</span></figcaption>
            <div className="mt-6 rounded-xl border border-border bg-white p-5"><p className="text-xs text-muted">게시물 안내</p><p className="mt-2 text-xl font-semibold leading-8">댓글에 ‘정보’를 남기면<br />자료 링크를 보내드려요.</p></div>
            <div className="mt-5 flex gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-xs">하늘</span><div><p className="text-xs font-semibold">@haneul</p><p className="mt-1 text-sm">정보 주세요!</p></div></div>
            <p className="my-5 text-center text-xs font-semibold text-accent">↓ ‘정보’ 키워드 일치</p>
            <div className="rounded-xl border border-orange-200 bg-orange-50 p-5"><p className="text-xs text-muted">DM 내용</p><p className="mt-2 text-sm leading-7">하늘님, 요청하신 자료 보내드려요!</p><p className="mt-2 text-sm font-medium text-orange-700">https://example.com/guide</p></div>
          </figure>
        </section>
        <section className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-3">
            {features.map(([number, title, description]) => <article key={number}><p className="text-xs font-semibold text-accent">{number}</p><h2 className="mt-3 text-lg font-semibold">{title}</h2><p className="mt-3 text-sm leading-7 text-muted">{description}</p></article>)}
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="text-2xl font-semibold">어떤 링크를 보내고 싶으세요?</h2>
          <p className="mt-3 text-sm text-muted">한국어 템플릿으로 시작해 내 메시지로 바꿔 보세요.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {CAMPAIGN_TEMPLATES.filter((template) => template.slug.startsWith("ko-")).map((template) => (
              <Link key={template.slug} href={`/login?template=${template.slug}`} className="rounded-xl border border-border p-6 hover:border-accent">
                <p className="text-xs text-muted">{template.category}</p><h3 className="mt-2 font-semibold">{template.title} ↗</h3><p className="mt-3 text-sm leading-7 text-muted">{template.summary}</p><p className="mt-4 text-xs font-medium text-accent">{template.keywords.join(" · ")}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="text-xl font-semibold">실제 발송을 시작하려면</h2>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-muted">Instagram 비즈니스·크리에이터 계정과 Meta 개발자 앱, 공개 HTTPS 주소, DB와 발송 워커가 필요합니다. 소프트웨어의 월 요금제 제한은 없으며, 호스팅 비용과 Meta 권한·발송 제한은 별도입니다. 체험 화면은 계정 연결 없이 확인할 수 있습니다.</p>
            <a href={SETUP_GUIDE_URL} className="mt-5 inline-block text-sm font-semibold text-accent">준비 항목과 설치 순서 확인 →</a>
          </div>
        </section>
      </main>
      <footer className="border-t border-border px-5 py-7 text-center text-xs leading-7 text-muted">
        {PRODUCT_NAME} · <a href={REPOSITORY_URL} className="underline">우리 저장소</a> · <a href={UPSTREAM_URL} className="underline">원본 OpenReply</a> · MIT License
      </footer>
    </div>
  );
}
