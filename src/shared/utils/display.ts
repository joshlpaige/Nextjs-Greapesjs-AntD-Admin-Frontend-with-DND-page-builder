import { useMediaQuery } from 'react-responsive';

export const XS_MOBILE_WIDTH = 400;
export const MOBILE_WIDTH = 600;
export const TABLET_WIDTH = 800;
export const SMALL_LAPTOP_WIDTH = 1200;
export const LAPTOP_WIDTH = 1440;
export const DESKTOP_WIDTH = 1920;

export const IsXSMobile = () => useMediaQuery({ maxWidth: XS_MOBILE_WIDTH });
export const IsMobile = () => useMediaQuery({ maxWidth: MOBILE_WIDTH });
export const IsTablet = () => useMediaQuery({ maxWidth: TABLET_WIDTH });
export const IsSmallLapTop = () => useMediaQuery({ maxWidth: SMALL_LAPTOP_WIDTH });
