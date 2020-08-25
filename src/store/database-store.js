import { writable } from 'svelte/store'

const database = writable([])

const databaseStore = {
  subscribe: database.subscribe,
  setDatabase: (dataArray) => {
    database.set(dataArray)
  },
}

export default databaseStore
