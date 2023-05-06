import { describe, expect, it } from 'vitest'
import { filterObservations, firingProgress } from './filters'
import type { Filters, Observation } from '../types'

const pieces: Observation[] = [
  { id: 'a', name: 'Blue Mug', category: 'mollusk', number: 1, logged: true, priority: true, notes: 'gloss' },
  { id: 'b', name: 'Quiet Bowl', category: 'algae', number: 2, logged: false, priority: false, notes: 'matte' }
]
const base: Filters = { query: '', category: 'all', status: 'all', priorityOnly: false }

describe('filterObservations', () => {
  it('returns all pieces by default', () => { expect(filterObservations(pieces, base)).toHaveLength(2); expect(firingProgress(pieces).percent).toBe(50) })
  it('matches name and notes', () => expect(filterObservations(pieces, { ...base, query: 'MATTE' })[0].id).toBe('b'))
  it('filters by category', () => expect(filterObservations(pieces, { ...base, category: 'mollusk' })[0].id).toBe('a'))
  it('filters logged status', () => expect(filterObservations(pieces, { ...base, status: 'logged' })[0].id).toBe('a'))
  it('filters unlogged status', () => expect(filterObservations(pieces, { ...base, status: 'unlogged' })[0].id).toBe('b'))
  it('filters priority only', () => expect(filterObservations(pieces, { ...base, priorityOnly: true })[0].id).toBe('a'))
})
