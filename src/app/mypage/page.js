import AppRedirect from '@/components/AppRedirect';
import { APP_PATHS } from '@/lib/hosts';

export const metadata = { title: '마이페이지로' };

export default function Page() {
  return <AppRedirect to={APP_PATHS.root} title="마이페이지로 이동합니다" />;
}
