# Destiny 2 Heresy Chess ARG

This was an attempt to replicate and show the sequence board puzzle from the ARG event from Destiny 2 Episode 3: Heresy (April 29, 2025). It was a fun project to practice on optimizing the page that renders thousands of elements for the multiple chessboards (`4096` boards!).

## Page Optimization

I initially work the initial version using React and rendering each chessboard with a `<table>` element and each of its grid with `<td>` elements. Resulting to enormous number of `64 * 64 * 64` or `262,144` `<td>` elements which already made the page viewing experience unbearable.

Next step was adding a List Virtualization to unmount the table that are not visible on the viewport. This only results minimal performance gains and scrolling was very janky.

I switched to Svelte to gain massive performance boost on rendering large amount of items due to its compile-time approach and lack or of a virtual DOM. Also replaced rending a chessboard from `<table>` element and its piece using `<svg>` tag to a single `<canvas>` element per board. This significantly improved the rendering performance. And thus, I was able also to show other chessboard from the event such as the Endgame puzzle.

## Data

Thanks to [TJ09](https://tjl.co/) for the data compilation and his [awesome tool](https://tjl.co/queens-gambit-arg/) that the whole community used during the event.

I recompiled the solution data to a 8x8 2D array. Purged the 8x8 `symbols` array which contains the pieces location on each board and used the [FEN](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) chess notation and convert it back to 8x8 array to render the pieces on each board. Reduced the size of the data from `>2MB` down to `+630KB` JSON.

## Images & Graphics

Chess pieces are recreated with vector graphics application. Background is an edited screenshot from the game.

---

Built with Vite + Svelte ❤️
