// eslint-disable-next-line
import { Palette, PaletteColor } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface PaletteColor { //extending themes
    [key: number]: string;
  }

  interface Palette {
    tertiary: PaletteColor; //since there's only primary and secondary, we have now added tertiary as extension
  }
}