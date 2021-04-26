<script lang="ts">
  import Board from "./Board.svelte";
  import Controls from "./Controls.svelte";
  import { Game } from "../game";

  let rows = Math.floor(window.innerHeight / 12);
  let cols = Math.floor(window.innerWidth / 12);
  let tickRate = 100;

  const game = new Game(cols, rows);
  let board = game.board;
  let lastGenerationStarted = Date.now();
  let betweenGenerations = 0;
  let generationTime = 0;

  $: {
    if (game.rows !== rows || game.cols !== cols) {
      board = game.setSize(cols, rows);
    }
  }

  let interval: number;
  const startInterval = () => {
    lastGenerationStarted = Date.now();
    interval = setInterval(() => {
      const now = Date.now();
      betweenGenerations = now - lastGenerationStarted - tickRate;
      lastGenerationStarted = now;
      board = game.nextGeneration();
      generationTime = Date.now() - lastGenerationStarted;
    }, tickRate);
  };
  const togglePause = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    } else {
      startInterval();
    }
  };
  startInterval();

  const setTickRate = ({ detail }) => {
    tickRate = detail;
    if (interval) {
      clearInterval(interval);
      startInterval();
    }
  };

  const setCell = ({ detail: { x, y, alive } }) => {
    board = game.setCell(x, y, alive);
  };
  const randomizeBoard = () => {
    board = game.randomizeBoard();
  };
  const clearBoard = () => {
    board = game.clearBoard();
  };
</script>

<div class="container">
  <Controls
    {tickRate}
    pause={!interval}
    bind:rows
    bind:cols
    {generationTime}
    {betweenGenerations}
    on:randomizeBoard={randomizeBoard}
    on:clearBoard={clearBoard}
    on:togglePause={togglePause}
    on:setTickRate={setTickRate}
  />
  <Board {board} on:setCell={setCell} {cols} />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: min-content;
  }
</style>
