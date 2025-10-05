import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🛰️ Interceptor triggered for:', req.url);
  const token = localStorage.getItem('token');
  console.log('🔑 Token inside interceptor:', token);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
  }

  return next(req);
};
