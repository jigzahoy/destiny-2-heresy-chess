<script lang="ts">
  import ChessCell from "./chess-cell.svelte";

  interface ChessRowProps {
    rowSymbols: ChessRow;
    chessboard: Chessboard;
    rowIndex: number;
  }

  let { rowSymbols, chessboard, rowIndex }: ChessRowProps = $props();
  const { sequence, fill } = chessboard;

  let cellBg: Chessboard["fill"] | "black" = $state(fill);

  if (rowIndex === 0 || rowIndex === 7) {
    cellBg = "black";
  }
</script>

<tr>
  {#each rowSymbols as piece, i (`cell-${sequence}-row-${rowIndex}-${i}`)}
    <ChessCell {piece} cellIndex={i} background={cellBg} />
  {/each}
</tr>
