<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { to_number } from "svelte/internal";
  export let tickRate: number;
  export let betweenGenerations: number;
  export let generationTime: number;
  export let rows: number;
  export let cols: number;
  export let pause: boolean;
  const dispatch = createEventDispatcher();

  const clearBoard = () => dispatch("clearBoard");
  const randomizeBoard = () => dispatch("randomizeBoard");
  const togglePause = () => dispatch("togglePause");
  const setTickRate = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    dispatch("setTickRate", to_number(value));
  };
</script>

<div class="container">
  <div>
    <label>
      Tickrate, ms:
      <input
        type="number"
        min="0"
        max="10000"
        step="1"
        value={tickRate}
        on:input={setTickRate}
      />
    </label>

    <label>
      Rows:
      <input type="number" min="0" max="500" step="1" bind:value={rows} />
    </label>

    <label>
      Columns:
      <input type="number" min="0" max="500" step="1" bind:value={cols} />
    </label>
  </div>
  <div>
    <div class="timer">Generation time: {generationTime}ms</div>
    <div class="timer">
      Render lag: {betweenGenerations}ms
    </div>
  </div>
  <div>
    <button on:click={clearBoard}>Clear board</button>
    <button on:click={randomizeBoard}>Randomize board</button>
    <button on:click={togglePause}>{pause ? "Start" : "Pause"}</button>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 1em 0;
    padding: 0.2em;
    border: 1px solid #3a3a3a;
    box-sizing: border-box;
  }
  .timer {
    display: inline-block;
    width: 15em;
  }
  button {
    padding: 0.2em 0.5em;
  }
</style>
