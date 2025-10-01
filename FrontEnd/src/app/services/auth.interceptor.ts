import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  console.log('🚀 Sending token:', token); // debug

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`, // 👈 بيرسل التوكن مع كل request
      },
    });
  }

  return next(req);
};
