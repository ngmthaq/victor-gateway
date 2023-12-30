import { nativeImage } from "electron";
import icon from "@/assets/img/icon.png";

/**
 * Get logo of the application
 *
 * @see https://www.electronjs.org/docs/latest/api/native-image
 * @param {number} width
 * @param {number} height
 * @returns {Electron.NativeImage} logo
 */
export function getLogo(width: number = 16, height: number = 16): Electron.NativeImage {
  const image = nativeImage.createFromDataURL(icon);
  const logo = image.resize({ width, height });
  return logo;
}
