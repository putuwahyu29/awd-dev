import fs from 'fs';
import path from 'path';

export interface SocialChannel {
  id: string;
  name: string;
  handle: string;
  role: string;
  roleEn: string;
  followers?: string;
  url: string;
  iconKey: string;
  accentColor: string;
}

const socialsJsonPath = path.join(process.cwd(), 'content', 'socials.json');

export async function getSocialChannels(): Promise<SocialChannel[]> {
  try {
    if (!fs.existsSync(socialsJsonPath)) {
      return [];
    }

    const fileContents = fs.readFileSync(socialsJsonPath, 'utf8');
    const parsed = JSON.parse(fileContents);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    if (parsed && Array.isArray(parsed.channels)) {
      return parsed.channels;
    }
    return [];
  } catch (error) {
    console.error('Error reading content/socials.json:', error);
    return [];
  }
}
