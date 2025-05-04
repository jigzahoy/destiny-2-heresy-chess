export function fenToSymbols(fen: string) {
  const fenArray = [];
  for (const fenLine of fen.split("/")) {
    const fenRow = [];

    for (const fenChar of fenLine) {
      if (isNaN(parseInt(fenChar))) {
        fenRow.push(fenPieceToSymbol(fenChar));
      } else {
        for (let i = 0; i < parseInt(fenChar); i++) {
          fenRow.push(null);
        }
      }
    }

    fenArray.push(fenRow);
  }

  return fenArray;
}

function fenPieceToSymbol(piece: string) {
  switch (piece) {
    case "Q":
      return "Qw";
    case "q":
      return "Qb";
    case "K":
      return "Kw";
    case "k":
      return "Kb";
    case "R":
      return "Rw";
    case "r":
      return "Rb";
    case "B":
      return "Bw";
    case "b":
      return "Bb";
    case "N":
      return "Nw";
    case "n":
      return "Nb";
    case "P":
      return "Pw";
    case "p":
      return "Pb";
    default:
      return null;
  }
}
