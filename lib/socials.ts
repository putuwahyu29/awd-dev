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
    const channels: SocialChannel[] = JSON.parse(fileContents);
    return channels;
  } catch (error) {
    console.error('Error reading content/socials.json:', error);
    return [];
  }
}
