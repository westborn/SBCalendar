<script>
  import { createEventDispatcher } from 'svelte'
  import { fly, fade } from 'svelte/transition'
  import Button from './Button.svelte'

  export let title

  const dispatch = createEventDispatcher()

  function closeModal() {
    dispatch('cancel')
  }
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal {
    position: fixed;
    top: 10vh;
    left: 20%;
    max-width: 80%;
    background: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: hidden;
  }

  h3 {
    padding: 1rem;
    margin: 0;
  }

  .content {
    padding: 0 1rem;
  }

  footer {
    padding: 1rem;
  }
</style>

<div transition:fade class="modal-backdrop" on:click={closeModal} />
<div transition:fly={{ y: 300 }} class="modal">
  <h3>{title}</h3>
  <div class="content">
    <slot />
  </div>
  <footer>
    <slot name="footer">
      <Button on:click={closeModal}>Close</Button>
    </slot>
  </footer>
</div>
