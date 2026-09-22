import AppRedirect from '@/components/AppRedirect';
import { APP_PATHS } from '@/lib/hosts';

export const metadata = { title: '회원가입' };

export default function Page() {
  return <AppRedirect to={APP_PATHS.login} title="회원가입 페이지로 이동합니다" />;
}
