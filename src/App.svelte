<script>
  import Game from "./components/Game.svelte";
</script>

<main>
  <h1>Game of Life</h1>
  <Game />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
    margin: 0;
  }
</style>
