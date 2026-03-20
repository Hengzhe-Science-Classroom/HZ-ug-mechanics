// === Chapter 19: Kepler Problem & Orbits ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch19',
        number: 19,
        title: 'Kepler Problem & Orbits',
        subtitle: 'Conic sections, Kepler\'s laws from Newton\'s gravity, and hidden symmetry',
        file: 'ch19-kepler',

        sections: [
            // ============================================================
            // Section 0: The Orbit Equation and Conic Sections
            // ============================================================
            {
                id: 'orbit-equation',
                title: 'Orbit Equation & Conic Sections',
                content: `
<h2>Conic Sections from Newton's Law</h2>

<p>In Chapter 18, we derived the orbit equation for an inverse-square force:</p>

\\[r(\\theta) = \\frac{p}{1 + e\\cos\\theta}\\]

<p>where \\(p = L^2/(GM\\mu^2)\\) is the semi-latus rectum and \\(e = \\sqrt{1 + 2EL^2/(G^2M^2\\mu^3)}\\) is the eccentricity. This equation describes a <strong>conic section</strong> with the force center (the attracting mass) at one focus.</p>

<div class="env-block definition">
<div class="env-title">Definition: The Four Conic Sections</div>
<div class="env-body">
<p>A conic section is the intersection of a plane with a cone. In polar form \\(r = p/(1 + e\\cos\\theta)\\):</p>
<ul>
<li><strong>Circle</strong> (\\(e = 0\\)): \\(r = p\\). Constant distance from the focus.</li>
<li><strong>Ellipse</strong> (\\(0 < e < 1\\)): \\(r\\) oscillates between \\(r_{\\min} = p/(1+e)\\) and \\(r_{\\max} = p/(1-e)\\). The semi-major axis is \\(a = p/(1-e^2)\\).</li>
<li><strong>Parabola</strong> (\\(e = 1\\)): \\(r \\to \\infty\\) as \\(\\theta \\to \\pi\\). The orbit extends to infinity with zero energy.</li>
<li><strong>Hyperbola</strong> (\\(e > 1\\)): Only part of the curve is physical (\\(|\\theta| < \\cos^{-1}(-1/e)\\)). The orbit is unbound; the particle comes from and returns to infinity.</li>
</ul>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: Orbit Parameters in Terms of Energy and Angular Momentum</div>
<div class="env-body">
<p>For the gravitational two-body problem (with \\(k = GM\\mu\\)):</p>
\\[a = -\\frac{k}{2E} \\quad (E < 0, \\text{ ellipse}), \\qquad p = \\frac{L^2}{k\\mu}, \\qquad e = \\sqrt{1 + \\frac{2EL^2}{k^2\\mu}}\\]
<p>The semi-major axis \\(a\\) depends only on energy (not angular momentum). The shape (eccentricity) depends on both. For a given energy, a circular orbit has the maximum angular momentum; increasing eccentricity means less angular momentum.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-conic-morph"></div>

<div class="env-block remark">
<div class="env-title">Why gravity produces conic sections</div>
<div class="env-body">
<p>This is not a coincidence. The inverse-square force produces an orbit equation that is a simple harmonic oscillator in \\(u = 1/r\\) (Binet's equation). The solution is \\(u = A + B\\cos\\theta\\), which is exactly the polar equation of a conic section with focus at the origin. Any other power law would give a more complicated ODE, and the resulting orbits would not be conic sections.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-conic-morph',
                        title: 'Conic Section Morph: Circle to Ellipse to Parabola to Hyperbola',
                        description: 'Smoothly vary the eccentricity \\(e\\) to watch the orbit morph through all four conic sections. The focus (force center) is marked.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 200, originY: 195 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var ecc = 0.0;
                            var p = 3.0; // semi-latus rectum in scaled units

                            VizEngine.createSlider(controls, 'Eccentricity e', 0, 2.5, ecc, 0.01, function (v) { ecc = v; });

                            function draw() {
                                viz.clear();
                                viz.drawGrid(1);

                                // Draw conic section
                                var steps = 800;
                                var thetaMax = ecc < 1 ? Math.PI : Math.acos(-1 / ecc) - 0.01;

                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var started = false;
                                for (var i = -steps; i <= steps; i++) {
                                    var theta = thetaMax * i / steps;
                                    var denom = 1 + ecc * Math.cos(theta);
                                    if (denom <= 0.01) { started = false; continue; }
                                    var r = p / denom;
                                    if (r > 15) { started = false; continue; }
                                    var x = r * Math.cos(theta);
                                    var y = r * Math.sin(theta);
                                    var sx = viz.originX + x * viz.scale;
                                    var sy = viz.originY - y * viz.scale;
                                    if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) { started = false; continue; }
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.stroke();

                                // Focus point (origin)
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold; ctx.shadowBlur = 10;
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath(); ctx.arc(viz.originX, viz.originY, 6, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();
                                viz.screenText('Focus', viz.originX + 12, viz.originY + 14, viz.colors.gold, 10, 'left');

                                // For ellipse, draw semi-major axis and second focus
                                if (ecc > 0.001 && ecc < 0.999) {
                                    var a = p / (1 - ecc * ecc);
                                    var c = a * ecc; // distance from center to focus
                                    // Center of ellipse is at (-c, 0) from focus (since focus is at origin)
                                    // Actually: periapsis at r_min = p/(1+e), in direction theta=0
                                    // Center of ellipse at x = -(a - r_min) = -(a - p/(1+e))
                                    // a - p/(1+e) = a - a(1-e^2)/(1+e) = a(1 - (1-e)) = ae = c
                                    // So center is at x = -c from focus, and second focus at x = -2c
                                    var cx_ellipse = -c;
                                    var focus2x = -2 * c;

                                    // Second focus
                                    var sf2x = viz.originX + focus2x * viz.scale;
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath(); ctx.arc(sf2x, viz.originY, 4, 0, Math.PI * 2); ctx.fill();

                                    // Semi-major axis line
                                    ctx.setLineDash([4, 3]);
                                    ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 0.8;
                                    var sApoX = viz.originX + (-2 * c - (a - c)) * viz.scale; // apoapsis at theta=pi
                                    var sPeriX = viz.originX + p / (1 + ecc) * viz.scale;
                                    // Actually: periapsis in theta=0 direction: r_min = p/(1+e)
                                    // apoapsis in theta=pi direction: r_max = p/(1-e)
                                    var rMin = p / (1 + ecc), rMax = p / (1 - ecc);
                                    ctx.beginPath();
                                    ctx.moveTo(viz.originX + rMin * viz.scale, viz.originY);
                                    ctx.lineTo(viz.originX - rMax * viz.scale, viz.originY);
                                    ctx.stroke();
                                    ctx.setLineDash([]);

                                    viz.screenText('a = ' + a.toFixed(2), viz.originX - c * viz.scale / 2, viz.originY - 20, viz.colors.text, 10);
                                }

                                // Orbit type label
                                var label;
                                if (ecc < 0.001) label = 'Circle (e = 0)';
                                else if (ecc < 0.999) label = 'Ellipse (0 < e < 1)';
                                else if (ecc < 1.001) label = 'Parabola (e = 1)';
                                else label = 'Hyperbola (e > 1)';

                                viz.screenText(label, w / 2, h - 30, viz.colors.white, 14);
                                viz.screenText('e = ' + ecc.toFixed(2) + ',  p = ' + p.toFixed(1), w / 2, h - 12, viz.colors.text, 11);
                            }

                            viz.animate(function () { draw(); });
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Show that for an elliptical orbit with semi-major axis \\(a\\) and eccentricity \\(e\\), the semi-minor axis is \\(b = a\\sqrt{1-e^2}\\) and the semi-latus rectum is \\(p = a(1-e^2)\\).',
                        hint: 'The semi-latus rectum \\(p\\) is the distance from focus to the curve at \\(\\theta = \\pi/2\\). The semi-minor axis \\(b\\) is related to \\(a\\) and the focal distance \\(c = ae\\) by \\(b^2 = a^2 - c^2\\).',
                        solution: 'At \\(\\theta = \\pi/2\\): \\(r = p/(1 + e \\cdot 0) = p\\). The periapsis is \\(r_{\\min} = p/(1+e)\\) and apoapsis \\(r_{\\max} = p/(1-e)\\). The major axis is \\(2a = r_{\\min} + r_{\\max} = p/(1+e) + p/(1-e) = 2p/(1-e^2)\\), so \\(p = a(1-e^2)\\). The focal distance is \\(c = a - r_{\\min} = a - a(1-e) = ae\\). Then \\(b^2 = a^2 - c^2 = a^2(1 - e^2)\\), giving \\(b = a\\sqrt{1-e^2}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 1: Kepler's Three Laws
            // ============================================================
            {
                id: 'keplers-laws',
                title: 'Kepler\'s Three Laws',
                content: `
<h2>Kepler's Laws from Newton's Mechanics</h2>

<p>Kepler discovered his three laws empirically from Tycho Brahe's observations. Newton showed that all three follow from the inverse-square law of gravity combined with his second law. This was one of the greatest triumphs of theoretical physics.</p>

<div class="env-block theorem">
<div class="env-title">Kepler's First Law: Law of Orbits</div>
<div class="env-body">
<p>Planets move in ellipses with the Sun at one focus.</p>
<p><strong>Derivation:</strong> We proved this in the previous section. The orbit equation \\(r = p/(1 + e\\cos\\theta)\\) with \\(0 < e < 1\\) is an ellipse with the force center at a focus. This follows directly from Binet's equation for the \\(1/r^2\\) force.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Kepler's Second Law: Law of Areas</div>
<div class="env-body">
<p>The line joining a planet to the Sun sweeps out equal areas in equal times.</p>
<p><strong>Derivation:</strong> The area swept in time \\(dt\\) is \\(dA = \\frac{1}{2}r^2 d\\theta\\), so:</p>
\\[\\frac{dA}{dt} = \\frac{1}{2}r^2\\dot{\\theta} = \\frac{L}{2\\mu}\\]
<p>Since \\(L\\) is conserved (central force has zero torque), \\(dA/dt\\) is constant. This law is equivalent to angular momentum conservation and holds for <em>any</em> central force, not just gravity.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Kepler's Third Law: Law of Periods</div>
<div class="env-body">
<p>The square of the orbital period is proportional to the cube of the semi-major axis:</p>
\\[T^2 = \\frac{4\\pi^2}{GM}a^3\\]
<p><strong>Derivation:</strong> The total area of the ellipse is \\(A = \\pi a b = \\pi a^2\\sqrt{1-e^2}\\). Since \\(dA/dt = L/(2\\mu)\\) is constant, \\(T = A/(dA/dt) = 2\\pi a^2\\sqrt{1-e^2}\\mu/L\\). Using \\(p = L^2/(GM\\mu^2)\\) and \\(p = a(1-e^2)\\):</p>
\\[L = \\mu\\sqrt{GMa(1-e^2)} \\implies T = \\frac{2\\pi a^2\\sqrt{1-e^2}\\mu}{\\mu\\sqrt{GMa(1-e^2)}} = 2\\pi\\sqrt{\\frac{a^3}{GM}}\\]
<p>Squaring gives the third law. Remarkably, the period depends only on \\(a\\), not on \\(e\\): orbits with the same semi-major axis have the same period regardless of eccentricity.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The universality of Kepler's third law</div>
<div class="env-body">
<p>Kepler's third law gives us a way to "weigh" celestial bodies. By measuring the orbital period and semi-major axis of a satellite, we determine \\(GM\\) of the central body. This is how we know the mass of the Sun, Jupiter, and every planet with a moon. More precisely, we measure \\(G(M + m)\\), but typically \\(m \\ll M\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Mass of the Sun from Earth's orbit</div>
<div class="env-body">
<p>Earth's orbital parameters: \\(T = 3.156 \\times 10^7\\) s, \\(a = 1.496 \\times 10^{11}\\) m. Kepler's third law gives:</p>
\\[M_{\\odot} = \\frac{4\\pi^2 a^3}{GT^2} = \\frac{4\\pi^2 (1.496 \\times 10^{11})^3}{6.674 \\times 10^{-11} \\times (3.156 \\times 10^7)^2} = 1.99 \\times 10^{30}\\,\\text{kg}\\]
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'An asteroid has a perihelion distance of 1 AU and an aphelion distance of 5 AU. Find (a) the semi-major axis, (b) the eccentricity, (c) the orbital period in years.',
                        hint: 'Use \\(a = (r_{\\min} + r_{\\max})/2\\), \\(e = (r_{\\max} - r_{\\min})/(r_{\\max} + r_{\\min})\\), and Kepler\'s third law \\(T^2/a^3 = 1\\) in AU and years.',
                        solution: '(a) \\(a = (1 + 5)/2 = 3\\) AU. (b) \\(e = (5-1)/(5+1) = 2/3 \\approx 0.667\\). (c) \\(T^2 = a^3 = 27\\), so \\(T = \\sqrt{27} = 3\\sqrt{3} \\approx 5.20\\) years.'
                    },
                    {
                        question: 'Show that the speed of a planet at any point in its orbit is \\(v = \\sqrt{GM(2/r - 1/a)}\\) (the vis-viva equation).',
                        hint: 'Use total energy \\(E = \\frac{1}{2}\\mu v^2 - GM\\mu/r\\) and \\(E = -GM\\mu/(2a)\\).',
                        solution: '\\(E = \\frac{1}{2}\\mu v^2 - GM\\mu/r = -GM\\mu/(2a)\\). Solving for \\(v^2\\): \\(v^2 = 2GM/r - GM/a = GM(2/r - 1/a)\\). This is the vis-viva equation. It gives the speed at any point on the orbit in terms of the distance \\(r\\) and the semi-major axis \\(a\\). At periapsis (\\(r = a(1-e)\\)): \\(v_{\\text{peri}} = \\sqrt{GM(1+e)/(a(1-e))}\\). At apoapsis: \\(v_{\\text{apo}} = \\sqrt{GM(1-e)/(a(1+e))}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: The Laplace-Runge-Lenz Vector
            // ============================================================
            {
                id: 'lrl-vector',
                title: 'Laplace-Runge-Lenz Vector',
                content: `
<h2>A Hidden Conservation Law</h2>

<p>The Kepler problem has a remarkable conserved quantity beyond energy and angular momentum. The <strong>Laplace-Runge-Lenz (LRL) vector</strong> is:</p>

\\[\\mathbf{A} = \\dot{\\mathbf{r}} \\times \\mathbf{L} - GM\\mu\\hat{\\mathbf{r}}\\]

<p>(Some authors define it with an extra factor of \\(\\mu\\) or \\(m\\); the physics is the same.)</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Conservation of the LRL Vector</div>
<div class="env-body">
<p>For the inverse-square force \\(\\mathbf{F} = -GM\\mu\\hat{\\mathbf{r}}/r^2\\), the LRL vector \\(\\mathbf{A}\\) is conserved: \\(d\\mathbf{A}/dt = 0\\).</p>
<p><strong>Proof:</strong></p>
\\[\\frac{d\\mathbf{A}}{dt} = \\ddot{\\mathbf{r}} \\times \\mathbf{L} + \\dot{\\mathbf{r}} \\times \\dot{\\mathbf{L}} - GM\\mu\\frac{d\\hat{\\mathbf{r}}}{dt}\\]
<p>Since \\(\\mathbf{L}\\) is conserved, \\(\\dot{\\mathbf{L}} = 0\\). Using Newton's second law \\(\\mu\\ddot{\\mathbf{r}} = -GM\\mu\\hat{\\mathbf{r}}/r^2\\):</p>
\\[\\ddot{\\mathbf{r}} \\times \\mathbf{L} = -\\frac{GM}{r^2}\\hat{\\mathbf{r}} \\times (\\mu\\mathbf{r} \\times \\dot{\\mathbf{r}})\\]
<p>Using the BAC-CAB rule \\(\\mathbf{a} \\times (\\mathbf{b} \\times \\mathbf{c}) = \\mathbf{b}(\\mathbf{a} \\cdot \\mathbf{c}) - \\mathbf{c}(\\mathbf{a} \\cdot \\mathbf{b})\\):</p>
\\[\\hat{\\mathbf{r}} \\times (\\mathbf{r} \\times \\dot{\\mathbf{r}}) = \\mathbf{r}(\\hat{\\mathbf{r}} \\cdot \\dot{\\mathbf{r}}) - \\dot{\\mathbf{r}}(\\hat{\\mathbf{r}} \\cdot \\mathbf{r}) = \\mathbf{r}\\dot{r}/r - \\dot{\\mathbf{r}} \\cdot r/r\\]
<p>Wait; let us be more careful. \\(\\hat{\\mathbf{r}} \\times (\\mathbf{r} \\times \\dot{\\mathbf{r}}) = \\mathbf{r}(\\hat{\\mathbf{r}} \\cdot \\dot{\\mathbf{r}}) - \\dot{\\mathbf{r}}(\\hat{\\mathbf{r}} \\cdot \\mathbf{r})\\). Since \\(\\hat{\\mathbf{r}} \\cdot \\mathbf{r} = r\\) and \\(\\hat{\\mathbf{r}} \\cdot \\dot{\\mathbf{r}} = \\dot{r}\\):</p>
\\[= \\dot{r}\\mathbf{r} - r\\dot{\\mathbf{r}} = r(\\dot{r}\\hat{\\mathbf{r}} - \\dot{\\mathbf{r}})\\]
<p>Combining with the \\(-GM\\mu/r^2\\) prefactor and comparing with \\(d\\hat{\\mathbf{r}}/dt = (\\dot{\\mathbf{r}} - \\dot{r}\\hat{\\mathbf{r}})/r\\), we find exact cancellation: \\(d\\mathbf{A}/dt = 0\\). \\(\\square\\)</p>
</div>
</div>

<h3>Physical Meaning</h3>

<p>The LRL vector points from the focus to the periapsis and has magnitude \\(|\\mathbf{A}| = GM\\mu e\\). It encodes the orientation and eccentricity of the orbit. Conservation of \\(\\mathbf{A}\\) is why the orientation of the ellipse is fixed (the orbit does not precess).</p>

<div class="env-block remark">
<div class="env-title">The deeper symmetry</div>
<div class="env-body">
<p>Energy, angular momentum (3 components), and the LRL vector (3 components) give 7 conserved quantities. But they are not independent: \\(\\mathbf{A} \\cdot \\mathbf{L} = 0\\) and \\(|\\mathbf{A}|^2 = (GM\\mu)^2 + 2EL^2/\\mu\\), leaving 5 independent constants. For a 2D orbit (4-dimensional phase space), this is one more conserved quantity than the three needed for integrability. The extra conservation law reflects a hidden SO(4) symmetry (for bound orbits) or SO(3,1) symmetry (for unbound orbits) of the Kepler problem, discovered by Fock and Bargmann.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-lrl-vector"></div>

<div class="env-block intuition">
<div class="env-title">Why only 1/r^2 has the LRL vector</div>
<div class="env-body">
<p>For any other central force law, the orbit precesses, and the direction of the periapsis slowly rotates. The LRL vector would not be constant. The conservation of \\(\\mathbf{A}\\) is equivalent to the statement that the orbit is a closed ellipse (Bertrand's theorem). The inverse-square force is special: it has an additional symmetry beyond rotational invariance, and that extra symmetry is what prevents precession.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-lrl-vector',
                        title: 'Laplace-Runge-Lenz Vector Conservation',
                        description: 'The orbiting body traces an ellipse. The LRL vector (gold arrow, from focus to periapsis) remains constant throughout the motion, demonstrating the hidden symmetry of the Kepler problem.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 45, originX: 250, originY: 200 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var ecc = 0.6;
                            var time = 0;
                            var prevTs = null;
                            var trail = [];
                            var maxTrail = 600;

                            // GM*mu = 1, mu = 1
                            var L = 1.0;

                            VizEngine.createSlider(controls, 'Eccentricity e', 0.05, 0.9, ecc, 0.01, function (v) {
                                ecc = v;
                                L = Math.sqrt(p0); // keep p constant, adjust L
                                time = 0; trail = []; state = initState();
                            });
                            VizEngine.createButton(controls, 'Reset', function () { time = 0; trail = []; state = initState(); });

                            var p0 = 3.0; // semi-latus rectum

                            function initState() {
                                // Start at periapsis
                                L = Math.sqrt(p0); // p = L^2/(GM*mu^2), GM*mu=1, mu=1
                                var rMin = p0 / (1 + ecc);
                                var vTheta = L / rMin; // L = r * v_theta
                                return [rMin, 0, 0, vTheta]; // [r, theta, vr, vtheta]
                            }

                            var state = initState();

                            function derivs(s) {
                                var r = s[0], th = s[1], vr = s[2];
                                if (r < 0.05) r = 0.05;
                                var ar = -1 / (r * r) + L * L / (r * r * r); // GM*mu=1
                                return [vr, L / (r * r), ar, 0]; // vtheta not independent, use L conservation
                            }

                            function draw(ts) {
                                if (prevTs === null) prevTs = ts;
                                var dt = Math.min((ts - prevTs) / 1000, 0.03);
                                prevTs = ts;

                                // Integrate
                                var substeps = 30;
                                var dts = dt * 1.5 / substeps;
                                for (var s = 0; s < substeps; s++) {
                                    state = VizEngine.rk4(state, time, dts, derivs);
                                    time += dts;
                                    if (state[0] < 0.05) { state[0] = 0.05; state[2] = Math.abs(state[2]); }
                                    var x = state[0] * Math.cos(state[1]);
                                    var y = state[0] * Math.sin(state[1]);
                                    trail.push([x, y]);
                                    if (trail.length > maxTrail) trail.shift();
                                }

                                viz.clear();

                                // Draw trail
                                if (trail.length > 1) {
                                    for (var i = 1; i < trail.length; i++) {
                                        var alpha = (i / trail.length) * 0.6;
                                        ctx.strokeStyle = viz.colors.blue; ctx.globalAlpha = alpha;
                                        ctx.lineWidth = 0.8 + (i / trail.length) * 1.5;
                                        ctx.beginPath();
                                        var s1 = viz.toScreen(trail[i - 1][0], trail[i - 1][1]);
                                        var s2 = viz.toScreen(trail[i][0], trail[i][1]);
                                        ctx.moveTo(s1[0], s1[1]); ctx.lineTo(s2[0], s2[1]);
                                        ctx.stroke();
                                    }
                                    ctx.globalAlpha = 1;
                                }

                                // Draw the theoretical ellipse (faintly)
                                ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 1;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= 360; i++) {
                                    var thd = i * Math.PI / 180;
                                    var rd = p0 / (1 + ecc * Math.cos(thd));
                                    var ex = rd * Math.cos(thd), ey = rd * Math.sin(thd);
                                    var sp = viz.toScreen(ex, ey);
                                    if (!started) { ctx.moveTo(sp[0], sp[1]); started = true; }
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.closePath(); ctx.stroke();

                                // Focus (central body)
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold; ctx.shadowBlur = 12;
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath(); ctx.arc(viz.originX, viz.originY, 7, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();

                                // Orbiting body
                                var bx = state[0] * Math.cos(state[1]);
                                var by = state[0] * Math.sin(state[1]);
                                var bs = viz.toScreen(bx, by);
                                ctx.save();
                                ctx.shadowColor = viz.colors.blue; ctx.shadowBlur = 10;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(bs[0], bs[1], 6, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();

                                // LRL vector: A = v x L_hat * |L| - GM*mu*r_hat
                                // In 2D: A_x = vy*L - x/r, A_y = -vx*L - y/r
                                // where vx = vr*cos(th) - r*vth*sin(th), vy = vr*sin(th) + r*vth*cos(th)
                                var r = state[0], th = state[1], vr = state[2];
                                var vth = L / (r * r); // angular velocity
                                var vx = vr * Math.cos(th) - r * vth * Math.sin(th);
                                var vy = vr * Math.sin(th) + r * vth * Math.cos(th);
                                // L = r * r * vth in z direction (for mu=1)
                                // A = p x L - GM*mu*r_hat, in 2D with L in z:
                                // A_x = vy * L - (x/r), A_y = -vx * L - (y/r)
                                // Wait, with our conventions: v x L (cross product with L in z)
                                // v x (L z_hat) = (vx, vy, 0) x (0, 0, L) = (vy*L, -vx*L, 0)
                                var Ax = vy * L - Math.cos(th);
                                var Ay = -vx * L - Math.sin(th);
                                var Amag = Math.sqrt(Ax * Ax + Ay * Ay);

                                // Draw LRL vector (scaled for visibility)
                                var lrlScale = 1.0;
                                if (Amag > 0.01) {
                                    viz.drawVector(0, 0, Ax * lrlScale, Ay * lrlScale, viz.colors.gold, 'A', 3, 12);
                                }

                                // Draw angular momentum direction indicator
                                viz.screenText('L = ' + L.toFixed(2) + ' (out of screen)', 15, h - 45, viz.colors.purple, 10, 'left');
                                viz.screenText('|A| = ' + Amag.toFixed(3) + ' = GM\u00B7e = ' + ecc.toFixed(3), 15, h - 28, viz.colors.gold, 10, 'left');
                                viz.screenText('e = ' + ecc.toFixed(2), 15, h - 11, viz.colors.text, 11, 'left');

                                // Velocity vector at current position
                                var velScale = 0.3;
                                viz.drawVector(bx, by, vx * velScale, vy * velScale, viz.colors.teal, 'v', 1.5, 8);
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Compute the magnitude of the LRL vector and show that \\(|\\mathbf{A}|^2 = (GM\\mu)^2 + 2EL^2/\\mu\\).',
                        hint: 'Evaluate \\(\\mathbf{A} \\cdot \\mathbf{A}\\) using the orbit equation and the expressions for \\(E\\) and \\(L\\).',
                        solution: 'From the orbit equation, at \\(\\theta = 0\\) (periapsis): \\(r_{\\min} = p/(1+e)\\), \\(v_r = 0\\), \\(v_\\theta = L/(\\mu r_{\\min})\\). Then \\(A_x = v_\\theta L - GM\\mu = L^2/(\\mu r_{\\min}) - GM\\mu = GM\\mu(1+e) - GM\\mu = GM\\mu e\\), \\(A_y = 0\\). So \\(|\\mathbf{A}| = GM\\mu e\\). Squaring: \\(|\\mathbf{A}|^2 = (GM\\mu)^2 e^2 = (GM\\mu)^2(1 + 2EL^2/(G^2M^2\\mu^3)) = (GM\\mu)^2 + 2EL^2/\\mu\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Full Orbital Simulator
            // ============================================================
            {
                id: 'orbital-simulator',
                title: 'Orbital Dynamics Simulator',
                content: `
<h2>Putting It All Together</h2>

<p>The Kepler problem is completely solved: given initial position and velocity, we know the orbit shape, size, orientation, and period. The vis-viva equation gives the speed at any point:</p>

\\[v^2 = GM\\left(\\frac{2}{r} - \\frac{1}{a}\\right)\\]

<p>For a parabola (\\(a \\to \\infty\\)): \\(v = \\sqrt{2GM/r}\\). For a hyperbola (\\(a < 0\\)): \\(v^2 = GM(2/r + 1/|a|)\\).</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Orbital Elements</div>
<div class="env-body">
<p>A Kepler orbit in 2D is completely specified by three orbital elements:</p>
<ol>
<li><strong>Semi-major axis</strong> \\(a\\) (or energy \\(E = -GM\\mu/(2a)\\)): determines the size and period.</li>
<li><strong>Eccentricity</strong> \\(e\\) (or angular momentum \\(L\\)): determines the shape.</li>
<li><strong>Argument of periapsis</strong> \\(\\omega\\) (or direction of \\(\\mathbf{A}\\)): determines the orientation.</li>
</ol>
<p>In 3D, three additional elements specify the orientation of the orbital plane (inclination, longitude of ascending node) and the time of periapsis passage. Together, the six orbital elements parameterize the full solution.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-orbital-sim"></div>

<div class="env-block remark">
<div class="env-title">Hohmann transfer orbits</div>
<div class="env-body">
<p>To transfer a spacecraft from a circular orbit of radius \\(r_1\\) to one of radius \\(r_2 > r_1\\), the most fuel-efficient two-impulse maneuver uses an elliptical transfer orbit with periapsis \\(r_1\\) and apoapsis \\(r_2\\). The semi-major axis of the transfer ellipse is \\(a_t = (r_1 + r_2)/2\\). Two velocity changes are needed: one to enter the transfer ellipse, and one to circularize at the target orbit. The total \\(\\Delta v\\) is minimized among all two-impulse transfers (Hohmann, 1925).</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-orbital-sim',
                        title: 'SHOWPIECE: Full RK4 Orbital Simulator',
                        description: 'Adjust energy and angular momentum to create any orbit type. The simulation uses RK4 integration of Newton\'s gravitational law. Watch the particle trace circles, ellipses, parabolas, or hyperbolas.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 30, originX: 280, originY: 210 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // GM = 1, mu = 1
                            var L = 1.2;
                            var E = -0.2;
                            var time = 0;
                            var prevTs = null;
                            var trail = [];
                            var maxTrail = 3000;
                            var paused = false;

                            VizEngine.createSlider(controls, 'L', 0.3, 3.0, L, 0.05, function (v) { L = v; reset(); });
                            VizEngine.createSlider(controls, 'E', -1.0, 0.5, E, 0.01, function (v) { E = v; reset(); });
                            VizEngine.createButton(controls, 'Reset', function () { reset(); });
                            VizEngine.createButton(controls, 'Pause/Play', function () { paused = !paused; });

                            function reset() {
                                time = 0; trail = []; state = initState();
                            }

                            function initState() {
                                // Start at periapsis
                                var p = L * L; // p = L^2/(GM*mu^2) = L^2
                                var disc = 1 + 2 * E * L * L;
                                var e = disc >= 0 ? Math.sqrt(disc) : 0;
                                var rMin = e < 0.9999 ? p / (1 + e) : p / 2;
                                if (rMin < 0.1) rMin = 0.1;

                                // Check if energy is consistent
                                var Ueff = -1 / rMin + L * L / (2 * rMin * rMin);
                                var kr = E - Ueff;
                                if (kr < 0) {
                                    // Energy below Ueff at this radius, find valid rMin
                                    rMin = Math.max(rMin * 1.5, 0.2);
                                }

                                var vth = L / rMin;
                                return [rMin, 0, 0, vth];
                            }

                            var state = initState();

                            function derivs(s) {
                                var r = s[0];
                                if (r < 0.03) r = 0.03;
                                var ar = -1 / (r * r) + L * L / (r * r * r);
                                return [s[2], L / (r * r), ar, 0];
                            }

                            function draw(ts) {
                                if (prevTs === null) prevTs = ts;
                                var dt = Math.min((ts - prevTs) / 1000, 0.03);
                                prevTs = ts;

                                if (!paused) {
                                    var substeps = 40;
                                    var dts = dt * 2.0 / substeps;
                                    for (var s = 0; s < substeps; s++) {
                                        state = VizEngine.rk4(state, time, dts, derivs);
                                        time += dts;
                                        if (state[0] < 0.05) { state[0] = 0.05; state[2] = Math.abs(state[2]); }
                                        if (state[0] > 30) { state[2] = -Math.abs(state[2]); }
                                        var x = state[0] * Math.cos(state[1]);
                                        var y = state[0] * Math.sin(state[1]);
                                        trail.push([x, y]);
                                        if (trail.length > maxTrail) trail.shift();
                                    }
                                }

                                viz.clear();

                                // Draw trail
                                if (trail.length > 1) {
                                    ctx.lineWidth = 1.5;
                                    for (var i = 1; i < trail.length; i++) {
                                        var alpha = (i / trail.length) * 0.65;
                                        var sc1 = viz.toScreen(trail[i - 1][0], trail[i - 1][1]);
                                        var sc2 = viz.toScreen(trail[i][0], trail[i][1]);
                                        // Color code by speed (distance from center as proxy)
                                        var dist = Math.sqrt(trail[i][0] * trail[i][0] + trail[i][1] * trail[i][1]);
                                        var hue = VizEngine.clamp(200 + (dist - 1) * 30, 180, 300);
                                        ctx.strokeStyle = VizEngine.hsl(hue, 80, 60);
                                        ctx.globalAlpha = alpha;
                                        ctx.beginPath(); ctx.moveTo(sc1[0], sc1[1]); ctx.lineTo(sc2[0], sc2[1]); ctx.stroke();
                                    }
                                    ctx.globalAlpha = 1;
                                }

                                // Central body
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold; ctx.shadowBlur = 15;
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath(); ctx.arc(viz.originX, viz.originY, 8, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();

                                // Orbiting body
                                var bx = state[0] * Math.cos(state[1]);
                                var by = state[0] * Math.sin(state[1]);
                                var bs = viz.toScreen(bx, by);
                                ctx.save();
                                ctx.shadowColor = viz.colors.cyan; ctx.shadowBlur = 10;
                                ctx.fillStyle = viz.colors.cyan;
                                ctx.beginPath(); ctx.arc(bs[0], bs[1], 5, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();
                                ctx.fillStyle = 'rgba(255,255,255,0.25)';
                                ctx.beginPath(); ctx.arc(bs[0] - 1.5, bs[1] - 1.5, 2, 0, Math.PI * 2); ctx.fill();

                                // Radius line
                                ctx.strokeStyle = viz.colors.text + '33'; ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(viz.originX, viz.originY); ctx.lineTo(bs[0], bs[1]); ctx.stroke();

                                // Velocity vector
                                var r = state[0], th = state[1], vr = state[2];
                                var vtheta = L / (r * r);
                                var vxp = vr * Math.cos(th) - r * vtheta * Math.sin(th);
                                var vyp = vr * Math.sin(th) + r * vtheta * Math.cos(th);
                                var vScale = 0.25;
                                viz.drawVector(bx, by, vxp * vScale, vyp * vScale, viz.colors.teal, '', 1.5, 8);

                                // Energy bars (right side)
                                var KE = 0.5 * (vr * vr + r * r * vtheta * vtheta);
                                var PE = -1 / r;
                                var barX = w - 80, barY = h - 30;
                                var barH = 80, barW = 16;
                                var eMax = Math.max(Math.abs(KE), Math.abs(PE), 0.5) * 1.2;

                                // KE bar (always positive)
                                var keH = (KE / eMax) * barH;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillRect(barX, barY - keH, barW, keH);
                                viz.screenText('KE', barX + barW / 2, barY + 10, viz.colors.orange, 9);

                                // PE bar (negative)
                                var peH = (Math.abs(PE) / eMax) * barH;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(barX + barW + 6, barY, barW, -peH); // going up from barY is wrong for negative
                                ctx.fillRect(barX + barW + 6, barY - 0, barW, peH); // PE is negative, draw below
                                // Actually draw PE as extending downward (below baseline)
                                ctx.fillStyle = viz.colors.bg;
                                ctx.fillRect(barX + barW + 6, barY - barH - 5, barW, barH + 10);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(barX + barW + 6, barY, barW, Math.min(peH, 40));
                                viz.screenText('PE', barX + barW + 6 + barW / 2, barY + Math.min(peH, 40) + 10, viz.colors.blue, 9);

                                // Info panel
                                var disc = 1 + 2 * E * L * L;
                                var ecc = disc >= 0 ? Math.sqrt(disc) : 0;
                                var orbitType = ecc < 0.001 ? 'Circle' : (ecc < 0.999 ? 'Ellipse' : (ecc < 1.001 ? 'Parabola' : 'Hyperbola'));

                                viz.screenText('r = ' + r.toFixed(2), 15, 20, viz.colors.text, 11, 'left');
                                viz.screenText('v = ' + Math.sqrt(vxp * vxp + vyp * vyp).toFixed(3), 15, 35, viz.colors.text, 11, 'left');
                                viz.screenText('e = ' + ecc.toFixed(3), 15, 50, viz.colors.text, 11, 'left');
                                viz.screenText(orbitType, 15, 65, viz.colors.white, 12, 'left');

                                if (ecc < 1 && E < 0) {
                                    var a = -1 / (2 * E); // GM=1
                                    var T = 2 * Math.PI * Math.sqrt(a * a * a);
                                    viz.screenText('a = ' + a.toFixed(2) + '  T = ' + T.toFixed(2), 15, 80, viz.colors.text, 10, 'left');
                                }

                                if (paused) {
                                    viz.screenText('PAUSED', w / 2, h - 10, viz.colors.red, 14);
                                }
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A spacecraft in a circular orbit at \\(r_1 = 1\\) AU wants to reach \\(r_2 = 5\\) AU using a Hohmann transfer. Find the two velocity changes \\(\\Delta v_1\\) and \\(\\Delta v_2\\) in terms of the circular velocity \\(v_c = \\sqrt{GM/r_1}\\).',
                        hint: 'The transfer ellipse has \\(a_t = (r_1 + r_2)/2\\). Use the vis-viva equation to find speeds at periapsis and apoapsis of the transfer orbit.',
                        solution: 'Transfer semi-major axis: \\(a_t = (1+5)/2 = 3\\) AU. At periapsis (\\(r_1 = 1\\)): \\(v_{t1} = \\sqrt{GM(2/1 - 1/3)} = v_c\\sqrt{5/3}\\). The circular speed at \\(r_1\\) is \\(v_{c1} = v_c\\). So \\(\\Delta v_1 = v_c(\\sqrt{5/3} - 1) \\approx 0.291\\,v_c\\). At apoapsis (\\(r_2 = 5\\)): \\(v_{t2} = \\sqrt{GM(2/5 - 1/3)} = v_c\\sqrt{1/15}\\). The circular speed at \\(r_2\\) is \\(v_{c2} = v_c/\\sqrt{5}\\). So \\(\\Delta v_2 = v_c(1/\\sqrt{5} - 1/\\sqrt{15}) \\approx 0.189\\,v_c\\). Total \\(\\Delta v \\approx 0.480\\,v_c\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Scattering and Hyperbolic Orbits
            // ============================================================
            {
                id: 'scattering',
                title: 'Scattering & Hyperbolic Orbits',
                content: `
<h2>Rutherford Scattering</h2>

<p>When a particle approaches from infinity with positive energy \\(E > 0\\), the orbit is hyperbolic. The particle is deflected through a scattering angle \\(\\Theta\\) that depends on the energy and the impact parameter \\(b\\).</p>

<div class="env-block definition">
<div class="env-title">Definition: Impact Parameter and Scattering Angle</div>
<div class="env-body">
<p>The <strong>impact parameter</strong> \\(b\\) is the perpendicular distance between the initial trajectory (at infinity) and the force center. It is related to the angular momentum by \\(L = \\mu v_\\infty b\\), where \\(v_\\infty = \\sqrt{2E/\\mu}\\) is the speed at infinity.</p>
<p>The <strong>scattering angle</strong> \\(\\Theta\\) is the total deflection angle. For a repulsive \\(1/r^2\\) force (Coulomb scattering with like charges), \\(\\Theta\\) ranges from 0 (large \\(b\\), grazing) to \\(\\pi\\) (head-on, \\(b = 0\\)).</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: Rutherford Scattering Formula</div>
<div class="env-body">
<p>For an attractive (or repulsive) \\(1/r^2\\) force with coupling constant \\(k\\) (so \\(U = \\pm k/r\\)), the scattering angle is:</p>
\\[\\cot\\frac{\\Theta}{2} = \\frac{2Eb}{k} = \\frac{\\mu v_\\infty^2 b}{k}\\]
<p>The deflection angle depends on the ratio of kinetic energy to the potential energy at closest approach. The differential cross section is:</p>
\\[\\frac{d\\sigma}{d\\Omega} = \\left(\\frac{k}{4E}\\right)^2 \\frac{1}{\\sin^4(\\Theta/2)}\\]
<p>This is the <strong>Rutherford formula</strong>, derived classically, which also holds quantum mechanically for pure Coulomb scattering (a remarkable coincidence).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Connection between eccentricity and scattering angle</div>
<div class="env-body">
<p>For a hyperbolic orbit, the asymptotes make an angle \\(2\\alpha\\) with each other, where \\(\\cos\\alpha = 1/e\\). The scattering angle is \\(\\Theta = \\pi - 2\\alpha\\), so \\(\\sin(\\Theta/2) = 1/e\\). The eccentricity of the scattering orbit is \\(e = 1/\\sin(\\Theta/2)\\). A barely deflected particle (\\(\\Theta \\to 0\\)) has \\(e \\to \\infty\\); a head-on collision (\\(\\Theta = \\pi\\)) has \\(e = 1\\) (parabolic limit).</p>
</div>
</div>

<h3>Gravitational Slingshot</h3>

<p>When a spacecraft passes near a planet, the gravitational interaction is a hyperbolic orbit in the planet's rest frame. In the Sun's frame, the spacecraft can gain or lose speed depending on the geometry. This "gravitational slingshot" (or gravity assist) uses the planet's orbital motion to change the spacecraft's energy without expending fuel.</p>

<div class="env-block example">
<div class="env-title">Example: Maximum energy gain from a slingshot</div>
<div class="env-body">
<p>In the planet's rest frame, the spacecraft enters and exits with the same speed \\(v_{\\infty}\\) (energy conservation). Its velocity direction changes by the scattering angle \\(\\Theta\\). In the Sun's frame, the maximum energy gain occurs when the spacecraft exits in the direction of the planet's velocity \\(V_p\\). The spacecraft gains up to \\(2V_p\\) in speed (in the Sun's frame). For Jupiter (\\(V_p \\approx 13\\) km/s), this can add up to 26 km/s, more than double the escape velocity from Earth's orbit.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why Rutherford scattering probes the nucleus</div>
<div class="env-body">
<p>Rutherford (1911) fired alpha particles at gold foil and observed large-angle scattering (\\(\\Theta > 90^\\circ\\)). The \\(1/\\sin^4(\\Theta/2)\\) formula with a point-like charge fit the data perfectly. This was only possible if the positive charge of the atom was concentrated in a tiny nucleus (\\(\\sim 10^{-15}\\) m), not spread over the atom (\\(\\sim 10^{-10}\\) m). The Kepler problem, via the Rutherford formula, revealed the existence of the atomic nucleus.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'An alpha particle with kinetic energy 5 MeV is scattered by a gold nucleus (\\(Z = 79\\)). Find the distance of closest approach for a head-on collision (\\(b = 0\\)).',
                        hint: 'For a head-on collision, all kinetic energy converts to potential energy at closest approach: \\(E = kZZ_\\alpha e^2/(4\\pi\\varepsilon_0 r_{\\min})\\), with \\(Z_\\alpha = 2\\).',
                        solution: 'At closest approach for \\(b=0\\): \\(KE = U(r_{\\min})\\). So \\(r_{\\min} = kZ_\\alpha Z e^2/(4\\pi\\varepsilon_0 KE) = (1.44\\,\\text{MeV}\\cdot\\text{fm}) \\times 2 \\times 79 / 5 = 45.5\\) fm. This is well outside the nuclear radius of gold (\\(\\approx 7\\) fm), confirming the Coulomb scattering formula applies.'
                    },
                    {
                        question: 'Derive the relationship \\(\\cot(\\Theta/2) = 2Eb/k\\) for Coulomb scattering.',
                        hint: 'Use the orbit equation: the asymptotic angles are where \\(r \\to \\infty\\), i.e., \\(1 + e\\cos\\theta = 0\\). The scattering angle is \\(\\Theta = \\pi - 2\\alpha\\) where \\(\\cos\\alpha = 1/e\\).',
                        solution: 'Asymptotes: \\(\\cos\\theta_{\\infty} = -1/e\\), so \\(\\theta_{\\infty} = \\pi - \\alpha\\) where \\(\\cos\\alpha = 1/e\\). Scattering angle: \\(\\Theta = 2\\alpha - \\pi + \\pi = \\pi - 2\\alpha\\) for an attractive force, or more carefully: \\(\\Theta = \\pi - 2\\alpha\\). So \\(\\Theta/2 = \\pi/2 - \\alpha\\) and \\(\\cot(\\Theta/2) = \\tan\\alpha = \\sqrt{e^2 - 1}\\). Now \\(e^2 = 1 + 2EL^2/(k^2\\mu) = 1 + (2E/k^2\\mu)(\\mu v_\\infty b)^2 = 1 + (2E\\mu b^2 v_\\infty^2)/k^2\\). Using \\(\\mu v_\\infty^2 = 2E\\): \\(e^2 - 1 = 4E^2b^2/k^2\\). Therefore \\(\\cot(\\Theta/2) = 2Eb/k\\).'
                    }
                ]
            }
        ]
    });
})();
