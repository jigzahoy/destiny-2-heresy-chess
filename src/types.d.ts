type ChessRow = ChessPiece[];

type ChessPiece =
  | "Pw"
  | "Rw"
  | "Nw"
  | "Bw"
  | "Qw"
  | "Kw"
  | "Pb"
  | "Rb"
  | "Nb"
  | "Bb"
  | "Qb"
  | "Kb"
  | null;

type QRBit = 1 | 0;

interface Chessboard {
  fen: string;
  fill: "lightGray" | "darkGray" | "lightRed" | "darkRed";
  hasQR: boolean;
  qrData?: QRBit[4][4];
  sequence: number;
  symbols?: ChessRow[];
  communityVerified?: number;
}
