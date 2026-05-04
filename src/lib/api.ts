import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

export async function fetchWithLoading(url: string, options?: RequestInit) {
  NProgress.start();
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    throw error;
  } finally {
    NProgress.done();
  }
}
