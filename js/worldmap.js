/* ===== WORLD MAP (CANVAS) — CryoCore ===== */
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

    /* ===== CITY DATA ===== */
    const cities = [
        { name: 'Mumbai', x: 0.610, y: 0.54, dot: '#00d4ff', label: null },
        { name: 'Frankfurt', x: 0.480, y: 0.26, dot: '#00ff9d', label: null },
        { name: 'Singapore', x: 0.690, y: 0.60, dot: '#00d4ff', label: null },
        { name: 'Boston', x: 0.245, y: 0.29, dot: '#00ff9d', label: { id: 'SHP-2841', temp: '4.2°C', status: '✓', color: '#00ff9d' } },
        { name: 'Basel', x: 0.472, y: 0.27, dot: '#ffb830', label: null },
        { name: 'London', x: 0.455, y: 0.23, dot: '#00d4ff', label: { id: 'SHP-2839', temp: '-17.8°C', status: '⚠', color: '#ffb830' } },
        { name: 'Tokyo', x: 0.820, y: 0.34, dot: '#00ff9d', label: null },
        { name: 'Sydney', x: 0.845, y: 0.75, dot: '#00d4ff', label: { id: 'SHP-2835', temp: '-68.9°C', status: '✓', color: '#00ff9d' } },
        { name: 'Shanghai', x: 0.762, y: 0.39, dot: '#ffb830', label: null },
        { name: 'Lagos', x: 0.448, y: 0.55, dot: '#00d4ff', label: null },
    ];

    /* ===== FLIGHT PATHS ===== */
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

    /* ===== DETAILED CONTINENT OUTLINES — many polygon points for realistic shapes ===== */
    const continents = [
        // North America — detailed outline
        {
            points: [
                [0.045, 0.11], [0.05, 0.09], [0.07, 0.07], [0.09, 0.055], [0.12, 0.045], [0.15, 0.04], [0.18, 0.04],
                [0.21, 0.05], [0.24, 0.065], [0.27, 0.08], [0.29, 0.10], [0.305, 0.12], [0.315, 0.15], [0.32, 0.18],
                [0.31, 0.21], [0.305, 0.24], [0.30, 0.27], [0.295, 0.30], [0.29, 0.33], [0.28, 0.36], [0.27, 0.38],
                [0.26, 0.40], [0.25, 0.42], [0.24, 0.44], [0.23, 0.46], [0.22, 0.48], [0.21, 0.50], [0.20, 0.52],
                [0.195, 0.53], [0.185, 0.54], [0.175, 0.53], [0.17, 0.51], [0.165, 0.49], [0.16, 0.47],
                [0.155, 0.45], [0.145, 0.44], [0.135, 0.46], [0.14, 0.48], [0.15, 0.50], [0.155, 0.52],
                [0.16, 0.545], [0.18, 0.55], [0.20, 0.53], [0.215, 0.545], [0.23, 0.535], [0.25, 0.545],
                [0.24, 0.56], [0.22, 0.57], [0.20, 0.575], [0.18, 0.575], [0.16, 0.565], [0.14, 0.55],
                [0.12, 0.52], [0.10, 0.48], [0.09, 0.44], [0.08, 0.40], [0.07, 0.36], [0.06, 0.32],
                [0.055, 0.28], [0.05, 0.24], [0.045, 0.20], [0.04, 0.16], [0.042, 0.13]
            ]
        },
        // South America
        {
            points: [
                [0.22, 0.58], [0.24, 0.565], [0.26, 0.57], [0.28, 0.575], [0.295, 0.585], [0.31, 0.60],
                [0.32, 0.625], [0.325, 0.65], [0.33, 0.67], [0.335, 0.69], [0.34, 0.71], [0.335, 0.73],
                [0.33, 0.76], [0.32, 0.79], [0.31, 0.81], [0.30, 0.83], [0.29, 0.85], [0.28, 0.87],
                [0.27, 0.885], [0.26, 0.89], [0.25, 0.885], [0.245, 0.87], [0.24, 0.855], [0.235, 0.84],
                [0.23, 0.82], [0.225, 0.80], [0.22, 0.78], [0.215, 0.76], [0.21, 0.74], [0.205, 0.72],
                [0.20, 0.70], [0.195, 0.68], [0.19, 0.66], [0.195, 0.64], [0.20, 0.62], [0.21, 0.60]
            ]
        },
        // Europe — detailed
        {
            points: [
                [0.40, 0.10], [0.42, 0.085], [0.44, 0.075], [0.46, 0.07], [0.48, 0.075], [0.50, 0.08],
                [0.52, 0.09], [0.535, 0.10], [0.545, 0.12], [0.55, 0.14], [0.545, 0.16], [0.54, 0.18],
                [0.535, 0.20], [0.53, 0.22], [0.52, 0.235], [0.51, 0.25], [0.50, 0.265], [0.49, 0.28],
                [0.48, 0.295], [0.475, 0.31], [0.47, 0.325], [0.46, 0.335], [0.455, 0.345], [0.445, 0.34],
                [0.44, 0.33], [0.435, 0.315], [0.43, 0.30], [0.425, 0.285], [0.42, 0.27], [0.415, 0.25],
                [0.41, 0.23], [0.405, 0.21], [0.40, 0.19], [0.395, 0.17], [0.39, 0.15], [0.392, 0.13],
                [0.395, 0.115]
            ]
        },
        // Africa — detailed
        {
            points: [
                [0.40, 0.38], [0.42, 0.365], [0.44, 0.355], [0.46, 0.35], [0.48, 0.355], [0.50, 0.37],
                [0.52, 0.385], [0.535, 0.40], [0.545, 0.42], [0.555, 0.44], [0.56, 0.46], [0.565, 0.48],
                [0.568, 0.50], [0.57, 0.52], [0.568, 0.54], [0.565, 0.56], [0.56, 0.58], [0.555, 0.60],
                [0.55, 0.62], [0.545, 0.64], [0.54, 0.66], [0.53, 0.68], [0.52, 0.70], [0.51, 0.72],
                [0.50, 0.735], [0.49, 0.74], [0.48, 0.745], [0.47, 0.74], [0.465, 0.73], [0.46, 0.72],
                [0.455, 0.71], [0.45, 0.70], [0.445, 0.685], [0.44, 0.67], [0.43, 0.65], [0.42, 0.63],
                [0.41, 0.61], [0.40, 0.59], [0.395, 0.57], [0.39, 0.55], [0.385, 0.53], [0.38, 0.51],
                [0.375, 0.49], [0.37, 0.47], [0.375, 0.45], [0.38, 0.43], [0.385, 0.41], [0.39, 0.395]
            ]
        },
        // Asia — detailed
        {
            points: [
                [0.55, 0.08], [0.57, 0.065], [0.59, 0.055], [0.61, 0.05], [0.64, 0.05], [0.67, 0.06],
                [0.70, 0.075], [0.73, 0.09], [0.755, 0.11], [0.775, 0.13], [0.79, 0.15], [0.81, 0.17],
                [0.825, 0.19], [0.835, 0.21], [0.84, 0.24], [0.845, 0.27], [0.84, 0.30], [0.835, 0.32],
                [0.825, 0.34], [0.81, 0.36], [0.795, 0.375], [0.78, 0.39], [0.76, 0.40], [0.74, 0.41],
                [0.72, 0.42], [0.70, 0.43], [0.68, 0.44], [0.66, 0.455], [0.64, 0.47], [0.62, 0.48],
                [0.60, 0.485], [0.58, 0.475], [0.565, 0.46], [0.55, 0.44], [0.54, 0.42], [0.53, 0.40],
                [0.52, 0.38], [0.515, 0.36], [0.51, 0.34], [0.505, 0.32], [0.50, 0.30], [0.49, 0.27],
                [0.485, 0.24], [0.49, 0.21], [0.50, 0.18], [0.51, 0.15], [0.52, 0.12], [0.53, 0.10],
                [0.54, 0.09]
            ]
        },
        // SE Asia / Indonesia
        {
            points: [
                [0.66, 0.52], [0.68, 0.505], [0.70, 0.50], [0.72, 0.505], [0.74, 0.52], [0.76, 0.535],
                [0.775, 0.55], [0.79, 0.565], [0.80, 0.58], [0.795, 0.595], [0.785, 0.60], [0.77, 0.595],
                [0.755, 0.585], [0.74, 0.575], [0.725, 0.565], [0.71, 0.555], [0.695, 0.545], [0.68, 0.535],
                [0.67, 0.53]
            ]
        },
        // Australia — detailed
        {
            points: [
                [0.76, 0.67], [0.775, 0.655], [0.79, 0.645], [0.81, 0.635], [0.83, 0.63], [0.85, 0.635],
                [0.87, 0.645], [0.885, 0.655], [0.895, 0.67], [0.905, 0.69], [0.91, 0.71], [0.915, 0.73],
                [0.91, 0.75], [0.905, 0.77], [0.895, 0.785], [0.88, 0.80], [0.865, 0.81], [0.85, 0.815],
                [0.835, 0.815], [0.82, 0.81], [0.805, 0.80], [0.79, 0.785], [0.78, 0.77], [0.77, 0.75],
                [0.765, 0.73], [0.76, 0.71], [0.758, 0.69]
            ]
        },
        // Greenland
        {
            points: [
                [0.295, 0.04], [0.31, 0.025], [0.33, 0.02], [0.35, 0.025], [0.37, 0.035], [0.385, 0.05],
                [0.39, 0.07], [0.385, 0.09], [0.375, 0.10], [0.36, 0.11], [0.345, 0.115], [0.33, 0.11],
                [0.315, 0.10], [0.305, 0.085], [0.30, 0.07], [0.295, 0.055]
            ]
        },
        // Japan (small island chain)
        {
            points: [
                [0.835, 0.28], [0.84, 0.295], [0.845, 0.31], [0.845, 0.33], [0.84, 0.35], [0.835, 0.365],
                [0.83, 0.37], [0.825, 0.36], [0.822, 0.34], [0.825, 0.32], [0.828, 0.30], [0.83, 0.285]
            ]
        },
        // UK/Ireland
        {
            points: [
                [0.435, 0.185], [0.44, 0.175], [0.448, 0.17], [0.455, 0.175], [0.46, 0.185], [0.462, 0.20],
                [0.458, 0.215], [0.452, 0.225], [0.445, 0.23], [0.438, 0.225], [0.434, 0.215], [0.432, 0.20]
            ]
        },
        // Madagascar
        {
            points: [
                [0.555, 0.72], [0.56, 0.71], [0.565, 0.705], [0.57, 0.71], [0.572, 0.72], [0.57, 0.745],
                [0.565, 0.76], [0.56, 0.755], [0.555, 0.74]
            ]
        },
        // New Zealand
        {
            points: [
                [0.935, 0.78], [0.94, 0.77], [0.945, 0.775], [0.948, 0.79], [0.945, 0.81], [0.94, 0.825],
                [0.935, 0.83], [0.93, 0.82], [0.928, 0.80], [0.93, 0.79]
            ]
        },
    ];

    /* ===== FAINT COUNTRY BORDER DETAIL LINES ===== */
    const detailLines = [
        // North America interior borders
        [[0.12, 0.15], [0.18, 0.22], [0.16, 0.30]],
        [[0.18, 0.12], [0.23, 0.18], [0.22, 0.26]],
        [[0.15, 0.28], [0.21, 0.32], [0.20, 0.40]],
        [[0.22, 0.15], [0.26, 0.20], [0.25, 0.28]],
        [[0.10, 0.22], [0.16, 0.26], [0.14, 0.34]],
        // Europe interior borders
        [[0.44, 0.14], [0.47, 0.18], [0.45, 0.24]],
        [[0.42, 0.16], [0.46, 0.16], [0.49, 0.20]],
        [[0.48, 0.12], [0.51, 0.16], [0.50, 0.22]],
        [[0.43, 0.22], [0.47, 0.25], [0.46, 0.30]],
        // Africa interior borders
        [[0.42, 0.44], [0.47, 0.48], [0.45, 0.56]],
        [[0.44, 0.40], [0.49, 0.46], [0.51, 0.52]],
        [[0.46, 0.55], [0.50, 0.60], [0.49, 0.66]],
        [[0.40, 0.50], [0.44, 0.54], [0.43, 0.60]],
        [[0.48, 0.42], [0.52, 0.48], [0.53, 0.55]],
        // Asia interior borders
        [[0.58, 0.14], [0.65, 0.18], [0.70, 0.24]],
        [[0.63, 0.22], [0.70, 0.26], [0.76, 0.30]],
        [[0.56, 0.28], [0.62, 0.33], [0.66, 0.38]],
        [[0.68, 0.16], [0.74, 0.22], [0.78, 0.28]],
        [[0.60, 0.40], [0.65, 0.42], [0.68, 0.44]],
        // South America interior borders
        [[0.24, 0.62], [0.27, 0.66], [0.26, 0.72]],
        [[0.22, 0.68], [0.26, 0.72], [0.28, 0.78]],
        [[0.25, 0.58], [0.28, 0.63], [0.30, 0.68]],
    ];

    /* ===== HELPER FUNCTIONS ===== */
    let animTime = 0;

    function drawCurvedPath(x1, y1, x2, y2) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.20;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(midX, midY, x2, y2);
    }

    function getPointOnCurve(x1, y1, x2, y2, t) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.20;
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

    /* ===== MAIN DRAW LOOP ===== */
    function draw() {
        animTime += 0.004;
        ctx.clearRect(0, 0, W, H);

        /* --- Atmospheric background glow --- */
        const grd = ctx.createRadialGradient(W * 0.5, H * 0.42, 0, W * 0.5, H * 0.42, W * 0.65);
        grd.addColorStop(0, 'rgba(0, 212, 255, 0.05)');
        grd.addColorStop(0.4, 'rgba(0, 212, 255, 0.02)');
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);

        /* --- Secondary glow spots for depth --- */
        const grd2 = ctx.createRadialGradient(W * 0.25, H * 0.35, 0, W * 0.25, H * 0.35, W * 0.3);
        grd2.addColorStop(0, 'rgba(0, 255, 157, 0.02)');
        grd2.addColorStop(1, 'transparent');
        ctx.fillStyle = grd2;
        ctx.fillRect(0, 0, W, H);

        const grd3 = ctx.createRadialGradient(W * 0.75, H * 0.55, 0, W * 0.75, H * 0.55, W * 0.3);
        grd3.addColorStop(0, 'rgba(0, 212, 255, 0.02)');
        grd3.addColorStop(1, 'transparent');
        ctx.fillStyle = grd3;
        ctx.fillRect(0, 0, W, H);

        /* --- Faint latitude/longitude grid --- */
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.02)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= 12; i++) {
            const y = (i / 12) * H;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(W, y);
            ctx.stroke();
        }
        for (let i = 0; i <= 16; i++) {
            const x = (i / 16) * W;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, H);
            ctx.stroke();
        }

        /* --- Draw continents — filled with subtle color + glowing borders --- */
        continents.forEach(cont => {
            // Draw filled continent shape
            ctx.beginPath();
            cont.points.forEach((p, i) => {
                const px = p[0] * W;
                const py = p[1] * H;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.closePath();
            ctx.fillStyle = 'rgba(8, 24, 48, 0.75)';
            ctx.fill();

            // Inner lighter fill for depth
            ctx.beginPath();
            cont.points.forEach((p, i) => {
                const px = p[0] * W;
                const py = p[1] * H;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.closePath();
            ctx.fillStyle = 'rgba(10, 32, 60, 0.4)';
            ctx.fill();

            // Wide outer glow
            ctx.beginPath();
            cont.points.forEach((p, i) => {
                const px = p[0] * W;
                const py = p[1] * H;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.closePath();
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.06)';
            ctx.lineWidth = 5;
            ctx.stroke();

            // Medium glow
            ctx.beginPath();
            cont.points.forEach((p, i) => {
                const px = p[0] * W;
                const py = p[1] * H;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.closePath();
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.12)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Crisp bright border
            ctx.beginPath();
            cont.points.forEach((p, i) => {
                const px = p[0] * W;
                const py = p[1] * H;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            });
            ctx.closePath();
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.30)';
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        /* --- Draw interior detail lines (faint country borders) --- */
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.05)';
        ctx.lineWidth = 0.5;
        detailLines.forEach(line => {
            ctx.beginPath();
            line.forEach((p, i) => {
                if (i === 0) ctx.moveTo(p[0] * W, p[1] * H);
                else ctx.lineTo(p[0] * W, p[1] * H);
            });
            ctx.stroke();
        });

        /* --- Draw coastline scatter dots for texture --- */
        ctx.fillStyle = 'rgba(0, 212, 255, 0.04)';
        continents.forEach(cont => {
            cont.points.forEach(p => {
                // Tiny dots along coastlines
                for (let d = 0; d < 3; d++) {
                    const ox = (Math.sin(p[0] * 1000 + d * 47) * 0.008);
                    const oy = (Math.cos(p[1] * 1000 + d * 31) * 0.008);
                    ctx.beginPath();
                    ctx.arc((p[0] + ox) * W, (p[1] + oy) * H, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
        });

        /* --- Draw flight paths — glowing arcs --- */
        routes.forEach((route, idx) => {
            const c1 = cities[route[0]];
            const c2 = cities[route[1]];
            const x1 = c1.x * W, y1 = c1.y * H;
            const x2 = c2.x * W, y2 = c2.y * H;

            // Wide outer glow of path
            drawCurvedPath(x1, y1, x2, y2);
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.04)';
            ctx.lineWidth = 6;
            ctx.stroke();

            // Medium glow
            drawCurvedPath(x1, y1, x2, y2);
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.08)';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Main path line
            drawCurvedPath(x1, y1, x2, y2);
            ctx.strokeStyle = 'rgba(0, 212, 255, 0.20)';
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Animated traveling dot along the arc
            const speed = 0.6 + idx * 0.07;
            const t = ((animTime * speed) % 1);
            const pt = getPointOnCurve(x1, y1, x2, y2, t);

            // Trailing glow
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 10, 0, Math.PI * 2);
            const tGrd = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 10);
            tGrd.addColorStop(0, 'rgba(0, 212, 255, 0.5)');
            tGrd.addColorStop(0.5, 'rgba(0, 212, 255, 0.1)');
            tGrd.addColorStop(1, 'transparent');
            ctx.fillStyle = tGrd;
            ctx.fill();

            // Core traveling dot
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 212, 255, 0.95)';
            ctx.fill();
        });

        /* --- Draw city dots with glow and labels --- */
        cities.forEach((city, i) => {
            const cx = city.x * W;
            const cy = city.y * H;
            const pulseScale = 1 + 0.3 * Math.sin(animTime * 3 + i * 0.9);

            // Determine glow color
            const glowColor = city.dot === '#00ff9d'
                ? 'rgba(0, 255, 157,'
                : city.dot === '#ffb830'
                    ? 'rgba(255, 184, 48,'
                    : 'rgba(0, 212, 255,';

            // Large outer glow ring
            ctx.beginPath();
            ctx.arc(cx, cy, 18 * pulseScale, 0, Math.PI * 2);
            const glowGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18 * pulseScale);
            glowGrd.addColorStop(0, glowColor + '0.20)');
            glowGrd.addColorStop(0.5, glowColor + '0.06)');
            glowGrd.addColorStop(1, 'transparent');
            ctx.fillStyle = glowGrd;
            ctx.fill();

            // Medium glow
            ctx.beginPath();
            ctx.arc(cx, cy, 8, 0, Math.PI * 2);
            const midGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 8);
            midGrd.addColorStop(0, glowColor + '0.35)');
            midGrd.addColorStop(1, 'transparent');
            ctx.fillStyle = midGrd;
            ctx.fill();

            // Core dot
            ctx.beginPath();
            ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
            ctx.fillStyle = city.dot;
            ctx.fill();

            // Bright inner center
            ctx.beginPath();
            ctx.arc(cx, cy, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            // City name label below dot
            ctx.font = '500 9px "DM Sans", sans-serif';
            ctx.fillStyle = 'rgba(232, 244, 255, 0.55)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillText(city.name, cx, cy + 12);
            ctx.textAlign = 'left';
            ctx.textBaseline = 'alphabetic';
        });

        /* --- Draw floating shipment label cards --- */
        cities.forEach((city) => {
            if (!city.label) return;
            const cx = city.x * W;
            const cy = city.y * H;
            const cardW = 155;
            const cardH = 34;
            const wouldClipRight = (cx + 16 + cardW) > W;
            const cardX = wouldClipRight ? cx - cardW - 16 : cx + 16;
            const cardY = cy - cardH - 16;
            const bobY = Math.sin(animTime * 2 + cx * 0.01) * 3;

            // Card shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
            roundRect(ctx, cardX + 2, cardY + bobY + 2, cardW, cardH, 7);
            ctx.fill();

            // Card background
            const bgColor = city.label.color === '#ffb830'
                ? 'rgba(13, 22, 38, 0.94)'
                : 'rgba(8, 20, 36, 0.94)';
            ctx.fillStyle = bgColor;
            const borderColor = city.label.color === '#ffb830'
                ? 'rgba(255, 184, 48, 0.55)'
                : 'rgba(0, 255, 157, 0.55)';
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 1;
            roundRect(ctx, cardX, cardY + bobY, cardW, cardH, 7);
            ctx.fill();
            ctx.stroke();

            // Subtle inner glow
            const igrd = ctx.createLinearGradient(cardX, cardY + bobY, cardX + cardW, cardY + bobY);
            igrd.addColorStop(0, city.label.color === '#ffb830' ? 'rgba(255, 184, 48, 0.04)' : 'rgba(0, 255, 157, 0.04)');
            igrd.addColorStop(1, 'transparent');
            ctx.fillStyle = igrd;
            roundRect(ctx, cardX, cardY + bobY, cardW, cardH, 7);
            ctx.fill();

            // Card text — ID
            ctx.font = '500 10px "JetBrains Mono", monospace';
            ctx.fillStyle = '#e8f4ff';
            ctx.textBaseline = 'middle';
            ctx.fillText(city.label.id + ' | ', cardX + 11, cardY + bobY + cardH / 2);

            const idWidth = ctx.measureText(city.label.id + ' | ').width;
            ctx.fillStyle = city.label.color;
            ctx.font = '600 10px "JetBrains Mono", monospace';
            ctx.fillText(city.label.temp + ' ' + city.label.status, cardX + 11 + idWidth, cardY + bobY + cardH / 2);
            ctx.textBaseline = 'alphabetic';

            // Connection line from card to city dot
            ctx.beginPath();
            const lineStartX = wouldClipRight ? cardX + cardW : cardX;
            ctx.moveTo(lineStartX, cardY + bobY + cardH);
            ctx.lineTo(cx, cy);
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 0.5;
            ctx.setLineDash([3, 3]);
            ctx.stroke();
            ctx.setLineDash([]);
        });

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
})();
