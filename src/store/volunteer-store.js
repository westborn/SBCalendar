import { writable } from 'svelte/store'

const volunteers = writable([])

const volunteersStore = {
  subscribe: volunteers.subscribe,
  setVolunteers: (dataArray) => {
    volunteers.set(dataArray)
  },
}

export default volunteersStore
