<script lang="ts">
  import { onMount } from "svelte";
  import { fenToSymbols } from "../lib/fen-to-symbols";
  import { CANVAS_SIZE } from "../constants";
  import { intersect } from "@svelte-put/intersect";
  import { chessState } from "../lib/store.svelte";
  import { offscreenLargeIcons } from "../lib/offscreen-icons";

  interface ChessTableProps {
    chessboard: Chessboard;
  }

  let { chessboard }: ChessTableProps = $props();
  const { sequence, fen, fill: boardFill } = chessboard;

  let canvasRef: HTMLCanvasElement | undefined;
  let context: CanvasRenderingContext2D | undefined | null;
  let squareSize: number | undefined;

  const symbols = fenToSymbols(fen);
  const middleSymbol = symbols[3][3] as ChessPiece;

  function drawMainBoard() {
    if (!context || !squareSize) return;

    if (middleSymbol) {
      context.drawImage(offscreenLargeIcons[middleSymbol], 0, 0);
    }
  }

  function onOnce() {
    drawMainBoard();
  }

  onMount(() => {
    if (!middleSymbol && !canvasRef) return;

    context = canvasRef?.getContext("2d");
    let canvasWidth = canvasRef?.width ?? 1;
    squareSize = canvasWidth / 8;
  });
</script>

<div
  class="chess-table endgame-puzzle-table aspect-square size-(--chessboard-size)"
  class:hidden={chessState.boardState !== "endgame_puzzle"}
  data-sequence={sequence}
  data-fen={fen}
  data-background={boardFill}
  use:intersect={{ threshold: 0 }}
  onintersectonce={onOnce}
>
  {#if middleSymbol}
    <canvas
      bind:this={canvasRef}
      height={CANVAS_SIZE}
      width={CANVAS_SIZE}
      class="w-full"
    ></canvas>
  {/if}
</div>
