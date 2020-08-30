<script>
  import { onMount } from 'svelte'
  import { createEventDispatcher } from 'svelte'

  import activities from '../store/activity-store.js'
  import volunteers from '../store/volunteer-store.js'
  import database from '../store/database-store.js'

  import { fmtDateTimeLocal, isEmpty } from '../Utils/Utils.js'

  import Modal from '../UI/Modal.svelte'
  import TextInput from '../UI/TextInput.svelte'
  import Button from '../UI/Button.svelte'

  export let taskToEdit

  const dispatch = createEventDispatcher()

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
  function getVolunteerName(id, surnameFirst = false) {
    const { firstName, lastName } = getVolunteer(id)
    return surnameFirst ? `${lastName}, ${firstName}` : `${firstName} ${lastName}`
  }

  function addVollieToTask() {
    if (theseTasks.vollies.find(vollie => vollie === selectedVollieId)) {
      selectedVollieId = ''
    } else {
      theseTasks.vollies.push(selectedVollieId)
      dispatch('addVollieToTask', theseTasks)
    }
  }

  function deleteTask() {
    // fetch(`https://svelte-course.firebaseio.com/meetups/${id}.json`, {
    //   method: "DELETE"
    // })
    //   .then(res => {
    //     if (!res.ok) {
    //       throw new Error("An error occurred, please try again!");
    //     }
    //     meetups.removeMeetup(id);
    //   })
    //   .catch(err => console.log(err));
    dispatch('remove')
  }

  function cancel() {
    dispatch('cancel')
  }

  function setUpdate(task) {
    const dayTask = $database.filter(
      item => item.date === taskToEdit.date && item.taskId === taskToEdit.taskId
    )
    if (!dayTask) {
      return { date: null, taskId: null, vollies: [] }
    }
    const taskObj = dayTask.reduce(
      (acc, cur) => {
        if (cur.volunteerId !== '999-VH') {
          acc.vollies.push(cur.volunteerId)
        }
        return acc
      },
      { date: taskToEdit.date, taskId: taskToEdit.taskId, vollies: [] }
    )
    if (taskObj.vollies.length > 0) {
      volliesAlreadyAssinged = true
    } else {
      volliesAlreadyAssinged = false
    }
    if (taskObj.vollies.length >= 1) {
      allowDeleteAll = true
    } else {
      allowDeleteAll = false
    }
    return taskObj
  }

  function trashVollie(vollieId) {
    console.log('trash', vollieId)
  }
  function removeAll() {
    console.log('trashVollieAll')
  }

  let allowDeleteAll
  let volliesAlreadyAssinged
  // let selectedVollieId = taskToEdit.volunteerId
  let selectedVollieId = ''
  let theseTasks = setUpdate(taskToEdit)

  let volliesSorted = $volunteers
    .map(item => {
      return { id: item.id, name: item.lastName }
    })
    .sort((a, b) => {
      if (a.name < b.name) return -1
    })

  $: vollie = selectedVollieId
  $: vollieValid = !isEmpty(vollie)
  $: formIsValid = vollieValid
  $: task = getTask(theseTasks.taskId).taskDescription
  $: date = fmtDateTimeLocal(theseTasks.date, { weekday: 'short', day: 'numeric', month: 'short' })
</script>

<style>
  form {
    width: 100%;
  }
  .vollies-assigned {
    display: grid;
    margin: 0;
  }
  svg {
    fill: var(--danger-color);
    width: 1em;
    height: 1em;
  }
  svg:hover {
    width: 1.5em;
    height: 1.5em;
  }
  rect.clickable {
    stroke: #fff;
    fill: #fff;
    fill-opacity: 0;
    stroke-opacity: 0;
    cursor: pointer;
  }
</style>

<!-- get all with same date and task
if > 1 - mark all with delete button and allow add
if 1 and id = VH-999 allow add
if 1 - mark with delete and allow add
if 0 - error -->

<Modal title="{date} - {task}" on:cancel>
  {#if volliesAlreadyAssinged}
    <div class="vollies-assigned">
      <span>Currently Assigned:</span>
      {#each theseTasks.vollies as vollie}
        <span>
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="41.336px"
            height="41.336px"
            viewBox="0 0 41.336 41.336"
            style="enable-background:new 0 0 41.336 41.336;"
            xml:space="preserve">
            <g>
              <path
                d="M36.335,5.668h-8.167V1.5c0-0.828-0.672-1.5-1.5-1.5h-12c-0.828,0-1.5,0.672-1.5,1.5v4.168H5.001c-1.104,0-2,0.896-2,2
                s0.896,2,2,2h2.001v29.168c0,1.381,1.119,2.5,2.5,2.5h22.332c1.381,0,2.5-1.119,2.5-2.5V9.668h2.001c1.104,0,2-0.896,2-2
                S37.438,5.668,36.335,5.668z
                M14.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5
                s1.5,0.672,1.5,1.5V35.67z
                M22.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5
                s1.5,0.672,1.5,1.5V35.67z M25.168,5.668h-9V3h9V5.668z
                M30.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21
                c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z" />
              <rect
                class="clickable"
                x="0"
                y="0"
                width="42"
                height="42"
                on:click={() => trashVollie(vollie)} />
            </g>
          </svg>
          {getVolunteerName(vollie)}
        </span>
      {/each}
    </div>
  {/if}

  <div class="input-field">
    <label for vollie-select>Assign task to:</label>
    <select id="vollie-select" bind:value={selectedVollieId}>
      <option value="" />
      {#each volliesSorted as item (item.id)}
        <option value={item.id}>{getVolunteerName(item.id, true)}</option>
      {/each}
    </select>
  </div>

  <div slot="footer">
    <Button variant="outline" on:click={cancel}>Cancel</Button>
    <Button on:click={addVollieToTask} disabled={!formIsValid}>Save</Button>
    {#if allowDeleteAll}
      <Button variant="danger" on:click={removeAll}>Delete ALL Vollies</Button>
    {/if}
  </div>
</Modal>
