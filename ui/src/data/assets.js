/**
 * Asset registries. All paths use forward slashes and are resolved by Vite's
 * bundler (hashed + optimized at build time) - no fragile backslash URLs.
 */

// Hero / gallery photos
import truck1 from '../assets/truck1.jpg';
import truck2 from '../assets/truck2.jpg';
import truck3 from '../assets/truck3.jpg';
import team from '../assets/team.jpg';
import maal1 from '../assets/maal1.jpg';
import maal2 from '../assets/maal2.jpg';
import maal3 from '../assets/maal3.jpg';

export const HERO_IMAGE = truck1;

export const GALLERY = [
  { src: truck1, alt: 'Shri Nirmal transport truck on route' },
  { src: team, alt: 'The Shri Nirmal & DN Transport team' },
  { src: truck2, alt: 'Loaded delivery truck at the Indore hub' },
  { src: maal1, alt: 'Goods packed and ready for dispatch' },
  { src: maal2, alt: 'Consignment loading in progress' },
  { src: maal3, alt: 'Palletised cargo prepared for transit' },
  { src: truck3, alt: 'Fleet vehicle servicing the regional network' },
];

/**
 * Client logos - eagerly glob-imported so adding a file to assets/logos
 * automatically includes it. Alt text is derived from the file name.
 */
const logoModules = import.meta.glob('../assets/logos/*.{png,jpg,jpeg,svg}', {
  eager: true,
});

function prettifyLogoName(path) {
  const file = path.split('/').pop() ?? '';
  const base = file.replace(/\.[^.]+$/, '');
  return base.charAt(0).toUpperCase() + base.slice(1);
}

export const CLIENT_LOGOS = Object.entries(logoModules)
  .map(([path, mod]) => ({
    src: mod.default,
    alt: `${prettifyLogoName(path)} logo`,
  }))
  .sort((a, b) => a.alt.localeCompare(b.alt));
