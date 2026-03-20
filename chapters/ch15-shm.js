// === Chapter 15: Simple Harmonic Motion ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch15',
        number: 15,
        title: 'Simple Harmonic Motion',
        subtitle: 'The most universal motion in physics: springs, pendulums, phase space, and the art of linearization',
        file: 'ch15-shm',

        sections: [
            // ============================================================
            // Section 0: SHM from Hooke's Law
            // ============================================================
            {
                id: 'hookes-law',
                title: "SHM from Hooke's Law",
                content: `
<h2>The Harmonic Oscillator: Nature's Favorite Equation</h2>

<p>Nearly every stable equilibrium in physics, when slightly disturbed, produces simple harmonic motion. This extraordinary universality makes the harmonic oscillator arguably the single most important system in all of physics.</p>

<div class="env-block definition">
<div class="env-title">Definition: Simple Harmonic Motion</div>
<div class="env-body">
<p><strong>Simple harmonic motion (SHM)</strong> is any motion governed by the differential equation</p>
\\[\\ddot{x} + \\omega_0^2 x = 0\\]
<p>where \\(\\omega_0\\) is the <strong>natural (angular) frequency</strong>. The general solution is</p>
\\[x(t) = A\\cos(\\omega_0 t + \\phi)\\]
<p>where \\(A\\) is the <strong>amplitude</strong> and \\(\\phi\\) is the <strong>phase constant</strong>, both determined by initial conditions.</p>
</div>
</div>

<p>The prototypical example: a mass \\(m\\) on a spring with spring constant \\(k\\). Hooke's law gives the restoring force \\(F = -kx\\). Newton's second law:</p>

\\[m\\ddot{x} = -kx \\quad \\Longrightarrow \\quad \\ddot{x} + \\frac{k}{m}x = 0\\]

<p>so \\(\\omega_0 = \\sqrt{k/m}\\). The period and frequency are:</p>

\\[T = \\frac{2\\pi}{\\omega_0} = 2\\pi\\sqrt{\\frac{m}{k}}, \\qquad f = \\frac{1}{T} = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}\\]

<div class="env-block theorem">
<div class="env-title">Theorem: Universality of SHM Near Equilibrium</div>
<div class="env-body">
<p>Any potential energy \\(U(x)\\) with a stable equilibrium at \\(x_0\\) (where \\(U'(x_0) = 0\\) and \\(U''(x_0) > 0\\)) produces SHM for small displacements. Taylor expanding:</p>
\\[U(x) \\approx U(x_0) + \\tfrac{1}{2}U''(x_0)(x - x_0)^2 + \\cdots\\]
<p>The effective spring constant is \\(k_{\\text{eff}} = U''(x_0)\\), and \\(\\omega_0 = \\sqrt{U''(x_0)/m}\\).</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why is SHM everywhere?</div>
<div class="env-body">
<p>Because "small oscillation about a stable equilibrium" is precisely what we mean by a stable system that has been gently disturbed. The quadratic approximation to the potential (the first nontrivial term in the Taylor expansion) is always a harmonic potential. Only when amplitudes are large enough for higher-order terms to matter does the motion depart from SHM.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Initial Value Problem</div>
<div class="env-body">
<p>A 0.5 kg mass on a spring (\\(k = 8\\) N/m) is pulled 0.1 m from equilibrium and released from rest. Find \\(x(t)\\).</p>
<p>\\(\\omega_0 = \\sqrt{8/0.5} = 4\\) rad/s. Initial conditions: \\(x(0) = 0.1\\), \\(\\dot{x}(0) = 0\\). From \\(x(0) = A\\cos\\phi = 0.1\\) and \\(\\dot{x}(0) = -A\\omega_0\\sin\\phi = 0\\), we get \\(\\phi = 0\\) and \\(A = 0.1\\).</p>
\\[x(t) = 0.1\\cos(4t) \\;\\text{m}\\]
<p>Period: \\(T = 2\\pi/4 \\approx 1.57\\) s.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A particle moves in the potential \\(U(x) = U_0(x/a)^2(x/a - 1)^2\\). Find all equilibrium points, classify them as stable or unstable, and find the frequency of small oscillations about each stable equilibrium.',
                        hint: 'Set \\(U\'(x) = 0\\) to find equilibria. Compute \\(U\'\'(x)\\) at each: positive means stable (SHM), negative means unstable. Use \\(\\omega_0 = \\sqrt{U\'\'(x_0)/m}\\).',
                        solution: 'Expand: \\(U = U_0(x^2/a^2)(1 - x/a)^2\\). Set \\(dU/dx = 0\\). Factor: \\(dU/dx = (2U_0/a^2) x(1 - x/a)(1 - 2x/a) = 0\\). Equilibria: \\(x = 0\\), \\(x = a/2\\), \\(x = a\\). At \\(x = 0\\) and \\(x = a\\): \\(U = 0\\), and \\(U\'\'(0) = 2U_0/a^2 > 0\\) (stable), \\(U\'\'(a) = 2U_0/a^2 > 0\\) (stable). At \\(x = a/2\\): \\(U = U_0/16\\), and \\(U\'\'(a/2) = -U_0/a^2 < 0\\) (unstable). Frequency at stable points: \\(\\omega_0 = \\sqrt{2U_0/(ma^2)}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 1: Energy in SHM
            // ============================================================
            {
                id: 'energy-shm',
                title: 'Energy in SHM',
                content: `
<h2>The Dance Between Kinetic and Potential Energy</h2>

<p>In SHM, energy sloshes back and forth between kinetic and potential forms. The total is constant (no dissipation), and the two contributions are always complementary.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Energy in SHM</div>
<div class="env-body">
<p>For a spring-mass system with \\(x(t) = A\\cos(\\omega_0 t + \\phi)\\):</p>
\\[K = \\tfrac{1}{2}m\\dot{x}^2 = \\tfrac{1}{2}m\\omega_0^2 A^2 \\sin^2(\\omega_0 t + \\phi) = \\tfrac{1}{2}kA^2 \\sin^2(\\omega_0 t + \\phi)\\]
\\[U = \\tfrac{1}{2}kx^2 = \\tfrac{1}{2}kA^2 \\cos^2(\\omega_0 t + \\phi)\\]
\\[E = K + U = \\tfrac{1}{2}kA^2 = \\text{const.}\\]
</div>
</div>

<p>Key observations:</p>
<ul>
<li>At the equilibrium point (\\(x = 0\\)): \\(K\\) is maximum, \\(U = 0\\). All energy is kinetic.</li>
<li>At the turning points (\\(x = \\pm A\\)): \\(U\\) is maximum, \\(K = 0\\). All energy is potential.</li>
<li>On average, \\(\\langle K \\rangle = \\langle U \\rangle = E/2\\). The time-averaged KE and PE are equal. This is a special case of the <strong>virial theorem</strong> for power-law potentials (\\(\\langle K \\rangle = \\frac{n}{2}\\langle U \\rangle\\) for \\(U \\propto x^n\\), so \\(n = 2\\) gives equality).</li>
</ul>

<div class="env-block remark">
<div class="env-title">Maximum speed from energy</div>
<div class="env-body">
<p>The maximum speed is \\(v_{\\max} = A\\omega_0\\), occurring at \\(x = 0\\). This is often the fastest way to find \\(v_{\\max}\\): set \\(K = E\\), i.e., \\(\\frac{1}{2}mv_{\\max}^2 = \\frac{1}{2}kA^2\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Speed at Arbitrary Position</div>
<div class="env-body">
<p>A mass on a spring oscillates with amplitude \\(A\\). What is its speed when displacement is \\(x\\)?</p>
\\[\\tfrac{1}{2}mv^2 + \\tfrac{1}{2}kx^2 = \\tfrac{1}{2}kA^2 \\quad \\Longrightarrow \\quad v = \\omega_0\\sqrt{A^2 - x^2}\\]
<p>At \\(x = A/2\\): \\(v = \\omega_0 A\\sqrt{3}/2\\). At \\(x = A/\\sqrt{2}\\): \\(v = \\omega_0 A/\\sqrt{2}\\) (half the energy is kinetic, half potential).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-spring-energy"></div>
`,
                visualizations: [
                    {
                        id: 'viz-spring-energy',
                        title: 'Spring-Mass with Energy Bars',
                        description: 'A mass oscillates on a spring. The energy bars show KE (orange), PE (blue), and total E (green) in real time. The total energy is constant. Watch KE and PE trade off as the mass moves.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 60, originX: undefined, originY: undefined });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w * 0.35;
                            viz.originY = h * 0.42;

                            var k = 4.0;
                            var m = 1.0;
                            var A = 2.0;
                            var omega0 = Math.sqrt(k / m);
                            var phase = 0;
                            var paused = false;
                            var prevTime = 0;

                            VizEngine.createSlider(controls, 'Amplitude A', 0.5, 3.0, A, 0.1, function (v) { A = v; });
                            VizEngine.createSlider(controls, 'Spring k', 1, 10, k, 0.5, function (v) { k = v; omega0 = Math.sqrt(k / m); });
                            VizEngine.createSlider(controls, 'Mass m', 0.5, 4, m, 0.1, function (v) { m = v; omega0 = Math.sqrt(k / m); });
                            VizEngine.createButton(controls, 'Pause/Play', function () { paused = !paused; });

                            function draw(t) {
                                if (!paused) {
                                    var dt = prevTime > 0 ? (t - prevTime) / 1000 : 0;
                                    if (dt > 0.05) dt = 0.05;
                                    phase += omega0 * dt;
                                }
                                prevTime = t;

                                var x = A * Math.cos(phase);
                                var v = -A * omega0 * Math.sin(phase);
                                var KE = 0.5 * m * v * v;
                                var PE = 0.5 * k * x * x;
                                var E = 0.5 * k * A * A;

                                viz.clear();

                                // Wall
                                var wallX = -3.5;
                                var wallS = viz.toScreen(wallX, 0);
                                ctx.fillStyle = viz.colors.axis;
                                ctx.fillRect(wallS[0] - 6, wallS[1] - 40, 6, 80);
                                // Hatching
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1;
                                for (var hy = -35; hy < 40; hy += 8) {
                                    ctx.beginPath();
                                    ctx.moveTo(wallS[0] - 6, wallS[1] + hy);
                                    ctx.lineTo(wallS[0] - 14, wallS[1] + hy + 8);
                                    ctx.stroke();
                                }

                                // Spring
                                viz.drawSpring(wallX, 0, x, 0, 12, 15, viz.colors.teal, 2);

                                // Mass (ball)
                                viz.drawBall(x, 0, 0.3, viz.colors.orange, 1.5);

                                // Ground
                                var groundY = -0.6;
                                viz.drawGround(groundY, viz.colors.text + '66');

                                // Equilibrium marker
                                viz.drawSegment(0, groundY, 0, 0.8, viz.colors.yellow + '44', 1, true);
                                viz.drawText('x=0', 0, 0.9, viz.colors.yellow, 10, 'center', 'bottom');

                                // Displacement indicator
                                if (Math.abs(x) > 0.1) {
                                    ctx.strokeStyle = viz.colors.white + '88';
                                    ctx.lineWidth = 1;
                                    var arrowY = -0.35;
                                    var aS1 = viz.toScreen(0, arrowY);
                                    var aS2 = viz.toScreen(x, arrowY);
                                    ctx.beginPath();
                                    ctx.moveTo(aS1[0], aS1[1]);
                                    ctx.lineTo(aS2[0], aS2[1]);
                                    ctx.stroke();
                                    viz.drawText('x', x / 2, arrowY - 0.2, viz.colors.white, 11);
                                }

                                // Velocity arrow
                                if (Math.abs(v) > 0.1) {
                                    viz.drawVector(x, 0.5, v / omega0 * 0.5, 0, viz.colors.cyan, 'v');
                                }

                                // Energy bars (right side)
                                viz.drawEnergyBars(w * 0.68, h * 0.82, 32, h * 0.55, KE, PE, E);

                                // Numeric readout
                                var rx = w * 0.68;
                                var ry = 20;
                                viz.screenText('x = ' + x.toFixed(2) + ' m', rx, ry, viz.colors.white, 12, 'left');
                                viz.screenText('v = ' + v.toFixed(2) + ' m/s', rx, ry + 18, viz.colors.cyan, 12, 'left');
                                viz.screenText('\u03C9\u2080 = ' + omega0.toFixed(2) + ' rad/s', rx, ry + 36, viz.colors.teal, 12, 'left');
                                viz.screenText('T = ' + (2 * Math.PI / omega0).toFixed(2) + ' s', rx, ry + 54, viz.colors.teal, 12, 'left');

                                if (paused) {
                                    viz.screenText('PAUSED', w / 2, h - 10, viz.colors.yellow, 12, 'center');
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A mass on a spring oscillates with \\(A = 0.2\\) m, \\(\\omega_0 = 5\\) rad/s, \\(m = 0.5\\) kg. At what displacement is the speed half its maximum value? What fraction of the total energy is kinetic at that point?',
                        hint: 'Use \\(v = \\omega_0\\sqrt{A^2 - x^2}\\) and set \\(v = v_{\\max}/2 = A\\omega_0/2\\). For the energy fraction, compute \\(K/E\\).',
                        solution: '\\(A\\omega_0/2 = \\omega_0\\sqrt{A^2 - x^2}\\). Squaring: \\(A^2/4 = A^2 - x^2\\), so \\(x^2 = 3A^2/4\\), hence \\(x = A\\sqrt{3}/2 = 0.1\\sqrt{3} \\approx 0.173\\) m. Kinetic fraction: \\(K/E = v^2/(A^2\\omega_0^2) = 1/4\\). Three-quarters of the energy is potential.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Phase Space
            // ============================================================
            {
                id: 'phase-space',
                title: 'Phase Space',
                content: `
<h2>Seeing All of Dynamics at Once</h2>

<p>A powerful way to visualize SHM is the <strong>phase space portrait</strong>: plotting \\(\\dot{x}\\) (or \\(p = m\\dot{x}\\)) versus \\(x\\). Each state of the system is a point in this plane, and time evolution traces a curve (the <strong>phase trajectory</strong>).</p>

<div class="env-block definition">
<div class="env-title">Definition: Phase Space</div>
<div class="env-body">
<p>The <strong>phase space</strong> of a 1D system is the plane \\((x, \\dot{x})\\) or equivalently \\((x, p)\\). Every possible state of the system corresponds to a unique point. The equation of motion determines a <strong>flow</strong>: a vector field that tells each point where to go next.</p>
</div>
</div>

<p>For SHM with \\(x = A\\cos(\\omega_0 t + \\phi)\\) and \\(\\dot{x} = -A\\omega_0\\sin(\\omega_0 t + \\phi)\\), eliminate time:</p>

\\[\\frac{x^2}{A^2} + \\frac{\\dot{x}^2}{(A\\omega_0)^2} = \\cos^2(\\omega_0 t + \\phi) + \\sin^2(\\omega_0 t + \\phi) = 1\\]

<p>This is an <strong>ellipse</strong> in the \\((x, \\dot{x})\\) plane with semi-axes \\(A\\) (horizontal) and \\(A\\omega_0\\) (vertical).</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Phase Trajectories of SHM</div>
<div class="env-body">
<p>In the \\((x, p)\\) plane, the phase trajectory for energy \\(E\\) is the ellipse</p>
\\[\\frac{p^2}{2mE} + \\frac{kx^2}{2E} = 1\\]
<p>Different energies give concentric ellipses. The point moves clockwise (for the convention \\(\\dot{x}\\) upward, \\(x\\) rightward). The origin is a <strong>stable center</strong>.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Reading the phase portrait</div>
<div class="env-body">
<p>When \\(\\dot{x} > 0\\) (upper half-plane), the point moves to the right (\\(x\\) increasing). When \\(\\dot{x} < 0\\) (lower half-plane), it moves left. At the rightmost point (\\(x = A\\)), velocity passes through zero (turning point). The trajectory never crosses itself (determinism: each point has a unique future).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Phase space in later courses</div>
<div class="env-body">
<p>Phase space becomes central in Hamiltonian mechanics (Chapter 21), statistical mechanics, and nonlinear dynamics. The harmonic oscillator's elliptical orbits in phase space are the simplest example. Damped oscillators spiral inward; driven oscillators can produce chaos (strange attractors). This simple ellipse is the starting point for all of that.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-phase-space"></div>
`,
                visualizations: [
                    {
                        id: 'viz-phase-space',
                        title: 'Phase Space Portrait',
                        description: 'The animated point traces an ellipse in \\((x, \\dot{x})\\) space. Adjust amplitude and frequency. Multiple orbits show that higher energy gives larger ellipses. The flow is always clockwise.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 50, originX: undefined, originY: undefined });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w / 2;
                            viz.originY = h / 2;

                            var omega0 = 3.0;
                            var A = 2.0;
                            var phase = 0;
                            var showMultiple = true;
                            var trail = [];
                            var prevTime = 0;

                            VizEngine.createSlider(controls, '\u03C9\u2080', 1, 6, omega0, 0.2, function (v) { omega0 = v; trail = []; });
                            VizEngine.createSlider(controls, 'Amplitude A', 0.5, 3.0, A, 0.1, function (v) { A = v; trail = []; });
                            VizEngine.createButton(controls, 'Show orbits', function () { showMultiple = !showMultiple; });
                            VizEngine.createButton(controls, 'Reset', function () { phase = 0; trail = []; });

                            function draw(t) {
                                var dt = prevTime > 0 ? (t - prevTime) / 1000 : 0;
                                if (dt > 0.05) dt = 0.05;
                                prevTime = t;
                                phase += omega0 * dt;

                                var x = A * Math.cos(phase);
                                var xdot = -A * omega0 * Math.sin(phase);

                                // Rescale xdot for display so ellipse is visible
                                var dispScale = 1.0 / omega0;
                                var xdotDisp = xdot * dispScale;

                                trail.push([x, xdotDisp]);
                                if (trail.length > 800) trail.shift();

                                viz.clear();
                                viz.drawGrid(1);
                                viz.drawAxes('x', 'dx/dt');

                                // Draw multiple energy ellipses
                                if (showMultiple) {
                                    var amplitudes = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0];
                                    for (var ai = 0; ai < amplitudes.length; ai++) {
                                        var aa = amplitudes[ai];
                                        var alpha = (ai === Math.round((A - 0.5) / 0.5)) ? 0.6 : 0.15;
                                        ctx.strokeStyle = 'rgba(88, 166, 255, ' + alpha + ')';
                                        ctx.lineWidth = 1;
                                        ctx.beginPath();
                                        for (var ang = 0; ang <= 360; ang += 2) {
                                            var rad = ang * Math.PI / 180;
                                            var ex = aa * Math.cos(rad);
                                            var ey = -aa * Math.sin(rad); // already scaled by 1/omega0
                                            var sp = viz.toScreen(ex, ey);
                                            if (ang === 0) ctx.moveTo(sp[0], sp[1]);
                                            else ctx.lineTo(sp[0], sp[1]);
                                        }
                                        ctx.closePath();
                                        ctx.stroke();
                                    }
                                }

                                // Draw the active orbit ellipse
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var ang2 = 0; ang2 <= 360; ang2 += 2) {
                                    var rad2 = ang2 * Math.PI / 180;
                                    var ex2 = A * Math.cos(rad2);
                                    var ey2 = -A * Math.sin(rad2);
                                    var sp2 = viz.toScreen(ex2, ey2);
                                    if (ang2 === 0) ctx.moveTo(sp2[0], sp2[1]);
                                    else ctx.lineTo(sp2[0], sp2[1]);
                                }
                                ctx.closePath();
                                ctx.stroke();

                                // Draw trail
                                viz.drawTrail(trail, viz.colors.gold, 0.6);

                                // Draw current point
                                viz.drawBall(x, xdotDisp, 0.15, viz.colors.orange, 2);

                                // Arrow showing flow direction
                                var flowLen = 0.3;
                                var fx = -A * omega0 * Math.sin(phase) * dispScale * flowLen;
                                var fy = -A * omega0 * Math.cos(phase) * dispScale * flowLen;
                                // Tangent to ellipse
                                var tanX = -Math.sin(phase);
                                var tanY = -Math.cos(phase);
                                viz.drawVector(x, xdotDisp, tanX * 0.5, tanY * 0.5, viz.colors.yellow, '', 1.5, 7);

                                // Position and velocity readout
                                viz.screenText('x = ' + x.toFixed(2), 14, 20, viz.colors.white, 12, 'left');
                                viz.screenText('dx/dt = ' + xdot.toFixed(2), 14, 38, viz.colors.cyan, 12, 'left');
                                viz.screenText('E = \u00BDkA\u00B2 = ' + (0.5 * omega0 * omega0 * A * A).toFixed(2), 14, 56, viz.colors.green, 12, 'left');

                                // Labels
                                viz.screenText('Phase space (x, dx/dt)', w / 2, h - 10, viz.colors.text, 11, 'center');
                                viz.screenText('Clockwise flow', w - 14, h - 10, viz.colors.yellow, 10, 'right');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'In the \\((x, p)\\) phase plane for a harmonic oscillator, what is the area enclosed by the trajectory with energy \\(E\\)? Express your answer in terms of \\(E\\) and \\(\\omega_0\\). (This quantity appears in quantum mechanics as the adiabatic invariant.)',
                        hint: 'The ellipse has semi-axes \\(a = \\sqrt{2E/k}\\) in \\(x\\) and \\(b = \\sqrt{2mE}\\) in \\(p\\). Area of an ellipse: \\(\\pi ab\\).',
                        solution: 'Semi-axis in \\(x\\): \\(A = \\sqrt{2E/k}\\). Semi-axis in \\(p\\): \\(p_{\\max} = m\\omega_0 A = \\sqrt{2mE}\\). Area \\(= \\pi A p_{\\max} = \\pi \\sqrt{2E/k}\\sqrt{2mE} = 2\\pi E \\sqrt{m/k} = 2\\pi E / \\omega_0\\). In quantum mechanics, this area is quantized: \\(2\\pi E/\\omega_0 = nh\\) (Bohr-Sommerfeld), giving \\(E_n = n\\hbar\\omega_0\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: The Pendulum
            // ============================================================
            {
                id: 'pendulum',
                title: 'The Pendulum',
                content: `
<h2>The Simple Pendulum and Beyond</h2>

<div class="env-block definition">
<div class="env-title">Definition: Simple Pendulum</div>
<div class="env-body">
<p>A <strong>simple pendulum</strong> consists of a point mass \\(m\\) suspended by a massless, inextensible string of length \\(\\ell\\). The equation of motion is</p>
\\[\\ddot{\\theta} + \\frac{g}{\\ell}\\sin\\theta = 0\\]
<p>For small angles (\\(\\sin\\theta \\approx \\theta\\)), this reduces to SHM with \\(\\omega_0 = \\sqrt{g/\\ell}\\), giving</p>
\\[T = 2\\pi\\sqrt{\\frac{\\ell}{g}}\\]
</div>
</div>

<p>The small-angle period is independent of amplitude and mass. This is why pendulum clocks work: slight variations in amplitude do not (to first order) affect the timekeeping.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Exact Period of a Simple Pendulum</div>
<div class="env-body">
<p>For amplitude \\(\\theta_0\\), the exact period is</p>
\\[T = 4\\sqrt{\\frac{\\ell}{g}}\\int_0^{\\pi/2} \\frac{d\\phi}{\\sqrt{1 - \\sin^2(\\theta_0/2)\\sin^2\\phi}} = \\frac{2\\pi}{\\omega_0}K\\bigl(\\sin(\\theta_0/2)\\bigr)\\]
<p>where \\(K(k)\\) is the complete elliptic integral of the first kind. For small \\(\\theta_0\\), expanding:</p>
\\[T \\approx 2\\pi\\sqrt{\\frac{\\ell}{g}}\\left(1 + \\frac{\\theta_0^2}{16} + \\frac{11\\theta_0^4}{3072} + \\cdots\\right)\\]
<p>At \\(\\theta_0 = 90^\\circ\\): \\(T/T_0 = K(1/\\sqrt{2}) \\cdot 2/\\pi \\approx 1.180\\), an 18% increase over the small-angle period.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">How good is the small-angle approximation?</div>
<div class="env-body">
<p>At \\(\\theta_0 = 10^\\circ\\): error \\(< 0.05\\%\\). At \\(\\theta_0 = 30^\\circ\\): error \\(\\approx 0.5\\%\\). At \\(\\theta_0 = 60^\\circ\\): error \\(\\approx 4\\%\\). At \\(\\theta_0 = 90^\\circ\\): error \\(\\approx 18\\%\\). For laboratory work, the small-angle formula is excellent up to about \\(20^\\circ\\).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-pendulum"></div>
`,
                visualizations: [
                    {
                        id: 'viz-pendulum',
                        title: 'Pendulum: Exact vs. Small-Angle Approximation',
                        description: 'Two pendulums start from the same initial angle. The teal pendulum uses the exact equation (\\(\\ddot{\\theta} + (g/\\ell)\\sin\\theta = 0\\), integrated with RK4). The red pendulum uses the small-angle approximation (\\(\\sin\\theta \\approx \\theta\\)). At large angles they desynchronize, showing the small-angle error.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var theta0 = 30; // degrees
                            var ell = 150; // pixels
                            var g_over_l = 9.8 / 1.5; // effective g/l
                            var pivotX = w / 2;
                            var pivotY = 60;

                            // Exact: state = [theta, theta_dot]
                            var stateExact = [theta0 * Math.PI / 180, 0];
                            // Small angle: state = [theta, theta_dot]
                            var stateSmall = [theta0 * Math.PI / 180, 0];

                            var prevTime = 0;
                            var simTime = 0;
                            var paused = false;

                            VizEngine.createSlider(controls, 'Initial angle (\u00B0)', 5, 170, theta0, 1, function (v) {
                                theta0 = v;
                                stateExact = [theta0 * Math.PI / 180, 0];
                                stateSmall = [theta0 * Math.PI / 180, 0];
                                simTime = 0;
                            });
                            VizEngine.createButton(controls, 'Reset', function () {
                                stateExact = [theta0 * Math.PI / 180, 0];
                                stateSmall = [theta0 * Math.PI / 180, 0];
                                simTime = 0;
                            });
                            VizEngine.createButton(controls, 'Pause/Play', function () { paused = !paused; });

                            function derivsExact(s) {
                                return [s[1], -g_over_l * Math.sin(s[0])];
                            }

                            function derivsSmall(s) {
                                return [s[1], -g_over_l * s[0]];
                            }

                            function draw(t) {
                                var dt = prevTime > 0 ? (t - prevTime) / 1000 : 0;
                                if (dt > 0.05) dt = 0.05;
                                prevTime = t;

                                if (!paused && dt > 0) {
                                    var steps = 10;
                                    var subdt = dt / steps;
                                    for (var si = 0; si < steps; si++) {
                                        stateExact = VizEngine.rk4(stateExact, simTime, subdt, derivsExact);
                                        stateSmall = VizEngine.rk4(stateSmall, simTime, subdt, derivsSmall);
                                        simTime += subdt;
                                    }
                                }

                                viz.clear();

                                // Draw pivot
                                ctx.fillStyle = viz.colors.axis;
                                ctx.beginPath();
                                ctx.arc(pivotX, pivotY, 5, 0, Math.PI * 2);
                                ctx.fill();

                                // Exact pendulum (teal)
                                var thE = stateExact[0];
                                var bxE = pivotX + ell * Math.sin(thE);
                                var byE = pivotY + ell * Math.cos(thE);

                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(pivotX, pivotY);
                                ctx.lineTo(bxE, byE);
                                ctx.stroke();

                                ctx.fillStyle = viz.colors.teal;
                                ctx.shadowColor = viz.colors.teal;
                                ctx.shadowBlur = 8;
                                ctx.beginPath();
                                ctx.arc(bxE, byE, 14, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.shadowBlur = 0;

                                // Small-angle pendulum (red)
                                var thS = stateSmall[0];
                                var bxS = pivotX + ell * Math.sin(thS);
                                var byS = pivotY + ell * Math.cos(thS);

                                ctx.strokeStyle = viz.colors.red + '88';
                                ctx.lineWidth = 2;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath();
                                ctx.moveTo(pivotX, pivotY);
                                ctx.lineTo(bxS, byS);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                ctx.fillStyle = viz.colors.red + 'aa';
                                ctx.beginPath();
                                ctx.arc(bxS, byS, 10, 0, Math.PI * 2);
                                ctx.fill();

                                // Vertical reference
                                ctx.strokeStyle = viz.colors.axis + '44';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.moveTo(pivotX, pivotY);
                                ctx.lineTo(pivotX, pivotY + ell + 30);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Angle arc
                                if (Math.abs(thE) > 0.02) {
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    var arcR = 40;
                                    if (thE > 0) {
                                        ctx.arc(pivotX, pivotY, arcR, Math.PI / 2 - thE, Math.PI / 2);
                                    } else {
                                        ctx.arc(pivotX, pivotY, arcR, Math.PI / 2, Math.PI / 2 - thE);
                                    }
                                    ctx.stroke();
                                }

                                // Legend
                                viz.screenText('Exact (RK4)', 20, h - 55, viz.colors.teal, 13, 'left');
                                viz.screenText('Small-angle (\u03B8 \u2248 sin\u03B8)', 20, h - 35, viz.colors.red, 13, 'left');

                                // Info
                                var T0 = 2 * Math.PI / Math.sqrt(g_over_l);
                                var thDeg = thE * 180 / Math.PI;
                                viz.screenText('\u03B8\u2080 = ' + theta0 + '\u00B0', w - 20, 25, viz.colors.white, 13, 'right');
                                viz.screenText('T\u2080 = ' + T0.toFixed(3) + ' s (small-angle)', w - 20, 45, viz.colors.text, 11, 'right');

                                var thRadInit = theta0 * Math.PI / 180;
                                var correction = 1 + thRadInit * thRadInit / 16;
                                viz.screenText('T \u2248 T\u2080(1 + \u03B8\u2080\u00B2/16) = ' + (T0 * correction).toFixed(3) + ' s', w - 20, 65, viz.colors.text, 11, 'right');

                                // Phase difference
                                var phaseDiff = Math.abs(thE - thS) * 180 / Math.PI;
                                viz.screenText('Phase difference: ' + phaseDiff.toFixed(1) + '\u00B0', w / 2, h - 12, viz.colors.yellow, 12, 'center');
                                viz.screenText('t = ' + simTime.toFixed(1) + ' s', w - 20, 85, viz.colors.text, 11, 'right');

                                if (paused) {
                                    viz.screenText('PAUSED', w / 2, pivotY - 20, viz.colors.yellow, 14, 'center');
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A pendulum clock keeps perfect time at sea level where \\(g = 9.80\\) m/s\\(^2\\). It is taken to a high altitude where \\(g = 9.78\\) m/s\\(^2\\). By how many seconds per day does it lose?',
                        hint: 'The period \\(T \\propto 1/\\sqrt{g}\\). Compute \\(\\Delta T / T \\approx -\\frac{1}{2}\\Delta g / g\\) and multiply by the number of seconds in a day (86400).',
                        solution: '\\(\\Delta T / T \\approx -(1/2)(\\Delta g / g) = -(1/2)(-0.02/9.80) = 0.00102\\). The clock runs slower (longer period), so it loses time. Seconds lost per day: \\(0.00102 \\times 86400 \\approx 88\\) seconds.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Physical Pendulum
            // ============================================================
            {
                id: 'physical-pendulum',
                title: 'The Physical Pendulum',
                content: `
<h2>A Real Pendulum Has Extent</h2>

<p>A <strong>physical (compound) pendulum</strong> is any rigid body that swings about a fixed horizontal axis under gravity. Unlike the simple pendulum (a point mass on a string), a physical pendulum has distributed mass, so its moment of inertia matters.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Period of a Physical Pendulum</div>
<div class="env-body">
<p>A rigid body of mass \\(M\\), with center of mass at distance \\(d\\) from the pivot, and moment of inertia \\(I_p\\) about the pivot, oscillates (for small angles) with period</p>
\\[T = 2\\pi\\sqrt{\\frac{I_p}{Mgd}}\\]
<p>Using the parallel axis theorem (\\(I_p = I_{\\text{cm}} + Md^2\\)):</p>
\\[T = 2\\pi\\sqrt{\\frac{I_{\\text{cm}} + Md^2}{Mgd}} = 2\\pi\\sqrt{\\frac{k^2 + d^2}{gd}}\\]
<p>where \\(k = \\sqrt{I_{\\text{cm}}/M}\\) is the radius of gyration about the CM.</p>
</div>
</div>

<p><strong>Derivation.</strong> The torque about the pivot is \\(\\tau = -Mgd\\sin\\theta \\approx -Mgd\\,\\theta\\) (for small \\(\\theta\\)). Newton's second law for rotation: \\(I_p \\ddot{\\theta} = -Mgd\\,\\theta\\), which gives SHM with \\(\\omega_0^2 = Mgd/I_p\\). \\(\\square\\)</p>

<div class="env-block definition">
<div class="env-title">Definition: Equivalent Simple Pendulum Length</div>
<div class="env-body">
<p>The physical pendulum has the same period as a simple pendulum of length</p>
\\[\\ell_{\\text{eq}} = \\frac{I_p}{Md} = \\frac{k^2 + d^2}{d} = d + \\frac{k^2}{d}\\]
<p>Since \\(k^2/d > 0\\), we always have \\(\\ell_{\\text{eq}} > d\\). The equivalent length exceeds the pivot-to-CM distance.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: Minimum Period</div>
<div class="env-body">
<p>As the pivot distance \\(d\\) varies (moving the pivot along a line through the CM), the period \\(T(d) = 2\\pi\\sqrt{(k^2 + d^2)/(gd)}\\) has a minimum at \\(d = k\\) (pivot distance equals the radius of gyration). The minimum period is</p>
\\[T_{\\min} = 2\\pi\\sqrt{\\frac{2k}{g}}\\]
</div>
</div>

<p><strong>Proof.</strong> Minimize \\(f(d) = (k^2 + d^2)/d = k^2/d + d\\). Setting \\(f'(d) = -k^2/d^2 + 1 = 0\\) gives \\(d = k\\). Then \\(f(k) = 2k\\). \\(\\square\\)</p>

<div class="env-block example">
<div class="env-title">Example: Uniform Rod Physical Pendulum</div>
<div class="env-body">
<p>A uniform rod of length \\(L\\) pivoted at one end. Here \\(d = L/2\\), \\(I_{\\text{cm}} = ML^2/12\\), so \\(I_p = ML^2/12 + M(L/2)^2 = ML^2/3\\).</p>
\\[T = 2\\pi\\sqrt{\\frac{ML^2/3}{Mg(L/2)}} = 2\\pi\\sqrt{\\frac{2L}{3g}}\\]
<p>The equivalent simple pendulum length is \\(\\ell_{\\text{eq}} = 2L/3\\). A rod of length 1 m has the same period as a simple pendulum of length 0.667 m.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Center of Oscillation</div>
<div class="env-body">
<p>The <strong>center of oscillation</strong> is the point at distance \\(\\ell_{\\text{eq}}\\) from the pivot along the line through the CM. If you pivot the body at the center of oscillation instead, the period is the same. This reciprocity is the basis of the Kater reversible pendulum, used historically for precise measurements of \\(g\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A thin uniform hoop of mass \\(M\\) and radius \\(R\\) is hung on a nail at its rim and allowed to oscillate. Find its period for small oscillations. What is the equivalent simple pendulum length?',
                        hint: 'Find \\(I_p\\) about the nail using the parallel axis theorem. The CM is at the center of the hoop, so \\(d = R\\). Use \\(I_{\\text{cm}} = MR^2\\) for a hoop.',
                        solution: '\\(I_p = MR^2 + MR^2 = 2MR^2\\). \\(T = 2\\pi\\sqrt{\\frac{2MR^2}{MgR}} = 2\\pi\\sqrt{\\frac{2R}{g}}\\). Equivalent length: \\(\\ell_{\\text{eq}} = I_p/(Md) = 2MR^2/(MR) = 2R\\). The hoop oscillates like a simple pendulum of length \\(2R\\) (the diameter).'
                    }
                ]
            }
        ]
    });
})();
