<script>
  import { createEventDispatcher } from 'svelte'

  import activities from '../store/activity-store.js'
  import volunteers from '../store/volunteer-store.js'
  import database from '../store/database-store.js'

  import Modal from '../UI/Modal.svelte'
  import TextInput from '../UI/TextInput.svelte'
  import Button from '../UI/Button.svelte'
  import { isEmpty, isValidEmail } from '../utils/Utils.js'

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

  function getVolunteerName(id) {
    const { firstName, lastName } = getVolunteer(id)
    return `${firstName} ${lastName}`
  }

  $: vollie = getVolunteerName(taskToEdit.volunteerId)
  $: task = getTask(taskToEdit.taskId).taskDescription

  $: vollieValid = !isEmpty(vollie)
  $: formIsValid = vollieValid

  function submitForm() {
    const taskData = {
      date: '',
      taskId: '',
      vollieId: ''
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
    dispatch('save')
  }

  function cancel() {
    dispatch('cancel')
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Change Task Assignment" on:cancel>
  <p>Task: {task}</p>
  <form on:submit={submitForm}>
    <TextInput
      id="vollieId"
      label="Volunteer"
      valid={vollieValid}
      validityMessage="Please select a Vollie."
      value={vollie}
      on:input={event => (vollie = event.target.value)} />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>
    <Button type="button" on:click={deleteTask}>Delete</Button>
  </div>
</Modal>
