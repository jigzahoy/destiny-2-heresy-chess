<script lang="ts">
  import MainBoard from "./components/main-board.svelte";
  import DropdownSettings from "./components/dropdown-settings.svelte";
  import ChessIconsGlobals from "./components/chess-icons-globals.svelte";
  import { CANVAS_SIZE } from "./constants";

  import backgroundJpeg from "./assets/anthecamber.jpg";
  import backgroundWebp from "./assets/anthecamber.webp";
</script>

<DropdownSettings />

<main
  class="relative min-h-screen min-w-screen"
  style={`--canvas-size: ${CANVAS_SIZE}`}
>
  <div class="fixed inset-0 opacity-35" aria-hidden="true">
    <picture class="object-cover w-full h-full">
      <source type="image/webp" srcset={backgroundWebp} />
      <img
        class="object-cover w-full h-full"
        src={backgroundJpeg}
        alt=""
        loading="lazy"
      />
    </picture>
  </div>
  <MainBoard />
  <ChessIconsGlobals />
</main>
