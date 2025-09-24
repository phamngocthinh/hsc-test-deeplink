import {
  isChrome,
  isEdge,
  isFirefox,
  isIE,
  isMobile,
  isMobileSafari,
  isOpera,
  isSafari,
  isSamsungBrowser,
  isMIUI,
  isYandex,
} from 'react-device-detect';

export const useIsWebView = () => {
  return (
    isMobile &&
    !isChrome &&
    !isFirefox &&
    !isSafari &&
    !isOpera &&
    !isIE &&
    !isEdge &&
    !isMobileSafari &&
    !isSamsungBrowser &&
    !isMIUI &&
    !isYandex
  );
};
