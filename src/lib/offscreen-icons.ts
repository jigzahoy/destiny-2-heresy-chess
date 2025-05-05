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

import { CANVAS_SIZE } from "../constants";

const ChessPieces: ChessPiecesType = {
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

const ICON_SIZE = CANVAS_SIZE / 8;

export const offscreenIcons: OffscreenIcons = Object.entries(
  ChessPieces
).reduce((acc, cur) => {
  const [key, piece] = cur;
  const offscreen = new OffscreenCanvas(ICON_SIZE, ICON_SIZE);
  const offscreenContext = offscreen.getContext("2d");

  const image = new Image(ICON_SIZE, ICON_SIZE);
  image.src = piece as string;

  image.onload = () => {
    offscreenContext?.drawImage(image, 0, 0);
  };

  return { ...acc, [key]: offscreen };
}, {} as OffscreenIcons);

export const offscreenLargeIcons: OffscreenIcons = Object.entries(
  ChessPieces
).reduce((acc, cur) => {
  const [key, piece] = cur;
  const offscreen = new OffscreenCanvas(CANVAS_SIZE, CANVAS_SIZE);
  const offscreenContext = offscreen.getContext("2d");

  const image = new Image(CANVAS_SIZE, CANVAS_SIZE);
  image.src = piece as string;

  image.onload = () => {
    offscreenContext?.drawImage(image, 0, 0);
  };

  return { ...acc, [key]: offscreen };
}, {} as OffscreenIcons);
