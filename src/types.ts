export type ObservationCategory = 'mollusk' | 'algae' | 'crustacean' | 'anemone' | 'fish'

export type Observation = {
  id: string
  name: string
  category: ObservationCategory
  number: number
  logged: boolean
  priority: boolean
  notes: string
}

export type KilnLoad = {
  id: string
  name: string
  studio: string
  city: string
  firingDate: string
  coolDate: string
  pieces: Observation[]
}

export type Filters = {
  query: string
  category: ObservationCategory | 'all'
  status: 'all' | 'logged' | 'unlogged'
  priorityOnly: boolean
}

