// === Chapter 18: Central Force & Effective Potential ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch18',
        number: 18,
        title: 'Central Force & Effective Potential',
        subtitle: 'Reducing two-body motion to one dimension through angular momentum conservation',
        file: 'ch18-central',

        sections: [
            // ============================================================
            // Section 0: Reduction to One-Body Problem
            // ============================================================
            {
                id: 'reduction',
                title: 'Reduction to One-Body Problem',
                content: `
<h2>From Two Bodies to One</h2>

<p>Consider two particles interacting through a central force \\(\\mathbf{F} = f(r)\\hat{\\mathbf{r}}\\), where \\(r = |\\mathbf{r}_1 - \\mathbf{r}_2|\\). The center of mass \\(\\mathbf{R} = (m_1\\mathbf{r}_1 + m_2\\mathbf{r}_2)/(m_1 + m_2)\\) moves uniformly (or is at rest). The relative coordinate \\(\\mathbf{r} = \\mathbf{r}_1 - \\mathbf{r}_2\\) satisfies:</p>

\\[\\mu\\ddot{\\mathbf{r}} = f(r)\\hat{\\mathbf{r}}\\]

<p>where \\(\\mu = m_1 m_2/(m_1 + m_2)\\) is the reduced mass.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Reduction to Equivalent One-Body Problem</div>
<div class="env-body">
<p>A two-body central force problem is mathematically equivalent to a single particle of mass \\(\\mu\\) moving in a fixed central potential \\(U(r)\\) (where \\(f(r) = -dU/dr\\)). The center-of-mass motion decouples completely.</p>
<p>This reduction works because: (1) the center of mass is unaccelerated (no external forces), and (2) the internal force depends only on the separation \\(r\\), not on the orientation or the individual positions.</p>
</div>
</div>

<h3>Conservation Laws</h3>

<p>Two conservation laws constrain the motion:</p>

<p><strong>Angular momentum:</strong> Since \\(\\mathbf{F}\\) is parallel to \\(\\hat{\\mathbf{r}}\\), the torque vanishes and \\(\\mathbf{L} = \\mu\\mathbf{r} \\times \\dot{\\mathbf{r}}\\) is conserved. This has two consequences:</p>

<ol>
<li>The motion is confined to a plane (perpendicular to \\(\\mathbf{L}\\)).</li>
<li>The magnitude \\(L = \\mu r^2 \\dot{\\theta}\\) is constant (Kepler's second law in disguise).</li>
</ol>

<p><strong>Energy:</strong></p>
\\[E = \\frac{1}{2}\\mu\\dot{r}^2 + \\frac{1}{2}\\mu r^2\\dot{\\theta}^2 + U(r) = \\frac{1}{2}\\mu\\dot{r}^2 + \\frac{L^2}{2\\mu r^2} + U(r)\\]

<div class="env-block definition">
<div class="env-title">Definition: Effective Potential</div>
<div class="env-body">
<p>Combining the angular momentum barrier with the actual potential:</p>
\\[U_{\\text{eff}}(r) = U(r) + \\frac{L^2}{2\\mu r^2}\\]
<p>The energy equation becomes \\(E = \\frac{1}{2}\\mu\\dot{r}^2 + U_{\\text{eff}}(r)\\), which is formally identical to one-dimensional motion. The term \\(L^2/(2\\mu r^2)\\) is the <strong>centrifugal barrier</strong>: it repels the particle from the origin and arises from the conservation of angular momentum, not from a physical force.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">The centrifugal barrier is not a force in the inertial frame</div>
<div class="env-body">
<p>The centrifugal term appears when we reduce the 2D problem to 1D radial motion. It accounts for the kinetic energy stored in the angular motion. Calling it a "centrifugal force" is valid only in the rotating frame; in the inertial frame, it is a consequence of angular momentum conservation, not a separate force.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Two stars of masses \\(m_1 = 2M_\\odot\\) and \\(m_2 = 3M_\\odot\\) orbit each other. Find the reduced mass in units of \\(M_\\odot\\).',
                        hint: '\\(\\mu = m_1 m_2 / (m_1 + m_2)\\).',
                        solution: '\\(\\mu = (2 \\times 3)/(2 + 3) = 6/5 = 1.2\\,M_\\odot\\).'
                    },
                    {
                        question: 'Derive the effective potential by eliminating \\(\\dot{\\theta}\\) from the energy using \\(L = \\mu r^2 \\dot{\\theta}\\).',
                        hint: 'Solve for \\(\\dot{\\theta} = L/(\\mu r^2)\\) and substitute into the kinetic energy.',
                        solution: 'The kinetic energy in polar coordinates is \\(T = \\frac{1}{2}\\mu(\\dot{r}^2 + r^2\\dot{\\theta}^2)\\). Substituting \\(\\dot{\\theta} = L/(\\mu r^2)\\): \\(T = \\frac{1}{2}\\mu\\dot{r}^2 + \\frac{1}{2}\\mu r^2 \\cdot L^2/(\\mu^2 r^4) = \\frac{1}{2}\\mu\\dot{r}^2 + L^2/(2\\mu r^2)\\). The total energy is \\(E = \\frac{1}{2}\\mu\\dot{r}^2 + L^2/(2\\mu r^2) + U(r) = \\frac{1}{2}\\mu\\dot{r}^2 + U_{\\text{eff}}(r)\\).'
                    }
                ]
            },

            // ============================================================
            // Section 1: Effective Potential Analysis
            // ============================================================
            {
                id: 'effective-potential',
                title: 'Effective Potential Analysis',
                content: `
<h2>Reading the Effective Potential</h2>

<p>The radial motion satisfies \\(E = \\frac{1}{2}\\mu\\dot{r}^2 + U_{\\text{eff}}(r)\\). Since \\(\\frac{1}{2}\\mu\\dot{r}^2 \\geq 0\\), the particle can only exist where \\(E \\geq U_{\\text{eff}}(r)\\). The points where \\(E = U_{\\text{eff}}(r)\\) are the <strong>turning points</strong>, where \\(\\dot{r} = 0\\).</p>

<div class="env-block definition">
<div class="env-title">Definition: Turning Points</div>
<div class="env-body">
<p>At a turning point \\(r_t\\), the radial velocity vanishes. There are two types:</p>
<ul>
<li>\\(r_{\\min}\\) (periapsis): the closest approach. The particle bounces off the centrifugal barrier.</li>
<li>\\(r_{\\max}\\) (apoapsis): the farthest distance. The particle is pulled back by the attractive force.</li>
</ul>
<p>A <strong>bound orbit</strong> oscillates between \\(r_{\\min}\\) and \\(r_{\\max}\\). An <strong>unbound orbit</strong> has only one turning point (\\(r_{\\min}\\)); the particle comes in from infinity, reaches closest approach, and escapes.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-effective-potential"></div>

<h3>The Gravitational Case</h3>

<p>For gravity, \\(U(r) = -GMm/r\\) (writing \\(\\mu \\to m\\) for a test mass orbiting a fixed mass \\(M\\)):</p>

\\[U_{\\text{eff}}(r) = -\\frac{GMm}{r} + \\frac{L^2}{2mr^2}\\]

<p>At large \\(r\\), the \\(-1/r\\) gravity dominates, pulling the particle inward. At small \\(r\\), the \\(+1/r^2\\) centrifugal barrier dominates, pushing outward. The competition produces a minimum in \\(U_{\\text{eff}}\\) at some \\(r_0\\), which corresponds to a circular orbit.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Classification by Energy</div>
<div class="env-body">
<p>For the gravitational effective potential:</p>
<ul>
<li>\\(E < U_{\\text{eff,min}}\\): impossible (no real motion).</li>
<li>\\(E = U_{\\text{eff,min}}\\): circular orbit at \\(r = r_0\\).</li>
<li>\\(U_{\\text{eff,min}} < E < 0\\): bound elliptical orbit, oscillating between \\(r_{\\min}\\) and \\(r_{\\max}\\).</li>
<li>\\(E = 0\\): parabolic orbit (marginally unbound).</li>
<li>\\(E > 0\\): hyperbolic orbit (unbound).</li>
</ul>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">The effective potential as a valley</div>
<div class="env-body">
<p>Picture a ball rolling in the effective potential valley. The total energy \\(E\\) is a horizontal line. Where the line is above the curve, the ball can exist; where it dips below, it cannot. Turning points are where the line meets the curve. A circular orbit is a ball sitting at the bottom of the valley. An elliptical orbit is a ball oscillating back and forth in the valley. An unbound orbit is a ball rolling over the rim and escaping.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-effective-potential',
                        title: 'Effective Potential with Draggable Energy',
                        description: 'The gravitational effective potential \\(U_{\\text{eff}}(r)\\). Drag the energy line (green) to change \\(E\\). Adjust angular momentum \\(L\\) to reshape the potential. Turning points are marked where \\(E = U_{\\text{eff}}\\).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 80, originY: 200 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Parameters (dimensionless units: GMm = 1, m = 1)
                            var L = 1.0;
                            var energy = -0.2;

                            VizEngine.createSlider(controls, 'L (angular momentum)', 0.3, 3.0, L, 0.05, function (v) { L = v; });

                            function Ueff(r) {
                                if (r < 0.05) return 1e6;
                                return -1 / r + L * L / (2 * r * r);
                            }

                            // Find min of Ueff
                            function findUeffMin() {
                                // dUeff/dr = 1/r^2 - L^2/r^3 = 0 => r0 = L^2
                                var r0 = L * L;
                                return { r: r0, U: Ueff(r0) };
                            }

                            // Draggable for energy
                            var eDrag = viz.addDraggable('energy', 1, energy, viz.colors.green, 8, function (x, y) {
                                energy = y;
                                eDrag.y = energy;
                            });

                            function draw() {
                                viz.clear();

                                var minInfo = findUeffMin();
                                var Umin = minInfo.U;
                                var r0 = minInfo.r;

                                // Auto-scale
                                var rMax = Math.max(4 * r0, 5);
                                var yMin = Umin * 1.5;
                                var yMax = Math.max(-Umin * 0.5, 0.5);

                                var plotL = 80, plotR = w - 20;
                                var plotT = 30, plotB = h - 50;
                                var plotW = plotR - plotL, plotH = plotB - plotT;

                                function toPlotX(r) { return plotL + (r / rMax) * plotW; }
                                function toPlotY(u) { return plotB - ((u - yMin) / (yMax - yMin)) * plotH; }

                                // Axes
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(plotL, plotT); ctx.lineTo(plotL, plotB); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(plotL, toPlotY(0)); ctx.lineTo(plotR, toPlotY(0)); ctx.stroke();
                                viz.screenText('r', plotR - 10, toPlotY(0) + 15, viz.colors.text, 12);
                                viz.screenText('U_eff(r)', plotL + 40, plotT - 5, viz.colors.text, 12);

                                // Draw Ueff curve
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var started = false;
                                var steps = 500;
                                for (var i = 1; i <= steps; i++) {
                                    var r = 0.1 + (rMax - 0.1) * i / steps;
                                    var u = Ueff(r);
                                    if (u > yMax * 2 || u < yMin * 2) { started = false; continue; }
                                    var px = toPlotX(r), py = toPlotY(u);
                                    if (py < plotT - 10 || py > plotB + 10) { started = false; continue; }
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Draw centrifugal and gravitational parts (dashed)
                                ctx.setLineDash([4, 4]);
                                ctx.strokeStyle = viz.colors.purple; ctx.lineWidth = 1;
                                ctx.beginPath(); started = false;
                                for (var i = 1; i <= steps; i++) {
                                    var r = 0.1 + (rMax - 0.1) * i / steps;
                                    var u = L * L / (2 * r * r);
                                    if (u > yMax * 1.5) { started = false; continue; }
                                    var px = toPlotX(r), py = toPlotY(u);
                                    if (py < plotT - 5) { started = false; continue; }
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                ctx.strokeStyle = viz.colors.red; ctx.lineWidth = 1;
                                ctx.beginPath(); started = false;
                                for (var i = 1; i <= steps; i++) {
                                    var r = 0.1 + (rMax - 0.1) * i / steps;
                                    var u = -1 / r;
                                    if (u < yMin * 1.5) { started = false; continue; }
                                    var px = toPlotX(r), py = toPlotY(u);
                                    if (py > plotB + 5) { started = false; continue; }
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Energy line
                                energy = eDrag.y;
                                var epy = toPlotY(energy);
                                if (epy > plotT && epy < plotB) {
                                    ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.moveTo(plotL, epy); ctx.lineTo(plotR, epy); ctx.stroke();
                                    viz.screenText('E = ' + energy.toFixed(3), plotR - 50, epy - 10, viz.colors.green, 11);
                                }

                                // Find turning points
                                var turningPoints = [];
                                var prevSign = null;
                                for (var i = 1; i <= 1000; i++) {
                                    var r = 0.05 + (rMax - 0.05) * i / 1000;
                                    var diff = energy - Ueff(r);
                                    var sign = diff >= 0 ? 1 : -1;
                                    if (prevSign !== null && sign !== prevSign) {
                                        // Bisect to find exact crossing
                                        var rLo = r - (rMax - 0.05) / 1000, rHi = r;
                                        for (var b = 0; b < 30; b++) {
                                            var rm = (rLo + rHi) / 2;
                                            if ((energy - Ueff(rm)) * (energy - Ueff(rLo)) < 0) rHi = rm;
                                            else rLo = rm;
                                        }
                                        turningPoints.push((rLo + rHi) / 2);
                                    }
                                    prevSign = sign;
                                }

                                // Draw turning points
                                for (var tp = 0; tp < turningPoints.length; tp++) {
                                    var rtp = turningPoints[tp];
                                    var tpx = toPlotX(rtp), tpy = toPlotY(energy);
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath(); ctx.arc(tpx, tpy, 6, 0, Math.PI * 2); ctx.fill();
                                    var label = tp === 0 ? 'r_min' : 'r_max';
                                    viz.screenText(label, tpx, tpy + 16, viz.colors.orange, 11);
                                }

                                // Mark circular orbit
                                var r0px = toPlotX(r0), r0py = toPlotY(Umin);
                                if (r0px > plotL && r0px < plotR) {
                                    ctx.fillStyle = viz.colors.cyan;
                                    ctx.beginPath(); ctx.arc(r0px, r0py, 5, 0, Math.PI * 2); ctx.fill();
                                    viz.screenText('circular orbit', r0px + 10, r0py - 10, viz.colors.cyan, 10, 'left');
                                }

                                // Draw draggable handle on left edge
                                eDrag.x = -0.3;
                                var edx = plotL - 15;
                                var edy = toPlotY(energy);
                                ctx.fillStyle = viz.colors.green + '44';
                                ctx.beginPath(); ctx.arc(edx, edy, 12, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath(); ctx.arc(edx, edy, 8, 0, Math.PI * 2); ctx.fill();

                                // Legend
                                viz.screenText('U(r) = -1/r', w - 90, plotT + 15, viz.colors.red, 10);
                                viz.screenText('L\u00B2/(2mr\u00B2)', w - 90, plotT + 30, viz.colors.purple, 10);
                                viz.screenText('U_eff', w - 90, plotT + 45, viz.colors.blue, 10);

                                // Orbit type
                                var orbitType = '';
                                if (energy < Umin + 0.001 && energy > Umin - 0.001) orbitType = 'Circular';
                                else if (energy < 0 && energy > Umin) orbitType = 'Bound (elliptical)';
                                else if (Math.abs(energy) < 0.01) orbitType = 'Parabolic (marginally unbound)';
                                else if (energy > 0) orbitType = 'Unbound (hyperbolic)';
                                else if (energy < Umin) orbitType = 'Forbidden (E < U_eff,min)';
                                viz.screenText(orbitType, w / 2, h - 15, viz.colors.white, 13);
                            }

                            viz.animate(function () { draw(); });
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'For the gravitational effective potential \\(U_{\\text{eff}}(r) = -GMm/r + L^2/(2mr^2)\\), find the radius \\(r_0\\) of the circular orbit and the energy \\(E_0\\) at that orbit.',
                        hint: 'Set \\(dU_{\\text{eff}}/dr = 0\\) to find \\(r_0\\), then compute \\(U_{\\text{eff}}(r_0)\\).',
                        solution: '\\(dU_{\\text{eff}}/dr = GMm/r^2 - L^2/(mr^3) = 0\\), giving \\(r_0 = L^2/(GMm^2)\\). The energy is \\(E_0 = U_{\\text{eff}}(r_0) = -GMm \\cdot GMm^2/L^2 + L^2 \\cdot G^2M^2m^4/(2mL^4) = -G^2M^2m^3/(2L^2)\\). Alternatively, \\(E_0 = -GMm/(2r_0)\\), which is half the gravitational potential energy (the virial theorem for \\(1/r\\) potentials).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Circular Orbits and Stability
            // ============================================================
            {
                id: 'circular-stability',
                title: 'Circular Orbits & Stability',
                content: `
<h2>Conditions for Circular Orbits</h2>

<p>A circular orbit exists at a radius \\(r_0\\) where \\(U_{\\text{eff}}'(r_0) = 0\\), i.e., where the effective force vanishes. The orbit is <strong>stable</strong> if \\(r_0\\) is a minimum of \\(U_{\\text{eff}}\\) (positive second derivative), and <strong>unstable</strong> if it is a maximum.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Stability of Circular Orbits for Power-Law Forces</div>
<div class="env-body">
<p>For a central force \\(f(r) = -kr^n\\) (attractive for \\(k > 0\\)), the effective potential has a minimum (stable circular orbit) if and only if \\(n > -3\\).</p>
<p><strong>Proof:</strong> The condition \\(U_{\\text{eff}}'(r_0) = 0\\) gives the balance between the attractive force and the centrifugal term. The stability condition \\(U_{\\text{eff}}''(r_0) > 0\\) requires:</p>
\\[U_{\\text{eff}}''(r_0) = -f'(r_0) + \\frac{3L^2}{\\mu r_0^4} > 0\\]
<p>For \\(f = -kr^n\\), this becomes \\(knr_0^{n-1} + 3L^2/(\\mu r_0^4) > 0\\). Using the circular orbit condition to eliminate \\(L^2\\):</p>
\\[n + 3 > 0 \\implies n > -3\\]
<p>Gravity (\\(n = -2\\)) satisfies this: circular orbits are stable. The inverse-cube force (\\(n = -3\\)) is marginal: circular orbits exist but are neutrally unstable.</p>
</div>
</div>

<h3>Oscillations About Circular Orbits</h3>

<p>For a stable circular orbit, small radial perturbations \\(\\rho = r - r_0\\) oscillate at frequency:</p>

\\[\\omega_r = \\sqrt{\\frac{U_{\\text{eff}}''(r_0)}{\\mu}}\\]

<p>The orbit simultaneously precesses at the angular frequency \\(\\omega_\\theta = L/(\\mu r_0^2)\\). The orbit closes (returns to the same point) only if \\(\\omega_r/\\omega_\\theta\\) is rational.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Bertrand's Theorem (Statement)</div>
<div class="env-body">
<p>The only central force laws for which <em>all</em> bound orbits are closed are:</p>
<ol>
<li>The inverse-square force: \\(f \\propto -1/r^2\\) (gravity, Coulomb).</li>
<li>The linear (Hooke) force: \\(f \\propto -r\\) (isotropic harmonic oscillator).</li>
</ol>
<p>For any other power law, generic orbits precess and do not close. This is a remarkable result: among the infinite family of power-law central forces, only two produce universally closed orbits.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Precession as a diagnostic of the force law</div>
<div class="env-body">
<p>If \\(\\omega_r/\\omega_\\theta\\) is irrational, the orbit never exactly repeats; it fills an annular region between \\(r_{\\min}\\) and \\(r_{\\max}\\). The rate of precession measures the deviation of the force law from \\(1/r^2\\) or \\(-r\\). Mercury's perihelion precession (43''/century beyond Newtonian predictions) was the first test of general relativity: the correction to the \\(1/r^2\\) law from GR produces a slow precession.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Radial oscillation frequency for gravity</div>
<div class="env-body">
<p>For \\(U_{\\text{eff}} = -GMm/r + L^2/(2mr^2)\\): \\(U_{\\text{eff}}'' = -2GMm/r^3 + 3L^2/(mr^4)\\). At \\(r_0 = L^2/(GMm^2)\\): \\(U_{\\text{eff}}''(r_0) = GMm/r_0^3\\). So \\(\\omega_r = \\sqrt{GMm/(mr_0^3)} = \\sqrt{GM/r_0^3}\\). But \\(\\omega_\\theta = L/(mr_0^2) = \\sqrt{GM/r_0^3}\\) as well. Hence \\(\\omega_r = \\omega_\\theta\\): the radial and angular periods are equal, so the orbit closes after one revolution. This is why Kepler orbits are closed ellipses.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'For the force \\(f(r) = -k/r^3\\) (inverse-cube), show that a circular orbit exists but is unstable.',
                        hint: 'Find the effective potential, set its derivative to zero for the circular orbit radius, then check the sign of the second derivative.',
                        solution: 'The potential is \\(U(r) = -k/(2r^2)\\). The effective potential: \\(U_{\\text{eff}} = -k/(2r^2) + L^2/(2\\mu r^2) = (L^2/\\mu - k)/(2r^2)\\). For \\(L^2/\\mu > k\\), \\(U_{\\text{eff}}\\) is purely repulsive (no orbit). For \\(L^2/\\mu < k\\), \\(U_{\\text{eff}} \\propto -1/r^2\\), which has no minimum: it goes to \\(-\\infty\\) as \\(r \\to 0\\). At the critical value \\(L^2/\\mu = k\\), \\(U_{\\text{eff}} = 0\\). More carefully: using \\(n = -3\\), the stability condition requires \\(n + 3 > 0\\), i.e., \\(0 > 0\\), which fails. The orbit is neutrally unstable.'
                    },
                    {
                        question: 'For the isotropic harmonic oscillator \\(f(r) = -kr\\), find \\(\\omega_r/\\omega_\\theta\\) and verify that orbits close.',
                        hint: 'The effective potential is \\(U_{\\text{eff}} = \\frac{1}{2}kr^2 + L^2/(2\\mu r^2)\\). Find the circular orbit, then compute both frequencies.',
                        solution: '\\(U_{\\text{eff}}\\prime = kr - L^2/(\\mu r^3) = 0\\) gives \\(r_0^4 = L^2/(\\mu k)\\). \\(U_{\\text{eff}}\\prime\\prime = k + 3L^2/(\\mu r_0^4) = k + 3k = 4k\\). So \\(\\omega_r = \\sqrt{4k/\\mu} = 2\\sqrt{k/\\mu}\\). The angular frequency: \\(\\omega_\\theta = L/(\\mu r_0^2) = \\sqrt{k/\\mu}\\) (using \\(L^2 = \\mu k r_0^4\\)). Therefore \\(\\omega_r/\\omega_\\theta = 2\\): the orbit closes after half a revolution (it is an ellipse centered at the origin, not at a focus).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Orbit Equation and Turning Points
            // ============================================================
            {
                id: 'orbit-equation',
                title: 'Orbit Equation & Turning Points',
                content: `
<h2>The Orbit Equation</h2>

<p>Rather than finding \\(r(t)\\) and \\(\\theta(t)\\) separately, we can obtain the orbit shape \\(r(\\theta)\\) directly. Using \\(\\dot{\\theta} = L/(\\mu r^2)\\), we change variables from \\(t\\) to \\(\\theta\\):</p>

\\[\\frac{dr}{d\\theta} = \\frac{\\dot{r}}{\\dot{\\theta}} = \\frac{\\mu r^2}{L}\\dot{r}\\]

<p>Introducing the Binet substitution \\(u = 1/r\\):</p>

\\[\\frac{du}{d\\theta} = -\\frac{1}{r^2}\\frac{dr}{d\\theta} = -\\frac{\\mu}{L}\\dot{r}\\]

<div class="env-block theorem">
<div class="env-title">Theorem: Binet's Equation</div>
<div class="env-body">
<p>The orbit equation for any central force is:</p>
\\[\\frac{d^2u}{d\\theta^2} + u = -\\frac{\\mu}{L^2 u^2} f(1/u)\\]
<p>This is a second-order ODE for \\(u(\\theta)\\), giving the orbit shape directly without reference to time. For the inverse-square force \\(f = -GMm\\mu u^2\\):</p>
\\[\\frac{d^2u}{d\\theta^2} + u = \\frac{GM\\mu^2}{L^2}\\]
<p>This is a shifted harmonic oscillator equation with the general solution:</p>
\\[u(\\theta) = \\frac{GM\\mu^2}{L^2}(1 + e\\cos(\\theta - \\theta_0))\\]
<p>or equivalently \\(r(\\theta) = p/(1 + e\\cos\\theta)\\), where \\(p = L^2/(GM\\mu^2)\\) is the semi-latus rectum and \\(e\\) is the eccentricity.</p>
</div>
</div>

<h3>Turning Points from the Orbit Equation</h3>

<p>The turning points (where \\(\\dot{r} = 0\\), i.e., \\(du/d\\theta = 0\\)) occur at the extrema of \\(u(\\theta)\\):</p>

\\[r_{\\min} = \\frac{p}{1+e}, \\qquad r_{\\max} = \\frac{p}{1-e} \\quad (e < 1)\\]

<div class="viz-placeholder" data-viz="viz-orbit-trajectory"></div>

<div class="env-block remark">
<div class="env-title">Eccentricity and energy</div>
<div class="env-body">
<p>The eccentricity is determined by the energy:</p>
\\[e = \\sqrt{1 + \\frac{2EL^2}{G^2M^2\\mu^3}}\\]
<p>The orbit type is classified by \\(e\\): circle (\\(e=0\\)), ellipse (\\(0 < e < 1\\)), parabola (\\(e=1\\)), hyperbola (\\(e>1\\)). The eccentricity smoothly interpolates between bound and unbound orbits.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Earth's orbit</div>
<div class="env-body">
<p>Earth's orbital eccentricity is \\(e \\approx 0.0167\\). Its perihelion distance is \\(r_{\\min} = a(1-e) \\approx 1.471 \\times 10^{11}\\) m and its aphelion distance is \\(r_{\\max} = a(1+e) \\approx 1.521 \\times 10^{11}\\) m, where \\(a = 1.496 \\times 10^{11}\\) m is the semi-major axis. The orbit is nearly circular: \\(r_{\\max}/r_{\\min} = 1.034\\).</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-orbit-trajectory',
                        title: '2D Orbit alongside 1D Effective Potential',
                        description: 'Left: the particle trajectory in the orbital plane. Right: the effective potential, with the current radius and energy marked. Adjust \\(E\\) and \\(L\\) to see different orbit types.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Dimensionless units: GM*mu = 1, mu = 1
                            var L = 1.0;
                            var E = -0.3;
                            var time = 0;
                            var prevTs = null;

                            VizEngine.createSlider(controls, 'L', 0.4, 2.5, L, 0.05, function (v) { L = v; time = 0; trail = []; state = initState(); });
                            VizEngine.createSlider(controls, 'E', -0.8, 0.5, E, 0.01, function (v) { E = v; time = 0; trail = []; state = initState(); });
                            VizEngine.createButton(controls, 'Reset', function () { time = 0; trail = []; state = initState(); });

                            var trail = [];
                            var maxTrail = 2000;

                            function initState() {
                                // Start at periapsis (dr/dt = 0)
                                var p = L * L; // semi-latus rectum in these units
                                var disc = 1 + 2 * E * L * L;
                                if (disc < 0) disc = 0;
                                var e = Math.sqrt(disc);
                                var rMin = p / (1 + e);
                                if (rMin < 0.1) rMin = 0.1;
                                // v_theta at periapsis
                                var vth = L / rMin;
                                return [rMin, 0, 0, vth]; // [r, theta, dr/dt, dtheta/dt]
                            }

                            var state = initState();

                            function derivs(s) {
                                var r = s[0], th = s[1], vr = s[2], vth = s[3];
                                if (r < 0.05) r = 0.05;
                                var ar = -1 / (r * r) + L * L / (r * r * r);
                                // Actually use: mu*r*dtheta/dt = L, so dtheta/dt = L/r^2
                                // d^2r/dt^2 = r*(dtheta/dt)^2 - GM/r^2 = L^2/r^3 - 1/r^2
                                return [vr, L / (r * r), ar, 0];
                            }

                            function draw(ts) {
                                if (prevTs === null) prevTs = ts;
                                var dt = Math.min((ts - prevTs) / 1000, 0.03);
                                prevTs = ts;

                                // Integrate
                                var substeps = 20;
                                var dts = dt * 2 / substeps;
                                for (var s = 0; s < substeps; s++) {
                                    state = VizEngine.rk4(state, time, dts, derivs);
                                    time += dts;
                                    if (state[0] < 0.05) { state[0] = 0.05; state[2] = Math.abs(state[2]); }
                                    if (state[0] > 20) { state[0] = 20; state[2] = -Math.abs(state[2]); }
                                    var x = state[0] * Math.cos(state[1]);
                                    var y = state[0] * Math.sin(state[1]);
                                    trail.push([x, y]);
                                    if (trail.length > maxTrail) trail.shift();
                                }

                                viz.clear();

                                // === LEFT PANEL: Orbit ===
                                var orbitCx = w * 0.3, orbitCy = h * 0.5;
                                var orbitScale = Math.min(w * 0.25, h * 0.4) / 4;

                                // Draw trail
                                if (trail.length > 1) {
                                    for (var i = 1; i < trail.length; i++) {
                                        var alpha = i / trail.length * 0.7;
                                        var lw = 0.5 + (i / trail.length) * 2;
                                        ctx.strokeStyle = viz.colors.blue; ctx.globalAlpha = alpha; ctx.lineWidth = lw;
                                        ctx.beginPath();
                                        ctx.moveTo(orbitCx + trail[i - 1][0] * orbitScale, orbitCy - trail[i - 1][1] * orbitScale);
                                        ctx.lineTo(orbitCx + trail[i][0] * orbitScale, orbitCy - trail[i][1] * orbitScale);
                                        ctx.stroke();
                                    }
                                    ctx.globalAlpha = 1;
                                }

                                // Central body
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold; ctx.shadowBlur = 12;
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath(); ctx.arc(orbitCx, orbitCy, 6, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();

                                // Orbiting body
                                var bx = orbitCx + state[0] * Math.cos(state[1]) * orbitScale;
                                var by = orbitCy - state[0] * Math.sin(state[1]) * orbitScale;
                                ctx.save();
                                ctx.shadowColor = viz.colors.blue; ctx.shadowBlur = 8;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(bx, by, 5, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();

                                // Radius line
                                ctx.strokeStyle = viz.colors.text + '44'; ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(orbitCx, orbitCy); ctx.lineTo(bx, by); ctx.stroke();

                                // === RIGHT PANEL: Effective Potential ===
                                var epL = w * 0.58, epR = w - 15;
                                var epT = 30, epB = h - 30;
                                var epW = epR - epL, epH = epB - epT;

                                function Ueff(r) {
                                    if (r < 0.05) return 1e6;
                                    return -1 / r + L * L / (2 * r * r);
                                }

                                var r0 = L * L;
                                var Umin = Ueff(r0);
                                var rMax = Math.max(5, r0 * 4);
                                var yMin = Math.min(Umin * 1.5, -1);
                                var yMax = Math.max(0.5, E + 0.5);

                                function toEpx(r) { return epL + (r / rMax) * epW; }
                                function toEpy(u) { return epB - ((u - yMin) / (yMax - yMin)) * epH; }

                                // Axes
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(epL, epT); ctx.lineTo(epL, epB); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(epL, toEpy(0)); ctx.lineTo(epR, toEpy(0)); ctx.stroke();
                                viz.screenText('r', epR - 8, toEpy(0) + 12, viz.colors.text, 10);
                                viz.screenText('U_eff', epL + 20, epT - 5, viz.colors.text, 10);

                                // Ueff curve
                                ctx.strokeStyle = viz.colors.purple; ctx.lineWidth = 2;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 1; i <= 400; i++) {
                                    var r = 0.1 + (rMax - 0.1) * i / 400;
                                    var u = Ueff(r);
                                    var px = toEpx(r), py = toEpy(u);
                                    if (py < epT - 10 || py > epB + 10) { started = false; continue; }
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Energy line
                                var epy = toEpy(E);
                                if (epy > epT && epy < epB) {
                                    ctx.strokeStyle = viz.colors.green; ctx.lineWidth = 1.5;
                                    ctx.beginPath(); ctx.moveTo(epL, epy); ctx.lineTo(epR, epy); ctx.stroke();
                                }

                                // Current r marker
                                var curR = state[0];
                                var curPx = toEpx(curR);
                                var curPy = toEpy(E);
                                if (curPx > epL && curPx < epR) {
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath(); ctx.arc(curPx, curPy, 5, 0, Math.PI * 2); ctx.fill();
                                    // Vertical line to Ueff
                                    var uAtR = Ueff(curR);
                                    var uPy = toEpy(uAtR);
                                    ctx.strokeStyle = viz.colors.blue + '66'; ctx.lineWidth = 1;
                                    ctx.setLineDash([3, 3]);
                                    ctx.beginPath(); ctx.moveTo(curPx, curPy); ctx.lineTo(curPx, uPy); ctx.stroke();
                                    ctx.setLineDash([]);
                                }

                                // Info
                                var disc2 = 1 + 2 * E * L * L;
                                var ecc = disc2 >= 0 ? Math.sqrt(disc2) : 0;
                                viz.screenText('e = ' + ecc.toFixed(3), w / 2, h - 10, viz.colors.text, 11);
                                viz.screenText('r = ' + curR.toFixed(2), orbitCx, h - 10, viz.colors.blue, 11);
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Derive the orbit equation \\(r = p/(1 + e\\cos\\theta)\\) for gravity by solving Binet\'s equation.',
                        hint: 'For \\(f = -GMm/r^2 = -GMm u^2\\), Binet\'s equation is \\(d^2u/d\\theta^2 + u = GM\\mu^2/L^2\\). This is a shifted SHM.',
                        solution: 'Binet\'s equation becomes \\(u\'\'+ u = C\\) where \\(C = GM\\mu^2/L^2\\). The general solution is \\(u = C + A\\cos(\\theta - \\theta_0)\\). Taking \\(\\theta_0 = 0\\): \\(u = C(1 + e\\cos\\theta)\\) where \\(e = A/C\\). Then \\(r = 1/u = 1/(C(1+e\\cos\\theta)) = p/(1+e\\cos\\theta)\\) where \\(p = 1/C = L^2/(GM\\mu^2)\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Bound vs Unbound Orbits
            // ============================================================
            {
                id: 'bound-unbound',
                title: 'Bound vs. Unbound Orbits',
                content: `
<h2>The Energy Boundary</h2>

<p>The total energy determines whether an orbit is bound (the particle cannot escape to infinity) or unbound (it can). For the gravitational potential \\(U = -GMm/r\\):</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Orbit Classification by Energy and Eccentricity</div>
<div class="env-body">
<table style="width:100%; border-collapse:collapse; margin:10px 0;">
<tr style="border-bottom:1px solid #333;"><th style="text-align:left;padding:4px;">Energy</th><th style="text-align:left;padding:4px;">Eccentricity</th><th style="text-align:left;padding:4px;">Orbit</th><th style="text-align:left;padding:4px;">Conic Section</th></tr>
<tr><td style="padding:4px;">\\(E = E_{\\min}\\)</td><td style="padding:4px;">\\(e = 0\\)</td><td style="padding:4px;">Circular</td><td style="padding:4px;">Circle</td></tr>
<tr><td style="padding:4px;">\\(E_{\\min} < E < 0\\)</td><td style="padding:4px;">\\(0 < e < 1\\)</td><td style="padding:4px;">Bound</td><td style="padding:4px;">Ellipse</td></tr>
<tr><td style="padding:4px;">\\(E = 0\\)</td><td style="padding:4px;">\\(e = 1\\)</td><td style="padding:4px;">Marginally unbound</td><td style="padding:4px;">Parabola</td></tr>
<tr><td style="padding:4px;">\\(E > 0\\)</td><td style="padding:4px;">\\(e > 1\\)</td><td style="padding:4px;">Unbound</td><td style="padding:4px;">Hyperbola</td></tr>
</table>
</div>
</div>

<h3>Escape Velocity</h3>

<p>At distance \\(r\\) from the central body, the minimum speed needed to escape (reach \\(r = \\infty\\) with zero residual speed) is found by setting \\(E = 0\\):</p>

\\[\\frac{1}{2}\\mu v_{\\text{esc}}^2 - \\frac{GM\\mu}{r} = 0 \\implies v_{\\text{esc}} = \\sqrt{\\frac{2GM}{r}}\\]

<div class="env-block remark">
<div class="env-title">Escape velocity is direction-independent</div>
<div class="env-body">
<p>Escape velocity depends only on the speed, not the direction of launch (as long as you do not hit the central body). A projectile launched horizontally at \\(v_{\\text{esc}}\\) follows a parabolic orbit and escapes just as surely as one launched radially. The orbit shape differs, but the energy criterion \\(E \\geq 0\\) is satisfied in either case.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Escape from Earth's surface</div>
<div class="env-body">
<p>\\(v_{\\text{esc}} = \\sqrt{2GM_\\oplus/R_\\oplus} = \\sqrt{2 \\times 6.67 \\times 10^{-11} \\times 5.97 \\times 10^{24} / 6.37 \\times 10^6} = 11.2\\) km/s. A rocket must reach this speed (or do work against gravity continuously via thrust) to escape Earth.</p>
</div>
</div>

<h3>The Virial Theorem for 1/r Potentials</h3>

<div class="env-block theorem">
<div class="env-title">Theorem: Virial Theorem for Bound Orbits</div>
<div class="env-body">
<p>For a bound orbit in a gravitational potential \\(U \\propto -1/r\\), the time-averaged kinetic and potential energies satisfy:</p>
\\[\\langle T \\rangle = -\\frac{1}{2}\\langle U \\rangle, \\qquad E = \\frac{1}{2}\\langle U \\rangle = -\\langle T \\rangle\\]
<p>The total energy is negative (bound) and equals half the time-averaged potential energy. This is a special case of the virial theorem for power-law potentials \\(U \\propto r^n\\), which gives \\(2\\langle T \\rangle = n\\langle U \\rangle\\).</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why bound gravitational orbits have negative total energy</div>
<div class="env-body">
<p>The gravitational potential is negative everywhere: \\(U = -GMm/r < 0\\). For a bound orbit, the kinetic energy is not large enough to overcome this. On average, the kinetic energy is exactly half the magnitude of the potential energy but opposite in sign to the total. If you add energy to a satellite, it moves to a higher orbit (larger \\(r\\), less negative \\(U\\)), and paradoxically slows down (smaller \\(v\\)), because \\(\\langle T \\rangle = -E\\) decreases as \\(E\\) increases toward zero.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A satellite in circular orbit at radius \\(r\\) receives a sudden velocity boost \\(\\Delta v\\) tangentially. Find the new eccentricity in terms of \\(\\Delta v / v_c\\), where \\(v_c = \\sqrt{GM/r}\\) is the circular velocity.',
                        hint: 'After the boost, the energy is \\(E = \\frac{1}{2}\\mu(v_c + \\Delta v)^2 - GM\\mu/r\\). Use the eccentricity-energy relation.',
                        solution: 'The circular orbit has \\(E_c = -GM\\mu/(2r)\\). After the boost: \\(v = v_c + \\Delta v\\), so \\(E = \\frac{1}{2}\\mu v^2 - GM\\mu/r = \\frac{1}{2}\\mu(v_c + \\Delta v)^2 - GM\\mu/r\\). Using \\(v_c^2 = GM/r\\): \\(E = -\\frac{1}{2}\\mu v_c^2 + \\mu v_c \\Delta v + \\frac{1}{2}\\mu(\\Delta v)^2\\). The angular momentum is \\(L = \\mu r(v_c + \\Delta v)\\). Using \\(e^2 = 1 + 2EL^2/(G^2M^2\\mu^3)\\): after simplification, \\(e = \\Delta v/v_c \\cdot (2 + \\Delta v/v_c)^{1/2} \\cdot r v_c^2/(GM)\\). For small \\(\\Delta v\\): \\(e \\approx 2\\Delta v/v_c\\).'
                    },
                    {
                        question: 'Verify the virial theorem for a circular orbit: show that \\(T = -U/2\\) exactly (not just on average).',
                        hint: 'For a circular orbit, \\(v^2 = GM/r\\). Compute \\(T\\) and \\(U\\) directly.',
                        solution: 'For a circular orbit: \\(T = \\frac{1}{2}\\mu v_c^2 = \\frac{1}{2}\\mu \\cdot GM/r = GMm/(2r)\\) (using \\(\\mu \\approx m\\) for a test mass). \\(U = -GMm/r\\). So \\(T = -U/2\\) exactly. The total energy is \\(E = T + U = -GMm/(2r)\\). For a circular orbit, \\(r\\) is constant, so the time average equals the instantaneous value.'
                    }
                ]
            }
        ]
    });
})();
