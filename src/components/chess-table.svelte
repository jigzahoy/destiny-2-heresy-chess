<script lang="ts">
  import ChessRow from "./chess-row.svelte";

  interface ChessTableProps {
    chessboard: Chessboard;
  }

  let { chessboard }: ChessTableProps = $props();
  const { symbols, sequence, fen } = chessboard;
</script>

<table class="table-fixed" data-sequence={sequence} data-fen={fen}>
  <tbody>
    {#each symbols as row, i (`row-${sequence}-${i}`)}
      <ChessRow rowSymbols={row} {chessboard} rowIndex={i} />
    {/each}
  </tbody>
</table>
