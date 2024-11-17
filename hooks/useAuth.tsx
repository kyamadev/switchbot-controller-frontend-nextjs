import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // トークンがない場合はログインページにリダイレクト
      router.push('/login');
    }
  }, [router]);
}