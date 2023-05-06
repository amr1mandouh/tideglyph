import { useCallback, useEffect, useMemo, useState } from 'react'
import { filterObservations } from '../lib/filters'
import { createId } from '../lib/id'
import { loadKilnLoads, saveKilnLoads } from '../lib/storage'
import type { Filters, KilnLoad, Observation, ObservationCategory } from '../types'

const defaultFilters: Filters = { query: '', category: 'all', status: 'all', priorityOnly: false }

export function useTideGlyph() {
  const [loads, setLoads] = useState<KilnLoad[]>(loadKilnLoads)
  const [activeLoadId, setActiveLoadId] = useState('load-amber')
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [selected, setSelected] = useState<Set<string>>(() => new Set())
  const [announcement, setAnnouncement] = useState('')

  const activeLoad = useMemo(() => loads.find((load) => load.id === activeLoadId) ?? loads[0], [activeLoadId, loads])
  const visibleObservations = useMemo(() => filterObservations(activeLoad?.pieces ?? [], filters), [activeLoad, filters])

  useEffect(() => saveKilnLoads(loads), [loads])

  const switchLoad = useCallback((id: string) => {
    setActiveLoadId(id)
    setFilters(defaultFilters)
    setSelected(new Set())
    setAnnouncement('Survey changed and filters reset.')
  }, [])

  const updateFilters = useCallback((next: Partial<Filters>) => setFilters((current) => ({ ...current, ...next })), [])

  const toggleSelected = useCallback((id: string) => {
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const toggleAllVisible = useCallback(() => {
    setSelected((current) => {
      const next = new Set(current)
      const allVisibleSelected = visibleObservations.length > 0 && visibleObservations.every((piece) => next.has(piece.id))
      visibleObservations.forEach((piece) => allVisibleSelected ? next.delete(piece.id) : next.add(piece.id))
      return next
    })
  }, [visibleObservations])

  const markSelected = useCallback((logged: boolean) => {
    setLoads((current) => current.map((load) => load.id !== activeLoad?.id ? load : ({ ...load, pieces: load.pieces.map((piece) => selected.has(piece.id) ? { ...piece, logged } : piece) })))
    setAnnouncement(selected.size + ' selected observation' + (selected.size === 1 ? '' : 's') + ' marked ' + (logged ? 'logged' : 'unlogged') + '.')
    setSelected(new Set())
  }, [activeLoad?.id, selected])

  const addObservation = useCallback((piece: Omit<Observation, 'id' | 'number'>) => {
    setLoads((current) => current.map((load) => load.id !== activeLoad?.id ? load : ({ ...load, pieces: [...load.pieces, { ...piece, id: createId(), number: load.pieces.length + 1 }] })))
    setAnnouncement(piece.name + ' added to the survey.')
  }, [activeLoad?.id])

  const categoryCounts = useMemo(() => activeLoad?.pieces.reduce<Record<string, number>>((counts, piece) => ({ ...counts, [piece.category]: (counts[piece.category] ?? 0) + 1 }), {}) ?? {}, [activeLoad])

  return { loads, activeLoad, filters, visibleObservations, selected, announcement, categoryCounts, switchLoad, updateFilters, toggleSelected, toggleAllVisible, markSelected, addObservation }
}

export type TideGlyphState = ReturnType<typeof useTideGlyph>
export type AddObservationInput = Omit<Observation, 'id' | 'number'>
export type Category = ObservationCategory

