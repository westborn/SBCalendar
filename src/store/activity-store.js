import { writable } from 'svelte/store'

const activities = writable([])

const activitiesStore = {
  subscribe: activities.subscribe,
  setActivities: (dataArray) => {
    activities.set(dataArray)
  },
}

export default activitiesStore
