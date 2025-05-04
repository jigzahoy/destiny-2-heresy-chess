<script lang="ts">
  import { onMount } from "svelte";
  import { fenToSymbols } from "../lib/fen-to-symbols";

  interface ChessTableProps {
    chessboard: Chessboard;
  }

  let { chessboard }: ChessTableProps = $props();
  const { sequence, fen, fill: boardFill, hasQR, qrData } = chessboard;

  let canvasRef: HTMLCanvasElement | undefined;
  let context: CanvasRenderingContext2D | undefined | null;
  let squareSize: number | undefined;

  const CANVAS_SIZE = 512;

  let symbols = fenToSymbols(fen);

  function drawBoard() {
    if (!context || !squareSize) return;

    context.lineWidth = 1;
    context.strokeStyle = "oklch(87.2% 0.01 258.338)";
    // context.strokeStyle = "oklch(55.1% 0.027 264.364)";

    context.fillStyle = "black";
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    if (boardFill === "lightGray") {
      context.fillStyle = "oklch(92.9% 0.013 255.508)";
    }

    if (boardFill === "darkGray") {
      context.fillStyle = "oklch(27.9% 0.041 260.031)";
    }

    if (boardFill === "lightRed") {
      context.fillStyle = "oklch(71.2% 0.194 13.428)";
    }

    if (boardFill === "darkRed") {
      context.fillStyle = "oklch(45.5% 0.188 13.697)";
    }

    context.fillRect(
      squareSize,
      squareSize,
      CANVAS_SIZE - squareSize * 2,
      CANVAS_SIZE - squareSize * 2
    );

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const x = col * squareSize;
        const y = row * squareSize;
        // const piece = null;
        const piece = symbols[row][col];
        const isMiddle = row > 1 && row < 6 && col > 1 && col < 6;

        // Squares
        if (hasQR && isMiddle) {
          const bitX = row - 2;
          const bitY = col - 2;
          const bit = qrData[bitX][bitY];
          context.fillStyle = bit ? "#000" : "#fff";
          context.fillRect(x, y, squareSize, squareSize);
        }

        // Image
        if (piece) {
          const pieceImage = document.getElementById(
            `chess-${piece}`
          ) as HTMLImageElement;
          if (pieceImage) {
            context?.drawImage(pieceImage, x, y, squareSize, squareSize);
          }
        }

        if (col === 7) {
          context.beginPath();
          context.moveTo(0, y);
          context.lineTo(CANVAS_SIZE, y);
          context.stroke();
        }

        if (row === 7) {
          context.beginPath();
          context.moveTo(x, 0);
          context.lineTo(x, CANVAS_SIZE);
          context.stroke();
        }
      }
    }
  }

  onMount(() => {
    context = canvasRef?.getContext("2d", { alpha: false });
    let canvasWidth = canvasRef?.width ?? 1;
    squareSize = canvasWidth / 8;

    drawBoard();
  });
</script>

<div
  class="aspect-square size-(--chessboard-size)"
  data-sequence={sequence}
  data-fen={fen}
>
  <canvas
    bind:this={canvasRef}
    height={CANVAS_SIZE}
    width={CANVAS_SIZE}
    class="w-full"
  ></canvas>
</div>

<style>
  :root {
    --chessboard-size: 512px;
  }
</style>
