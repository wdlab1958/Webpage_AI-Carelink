'use client';

import { useSyncExternalStore } from 'react';
import { DEFAULT_TARGETS, getTargets, appHref } from './hosts';

/* 접속 호스트는 페이지 수명 동안 바뀌지 않으므로 스냅샷을 1회 계산해 캐시한다.
   (useSyncExternalStore 는 getSnapshot 이 안정적인 참조를 돌려줘야 한다) */
let clientSnapshot = null;
const subscribe = () => () => {};
const getSnapshot = () => {
  if (!clientSnapshot) clientSnapshot = getTargets();
  return clientSnapshot;
};
const getServerSnapshot = () => DEFAULT_TARGETS;

/**
 * 접속 호스트 기준 앱/백엔드 URL.
 * SSR·하이드레이션은 DEFAULT_TARGETS(localhost)로, 클라이언트는 실제 호스트 기준으로 렌더된다
 * (React 가 하이드레이션 후 자동으로 클라이언트 스냅샷으로 재렌더 → 불일치 오류 없음).
 */
export function useTargets() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** 앱 내부 경로의 절대 URL을 반환하는 훅 */
export function useAppHref(path = '/') {
  const targets = useTargets();
  return appHref(path, targets);
}
