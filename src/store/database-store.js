import { writable } from 'svelte/store'

const database = writable([])

const databaseStore = {
  subscribe: database.subscribe,
  setDatabase: (dataArray) => {
    // sort the database by date and then taskId
    const sortedDB = [...dataArray].sort((a, b) => {
      const datediff = new Date(a.date) - new Date(b.date)
      if (datediff != 0) {
        return datediff
      }
      if (a.taskId !== b.taskId) {
        return a.taskId < b.taskId ? -1 : 1
      }
      if (a.volunteerId !== b.volunteerId) {
        return a.volunteerId < b.volunteerId ? -1 : 1
      }
      return 0
    })
    database.set(sortedDB)
  },
}

export default databaseStore
