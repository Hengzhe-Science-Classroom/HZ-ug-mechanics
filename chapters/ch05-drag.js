// === Chapter 5: Drag & Velocity-Dependent Forces ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch05',
        number: 5,
        title: 'Drag & Velocity-Dependent Forces',
        subtitle: 'Linear drag, quadratic drag, terminal velocity, and the art of solving ODEs that Newton could not',
        file: 'ch05-drag',

        sections: [
            // ============================================================
            // Section 0: Velocity-Dependent Forces
            // ============================================================
            {
                id: 'velocity-dependent',
                title: 'Velocity-Dependent Forces',
                content: `
<h2>Forces That Depend on Speed</h2>

<p>So far, the forces we have studied (gravity, normal forces, tension) depend on position or are constant. But many real forces depend on <em>velocity</em>. The most important is the <strong>drag force</strong> (air resistance, fluid friction), which opposes the motion and grows with speed.</p>

<div class="env-block definition">
<div class="env-title">Definition: Drag Force</div>
<div class="env-body">
<p>A <strong>drag force</strong> is a resistive force that acts opposite to an object's velocity through a fluid (gas or liquid). Its magnitude depends on the speed. Two important regimes:</p>
<ul>
<li><strong>Linear drag:</strong> \\(\\mathbf{f} = -b\\mathbf{v}\\), dominant at low speeds (small objects, viscous fluids)</li>
<li><strong>Quadratic drag:</strong> \\(\\mathbf{f} = -c|\\mathbf{v}|\\mathbf{v}\\), dominant at high speeds (large objects, turbulent flow)</li>
</ul>
</div>
</div>

<h3>When Does Each Regime Apply?</h3>

<p>The distinction is governed by the <strong>Reynolds number</strong> \\(\\text{Re} = \\rho v L / \\eta\\), where \\(\\rho\\) is the fluid density, \\(v\\) the speed, \\(L\\) a characteristic length (like the object's diameter), and \\(\\eta\\) the dynamic viscosity.</p>

<div class="env-block theorem">
<div class="env-title">Drag Regimes by Reynolds Number</div>
<div class="env-body">
<ul>
<li>\\(\\text{Re} \\lesssim 1\\): Linear (Stokes) drag, \\(f = bv\\). Laminar flow. Examples: bacteria swimming, pollen settling, oil droplets in Millikan's experiment.</li>
<li>\\(\\text{Re} \\gtrsim 10^3\\): Quadratic (Newton) drag, \\(f = cv^2\\). Turbulent flow. Examples: baseballs, skydivers, cars.</li>
<li>\\(1 \\lesssim \\text{Re} \\lesssim 10^3\\): Transition regime; neither formula is exact.</li>
</ul>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The Quadratic Drag Coefficient</div>
<div class="env-body">
<p>For quadratic drag, the standard parametrization is:</p>
\\[f = \\tfrac{1}{2}C_D \\rho A v^2\\]
<p>where \\(C_D\\) is the (dimensionless) drag coefficient, \\(\\rho\\) the fluid density, \\(A\\) the cross-sectional area, and \\(v\\) the speed. Thus \\(c = \\frac{1}{2}C_D\\rho A\\). Typical \\(C_D\\) values: sphere \\(\\approx 0.47\\), cylinder \\(\\approx 1.2\\), flat plate \\(\\approx 2.0\\), streamlined body \\(\\approx 0.04\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Reynolds Number for a Baseball</div>
<div class="env-body">
<p>A baseball (\\(L = 0.074\\) m) thrown at \\(v = 40\\) m/s through air (\\(\\rho = 1.2\\) kg/m\\(^3\\), \\(\\eta = 1.8\\times 10^{-5}\\) Pa\\(\\cdot\\)s):</p>
\\[\\text{Re} = \\frac{1.2 \\times 40 \\times 0.074}{1.8\\times 10^{-5}} \\approx 2 \\times 10^5\\]
<p>This is deep in the turbulent regime. Quadratic drag applies.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Warning: Drag Makes ODEs Nonlinear</div>
<div class="env-body">
<p>Velocity-dependent forces make Newton's second law a nonlinear differential equation. For some special cases (pure linear drag, or 1D quadratic drag), exact solutions exist. For general 2D projectile motion with quadratic drag, no closed-form solution exists, and we must resort to numerical methods (like RK4).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Compute the Reynolds number for a dust particle (\\(L = 50\\) \\(\\mu\\)m) falling at \\(v = 0.01\\) m/s in air. Which drag regime applies?',
                        hint: 'Use \\(\\rho_{\\text{air}} = 1.2\\) kg/m\\(^3\\) and \\(\\eta_{\\text{air}} = 1.8\\times 10^{-5}\\) Pa s.',
                        solution: '\\(\\text{Re} = (1.2)(0.01)(50\\times 10^{-6})/(1.8\\times 10^{-5}) = 0.033\\). Since \\(\\text{Re} \\ll 1\\), this is firmly in the Stokes (linear drag) regime. The drag force is \\(f = 6\\pi\\eta r v\\) (Stokes formula), not quadratic.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Linear Drag & Stokes' Law
            // ============================================================
            {
                id: 'linear-drag',
                title: "Linear Drag & Stokes' Law",
                content: `
<h2>Stokes Drag: The Exact Solution</h2>

<p>For a sphere of radius \\(r\\) moving slowly through a viscous fluid, the drag force was derived by George Stokes in 1851:</p>

<div class="env-block theorem">
<div class="env-title">Stokes' Law</div>
<div class="env-body">
\\[\\mathbf{f} = -6\\pi\\eta r\\,\\mathbf{v}\\]
<p>where \\(\\eta\\) is the dynamic viscosity of the fluid and \\(r\\) is the sphere radius. This is linear in \\(v\\) and applies for \\(\\text{Re} \\lesssim 1\\).</p>
</div>
</div>

<h3>Falling with Linear Drag</h3>

<p>Consider a sphere of mass \\(m\\) released from rest, falling under gravity with linear drag \\(f = bv\\) (where \\(b = 6\\pi\\eta r\\) for Stokes drag). Newton's second law (taking downward as positive):</p>

\\[m\\dot{v} = mg - bv\\]

<p>This is a first-order linear ODE. Separate variables:</p>

\\[\\frac{dv}{g - (b/m)v} = dt\\]

<p>Integrating with \\(v(0) = 0\\):</p>

<div class="env-block theorem">
<div class="env-title">Velocity Under Linear Drag (Released from Rest)</div>
<div class="env-body">
\\[v(t) = v_T\\left(1 - e^{-t/\\tau}\\right)\\]
<p>where the <strong>terminal velocity</strong> is \\(v_T = mg/b\\) and the <strong>time constant</strong> is \\(\\tau = m/b\\). The speed approaches \\(v_T\\) exponentially. After time \\(\\tau\\), the speed has reached \\((1 - 1/e) \\approx 63\\%\\) of terminal velocity.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-stokes-falling"></div>

<div class="env-block intuition">
<div class="env-title">The Terminal Velocity Condition</div>
<div class="env-body">
<p>At terminal velocity, the net force is zero: \\(mg = bv_T\\). The object no longer accelerates. It falls at constant speed, drag exactly balancing gravity. The time constant \\(\\tau = m/b\\) sets the timescale for reaching this steady state.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Millikan's Oil Drop</div>
<div class="env-body">
<p>A tiny oil droplet (\\(r = 1\\) \\(\\mu\\)m, \\(\\rho_{\\text{oil}} = 900\\) kg/m\\(^3\\)) in air (\\(\\eta = 1.8\\times 10^{-5}\\) Pa\\(\\cdot\\)s). Mass: \\(m = \\frac{4}{3}\\pi r^3 \\rho = 3.77\\times 10^{-15}\\) kg. Stokes drag coefficient: \\(b = 6\\pi\\eta r = 3.39\\times 10^{-10}\\) N\\(\\cdot\\)s/m.</p>
\\[v_T = \\frac{mg}{b} = \\frac{3.77\\times 10^{-15}\\times 9.8}{3.39\\times 10^{-10}} \\approx 1.1\\times 10^{-4} \\text{ m/s} = 0.11 \\text{ mm/s}\\]
\\[\\tau = \\frac{m}{b} = \\frac{3.77\\times 10^{-15}}{3.39\\times 10^{-10}} \\approx 1.1\\times 10^{-5} \\text{ s} = 11 \\text{ \\mu s}\\]
<p>The droplet reaches terminal velocity almost instantly (11 microseconds). This is why Millikan could accurately measure terminal velocities of oil drops.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-stokes-falling',
                        title: 'Terminal Velocity Approach (Linear Drag)',
                        description: 'A sphere falls from rest under gravity with linear drag. The left panel shows the sphere falling in a viscous fluid. The right panel shows \\(v(t)\\) approaching the terminal velocity \\(v_T\\) exponentially. Adjust the drag coefficient.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var bCoeff = 0.5;
                            var mass = 1.0;
                            var g = 9.8;
                            var t = 0;

                            VizEngine.createSlider(controls, 'Drag b', 0.1, 3.0, bCoeff, 0.1, function (v) { bCoeff = v; t = 0; });
                            VizEngine.createSlider(controls, 'Mass m', 0.2, 3.0, mass, 0.1, function (v) { mass = v; t = 0; });
                            VizEngine.createButton(controls, 'Reset', function () { t = 0; });

                            // Layout: left 40% is fluid column, right 60% is v-t plot
                            var colL = 20, colR = w * 0.35, colW = colR - colL;
                            var plotL = w * 0.42, plotR = w - 25;
                            var plotT = 35, plotB = h - 45;
                            var plotW = plotR - plotL, plotH = plotB - plotT;

                            function vOfT(time) {
                                var vt = mass * g / bCoeff;
                                var tau = mass / bCoeff;
                                return vt * (1 - Math.exp(-time / tau));
                            }

                            function yOfT(time) {
                                var vt = mass * g / bCoeff;
                                var tau = mass / bCoeff;
                                return vt * (time - tau * (1 - Math.exp(-time / tau)));
                            }

                            function draw() {
                                viz.clear();
                                var dt = 0.016;
                                t += dt;

                                var vt = mass * g / bCoeff;
                                var tau = mass / bCoeff;
                                var tMax = Math.max(5 * tau, 3);

                                // === Left: Fluid column ===
                                // Background fluid
                                var fluidGrad = ctx.createLinearGradient(colL, 0, colR, 0);
                                fluidGrad.addColorStop(0, '#0a1628');
                                fluidGrad.addColorStop(0.5, '#0f1f3a');
                                fluidGrad.addColorStop(1, '#0a1628');
                                ctx.fillStyle = fluidGrad;
                                ctx.fillRect(colL, 20, colW, h - 40);
                                ctx.strokeStyle = viz.colors.teal + '66';
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(colL, 20, colW, h - 40);

                                // Fluid particles (simple ambient)
                                ctx.fillStyle = viz.colors.teal + '15';
                                for (var fp = 0; fp < 30; fp++) {
                                    var fpx = colL + 10 + ((fp * 37 + t * 5) % (colW - 20));
                                    var fpy = 30 + ((fp * 53 + t * 8) % (h - 70));
                                    ctx.beginPath(); ctx.arc(fpx, fpy, 1.5, 0, Math.PI * 2); ctx.fill();
                                }

                                // Sphere position (map y to screen, wrapping)
                                var currentY = yOfT(t);
                                var maxFallDisplay = h - 80;
                                var sphereScreenY = 40 + (currentY * 15) % maxFallDisplay;
                                var sphereScreenX = colL + colW / 2;
                                var sphereR = 12 + mass * 4;

                                // Sphere glow
                                var sg = ctx.createRadialGradient(sphereScreenX, sphereScreenY, sphereR * 0.3, sphereScreenX, sphereScreenY, sphereR * 2);
                                sg.addColorStop(0, viz.colors.orange + '55');
                                sg.addColorStop(1, viz.colors.orange + '00');
                                ctx.fillStyle = sg;
                                ctx.beginPath(); ctx.arc(sphereScreenX, sphereScreenY, sphereR * 2, 0, Math.PI * 2); ctx.fill();

                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(sphereScreenX, sphereScreenY, sphereR, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = 'rgba(255,255,255,0.25)';
                                ctx.beginPath(); ctx.arc(sphereScreenX - sphereR * 0.25, sphereScreenY - sphereR * 0.25, sphereR * 0.35, 0, Math.PI * 2); ctx.fill();

                                // Velocity arrow on sphere
                                var currentV = vOfT(t);
                                var arrowLen = Math.min(currentV / vt * 40, 40);
                                if (arrowLen > 3) {
                                    ctx.strokeStyle = viz.colors.green;
                                    ctx.lineWidth = 2.5;
                                    ctx.beginPath();
                                    ctx.moveTo(sphereScreenX, sphereScreenY + sphereR + 3);
                                    ctx.lineTo(sphereScreenX, sphereScreenY + sphereR + 3 + arrowLen);
                                    ctx.stroke();
                                    // Arrowhead
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.beginPath();
                                    ctx.moveTo(sphereScreenX, sphereScreenY + sphereR + 3 + arrowLen + 5);
                                    ctx.lineTo(sphereScreenX - 4, sphereScreenY + sphereR + 3 + arrowLen - 2);
                                    ctx.lineTo(sphereScreenX + 4, sphereScreenY + sphereR + 3 + arrowLen - 2);
                                    ctx.fill();
                                }

                                viz.screenText('v', sphereScreenX + sphereR + 8, sphereScreenY + sphereR + 15, viz.colors.green, 11);

                                // === Right: v-t plot ===
                                // Plot background
                                ctx.fillStyle = '#060612';
                                ctx.fillRect(plotL, plotT, plotW, plotH);
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1.5;
                                ctx.strokeRect(plotL, plotT, plotW, plotH);

                                // Grid
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                for (var gv = 0; gv <= 4; gv++) {
                                    var gy = plotB - (gv / 4) * plotH;
                                    ctx.beginPath(); ctx.moveTo(plotL, gy); ctx.lineTo(plotR, gy); ctx.stroke();
                                }
                                for (var gt = 0; gt <= 4; gt++) {
                                    var gx = plotL + (gt / 4) * plotW;
                                    ctx.beginPath(); ctx.moveTo(gx, plotT); ctx.lineTo(gx, plotB); ctx.stroke();
                                }

                                // Terminal velocity dashed line
                                var vtScreenY = plotB - (vt / (vt * 1.3)) * plotH;
                                if (vtScreenY > plotT) {
                                    ctx.strokeStyle = viz.colors.red;
                                    ctx.lineWidth = 1.5;
                                    ctx.setLineDash([6, 4]);
                                    ctx.beginPath(); ctx.moveTo(plotL, vtScreenY); ctx.lineTo(plotR, vtScreenY); ctx.stroke();
                                    ctx.setLineDash([]);
                                    viz.screenText('v_T = ' + vt.toFixed(1), plotR - 5, vtScreenY - 10, viz.colors.red, 10, 'right');
                                }

                                // Tau marker
                                var tauScreenX = plotL + (tau / tMax) * plotW;
                                if (tauScreenX > plotL && tauScreenX < plotR) {
                                    ctx.strokeStyle = viz.colors.purple + '88';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([4, 3]);
                                    ctx.beginPath(); ctx.moveTo(tauScreenX, plotT); ctx.lineTo(tauScreenX, plotB); ctx.stroke();
                                    ctx.setLineDash([]);
                                    viz.screenText('\u03c4', tauScreenX, plotB + 12, viz.colors.purple, 10);
                                }

                                // v(t) curve
                                var vMax = vt * 1.3;
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var px = 0; px <= plotW; px++) {
                                    var tt = (px / plotW) * tMax;
                                    var vv = vOfT(tt);
                                    var py = plotB - (vv / vMax) * plotH;
                                    if (px === 0) ctx.moveTo(plotL + px, py);
                                    else ctx.lineTo(plotL + px, py);
                                }
                                ctx.stroke();

                                // Current time marker
                                var tNorm = Math.min(t / tMax, 1);
                                var currPx = plotL + tNorm * plotW;
                                var currVy = plotB - (currentV / vMax) * plotH;
                                if (currPx <= plotR) {
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath(); ctx.arc(currPx, currVy, 5, 0, Math.PI * 2); ctx.fill();
                                }

                                // Axes labels
                                viz.screenText('t', plotL + plotW / 2, plotB + 28, viz.colors.text, 12);
                                viz.screenText('v(t)', plotL - 20, plotT + plotH / 2, viz.colors.text, 11);
                                viz.screenText('v(t) = v_T(1 \u2212 e^{\u2212t/\u03c4})', plotL + plotW / 2, plotT - 10, viz.colors.white, 12);

                                // Info
                                viz.screenText('\u03c4 = ' + tau.toFixed(2) + ' s', plotL + 8, plotT + 18, viz.colors.purple, 10, 'left');
                                viz.screenText('v = ' + currentV.toFixed(2) + ' m/s', plotL + 8, plotT + 34, viz.colors.orange, 10, 'left');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Integrate \\(m\\dot{v} = mg - bv\\) by separation of variables to derive \\(v(t) = v_T(1 - e^{-t/\\tau})\\).',
                        hint: 'Write \\(dv/(g - bv/m) = dt\\), substitute \\(u = g - bv/m\\), and use \\(v(0)=0\\).',
                        solution: 'Let \\(u = g - (b/m)v\\), so \\(du = -(b/m)dv\\). Then \\(-(m/b)(du/u) = dt\\). Integrating: \\(-m/b \\cdot \\ln u = t + C\\). At \\(t=0\\): \\(v=0\\), so \\(u_0 = g\\) and \\(C = -(m/b)\\ln g\\). Thus \\(\\ln(u/g) = -(b/m)t\\), giving \\(g - (b/m)v = g e^{-t/\\tau}\\) with \\(\\tau = m/b\\). Solving for \\(v\\): \\(v = (mg/b)(1-e^{-t/\\tau}) = v_T(1-e^{-t/\\tau})\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Quadratic Drag & Terminal Velocity
            // ============================================================
            {
                id: 'quadratic-drag',
                title: 'Quadratic Drag',
                content: `
<h2>Falling with Quadratic Drag</h2>

<p>For large objects in air (\\(\\text{Re} \\gg 1\\)), the drag force is quadratic: \\(f = cv^2\\), where \\(c = \\frac{1}{2}C_D\\rho A\\). The equation of motion for vertical fall (taking downward as positive) is:</p>

\\[m\\dot{v} = mg - cv^2\\]

<div class="env-block theorem">
<div class="env-title">Terminal Velocity (Quadratic Drag)</div>
<div class="env-body">
\\[v_T = \\sqrt{\\frac{mg}{c}} = \\sqrt{\\frac{2mg}{C_D\\rho A}}\\]
<p>At terminal velocity, gravity balances drag: \\(mg = cv_T^2\\).</p>
</div>
</div>

<h3>Exact Solution for Vertical Fall</h3>

<p>The ODE \\(m\\dot{v} = mg - cv^2\\) is separable. With \\(v(0) = 0\\):</p>

\\[\\int_0^v \\frac{dv'}{1 - (v'/v_T)^2} = \\frac{g}{v_T}\\int_0^t dt'\\]

<p>Using partial fractions (or recognizing the integral of \\(1/(1-u^2)\\) as \\(\\tanh^{-1}u\\)):</p>

<div class="env-block theorem">
<div class="env-title">Velocity Under Quadratic Drag (Released from Rest)</div>
<div class="env-body">
\\[v(t) = v_T \\tanh\\left(\\frac{gt}{v_T}\\right)\\]
<p>The speed approaches \\(v_T\\) as \\(t \\to \\infty\\), but the approach is not exponential; it follows a hyperbolic tangent. The characteristic time is \\(\\tau = v_T/g\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Skydiver Terminal Velocity</div>
<div class="env-body">
<p>A skydiver (\\(m = 80\\) kg, belly-down: \\(A \\approx 0.7\\) m\\(^2\\), \\(C_D \\approx 1.0\\)) in air (\\(\\rho = 1.2\\) kg/m\\(^3\\)):</p>
\\[v_T = \\sqrt{\\frac{2 \\times 80 \\times 9.8}{1.0 \\times 1.2 \\times 0.7}} \\approx 43 \\text{ m/s} \\approx 155 \\text{ km/h}\\]
<p>The characteristic time is \\(\\tau = v_T/g \\approx 4.4\\) s. After about 12 seconds (\\(\\approx 3\\tau\\)), the skydiver is within 1% of terminal velocity.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Linear vs. Quadratic: Comparison</div>
<div class="env-body">
<p>Both approach terminal velocity, but the functional form differs:</p>
<ul>
<li><strong>Linear:</strong> \\(v = v_T(1 - e^{-t/\\tau})\\). Exponential approach; \\(\\tau = m/b\\).</li>
<li><strong>Quadratic:</strong> \\(v = v_T\\tanh(t/\\tau)\\). Hyperbolic tangent approach; \\(\\tau = v_T/g\\).</li>
</ul>
<p>The \\(\\tanh\\) approach is initially faster (the early acceleration is closer to free-fall \\(g\\)) but the final approach to \\(v_T\\) is slower than exponential.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why \\(\\tanh\\)?</div>
<div class="env-body">
<p>At early times (\\(t \\ll \\tau\\)), \\(\\tanh(t/\\tau) \\approx t/\\tau = gt/v_T\\), so \\(v \\approx gt\\): free-fall, as expected (drag is negligible when \\(v\\) is small). At late times (\\(t \\gg \\tau\\)), \\(\\tanh \\to 1\\) and \\(v \\to v_T\\). The \\(\\tanh\\) interpolates smoothly between these limits.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Derive \\(v(t) = v_T\\tanh(gt/v_T)\\) by separating variables in \\(m\\dot{v} = mg - cv^2\\).',
                        hint: 'Write \\(dv/(1 - v^2/v_T^2) = g\\,dt\\). The integral of \\(1/(1-u^2)\\) is \\(\\tanh^{-1}(u)\\).',
                        solution: 'From \\(m\\dot{v} = mg - cv^2\\), dividing by \\(m\\): \\(\\dot{v} = g(1 - v^2/v_T^2)\\) since \\(v_T^2 = mg/c\\). Separating: \\(dv/(1 - v^2/v_T^2) = g\\,dt\\). Let \\(u = v/v_T\\): \\(v_T\\,du/(1-u^2) = g\\,dt\\), so \\(du/(1-u^2) = (g/v_T)dt\\). Integrating: \\(\\tanh^{-1}(u) = gt/v_T + C\\). With \\(u(0)=0\\): \\(C=0\\). Thus \\(v/v_T = \\tanh(gt/v_T)\\).'
                    },
                    {
                        question: 'By what factor does the terminal velocity change if the skydiver changes from belly-down (\\(A = 0.7\\) m\\(^2\\)) to head-down (\\(A = 0.2\\) m\\(^2\\)) with the same \\(C_D\\)?',
                        hint: '\\(v_T \\propto A^{-1/2}\\).',
                        solution: '\\(v_T \\propto 1/\\sqrt{A}\\). The ratio is \\(\\sqrt{0.7/0.2} = \\sqrt{3.5} \\approx 1.87\\). The terminal velocity increases by about 87%, from ~155 km/h to ~290 km/h. This is why competitive skydivers use different body positions to control speed.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Projectile with Drag (Numerical)
            // ============================================================
            {
                id: 'projectile-drag',
                title: 'Projectile with Drag',
                content: `
<h2>2D Projectile Motion with Air Resistance</h2>

<p>For a projectile launched at angle \\(\\theta\\) with speed \\(v_0\\), the equations of motion with quadratic drag are:</p>

\\[m\\dot{v}_x = -cv v_x, \\qquad m\\dot{v}_y = -mg - cv v_y\\]

<p>where \\(v = \\sqrt{v_x^2 + v_y^2}\\). These coupled, nonlinear ODEs have no closed-form solution. We must solve them numerically.</p>

<div class="env-block remark">
<div class="env-title">Why No Analytical Solution?</div>
<div class="env-body">
<p>In vacuum, the \\(x\\) and \\(y\\) equations decouple because the force (gravity) acts only in \\(y\\). With drag, the force on each component depends on the total speed \\(v = \\sqrt{v_x^2 + v_y^2}\\), coupling the equations. This coupling, combined with the nonlinear \\(v^2\\) dependence, prevents separation.</p>
</div>
</div>

<h3>The RK4 Method</h3>

<p>We use the 4th-order Runge-Kutta method, which achieves high accuracy by evaluating the derivative function at four points per step. The state vector is \\(\\mathbf{s} = (x, y, v_x, v_y)\\) and the derivatives are:</p>

\\[\\dot{\\mathbf{s}} = \\left(v_x,\\; v_y,\\; -\\frac{c}{m}v\\,v_x,\\; -g - \\frac{c}{m}v\\,v_y\\right)\\]

<div class="viz-placeholder" data-viz="viz-projectile-drag"></div>

<div class="env-block intuition">
<div class="env-title">Qualitative Effects of Drag on Trajectories</div>
<div class="env-body">
<ul>
<li><strong>Range reduction:</strong> Drag always reduces the range compared to vacuum.</li>
<li><strong>Asymmetry:</strong> The trajectory is no longer a symmetric parabola. The descent is steeper than the ascent because the projectile is moving slower (and hence experiencing less drag) on the way down.</li>
<li><strong>Optimal angle:</strong> In vacuum, the maximum range occurs at 45\\(^\\circ\\). With drag, the optimal angle is less than 45\\(^\\circ\\) (typically 35--40\\(^\\circ\\) for strong drag) because a lower trajectory spends less time in the air and thus less time decelerating.</li>
<li><strong>Terminal velocity cap:</strong> The vertical speed on descent cannot exceed \\(v_T\\).</li>
</ul>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Baseball Range with and without Drag</div>
<div class="env-body">
<p>A baseball launched at 40 m/s, 40\\(^\\circ\\) above horizontal. In vacuum: \\(R = v_0^2\\sin 2\\theta/g = 40^2 \\sin 80^\\circ / 9.8 \\approx 161\\) m. With drag (\\(C_D = 0.35\\), \\(A = 4.3\\times 10^{-3}\\) m\\(^2\\), \\(m = 0.145\\) kg): numerical integration gives \\(R \\approx 95\\) m. Drag reduces the range by about 40%.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-projectile-drag',
                        title: 'Projectile Trajectories: Vacuum vs. Linear Drag vs. Quadratic Drag',
                        description: 'Compare three trajectories launched with the same initial conditions. <strong>White</strong>: vacuum (parabola). <strong>Blue</strong>: linear drag. <strong>Orange</strong>: quadratic drag. Adjust launch angle and drag strength.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 28, originX: 55, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, hh = viz.height;
                            viz.originY = hh - 50;

                            var angle = 45;
                            var v0 = 12;
                            var dragLin = 0.3;
                            var dragQuad = 0.08;
                            var g = 9.8;

                            VizEngine.createSlider(controls, 'Angle (\u00b0)', 10, 80, angle, 1, function (v) { angle = v; });
                            VizEngine.createSlider(controls, 'Speed', 5, 20, v0, 0.5, function (v) { v0 = v; });
                            VizEngine.createSlider(controls, 'Linear b', 0, 1.5, dragLin, 0.05, function (v) { dragLin = v; });
                            VizEngine.createSlider(controls, 'Quadratic c', 0, 0.4, dragQuad, 0.01, function (v) { dragQuad = v; });

                            var dt = 0.005;
                            var mass = 1.0;

                            function computeTrajectory(mode) {
                                var rad = angle * Math.PI / 180;
                                var state = [0, 0, v0 * Math.cos(rad), v0 * Math.sin(rad)];
                                var pts = [[state[0], state[1]]];

                                function derivs(s) {
                                    var vx = s[2], vy = s[3];
                                    var spd = Math.sqrt(vx * vx + vy * vy);
                                    var ax = 0, ay = -g;
                                    if (mode === 'linear') {
                                        ax -= (dragLin / mass) * vx;
                                        ay -= (dragLin / mass) * vy;
                                    } else if (mode === 'quad') {
                                        if (spd > 1e-10) {
                                            ax -= (dragQuad / mass) * spd * vx;
                                            ay -= (dragQuad / mass) * spd * vy;
                                        }
                                    }
                                    return [vx, vy, ax, ay];
                                }

                                for (var i = 0; i < 8000; i++) {
                                    state = VizEngine.rk4(state, i * dt, dt, function (s) { return derivs(s); });
                                    pts.push([state[0], state[1]]);
                                    if (state[1] < 0 && i > 5) break;
                                }
                                return pts;
                            }

                            function draw() {
                                viz.clear();
                                viz.drawGrid(1);

                                // Ground
                                viz.drawGround(0, viz.colors.text + '44');

                                // Axes
                                viz.drawAxes('x (m)', 'y (m)');

                                // Compute trajectories
                                var vacTraj = computeTrajectory('vacuum');
                                var linTraj = computeTrajectory('linear');
                                var quadTraj = computeTrajectory('quad');

                                // Draw vacuum trajectory
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([6, 3]);
                                ctx.beginPath();
                                for (var i = 0; i < vacTraj.length; i++) {
                                    var pt = viz.toScreen(vacTraj[i][0], vacTraj[i][1]);
                                    if (i === 0) ctx.moveTo(pt[0], pt[1]);
                                    else ctx.lineTo(pt[0], pt[1]);
                                }
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Draw linear drag trajectory
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var j = 0; j < linTraj.length; j++) {
                                    var pt2 = viz.toScreen(linTraj[j][0], linTraj[j][1]);
                                    if (j === 0) ctx.moveTo(pt2[0], pt2[1]);
                                    else ctx.lineTo(pt2[0], pt2[1]);
                                }
                                ctx.stroke();

                                // Draw quadratic drag trajectory
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var k = 0; k < quadTraj.length; k++) {
                                    var pt3 = viz.toScreen(quadTraj[k][0], quadTraj[k][1]);
                                    if (k === 0) ctx.moveTo(pt3[0], pt3[1]);
                                    else ctx.lineTo(pt3[0], pt3[1]);
                                }
                                ctx.stroke();

                                // Launch arrow
                                var rad = angle * Math.PI / 180;
                                var arrowLen = 1.5;
                                viz.drawVector(0, 0, arrowLen * Math.cos(rad), arrowLen * Math.sin(rad), viz.colors.green, 'v\u2080', 2, 8);

                                // Landing markers
                                function findLanding(traj) {
                                    for (var n = traj.length - 1; n >= 0; n--) {
                                        if (traj[n][1] >= 0) {
                                            if (n < traj.length - 1) {
                                                // Linear interpolate
                                                var y0 = traj[n][1], y1 = traj[n + 1][1];
                                                var frac = y0 / (y0 - y1);
                                                return traj[n][0] + frac * (traj[n + 1][0] - traj[n][0]);
                                            }
                                            return traj[n][0];
                                        }
                                    }
                                    return traj[traj.length - 1][0];
                                }

                                var rVac = findLanding(vacTraj);
                                var rLin = findLanding(linTraj);
                                var rQuad = findLanding(quadTraj);

                                // Range labels at bottom
                                var baseY = hh - 14;
                                viz.screenText('Vacuum: ' + rVac.toFixed(1) + 'm', 90, baseY, viz.colors.white, 10, 'left');
                                viz.screenText('Linear: ' + rLin.toFixed(1) + 'm', w * 0.38, baseY, viz.colors.blue, 10, 'left');
                                viz.screenText('Quadratic: ' + rQuad.toFixed(1) + 'm', w * 0.68, baseY, viz.colors.orange, 10, 'left');

                                // Legend
                                var legX = w - 140, legY = 18;
                                ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 2; ctx.setLineDash([5, 3]);
                                ctx.beginPath(); ctx.moveTo(legX, legY); ctx.lineTo(legX + 20, legY); ctx.stroke(); ctx.setLineDash([]);
                                viz.screenText('Vacuum', legX + 26, legY, viz.colors.white, 10, 'left');

                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(legX, legY + 12, 20, 3);
                                viz.screenText('Linear drag', legX + 26, legY + 14, viz.colors.blue, 10, 'left');

                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillRect(legX, legY + 26, 20, 3);
                                viz.screenText('Quadratic drag', legX + 26, legY + 28, viz.colors.orange, 10, 'left');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'With quadratic drag, the trajectory is asymmetric: the descent is steeper than the ascent. Explain physically why this happens.',
                        hint: 'Compare the speed (and hence drag magnitude) at corresponding heights during ascent and descent.',
                        solution: 'During the ascent, gravity and drag both act downward (opposing the upward velocity), so the projectile decelerates rapidly. During descent, gravity acts downward but drag acts upward (opposing the downward velocity), so the projectile accelerates slowly. At any given height, the speed is lower during descent than ascent. The slower descent speed means the horizontal distance covered per unit altitude is smaller on the way down, making the trajectory steeper. Equivalently, drag dissipates kinetic energy during the ascent, so the projectile arrives at the apex with less total energy than it would in vacuum.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Exact Solutions & Special Cases
            // ============================================================
            {
                id: 'exact-solutions',
                title: 'Exact Solutions & Limits',
                content: `
<h2>Analytical Results Worth Knowing</h2>

<p>Although general 2D drag problems require numerics, several special cases yield exact solutions. These serve as benchmarks for numerical codes and develop physical intuition.</p>

<h3>Horizontal Motion with Quadratic Drag</h3>

<p>A particle moves horizontally with initial speed \\(v_0\\), subject only to quadratic drag: \\(m\\dot{v} = -cv^2\\). This separable ODE gives:</p>

<div class="env-block theorem">
<div class="env-title">Horizontal Deceleration Under Quadratic Drag</div>
<div class="env-body">
\\[v(t) = \\frac{v_0}{1 + v_0(c/m)t}\\]
\\[x(t) = \\frac{m}{c}\\ln\\left(1 + \\frac{cv_0}{m}t\\right)\\]
<p>The speed decreases as \\(1/t\\) at large times (much slower than the exponential decay of linear drag). The position grows logarithmically, meaning the particle technically never stops but slows indefinitely.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Linear vs. Quadratic: Stopping Comparison</div>
<div class="env-body">
<p>Under <strong>linear</strong> drag (\\(f = -bv\\)), a horizontally moving particle has \\(v = v_0 e^{-bt/m}\\) and \\(x = (mv_0/b)(1 - e^{-bt/m})\\). It stops exponentially, reaching a finite distance \\(x_\\infty = mv_0/b\\).</p>
<p>Under <strong>quadratic</strong> drag, the distance \\(x(t) \\to \\infty\\) as \\(t \\to \\infty\\) (logarithmic divergence). In theory, the particle never fully stops, though in practice the speed becomes negligibly small.</p>
</div>
</div>

<h3>Vertical Fall from Height (Quadratic Drag)</h3>

<p>An object dropped from rest falls a distance \\(y\\) in time \\(t\\). Integrating \\(v(t) = v_T\\tanh(gt/v_T)\\):</p>

<div class="env-block theorem">
<div class="env-title">Position Under Quadratic Drag (Vertical Fall from Rest)</div>
<div class="env-body">
\\[y(t) = \\frac{v_T^2}{g}\\ln\\cosh\\left(\\frac{gt}{v_T}\\right)\\]
<p>At early times: \\(y \\approx \\frac{1}{2}gt^2\\) (free-fall). At late times: \\(y \\approx v_T t - \\frac{v_T^2}{g}\\ln 2\\) (constant-velocity descent offset by a constant).</p>
</div>
</div>

<h3>Vertical Throw Upward with Quadratic Drag</h3>

<p>If an object is thrown upward with speed \\(v_0\\) against gravity and quadratic drag (both oppose the motion during ascent), the maximum height is:</p>

<div class="env-block theorem">
<div class="env-title">Maximum Height with Quadratic Drag</div>
<div class="env-body">
\\[y_{\\max} = \\frac{v_T^2}{2g}\\ln\\left(1 + \\frac{v_0^2}{v_T^2}\\right)\\]
<p>Compare to the vacuum result \\(y_{\\max}^{\\text{vac}} = v_0^2/(2g)\\). When \\(v_0 \\ll v_T\\), the two agree. When \\(v_0 \\gg v_T\\), the drag result grows only logarithmically with \\(v_0\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Maximum Height of a Tennis Ball</div>
<div class="env-body">
<p>A tennis ball (\\(v_T \\approx 20\\) m/s) thrown straight up at \\(v_0 = 30\\) m/s:</p>
\\[y_{\\max} = \\frac{20^2}{2(9.8)}\\ln\\left(1 + \\frac{30^2}{20^2}\\right) = 20.4\\,\\ln(3.25) \\approx 24.0 \\text{ m}\\]
<p>In vacuum: \\(y_{\\max}^{\\text{vac}} = 30^2/(2\\times 9.8) = 45.9\\) m. Drag reduces the maximum height by almost half.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Warning: Ascent and Descent Are Asymmetric</div>
<div class="env-body">
<p>An object thrown upward with quadratic drag returns to the launch height at a speed <em>less</em> than \\(v_0\\). Energy is lost to drag during both ascent and descent. The time to fall back down is longer than the time to rise (because the descent speed never exceeds \\(v_T\\), and in general \\(v_T < v_0\\) for this problem to be interesting). The return speed \\(v_r\\) satisfies:</p>
\\[\\frac{1}{v_r^2} = \\frac{1}{v_0^2} + \\frac{1}{v_T^2}\\]
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Derive \\(v(t) = v_0/(1 + v_0 c t/m)\\) for horizontal motion with quadratic drag \\(f = -cv^2\\).',
                        hint: 'Separate variables: \\(dv/v^2 = -(c/m)dt\\).',
                        solution: 'From \\(m\\dot{v} = -cv^2\\), separate: \\(-dv/v^2 = (c/m)dt\\). Integrating: \\(1/v = (c/m)t + C\\). At \\(t=0\\): \\(1/v_0 = C\\). Thus \\(1/v = 1/v_0 + (c/m)t\\), giving \\(v = v_0/[1 + v_0(c/m)t]\\). Note the algebraic (power-law) decay: \\(v \\sim m/(ct)\\) for large \\(t\\), much slower than the exponential decay of linear drag.'
                    },
                    {
                        question: 'Verify the return-speed formula \\(1/v_r^2 = 1/v_0^2 + 1/v_T^2\\) for an object thrown straight up with quadratic drag.',
                        hint: 'Use energy methods. The work done by drag during ascent plus descent equals the kinetic energy lost. Or, compute \\(y_{\\max}\\) from the ascent and equate it to the drop-from-rest formula for the descent.',
                        solution: 'Ascent: \\(y_{\\max} = (v_T^2/2g)\\ln(1 + v_0^2/v_T^2)\\). Descent from rest through height \\(y_{\\max}\\): \\(v_r^2 = v_T^2(1 - e^{-2gy_{\\max}/v_T^2})\\) (from integrating the descent equation). Substituting \\(y_{\\max}\\): \\(v_r^2 = v_T^2(1 - 1/(1 + v_0^2/v_T^2)) = v_T^2 \\cdot v_0^2/(v_T^2 + v_0^2)\\). Inverting: \\(1/v_r^2 = (v_T^2 + v_0^2)/(v_T^2 v_0^2) = 1/v_0^2 + 1/v_T^2\\).'
                    }
                ]
            }
        ]
    });
})();
