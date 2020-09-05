<script>
  import { onMount } from 'svelte'

  import { VOLUNTEERS, ACTIVITIES, DATABASE } from './SECRET/DATA.js'
  import activities from './store/activity-store.js'
  import volunteers from './store/volunteer-store.js'
  import database from './store/database-store.js'

  import Calendar from './components/Calendar.svelte'
  import TaskEdit from './components/TaskEdit.svelte'

  import LoadingSpinner from './UI/LoadingSpinner.svelte'
  import Error from './UI/Error.svelte'

  const LOCAL = false

  onMount(() => {
    if (LOCAL) {
      console.log('LOCAL')
      volunteers.setVolunteers(VOLUNTEERS)
      activities.setActivities(ACTIVITIES)
      database.setDatabase(DATABASE)
      setTimeout(() => (loading = false), 200)
    } else {
      console.log('SPREADSHEET')
      google.script.run
        .withSuccessHandler(populateArray)
        .withUserObject(volunteers.setVolunteers)
        .getSheet('volunteers')
      google.script.run
        .withSuccessHandler(populateArray)
        .withUserObject(activities.setActivities)
        .getSheet('activities')
      google.script.run
        .withSuccessHandler(populateArray)
        .withUserObject(database.setDatabase)
        .getSheet('database')
    }
  })

  function populateArray(data, setStore) {
    setStore(JSON.parse(data))
    if ($volunteers.length > 0 && $activities.length > 0 && $database.length > 0) {
      loading = false
    }
  }

  function doEditTask({ detail: dbrow }) {
    // remember where we are - used after any editing
    taskToEdit = dbrow
    yPos = y
    showModal = true
  }
  function cancelEdit() {
    requestAnimationFrame(() => window.scrollTo(0, yPos))
    showModal = false
  }

  function clearError() {
    error = null
  }

  function updateTask({ date, taskId, vollies } = taskObj) {
    // console.log('updateTask' + date + taskId + vollies.join(' '))
    loading = true
    google.script.run.withSuccessHandler(UpdateTaskComplete).updateDBTask(date, taskId, vollies)
  }

  function UpdateTaskComplete(res) {
    const { status, data } = JSON.parse(res)
    // console.log(status)
    // console.log(data)
    database.setDatabase(data)
    requestAnimationFrame(() => window.scrollTo(0, yPos))
    loading = false
    showModal = false
  }

  let y
  let yPos = 0
  let taskToEdit = {}
  let loading = true
  let showModal = false
  let error
</script>

<style>
  h2 {
    text-align: center;
    padding: 1em;
  }
</style>

<svelte:window bind:scrollY={y} />

<div class="container">

  <h2>Sculpture Bermagui - Volunteer Management</h2>
  {#if error}
    <Error message={error.message} on:cancel={clearError} />
  {/if}

  {#if loading}
    <LoadingSpinner />
  {:else if showModal}
    <TaskEdit {taskToEdit} on:cancel={cancelEdit} on:replaceTask={e => updateTask(e.detail)} />
  {:else}
    <Calendar on:edit={doEditTask} />
  {/if}

</div>
