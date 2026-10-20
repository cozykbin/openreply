import type { Metadata } from "next";
import Link from "next/link";
import CommentSimulator from "@/components/comment-simulator";
import { PRODUCT_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `댓글 자동 DM 체험 - ${PRODUCT_NAME}`,
  description: "로그인 없이 한국어 댓글 키워드와 DM 메시지를 시험해 보세요. 실제 메시지는 발송하지 않습니다.",
};

export default function PlaygroundPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
      <nav aria-label="체험 화면 메뉴" className="flex flex-wrap items-center justify-between gap-4 text-sm">
        <Link href="/" className="font-semibold">{PRODUCT_NAME}</Link>
        <Link href="/login" className="rounded-lg border border-border px-4 py-2">계정 연결하고 사용하기 ↗</Link>
      </nav>
      <header className="mb-9 mt-12 max-w-2xl">
        <p className="text-sm font-medium text-accent">로그인 없이 체험</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">댓글 하나, DM 하나.</h1>
        <p className="mt-4 text-base leading-8 text-muted">키워드를 정하고 댓글을 남겨 보세요. 실제 자동화와 같은 판정 방식으로 보낼 메시지를 확인할 수 있습니다.</p>
      </header>
      <CommentSimulator />
    </main>
  );
}
