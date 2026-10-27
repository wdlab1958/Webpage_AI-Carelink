'use client';

/**
 * 법적 문서 버전 전환 게이트 — 지시서 L-01 ②.
 *  - 시행일(2027-01-01 00:00 KST) 전: 기본 뷰 = 현행 시행 버전(v1.0). 상단에 "개정 … 공고 … 시행 — 개정안 보기(?version=1.1)".
 *  - 시행일 후: 기본 뷰 = v1.1, v1.0 은 ?version=1.0 이력으로 남는다.
 *  - 전환은 열람 시각 기준 자동(정적 export 사이트라 서버 시각 대신 브라우저 시각). 수동 배포 불필요.
 *  - 시행된 종전 버전이 없는 문서(previous 없음)는 항상 v1.1 을 보이고, 시행 전에는 적용 중인 규범을 interimNote 로 안내한다.
 * props: { noun:'약관'|'고지'|'방침', meta, previous?: { version, effectiveAt, render(notice) }, current: { render(notice) }, interimNote? }
 * render(notice) 는 상단 안내 요소(notice)를 머리말 아래에 배치해야 한다.
 */
import { Suspense, useSyncExternalStore } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Megaphone } from 'lucide-react';
import { isEffective, resolveLegalVersion } from '@/content/legal-meta';

const subscribeNoop = () => () => {};

function NoticeBar({ tone = 'amber', children }) {
  const cls = tone === 'purple' ? 'border-purple-400/30 bg-purple-500/10 text-purple-100' : 'border-amber-400/40 bg-amber-500/10 text-amber-100';
  return (
    <div role="status" className={`mb-4 flex items-start gap-3 rounded-2xl border p-4 text-sm leading-relaxed ${cls}`}>
      <Megaphone className="mt-0.5 h-5 w-5 shrink-0" />
      <p className="break-keep">{children}</p>
    </div>
  );
}

function Gate({ noun, meta, previous, current, interimNote }) {
  const pathname = usePathname();
  const requested = useSearchParams().get('version');
  const hasPrevious = Boolean(previous);
  // 프리렌더(정적 HTML)와 하이드레이션 렌더는 시각·쿼리를 모르므로 "시행 전 기본 뷰"로 그리고, 마운트 후 실제 열람 시각으로 판정한다(하이드레이션 불일치 방지).
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const now = mounted ? new Date() : null;
  const state = now
    ? { version: resolveLegalVersion({ requested, hasPrevious, now, meta }), effective: isEffective(now, meta.effectiveAt) }
    : { version: hasPrevious ? previous.version : meta.version, effective: false };

  const link = (version, label) => <Link href={{ pathname, query: { version } }} className="underline font-semibold hover:opacity-80">{label}</Link>;
  const showingCurrent = state.version === meta.version;
  let notice = null;
  if (!showingCurrent) {
    notice = state.effective
      ? <NoticeBar tone="purple">이 페이지는 종전 {noun}(v{previous.version}, {previous.effectiveAt} 시행)의 보존본입니다. {meta.effectiveAt}부터 개정 {noun}(v{meta.version})이 시행 중입니다 — {link(meta.version, `현행 ${noun}(v${meta.version}) 보기`)}</NoticeBar>
      : <NoticeBar>개정 {noun}(v{meta.version})이 {meta.announcedAt}에 공고되었으며 {meta.effectiveAt}부터 시행됩니다 — {link(meta.version, '개정안 보기')}</NoticeBar>;
  } else if (!state.effective) {
    notice = hasPrevious
      ? <NoticeBar>이 {noun}(v{meta.version})은 {meta.announcedAt}에 공고되었고 {meta.effectiveAt}부터 시행됩니다. {meta.effectiveAt} 전까지는 현행 {noun}(v{previous.version}, {previous.effectiveAt} 시행)이 적용됩니다 — {link(previous.version, `현행 ${noun}(v${previous.version}) 보기`)}</NoticeBar>
      : (interimNote ? <NoticeBar>{interimNote}</NoticeBar> : null);
  }
  return showingCurrent ? current.render(notice) : previous.render(notice);
}

export default function LegalVersionGate(props) {
  // useSearchParams 는 정적 export 에서 Suspense 경계가 필요하다.
  const fallback = props.previous ? props.previous.render(null) : props.current.render(null);
  return <Suspense fallback={fallback}><Gate {...props} /></Suspense>;
}
