<script>
  import { onMount } from 'svelte'

  // import { VOLUNTEERS, ACIVITIES, DATABASE } from './DATA.js'

  const LOCAL = true

  onMount(() => {
    if (LOCAL) {
      console.log('LOCAL')
    } else {
      console.log('SPREADSHEET')
      // google.script.run.withSuccessHandler(populateCalendars).getCalendarList()
    }
  })
</script>

<style>

</style>

<div class="container">

  <h2>Main APP</h2>

</div>
