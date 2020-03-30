import { AppConfig } from 'blockstack'

export const appConfig = new AppConfig(['store_write', 'publish_data'])

export const TASK_DATA_FILENAME = 'tasks.json'

export const EXPLORER_URL = 'https://explorer.blockstack.org'

export const IS_CRYPT = true;

export const DECRYPT_OPTIONS = { decrypt: IS_CRYPT };

export const ENCYPT_OPTIONS = { encrypt: IS_CRYPT };

export const avatarFallbackImage = './avatar-placeholder.png';
