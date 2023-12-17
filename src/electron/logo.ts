import { nativeImage } from "electron";
import icon from "@/assets/img/icon.png";

export function getLogo(width: number = 16, height: number = 16) {
  const image = nativeImage.createFromDataURL(icon);
  const logo = image.resize({ width, height });
  return logo;
}
