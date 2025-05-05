<script lang="ts">
  import { GRID_SIZE } from "../constants";
  import { chessState } from "../lib/store.svelte";
  import ChessTableCanvas from "./chess-table-canvas.svelte";
  import { onMount } from "svelte";
  import ChessTableEndgameCanvas from "./chess-table-endgame-canvas.svelte";
  import ChessTableQr from "./chess-table-qr.svelte";

  // import data from "./../data/exported-data.json";
  // const dataTyped = data as Chessboard[][];
  // let exportedData: Chessboard[][] | undefined = $state(dataTyped);

  let exportedData = $state() as Chessboard[][];
  let isEndgamePuzzleShown = $state(false);

  onMount(async () => {
    const dataJson = await import("./../data/exported-data.json");
    exportedData = dataJson.default as Chessboard[][];
  });

  $effect(() => {
    if (chessState.boardState === "endgame_puzzle" && !isEndgamePuzzleShown) {
      isEndgamePuzzleShown = true;
    }
  });
</script>

<div class="flex w-full h-full" style="--grid-size: repeat({GRID_SIZE}, 1fr);">
  {#if exportedData}
    <div
      class="grid grid-flow-row grid-cols-(--grid-size) grid-rows-(--grid-size) w-fit m-auto"
    >
      {#each { length: GRID_SIZE } as _, rowIndex (`board-row-${rowIndex}`)}
        {#each { length: GRID_SIZE } as _, colIndex (`board-${rowIndex}-${colIndex}`)}
          <div class="w-full">
            <ChessTableCanvas chessboard={exportedData[rowIndex][colIndex]} />

            {#if isEndgamePuzzleShown}
              <ChessTableEndgameCanvas
                chessboard={exportedData[rowIndex][colIndex]}
              />
            {/if}

            {#if chessState.boardState === "qr_board"}
              <ChessTableQr chessboard={exportedData[rowIndex][colIndex]} />
            {/if}
          </div>
        {/each}
      {/each}
    </div>
  {/if}
</div>
