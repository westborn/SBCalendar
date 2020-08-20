<script>
  import { onMount } from 'svelte'

  // import { VOLUNTEERS, ACIVITIES, DATABASE } from './DATA.js'

  const LOCAL = true
  let volunteers = []
  let activities = []
  let database = []

  import { VOLUNTEERS, ACTIVITIES, DATABASE } from './DATA.js'

  onMount(() => {
    if (LOCAL) {
      console.log('LOCAL')
    } else {
      console.log('SPREADSHEET')
      // google.script.run.withSuccessHandler(dataReceived).getData()
    }
  })

  function dataReceived(data) {
    console.log('datareceived')
    console.log(data)
  }

  const doIninitialise = () => {
    console.log('Initialise')
    if (LOCAL) {
      console.log('Initialise LOCAL')
      populateVolunteers(VOLUNTEERS)
      populateActivities(ACTIVITIES)
      populateDatabase(DATABASE)
      initialised = true
      return
    } else {
      console.log('Initialise SHEET')
      google.script.run.withSuccessHandler(populateVolunteers).getSheet('volunteers')
      google.script.run.withSuccessHandler(populateActivities).getSheet('activities')
      google.script.run.withSuccessHandler(populateDatabase).getSheet('database')
    }
    initialised = true
  }

  function populateVolunteers(data) {
    console.log('populateVolunteers')
    // volunteers = JSON.parse(data)
  }

  function populateActivities(data) {
    console.log('populateActivities')
    activities = JSON.parse(data)
    // console.log(JSON.stringify(activities))
  }

  function populateDatabase(data) {
    console.log('populateDatabase')
    // database = JSON.parse(data)
  }

  function formatDate(dte) {
    return new Date(dte).toLocaleString('en-AU', {
      month: 'short',
      day: 'numeric'
    })
  }

  function formatTime(tme) {
    return new Date(tme).toLocaleString('en-AU', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  let initialised = false
</script>

<style>
  .activity {
    display: flex;
    width: 700px;
  }
  .col {
    width: 220px;
  }
</style>

<div class="container">

  <h2>Main APP</h2>
  {#if initialised}
    <ul>
      {#each activities as activity}
        <li>
          <div class="activity">
            <span class="col">{activity.taskId} - {activity.location}</span>
            <span class="col">
              {formatDate(activity.date)} - {formatTime(activity.startTime)}
              {activity.endTime === '' ? '' : 'to ' + formatTime(activity.endTime)}
            </span>
            <span class="col">{activity.taskDescription}</span>
          </div>
        </li>
      {/each}
    </ul>
  {:else}
    <button class="btn" on:click={() => doIninitialise()} disabled={initialised}>Go</button>
  {/if}

</div>
