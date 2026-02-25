import app_icon from '../assets/icons/ic_launcher.png';

export const APP_CONFIG = {
    display_name: 'ZENCODE TALENTLY',
    name: 'ZEN',
    slog: 'TALENTLY',
    icons: [app_icon],
    server_uri: process.env.NEXT_PUBLIC_SERVER_WEB_URL as string,
}