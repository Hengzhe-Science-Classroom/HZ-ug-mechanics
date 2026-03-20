// === Chapter 21: Hamiltonian Mechanics ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch21',
        number: 21,
        title: 'Hamiltonian Mechanics',
        subtitle: 'Phase space, symplectic structure, and the geometric heart of classical mechanics',
        file: 'ch21-hamiltonian',

        sections: [
            // ============================================================
            // Section 0: The Legendre Transform and the Hamiltonian
            // ============================================================
            {
                id: 'legendre-transform',
                title: 'The Legendre Transform and the Hamiltonian',
                content: `
<h2>From Velocities to Momenta</h2>

<p>Lagrangian mechanics uses generalized coordinates \\(q_i\\) and velocities \\(\\dot{q}_i\\) as the fundamental variables. Hamiltonian mechanics replaces the velocities with <strong>generalized momenta</strong>, yielding a formulation with deep geometric structure and powerful conservation theorems.</p>

<p>The bridge between the two is the <strong>Legendre transform</strong>, one of the most important constructions in all of mathematical physics.</p>

<div class="env-block definition">
<div class="env-title">Definition: Legendre Transform</div>
<div class="env-body">
<p>Given a convex function \\(f(x)\\), its <strong>Legendre transform</strong> is</p>
\\[g(p) = \\sup_x \\left[ px - f(x) \\right] = p\\,x^*(p) - f(x^*(p)),\\]
<p>where \\(x^*(p)\\) is the value of \\(x\\) at which \\(px - f(x)\\) is maximized, i.e., \\(p = f'(x^*)\\). The transform replaces the independent variable \\(x\\) with the slope variable \\(p = df/dx\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Legendre Transform of a Quadratic</div>
<div class="env-body">
<p>Let \\(f(x) = \\frac{1}{2}ax^2\\). Then \\(p = f'(x) = ax\\), so \\(x = p/a\\). The Legendre transform is:</p>
\\[g(p) = p \\cdot \\frac{p}{a} - \\frac{1}{2}a\\left(\\frac{p}{a}\\right)^2 = \\frac{p^2}{a} - \\frac{p^2}{2a} = \\frac{p^2}{2a}.\\]
<p>A quadratic in \\(x\\) transforms to a quadratic in \\(p\\). This is exactly what happens with kinetic energy: \\(T = \\frac{1}{2}m\\dot{q}^2\\) becomes \\(T = p^2/(2m)\\).</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why Legendre transform?</div>
<div class="env-body">
<p>The Legendre transform trades one set of natural variables for another without losing any information. In thermodynamics, it converts between internal energy \\(U(S,V)\\) and Helmholtz free energy \\(F(T,V)\\). In mechanics, it converts between \\(L(q,\\dot{q})\\) and \\(H(q,p)\\). The key property: the Legendre transform is its own inverse. Transforming twice gives back the original function.</p>
</div>
</div>

<h3>Constructing the Hamiltonian</h3>

<p>Define the <strong>conjugate momentum</strong> for each generalized coordinate:</p>
\\[p_i = \\frac{\\partial L}{\\partial \\dot{q}_i}.\\]

<p>The Hamiltonian is the Legendre transform of the Lagrangian with respect to all generalized velocities:</p>

<div class="env-block definition">
<div class="env-title">Definition: The Hamiltonian</div>
<div class="env-body">
\\[H(q_i, p_i, t) = \\sum_{i=1}^n p_i \\dot{q}_i - L(q_i, \\dot{q}_i, t),\\]
<p>where each \\(\\dot{q}_i\\) on the right-hand side is expressed in terms of \\(q_i\\) and \\(p_i\\) by inverting \\(p_i = \\partial L / \\partial \\dot{q}_i\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Hamiltonian for a Simple Pendulum</div>
<div class="env-body">
<p>From Ch. 20: \\(L = \\frac{1}{2}m\\ell^2\\dot{\\theta}^2 + mg\\ell\\cos\\theta\\). The conjugate momentum is \\(p_\\theta = m\\ell^2\\dot{\\theta}\\), so \\(\\dot{\\theta} = p_\\theta/(m\\ell^2)\\). The Hamiltonian:</p>
\\[H = p_\\theta\\dot{\\theta} - L = \\frac{p_\\theta^2}{m\\ell^2} - \\frac{1}{2}\\frac{p_\\theta^2}{m\\ell^2} - mg\\ell\\cos\\theta = \\frac{p_\\theta^2}{2m\\ell^2} - mg\\ell\\cos\\theta.\\]
<p>This is \\(T + V\\), the total energy. (This is typical but not universal; see the remark below.)</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: \\(H = T + V\\) When Applicable</div>
<div class="env-body">
<p>If (a) the kinetic energy is a homogeneous quadratic function of the generalized velocities (i.e., the coordinate transformation does not depend explicitly on time) and (b) the potential energy depends only on coordinates (not velocities), then \\(H = T + V\\), the total mechanical energy.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">When \\(H \\neq E\\)</div>
<div class="env-body">
<p>For a bead on a rotating hoop (where the coordinate transformation involves time through \\(\\omega t\\)), the Hamiltonian is <em>not</em> the total energy. The Hamiltonian is always \\(\\sum p_i \\dot{q}_i - L\\), but this equals \\(T + V\\) only under the conditions above. Be precise about this distinction.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-legendre"></div>
`,
                visualizations: [
                    {
                        id: 'viz-legendre',
                        title: 'The Legendre Transform Visualized',
                        description: 'The Legendre transform of a function \\(f(x)\\) replaces the independent variable \\(x\\) with the slope \\(p = f\'(x)\\). The transformed function \\(g(p) = px - f(x)\\) is the vertical intercept of the tangent line with slope \\(p\\). Drag the tangent line to see the transform build point by point.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 50, originX: 200, originY: 280 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var funcType = 0; // 0 = x^2, 1 = x^4/4, 2 = exp(x)
                            var funcNames = ['f(x) = x\u00b2/2', 'f(x) = x\u2074/4', 'f(x) = e\u02e3'];
                            var funcs = [
                                function (x) { return 0.5 * x * x; },
                                function (x) { return 0.25 * x * x * x * x; },
                                function (x) { return Math.exp(x); }
                            ];
                            var derivs = [
                                function (x) { return x; },
                                function (x) { return x * x * x; },
                                function (x) { return Math.exp(x); }
                            ];
                            // Legendre transforms
                            var legendres = [
                                function (p) { return 0.5 * p * p; },
                                function (p) { return 0.75 * Math.pow(Math.abs(p), 4 / 3) * Math.sign(p); },
                                function (p) { return p > 0 ? p * Math.log(p) - p : 0; }
                            ];

                            var slopeX = 1.5; // x position where tangent is drawn

                            for (var fi = 0; fi < funcNames.length; fi++) {
                                (function (idx) {
                                    VizEngine.createButton(controls, funcNames[idx], function () { funcType = idx; });
                                })(fi);
                            }
                            VizEngine.createSlider(controls, 'x position', -3.0, 3.0, slopeX, 0.05, function (v) { slopeX = v; });

                            function draw() {
                                viz.clear();
                                viz.drawGrid(1);
                                viz.drawAxes('x', 'f(x)');

                                var f = funcs[funcType];
                                var df = derivs[funcType];

                                // Draw function
                                viz.drawFunction(f, -4, 4, viz.colors.blue, 2.5);

                                // Tangent at slopeX
                                var fx = f(slopeX);
                                var slope = df(slopeX);
                                var tangentFunc = function (x) { return fx + slope * (x - slopeX); };

                                viz.drawFunction(tangentFunc, -4, 4, viz.colors.orange, 1.5);

                                // Mark point on curve
                                viz.drawPoint(slopeX, fx, viz.colors.orange, '', 6);

                                // y-intercept of tangent = f(x) - x*f'(x) = -(px - f(x)) = -g(p)
                                var yIntercept = fx - slope * slopeX;
                                viz.drawPoint(0, yIntercept, viz.colors.red, '', 5);

                                // g(p) = px - f(x) = -yIntercept
                                var gp = slope * slopeX - fx;

                                // Annotations
                                ctx.fillStyle = viz.colors.bg + 'dd';
                                ctx.fillRect(w - 280, 10, 270, 120);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.strokeRect(w - 280, 10, 270, 120);

                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText(funcNames[funcType], w - 270, 18);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('Tangent at x = ' + slopeX.toFixed(2), w - 270, 38);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.fillText('Slope p = f\'(x) = ' + slope.toFixed(3), w - 270, 58);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('g(p) = px - f(x) = ' + gp.toFixed(3), w - 270, 78);
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('y-intercept = -g(p) = ' + yIntercept.toFixed(3), w - 270, 98);

                                // Labels on graph
                                viz.drawText('(x, f(x))', slopeX + 0.2, fx + 0.3, viz.colors.orange, 11, 'left');
                                viz.drawText('-g(p)', 0.2, yIntercept, viz.colors.red, 11, 'left');
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Compute the Hamiltonian for a particle of mass \\(m\\) in a uniform gravitational field: \\(L = \\frac{1}{2}m(\\dot{x}^2 + \\dot{y}^2) - mgy\\).',
                        hint: 'Find \\(p_x = \\partial L / \\partial \\dot{x}\\) and \\(p_y = \\partial L / \\partial \\dot{y}\\), invert, and compute \\(H = p_x\\dot{x} + p_y\\dot{y} - L\\).',
                        solution: '\\(p_x = m\\dot{x}\\), \\(p_y = m\\dot{y}\\). So \\(\\dot{x} = p_x/m\\), \\(\\dot{y} = p_y/m\\). Then \\(H = \\frac{p_x^2}{m} + \\frac{p_y^2}{m} - \\frac{1}{2m}(p_x^2 + p_y^2) + mgy = \\frac{p_x^2 + p_y^2}{2m} + mgy = T + V\\).'
                    },
                    {
                        question: 'Show that the Legendre transform is its own inverse: if \\(g(p) = px - f(x)\\) where \\(p = f\'(x)\\), then \\(f(x) = px - g(p)\\) where \\(x = g\'(p)\\).',
                        hint: 'Compute \\(g\'(p)\\) using the fact that \\(x\\) depends on \\(p\\) via \\(p = f\'(x)\\).',
                        solution: 'From \\(g(p) = px(p) - f(x(p))\\), differentiate: \\(g\'(p) = x + p\\frac{dx}{dp} - f\'(x)\\frac{dx}{dp} = x + (p - f\'(x))\\frac{dx}{dp} = x\\), since \\(p = f\'(x)\\). Therefore \\(g\'(p) = x\\), and \\(px - g(p) = px - (px - f(x)) = f(x)\\). The Legendre transform of \\(g\\) returns \\(f\\). \\(\\square\\)'
                    }
                ]
            },

            // ============================================================
            // Section 1: Hamilton's Equations
            // ============================================================
            {
                id: 'hamiltons-equations',
                title: 'Hamilton\'s Equations',
                content: `
<h2>First-Order Equations of Motion</h2>

<p>The Euler-Lagrange equations are \\(n\\) second-order ODEs. Hamiltonian mechanics replaces them with \\(2n\\) first-order ODEs, revealing the beautiful symmetry between coordinates and momenta.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Hamilton's Canonical Equations</div>
<div class="env-body">
<p>The equations of motion in Hamiltonian form are:</p>
\\[\\dot{q}_i = \\frac{\\partial H}{\\partial p_i}, \\qquad \\dot{p}_i = -\\frac{\\partial H}{\\partial q_i}, \\qquad i = 1, \\dots, n.\\]
<p>These are <strong>Hamilton's equations</strong> (or the <strong>canonical equations</strong>).</p>
</div>
</div>

<p><strong>Derivation.</strong> Start from \\(H = \\sum_i p_i \\dot{q}_i - L\\). Take the total differential:</p>
\\[dH = \\sum_i \\left(\\dot{q}_i\\, dp_i + p_i\\, d\\dot{q}_i \\right) - \\sum_i \\left(\\frac{\\partial L}{\\partial q_i}dq_i + \\frac{\\partial L}{\\partial \\dot{q}_i}d\\dot{q}_i \\right) - \\frac{\\partial L}{\\partial t}dt.\\]
<p>Since \\(p_i = \\partial L / \\partial \\dot{q}_i\\), the \\(d\\dot{q}_i\\) terms cancel:</p>
\\[dH = \\sum_i \\dot{q}_i\\, dp_i - \\sum_i \\frac{\\partial L}{\\partial q_i}dq_i - \\frac{\\partial L}{\\partial t}dt.\\]
<p>But \\(H\\) is a function of \\(q_i, p_i, t\\), so also \\(dH = \\sum_i \\frac{\\partial H}{\\partial q_i}dq_i + \\sum_i \\frac{\\partial H}{\\partial p_i}dp_i + \\frac{\\partial H}{\\partial t}dt\\). Comparing coefficients:</p>
\\[\\frac{\\partial H}{\\partial p_i} = \\dot{q}_i, \\qquad \\frac{\\partial H}{\\partial q_i} = -\\frac{\\partial L}{\\partial q_i} = -\\dot{p}_i,\\]
<p>where the last equality uses the Euler-Lagrange equation \\(\\dot{p}_i = \\partial L / \\partial q_i\\). Also, \\(\\partial H / \\partial t = -\\partial L / \\partial t\\). \\(\\square\\)</p>

<div class="env-block example">
<div class="env-title">Example: Simple Harmonic Oscillator</div>
<div class="env-body">
<p>\\(H = \\frac{p^2}{2m} + \\frac{1}{2}kx^2\\). Hamilton's equations:</p>
\\[\\dot{x} = \\frac{\\partial H}{\\partial p} = \\frac{p}{m}, \\qquad \\dot{p} = -\\frac{\\partial H}{\\partial x} = -kx.\\]
<p>From the first equation, \\(p = m\\dot{x}\\). Substituting into the second: \\(m\\ddot{x} = -kx\\). We recover \\(\\ddot{x} + \\omega^2 x = 0\\) with \\(\\omega = \\sqrt{k/m}\\).</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">The antisymmetric structure</div>
<div class="env-body">
<p>Notice the sign asymmetry: \\(\\dot{q} = +\\partial H / \\partial p\\) but \\(\\dot{p} = -\\partial H / \\partial q\\). This is a manifestation of the <strong>symplectic structure</strong> of phase space. If we define \\(\\mathbf{z} = (q_1, \\dots, q_n, p_1, \\dots, p_n)\\), Hamilton's equations become \\(\\dot{\\mathbf{z}} = J \\nabla H\\) where \\(J\\) is the symplectic matrix:</p>
\\[J = \\begin{pmatrix} 0 & I_n \\\\ -I_n & 0 \\end{pmatrix}.\\]
<p>This matrix \\(J\\) encodes the fundamental geometric structure of classical mechanics.</p>
</div>
</div>

<h3>Conservation of the Hamiltonian</h3>

<div class="env-block theorem">
<div class="env-title">Theorem: Energy Conservation</div>
<div class="env-body">
<p>If the Hamiltonian has no explicit time dependence (\\(\\partial H / \\partial t = 0\\)), then \\(H\\) is conserved along the motion:</p>
\\[\\frac{dH}{dt} = \\frac{\\partial H}{\\partial t} = 0.\\]
</div>
</div>

<p><strong>Proof.</strong></p>
\\[\\frac{dH}{dt} = \\sum_i \\left(\\frac{\\partial H}{\\partial q_i}\\dot{q}_i + \\frac{\\partial H}{\\partial p_i}\\dot{p}_i\\right) + \\frac{\\partial H}{\\partial t} = \\sum_i \\left(-\\dot{p}_i\\dot{q}_i + \\dot{q}_i\\dot{p}_i\\right) + \\frac{\\partial H}{\\partial t} = \\frac{\\partial H}{\\partial t}.\\]
<p>The first sum vanishes identically by Hamilton's equations. If \\(\\partial H / \\partial t = 0\\), \\(H\\) is constant. \\(\\square\\)</p>

<div class="viz-placeholder" data-viz="viz-hamilton-eqs"></div>
`,
                visualizations: [
                    {
                        id: 'viz-hamilton-eqs',
                        title: 'Hamilton\'s Equations in Action',
                        description: 'For a simple harmonic oscillator, Hamilton\'s equations produce circular (or elliptical) flow in phase space. Watch the state point \\((x, p)\\) trace out a constant-energy curve. The \\(\\dot{x}\\) and \\(\\dot{p}\\) vectors are always tangent to the energy contour.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 300, originY: 200 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var m = 1.0, k = 1.0;
                            var x = 3.0, p = 0.0;
                            var dt = 1 / 60;
                            var running = true;
                            var trail = [];
                            var maxTrail = 600;

                            VizEngine.createSlider(controls, 'k/m', 0.2, 4.0, 1.0, 0.1, function (v) { k = v; trail = []; });
                            VizEngine.createSlider(controls, 'x\u2080', 0.5, 5.0, 3.0, 0.1, function (v) { x = v; p = 0; trail = []; });
                            VizEngine.createButton(controls, 'Play/Pause', function () { running = !running; });
                            VizEngine.createButton(controls, 'Reset', function () { x = 3; p = 0; trail = []; });

                            function draw() {
                                if (running) {
                                    // Hamilton's equations directly: dx/dt = p/m, dp/dt = -kx
                                    var derivs = function (s) { return [s[1] / m, -k * s[0]]; };
                                    var state = VizEngine.rk4([x, p], 0, dt, derivs);
                                    x = state[0]; p = state[1];
                                    trail.push([x, p]);
                                    if (trail.length > maxTrail) trail.shift();
                                }

                                viz.clear();
                                viz.drawGrid(1);
                                viz.drawAxes('x', 'p');

                                // Energy contours (background)
                                var E = 0.5 * p * p / m + 0.5 * k * x * x;
                                for (var ei = 1; ei <= 8; ei++) {
                                    var eVal = ei * 2;
                                    ctx.strokeStyle = viz.colors.grid;
                                    ctx.lineWidth = 0.7;
                                    ctx.beginPath();
                                    // Ellipse: p^2/(2mE) + kx^2/(2E) = 1, so semi-axes: a = sqrt(2E/k), b = sqrt(2mE)
                                    var ax = Math.sqrt(2 * eVal / k);
                                    var bx = Math.sqrt(2 * m * eVal);
                                    var sc = viz.toScreen(0, 0);
                                    ctx.ellipse(sc[0], sc[1], ax * viz.scale, bx * viz.scale, 0, 0, Math.PI * 2);
                                    ctx.stroke();
                                }

                                // Trail
                                viz.drawTrail(trail, viz.colors.teal, 0.7);

                                // Current point
                                viz.drawBall(x, p, 0.12, viz.colors.orange, 2);

                                // Velocity vector (direction of flow in phase space)
                                var dxdt = p / m;
                                var dpdt = -k * x;
                                var vscale = 0.3;
                                viz.drawVector(x, p, dxdt * vscale, dpdt * vscale, viz.colors.yellow, '', 2, 8);

                                // Component arrows
                                viz.drawVector(x, p, dxdt * vscale, 0, viz.colors.blue, '', 1.5, 6);
                                viz.drawVector(x, p, 0, dpdt * vscale, viz.colors.red, '', 1.5, 6);

                                // Info
                                ctx.fillStyle = viz.colors.bg + 'dd';
                                ctx.fillRect(10, 10, 230, 130);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.strokeRect(10, 10, 230, 130);

                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                                ctx.fillStyle = viz.colors.gold;
                                ctx.fillText('H = p\u00b2/2m + kx\u00b2/2', 20, 18);
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('\u1E8B = \u2202H/\u2202p = p/m = ' + dxdt.toFixed(2), 20, 40);
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('\u1E57 = -\u2202H/\u2202x = -kx = ' + dpdt.toFixed(2), 20, 58);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('E = ' + E.toFixed(3) + ' (conserved)', 20, 80);
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('x = ' + x.toFixed(3), 20, 100);
                                ctx.fillText('p = ' + p.toFixed(3), 20, 118);

                                // Legend
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('\u2014 \u1E8B component', w - 160, h - 35);
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillText('\u2014 \u1E57 component', w - 160, h - 18);
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A particle moves in 1D with Hamiltonian \\(H = p^2/(2m) + \\alpha |x|\\) (a V-shaped potential). Write Hamilton\'s equations and describe the motion qualitatively.',
                        hint: 'Be careful with the derivative of \\(|x|\\). Use \\(d|x|/dx = \\text{sgn}(x)\\) for \\(x \\neq 0\\).',
                        solution: '\\(\\dot{x} = p/m\\), \\(\\dot{p} = -\\alpha\\,\\text{sgn}(x)\\). The particle experiences a constant-magnitude restoring force. For \\(x > 0\\), \\(\\ddot{x} = -\\alpha/m\\) (constant deceleration). The motion is piecewise parabolic: the particle bounces back and forth with triangular velocity profile (not sinusoidal like SHM). Phase space trajectories are diamond-shaped, not elliptical.'
                    },
                    {
                        question: 'Show that for a charged particle in an electromagnetic field, the canonical momentum \\(p_i\\) differs from the mechanical momentum \\(m\\dot{x}_i\\).',
                        hint: 'The Lagrangian for a charged particle is \\(L = \\frac{1}{2}m\\dot{\\mathbf{r}}^2 - q\\phi + q\\dot{\\mathbf{r}} \\cdot \\mathbf{A}\\), where \\(\\phi\\) is the scalar potential and \\(\\mathbf{A}\\) is the vector potential.',
                        solution: '\\(p_i = \\partial L / \\partial \\dot{x}_i = m\\dot{x}_i + qA_i\\). So \\(\\mathbf{p} = m\\dot{\\mathbf{r}} + q\\mathbf{A} \\neq m\\dot{\\mathbf{r}}\\). The canonical momentum includes a contribution from the electromagnetic field. This is why in quantum mechanics, the momentum operator must be replaced by \\(\\hat{\\mathbf{p}} - q\\mathbf{A}\\) in the presence of a magnetic field.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Phase Space and Liouville's Theorem
            // ============================================================
            {
                id: 'phase-space-liouville',
                title: 'Phase Space and Liouville\'s Theorem',
                content: `
<h2>The Arena of Hamiltonian Mechanics</h2>

<div class="env-block definition">
<div class="env-title">Definition: Phase Space</div>
<div class="env-body">
<p>The <strong>phase space</strong> of a system with \\(n\\) degrees of freedom is the \\(2n\\)-dimensional space of all generalized coordinates and momenta: \\((q_1, \\dots, q_n, p_1, \\dots, p_n)\\). Each point in phase space represents a complete instantaneous state of the system. The time evolution traces out a <strong>phase space trajectory</strong> (or orbit).</p>
</div>
</div>

<p>For a 1D system (\\(n = 1\\)), phase space is a plane with coordinates \\((q, p)\\). For two coupled oscillators (\\(n = 2\\)), phase space is 4-dimensional. We can visualize 1D systems directly; higher-dimensional systems require projections or cross-sections.</p>

<h3>Phase Portraits</h3>

<p>The <strong>phase portrait</strong> is the collection of all trajectories in phase space. Hamilton's equations define a <strong>flow</strong>: a vector field \\((\\dot{q}, \\dot{p}) = (\\partial H/\\partial p, -\\partial H/\\partial q)\\) at every point. The phase portrait is the integral curve field of this vector field.</p>

<div class="env-block example">
<div class="env-title">Example: Phase Portrait of the Pendulum</div>
<div class="env-body">
<p>\\(H = p_\\theta^2/(2m\\ell^2) - mg\\ell\\cos\\theta\\). The phase portrait has:</p>
<ul>
<li><strong>Closed orbits</strong> near \\(\\theta = 0\\) (libration: the pendulum oscillates back and forth).</li>
<li>A <strong>separatrix</strong> at energy \\(E = mg\\ell\\) passing through \\((\\pm\\pi, 0)\\), separating libration from rotation.</li>
<li><strong>Open orbits</strong> above the separatrix (rotation: the pendulum swings over the top).</li>
</ul>
<p>The separatrix is a curve of infinite period: a pendulum launched with exactly the right energy to reach the top takes infinitely long to get there.</p>
</div>
</div>

<h3>Liouville's Theorem</h3>

<p>Consider not a single trajectory but a <em>cloud</em> of initial conditions occupying a region of phase space. How does this region evolve?</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Liouville's Theorem</div>
<div class="env-body">
<p>The phase space volume occupied by an ensemble of systems is conserved under Hamiltonian evolution. Equivalently, the phase space flow is <strong>incompressible</strong>:</p>
\\[\\frac{\\partial \\dot{q}_i}{\\partial q_i} + \\frac{\\partial \\dot{p}_i}{\\partial p_i} = \\frac{\\partial^2 H}{\\partial q_i \\partial p_i} - \\frac{\\partial^2 H}{\\partial p_i \\partial q_i} = 0.\\]
<p>The divergence of the Hamiltonian flow vanishes identically.</p>
</div>
</div>

<p><strong>Proof.</strong> The phase space "velocity" field is \\(\\mathbf{v} = (\\dot{q}_1, \\dots, \\dot{q}_n, \\dot{p}_1, \\dots, \\dot{p}_n)\\). Its divergence is</p>
\\[\\nabla \\cdot \\mathbf{v} = \\sum_i \\left(\\frac{\\partial \\dot{q}_i}{\\partial q_i} + \\frac{\\partial \\dot{p}_i}{\\partial p_i}\\right) = \\sum_i \\left(\\frac{\\partial^2 H}{\\partial q_i \\partial p_i} - \\frac{\\partial^2 H}{\\partial p_i \\partial q_i}\\right) = 0,\\]
<p>by the symmetry of mixed partial derivatives. By the continuity equation (or the divergence theorem), a region of phase space with zero divergence preserves its volume. \\(\\square\\)</p>

<div class="env-block intuition">
<div class="env-title">Liouville's theorem as incompressible fluid</div>
<div class="env-body">
<p>Think of the phase space flow as an incompressible fluid. The "fluid" can deform, stretch, and swirl, but it cannot compress or expand. A blob of initial conditions may distort into a long, thin filament, but its total volume (area in 2D) remains constant. This is why Hamiltonian systems cannot have attractors: an attractor would require phase space volume to shrink, violating Liouville's theorem.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Connection to statistical mechanics</div>
<div class="env-body">
<p>Liouville's theorem is the foundation of statistical mechanics. The microcanonical ensemble (uniform distribution on a constant-energy surface) is time-invariant because Hamiltonian flow preserves phase space volume. This is why Boltzmann's ergodic hypothesis makes sense: if the system explores all of the energy surface, the time average equals the ensemble average.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-liouville"></div>
`,
                visualizations: [
                    {
                        id: 'viz-liouville',
                        title: 'Liouville\'s Theorem: Phase Space Area Conservation',
                        description: 'A blob of initial conditions evolves under Hamiltonian flow for a simple pendulum. The blob deforms (stretches and squishes) but its total area remains constant. Watch how it wraps and filaments while preserving area. Click "Reset" to start with a fresh blob.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Phase space: theta in [-pi, pi], p_theta in [-range, range]
                            var pRange = 12;
                            var mgl = 9.8; // mg*l combined
                            var Ieff = 1.0; // m*l^2

                            // Ensemble of points
                            var nParticles = 400;
                            var particles = [];
                            var running = true;
                            var dt = 1 / 60;
                            var systemType = 0; // 0=pendulum, 1=SHM, 2=quartic
                            var systemNames = ['Pendulum', 'SHM', 'Quartic V=x\u2074'];

                            function initBlob() {
                                particles = [];
                                var cx = 0.8, cy = 3.0;
                                var rx = 0.5, ry = 2.0;
                                for (var i = 0; i < nParticles; i++) {
                                    // Uniform disk
                                    var angle = Math.random() * 2 * Math.PI;
                                    var rr = Math.sqrt(Math.random());
                                    particles.push({
                                        q: cx + rx * rr * Math.cos(angle),
                                        p: cy + ry * rr * Math.sin(angle)
                                    });
                                }
                            }
                            initBlob();

                            for (var si = 0; si < systemNames.length; si++) {
                                (function (idx) {
                                    VizEngine.createButton(controls, systemNames[idx], function () { systemType = idx; initBlob(); });
                                })(si);
                            }
                            VizEngine.createButton(controls, 'Play/Pause', function () { running = !running; });
                            VizEngine.createButton(controls, 'Reset', function () { initBlob(); });

                            function derivs(s) {
                                if (systemType === 0) {
                                    // Pendulum: H = p^2/(2I) - mgl*cos(q)
                                    return [s[1] / Ieff, -mgl * Math.sin(s[0])];
                                } else if (systemType === 1) {
                                    // SHM: H = p^2/2 + q^2/2
                                    return [s[1], -s[0]];
                                } else {
                                    // Quartic: H = p^2/2 + q^4/4
                                    return [s[1], -s[0] * s[0] * s[0]];
                                }
                            }

                            // Plot coordinate mapping
                            var plotL = 40, plotR = w - 40;
                            var plotT = 40, plotB = h - 40;
                            var plotW = plotR - plotL, plotH = plotB - plotT;

                            function qToSx(q) {
                                return plotL + plotW * (q + Math.PI) / (2 * Math.PI);
                            }
                            function pToSy(p) {
                                return plotT + plotH * (pRange - p) / (2 * pRange);
                            }

                            function draw() {
                                if (running) {
                                    var substeps = 3;
                                    var subdt = dt / substeps;
                                    for (var ss = 0; ss < substeps; ss++) {
                                        for (var i = 0; i < particles.length; i++) {
                                            var pt = particles[i];
                                            var state = VizEngine.rk4([pt.q, pt.p], 0, subdt, derivs);
                                            pt.q = state[0];
                                            pt.p = state[1];
                                            // Wrap theta for pendulum
                                            if (systemType === 0) {
                                                while (pt.q > Math.PI) pt.q -= 2 * Math.PI;
                                                while (pt.q < -Math.PI) pt.q += 2 * Math.PI;
                                            }
                                        }
                                    }
                                }

                                viz.clear();

                                // Background
                                ctx.fillStyle = '#080818';
                                ctx.fillRect(plotL, plotT, plotW, plotH);

                                // Grid lines
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 0.5;
                                for (var gi = -3; gi <= 3; gi++) {
                                    var gx = qToSx(gi);
                                    ctx.beginPath(); ctx.moveTo(gx, plotT); ctx.lineTo(gx, plotB); ctx.stroke();
                                }
                                for (var gj = -10; gj <= 10; gj += 2) {
                                    var gy = pToSy(gj);
                                    ctx.beginPath(); ctx.moveTo(plotL, gy); ctx.lineTo(plotR, gy); ctx.stroke();
                                }

                                // Axes
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1.5;
                                var ax0 = qToSx(0);
                                var ay0 = pToSy(0);
                                ctx.beginPath(); ctx.moveTo(plotL, ay0); ctx.lineTo(plotR, ay0); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(ax0, plotT); ctx.lineTo(ax0, plotB); ctx.stroke();

                                // Draw energy contours for reference (faint)
                                if (systemType === 0) {
                                    // Separatrix: E = mgl
                                    ctx.strokeStyle = viz.colors.red + '44';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    var started = false;
                                    for (var qi = 0; qi <= 200; qi++) {
                                        var qv = -Math.PI + 2 * Math.PI * qi / 200;
                                        var pv2 = 2 * Ieff * (mgl + mgl * Math.cos(qv));
                                        if (pv2 < 0) { started = false; continue; }
                                        var pv = Math.sqrt(pv2);
                                        var sx = qToSx(qv), sy = pToSy(pv);
                                        if (!started) { ctx.moveTo(sx, sy); started = true; }
                                        else ctx.lineTo(sx, sy);
                                    }
                                    ctx.stroke();
                                    ctx.beginPath(); started = false;
                                    for (var qi2 = 0; qi2 <= 200; qi2++) {
                                        var qv2 = -Math.PI + 2 * Math.PI * qi2 / 200;
                                        var pv2b = 2 * Ieff * (mgl + mgl * Math.cos(qv2));
                                        if (pv2b < 0) { started = false; continue; }
                                        var pvn = -Math.sqrt(pv2b);
                                        var sx2 = qToSx(qv2), sy2 = pToSy(pvn);
                                        if (!started) { ctx.moveTo(sx2, sy2); started = true; }
                                        else ctx.lineTo(sx2, sy2);
                                    }
                                    ctx.stroke();
                                }

                                // Draw particles
                                for (var i = 0; i < particles.length; i++) {
                                    var pt = particles[i];
                                    var sx = systemType === 0 ? qToSx(pt.q) : plotL + plotW * (pt.q + 5) / 10;
                                    var sy = pToSy(pt.p);
                                    if (sx < plotL || sx > plotR || sy < plotT || sy > plotB) continue;
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.globalAlpha = 0.7;
                                    ctx.beginPath();
                                    ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                                ctx.globalAlpha = 1;

                                // Labels
                                viz.screenText(systemType === 0 ? '\u03b8' : 'q', plotR + 5, ay0, viz.colors.text, 13, 'left', 'middle');
                                viz.screenText('p', ax0, plotT - 8, viz.colors.text, 13, 'center', 'bottom');

                                // Title
                                viz.screenText('Liouville: ' + systemNames[systemType] + ' Phase Space', w / 2, 15, viz.colors.white, 15, 'center');

                                // Area info
                                viz.screenText('Area of blob is CONSERVED (Liouville)', w / 2, h - 12, viz.colors.gold, 11, 'center');
                                if (systemType === 0) {
                                    viz.screenText('Red: separatrix', plotR - 60, plotT + 10, viz.colors.red, 10, 'center');
                                }
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Verify Liouville\'s theorem explicitly for the simple harmonic oscillator by showing that the phase space flow has zero divergence.',
                        hint: 'Hamilton\'s equations give \\(\\dot{x} = p/m\\), \\(\\dot{p} = -kx\\). Compute \\(\\partial \\dot{x}/\\partial x + \\partial \\dot{p}/\\partial p\\).',
                        solution: '\\(\\partial \\dot{x}/\\partial x = \\partial(p/m)/\\partial x = 0\\). \\(\\partial \\dot{p}/\\partial p = \\partial(-kx)/\\partial p = 0\\). Divergence = \\(0 + 0 = 0\\). The flow is incompressible, confirming Liouville.'
                    },
                    {
                        question: 'Why can a Hamiltonian system not have a limit cycle attractor? (Contrast with a damped oscillator, which does have an attractor at the origin.)',
                        hint: 'Think about what an attractor does to phase space volume.',
                        solution: 'An attractor draws all nearby trajectories toward itself, compressing phase space volume into a lower-dimensional set (a point, a cycle, etc.). This compression requires \\(\\nabla \\cdot \\mathbf{v} < 0\\), which is impossible for Hamiltonian flow where \\(\\nabla \\cdot \\mathbf{v} = 0\\). A damped oscillator is not Hamiltonian (it dissipates energy), so Liouville does not apply and attractors are allowed.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Poisson Brackets
            // ============================================================
            {
                id: 'poisson-brackets',
                title: 'Poisson Brackets',
                content: `
<h2>The Algebraic Structure of Mechanics</h2>

<p>Poisson brackets provide an algebraic language for Hamiltonian mechanics that foreshadows quantum mechanics. Every statement about time evolution, conservation laws, and symmetries can be phrased in terms of Poisson brackets.</p>

<div class="env-block definition">
<div class="env-title">Definition: Poisson Bracket</div>
<div class="env-body">
<p>For any two functions \\(f(q_i, p_i, t)\\) and \\(g(q_i, p_i, t)\\) on phase space, the <strong>Poisson bracket</strong> is</p>
\\[\\{f, g\\} = \\sum_{i=1}^{n} \\left(\\frac{\\partial f}{\\partial q_i}\\frac{\\partial g}{\\partial p_i} - \\frac{\\partial f}{\\partial p_i}\\frac{\\partial g}{\\partial q_i}\\right).\\]
</div>
</div>

<h3>Fundamental Brackets</h3>

<p>The canonical coordinates and momenta satisfy:</p>
\\[\\{q_i, q_j\\} = 0, \\qquad \\{p_i, p_j\\} = 0, \\qquad \\{q_i, p_j\\} = \\delta_{ij}.\\]
<p>These are the <strong>fundamental Poisson brackets</strong>. They encode the entire structure of classical mechanics.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Time Evolution via Poisson Brackets</div>
<div class="env-body">
<p>The time evolution of any phase space function \\(f(q_i, p_i, t)\\) is given by</p>
\\[\\frac{df}{dt} = \\{f, H\\} + \\frac{\\partial f}{\\partial t}.\\]
<p>In particular, Hamilton's equations themselves are:</p>
\\[\\dot{q}_i = \\{q_i, H\\}, \\qquad \\dot{p}_i = \\{p_i, H\\}.\\]
</div>
</div>

<p><strong>Proof.</strong></p>
\\[\\frac{df}{dt} = \\sum_i \\left(\\frac{\\partial f}{\\partial q_i}\\dot{q}_i + \\frac{\\partial f}{\\partial p_i}\\dot{p}_i\\right) + \\frac{\\partial f}{\\partial t} = \\sum_i \\left(\\frac{\\partial f}{\\partial q_i}\\frac{\\partial H}{\\partial p_i} - \\frac{\\partial f}{\\partial p_i}\\frac{\\partial H}{\\partial q_i}\\right) + \\frac{\\partial f}{\\partial t} = \\{f, H\\} + \\frac{\\partial f}{\\partial t}. \\quad \\square\\]

<div class="env-block theorem">
<div class="env-title">Theorem: Conservation and Poisson Brackets</div>
<div class="env-body">
<p>A quantity \\(f(q_i, p_i)\\) (with no explicit time dependence) is a constant of the motion if and only if \\(\\{f, H\\} = 0\\). Moreover, if \\(f\\) and \\(g\\) are both constants of the motion, then so is \\(\\{f, g\\}\\) (Poisson's theorem).</p>
</div>
</div>

<h3>Properties of the Poisson Bracket</h3>

<p>The Poisson bracket is:</p>
<ol>
<li><strong>Antisymmetric:</strong> \\(\\{f, g\\} = -\\{g, f\\}\\)</li>
<li><strong>Linear:</strong> \\(\\{\\alpha f + \\beta g, h\\} = \\alpha\\{f, h\\} + \\beta\\{g, h\\}\\)</li>
<li><strong>Leibniz rule:</strong> \\(\\{fg, h\\} = f\\{g, h\\} + \\{f, h\\}g\\)</li>
<li><strong>Jacobi identity:</strong> \\(\\{f, \\{g, h\\}\\} + \\{g, \\{h, f\\}\\} + \\{h, \\{f, g\\}\\} = 0\\)</li>
</ol>

<p>These properties make the space of phase space functions a <strong>Lie algebra</strong> under the Poisson bracket. This algebraic structure is the classical precursor to quantum mechanics.</p>

<div class="env-block intuition">
<div class="env-title">The road to quantum mechanics</div>
<div class="env-body">
<p>Dirac observed that if we replace the Poisson bracket \\(\\{f, g\\}\\) with the commutator \\(\\frac{1}{i\\hbar}[\\hat{f}, \\hat{g}]\\), we obtain quantum mechanics. The fundamental bracket \\(\\{q, p\\} = 1\\) becomes \\([\\hat{q}, \\hat{p}] = i\\hbar\\), the canonical commutation relation. Hamilton's equation \\(\\dot{f} = \\{f, H\\}\\) becomes the Heisenberg equation of motion \\(i\\hbar\\, d\\hat{f}/dt = [\\hat{f}, \\hat{H}]\\). Classical mechanics is the \\(\\hbar \\to 0\\) limit of quantum mechanics, and Poisson brackets are the \\(\\hbar \\to 0\\) limit of commutators.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Angular Momentum Poisson Brackets</div>
<div class="env-body">
<p>For a particle in 3D, the angular momentum components are \\(L_x = yp_z - zp_y\\), \\(L_y = zp_x - xp_z\\), \\(L_z = xp_y - yp_x\\). A direct computation gives:</p>
\\[\\{L_x, L_y\\} = L_z, \\qquad \\{L_y, L_z\\} = L_x, \\qquad \\{L_z, L_x\\} = L_y.\\]
<p>This is the Lie algebra \\(\\mathfrak{so}(3)\\), the same algebra that governs rotations in 3D. In quantum mechanics, these become \\([\\hat{L}_x, \\hat{L}_y] = i\\hbar\\hat{L}_z\\), etc.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-poisson"></div>
`,
                visualizations: [
                    {
                        id: 'viz-poisson',
                        title: 'Poisson Bracket and Phase Space Flow',
                        description: 'The Poisson bracket \\(\\{f, H\\}\\) measures how \\(f\\) changes along the Hamiltonian flow. This visualization shows contours of \\(H\\) (energy) and a second function \\(f\\), with the Poisson bracket displayed at each point. Where \\(\\{f, H\\} = 0\\), \\(f\\) is locally conserved.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 280, originY: 200 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var funcType = 0;
                            var funcNames = ['f = p (momentum)', 'f = q (position)', 'f = q\u00b2+p\u00b2 (energy)', 'f = qp'];

                            for (var fi = 0; fi < funcNames.length; fi++) {
                                (function (idx) {
                                    VizEngine.createButton(controls, funcNames[idx], function () { funcType = idx; });
                                })(fi);
                            }

                            // SHM Hamiltonian: H = p^2/2 + q^2/2 (m=k=1)
                            function H(q, p) { return 0.5 * p * p + 0.5 * q * q; }
                            function fFunc(q, p) {
                                if (funcType === 0) return p;
                                if (funcType === 1) return q;
                                if (funcType === 2) return q * q + p * p;
                                return q * p;
                            }
                            // {f, H} computed analytically
                            function poissonBracket(q, p) {
                                if (funcType === 0) return -q;   // {p, H} = -dH/dq = -q
                                if (funcType === 1) return p;     // {q, H} = dH/dp = p
                                if (funcType === 2) return 0;     // {H, H} = 0
                                return p * p - q * q;             // {qp, H}
                            }

                            function draw() {
                                viz.clear();
                                viz.drawGrid(1);
                                viz.drawAxes('q', 'p');

                                // Energy contours
                                for (var ei = 1; ei <= 6; ei++) {
                                    var eR = Math.sqrt(2 * ei);
                                    ctx.strokeStyle = viz.colors.blue + '33';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    var sc = viz.toScreen(0, 0);
                                    ctx.arc(sc[0], sc[1], eR * viz.scale, 0, Math.PI * 2);
                                    ctx.stroke();
                                }

                                // Color field for Poisson bracket
                                var step = 8;
                                for (var sx = 0; sx < w; sx += step) {
                                    for (var sy = 0; sy < h; sy += step) {
                                        var coords = viz.toMath(sx + step / 2, sy + step / 2);
                                        var qv = coords[0], pv = coords[1];
                                        var pb = poissonBracket(qv, pv);
                                        var maxPb = 5;
                                        var norm = Math.max(-1, Math.min(1, pb / maxPb));
                                        // Red = positive, blue = negative, dark = zero
                                        var r, gg, b;
                                        if (norm > 0) {
                                            r = Math.floor(norm * 180);
                                            gg = Math.floor(norm * 40);
                                            b = 20;
                                        } else {
                                            r = 20;
                                            gg = Math.floor(-norm * 40);
                                            b = Math.floor(-norm * 180);
                                        }
                                        ctx.fillStyle = 'rgba(' + r + ',' + gg + ',' + b + ',0.35)';
                                        ctx.fillRect(sx, sy, step, step);
                                    }
                                }

                                // Flow arrows
                                for (var qg = -5; qg <= 5; qg += 1.5) {
                                    for (var pg = -4; pg <= 4; pg += 1.5) {
                                        var dq = pg;     // dH/dp = p
                                        var dp = -qg;    // -dH/dq = -q
                                        var mag = Math.sqrt(dq * dq + dp * dp);
                                        if (mag < 0.1) continue;
                                        var sc2 = 0.25 / Math.max(mag, 1);
                                        ctx.strokeStyle = viz.colors.text + '66';
                                        ctx.lineWidth = 1;
                                        var s1 = viz.toScreen(qg, pg);
                                        var s2 = viz.toScreen(qg + dq * sc2, pg + dp * sc2);
                                        ctx.beginPath();
                                        ctx.moveTo(s1[0], s1[1]);
                                        ctx.lineTo(s2[0], s2[1]);
                                        ctx.stroke();
                                        // Small arrowhead
                                        var ang = Math.atan2(s2[1] - s1[1], s2[0] - s1[0]);
                                        ctx.beginPath();
                                        ctx.moveTo(s2[0], s2[1]);
                                        ctx.lineTo(s2[0] - 5 * Math.cos(ang - 0.4), s2[1] - 5 * Math.sin(ang - 0.4));
                                        ctx.lineTo(s2[0] - 5 * Math.cos(ang + 0.4), s2[1] - 5 * Math.sin(ang + 0.4));
                                        ctx.closePath();
                                        ctx.fillStyle = viz.colors.text + '66';
                                        ctx.fill();
                                    }
                                }

                                // Info
                                ctx.fillStyle = viz.colors.bg + 'ee';
                                ctx.fillRect(10, 10, 260, 85);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.strokeRect(10, 10, 260, 85);

                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                                ctx.fillStyle = viz.colors.gold;
                                ctx.fillText('H = p\u00b2/2 + q\u00b2/2  (SHM)', 20, 18);
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText(funcNames[funcType], 20, 38);
                                ctx.fillStyle = viz.colors.teal;
                                var pbLabel;
                                if (funcType === 0) pbLabel = '{f, H} = -q';
                                else if (funcType === 1) pbLabel = '{f, H} = p';
                                else if (funcType === 2) pbLabel = '{f, H} = 0 (conserved!)';
                                else pbLabel = '{f, H} = p\u00b2 - q\u00b2';
                                ctx.fillText(pbLabel, 20, 58);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.fillText('Red = {f,H}>0 (f increasing), Blue = {f,H}<0', 20, 78);
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Compute \\(\\{L_x, L_y\\}\\) directly from the definition, where \\(L_x = yp_z - zp_y\\) and \\(L_y = zp_x - xp_z\\).',
                        hint: 'Use \\(\\{f, g\\} = \\sum_i (\\partial f/\\partial q_i)(\\partial g/\\partial p_i) - (\\partial f/\\partial p_i)(\\partial g/\\partial q_i)\\). Only terms involving the same coordinate-momentum pair contribute.',
                        solution: '\\(\\{L_x, L_y\\} = \\frac{\\partial L_x}{\\partial y}\\frac{\\partial L_y}{\\partial p_y} - \\frac{\\partial L_x}{\\partial p_y}\\frac{\\partial L_y}{\\partial y} + \\frac{\\partial L_x}{\\partial z}\\frac{\\partial L_y}{\\partial p_z} - \\frac{\\partial L_x}{\\partial p_z}\\frac{\\partial L_y}{\\partial z} + \\frac{\\partial L_x}{\\partial x}\\frac{\\partial L_y}{\\partial p_x} - \\frac{\\partial L_x}{\\partial p_x}\\frac{\\partial L_y}{\\partial x}\\). Computing each: \\(= (p_z)(0) - (-z)(0) + (-p_y)(-1)(0) - (y)(p_x)\\)... Working carefully: \\(= p_z \\cdot 0 - (-z) \\cdot 0 + (-p_y)(-x) - y \\cdot p_x\\)... wait, let me be systematic. \\(\\partial L_x/\\partial x = 0\\), \\(\\partial L_x/\\partial y = p_z\\), \\(\\partial L_x/\\partial z = -p_y\\), \\(\\partial L_x/\\partial p_x = 0\\), \\(\\partial L_x/\\partial p_y = -z\\), \\(\\partial L_x/\\partial p_z = y\\). Similarly \\(\\partial L_y/\\partial x = -p_z\\), \\(\\partial L_y/\\partial y = 0\\), \\(\\partial L_y/\\partial z = p_x\\), \\(\\partial L_y/\\partial p_x = z\\), \\(\\partial L_y/\\partial p_y = 0\\), \\(\\partial L_y/\\partial p_z = -x\\). Then \\(\\{L_x,L_y\\} = 0 \\cdot z + p_z \\cdot 0 + (-p_y)(-x) - 0 \\cdot (-p_z) - (-z) \\cdot 0 - y \\cdot p_x\\)... more carefully by the sum: \\(\\sum_i [\\partial_{q_i} L_x \\cdot \\partial_{p_i} L_y - \\partial_{p_i} L_x \\cdot \\partial_{q_i} L_y]\\). For \\(i=x\\): \\(0 \\cdot z - 0 \\cdot (-p_z) = 0\\). For \\(i=y\\): \\(p_z \\cdot 0 - (-z) \\cdot 0 = 0\\). For \\(i=z\\): \\((-p_y)(-x) - y \\cdot p_x = xp_y - yp_x = L_z\\). So \\(\\{L_x, L_y\\} = L_z\\). \\(\\square\\)'
                    },
                    {
                        question: 'Prove Poisson\'s theorem: if \\(\\{f, H\\} = 0\\) and \\(\\{g, H\\} = 0\\), then \\(\\{\\{f,g\\}, H\\} = 0\\).',
                        hint: 'Use the Jacobi identity.',
                        solution: 'The Jacobi identity gives \\(\\{\\{f,g\\}, H\\} + \\{\\{g,H\\}, f\\} + \\{\\{H,f\\}, g\\} = 0\\). Since \\(\\{g,H\\} = 0\\) and \\(\\{H,f\\} = -\\{f,H\\} = 0\\), the second and third terms vanish, giving \\(\\{\\{f,g\\}, H\\} = 0\\). Therefore \\(\\{f,g\\}\\) is also a constant of the motion. \\(\\square\\)'
                    }
                ]
            },

            // ============================================================
            // Section 4: Phase Space Portraits and the Grand Finale
            // ============================================================
            {
                id: 'phase-portraits-finale',
                title: 'Phase Space Portraits: From Order to Chaos',
                content: `
<h2>Reading Phase Space</h2>

<p>The power of Hamiltonian mechanics is best appreciated visually. The phase portrait encodes the complete qualitative behavior of a system: equilibria, oscillations, rotations, separatrices, and chaos are all visible at a glance.</p>

<h3>Simple Harmonic Oscillator</h3>

<p>\\(H = p^2/(2m) + kx^2/2\\). Constant-energy curves are ellipses \\(p^2/(2mE) + kx^2/(2E) = 1\\). The flow is clockwise (for our sign convention). All orbits are closed; the system is periodic at every energy. This is the simplest possible phase portrait.</p>

<h3>The Pendulum</h3>

<p>\\(H = p_\\theta^2/(2m\\ell^2) - mg\\ell\\cos\\theta\\). The phase portrait is much richer:</p>
<ul>
<li><strong>Libration</strong> (\\(E < mg\\ell\\)): closed orbits around \\(\\theta = 0\\), the pendulum swings back and forth.</li>
<li><strong>Separatrix</strong> (\\(E = mg\\ell\\)): the trajectory that connects the unstable equilibrium \\(\\theta = \\pm\\pi\\). Period is infinite.</li>
<li><strong>Rotation</strong> (\\(E > mg\\ell\\)): open orbits (in the \\(\\theta\\) direction), the pendulum swings over the top.</li>
<li><strong>Unstable equilibrium</strong> at \\((\\pm\\pi, 0)\\): a hyperbolic (saddle) fixed point.</li>
<li><strong>Stable equilibrium</strong> at \\((0, 0)\\): an elliptic fixed point.</li>
</ul>

<h3>The Duffing Oscillator and Chaos</h3>

<p>The <strong>Duffing oscillator</strong> is a nonlinear oscillator with Hamiltonian</p>
\\[H = \\frac{p^2}{2m} - \\frac{\\alpha}{2}x^2 + \\frac{\\beta}{4}x^4\\]
<p>for \\(\\alpha, \\beta > 0\\) (double-well potential). The undriven system is integrable (energy conservation gives all trajectories). But add a periodic driving force \\(F_0\\cos(\\omega t)\\) and the system becomes non-integrable: it exhibits chaos.</p>

<p>For driven systems, the Hamiltonian depends explicitly on time, so energy is not conserved. The phase space is 3D (\\(x, p, t\\)), and we visualize it using a <strong>Poincare section</strong>: sample \\((x, p)\\) at fixed intervals of \\(t\\) (stroboscopic map, once per drive period). Regular motion produces curves; chaotic motion fills regions.</p>

<div class="env-block definition">
<div class="env-title">Definition: Poincare Section</div>
<div class="env-body">
<p>A <strong>Poincare section</strong> (or <strong>stroboscopic map</strong>) for a periodically driven system with period \\(T\\) is the set of points \\((x(nT), p(nT))\\) for \\(n = 0, 1, 2, \\dots\\). It reduces a continuous flow in 3D (\\(x, p, t\\)) to a discrete map in 2D.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: KAM (Kolmogorov-Arnold-Moser)</div>
<div class="env-body">
<p>For a nearly integrable Hamiltonian system (small perturbation from an integrable one), most invariant tori survive the perturbation (they are slightly deformed but not destroyed). However, tori with rational frequency ratios are destroyed, and thin chaotic layers appear near them. As the perturbation increases, more tori break up, and the chaotic sea expands.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The hierarchy of classical mechanics</div>
<div class="env-body">
<p>We have now traversed the full arc of classical mechanics: from Newton's laws (vectors, forces, specific coordinates) to Lagrangian mechanics (scalars, energy, generalized coordinates, constraints made invisible) to Hamiltonian mechanics (phase space, symplectic geometry, conservation from algebra, direct road to quantum mechanics). Each formulation is equivalent in content but offers different insights. The Hamiltonian formulation is the one that generalizes: to statistical mechanics (Liouville), to quantum mechanics (Poisson brackets become commutators), and to field theory (infinite-dimensional phase space).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-phase-portraits"></div>
`,
                visualizations: [
                    {
                        id: 'viz-phase-portraits',
                        title: 'Grand Finale: Phase Space Portraits',
                        description: 'Three systems side by side. SHM (perfect ellipses), the simple pendulum (with separatrix), and the driven Duffing oscillator (Poincare section showing coexistence of regular islands and chaotic sea). This is the culmination of analytical mechanics.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var viewMode = 0; // 0=SHM, 1=Pendulum, 2=Poincare
                            var viewNames = ['SHM Ellipses', 'Pendulum Separatrix', 'Poincar\u00e9 Section'];

                            for (var vi = 0; vi < viewNames.length; vi++) {
                                (function (idx) {
                                    VizEngine.createButton(controls, viewNames[idx], function () {
                                        viewMode = idx;
                                        if (idx === 2) { poincarePoints = []; poincareComputed = false; }
                                    });
                                })(vi);
                            }

                            // Poincare section state
                            var poincarePoints = [];
                            var poincareComputed = false;
                            var poincareRunning = false;

                            // Poincare parameters
                            var F0 = 0.3, omegaDr = 1.0, alpha = 1.0, beta = 1.0, gamma = 0.15;
                            VizEngine.createSlider(controls, 'Drive F\u2080', 0.0, 1.5, F0, 0.05, function (v) {
                                F0 = v; poincarePoints = []; poincareComputed = false;
                            });

                            VizEngine.createButton(controls, 'Compute Poincar\u00e9', function () {
                                poincareRunning = true;
                            });

                            // Plot region
                            var plotL = 50, plotR = w - 50;
                            var plotT = 50, plotB = h - 30;
                            var plotW = plotR - plotL, plotH2 = plotB - plotT;
                            var plotCx = (plotL + plotR) / 2, plotCy = (plotT + plotB) / 2;

                            function draw() {
                                viz.clear();

                                // Title
                                viz.screenText(viewNames[viewMode], w / 2, 20, viz.colors.white, 16, 'center');

                                // Plot background
                                ctx.fillStyle = '#080818';
                                ctx.fillRect(plotL, plotT, plotW, plotH2);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.strokeRect(plotL, plotT, plotW, plotH2);

                                // Axes
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(plotL, plotCy); ctx.lineTo(plotR, plotCy); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(plotCx, plotT); ctx.lineTo(plotCx, plotB); ctx.stroke();

                                if (viewMode === 0) {
                                    // SHM: ellipses
                                    var qRange = 5, pRange = 5;
                                    function shmQtoSx(q) { return plotCx + (q / qRange) * plotW * 0.45; }
                                    function shmPtoSy(p) { return plotCy - (p / pRange) * plotH2 * 0.45; }

                                    // Draw several energy contours
                                    var energies = [0.5, 1, 2, 3.5, 5, 7, 9, 12];
                                    var eColors = [viz.colors.blue, viz.colors.teal, viz.colors.green, viz.colors.cyan,
                                                   viz.colors.yellow, viz.colors.orange, viz.colors.pink, viz.colors.red];
                                    for (var ei = 0; ei < energies.length; ei++) {
                                        var E = energies[ei];
                                        // p^2/2 + q^2/2 = E, so semi-axes = sqrt(2E)
                                        var a = Math.sqrt(2 * E);
                                        ctx.strokeStyle = eColors[ei];
                                        ctx.lineWidth = 2;
                                        ctx.beginPath();
                                        for (var ai = 0; ai <= 100; ai++) {
                                            var ang = 2 * Math.PI * ai / 100;
                                            var qq = a * Math.cos(ang);
                                            var pp = a * Math.sin(ang);
                                            var sx = shmQtoSx(qq), sy = shmPtoSy(pp);
                                            if (ai === 0) ctx.moveTo(sx, sy);
                                            else ctx.lineTo(sx, sy);
                                        }
                                        ctx.closePath();
                                        ctx.stroke();
                                    }

                                    // Flow arrows
                                    for (var qi2 = -4; qi2 <= 4; qi2 += 2) {
                                        for (var pi2 = -4; pi2 <= 4; pi2 += 2) {
                                            if (qi2 === 0 && pi2 === 0) continue;
                                            var dq = pi2, dp = -qi2;
                                            var mag = Math.sqrt(dq * dq + dp * dp);
                                            var sc = 0.5;
                                            var s1x = shmQtoSx(qi2), s1y = shmPtoSy(pi2);
                                            var s2x = shmQtoSx(qi2 + dq * sc / mag), s2y = shmPtoSy(pi2 + dp * sc / mag);
                                            ctx.strokeStyle = viz.colors.text + '88';
                                            ctx.lineWidth = 1;
                                            ctx.beginPath(); ctx.moveTo(s1x, s1y); ctx.lineTo(s2x, s2y); ctx.stroke();
                                            var an = Math.atan2(s2y - s1y, s2x - s1x);
                                            ctx.fillStyle = viz.colors.text + '88';
                                            ctx.beginPath();
                                            ctx.moveTo(s2x, s2y);
                                            ctx.lineTo(s2x - 5 * Math.cos(an - 0.4), s2y - 5 * Math.sin(an - 0.4));
                                            ctx.lineTo(s2x - 5 * Math.cos(an + 0.4), s2y - 5 * Math.sin(an + 0.4));
                                            ctx.closePath(); ctx.fill();
                                        }
                                    }

                                    viz.screenText('q', plotR - 10, plotCy + 14, viz.colors.text, 12, 'center');
                                    viz.screenText('p', plotCx + 14, plotT + 5, viz.colors.text, 12, 'left', 'top');
                                    viz.screenText('All orbits are closed ellipses (integrable)', w / 2, h - 10, viz.colors.teal, 11, 'center');

                                } else if (viewMode === 1) {
                                    // Pendulum phase portrait
                                    var thRange = Math.PI * 1.2, pthRange = 15;
                                    function pendThtoSx(th) { return plotCx + (th / thRange) * plotW * 0.45; }
                                    function pendPtoSy(p) { return plotCy - (p / pthRange) * plotH2 * 0.45; }

                                    var mgl = 9.8, I = 1.0;

                                    // Draw energy contours
                                    var nContours = 15;
                                    for (var ci = 0; ci < nContours; ci++) {
                                        var E = -mgl + (ci + 0.5) * mgl * 0.3;
                                        var isSepar = Math.abs(E - mgl) < mgl * 0.05;
                                        ctx.strokeStyle = isSepar ? viz.colors.red : viz.colors.teal + '77';
                                        ctx.lineWidth = isSepar ? 2.5 : 1.2;
                                        // p^2/(2I) = E + mgl*cos(theta)
                                        // Plot upper and lower branches
                                        ctx.beginPath();
                                        var started = false;
                                        for (var ti = 0; ti <= 300; ti++) {
                                            var th = -Math.PI + 2 * Math.PI * ti / 300;
                                            var p2 = 2 * I * (E + mgl * Math.cos(th));
                                            if (p2 < 0) { started = false; continue; }
                                            var pp = Math.sqrt(p2);
                                            var sx = pendThtoSx(th), sy = pendPtoSy(pp);
                                            if (sx < plotL || sx > plotR) { started = false; continue; }
                                            if (!started) { ctx.moveTo(sx, sy); started = true; }
                                            else ctx.lineTo(sx, sy);
                                        }
                                        ctx.stroke();
                                        // Lower branch
                                        ctx.beginPath(); started = false;
                                        for (var ti2 = 0; ti2 <= 300; ti2++) {
                                            var th2 = -Math.PI + 2 * Math.PI * ti2 / 300;
                                            var p22 = 2 * I * (E + mgl * Math.cos(th2));
                                            if (p22 < 0) { started = false; continue; }
                                            var ppn = -Math.sqrt(p22);
                                            var sx2 = pendThtoSx(th2), sy2 = pendPtoSy(ppn);
                                            if (sx2 < plotL || sx2 > plotR) { started = false; continue; }
                                            if (!started) { ctx.moveTo(sx2, sy2); started = true; }
                                            else ctx.lineTo(sx2, sy2);
                                        }
                                        ctx.stroke();
                                    }

                                    // Mark fixed points
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.beginPath();
                                    ctx.arc(pendThtoSx(0), pendPtoSy(0), 6, 0, Math.PI * 2);
                                    ctx.fill();
                                    viz.screenText('stable', pendThtoSx(0), pendPtoSy(0) + 15, viz.colors.green, 10, 'center');

                                    // Unstable at +/- pi (draw X)
                                    var uxR = pendThtoSx(Math.PI), uxL = pendThtoSx(-Math.PI);
                                    var uy = pendPtoSy(0);
                                    ctx.strokeStyle = viz.colors.red;
                                    ctx.lineWidth = 2;
                                    var mk2 = 6;
                                    if (uxR <= plotR) {
                                        ctx.beginPath(); ctx.moveTo(uxR - mk2, uy - mk2); ctx.lineTo(uxR + mk2, uy + mk2); ctx.stroke();
                                        ctx.beginPath(); ctx.moveTo(uxR + mk2, uy - mk2); ctx.lineTo(uxR - mk2, uy + mk2); ctx.stroke();
                                    }
                                    if (uxL >= plotL) {
                                        ctx.beginPath(); ctx.moveTo(uxL - mk2, uy - mk2); ctx.lineTo(uxL + mk2, uy + mk2); ctx.stroke();
                                        ctx.beginPath(); ctx.moveTo(uxL + mk2, uy - mk2); ctx.lineTo(uxL - mk2, uy + mk2); ctx.stroke();
                                    }

                                    viz.screenText('\u03b8', plotR - 10, plotCy + 14, viz.colors.text, 12, 'center');
                                    viz.screenText('p_\u03b8', plotCx + 14, plotT + 5, viz.colors.text, 12, 'left', 'top');
                                    viz.screenText('Red = separatrix (E = mgl), divides libration from rotation', w / 2, h - 10, viz.colors.red, 11, 'center');

                                } else {
                                    // Poincare section for driven Duffing
                                    var xRange = 3, pRange2 = 4;
                                    function duffXtoSx(xv) { return plotCx + (xv / xRange) * plotW * 0.45; }
                                    function duffPtoSy(pv) { return plotCy - (pv / pRange2) * plotH2 * 0.45; }

                                    // Compute Poincare points if requested
                                    if (poincareRunning && !poincareComputed) {
                                        // Driven damped Duffing: x'' = alpha*x - beta*x^3 - gamma*x' + F0*cos(omega*t)
                                        // State: [x, p, t]
                                        var period = 2 * Math.PI / omegaDr;
                                        var nOrbits = 20;
                                        var transient = 200;
                                        var nSections = 500;
                                        var dtP = 0.01;

                                        function duffDerivs(s, t) {
                                            return [s[1], alpha * s[0] - beta * s[0] * s[0] * s[0] - gamma * s[1] + F0 * Math.cos(omegaDr * t)];
                                        }

                                        for (var orb = 0; orb < nOrbits; orb++) {
                                            var x0 = (Math.random() - 0.5) * 4;
                                            var p0 = (Math.random() - 0.5) * 4;
                                            var st = [x0, p0];
                                            var t = 0;

                                            // Transient
                                            for (var tr = 0; tr < transient; tr++) {
                                                var tTarget = (tr + 1) * period;
                                                while (t < tTarget - dtP * 0.5) {
                                                    var step = Math.min(dtP, tTarget - t);
                                                    st = VizEngine.rk4(st, t, step, duffDerivs);
                                                    t += step;
                                                }
                                            }

                                            // Collect sections
                                            for (var ns = 0; ns < nSections; ns++) {
                                                var tTarget2 = t + period;
                                                while (t < tTarget2 - dtP * 0.5) {
                                                    var step2 = Math.min(dtP, tTarget2 - t);
                                                    st = VizEngine.rk4(st, t, step2, duffDerivs);
                                                    t += step2;
                                                }
                                                if (Math.abs(st[0]) < xRange * 1.5 && Math.abs(st[1]) < pRange2 * 1.5) {
                                                    poincarePoints.push({ x: st[0], p: st[1], orb: orb });
                                                }
                                            }
                                        }
                                        poincareComputed = true;
                                        poincareRunning = false;
                                    }

                                    // Draw points
                                    var orbColors = [viz.colors.blue, viz.colors.teal, viz.colors.orange, viz.colors.green,
                                                     viz.colors.purple, viz.colors.cyan, viz.colors.yellow, viz.colors.pink,
                                                     viz.colors.red, viz.colors.gold];
                                    for (var pi3 = 0; pi3 < poincarePoints.length; pi3++) {
                                        var pt = poincarePoints[pi3];
                                        var sx = duffXtoSx(pt.x), sy = duffPtoSy(pt.p);
                                        if (sx < plotL || sx > plotR || sy < plotT || sy > plotB) continue;
                                        ctx.fillStyle = orbColors[pt.orb % orbColors.length];
                                        ctx.globalAlpha = 0.6;
                                        ctx.beginPath();
                                        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                    ctx.globalAlpha = 1;

                                    viz.screenText('x', plotR - 10, plotCy + 14, viz.colors.text, 12, 'center');
                                    viz.screenText('p', plotCx + 14, plotT + 5, viz.colors.text, 12, 'left', 'top');

                                    if (!poincareComputed) {
                                        viz.screenText('Click "Compute Poincar\u00e9" to generate the section', w / 2, plotCy, viz.colors.text, 14, 'center');
                                        viz.screenText('Driven damped Duffing: x\'\' = x - x\u00b3 - 0.15x\' + F\u2080cos(t)', w / 2, plotCy + 25, viz.colors.text, 11, 'center');
                                    } else {
                                        viz.screenText('Poincar\u00e9 section: ' + poincarePoints.length + ' points from ' + 20 + ' orbits', w / 2, h - 10, viz.colors.gold, 11, 'center');
                                        viz.screenText('F\u2080 = ' + F0.toFixed(2) + '  (increase for more chaos)', w / 2, plotT - 20, viz.colors.purple, 11, 'center');
                                    }
                                }
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Sketch the phase portrait of a particle in the double-well potential \\(V(x) = -\\frac{1}{2}x^2 + \\frac{1}{4}x^4\\). Identify all fixed points and classify them as stable (elliptic) or unstable (hyperbolic). Draw the separatrix.',
                        hint: 'Fixed points occur where \\(V\'(x) = 0\\), i.e., \\(x(x^2 - 1) = 0\\). Classify by the sign of \\(V\'\'(x)\\) at each point.',
                        solution: 'Fixed points: \\(x = 0\\) (local maximum of \\(V\\), unstable/hyperbolic in phase space) and \\(x = \\pm 1\\) (local minima, stable/elliptic). The separatrix passes through \\((0, 0)\\) with energy \\(E = V(0) = 0\\), forming a figure-eight that encloses the two stable equilibria. Inside each lobe: libration around one minimum. Outside the figure-eight: oscillation over both wells.'
                    },
                    {
                        question: 'For the driven damped pendulum \\(\\ddot{\\theta} + \\gamma\\dot{\\theta} + \\sin\\theta = F_0\\cos(\\omega t)\\), explain why Liouville\'s theorem does not apply. What qualitative consequence does this have for the phase space structure?',
                        hint: 'Check whether the system is Hamiltonian. Compute the divergence of the phase space flow.',
                        solution: 'The damping term \\(\\gamma\\dot{\\theta}\\) makes the system non-Hamiltonian. The phase space flow has divergence \\(\\nabla \\cdot \\mathbf{v} = \\partial\\dot{\\theta}/\\partial\\theta + \\partial\\dot{p}/\\partial p = 0 + (-\\gamma) = -\\gamma < 0\\). Phase space volumes shrink at rate \\(\\gamma\\). This allows the existence of attractors: the long-time behavior is confined to a lower-dimensional set (a strange attractor in the chaotic regime). Liouville prohibits attractors in Hamiltonian systems; dissipation enables them.'
                    }
                ]
            }
        ]
    });
})();
