<script lang="ts">
  import ChessTableCanvas from "./chess-table-canvas.svelte";
  import { onMount } from "svelte";

  // import data from "./../data/exported-data.json";
  // const dataTyped = data as Chessboard[][];
  // let exportedData: Chessboard[][] | undefined = $state(dataTyped);

  let exportedData = $state() as Chessboard[][];
  onMount(async () => {
    const dataJson = await import("./../data/exported-data.json");
    exportedData = dataJson.default as Chessboard[][];
  });

  const GRID_SIZE = 64;
</script>

<div style="--grid-size: repeat({GRID_SIZE}, 1fr);">
  {#if exportedData}
    <div
      class="grid grid-flow-row grid-cols-(--grid-size) grid-rows-(--grid-size) w-fit"
    >
      {#each { length: GRID_SIZE } as row, i (`board-row-${i}`)}
        {#each { length: GRID_SIZE } as board, j (`board-${i}-${j}`)}
          <ChessTableCanvas chessboard={exportedData[i][j]} />
        {/each}
      {/each}
    </div>
  {/if}
</div>
