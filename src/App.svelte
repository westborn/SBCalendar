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

  const LOCAL = true

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
        // .withSuccessHandler(populateVolunteers)
        .withUserObject(volunteers.setVolunteers)
        .getSheet('volunteers')
      google.script.run
        // .withSuccessHandler(populateActivities)
        .withSuccessHandler(populateArray)
        .withUserObject(activities.setActivities)
        .getSheet('activities')
      google.script.run
        // .withSuccessHandler(populateDatabase)
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

  function handleEdit({ detail: dbrow }) {
    // function handleEdit(dbrow) {
    taskToEdit = dbrow
    showModal = true
  }
  function cancelEdit() {
    showModal = false
  }

  function clearError() {
    error = null
  }

  function updateTask(e) {
    console.log('updateTask', JSON.stringify(e, null, 2))
    showModal = false
  }

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

<div class="container">

  <h2>Sculpture Bermagui - Volunteer Management</h2>
  {#if error}
    <Error message={error.message} on:cancel={clearError} />
  {/if}

  {#if loading}
    <LoadingSpinner />
  {:else if showModal}
    <TaskEdit {taskToEdit} on:cancel={cancelEdit} on:addVollieToTask={e => updateTask(e.detail)} />
  {:else}
    <Calendar on:edit={handleEdit} />
  {/if}

</div>
