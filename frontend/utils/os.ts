export const getOS = () => {
  let ret;
  if (
    navigator.userAgent.indexOf('iPhone') > 0 ||
    navigator.userAgent.indexOf('iPad') > 0 ||
    navigator.userAgent.indexOf('iPod') > 0
  ) {
    // iPad OS13のsafariはデフォルト「Macintosh」なので別途要対応
    ret = 'iphone';
  } else if (navigator.userAgent.indexOf('Android') > 0) {
    ret = 'android';
  } else {
    ret = 'pc';
  }

  return ret;
};
