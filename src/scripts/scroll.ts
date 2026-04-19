import Lenis from "lenis";

let lenis: Lenis | null = null;
export const getScroll = () => {
  if (!window) return null;
  if (!lenis)
    lenis = new Lenis({
      autoRaf: true,
    });
  return lenis;
}
