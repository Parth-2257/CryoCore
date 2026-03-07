/* ===== WORLD MAP (CANVAS) ===== */
(function () {
    const canvas = document.getElementById('worldMap');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;

    function resizeCanvas() {
        const rect = canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        W = rect.width;
        H = rect.height;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // City data — normalized 0-1 coords
    const cities = [
        { name: 'Mumbai',    x: 0.600, y: 0.56, dot: '#00d4ff', label: null },
        { name: 'Frankfurt', x: 0.478, y: 0.27, dot: '#00ff9d', label: null },
        { name: 'Singapore', x: 0.682, y: 0.61, dot: '#00d4ff', label: null },
        { name: 'Boston',    x: 0.250, y: 0.30, dot: '#00ff9d', label: { id: 'SHP-2841', temp: '4.2°C', status: '✓', color: '#00ff9d' } },
        { name: 'Basel',     x: 0.470, y: 0.28, dot: '#ffb830', label: null },
        { name: 'London',    x: 0.452, y: 0.24, dot: '#00d4ff', label: { id: 'SHP-2839', temp: '-17.8°C', status: '⚠', color: '#ffb830' } },
        { name: 'Tokyo',     x: 0.818, y: 0.35, dot: '#00ff9d', label: null },
        { name: 'Sydney',    x: 0.842, y: 0.76, dot: '#00d4ff', label: { id: 'SHP-2835', temp: '-68.9°C', status: '✓', color: '#00ff9d' } },
        { name: 'Shanghai',  x: 0.760, y: 0.40, dot: '#ffb830', label: null },
        { name: 'Lagos',     x: 0.445, y: 0.56, dot: '#00d4ff', label: null },
    ];

    // Flight paths (index pairs)
    const routes = [
        [3, 5],  // Boston -> London
        [5, 1],  // London -> Frankfurt
        [1, 0],  // Frankfurt -> Mumbai
        [0, 2],  // Mumbai -> Singapore
        [2, 8],  // Singapore -> Shanghai
        [8, 6],  // Shanghai -> Tokyo
        [6, 7],  // Tokyo -> Sydney
        [5, 9],  // London -> Lagos
        [3, 4],  // Boston -> Basel
        [1, 4],  // Frankfurt -> Basel
    ];

    // Detailed continent outlines — more polygon points for more realistic shapes
    const continents = [
        // North America
        { points: [[0.05,0.12],[0.08,0.08],[0.12,0.06],[0.17,0.05],[0.22,0.06],[0.27,0.09],[0.30,0.12],[0.32,0.16],[0.30,0.20],[0.31,0.24],[0.30,0.28],[0.29,0.32],[0.27,0.35],[0.25,0.38],[0.23,0.41],[0.21,0.44],[0.19,0.47],[0.17,0.50],[0.15,0.52],[0.18,0.54],[0.20,0.52],[0.22,0.55],[0.24,0.53],[0.26,0.55],[0.22,0.57],[0.18,0.57],[0.14,0.54],[0.12,0.50],[0.10,0.44],[0.08,0.38],[0.06,0.32],[0.04,0.26],[0.03,0.20],[0.04,0.16]] },
        // South America
        { points: [[0.22,0.58],[0.25,0.56],[0.28,0.57],[0.30,0.58],[0.32,0.61],[0.33,0.65],[0.34,0.69],[0.33,0.73],[0.32,0.77],[0.30,0.81],[0.28,0.84],[0.26,0.87],[0.24,0.89],[0.22,0.87],[0.21,0.83],[0.20,0.79],[0.19,0.74],[0.18,0.70],[0.19,0.66],[0.20,0.62]] },
        // Europe
        { points: [[0.40,0.10],[0.43,0.08],[0.47,0.07],[0.50,0.08],[0.53,0.10],[0.55,0.13],[0.54,0.17],[0.53,0.20],[0.51,0.23],[0.49,0.26],[0.48,0.29],[0.46,0.32],[0.44,0.34],[0.42,0.30],[0.40,0.26],[0.38,0.22],[0.37,0.18],[0.38,0.14]] },
        // Africa
        { points: [[0.40,0.38],[0.43,0.36],[0.46,0.35],[0.49,0.37],[0.52,0.39],[0.54,0.42],[0.56,0.46],[0.57,0.50],[0.56,0.54],[0.55,0.58],[0.54,0.62],[0.52,0.66],[0.50,0.70],[0.48,0.74],[0.46,0.76],[0.44,0.74],[0.42,0.70],[0.40,0.66],[0.38,0.62],[0.37,0.57],[0.36,0.52],[0.37,0.47],[0.38,0.42]] },
        // Asia
        { points: [[0.55,0.08],[0.58,0.06],[0.62,0.05],[0.67,0.07],[0.72,0.09],[0.76,0.12],[0.80,0.16],[0.83,0.20],[0.85,0.25],[0.84,0.30],[0.82,0.34],[0.79,0.37],[0.76,0.40],[0.73,0.42],[0.70,0.44],[0.67,0.46],[0.64,0.48],[0.61,0.50],[0.58,0.48],[0.56,0.44],[0.54,0.40],[0.52,0.36],[0.50,0.30],[0.48,0.24],[0.50,0.18],[0.52,0.12]] },
        // SE Asia / Indonesia
        { points: [[0.66,0.52],[0.69,0.50],[0.72,0.51],[0.75,0.53],[0.78,0.55],[0.80,0.58],[0.79,0.60],[0.76,0.59],[0.73,0.57],[0.70,0.56],[0.67,0.55]] },
        // Australia
        { points: [[0.76,0.67],[0.79,0.64],[0.83,0.63],[0.87,0.64],[0.90,0.66],[0.92,0.69],[0.93,0.73],[0.92,0.77],[0.90,0.80],[0.87,0.82],[0.84,0.83],[0.81,0.81],[0.78,0.78],[0.76,0.74],[0.75,0.70]] },
        // Greenland
        { points: [[0.30,0.04],[0.33,0.02],[0.37,0.03],[0.39,0.06],[0.38,0.10],[0.36,0.12],[0.33,0.11],[0.31,0.08]] },
    ];

    let animTime = 0;

    function drawCurvedPath(x1, y1, x2, y2) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.18;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(midX, midY, x2, y2);
    }

    function getPointOnCurve(x1, y1, x2, y2, t) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.18;
        const ix1 = (1 - t) * x1 + t * midX;
        const iy1 = (1 - t) * y1 + t * midY;
        const ix2 = (1 - t) * midX + t * x2;
        const iy2 = (1 - t) * midY + t * y2;
        return {
            x: (1 - t) * ix1 + t * ix2,
            y: (1 - t) * iy1 + t * iy2,
        };
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    function draw() {
        animTime += 0.004;
        ctx.clearRect(0, 0, W, H);

        // Overall atmosphere glow
        const grd = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, W * 0.6);
        grd.addColorStop(0, 'rgba(0, 212, 255, 0.04)');
        grd.addColorStop(0.5, 'rgba(0, 212, 255, 0.015)');
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);

        // Draw continents — filled with subtle color + glowing borders
        continents.forEach(cont => {
            ctx.beginPath();
            cont.points.forEach((p, i) => {
                const px = p[0] * W;
                const py = p[1] * H;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.closePath();
            // Fill
            ctx.fillStyle = 'rgba(10, 28, 52, 0.7)';
            ctx.fill();
            // Glowing border
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.25)';
            ctx.lineWidth = 1.2;
            ctx.stroke();
            // Extra glow pass
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.08)';
            ctx.lineWidth = 3;
            ctx.stroke();
        });

        // Draw internal continent detail lines (faint country border simulation)
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.06)';
        ctx.lineWidth = 0.5;
        // Some interior lines for realism
        const detailLines = [
            // NA interior
            [[0.15,0.20],[0.22,0.25],[0.20,0.35]],
            [[0.20,0.15],[0.25,0.22],[0.23,0.30]],
            // Europe interior
            [[0.45,0.15],[0.48,0.20],[0.46,0.26]],
            [[0.42,0.18],[0.47,0.18],[0.50,0.22]],
            // Africa interior
            [[0.42,0.45],[0.48,0.50],[0.46,0.60]],
            [[0.45,0.42],[0.50,0.48],[0.52,0.55]],
            // Asia interior
            [[0.60,0.15],[0.68,0.20],[0.72,0.28]],
            [[0.65,0.25],[0.72,0.30],[0.78,0.32]],
            [[0.58,0.30],[0.64,0.35],[0.68,0.40]],
        ];
        detailLines.forEach(line => {
            ctx.beginPath();
            line.forEach((p, i) => {
                if (i === 0) ctx.moveTo(p[0] * W, p[1] * H);
                else ctx.lineTo(p[0] * W, p[1] * H);
            });
            ctx.stroke();
        });

        // Draw faint latitude/longitude grid
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.025)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= 10; i++) {
            const y = (i / 10) * H;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(W, y);
            ctx.stroke();
        }
        for (let i = 0; i <= 12; i++) {
            const x = (i / 12) * W;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, H);
            ctx.stroke();
        }

        // Draw flight paths — glowing arcs
        routes.forEach((route, idx) => {
            const c1 = cities[route[0]];
            const c2 = cities[route[1]];
            const x1 = c1.x * W, y1 = c1.y * H;
            const x2 = c2.x * W, y2 = c2.y * H;

            // Outer glow of path
            drawCurvedPath(x1, y1, x2, y2);
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.06)';
            ctx.lineWidth = 4;
            ctx.stroke();

            // Main path line
            drawCurvedPath(x1, y1, x2, y2);
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.18)';
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Animated traveling dot
            const speed = 0.7 + idx * 0.08;
            const t = ((animTime * speed) % 1);
            const pt = getPointOnCurve(x1, y1, x2, y2, t);

            // Trailing glow
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 8, 0, Math.PI * 2);
            const tGrd = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 8);
            tGrd.addColorStop(0, 'rgba(0, 212, 255, 0.4)');
            tGrd.addColorStop(1, 'transparent');
            ctx.fillStyle = tGrd;
            ctx.fill();

            // Core dot
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 212, 255, 0.9)';
            ctx.fill();
        });

        // Draw city dots with glow and labels
        cities.forEach((city, i) => {
            const cx = city.x * W;
            const cy = city.y * H;
            const pulseScale = 1 + 0.35 * Math.sin(animTime * 3 + i * 0.8);

            // Large outer glow
            ctx.beginPath();
            ctx.arc(cx, cy, 14 * pulseScale, 0, Math.PI * 2);
            const glowGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14 * pulseScale);
            const glowColor = city.dot === '#00ff9d' ? 'rgba(0, 255, 157,' : city.dot === '#ffb830' ? 'rgba(255, 184, 48,' : 'rgba(0, 212, 255,';
            glowGrd.addColorStop(0, glowColor + '0.25)');
            glowGrd.addColorStop(1, 'transparent');
            ctx.fillStyle = glowGrd;
            ctx.fill();

            // Core dot
            ctx.beginPath();
            ctx.arc(cx, cy, 4, 0, Math.PI * 2);
            ctx.fillStyle = city.dot;
            ctx.fill();

            // Inner center
            ctx.beginPath();
            ctx.arc(cx, cy, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            // City name label
            ctx.font = '9px "DM Sans", sans-serif';
            ctx.fillStyle = 'rgba(232, 244, 255, 0.5)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(city.name, cx, cy + 10);
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';
        });

        // Draw floating shipment label cards
        cities.forEach((city) => {
            if (!city.label) return;
            const cx = city.x * W;
            const cy = city.y * H;
            const cardW = 150;
            const cardH = 32;
            const wouldClipRight = (cx + 14 + cardW) > W;
            const cardX = wouldClipRight ? cx - cardW - 14 : cx + 14;
            const cardY = cy - cardH - 14;
            const bobY = Math.sin(animTime * 2 + cx * 0.01) * 3;

            // Card shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            roundRect(ctx, cardX + 2, cardY + bobY + 2, cardW, cardH, 6);
            ctx.fill();

            // Card background
            ctx.fillStyle = 'rgba(10, 22, 40, 0.92)';
            ctx.strokeStyle = city.label.color === '#ffb830' ? 'rgba(255, 184, 48, 0.6)' : 'rgba(0, 255, 157, 0.6)';
            ctx.lineWidth = 1;
            roundRect(ctx, cardX, cardY + bobY, cardW, cardH, 6);
            ctx.fill();
            ctx.stroke();

            // Card text
            ctx.font = '10px "JetBrains Mono", monospace';
            ctx.fillStyle = '#e8f4ff';
            ctx.textBaseline = 'middle';
            ctx.fillText(city.label.id + ' | ', cardX + 10, cardY + bobY + cardH / 2);

            const idWidth = ctx.measureText(city.label.id + ' | ').width;
            ctx.fillStyle = city.label.color;
            ctx.fillText(city.label.temp + ' ' + city.label.status, cardX + 10 + idWidth, cardY + bobY + cardH / 2);
            ctx.textBaseline = 'alphabetic';
        });

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
})();
