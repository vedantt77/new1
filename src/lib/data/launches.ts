import { Launch } from '../types/launch';

export const launches: Launch[] = [
  {
    id: 'launch-1',
    name: 'ProductX',
    logo: '/images/eglogo.png',
    description: 'A revolutionary new product management tool',
    launchDate: '2025-02-3',
    website: 'https://example.com',
    category: 'Productivity',
    listingType: 'boosted',
    doFollowBacklink: true
  },
  {
    id: 'launch-2',
    name: 'ProductY',
    logo: '/images/eglogo.png',
    description: 'A revolutionary new product management tool',
    launchDate: '2025-02-3',
    website: 'https://example.com',
    category: 'Productivity',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'launch-3',
    name: 'Productq',
    logo: '/images/eglogo.png',
    description: 'A revolutionary new product management tool',
    launchDate: '2025-02-3',
    website: 'https://example.com',
    category: 'Productivity',
    listingType: 'regular',
    doFollowBacklink: true
  }, 
  {
    id: 'launch-4',
    name: 'Productw',
    logo: '/images/eglogo.png',
    description: 'A revolutionary new product management tool',
    launchDate: '2025-02-3',
    website: 'https://example.com',
    category: 'Productivity',
    listingType: 'regular',
    doFollowBacklink: true
  },
  {
    id: 'launch-5',
    name: 'Productr',
    logo: '/images/eglogo.png',
    description: 'A revolutionary new product management tool',
    launchDate: '2025-02-3',
    website: 'https://example.com',
    category: 'Productivity',
    listingType: 'boosted',
    doFollowBacklink: true
  },
  {
    id: 'launch-6',
    name: 'Productt',
    logo: '/images/eglogo.png',
    description: 'A revolutionary new product management tool',
    launchDate: '2025-02-3',
    website: 'https://example.com',
    category: 'Productivity',
    listingType: 'regular',
    doFollowBacklink: true
  },
   {
    id: 'launch-7',
    name: 'Productu',
    logo: '/images/eglogo.png',
    description: 'A revolutionary new product management tool',
    launchDate: '2025-02-3',
    website: 'https://example.com',
    category: 'Productivity',
    listingType: 'regular',
    doFollowBacklink: true
  },
  // Add more launches as needed
];

export function getLaunches(): Launch[] {
  return launches;
}

export function getWeeklyLaunches(): Launch[] {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  return launches.filter(launch => {
    const launchDate = new Date(launch.launchDate);
    return launchDate >= oneWeekAgo && launchDate <= now;
  });
}
