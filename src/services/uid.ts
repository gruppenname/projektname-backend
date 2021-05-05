import crypto from 'crypto';

export function generateUID() {
  return crypto.randomBytes(9).toString('base64').replace('/', '_').replace('+', '-')
}

