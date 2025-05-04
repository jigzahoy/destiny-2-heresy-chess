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
</script>

<div class="sr-only" aria-hidden="true">
  {#each Object.keys(ChessPieces) as piece, i (`chess-piece-${i}`)}
    <img id="chess-{piece}" src={ChessPieces[piece]} alt="" />
  {/each}
</div>
