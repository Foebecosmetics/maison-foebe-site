import zone_corps from './zone-corps.js';
import zone_emotions from './zone-emotions.js';
import zone_energie from './zone-energie.js';
import zone_environnement from './zone-environnement.js';
import zone_mental from './zone-mental.js';
import zone_relations from './zone-relations.js';
import zone_sens from './zone-sens.js';

export const zones = [zone_corps, zone_emotions, zone_energie, zone_environnement, zone_mental, zone_relations, zone_sens];
export const zoneSlugs = zones.map((zone) => zone.slug);
export function getZoneBySlug(slug) { return zones.find((zone) => zone.slug === slug); }
