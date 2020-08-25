<script>
  import { createEventDispatcher } from 'svelte'

  import activities from '../store/activity-store.js'
  import volunteers from '../store/volunteer-store.js'
  import database from '../store/database-store.js'

  const dispatch = createEventDispatcher()

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
    const activity = $activities.find(el => taskId === el.taskId)
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
    const vollie = $volunteers.find(el => id === el.id)
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
  function eventEdit(e, dbrow) {
    console.log('from cal', dbrow)
    dispatch('edit', dbrow)
  }
  $: dates = [...new Set($database.map(item => item.date))]
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
    box-shadow: 6px 10px 22px -10px rgba(0, 0, 0, 0.5);
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

<div class="calendar">
  {#each dates as day}
    <div class="calendar-card">
      <h3 class="calendar-card-title">
        {fmtDateTimeLocal(day, { weekday: 'short', day: 'numeric', month: 'short' })}
      </h3>
      <p class="calendar-card-p">
        {#each $database.filter(item => item.date === day) as dbrow}
          <div class="calendar-card-info" on:dblclick={e => eventEdit(e, dbrow)}>
            <span class="calendar-span-left">{getTask(dbrow.taskId).taskDescription}</span>
            <span class="calendar-span-right">{getVolunteerName(dbrow.volunteerId)}</span>
            <br />
          </div>
        {/each}
      </p>
    </div>
  {/each}
</div>
