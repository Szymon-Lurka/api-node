import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const getDirname = (metaUrl) => dirname(fileURLToPath(metaUrl ? metaUrl : import.meta.url));
