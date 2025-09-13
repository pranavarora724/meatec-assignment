import {create} from 'zustand';


type AuthState = {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
};

export const AuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('user_token') || null, // load initial value manually
  setToken: (token) => {
    if (token) localStorage.setItem('user_token', token);
    else localStorage.removeItem('user_token');
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem('user_token');
    set({ token: null });
  },
}));