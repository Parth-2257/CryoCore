/* ===== WORLD MAP — CryoCore (Realistic GeoJSON-style) ===== */
(function () {
    const canvas = document.getElementById('worldMap');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, mapW, mapH, offX, offY;

    function resize() {
        const r = canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = r.width * dpr;
        canvas.height = r.height * dpr;
        W = r.width; H = r.height;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // Equirectangular projection fitting — maintain 2:1 aspect
        const aspect = 2;
        if (W / H > aspect) { mapH = H; mapW = H * aspect; }
        else { mapW = W; mapH = W / aspect; }
        offX = (W - mapW) / 2;
        offY = (H - mapH) / 2;
    }
    resize();
    window.addEventListener('resize', resize);

    // Project lon/lat → canvas px
    function px(lon, lat) {
        return [offX + ((lon + 180) / 360) * mapW,
        offY + ((90 - lat) / 180) * mapH];
    }

    /* ======================================================================
       LANDMASS DATA — [longitude, latitude] pairs
       Traced from real geography using equirectangular projection.
       Multiple overlapping polygons for complex regions (Eurasia).
       ====================================================================== */
    const L = [
        // ── NORTH AMERICA ──
        [[-168, 55], [-160, 58], [-153, 60], [-148, 61], [-143, 60], [-139, 59], [-136, 57],
        [-133, 55], [-130, 54], [-128, 52], [-126, 49], [-125, 47], [-124, 44], [-124, 42],
        [-123, 39], [-121, 36], [-119, 34], [-117, 33], [-116, 31], [-114, 29], [-112, 27],
        [-110, 24], [-108, 22], [-106, 20], [-103, 18], [-100, 17], [-97, 16], [-95, 16],
        [-93, 15], [-90, 14], [-88, 14], [-86, 13], [-84, 11], [-82, 9], [-80, 8], [-79, 9],
        [-81, 10], [-84, 12], [-86, 14], [-87, 16], [-88, 18], [-89, 20], [-90, 22],
        [-92, 20], [-95, 19], [-97, 21], [-97, 24], [-97, 26], [-96, 28], [-95, 29],
        [-93, 30], [-91, 30], [-89, 30], [-87, 30], [-86, 30], [-85, 30], [-84, 29],
        [-83, 28], [-82, 26], [-81, 25], [-80, 25], [-80, 27], [-81, 29], [-81, 31],
        [-80, 32], [-79, 34], [-77, 35], [-76, 37], [-75, 39], [-74, 40], [-72, 41],
        [-71, 42], [-70, 43], [-68, 44], [-67, 45], [-66, 44], [-64, 45], [-63, 46],
        [-61, 46], [-59, 47], [-57, 48], [-55, 48], [-54, 47], [-53, 47], [-55, 49],
        [-56, 50], [-57, 52], [-59, 53], [-60, 55], [-62, 57], [-65, 58], [-68, 60],
        [-71, 61], [-75, 63], [-79, 64], [-83, 65], [-87, 66], [-92, 67], [-97, 68],
        [-103, 69], [-110, 70], [-118, 70], [-125, 69], [-132, 69], [-138, 68],
        [-143, 67], [-148, 65], [-152, 63], [-156, 61], [-160, 59], [-165, 57]],

        // ── SOUTH AMERICA ──
        [[-80, 8], [-78, 6], [-76, 4], [-75, 2], [-77, 0], [-79, -1], [-80, -3], [-81, -5],
        [-80, -8], [-78, -10], [-76, -13], [-75, -15], [-73, -17], [-71, -18], [-70, -20],
        [-70, -23], [-69, -25], [-67, -28], [-66, -30], [-65, -33], [-64, -36], [-65, -39],
        [-66, -42], [-67, -45], [-68, -48], [-69, -51], [-70, -53], [-72, -54], [-74, -52],
        [-73, -49], [-72, -46], [-71, -43], [-70, -40], [-68, -38], [-65, -37], [-62, -38],
        [-59, -37], [-57, -35], [-54, -33], [-52, -31], [-50, -28], [-48, -26], [-46, -24],
        [-44, -22], [-42, -19], [-40, -16], [-38, -13], [-36, -10], [-35, -7], [-35, -4],
        [-37, -1], [-39, 0], [-42, 1], [-45, 1], [-48, 2], [-50, 3], [-52, 4], [-55, 5],
        [-57, 6], [-59, 7], [-61, 8], [-63, 10], [-65, 11], [-68, 12], [-70, 12],
        [-73, 11], [-75, 10], [-77, 8]],

        // ── EUROPE (Iberia → Scandinavia → Eastern Europe) ──
        [[-10, 36], [-9, 37], [-10, 39], [-9, 41], [-9, 43], [-7, 44], [-4, 44], [-2, 44],
        [-1, 43], [0, 43], [1, 44], [3, 43], [5, 44], [6, 46], [4, 48], [2, 49], [2, 51],
        [4, 52], [6, 53], [8, 54], [9, 55], [10, 56], [11, 57], [12, 56], [13, 55],
        [14, 58], [16, 57], [18, 59], [18, 61], [18, 63], [19, 65], [20, 67], [22, 68],
        [24, 69], [26, 70], [28, 71], [30, 70], [32, 69], [35, 68], [37, 67], [40, 67],
        [42, 66], [44, 67], [46, 68], [50, 68], [55, 67], [60, 66], [60, 62], [57, 58],
        [55, 55], [52, 52], [48, 50], [45, 48], [42, 47], [40, 46], [38, 45], [36, 44],
        [34, 42], [32, 42], [30, 41], [28, 40], [26, 38], [24, 38], [22, 37], [20, 38],
        [18, 40], [16, 38], [14, 37], [12, 38], [10, 44], [8, 45], [6, 44], [3, 43],
        [0, 43], [-2, 42], [-4, 40], [-5, 38], [-7, 37], [-9, 37]],

        // ── AFRICA ──
        [[-17, 15], [-16, 18], [-17, 21], [-14, 23], [-13, 27], [-10, 30], [-5, 34],
        [-3, 35], [-1, 35], [3, 37], [5, 37], [8, 37], [10, 37], [11, 34], [12, 33],
        [15, 32], [20, 32], [25, 32], [28, 31], [30, 31], [32, 31], [34, 30], [36, 28],
        [38, 25], [40, 22], [42, 18], [44, 14], [46, 10], [48, 8], [50, 5], [50, 2],
        [48, 0], [46, -2], [44, -4], [42, -6], [40, -8], [40, -11], [38, -14], [36, -16],
        [35, -19], [34, -22], [33, -25], [32, -27], [30, -29], [28, -31], [27, -33],
        [25, -34], [22, -35], [20, -34], [18, -33], [16, -30], [15, -27], [13, -24],
        [12, -20], [12, -17], [11, -14], [10, -10], [9, -5], [8, -2], [6, 0], [5, 3],
        [4, 5], [2, 5], [1, 6], [0, 5], [-2, 5], [-4, 5], [-6, 5], [-8, 5], [-10, 6],
        [-12, 7], [-14, 8], [-15, 10], [-17, 12], [-17, 14]],

        // ── MIDDLE EAST / ARABIAN PENINSULA ──
        [[34, 30], [36, 34], [36, 32], [38, 32], [40, 30], [42, 28], [44, 26],
        [46, 24], [48, 24], [50, 25], [52, 24], [54, 23], [56, 24], [57, 25],
        [58, 24], [60, 25], [62, 25], [64, 25], [66, 25], [68, 24], [70, 22],
        [68, 21], [66, 20], [60, 20], [56, 18], [55, 16], [52, 14], [50, 13],
        [48, 13], [46, 13], [44, 12], [42, 14], [40, 16], [38, 18], [36, 20],
        [36, 24], [35, 27], [34, 29]],

        // ── INDIAN SUBCONTINENT ──
        [[68, 24], [70, 24], [72, 22], [74, 22], [76, 23], [78, 24], [80, 24],
        [82, 22], [84, 22], [86, 22], [88, 22], [89, 23], [90, 22], [92, 22],
        [92, 20], [90, 18], [88, 16], [86, 14], [84, 12], [82, 10], [80, 8],
        [78, 8], [76, 10], [75, 12], [74, 14], [73, 16], [72, 18], [72, 20],
        [70, 22], [68, 24]],

        // ── EAST ASIA (Russia Far East + China + Korea) ──
        [[60, 66], [65, 65], [70, 66], [75, 67], [80, 68], [85, 70], [90, 70],
        [95, 70], [100, 70], [105, 70], [110, 69], [115, 68], [120, 67],
        [125, 66], [130, 64], [135, 62], [138, 58], [140, 55], [142, 52],
        [140, 48], [138, 46], [136, 44], [134, 42], [132, 40], [130, 38],
        [128, 36], [126, 34], [124, 32], [122, 30], [120, 28], [118, 26],
        [116, 23], [114, 22], [112, 20], [110, 18], [108, 16], [106, 14],
        [104, 12], [102, 10], [100, 8], [98, 10], [96, 14], [94, 16],
        [92, 20], [92, 22], [88, 22], [86, 22], [84, 22], [82, 24],
        [78, 28], [75, 30], [72, 34], [70, 36], [68, 38], [64, 40],
        [62, 42], [60, 44], [58, 46], [56, 48], [54, 50], [52, 52],
        [54, 54], [56, 56], [58, 58], [60, 62], [60, 66]],

        // ── SE ASIA MAINLAND (Myanmar → Vietnam) ──
        [[92, 22], [94, 20], [96, 18], [98, 16], [99, 14], [98, 12], [98, 10],
        [100, 8], [100, 5], [100, 3], [102, 2], [104, 1], [105, 2], [106, 4],
        [106, 8], [108, 10], [108, 12], [110, 14], [108, 16], [106, 14],
        [104, 14], [102, 14], [100, 14], [98, 16], [96, 18], [94, 20]],

        // ── INDONESIA (Sumatra + Java + Borneo simplified) ──
        [[95, -2], [97, -1], [100, 0], [102, 1], [104, 1], [106, -2], [106, -6],
        [108, -7], [110, -7], [112, -7], [114, -8], [116, -8], [118, -8],
        [120, -9], [118, -10], [115, -9], [112, -8], [110, -8], [108, -8],
        [106, -7], [104, -6], [102, -4], [100, -2], [98, -2]],

        // ── BORNEO ──
        [[109, 1], [110, 2], [112, 3], [114, 4], [116, 4], [117, 3], [118, 1],
        [117, 0], [116, -1], [115, -2], [114, -3], [112, -3], [110, -2],
        [109, -1], [109, 1]],

        // ── AUSTRALIA ──
        [[114, -12], [116, -13], [118, -14], [120, -15], [122, -16], [124, -16],
        [126, -15], [128, -14], [130, -13], [132, -12], [134, -12], [136, -13],
        [138, -14], [140, -16], [142, -18], [144, -20], [146, -22], [148, -24],
        [150, -26], [152, -28], [153, -30], [153, -32], [152, -34], [150, -36],
        [148, -38], [146, -39], [144, -38], [142, -37], [140, -36], [138, -35],
        [136, -34], [134, -33], [132, -32], [130, -32], [128, -31], [126, -30],
        [124, -28], [122, -26], [120, -24], [118, -22], [116, -21], [114, -22],
        [113, -24], [114, -26], [115, -30], [116, -32], [116, -34], [115, -35],
        [114, -34], [113, -32], [113, -28], [114, -25], [114, -22], [113, -20],
        [114, -17], [114, -14]],

        // ── GREENLAND ──
        [[-55, 60], [-52, 62], [-48, 64], [-44, 66], [-40, 68], [-36, 70], [-30, 72],
        [-24, 74], [-20, 76], [-18, 78], [-20, 80], [-26, 82], [-34, 82], [-42, 80],
        [-48, 78], [-52, 76], [-55, 74], [-58, 72], [-60, 70], [-58, 68], [-56, 64]],

        // ── UK + IRELAND ──
        [[-10, 50], [-8, 51], [-6, 52], [-5, 53], [-5, 55], [-4, 56], [-3, 57],
        [-4, 58], [-6, 58], [-7, 57], [-8, 55], [-10, 54], [-10, 52]],
        [[-2, 51], [0, 51], [2, 52], [2, 53], [0, 54], [-1, 55], [-2, 55],
        [-1, 57], [0, 58], [0, 59], [-1, 60], [-3, 59], [-5, 58], [-5, 57],
        [-4, 56], [-4, 55], [-3, 54], [-3, 53], [-2, 52]],

        // ── JAPAN ──
        [[130, 31], [131, 32], [132, 33], [133, 34], [134, 35], [135, 36],
        [136, 37], [137, 38], [138, 39], [139, 40], [140, 41], [140, 43],
        [141, 44], [141, 45], [140, 44], [139, 42], [138, 40], [137, 38],
        [136, 36], [135, 35], [134, 34], [132, 33], [131, 32], [130, 31]],

        // ── ICELAND ──
        [[-24, 63], [-22, 64], [-20, 65], [-18, 66], [-16, 66], [-14, 65],
        [-14, 64], [-16, 63], [-18, 63], [-20, 63], [-22, 63]],

        // ── MADAGASCAR ──
        [[44, -12], [46, -14], [48, -16], [49, -18], [49, -20], [48, -22],
        [47, -24], [46, -25], [44, -24], [43, -22], [43, -20], [43, -18],
        [43, -16], [43, -14]],

        // ── NEW ZEALAND ──
        [[173, -35], [174, -37], [176, -38], [178, -40], [177, -42], [176, -44],
        [174, -46], [172, -45], [170, -44], [170, -42], [172, -40], [173, -38]],
        [[166, -44], [168, -45], [170, -46], [170, -47], [168, -47], [166, -46]],

        // ── SRI LANKA ──
        [[80, 10], [81, 9], [82, 8], [82, 7], [81, 6], [80, 7], [80, 8], [80, 10]],

        // ── TAIWAN ──
        [[120, 22], [121, 23], [122, 25], [121, 26], [120, 25], [120, 23]],

        // ── PHILIPPINES (simplified) ──
        [[117, 7], [118, 9], [119, 11], [120, 13], [121, 15], [122, 17], [121, 18],
        [120, 17], [119, 15], [118, 13], [117, 11], [117, 9]],

        // ── PAPUA NEW GUINEA ──
        [[141, -2], [143, -3], [145, -4], [147, -5], [149, -6], [150, -7],
        [152, -6], [154, -5], [155, -4], [154, -3], [152, -3], [150, -4],
        [148, -5], [146, -4], [144, -3], [142, -2]],
    ];

    /* ===== CITY DATA ===== */
    const cities = [
        {
            n: 'Boston', lon: -71.06, lat: 42.36, c: '#00ff9d',
            lbl: { id: 'SHP-2841', t: '4.2°C', s: '✓', clr: '#00ff9d' }
        },
        {
            n: 'London', lon: -0.12, lat: 51.51, c: '#00d4ff',
            lbl: { id: 'SHP-2839', t: '-17.8°C', s: '⚠', clr: '#ffb830' }
        },
        { n: 'Frankfurt', lon: 8.68, lat: 50.11, c: '#00ff9d', lbl: null },
        { n: 'Basel', lon: 7.59, lat: 47.56, c: '#ffb830', lbl: null },
        { n: 'Lagos', lon: 3.39, lat: 6.45, c: '#00d4ff', lbl: null },
        { n: 'Mumbai', lon: 72.88, lat: 19.08, c: '#00d4ff', lbl: null },
        { n: 'Singapore', lon: 103.82, lat: 1.35, c: '#00d4ff', lbl: null },
        { n: 'Shanghai', lon: 121.47, lat: 31.23, c: '#ffb830', lbl: null },
        { n: 'Tokyo', lon: 139.69, lat: 35.68, c: '#00ff9d', lbl: null },
        {
            n: 'Sydney', lon: 151.21, lat: -33.87, c: '#00d4ff',
            lbl: { id: 'SHP-2835', t: '-68.9°C', s: '✓', clr: '#00ff9d' }
        },
    ];

    /* ===== ROUTES (index pairs) ===== */
    const routes = [
        [0, 1], [1, 2], [2, 5], [5, 6], [6, 7], [7, 8], [8, 9], [1, 4], [0, 3], [2, 3]
    ];

    /* ===== HELPERS ===== */
    let anim = 0;

    function curvedPath(x1, y1, x2, y2) {
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.22;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, x2, y2);
    }
    function ptOnCurve(x1, y1, x2, y2, t) {
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.22;
        const a = (1 - t), ix1 = a * x1 + t * mx, iy1 = a * y1 + t * my, ix2 = a * mx + t * x2, iy2 = a * my + t * y2;
        return { x: a * ix1 + t * ix2, y: a * iy1 + t * iy2 };
    }
    function rrect(x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
    }

    /* ===== MAIN DRAW LOOP ===== */
    function draw() {
        anim += 0.004;
        ctx.clearRect(0, 0, W, H);

        // Ocean background
        ctx.fillStyle = '#020b18';
        ctx.fillRect(0, 0, W, H);

        // Subtle atmospheric glow
        const g = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, W * 0.55);
        g.addColorStop(0, 'rgba(0,212,255,0.03)');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

        /* ── Draw all landmass fills first ── */
        L.forEach(poly => {
            ctx.beginPath();
            poly.forEach((c, i) => {
                const p = px(c[0], c[1]);
                i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
            });
            ctx.closePath();
            ctx.fillStyle = '#0a1e35';
            ctx.fill();
        });

        /* ── Draw all landmass outlines ── */
        L.forEach(poly => {
            ctx.beginPath();
            poly.forEach((c, i) => {
                const p = px(c[0], c[1]);
                i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
            });
            ctx.closePath();

            // Outer glow
            ctx.strokeStyle = 'rgba(0,212,255,0.12)';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Main outline
            ctx.strokeStyle = 'rgba(0,212,255,0.6)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
        });

        /* ── Flight path arcs ── */
        routes.forEach((r, idx) => {
            const c1 = cities[r[0]], c2 = cities[r[1]];
            const p1 = px(c1.lon, c1.lat), p2 = px(c2.lon, c2.lat);
            const x1 = p1[0], y1 = p1[1], x2 = p2[0], y2 = p2[1];

            // Glow
            curvedPath(x1, y1, x2, y2);
            ctx.strokeStyle = 'rgba(0,212,255,0.05)'; ctx.lineWidth = 5; ctx.stroke();

            // Line
            curvedPath(x1, y1, x2, y2);
            ctx.strokeStyle = 'rgba(0,212,255,0.22)'; ctx.lineWidth = 1; ctx.stroke();

            // Traveling dot
            const sp = 0.55 + idx * 0.06;
            const t = ((anim * sp) % 1);
            const pt = ptOnCurve(x1, y1, x2, y2, t);

            ctx.beginPath(); ctx.arc(pt.x, pt.y, 9, 0, Math.PI * 2);
            const tg = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 9);
            tg.addColorStop(0, 'rgba(0,212,255,0.5)');
            tg.addColorStop(0.5, 'rgba(0,212,255,0.1)');
            tg.addColorStop(1, 'transparent');
            ctx.fillStyle = tg; ctx.fill();

            ctx.beginPath(); ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0,212,255,0.95)'; ctx.fill();
        });

        /* ── City dots ── */
        cities.forEach((city, i) => {
            const p = px(city.lon, city.lat);
            const cx = p[0], cy = p[1];
            const pulse = 1 + 0.25 * Math.sin(anim * 3 + i * 0.9);
            const gc = city.c === '#00ff9d' ? '0,255,157' : city.c === '#ffb830' ? '255,184,48' : '0,212,255';

            // Outer glow
            ctx.beginPath(); ctx.arc(cx, cy, 16 * pulse, 0, Math.PI * 2);
            const og = ctx.createRadialGradient(cx, cy, 0, cx, cy, 16 * pulse);
            og.addColorStop(0, 'rgba(' + gc + ',0.22)');
            og.addColorStop(0.5, 'rgba(' + gc + ',0.06)');
            og.addColorStop(1, 'transparent');
            ctx.fillStyle = og; ctx.fill();

            // Mid glow
            ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2);
            const mg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 7);
            mg.addColorStop(0, 'rgba(' + gc + ',0.35)');
            mg.addColorStop(1, 'transparent');
            ctx.fillStyle = mg; ctx.fill();

            // Core
            ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
            ctx.fillStyle = city.c; ctx.fill();

            // Center
            ctx.beginPath(); ctx.arc(cx, cy, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = '#fff'; ctx.fill();

            // Label
            ctx.font = '500 9px "DM Sans",sans-serif';
            ctx.fillStyle = 'rgba(232,244,255,0.6)';
            ctx.textAlign = 'center'; ctx.textBaseline = 'top';
            ctx.fillText(city.n, cx, cy + 11);
            ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
        });

        /* ── Floating shipment cards ── */
        cities.forEach(city => {
            if (!city.lbl) return;
            const p = px(city.lon, city.lat);
            const cx = p[0], cy = p[1];
            const cw = 155, ch = 34;
            const clipR = (cx + 18 + cw) > W;
            const cardX = clipR ? cx - cw - 18 : cx + 18;
            const cardY = cy - ch - 18;
            const bob = Math.sin(anim * 2 + cx * 0.01) * 3;

            // Shadow
            ctx.fillStyle = 'rgba(0,0,0,0.35)';
            rrect(cardX + 2, cardY + bob + 2, cw, ch, 7); ctx.fill();

            // BG
            ctx.fillStyle = 'rgba(8,20,36,0.94)';
            const bc = city.lbl.clr === '#ffb830' ? 'rgba(255,184,48,0.5)' : 'rgba(0,255,157,0.5)';
            ctx.strokeStyle = bc; ctx.lineWidth = 1;
            rrect(cardX, cardY + bob, cw, ch, 7); ctx.fill(); ctx.stroke();

            // Inner glow
            const ig = ctx.createLinearGradient(cardX, cardY + bob, cardX + cw, cardY + bob);
            ig.addColorStop(0, city.lbl.clr === '#ffb830' ? 'rgba(255,184,48,0.04)' : 'rgba(0,255,157,0.04)');
            ig.addColorStop(1, 'transparent');
            ctx.fillStyle = ig; rrect(cardX, cardY + bob, cw, ch, 7); ctx.fill();

            // Text
            ctx.font = '500 10px "JetBrains Mono",monospace';
            ctx.fillStyle = '#e8f4ff'; ctx.textBaseline = 'middle';
            const txt1 = city.lbl.id + ' | ';
            ctx.fillText(txt1, cardX + 11, cardY + bob + ch / 2);
            const tw = ctx.measureText(txt1).width;
            ctx.fillStyle = city.lbl.clr; ctx.font = '600 10px "JetBrains Mono",monospace';
            ctx.fillText(city.lbl.t + ' ' + city.lbl.s, cardX + 11 + tw, cardY + bob + ch / 2);
            ctx.textBaseline = 'alphabetic';

            // Dashed connector line to dot
            ctx.beginPath();
            ctx.moveTo(clipR ? cardX + cw : cardX, cardY + bob + ch);
            ctx.lineTo(cx, cy);
            ctx.strokeStyle = bc; ctx.lineWidth = 0.5;
            ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([]);
        });

        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
})();
