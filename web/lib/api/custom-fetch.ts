export const customFetch = async <T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> => {
    // 处理基础URL
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;

  
    // 从 localStorage 获取 access_token
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    
    // 准备请求头
    const headers = new Headers(options.headers);
  
    // 如果有 token，添加到 Authorization 头
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  
    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers,
      });
  
      // 处理 401 未授权错误
      if (response.status === 401) {
        // 清除无效的 token
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
        }
        // 可以在这里重定向到登录页面
        if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        throw new Error('Unauthorized: Please login again');
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        // 返回符合生成类型定义的对象
        return {
          data,
          status: response.status,
          headers: response.headers
        } as T;
      }
      if (contentType && contentType.includes('text/')) {
        const text = await response.text();
        return {
          data: text,
          status: response.status,
          headers: response.headers
        } as T;
      }
      return {
        data: response,
        status: response.status,
        headers: response.headers
      } as T;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }; 