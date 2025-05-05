<script lang="ts">
  import { tick } from "svelte";
  import { chessState } from "../lib/store.svelte";

  const root = document.querySelector(":root");

  let zoomValue = $state(100);
  let hasQrModeViewedOnce = false;

  $effect(() => {
    const scaleMultiplier = zoomValue / 100;
    // @ts-expect-error: Change root style
    root.style.setProperty("--scale-multiplier", scaleMultiplier);
  });

  $effect(() => {
    if (chessState.boardState === "qr_board") {
      if (!hasQrModeViewedOnce) {
        zoomValue = 8;

        tick().then(() => {
          const scrollXMid =
            (document.body.scrollWidth - document.body.clientWidth) / 2;
          const scrollYMid =
            (document.body.scrollHeight - document.body.clientHeight) / 2;

          window.scrollTo({
            top: scrollYMid,
            left: scrollXMid,
            behavior: "smooth",
          });
        });
      }

      hasQrModeViewedOnce = true;
    }
  });
</script>

<div
  class="fixed z-50 text-white border border-white shadow-sm bg-black/80 top-4 right-4 min-w-xs backdrop-blur-xs"
>
  <details>
    <summary class="px-2 py-2 font-medium tracking-wide uppercase">
      Settings
    </summary>
    <div class="px-2 py-2 border-t border-gray-400">
      <label class="flex gap-2">
        <span>Zoom</span>
        <input
          bind:value={zoomValue}
          type="range"
          class="w-full"
          name="zoom"
          id="zoom"
          step="1"
          min="2"
          max="100"
        />
      </label>

      <fieldset class="mt-1">
        <legend>View Chessboard</legend>

        <label class="flex gap-2">
          <input
            type="radio"
            bind:group={chessState.boardState}
            name="board"
            value="sequence_board"
            checked
          />
          <span>Sequence Boards</span>
        </label>

        <label class="flex gap-2">
          <input
            type="radio"
            bind:group={chessState.boardState}
            name="board"
            value="qr_board"
          />
          <span>QR Code</span>
        </label>

        <label class="flex gap-2">
          <input
            type="radio"
            bind:group={chessState.boardState}
            name="board"
            value="endgame_puzzle"
          />
          <span>Endgame Puzzle</span>
        </label>

        <label class="flex gap-2 text-gray-400">
          <input
            type="radio"
            bind:group={chessState.boardState}
            name="board"
            value="endgame_solution"
            disabled
          />
          <span>Endgame Solution</span>
          <span class="text-xs self-center">(WIP)</span>
        </label>
      </fieldset>

      <div
        class="text-sm mt-4 px-2 text-gray-400 uppercase tracking-wider max-w-[250px]"
      >
        Data from <a
          href="https://tjl.co/queens-gambit-arg/"
          class="underline"
          rel="noopener noreferrer"
        >
          TJ09
        </a>, Raid Secrets, and the Destiny 2 Community
      </div>
    </div>
  </details>
</div>
