/* ═══════════════════════════════════════════════════════════════════════════
   API Client — AiCarelink Backend 통신 모듈
   JWT 토큰 관리, 로그인/회원가입, 인증된 요청 래퍼
   ═══════════════════════════════════════════════════════════════════════════ */

import { API_BASE_URL } from './constants';

const TOKEN_KEY = 'aicarelink_access_token';
const REFRESH_KEY = 'aicarelink_refresh_token';
const USER_KEY = 'aicarelink_user';

/* ── Token Storage ─────────────────────────────────────────────────────── */

export function getAccessToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(accessToken, refreshToken) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/* ── JWT Decode ────────────────────────────────────────────────────────── */

export function decodeJWT(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/* ── API Fetch Wrapper ─────────────────────────────────────────────────── */

export async function apiFetch(endpoint, options = {}) {
  const { auth = true, ...fetchOptions } = options;

  const headers = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  if (auth) {
    const token = getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Handle 401 — try token refresh
    if (response.status === 401 && auth) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        headers['Authorization'] = `Bearer ${getAccessToken()}`;
        const retryResponse = await fetch(url, {
          ...fetchOptions,
          headers,
        });
        return retryResponse;
      } else {
        clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      }
    }

    return response;
  } catch (error) {
    if (error.message?.includes('인증이 만료')) throw error;
    throw new Error(`API 요청 실패: ${error.message}`);
  }
}

/* ── Token Refresh ─────────────────────────────────────────────────────── */

async function tryRefreshToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) return false;

    const data = await response.json();
    setTokens(data.access_token, data.refresh_token);
    return true;
  } catch {
    return false;
  }
}

/* ── Auth API ──────────────────────────────────────────────────────────── */

/**
 * 로그인
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: data.detail || '로그인에 실패했습니다.',
      status: response.status,
    };
  }

  // Store tokens
  setTokens(data.access_token, data.refresh_token);

  // Decode JWT to get user info
  const decoded = decodeJWT(data.access_token);
  const user = {
    id: decoded?.sub,
    role: decoded?.role,
    email: decoded?.email || email,
  };

  setStoredUser(user);

  return { success: true, user };
}

/**
 * 로그아웃
 */
export async function logout() {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
    } catch {
      // Ignore logout API errors — clear local state anyway
    }
  }
  clearTokens();
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
}

/* ── User API ──────────────────────────────────────────────────────────── */

export async function getCurrentUser() {
  const response = await apiFetch('/api/auth/me');
  if (!response.ok) return null;
  return response.json();
}

/* ── Role-based Redirect ───────────────────────────────────────────────── */

const ROLE_REDIRECT_MAP = {
  patient: '/mypage',
  caregiver: '/mypage',
  hospital_admin: '/mypage',
  shop_admin: null,      // redirected to app server
  platform_admin: null,   // redirected to app server
};

/**
 * 로그인 성공 후 역할에 따라 리다이렉트 URL 반환
 * @param {string} role
 * @param {string} appServerUrl — 실제 앱 서버 URL (관리자용)
 * @returns {string}
 */
export function getRoleRedirect(role, appServerUrl) {
  const localPath = ROLE_REDIRECT_MAP[role];
  if (localPath) return localPath;

  // 관리자 계정은 실제 앱 서버로 리다이렉트
  return appServerUrl || '/';
}
