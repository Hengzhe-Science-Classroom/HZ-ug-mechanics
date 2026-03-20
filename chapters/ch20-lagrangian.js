// === Chapter 20: Lagrangian Mechanics ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch20',
        number: 20,
        title: 'Lagrangian Mechanics',
        subtitle: 'From forces to functionals: how a single scalar function encodes all of mechanics',
        file: 'ch20-lagrangian',

        sections: [
            // ============================================================
            // Section 0: Generalized Coordinates and Constraints
            // ============================================================
            {
                id: 'generalized-coordinates',
                title: 'Generalized Coordinates and Constraints',
                content: `
<h2>Beyond Cartesian Coordinates</h2>

<p>Newtonian mechanics writes \\(\\mathbf{F} = m\\mathbf{a}\\) in Cartesian coordinates. For a single free particle in 3D, that gives three equations. For \\(N\\) particles, \\(3N\\) equations. But most systems are not free: a pendulum is constrained to swing on a rod, a bead is constrained to slide on a wire, a rigid body has fixed inter-particle distances. These <strong>constraints</strong> reduce the true number of degrees of freedom far below \\(3N\\).</p>

<div class="env-block definition">
<div class="env-title">Definition: Holonomic Constraint</div>
<div class="env-body">
<p>A <strong>holonomic constraint</strong> is a relation among the coordinates of the form</p>
\\[f_j(\\mathbf{r}_1, \\mathbf{r}_2, \\dots, \\mathbf{r}_N, t) = 0, \\quad j = 1, \\dots, k.\\]
<p>Each such constraint eliminates one degree of freedom. A system of \\(N\\) particles with \\(k\\) holonomic constraints has \\(n = 3N - k\\) degrees of freedom.</p>
</div>
</div>

<p>A simple pendulum has \\(N = 1\\) particle in 2D (two Cartesian coordinates \\(x, y\\)) subject to the constraint \\(x^2 + y^2 = \\ell^2\\). That is one constraint, leaving \\(n = 2 - 1 = 1\\) degree of freedom. The natural coordinate is the angle \\(\\theta\\).</p>

<div class="env-block definition">
<div class="env-title">Definition: Generalized Coordinates</div>
<div class="env-body">
<p>A set of \\(n\\) independent variables \\(q_1, q_2, \\dots, q_n\\) that completely specify the configuration of a system with \\(n\\) degrees of freedom are called <strong>generalized coordinates</strong>. They need not be Cartesian, nor need they have dimensions of length. The corresponding time derivatives \\(\\dot{q}_i\\) are called <strong>generalized velocities</strong>.</p>
</div>
</div>

<p>The power of generalized coordinates is that they automatically incorporate constraints. Instead of solving \\(3N\\) equations and \\(k\\) constraint equations simultaneously, we solve \\(n\\) unconstrained equations in the \\(q_i\\).</p>

<div class="env-block example">
<div class="env-title">Example: Choosing Coordinates for a Double Pendulum</div>
<div class="env-body">
<p>A double pendulum consists of two masses connected by rigid rods, swinging in a plane. The system has \\(N = 2\\) particles in 2D (four Cartesian coordinates) and two rigid-rod constraints. Thus \\(n = 4 - 2 = 2\\). The natural generalized coordinates are the two angles \\(\\theta_1, \\theta_2\\).</p>
<p>In Cartesian coordinates, we would have to include the tension forces in each rod as unknowns. In generalized coordinates, those constraint forces never appear.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Non-holonomic constraints</div>
<div class="env-body">
<p>Not all constraints are holonomic. A constraint involving velocities that cannot be integrated to a position-only relation is <strong>non-holonomic</strong>. Example: a ball rolling without slipping on a surface. Lagrangian mechanics in its standard form handles holonomic constraints automatically; non-holonomic constraints require special treatment (Lagrange multipliers or the vakonomic approach).</p>
</div>
</div>

<p>Given generalized coordinates \\(q_i\\), the position of each particle is</p>
\\[\\mathbf{r}_\\alpha = \\mathbf{r}_\\alpha(q_1, \\dots, q_n, t), \\quad \\alpha = 1, \\dots, N.\\]
<p>The velocity follows by the chain rule:</p>
\\[\\dot{\\mathbf{r}}_\\alpha = \\sum_{i=1}^{n} \\frac{\\partial \\mathbf{r}_\\alpha}{\\partial q_i} \\dot{q}_i + \\frac{\\partial \\mathbf{r}_\\alpha}{\\partial t}.\\]
<p>This decomposition is the starting point for deriving the Euler-Lagrange equations.</p>

<div class="viz-placeholder" data-viz="viz-gen-coords"></div>
`,
                visualizations: [
                    {
                        id: 'viz-gen-coords',
                        title: 'Generalized Coordinates: Pendulum vs. Cartesian',
                        description: 'A simple pendulum described in two ways. On the left, the Cartesian description \\((x, y)\\) with the constraint \\(x^2 + y^2 = \\ell^2\\). On the right, the single generalized coordinate \\(\\theta\\). Drag the pendulum bob and watch both descriptions update.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 80, originX: 200, originY: 80 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            var L = 2.5;
                            var theta = 0.8;
                            var omega = 0;
                            var g = 9.8;
                            var dt = 1 / 60;
                            var running = true;
                            var trail = [];

                            VizEngine.createButton(controls, 'Play/Pause', function () { running = !running; });
                            VizEngine.createButton(controls, 'Reset', function () { theta = 0.8; omega = 0; trail = []; });
                            VizEngine.createSlider(controls, 'Length', 1.0, 3.5, L, 0.1, function (v) { L = v; });

                            function draw() {
                                if (running) {
                                    // RK4 integration of pendulum
                                    var state = [theta, omega];
                                    var derivs = function (s) { return [s[1], -g / L * Math.sin(s[0])]; };
                                    state = VizEngine.rk4(state, 0, dt, derivs);
                                    theta = state[0];
                                    omega = state[1];
                                }

                                var bx = L * Math.sin(theta);
                                var by = -L * Math.cos(theta);

                                trail.push([bx, by]);
                                if (trail.length > 200) trail.shift();

                                viz.clear();

                                // LEFT PANEL: Cartesian view
                                var panelDiv = w * 0.48;

                                // Pivot
                                ctx.fillStyle = viz.colors.axis;
                                ctx.beginPath();
                                var piv = viz.toScreen(0, 0);
                                ctx.arc(piv[0], piv[1], 5, 0, Math.PI * 2);
                                ctx.fill();

                                // Constraint circle (dashed)
                                ctx.strokeStyle = viz.colors.axis + '44';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.arc(piv[0], piv[1], L * viz.scale, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Rod
                                viz.drawSegment(0, 0, bx, by, viz.colors.white, 2);

                                // Trail
                                viz.drawTrail(trail, viz.colors.teal, 0.5);

                                // Bob
                                viz.drawBall(bx, by, 0.15, viz.colors.orange, 2);

                                // Cartesian labels
                                viz.drawSegment(0, by, bx, by, viz.colors.blue, 1, true);
                                viz.drawSegment(bx, 0, bx, by, viz.colors.green, 1, true);
                                viz.drawText('x', bx / 2, by - 0.2, viz.colors.blue, 13);
                                viz.drawText('y', bx + 0.2, by / 2, viz.colors.green, 13);

                                // Angle arc
                                if (Math.abs(theta) > 0.05) {
                                    viz.drawAngle(0, 0, -Math.PI / 2, -Math.PI / 2 + theta, 0.6, viz.colors.yellow, 'θ');
                                }

                                // Info panel right side
                                var ix = w - 220;
                                ctx.fillStyle = viz.colors.bg + 'dd';
                                ctx.fillRect(ix - 10, 10, 220, 150);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.strokeRect(ix - 10, 10, 220, 150);

                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'left';
                                ctx.textBaseline = 'top';

                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('Cartesian:', ix, 20);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillText('x = ' + bx.toFixed(3) + ' m', ix + 10, 40);
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillText('y = ' + by.toFixed(3) + ' m', ix + 10, 58);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('Constraint: x² + y² = L²', ix + 10, 76);

                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.fillStyle = viz.colors.white;
                                ctx.fillText('Generalized:', ix, 100);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.fillText('θ = ' + (theta * 180 / Math.PI).toFixed(1) + '°  (' + theta.toFixed(3) + ' rad)', ix + 10, 120);
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.fillText('No constraint needed!', ix + 10, 140);
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A bead slides on a circular wire of radius \\(R\\) that lies in a vertical plane. How many degrees of freedom does the bead have? What is a natural generalized coordinate?',
                        hint: 'Count the Cartesian coordinates and subtract the number of constraints.',
                        solution: 'A bead in a plane has 2 Cartesian coordinates. The constraint \\(x^2 + y^2 = R^2\\) removes one, leaving \\(n = 1\\). The natural generalized coordinate is the angle \\(\\theta\\) measured from the bottom (or top) of the circle.'
                    },
                    {
                        question: 'A rigid body in 3D has how many degrees of freedom? What are convenient generalized coordinates?',
                        hint: 'A rigid body has \\(N\\) particles with \\(N(N-1)/2\\) distance constraints, but for large \\(N\\) the answer simplifies. Think of translation + rotation.',
                        solution: 'A rigid body in 3D has 6 degrees of freedom: 3 for the position of the center of mass (translation) and 3 for orientation (rotation). Convenient coordinates are \\((X, Y, Z)\\) for the center of mass and the three Euler angles \\((\\phi, \\theta, \\psi)\\) for orientation.'
                    }
                ]
            },

            // ============================================================
            // Section 1: The Lagrangian and the Euler-Lagrange Equations
            // ============================================================
            {
                id: 'euler-lagrange',
                title: 'The Lagrangian and the Euler-Lagrange Equations',
                content: `
<h2>From \\(\\mathbf{F} = m\\mathbf{a}\\) to a Variational Principle</h2>

<p>The central object in Lagrangian mechanics is a single scalar function:</p>

<div class="env-block definition">
<div class="env-title">Definition: The Lagrangian</div>
<div class="env-body">
<p>The <strong>Lagrangian</strong> of a mechanical system is</p>
\\[L(q_1, \\dots, q_n, \\dot{q}_1, \\dots, \\dot{q}_n, t) = T - V,\\]
<p>where \\(T\\) is the total kinetic energy and \\(V\\) is the total potential energy, both expressed in terms of the generalized coordinates and velocities.</p>
</div>
</div>

<p>The equations of motion follow from a single requirement: the physical trajectory is the one that makes the <strong>action</strong> stationary.</p>

<div class="env-block definition">
<div class="env-title">Definition: The Action</div>
<div class="env-body">
<p>The <strong>action functional</strong> is</p>
\\[S[q] = \\int_{t_1}^{t_2} L(q_i, \\dot{q}_i, t)\\, dt.\\]
<p>Hamilton's principle states that the physical trajectory \\(q_i(t)\\) is a stationary point of \\(S\\): for all variations \\(\\delta q_i(t)\\) vanishing at the endpoints, \\(\\delta S = 0\\).</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: The Euler-Lagrange Equations</div>
<div class="env-body">
<p>If \\(q_i(t)\\) is a stationary path of the action, then for each \\(i = 1, \\dots, n\\):</p>
\\[\\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}_i} - \\frac{\\partial L}{\\partial q_i} = 0.\\]
</div>
</div>

<p><strong>Derivation.</strong> Consider a variation \\(q_i(t) \\to q_i(t) + \\epsilon\\, \\eta_i(t)\\) where \\(\\eta_i(t_1) = \\eta_i(t_2) = 0\\). Then</p>
\\[\\delta S = \\int_{t_1}^{t_2} \\left( \\frac{\\partial L}{\\partial q_i}\\eta_i + \\frac{\\partial L}{\\partial \\dot{q}_i}\\dot{\\eta}_i \\right) dt.\\]
<p>Integrate the second term by parts. The boundary term vanishes because \\(\\eta_i = 0\\) at the endpoints:</p>
\\[\\delta S = \\int_{t_1}^{t_2} \\left( \\frac{\\partial L}{\\partial q_i} - \\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}_i} \\right)\\eta_i\\, dt = 0.\\]
<p>Since \\(\\eta_i(t)\\) is arbitrary, the integrand must vanish identically by the fundamental lemma of the calculus of variations. \\(\\square\\)</p>

<div class="env-block intuition">
<div class="env-title">What the Euler-Lagrange equation "means"</div>
<div class="env-body">
<p>The quantity \\(p_i \\equiv \\partial L / \\partial \\dot{q}_i\\) is the <strong>generalized momentum</strong> conjugate to \\(q_i\\). The term \\(\\partial L / \\partial q_i\\) is the <strong>generalized force</strong>. The Euler-Lagrange equation says: rate of change of generalized momentum equals generalized force. This is \\(\\mathbf{F} = m\\mathbf{a}\\) rewritten in its most general, coordinate-invariant form.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Free Particle</div>
<div class="env-body">
<p>For a free particle in 1D, \\(T = \\frac{1}{2}m\\dot{x}^2\\), \\(V = 0\\), so \\(L = \\frac{1}{2}m\\dot{x}^2\\). The Euler-Lagrange equation gives:</p>
\\[\\frac{d}{dt}(m\\dot{x}) - 0 = 0 \\quad \\Rightarrow \\quad m\\ddot{x} = 0.\\]
<p>Newton's first law.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Simple Pendulum</div>
<div class="env-body">
<p>Generalized coordinate: \\(\\theta\\). The position of the bob is \\(x = \\ell\\sin\\theta\\), \\(y = -\\ell\\cos\\theta\\). The kinetic energy is:</p>
\\[T = \\frac{1}{2}m(\\dot{x}^2 + \\dot{y}^2) = \\frac{1}{2}m\\ell^2\\dot{\\theta}^2.\\]
<p>The potential energy (with zero at the pivot) is:</p>
\\[V = -mg\\ell\\cos\\theta.\\]
<p>So \\(L = \\frac{1}{2}m\\ell^2\\dot{\\theta}^2 + mg\\ell\\cos\\theta\\). Apply Euler-Lagrange:</p>
\\[\\frac{\\partial L}{\\partial \\dot{\\theta}} = m\\ell^2\\dot{\\theta}, \\quad \\frac{\\partial L}{\\partial \\theta} = -mg\\ell\\sin\\theta.\\]
\\[m\\ell^2\\ddot{\\theta} + mg\\ell\\sin\\theta = 0 \\quad \\Rightarrow \\quad \\ddot{\\theta} = -\\frac{g}{\\ell}\\sin\\theta.\\]
<p>The familiar pendulum equation, derived without ever mentioning the tension in the rod!</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Warning: \\(L = T - V\\) requires conservative forces</div>
<div class="env-body">
<p>The Lagrangian \\(L = T - V\\) assumes all forces derive from a potential. Friction, air resistance, and other non-conservative forces require modification (Rayleigh dissipation function or generalized forces added directly to the Euler-Lagrange equations).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-el-solver"></div>
`,
                visualizations: [
                    {
                        id: 'viz-el-solver',
                        title: 'Lagrangian Solver: Step-by-Step',
                        description: 'Watch the Euler-Lagrange machinery work step by step for three systems: free particle, simple pendulum, and spring-mass. Each step shows the generalized coordinate, the Lagrangian, the partial derivatives, and the resulting equation of motion.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var currentSystem = 0;
                            var systemNames = ['Free Particle', 'Simple Pendulum', 'Spring-Mass'];

                            var steps = [
                                // Free particle
                                [
                                    { label: 'Step 1: Choose generalized coordinate', text: 'q = x  (position along line)' },
                                    { label: 'Step 2: Write T and V', text: 'T = ½ m ẋ²,   V = 0' },
                                    { label: 'Step 3: Form L = T - V', text: 'L = ½ m ẋ²' },
                                    { label: 'Step 4: Compute partials', text: '∂L/∂ẋ = mẋ,   ∂L/∂x = 0' },
                                    { label: 'Step 5: Euler-Lagrange equation', text: 'd/dt(mẋ) - 0 = 0  ⟹  mẍ = 0' }
                                ],
                                // Pendulum
                                [
                                    { label: 'Step 1: Choose generalized coordinate', text: 'q = θ  (angle from vertical)' },
                                    { label: 'Step 2: Write T and V', text: 'T = ½ mℓ²θ̇²,   V = -mgℓcos θ' },
                                    { label: 'Step 3: Form L = T - V', text: 'L = ½ mℓ²θ̇² + mgℓcos θ' },
                                    { label: 'Step 4: Compute partials', text: '∂L/∂θ̇ = mℓ²θ̇,   ∂L/∂θ = -mgℓsin θ' },
                                    { label: 'Step 5: Euler-Lagrange equation', text: 'mℓ²θ̈ + mgℓsin θ = 0  ⟹  θ̈ = -(g/ℓ)sin θ' }
                                ],
                                // Spring-mass
                                [
                                    { label: 'Step 1: Choose generalized coordinate', text: 'q = x  (displacement from equilibrium)' },
                                    { label: 'Step 2: Write T and V', text: 'T = ½ m ẋ²,   V = ½ k x²' },
                                    { label: 'Step 3: Form L = T - V', text: 'L = ½ m ẋ² - ½ k x²' },
                                    { label: 'Step 4: Compute partials', text: '∂L/∂ẋ = mẋ,   ∂L/∂x = -kx' },
                                    { label: 'Step 5: Euler-Lagrange equation', text: 'd/dt(mẋ) - (-kx) = 0  ⟹  mẍ + kx = 0' }
                                ]
                            ];

                            var currentStep = 0;
                            var maxStep = 4;

                            for (var si = 0; si < systemNames.length; si++) {
                                (function (idx) {
                                    VizEngine.createButton(controls, systemNames[idx], function () {
                                        currentSystem = idx; currentStep = 0;
                                    });
                                })(si);
                            }
                            VizEngine.createButton(controls, '< Prev Step', function () { if (currentStep > 0) currentStep--; });
                            VizEngine.createButton(controls, 'Next Step >', function () { if (currentStep < maxStep) currentStep++; });

                            function draw() {
                                viz.clear();

                                // Title
                                ctx.fillStyle = viz.colors.gold;
                                ctx.font = 'bold 18px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                ctx.fillText('Euler-Lagrange Solver: ' + systemNames[currentSystem], w / 2, 15);

                                // Draw each step
                                var sysSteps = steps[currentSystem];
                                var yStart = 60;
                                var lineH = 55;
                                for (var si = 0; si <= currentStep; si++) {
                                    var yy = yStart + si * lineH;
                                    var alpha = si === currentStep ? 1.0 : 0.6;

                                    // Step number badge
                                    ctx.globalAlpha = alpha;
                                    ctx.fillStyle = si === currentStep ? viz.colors.teal : viz.colors.axis;
                                    ctx.beginPath();
                                    ctx.arc(40, yy + 10, 14, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.font = 'bold 12px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(String(si + 1), 40, yy + 10);

                                    // Label
                                    ctx.fillStyle = si === currentStep ? viz.colors.white : viz.colors.text;
                                    ctx.font = 'bold 13px -apple-system,sans-serif';
                                    ctx.textAlign = 'left';
                                    ctx.textBaseline = 'top';
                                    ctx.fillText(sysSteps[si].label, 65, yy - 2);

                                    // Content
                                    ctx.fillStyle = si === currentStep ? viz.colors.yellow : viz.colors.text;
                                    ctx.font = '14px -apple-system,sans-serif';
                                    ctx.fillText(sysSteps[si].text, 85, yy + 18);

                                    ctx.globalAlpha = 1;
                                }

                                // Arrow between steps
                                for (var ai = 0; ai < currentStep; ai++) {
                                    var ay = yStart + ai * lineH + 38;
                                    ctx.fillStyle = viz.colors.axis;
                                    ctx.beginPath();
                                    ctx.moveTo(40, ay);
                                    ctx.lineTo(36, ay + 6);
                                    ctx.lineTo(44, ay + 6);
                                    ctx.closePath();
                                    ctx.fill();
                                }

                                // Diagram in bottom right
                                var diagX = w - 180, diagY = h - 140;
                                if (currentSystem === 0) {
                                    // Free particle: a ball on a line
                                    ctx.strokeStyle = viz.colors.axis;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(diagX - 80, diagY + 40);
                                    ctx.lineTo(diagX + 80, diagY + 40);
                                    ctx.stroke();
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.arc(diagX + 20 * Math.sin(Date.now() * 0.001), diagY + 28, 12, 0, Math.PI * 2);
                                    ctx.fill();
                                    viz.screenText('x', diagX + 75, diagY + 55, viz.colors.blue, 12);
                                } else if (currentSystem === 1) {
                                    // Pendulum
                                    var pTheta = 0.5 * Math.sin(Date.now() * 0.002);
                                    var pLen = 70;
                                    var px = diagX + pLen * Math.sin(pTheta);
                                    var py = diagY - 20 + pLen * Math.cos(pTheta);
                                    ctx.fillStyle = viz.colors.axis;
                                    ctx.beginPath();
                                    ctx.arc(diagX, diagY - 20, 4, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.strokeStyle = viz.colors.white;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(diagX, diagY - 20);
                                    ctx.lineTo(px, py);
                                    ctx.stroke();
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.arc(px, py, 12, 0, Math.PI * 2);
                                    ctx.fill();
                                    viz.screenText('θ', diagX + 18, diagY + 5, viz.colors.yellow, 12);
                                } else {
                                    // Spring mass
                                    var sx0 = diagX - 60;
                                    var sx1 = diagX + 30 * Math.sin(Date.now() * 0.003);
                                    var sy0 = diagY + 20;
                                    // Draw wall
                                    ctx.fillStyle = viz.colors.axis;
                                    ctx.fillRect(sx0 - 8, sy0 - 30, 8, 60);
                                    // Spring (zigzag)
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(sx0, sy0);
                                    var coils = 8;
                                    var cLen = (sx1 - sx0) / (coils * 2 + 2);
                                    var cx2 = sx0 + cLen;
                                    ctx.lineTo(cx2, sy0);
                                    for (var ci = 0; ci < coils * 2; ci++) {
                                        cx2 += cLen;
                                        var sgn = (ci % 2 === 0) ? -1 : 1;
                                        ctx.lineTo(cx2, sy0 + sgn * 12);
                                    }
                                    cx2 += cLen;
                                    ctx.lineTo(cx2, sy0);
                                    ctx.lineTo(sx1 + 12, sy0);
                                    ctx.stroke();
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.arc(sx1 + 12, sy0, 12, 0, Math.PI * 2);
                                    ctx.fill();
                                    viz.screenText('x', sx1 + 12, sy0 + 25, viz.colors.blue, 12);
                                }

                                // Progress indicator
                                viz.screenText('Step ' + (currentStep + 1) + ' of 5', w / 2, h - 15, viz.colors.text, 11);
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A particle of mass \\(m\\) moves in 1D under the potential \\(V(x) = \\alpha x^4\\) where \\(\\alpha > 0\\). Write down the Lagrangian and derive the equation of motion using the Euler-Lagrange equation.',
                        hint: '\\(T = \\frac{1}{2}m\\dot{x}^2\\). Compute \\(\\partial L / \\partial \\dot{x}\\) and \\(\\partial L / \\partial x\\), then apply the Euler-Lagrange equation.',
                        solution: '\\(L = \\frac{1}{2}m\\dot{x}^2 - \\alpha x^4\\). We have \\(\\partial L / \\partial \\dot{x} = m\\dot{x}\\) and \\(\\partial L / \\partial x = -4\\alpha x^3\\). The Euler-Lagrange equation gives \\(m\\ddot{x} + 4\\alpha x^3 = 0\\).'
                    },
                    {
                        question: 'Show that the Euler-Lagrange equation for a particle in a central potential \\(V(r)\\) in polar coordinates gives both the radial equation and conservation of angular momentum.',
                        hint: 'In polar coordinates, \\(T = \\frac{1}{2}m(\\dot{r}^2 + r^2\\dot{\\theta}^2)\\). Write the Euler-Lagrange equation for both \\(r\\) and \\(\\theta\\).',
                        solution: '\\(L = \\frac{1}{2}m(\\dot{r}^2 + r^2\\dot{\\theta}^2) - V(r)\\). For \\(\\theta\\): \\(\\partial L / \\partial \\theta = 0\\), so \\(\\frac{d}{dt}(mr^2\\dot{\\theta}) = 0\\), giving conservation of angular momentum \\(\\ell = mr^2\\dot{\\theta}\\). For \\(r\\): \\(\\frac{d}{dt}(m\\dot{r}) = mr\\dot{\\theta}^2 - V\'(r)\\), which is the radial equation with the centrifugal term.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Worked Examples: Atwood Machine and Bead on Wire
            // ============================================================
            {
                id: 'worked-examples',
                title: 'Worked Examples: Atwood Machine and Beyond',
                content: `
<h2>The Power of the Method</h2>

<p>The true advantage of Lagrangian mechanics becomes apparent in systems where Newtonian methods require identifying constraint forces. Let us work through several examples of increasing sophistication.</p>

<div class="env-block example">
<div class="env-title">Example: The Atwood Machine</div>
<div class="env-body">
<p>Two masses \\(m_1\\) and \\(m_2\\) connected by a massless inextensible string over a massless frictionless pulley. The constraint is that the total string length is fixed: if \\(m_1\\) descends by \\(x\\), \\(m_2\\) ascends by \\(x\\). One degree of freedom: \\(q = x\\).</p>
<p><strong>Kinetic energy:</strong> Both masses move with speed \\(|\\dot{x}|\\):</p>
\\[T = \\frac{1}{2}(m_1 + m_2)\\dot{x}^2.\\]
<p><strong>Potential energy:</strong> Taking the initial position as reference, if \\(m_1\\) drops by \\(x\\):</p>
\\[V = -m_1 g x + m_2 g x = (m_2 - m_1)gx.\\]
<p><strong>Lagrangian:</strong></p>
\\[L = \\frac{1}{2}(m_1 + m_2)\\dot{x}^2 - (m_2 - m_1)gx.\\]
<p><strong>Euler-Lagrange equation:</strong></p>
\\[(m_1 + m_2)\\ddot{x} = (m_1 - m_2)g \\quad \\Rightarrow \\quad \\ddot{x} = \\frac{(m_1 - m_2)}{(m_1 + m_2)}g.\\]
<p>We obtained the acceleration without ever computing the string tension. If we wanted the tension, we could recover it, but for the motion itself, it is unnecessary.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Bead on a Frictionless Inclined Plane</div>
<div class="env-body">
<p>A bead of mass \\(m\\) slides on a frictionless plane inclined at angle \\(\\alpha\\). Generalized coordinate: \\(s\\), distance along the plane from the top.</p>
\\[T = \\frac{1}{2}m\\dot{s}^2, \\quad V = -mgs\\sin\\alpha.\\]
\\[L = \\frac{1}{2}m\\dot{s}^2 + mgs\\sin\\alpha.\\]
\\[m\\ddot{s} = mg\\sin\\alpha.\\]
<p>Constant acceleration down the incline, obtained in one line.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Two Masses on an Inclined Plane with a Pulley</div>
<div class="env-body">
<p>Mass \\(m_1\\) on a frictionless incline of angle \\(\\alpha\\), connected by a string over a pulley at the top to mass \\(m_2\\) hanging vertically. If \\(m_1\\) moves up the incline by \\(x\\), then \\(m_2\\) drops by \\(x\\). Generalized coordinate: \\(x\\).</p>
\\[T = \\frac{1}{2}(m_1 + m_2)\\dot{x}^2.\\]
\\[V = m_1 g x \\sin\\alpha - m_2 g x.\\]
\\[L = \\frac{1}{2}(m_1 + m_2)\\dot{x}^2 - m_1 g x \\sin\\alpha + m_2 g x.\\]
\\[(m_1 + m_2)\\ddot{x} = (m_2 - m_1 \\sin\\alpha)g.\\]
<p>The Newtonian approach requires separate free-body diagrams, tension as an unknown, and solving simultaneous equations. The Lagrangian approach: write \\(T\\), write \\(V\\), take derivatives. Done.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The pattern</div>
<div class="env-body">
<p>Every Lagrangian problem follows the same recipe: (1) identify degrees of freedom and choose generalized coordinates, (2) write \\(T\\) and \\(V\\) in those coordinates, (3) form \\(L = T - V\\), (4) apply the Euler-Lagrange equation. Constraint forces (tension, normal force, etc.) never appear unless you explicitly want them.</p>
</div>
</div>

<h3>Symmetry and Conservation Laws</h3>

<p>A major bonus: conservation laws emerge automatically from symmetries of the Lagrangian.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Noether's Theorem (Simplified)</div>
<div class="env-body">
<p>If the Lagrangian does not depend on a generalized coordinate \\(q_i\\) (that is, \\(q_i\\) is <strong>cyclic</strong> or <strong>ignorable</strong>), then the conjugate momentum \\(p_i = \\partial L / \\partial \\dot{q}_i\\) is conserved:</p>
\\[\\frac{\\partial L}{\\partial q_i} = 0 \\quad \\Rightarrow \\quad \\frac{dp_i}{dt} = 0 \\quad \\Rightarrow \\quad p_i = \\text{const}.\\]
</div>
</div>

<p>Examples: if \\(L\\) is independent of \\(\\theta\\) in polar coordinates, angular momentum \\(p_\\theta = mr^2\\dot{\\theta}\\) is conserved. If \\(L\\) is independent of \\(x\\), linear momentum \\(p_x = m\\dot{x}\\) is conserved. If \\(L\\) has no explicit time dependence, energy is conserved (we will see this precisely in the Hamiltonian chapter).</p>

<div class="viz-placeholder" data-viz="viz-atwood"></div>
`,
                visualizations: [
                    {
                        id: 'viz-atwood',
                        title: 'Atwood Machine Simulation',
                        description: 'An Atwood machine with adjustable masses. The Lagrangian method gives the acceleration directly. Watch the masses move and verify the predicted acceleration \\(a = (m_1 - m_2)g/(m_1 + m_2)\\).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 60, originX: 300, originY: 80 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var m1 = 3.0, m2 = 1.0;
                            var g = 9.8;
                            var x = 0, v = 0;
                            var dt = 1 / 60;
                            var running = true;
                            var pulleyR = 0.3;

                            VizEngine.createSlider(controls, 'm\u2081', 0.5, 5.0, m1, 0.1, function (val) { m1 = val; x = 0; v = 0; });
                            VizEngine.createSlider(controls, 'm\u2082', 0.5, 5.0, m2, 0.1, function (val) { m2 = val; x = 0; v = 0; });
                            VizEngine.createButton(controls, 'Play/Pause', function () { running = !running; });
                            VizEngine.createButton(controls, 'Reset', function () { x = 0; v = 0; });

                            function draw() {
                                var acc = (m1 - m2) * g / (m1 + m2);
                                if (running) {
                                    v += acc * dt;
                                    x += v * dt;
                                    if (x > 3) { x = 3; v = 0; }
                                    if (x < -3) { x = -3; v = 0; }
                                }

                                viz.clear();

                                // Pulley
                                var pcx = 0, pcy = 0;
                                var ps = viz.toScreen(pcx, pcy);
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(ps[0], ps[1], pulleyR * viz.scale, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.grid;
                                ctx.fill();

                                // Support
                                ctx.fillStyle = viz.colors.axis;
                                ctx.fillRect(ps[0] - 40, ps[1] - pulleyR * viz.scale - 15, 80, 10);

                                // String and masses
                                var stringLen = 2.5;
                                var leftX = -pulleyR - 0.15;
                                var rightX = pulleyR + 0.15;
                                var m1y = -(stringLen + x);
                                var m2y = -(stringLen - x);

                                // Strings
                                viz.drawSegment(leftX, -pulleyR * 0.5, leftX, m1y, viz.colors.white, 1.5);
                                viz.drawSegment(rightX, -pulleyR * 0.5, rightX, m2y, viz.colors.white, 1.5);

                                // Mass 1 (left)
                                var m1size = 0.15 + m1 * 0.05;
                                var m1s = viz.toScreen(leftX, m1y);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillRect(m1s[0] - m1size * viz.scale, m1s[1], m1size * 2 * viz.scale, m1size * 1.5 * viz.scale);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(m1s[0] - m1size * viz.scale, m1s[1], m1size * 2 * viz.scale, m1size * 1.5 * viz.scale);
                                viz.screenText('m\u2081=' + m1.toFixed(1), m1s[0], m1s[1] + m1size * 1.5 * viz.scale + 14, viz.colors.orange, 12);

                                // Mass 2 (right)
                                var m2size = 0.15 + m2 * 0.05;
                                var m2s = viz.toScreen(rightX, m2y);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(m2s[0] - m2size * viz.scale, m2s[1], m2size * 2 * viz.scale, m2size * 1.5 * viz.scale);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(m2s[0] - m2size * viz.scale, m2s[1], m2size * 2 * viz.scale, m2size * 1.5 * viz.scale);
                                viz.screenText('m\u2082=' + m2.toFixed(1), m2s[0], m2s[1] + m2size * 1.5 * viz.scale + 14, viz.colors.blue, 12);

                                // Info panel
                                ctx.fillStyle = viz.colors.bg + 'dd';
                                ctx.fillRect(w - 280, 15, 265, 130);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.strokeRect(w - 280, 15, 265, 130);

                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                                ctx.fillStyle = viz.colors.gold;
                                ctx.fillText('L = ½(m\u2081+m\u2082)\u1E8B\u00B2 - (m\u2082-m\u2081)gx', w - 270, 22);
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('a = (m\u2081-m\u2082)g / (m\u2081+m\u2082)', w - 270, 48);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillText('a = ' + acc.toFixed(3) + ' m/s\u00B2', w - 270, 68);
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillText('v = ' + v.toFixed(3) + ' m/s', w - 270, 88);
                                ctx.fillText('x = ' + x.toFixed(3) + ' m', w - 270, 108);
                                ctx.fillStyle = viz.colors.purple;
                                ctx.fillText('T = ' + (m1 * m2 * g / (m1 + m2) * 2).toFixed(2) + ' N (string tension)', w - 270, 128);
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'In the Atwood machine, use the Lagrangian method to find the string tension \\(T\\). (Hint: reintroduce the constraint via a Lagrange multiplier.)',
                        hint: 'Write the unconstrained Lagrangian with two independent coordinates \\(x_1, x_2\\) and the constraint \\(x_1 + x_2 = \\text{const}\\). The Lagrange multiplier \\(\\lambda\\) equals the tension.',
                        solution: 'With constraint \\(x_1 + x_2 = L\\), add \\(\\lambda(x_1 + x_2 - L)\\) to the Lagrangian. The Euler-Lagrange equations give \\(m_1\\ddot{x}_1 = m_1 g - \\lambda\\) and \\(m_2\\ddot{x}_2 = m_2 g - \\lambda\\). With \\(\\ddot{x}_1 = -\\ddot{x}_2 = a\\), solving gives \\(\\lambda = T = 2m_1 m_2 g / (m_1 + m_2)\\).'
                    },
                    {
                        question: 'A bead of mass \\(m\\) slides without friction on a parabolic wire \\(y = ax^2\\) in a vertical plane under gravity. Using \\(x\\) as the generalized coordinate, derive the equation of motion.',
                        hint: 'Express \\(\\dot{y} = 2ax\\dot{x}\\) and substitute into \\(T = \\frac{1}{2}m(\\dot{x}^2 + \\dot{y}^2)\\).',
                        solution: '\\(\\dot{y} = 2ax\\dot{x}\\), so \\(T = \\frac{1}{2}m(1 + 4a^2x^2)\\dot{x}^2\\), \\(V = mgax^2\\). The Lagrangian is \\(L = \\frac{1}{2}m(1+4a^2x^2)\\dot{x}^2 - mgax^2\\). The Euler-Lagrange equation: \\(m(1+4a^2x^2)\\ddot{x} + 4ma^2x\\dot{x}^2 + 2mgax = 0\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Bead on a Rotating Hoop
            // ============================================================
            {
                id: 'bead-rotating-hoop',
                title: 'Bead on a Rotating Hoop',
                content: `
<h2>A Showcase Problem</h2>

<p>This is one of the most beautiful problems in classical mechanics. A circular hoop of radius \\(R\\) is set spinning about its vertical diameter with angular velocity \\(\\omega\\). A bead of mass \\(m\\) slides frictionlessly along the hoop. Where does it settle?</p>

<h3>Setting Up the Lagrangian</h3>

<p>The generalized coordinate is \\(\\theta\\), the angle from the bottom of the hoop. The bead's position in cylindrical coordinates is:</p>
\\[\\rho = R\\sin\\theta, \\quad z = -R\\cos\\theta.\\]
<p>Because the hoop rotates at angular velocity \\(\\omega\\), the bead also moves azimuthally. Its velocity has two components: along the hoop (\\(R\\dot{\\theta}\\)) and azimuthally (\\(\\rho\\,\\omega = R\\omega\\sin\\theta\\)).</p>
\\[T = \\frac{1}{2}m\\left(R^2\\dot{\\theta}^2 + R^2\\omega^2\\sin^2\\theta\\right).\\]
\\[V = -mgR\\cos\\theta.\\]
\\[L = \\frac{1}{2}mR^2\\dot{\\theta}^2 + \\frac{1}{2}mR^2\\omega^2\\sin^2\\theta + mgR\\cos\\theta.\\]

<h3>The Equation of Motion</h3>

\\[\\frac{\\partial L}{\\partial \\dot{\\theta}} = mR^2\\dot{\\theta}, \\quad \\frac{\\partial L}{\\partial \\theta} = mR^2\\omega^2\\sin\\theta\\cos\\theta - mgR\\sin\\theta.\\]
\\[mR^2\\ddot{\\theta} = mR^2\\omega^2\\sin\\theta\\cos\\theta - mgR\\sin\\theta.\\]
\\[\\ddot{\\theta} = \\sin\\theta\\left(\\omega^2\\cos\\theta - \\frac{g}{R}\\right).\\]

<h3>The Effective Potential</h3>

<p>We can rewrite the problem in terms of an <strong>effective potential</strong>. Since the \\(\\theta\\)-dependent terms in \\(L\\) that do not involve \\(\\dot{\\theta}\\) act like a potential, define:</p>
\\[V_{\\text{eff}}(\\theta) = -\\frac{1}{2}mR^2\\omega^2\\sin^2\\theta - mgR\\cos\\theta.\\]
<p>Equilibria occur where \\(dV_{\\text{eff}}/d\\theta = 0\\):</p>
\\[\\frac{dV_{\\text{eff}}}{d\\theta} = -mR^2\\omega^2\\sin\\theta\\cos\\theta + mgR\\sin\\theta = 0.\\]
\\[\\sin\\theta\\left(-\\omega^2\\cos\\theta + \\frac{g}{R}\\right) = 0.\\]

<p>This gives two cases:</p>
<ol>
<li>\\(\\sin\\theta = 0\\), i.e., \\(\\theta = 0\\) (bottom) or \\(\\theta = \\pi\\) (top).</li>
<li>\\(\\cos\\theta = g/(R\\omega^2)\\), which has a solution only when \\(\\omega^2 > g/R\\), i.e., \\(\\omega > \\omega_c \\equiv \\sqrt{g/R}\\).</li>
</ol>

<div class="env-block theorem">
<div class="env-title">Theorem: Critical Angular Velocity</div>
<div class="env-body">
<p>Define \\(\\omega_c = \\sqrt{g/R}\\). Then:</p>
<ul>
<li>For \\(\\omega < \\omega_c\\): the only stable equilibrium is the bottom (\\(\\theta = 0\\)).</li>
<li>For \\(\\omega > \\omega_c\\): the bottom becomes <em>unstable</em>, and two new stable equilibria appear at \\(\\theta = \\pm \\arccos(g/R\\omega^2)\\).</li>
</ul>
<p>This is a <strong>pitchfork bifurcation</strong>, a phenomenon that connects mechanics to the theory of phase transitions.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Physical intuition</div>
<div class="env-body">
<p>At low rotation speeds, gravity wins and the bead sits at the bottom. Above the critical speed, the centrifugal tendency pushes the bead outward. The competition between gravity (pulling down) and centrifugal tendency (pushing radially outward) creates a new equilibrium partway up the hoop. The faster the hoop spins, the higher the bead climbs (\\(\\theta\\) increases toward \\(\\pi/2\\)).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-bead-hoop"></div>
`,
                visualizations: [
                    {
                        id: 'viz-bead-hoop',
                        title: 'Bead on a Rotating Hoop (Showpiece)',
                        description: 'The crown jewel. Adjust \\(\\omega\\) and watch the effective potential reshape. Below \\(\\omega_c\\), the bottom is the only stable equilibrium. Above \\(\\omega_c\\), two new minima appear on the sides. The bead\'s position evolves according to the Euler-Lagrange equation solved via RK4.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var R = 1.0;
                            var g = 9.8;
                            var omega = 2.0;
                            var omegaC = Math.sqrt(g / R);
                            var theta = 0.3;
                            var thetaDot = 0;
                            var dt = 1 / 60;
                            var running = true;
                            var showVeff = true;
                            var trail = [];

                            var omegaSlider = VizEngine.createSlider(controls, '\u03c9', 0.1, 8.0, omega, 0.1, function (v) { omega = v; });
                            VizEngine.createSlider(controls, '\u03b8\u2080', 0.0, 3.14, theta, 0.05, function (v) { theta = v; thetaDot = 0; trail = []; });
                            VizEngine.createButton(controls, 'Play/Pause', function () { running = !running; });
                            VizEngine.createButton(controls, 'Reset', function () { theta = 0.3; thetaDot = 0; trail = []; });

                            function Veff(th) {
                                return -0.5 * R * R * omega * omega * Math.sin(th) * Math.sin(th) - g * R * Math.cos(th);
                            }

                            function derivs(state) {
                                var th = state[0], thd = state[1];
                                var thdd = Math.sin(th) * (omega * omega * Math.cos(th) - g / R);
                                return [thd, thdd];
                            }

                            // Hoop 3D appearance params
                            var hoopCx = w * 0.32, hoopCy = h * 0.48;
                            var hoopR = 120;

                            // Veff plot region
                            var vx0 = w * 0.58, vy0 = 30, vw2 = w * 0.38, vh2 = h - 60;

                            function draw() {
                                if (running) {
                                    var substeps = 4;
                                    var subdt = dt / substeps;
                                    for (var ss = 0; ss < substeps; ss++) {
                                        var state = VizEngine.rk4([theta, thetaDot], 0, subdt, derivs);
                                        theta = state[0];
                                        thetaDot = state[1];
                                    }
                                    // Wrap theta to [-pi, pi]
                                    while (theta > Math.PI) theta -= 2 * Math.PI;
                                    while (theta < -Math.PI) theta += 2 * Math.PI;
                                    // Add damping (tiny, for visual stability)
                                    thetaDot *= 0.9995;
                                }

                                var beadX = hoopCx + hoopR * Math.sin(theta);
                                var beadY = hoopCy + hoopR * Math.cos(theta);

                                trail.push([theta, Veff(theta)]);
                                if (trail.length > 300) trail.shift();

                                viz.clear();

                                // === LEFT: Hoop visualization ===
                                // Rotating hoop (draw as ellipse for 3D effect)
                                var time = Date.now() * 0.001;
                                var hoopPhase = omega * time;
                                var hoopTilt = 0.3 * Math.cos(hoopPhase);

                                // Draw hoop circle
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(hoopCx, hoopCy, hoopR, 0, Math.PI * 2);
                                ctx.stroke();

                                // Vertical axis (rotation axis)
                                ctx.strokeStyle = viz.colors.text + '66';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.moveTo(hoopCx, hoopCy - hoopR - 25);
                                ctx.lineTo(hoopCx, hoopCy + hoopR + 25);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Rotation arrow at top
                                ctx.save();
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2;
                                var arrowR = 20;
                                ctx.beginPath();
                                ctx.arc(hoopCx, hoopCy - hoopR - 15, arrowR, -0.8, 0.8);
                                ctx.stroke();
                                // Arrowhead
                                var arAng = 0.8;
                                var arX = hoopCx + arrowR * Math.cos(arAng);
                                var arY = hoopCy - hoopR - 15 + arrowR * Math.sin(arAng);
                                ctx.fillStyle = viz.colors.purple;
                                ctx.beginPath();
                                ctx.moveTo(arX + 6, arY - 2);
                                ctx.lineTo(arX - 2, arY - 6);
                                ctx.lineTo(arX - 2, arY + 4);
                                ctx.closePath();
                                ctx.fill();
                                ctx.restore();
                                viz.screenText('\u03c9', hoopCx + arrowR + 10, hoopCy - hoopR - 15, viz.colors.purple, 14, 'left');

                                // Angle arc from bottom
                                if (Math.abs(theta) > 0.05) {
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 1.5;
                                    var arcR = 40;
                                    var startAng = Math.PI / 2;
                                    var endAng = Math.PI / 2 - theta;
                                    ctx.beginPath();
                                    if (theta > 0) {
                                        ctx.arc(hoopCx, hoopCy, arcR, endAng, startAng);
                                    } else {
                                        ctx.arc(hoopCx, hoopCy, arcR, startAng, endAng);
                                    }
                                    ctx.stroke();
                                    var labelAng = Math.PI / 2 - theta / 2;
                                    viz.screenText('\u03b8', hoopCx + (arcR + 12) * Math.cos(labelAng), hoopCy - (arcR + 12) * Math.sin(labelAng), viz.colors.yellow, 14);
                                }

                                // Bead
                                ctx.save();
                                ctx.shadowColor = viz.colors.orange;
                                ctx.shadowBlur = 15;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.arc(beadX, beadY, 10, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.restore();
                                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                                ctx.beginPath();
                                ctx.arc(beadX - 3, beadY - 3, 3, 0, Math.PI * 2);
                                ctx.fill();

                                // Gravity arrow
                                ctx.fillStyle = viz.colors.green;
                                ctx.font = '11px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.fillText('g', beadX + 20, beadY + 25);
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(beadX + 20, beadY + 5);
                                ctx.lineTo(beadX + 20, beadY + 30);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(beadX + 20, beadY + 30);
                                ctx.lineTo(beadX + 16, beadY + 24);
                                ctx.lineTo(beadX + 24, beadY + 24);
                                ctx.closePath();
                                ctx.fill();

                                // Equilibrium markers
                                var eqTheta = 0;
                                if (omega > omegaC) {
                                    eqTheta = Math.acos(g / (R * omega * omega));
                                    // Mark stable equilibria
                                    var eqX1 = hoopCx + hoopR * Math.sin(eqTheta);
                                    var eqY1 = hoopCy + hoopR * Math.cos(eqTheta);
                                    var eqX2 = hoopCx + hoopR * Math.sin(-eqTheta);
                                    var eqY2 = hoopCy + hoopR * Math.cos(-eqTheta);
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 2;
                                    // cross markers
                                    var mk = 6;
                                    ctx.beginPath(); ctx.moveTo(eqX1 - mk, eqY1 - mk); ctx.lineTo(eqX1 + mk, eqY1 + mk); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(eqX1 + mk, eqY1 - mk); ctx.lineTo(eqX1 - mk, eqY1 + mk); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(eqX2 - mk, eqY2 - mk); ctx.lineTo(eqX2 + mk, eqY2 + mk); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(eqX2 + mk, eqY2 - mk); ctx.lineTo(eqX2 - mk, eqY2 + mk); ctx.stroke();
                                }

                                // === RIGHT: Effective potential plot ===
                                ctx.fillStyle = viz.colors.bg;
                                ctx.fillRect(vx0 - 10, 5, vw2 + 20, h - 10);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(vx0 - 10, 5, vw2 + 20, h - 10);

                                viz.screenText('V_eff(\u03b8)', vx0 + vw2 / 2, 18, viz.colors.white, 14, 'center');

                                // Plot Veff
                                var plotLeft = vx0 + 10;
                                var plotRight = vx0 + vw2 - 10;
                                var plotTop = 40;
                                var plotBot = h - 40;
                                var plotW = plotRight - plotLeft;
                                var plotH = plotBot - plotTop;

                                // Find Veff range
                                var vMin = Infinity, vMax = -Infinity;
                                var nPts = 200;
                                var vVals = [];
                                for (var i = 0; i <= nPts; i++) {
                                    var th = -Math.PI + 2 * Math.PI * i / nPts;
                                    var vv = Veff(th);
                                    vVals.push(vv);
                                    if (vv < vMin) vMin = vv;
                                    if (vv > vMax) vMax = vv;
                                }
                                var vRange = vMax - vMin;
                                if (vRange < 0.1) vRange = 0.1;
                                vMin -= vRange * 0.1;
                                vMax += vRange * 0.1;
                                vRange = vMax - vMin;

                                // Axes
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(plotLeft, plotBot);
                                ctx.lineTo(plotRight, plotBot);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(plotLeft, plotBot);
                                ctx.lineTo(plotLeft, plotTop);
                                ctx.stroke();

                                // Theta labels
                                viz.screenText('-\u03c0', plotLeft, plotBot + 14, viz.colors.text, 10, 'center');
                                viz.screenText('0', plotLeft + plotW / 2, plotBot + 14, viz.colors.text, 10, 'center');
                                viz.screenText('\u03c0', plotRight, plotBot + 14, viz.colors.text, 10, 'center');
                                viz.screenText('\u03b8', plotRight + 5, plotBot + 5, viz.colors.text, 11, 'left');

                                // Plot curve
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var i = 0; i <= nPts; i++) {
                                    var px = plotLeft + plotW * i / nPts;
                                    var py = plotBot - plotH * (vVals[i] - vMin) / vRange;
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Mark current position on Veff
                                var curThNorm = theta;
                                while (curThNorm > Math.PI) curThNorm -= 2 * Math.PI;
                                while (curThNorm < -Math.PI) curThNorm += 2 * Math.PI;
                                var curPx = plotLeft + plotW * (curThNorm + Math.PI) / (2 * Math.PI);
                                var curVeff = Veff(curThNorm);
                                var curPy = plotBot - plotH * (curVeff - vMin) / vRange;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.arc(curPx, curPy, 7, 0, Math.PI * 2);
                                ctx.fill();

                                // Trail on Veff plot
                                ctx.globalAlpha = 0.3;
                                for (var ti = 0; ti < trail.length; ti++) {
                                    var tth = trail[ti][0];
                                    while (tth > Math.PI) tth -= 2 * Math.PI;
                                    while (tth < -Math.PI) tth += 2 * Math.PI;
                                    var tpx = plotLeft + plotW * (tth + Math.PI) / (2 * Math.PI);
                                    var tveff = trail[ti][1];
                                    var tpy = plotBot - plotH * (tveff - vMin) / vRange;
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.arc(tpx, tpy, 2, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                                ctx.globalAlpha = 1;

                                // Mark equilibria on Veff
                                if (omega > omegaC) {
                                    var eqTh = Math.acos(g / (R * omega * omega));
                                    // Stable eq markers
                                    var eq1px = plotLeft + plotW * (eqTh + Math.PI) / (2 * Math.PI);
                                    var eq1py = plotBot - plotH * (Veff(eqTh) - vMin) / vRange;
                                    var eq2px = plotLeft + plotW * (-eqTh + Math.PI) / (2 * Math.PI);
                                    var eq2py = plotBot - plotH * (Veff(-eqTh) - vMin) / vRange;
                                    ctx.fillStyle = viz.colors.teal;
                                    ctx.beginPath(); ctx.arc(eq1px, eq1py, 5, 0, Math.PI * 2); ctx.fill();
                                    ctx.beginPath(); ctx.arc(eq2px, eq2py, 5, 0, Math.PI * 2); ctx.fill();
                                    viz.screenText('stable', eq1px, eq1py - 12, viz.colors.teal, 9, 'center');
                                }
                                // Bottom equilibrium
                                var botPx = plotLeft + plotW * (0 + Math.PI) / (2 * Math.PI);
                                var botPy = plotBot - plotH * (Veff(0) - vMin) / vRange;
                                ctx.fillStyle = omega > omegaC ? viz.colors.red : viz.colors.teal;
                                ctx.beginPath(); ctx.arc(botPx, botPy, 5, 0, Math.PI * 2); ctx.fill();
                                viz.screenText(omega > omegaC ? 'unstable' : 'stable', botPx, botPy - 12, omega > omegaC ? viz.colors.red : viz.colors.teal, 9, 'center');

                                // Info bar at bottom
                                var infoY = h - 22;
                                var isSuper = omega > omegaC;
                                viz.screenText('\u03c9 = ' + omega.toFixed(1) + ' rad/s', w * 0.12, infoY, viz.colors.purple, 12, 'center');
                                viz.screenText('\u03c9_c = ' + omegaC.toFixed(2) + ' rad/s', w * 0.32, infoY, viz.colors.text, 12, 'center');
                                viz.screenText(isSuper ? '\u03c9 > \u03c9_c: BIFURCATION' : '\u03c9 < \u03c9_c: bottom stable', w * 0.52, infoY, isSuper ? viz.colors.gold : viz.colors.teal, 12, 'left');
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'For the bead on a rotating hoop, find the frequency of small oscillations about the non-trivial equilibrium \\(\\theta_0 = \\arccos(g/R\\omega^2)\\) when \\(\\omega > \\omega_c\\).',
                        hint: 'Expand \\(\\ddot{\\theta} = f(\\theta)\\) about \\(\\theta_0\\). Set \\(\\theta = \\theta_0 + \\epsilon\\) and linearize in \\(\\epsilon\\).',
                        solution: 'Let \\(\\theta = \\theta_0 + \\epsilon\\). The equation \\(\\ddot{\\theta} = \\sin\\theta(\\omega^2\\cos\\theta - g/R)\\) linearizes to \\(\\ddot{\\epsilon} = -\\omega^2\\sin^2\\theta_0\\, \\epsilon\\), using \\(\\cos\\theta_0 = g/(R\\omega^2)\\) and \\(\\sin^2\\theta_0 = 1 - g^2/(R^2\\omega^4)\\). The oscillation frequency is \\(\\Omega = \\omega\\sin\\theta_0 = \\omega\\sqrt{1 - g^2/(R^2\\omega^4)}\\).'
                    },
                    {
                        question: 'Show that \\(\\theta = \\pi\\) (top of the hoop) is always an unstable equilibrium, regardless of \\(\\omega\\).',
                        hint: 'Evaluate \\(d^2 V_{\\text{eff}}/d\\theta^2\\) at \\(\\theta = \\pi\\).',
                        solution: '\\(d^2 V_{\\text{eff}}/d\\theta^2 = -mR^2\\omega^2(\\cos^2\\theta - \\sin^2\\theta) + mgR\\cos\\theta\\). At \\(\\theta = \\pi\\): this equals \\(-mR^2\\omega^2(1) - mgR = -(mR^2\\omega^2 + mgR) < 0\\). Since the second derivative of \\(V_{\\text{eff}}\\) is negative, this is a local maximum, hence unstable.'
                    }
                ]
            },

            // ============================================================
            // Section 4: The Double Pendulum and Chaos
            // ============================================================
            {
                id: 'double-pendulum-chaos',
                title: 'The Double Pendulum and Chaos',
                content: `
<h2>From Integrability to Chaos</h2>

<p>The simple pendulum, the Atwood machine, the bead on a rotating hoop; all of these are systems with one degree of freedom. Their phase space is two-dimensional, and their behavior is always regular. The double pendulum has two degrees of freedom, and its behavior is spectacularly different: it exhibits <strong>deterministic chaos</strong>.</p>

<h3>The Double Pendulum Lagrangian</h3>

<p>Two point masses \\(m_1, m_2\\) on rigid massless rods of lengths \\(\\ell_1, \\ell_2\\). Generalized coordinates: \\(\\theta_1, \\theta_2\\) (angles from the vertical).</p>

<p>Positions:</p>
\\[x_1 = \\ell_1\\sin\\theta_1, \\quad y_1 = -\\ell_1\\cos\\theta_1.\\]
\\[x_2 = \\ell_1\\sin\\theta_1 + \\ell_2\\sin\\theta_2, \\quad y_2 = -\\ell_1\\cos\\theta_1 - \\ell_2\\cos\\theta_2.\\]

<p>Velocities (by differentiation):</p>
\\[\\dot{x}_2 = \\ell_1\\dot{\\theta}_1\\cos\\theta_1 + \\ell_2\\dot{\\theta}_2\\cos\\theta_2, \\quad \\dot{y}_2 = \\ell_1\\dot{\\theta}_1\\sin\\theta_1 + \\ell_2\\dot{\\theta}_2\\sin\\theta_2.\\]

<p>After algebra, the kinetic energy is:</p>
\\[T = \\frac{1}{2}(m_1 + m_2)\\ell_1^2\\dot{\\theta}_1^2 + \\frac{1}{2}m_2\\ell_2^2\\dot{\\theta}_2^2 + m_2\\ell_1\\ell_2\\dot{\\theta}_1\\dot{\\theta}_2\\cos(\\theta_1 - \\theta_2).\\]

<p>The potential energy is:</p>
\\[V = -(m_1 + m_2)g\\ell_1\\cos\\theta_1 - m_2 g\\ell_2\\cos\\theta_2.\\]

<p>The Lagrangian \\(L = T - V\\) leads to two coupled, nonlinear, second-order ODEs. There is no closed-form solution. The system must be integrated numerically.</p>

<div class="env-block definition">
<div class="env-title">Definition: Deterministic Chaos</div>
<div class="env-body">
<p>A deterministic system exhibits <strong>chaos</strong> if:</p>
<ol>
<li>Its dynamics are governed by deterministic equations (no randomness).</li>
<li>It is sensitively dependent on initial conditions: two trajectories starting infinitesimally close diverge exponentially in time.</li>
<li>It is bounded: the trajectories do not fly off to infinity.</li>
</ol>
<p>The double pendulum is a paradigmatic example. At high energies, a tiny change in initial angle (even \\(10^{-10}\\) radians) leads to completely different trajectories after a short time.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Warning: Chaos is not randomness</div>
<div class="env-body">
<p>The double pendulum is perfectly deterministic. Given exact initial conditions, the future is uniquely determined. Chaos means that in practice, finite measurement precision makes long-term prediction impossible. This is a profound statement: determinism does not imply predictability.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The Lagrangian method shines here</div>
<div class="env-body">
<p>Try deriving the double pendulum equations using \\(\\mathbf{F} = m\\mathbf{a}\\). You need to track the tension in each rod, the reaction forces at the pivot, and carefully decompose forces along each rod. The Lagrangian approach: write \\(T\\), write \\(V\\), take derivatives. The constraint forces (tensions) never appear. This is why Lagrangian mechanics is the tool of choice for complex systems.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Lyapunov exponent</div>
<div class="env-body">
<p>The rate of exponential divergence of nearby trajectories is quantified by the <strong>Lyapunov exponent</strong> \\(\\lambda\\). If two trajectories start with separation \\(\\delta_0\\), after time \\(t\\) the separation grows as \\(\\delta(t) \\sim \\delta_0 e^{\\lambda t}\\). A positive Lyapunov exponent is the signature of chaos. For the double pendulum at moderate energies, \\(\\lambda > 0\\).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-double-pendulum"></div>
`,
                visualizations: [
                    {
                        id: 'viz-double-pendulum',
                        title: 'Double Pendulum: Chaos in Action',
                        description: 'Two double pendulums with nearly identical initial conditions (differing by 0.001 rad). Watch them start in sync and then diverge wildly. This is deterministic chaos: same equations, almost the same start, completely different outcomes. Integrated with RK4.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 80, originX: 300, originY: 120 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var m1 = 1.0, m2 = 1.0;
                            var l1 = 1.5, l2 = 1.5;
                            var g = 9.8;
                            var dt = 1 / 60;
                            var running = true;

                            // Two pendulums with slightly different ICs
                            var stateA = [Math.PI * 0.75, 0, Math.PI * 0.75, 0]; // theta1, omega1, theta2, omega2
                            var stateB = [Math.PI * 0.75 + 0.001, 0, Math.PI * 0.75, 0];

                            var trailA = [];
                            var trailB = [];
                            var maxTrail = 500;
                            var frameCount = 0;

                            VizEngine.createSlider(controls, '\u03b8\u2081 init', 0.1, 3.1, Math.PI * 0.75, 0.05, function (v) {
                                stateA = [v, 0, stateA[2], 0];
                                stateB = [v + 0.001, 0, stateA[2], 0];
                                trailA = []; trailB = []; frameCount = 0;
                            });
                            VizEngine.createSlider(controls, '\u03b8\u2082 init', 0.1, 3.1, Math.PI * 0.75, 0.05, function (v) {
                                stateA = [stateA[0], 0, v, 0];
                                stateB = [stateB[0], 0, v, 0];
                                trailA = []; trailB = []; frameCount = 0;
                            });
                            VizEngine.createButton(controls, 'Play/Pause', function () { running = !running; });
                            VizEngine.createButton(controls, 'Reset', function () {
                                stateA = [Math.PI * 0.75, 0, Math.PI * 0.75, 0];
                                stateB = [Math.PI * 0.75 + 0.001, 0, Math.PI * 0.75, 0];
                                trailA = []; trailB = []; frameCount = 0;
                            });

                            function doublePendulumDerivs(s) {
                                var t1 = s[0], w1 = s[1], t2 = s[2], w2 = s[3];
                                var delta = t1 - t2;
                                var den = 2 * m1 + m2 - m2 * Math.cos(2 * delta);
                                var a1 = (-g * (2 * m1 + m2) * Math.sin(t1) - m2 * g * Math.sin(t1 - 2 * t2)
                                    - 2 * Math.sin(delta) * m2 * (w2 * w2 * l2 + w1 * w1 * l1 * Math.cos(delta))) / (l1 * den);
                                var a2 = (2 * Math.sin(delta) * ((m1 + m2) * w1 * w1 * l1 + g * (m1 + m2) * Math.cos(t1)
                                    + w2 * w2 * l2 * m2 * Math.cos(delta))) / (l2 * den);
                                return [w1, a1, w2, a2];
                            }

                            function getPositions(state) {
                                var x1 = l1 * Math.sin(state[0]);
                                var y1 = -l1 * Math.cos(state[0]);
                                var x2 = x1 + l2 * Math.sin(state[2]);
                                var y2 = y1 - l2 * Math.cos(state[2]);
                                return { x1: x1, y1: y1, x2: x2, y2: y2 };
                            }

                            function draw() {
                                if (running) {
                                    var substeps = 6;
                                    var subdt = dt / substeps;
                                    for (var ss = 0; ss < substeps; ss++) {
                                        stateA = VizEngine.rk4(stateA, 0, subdt, doublePendulumDerivs);
                                        stateB = VizEngine.rk4(stateB, 0, subdt, doublePendulumDerivs);
                                    }
                                    frameCount++;

                                    var posA = getPositions(stateA);
                                    var posB = getPositions(stateB);
                                    trailA.push([posA.x2, posA.y2]);
                                    trailB.push([posB.x2, posB.y2]);
                                    if (trailA.length > maxTrail) trailA.shift();
                                    if (trailB.length > maxTrail) trailB.shift();
                                }

                                viz.clear();

                                var posA = getPositions(stateA);
                                var posB = getPositions(stateB);

                                // Trails
                                viz.drawTrail(trailA, viz.colors.orange, 0.6);
                                viz.drawTrail(trailB, viz.colors.cyan, 0.6);

                                // Pendulum A (orange)
                                viz.drawSegment(0, 0, posA.x1, posA.y1, viz.colors.orange + 'cc', 2);
                                viz.drawSegment(posA.x1, posA.y1, posA.x2, posA.y2, viz.colors.orange + 'cc', 2);
                                viz.drawBall(posA.x1, posA.y1, 0.08, viz.colors.orange, 1.5);
                                viz.drawBall(posA.x2, posA.y2, 0.08, viz.colors.orange, 2);

                                // Pendulum B (cyan)
                                viz.drawSegment(0, 0, posB.x1, posB.y1, viz.colors.cyan + 'cc', 2);
                                viz.drawSegment(posB.x1, posB.y1, posB.x2, posB.y2, viz.colors.cyan + 'cc', 2);
                                viz.drawBall(posB.x1, posB.y1, 0.08, viz.colors.cyan, 1.5);
                                viz.drawBall(posB.x2, posB.y2, 0.08, viz.colors.cyan, 2);

                                // Pivot
                                ctx.fillStyle = viz.colors.axis;
                                var piv = viz.toScreen(0, 0);
                                ctx.beginPath();
                                ctx.arc(piv[0], piv[1], 5, 0, Math.PI * 2);
                                ctx.fill();

                                // Divergence metric
                                var dx = posA.x2 - posB.x2;
                                var dy = posA.y2 - posB.y2;
                                var divergence = Math.sqrt(dx * dx + dy * dy);

                                // Info panel
                                ctx.fillStyle = viz.colors.bg + 'dd';
                                ctx.fillRect(10, 10, 260, 90);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.strokeRect(10, 10, 260, 90);

                                ctx.font = 'bold 13px -apple-system,sans-serif';
                                ctx.textAlign = 'left'; ctx.textBaseline = 'top';
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillText('Pendulum A', 20, 18);
                                ctx.fillStyle = viz.colors.cyan;
                                ctx.fillText('Pendulum B  (\u0394\u03b8\u2081 = 0.001 rad)', 20, 36);
                                ctx.fillStyle = viz.colors.white;
                                ctx.font = '12px -apple-system,sans-serif';
                                ctx.fillText('Tip separation: ' + divergence.toFixed(4) + ' m', 20, 58);
                                ctx.fillStyle = divergence > 0.5 ? viz.colors.red : viz.colors.green;
                                ctx.fillText(divergence > 0.5 ? 'DIVERGED: chaos!' : 'Tracking...', 20, 76);

                                // Time
                                viz.screenText('t = ' + (frameCount * dt).toFixed(1) + ' s', w - 80, h - 15, viz.colors.text, 11, 'center');
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'For a double pendulum with \\(m_1 = m_2 = m\\) and \\(\\ell_1 = \\ell_2 = \\ell\\), write the Lagrangian and show that the kinetic energy contains a cross term \\(m\\ell^2\\dot{\\theta}_1\\dot{\\theta}_2\\cos(\\theta_1 - \\theta_2)\\).',
                        hint: 'Compute \\(\\dot{x}_2^2 + \\dot{y}_2^2\\) carefully and use \\(\\cos(A-B) = \\cos A\\cos B + \\sin A\\sin B\\).',
                        solution: '\\(\\dot{x}_2 = \\ell\\dot{\\theta}_1\\cos\\theta_1 + \\ell\\dot{\\theta}_2\\cos\\theta_2\\), \\(\\dot{y}_2 = \\ell\\dot{\\theta}_1\\sin\\theta_1 + \\ell\\dot{\\theta}_2\\sin\\theta_2\\). Then \\(\\dot{x}_2^2 + \\dot{y}_2^2 = \\ell^2\\dot{\\theta}_1^2 + \\ell^2\\dot{\\theta}_2^2 + 2\\ell^2\\dot{\\theta}_1\\dot{\\theta}_2(\\cos\\theta_1\\cos\\theta_2 + \\sin\\theta_1\\sin\\theta_2) = \\ell^2\\dot{\\theta}_1^2 + \\ell^2\\dot{\\theta}_2^2 + 2\\ell^2\\dot{\\theta}_1\\dot{\\theta}_2\\cos(\\theta_1-\\theta_2)\\). Including mass 1: \\(T = m\\ell^2\\dot{\\theta}_1^2 + \\frac{1}{2}m\\ell^2\\dot{\\theta}_2^2 + m\\ell^2\\dot{\\theta}_1\\dot{\\theta}_2\\cos(\\theta_1-\\theta_2)\\).'
                    },
                    {
                        question: 'Linearize the double pendulum equations for small angles (\\(\\theta_1, \\theta_2 \\ll 1\\)) with equal masses and lengths. Find the two normal mode frequencies.',
                        hint: 'For small angles, \\(\\sin\\theta \\approx \\theta\\), \\(\\cos(\\theta_1-\\theta_2) \\approx 1\\). The linearized equations become \\(2\\ddot{\\theta}_1 + \\ddot{\\theta}_2 = -2(g/\\ell)\\theta_1\\) and \\(\\ddot{\\theta}_1 + \\ddot{\\theta}_2 = -(g/\\ell)\\theta_2\\).',
                        solution: 'Assume \\(\\theta_j = A_j e^{i\\omega t}\\). The characteristic equation is \\(\\omega^4 - 4(g/\\ell)\\omega^2 + 2(g/\\ell)^2 = 0\\). Solving: \\(\\omega^2 = (2 \\pm \\sqrt{2})(g/\\ell)\\). The two normal mode frequencies are \\(\\omega_1 = \\sqrt{(2-\\sqrt{2})g/\\ell}\\) (in-phase mode) and \\(\\omega_2 = \\sqrt{(2+\\sqrt{2})g/\\ell}\\) (out-of-phase mode).'
                    }
                ]
            }
        ]
    });
})();
