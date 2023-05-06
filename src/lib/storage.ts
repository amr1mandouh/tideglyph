import type { KilnLoad } from '../types'

const STORAGE_KEY = 'tideglyph.loads'

export function sampleKilnLoads(): KilnLoad[] {
  return [
    {
      id: 'load-amber', name: 'Low Water Census', studio: 'Coastal Field Desk', city: 'Alexandria', firingDate: '2026-08-21', coolDate: '2026-08-23',
      pieces: [
        { id: 'amber-01', name: 'Blue mussel colony', category: 'mollusk', number: 1, logged: true, priority: true, notes: 'Celadon rim; handle needs a gentle shelf.' },
        { id: 'amber-02', name: 'Ribbon kelp', category: 'algae', number: 2, logged: false, priority: false, notes: 'Oxide wash on the outside.' },
        { id: 'amber-03', name: 'Shore crab', category: 'crustacean', number: 3, logged: false, priority: true, notes: 'Commission set, keep together.' },
        { id: 'amber-04', name: 'Glass anemone', category: 'anemone', number: 4, logged: false, priority: false, notes: 'Leave space around the neck.' },
        { id: 'amber-05', name: 'Silver sand smelt', category: 'fish', number: 5, logged: true, priority: false, notes: 'Photograph before packing.' }
      ]
    },
    {
      id: 'load-cinder', name: 'Moonpool Notes', studio: 'Saltwind Annex', city: 'Cairo', firingDate: '2026-08-28', coolDate: '2026-08-30',
      pieces: [
        { id: 'cinder-01', name: 'Ash handle tumbler', category: 'mollusk', number: 1, logged: false, priority: true, notes: 'Test glaze A7.' },
        { id: 'cinder-02', name: 'Salt pocket algae', category: 'algae', number: 2, logged: false, priority: false, notes: 'Place on a cookie.' },
        { id: 'cinder-03', name: 'Night market anemone', category: 'anemone', number: 3, logged: false, priority: false, notes: 'Tall shelf only.' }
      ]
    }
  ]
}

export function loadKilnLoads(): KilnLoad[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return sampleKilnLoads()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) throw new Error('Invalid kiln data')
    return parsed as KilnLoad[]
  } catch {
    return sampleKilnLoads()
  }
}

export function saveKilnLoads(loads: KilnLoad[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(loads))
}

