<script lang="ts">
  import PawnWhite from "../assets/icons/Pw.svg";
  import RookWhite from "../assets/icons/Rw.svg";
  import KnightWhite from "../assets/icons/Nw.svg";
  import BishopWhite from "../assets/icons/Bw.svg";
  import QueenWhite from "../assets/icons/Qw.svg";
  import KingWhite from "../assets/icons/Kw.svg";

  import PawnBlack from "../assets/icons/Pb.svg";
  import RookBlack from "../assets/icons/Rb.svg";
  import KnightBlack from "../assets/icons/Nb.svg";
  import BishopBlack from "../assets/icons/Bb.svg";
  import QueenBlack from "../assets/icons/Qb.svg";
  import KingBlack from "../assets/icons/Kb.svg";

  interface ChessCellType {
    piece: ChessPiece;
    cellIndex: number;
    background: Chessboard["fill"] | "black";
  }

  let { piece, cellIndex, background }: ChessCellType = $props();

  const ChessPieces = {
    Pw: PawnWhite,
    Rw: RookWhite,
    Nw: KnightWhite,
    Bw: BishopWhite,
    Qw: QueenWhite,
    Kw: KingWhite,
    Pb: PawnBlack,
    Rb: RookBlack,
    Nb: KnightBlack,
    Bb: BishopBlack,
    Qb: QueenBlack,
    Kb: KingBlack,
  };

  let bgClass = $state("");

  if (background === "lightGray") {
    bgClass = "bg-gray-400";
  }

  if (background === "darkGray") {
    bgClass = "bg-gray-700";
  }

  if (background === "lightRed") {
    bgClass = "bg-rose-400";
  }

  if (background === "darkRed") {
    bgClass = "bg-rose-700";
  }

  if (cellIndex === 0 || cellIndex === 7 || background === "black") {
    bgClass = "bg-slate-900 text-slate-100";
  }
</script>

<td class={`border p-0 ${bgClass}`}>
  <div
    class="chess-cell aspect-square size-[64px] flex place-content-center items-center"
    data-piece={piece ? piece : null}
  >
    {#if piece}
      <img src={ChessPieces[piece]} alt="" />
    {/if}
  </div>
</td>
