import fs from 'fs';
import path from 'path';

export interface ContactData {
  email: string;
  locationId: string;
  locationEn: string;
  availabilityId: string;
  availabilityEn: string;
}

const contactJsonPath = path.join(process.cwd(), 'content', 'contact.json');

export async function getContactData(): Promise<ContactData> {
  const fallback: ContactData = {
    email: 'aguswahyu@office.awd.my.id',
    locationId: 'Klungkung, Bali / Mataram, NTB, Indonesia',
    locationEn: 'Klungkung, Bali / Mataram, NTB, Indonesia',
    availabilityId: 'Terbuka untuk kolaborasi proyek freelance, pembuatan sistem web, & konsultasi arsitektur cloud/server.',
    availabilityEn: 'Open for freelance project collaboration, web systems development, & cloud/server architecture consultation.',
  };

  try {
    if (!fs.existsSync(contactJsonPath)) {
      return fallback;
    }
    const fileContents = fs.readFileSync(contactJsonPath, 'utf8');
    const data = JSON.parse(fileContents);
    return {
      ...fallback,
      ...data,
    };
  } catch (error) {
    console.error('Error reading content/contact.json:', error);
    return fallback;
  }
}
