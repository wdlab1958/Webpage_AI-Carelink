'use client';

import { useAppHref } from '@/lib/useTargets';

/**
 * 플랫폼(app.ai-carelink.co.kr / LAN :3001)으로 가는 링크.
 * <AppLink to="/dashboard/patient/mobile" className="btn">환자·보호자 앱</AppLink>
 */
export default function AppLink({ to = '/', children, newTab = false, ...rest }) {
  const href = useAppHref(to);
  const extra = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a href={href} {...extra} {...rest}>
      {children}
    </a>
  );
}
