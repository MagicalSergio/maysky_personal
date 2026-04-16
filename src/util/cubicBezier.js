export function cubicBezier({ x1, y1, x2, y2 }) {
    const cx = 3 * x1,
        bx = 3 * (x2 - x1) - cx,
        ax = 1 - cx - bx;
    const cy = 3 * y1,
        by = 3 * (y2 - y1) - cy,
        ay = 1 - cy - by;
    const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
    const sampleY = (t) => ((ay * t + by) * t + cy) * t;
    const sampleDX = (t) => (3 * ax * t + 2 * bx) * t + cx;
    const solveT = (x) => {
        let t = x;
        for (let i = 0; i < 8; i++) {
            const d = sampleX(t) - x;
            if (Math.abs(d) < 1e-7) break;
            t -= d / sampleDX(t);
        }
        return t;
    };
    return (x) => (x === 0 || x === 1 ? x : sampleY(solveT(x)));
}
