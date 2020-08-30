<script>
  export let variant = null
  export let disabled = false
</script>

<style>
  button {
    background-color: transparent;
    color: var(--light-color);
    background-color: var(--primary-color);
    border: 2px solid var(--border-color);
    border-radius: 0.6em;
    border-width: 2px;
    cursor: pointer;
    align-self: center;
    font: inherit;
    font-size: 0.8rem;
    margin: 0.5rem;
    padding: 0.5em;
    text-decoration: none;
    text-align: center;
    font-family: inherit;
    font-weight: 500;
  }

  button:focus {
    outline: none;
  }

  button:hover,
  button:active {
    color: var(--dark-color);
    font-weight: 700;
    border: 2px solid var(--primary-color);
  }

  button:disabled,
  button:disabled:hover,
  button:disabled:active {
    background: #ccc;
    border-color: #ccc;
    color: #959595;
    box-shadow: none;
    cursor: not-allowed;
  }

  .outline {
    background: transparent;
    color: var(--dark-color);
    box-shadow: none;
  }

  .outline:hover,
  .outline:active {
    background: var(--light-color);
    box-shadow: none;
  }

  .outline:disabled,
  .outline:disabled:hover,
  .outline:disabled:active {
    background: transparent;
    color: #ccc;
  }

  .danger {
    color: var(--danger-color);
    background-color: var(--light-color);
    border-color: var(--danger-color);
  }

  .danger:hover,
  .danger:active {
    color: var(--border-color);
    background: var(--danger-color);
    background-color: var(--danger-color);
    border-color: var(--danger-color);
  }
</style>

<button class={variant} type="button" on:click {disabled}>
  <slot />
</button>
