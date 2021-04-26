<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let alive: boolean;
  export let x: number;
  export let y: number;

  const dispatch = createEventDispatcher();
  const toggleCell = () => {
    dispatch("setCell", {
      x,
      y,
      alive: !alive,
    });
  };
  const onMouseOver = (e) => {
    if (e.buttons & 1) {
      toggleCell();
    }
  };
</script>

<div
  class="cell"
  class:alive
  on:click={toggleCell}
  on:mouseover={onMouseOver}
/>

<style>
  .cell {
    height: 10px;
    width: 10px;
    border-bottom: 1px solid #3a3a3a;
    border-right: 1px solid #3a3a3a;
    box-sizing: border-box;
  }
  .cell.alive {
    background: #3a3a3a;
  }
</style>
