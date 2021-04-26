<script lang="ts">
  import Cell from "./Cell.svelte";
  export let board: boolean[][];
  export let cols: number;
</script>

<div style="grid-template-columns: repeat({cols}, 1fr);">
  {#each board as row, y}
    {#each row as alive, x}
      <Cell {alive} {x} {y} on:setCell />
    {/each}
  {/each}
</div>

<style>
  div {
    display: grid;
    width: max-content;
    border-top: 1px solid #3a3a3a;
    border-left: 1px solid #3a3a3a;
  }
</style>
