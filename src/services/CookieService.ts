import Cookie, { CookieSetOptions } from "universal-cookie";
const cookies = new Cookie();

interface ICookieService {
  get(name: string): string | undefined;
  set(name: string, value: unknown, options?: CookieSetOptions): void;
  remove(name: string): void;
}

class CookieService implements ICookieService {
  get(name: string): string | undefined {
    return cookies.get(name);
  }

  set(name: string, value: unknown, options?: CookieSetOptions): void {
    return cookies.set(name, value, options);
  }

  remove(name: string): void {
    return cookies.remove(name);
  }
}

export default new CookieService();
