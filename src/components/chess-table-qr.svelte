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
  const { sequence, fen, fill: boardFill, hasQR, qrData } = chessboard;

  let canvasRef: HTMLCanvasElement | undefined;
  let context: CanvasRenderingContext2D | undefined | null;
  let squareSize: number | undefined;

  function drawMainBoard() {
    if (!context || !squareSize) return;

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const x = col * squareSize;
        const y = row * squareSize;

        // QR Code
        if (hasQR) {
          const bit = qrData[row][col];
          context.fillStyle = bit ? "#000" : "#fff";
          context.fillRect(x, y, squareSize, squareSize);
        }
      }
    }
  }

  onMount(() => {
    if (!hasQR && !canvasRef) return;

    context = canvasRef?.getContext("2d");
    let canvasWidth = canvasRef?.width ?? 1;
    squareSize = canvasWidth / 4;

    drawMainBoard();
  });
</script>

<div
  class="chess-table qr-table aspect-square size-(--chessboard-size) bg-black/50"
  class:hidden={chessState.boardState !== "qr_board"}
  data-sequence={sequence}
  data-fen={fen}
  data-background={boardFill}
  data-has-qr={hasQR}
>
  {#if hasQR}
    <canvas
      bind:this={canvasRef}
      height={CANVAS_SIZE}
      width={CANVAS_SIZE}
      class="w-full"
    ></canvas>
  {/if}
</div>
