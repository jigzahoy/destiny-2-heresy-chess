<script lang="ts">
  import { showEndgameStore, showQRStore } from "../lib/store";

  const root = document.querySelector(":root");

  const onZoomChange = (event: Event) => {
    const target = event?.target as HTMLInputElement;
    const scaleMultiplier = parseInt(target?.value) / 100;
    // @ts-expect-error: Change root style
    root.style.setProperty("--scale-multiplier", scaleMultiplier);
  };

  const onEndgameChange = (event: Event) => {
    const target = event?.target as HTMLInputElement;
    const value = target?.checked;

    showEndgameStore.set(value);
  };

  const onQrChange = (event: Event) => {
    const target = event?.target as HTMLInputElement;
    const value = target?.checked;

    showQRStore.set(value);
  };
</script>

<div
  class="fixed border rounded shadow-sm border-gray-200/80 bg-white/80 top-4 right-4 min-w-xs backdrop-blur-xs"
>
  <details>
    <summary class="px-2 py-2 font-medium">Settings</summary>
    <div class="px-2 py-2 border-t border-gray-400">
      <label class="flex gap-2">
        <span>Zoom</span>
        <input
          on:input={onZoomChange}
          type="range"
          class="w-full"
          name="zoom"
          id="zoom"
          value="100"
          step="1"
          min="1"
          max="100"
        />
      </label>

      <label class="flex gap-2">
        <input
          type="checkbox"
          on:change={onEndgameChange}
          name="endgame"
          id="endgame"
          disabled
        />
        <span>Show Endgame puzzle</span>
      </label>

      <label class="flex gap-2">
        <input
          type="checkbox"
          on:change={onQrChange}
          name="show-qr"
          id="show-qr"
          disabled
        />
        <span>Show QR Code</span>
      </label>
    </div>
  </details>
</div>
