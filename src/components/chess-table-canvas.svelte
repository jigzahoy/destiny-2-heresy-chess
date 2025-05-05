<script lang="ts">
  import { onMount } from "svelte";
  import { intersect } from "@svelte-put/intersect";
  import { fenToSymbols } from "../lib/fen-to-symbols";
  import { CANVAS_SIZE } from "../constants";
  import { offscreenIcons } from "../lib/offscreen-icons";
  import { chessState } from "../lib/store.svelte";

  interface ChessTableProps {
    chessboard: Chessboard;
  }

  let { chessboard }: ChessTableProps = $props();
  const { sequence, fen, fill: boardFill, hasQR, qrData } = chessboard;

  let canvasRef: HTMLCanvasElement | undefined;
  let context: CanvasRenderingContext2D | undefined | null;
  let squareSize: number | undefined;

  const symbols = fenToSymbols(fen) as ChessPiece[][];

  function drawBoard() {
    if (!context || !squareSize) return;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const x = col * squareSize;
        const y = row * squareSize;
        // const piece = null;
        const piece = symbols[row][col];
        const isMiddle = row > 1 && row < 6 && col > 1 && col < 6;

        // QR Code
        if (hasQR && isMiddle) {
          const bitX = row - 2;
          const bitY = col - 2;
          const bit = qrData[bitX][bitY];
          context.fillStyle = bit ? "#000" : "#fff";
          context.fillRect(x, y, squareSize, squareSize);
        }

        // Image
        if (piece) {
          context.drawImage(offscreenIcons[piece], x, y);
        }
      }
    }
  }

  function onOnce() {
    drawBoard();
  }

  onMount(() => {
    context = canvasRef?.getContext("2d");
    let canvasWidth = canvasRef?.width ?? 1;
    squareSize = canvasWidth / 8;
  });
</script>

<div
  class="chess-table sequence-table aspect-square size-(--chessboard-size)"
  class:hidden={chessState.boardState !== "sequence_board"}
  data-sequence={sequence}
  data-fen={fen}
  data-background={boardFill}
  use:intersect={{ threshold: 0 }}
  onintersectonce={onOnce}
>
  <canvas
    bind:this={canvasRef}
    height={CANVAS_SIZE}
    width={CANVAS_SIZE}
    class="w-full"
  ></canvas>
</div>
