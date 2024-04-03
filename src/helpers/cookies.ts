export function setCookie(id: string, value: string) {
  document.cookie = `${id}=${value};path=/`;
}

export function getCookie(id: string) {
  let value = document.cookie.match('(^|;)?' + id + '=([^;]*)(;|$)');
  return value ? unescape(value[2]) : null;
}

export function deleteCookie(id: string) {
  document.cookie = `${id}=;`;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  document.cookie = `${id}=; expires=${yesterday.toUTCString()};`;
}