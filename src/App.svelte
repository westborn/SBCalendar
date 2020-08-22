<script>
  import { onMount } from 'svelte'

  import { VOLUNTEERS, ACTIVITIES, DATABASE } from './DATA.js'

  const LOCAL = false
  let volunteers = []
  let activities = []
  let database = []

  onMount(() => {
    if (LOCAL) {
      console.log('LOCAL')
      doIninitialise()
    } else {
      console.log('SPREADSHEET')
      google.script.run.withSuccessHandler(populateVolunteers).getSheet('volunteers')
      google.script.run.withSuccessHandler(populateActivities).getSheet('activities')
      google.script.run.withSuccessHandler(populateDatabase).getSheet('database')
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

  // weekday: 'short',
  // month: 'short',
  // day: 'numeric',
  // year: 'numeric',
  // hour: 'numeric',
  // minute: '2-digit',
  // second: '2-digit',
  // hour12: true,

  function fmtDateTimeLocal(
    dte = new Date(),
    options = {
      month: 'short',
      day: 'numeric'
    }
  ) {
    return new Date(dte).toLocaleString('en-AU', options)
  }

  function getTask(taskId) {
    const activity = activities.find(el => taskId === el.taskId)
    return activity
      ? activity
      : {
          taskId,
          taskDescription: 'WhatThe',
          date: new Date(),
          location: 'WhereThe',
          startTime: '1899-12-30T08:00:00.000Z',
          endTime: '1899-12-29T22:00:00.000Z'
        }
  }

  function getVolunteer(id) {
    const vollie = volunteers.find(el => id === el.id)
    return vollie
      ? vollie
      : {
          id,
          firstName: 'WhatFirst',
          lastName: 'WhatLast',
          email: 'WhatTheEmail',
          phone: 'WhatThePhone',
          notes2020: '',
          notes2019: '',
          activity2019: '',
          activity2020: ''
        }
  }

  function getVolunteerName(id) {
    const { firstName, lastName } = getVolunteer(id)
    return `${firstName} ${lastName}`
  }

  let initialised = false

  $: dates = [...new Set(database.map(item => item.date))]
</script>

<style>
  .calendar {
    padding: 1em;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1em;
  }

  .calendar-card-title {
    background-color: #e8e8e8;
    border-radius: 7px;
    text-align: center;
    grid-column: 1 / -1;
  }
  .calendar-card {
    box-shadow: 10px 20px 40px -18px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
  }

  .calendar-card-p {
    font-size: 0.9rem;
  }

  .calendar-card-info {
    display: flex;
    background-color: #f5f5f5;
    padding: 0 0 0.5em 0.5em;
  }

  .calendar-card-info:hover {
    border: 1px solid gray;
    border-radius: 7px;
  }

  .calendar-card-info:nth-child(even) {
    background-color: #e8e8e8;
  }

  .calendar-span-left {
    width: 60%;
  }
  .calendar-span-right {
    width: 40%;
    padding-left: 0.3em;
  }
</style>

<div class="container">

  <h2>Main APP</h2>

  {#if initialised}
    <div class="calendar">
      {#each dates as day}
        <div class="calendar-card">
          <h3 class="calendar-card-title">
            {fmtDateTimeLocal(day, { weekday: 'short', day: 'numeric', month: 'short' })}
          </h3>
          <p class="calendar-card-p">
            {#each database.filter(item => item.date === day) as dbrow}
              <div class="calendar-card-info">
                <!-- {JSON.stringify(dbrow, null, 2)} -->
                <span class="calendar-span-left">{getTask(dbrow.taskId).taskDescription}</span>
                <span class="calendar-span-right">{getVolunteerName(dbrow.volunteerId)}</span>
                <br />
              </div>
            {/each}
          </p>
        </div>
      {/each}
    </div>
  {:else}
    <button class="btn" on:click={() => doIninitialise()} disabled={initialised}>Go</button>
  {/if}

</div>
