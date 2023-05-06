import type { Filters, Observation } from '../types'

export function filterObservations(pieces: Observation[], filters: Filters): Observation[] {
  const query = filters.query.trim().toLocaleLowerCase()
  return pieces.filter((piece) => {
    const matchesQuery = !query || [piece.name, piece.category, piece.notes, String(piece.number)].some((value) => value.toLocaleLowerCase().includes(query))
    const matchesCategory = filters.category === 'all' || piece.category === filters.category
    const matchesStatus = filters.status === 'all' || (filters.status === 'logged' ? piece.logged : !piece.logged)
    const matchesPriority = !filters.priorityOnly || piece.priority
    return matchesQuery && matchesCategory && matchesStatus && matchesPriority
  })
}

export function firingProgress(pieces: Observation[]): { done: number; total: number; percent: number } {
  const done = pieces.filter((piece) => piece.logged).length
  const total = pieces.length
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 }
}

