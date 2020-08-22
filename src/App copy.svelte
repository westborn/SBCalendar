<script>
  import { onMount } from 'svelte'
  import SvelteTable from './components/SvelteTable.svelte'
  import { columns } from './components/volunteerTable.js'

  import { VOLUNTEERS, ACTIVITIES, DATABASE } from './DATA.js'

  const LOCAL = true
  let volunteers = []
  let activities = []
  let database = []

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
      populateVolunteers(JSON.stringify(VOLUNTEERS))
      populateActivities(JSON.stringify(ACTIVITIES))
      populateDatabase(JSON.stringify(DATABASE))
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
    volunteers = JSON.parse(data)
    console.log(`populateVolunteers : ${volunteers.length}`)
    // console.log(JSON.stringify(volunteers))
  }

  function populateActivities(data) {
    activities = JSON.parse(data)
    console.log(`populateActivities : ${activities.length}`)
  }

  function populateDatabase(data) {
    database = JSON.parse(data)
    console.log(`populateDatabase : ${database.length}`)
    // console.log(JSON.stringify(database))
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
  /* .activity {
    display: grid;
    grid-template-columns: minmax(0, 12em) minmax(0, 15em) 1fr;
    gap: 5px;
  } */
</style>

<div class="container">

  <h2>Main APP</h2>

  {#if initialised}
    <SvelteTable {columns} rows={volunteers} />

    <!-- <ul>
      {#each volunteers as volunteer}
        <li>
          <div class="volunteer">
            <span>{volunteer.id} - {volunteer.firstName} {volunteer.lastName}</span>
            <span>{volunteer.email}</span>
          </div>
        </li>
      {/each}
    </ul>
    <ul>
      {#each activities as activity}
        <li>
          <div class="activity">
            <span>{activity.taskId} - {activity.location}</span>
            <span>
              {formatDate(activity.date)} - {formatTime(activity.startTime)}
              {activity.endTime === '' ? '' : 'to ' + formatTime(activity.endTime)}
            </span>
            <span>{activity.taskDescription}</span>
          </div>
        </li>
      {/each}
    </ul> -->
  {:else}
    <button class="btn" on:click={() => doIninitialise()} disabled={initialised}>Go</button>
  {/if}

</div>
