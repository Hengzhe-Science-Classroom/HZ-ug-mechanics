// === Chapter 6: Constrained Motion ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch06',
        number: 6,
        title: 'Constrained Motion',
        subtitle: 'Normal forces, beads on wires, the pendulum, and why Lagrange was inevitable',
        file: 'ch06-constraints',

        sections: [
            // ============================================================
            // Section 0: Constraints & Degrees of Freedom
            // ============================================================
            {
                id: 'constraints-dof',
                title: 'Constraints & Degrees of Freedom',
                content: `
<h2>What Is a Constraint?</h2>

<p>In real mechanical systems, particles are rarely free to move anywhere in 3D space. A bead is threaded on a wire. A pendulum bob swings on a string. A block slides on a surface. Each of these restrictions is a <strong>constraint</strong>, and constraints profoundly simplify (and complicate) mechanics.</p>

<div class="env-block definition">
<div class="env-title">Definition: Constraint</div>
<div class="env-body">
<p>A <strong>constraint</strong> is a geometric or kinematic restriction on the possible positions or velocities of a system. A <strong>holonomic constraint</strong> can be expressed as an equation among the coordinates:</p>
\\[f(\\mathbf{r}_1, \\mathbf{r}_2, \\ldots, t) = 0\\]
<p>Examples: \\(|\\mathbf{r}| = L\\) (fixed-length string), \\(z = 0\\) (particle on a table), \\(x^2 + y^2 = R^2\\) (bead on a circular wire).</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Degrees of Freedom</div>
<div class="env-body">
<p>The number of <strong>degrees of freedom</strong> of a system is the number of independent coordinates needed to specify its configuration. For \\(N\\) particles in 3D with \\(k\\) independent holonomic constraints:</p>
\\[\\text{DOF} = 3N - k\\]
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Degrees of Freedom</div>
<div class="env-body">
<ul>
<li>Free particle in 3D: DOF = 3.</li>
<li>Bead on a wire (1 constraint): DOF = \\(3 - 1 = 2\\); but if the wire is a curve in a plane, the bead has DOF = 1 (position along the wire).</li>
<li>Simple pendulum (fixed length, confined to a plane): DOF = 1 (the angle \\(\\theta\\)).</li>
<li>Two particles connected by a rigid rod: DOF = \\(6 - 1 = 5\\).</li>
</ul>
</div>
</div>

<h3>Constraint Forces</h3>

<p>Constraints are enforced by <strong>constraint forces</strong> (also called <strong>forces of constraint</strong>): normal forces, tensions, track reactions. These forces have a special property: for ideal, frictionless constraints, the constraint force is perpendicular to the allowed motion and therefore does no work on the constrained particle.</p>

<div class="env-block theorem">
<div class="env-title">Principle of Virtual Work (Frictionless Constraints)</div>
<div class="env-body">
<p>For a system in equilibrium subject to ideal holonomic constraints, the total work done by the constraint forces in any <strong>virtual displacement</strong> (infinitesimal displacement consistent with the constraints) is zero:</p>
\\[\\sum_i \\mathbf{N}_i \\cdot \\delta\\mathbf{r}_i = 0\\]
<p>This principle eliminates constraint forces from the analysis and is the foundation for Lagrangian mechanics.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why Eliminate Constraint Forces?</div>
<div class="env-body">
<p>In Newtonian mechanics, you must compute the normal force even when you do not care about it (e.g., the tension in a pendulum string). This is wasted effort. The Lagrangian approach, which we motivate here, systematically avoids computing constraint forces by working only with generalized coordinates that automatically satisfy the constraints.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A double pendulum consists of two masses connected by two rigid rods, swinging in a plane. How many degrees of freedom does it have?',
                        hint: 'Each mass has 2 planar coordinates (4 total). Each rod imposes one length constraint.',
                        solution: 'In 2D, the two masses have \\(2 \\times 2 = 4\\) coordinates. The two rigid-rod constraints remove 2, leaving DOF \\(= 4 - 2 = 2\\). The natural generalized coordinates are the two angles \\(\\theta_1\\) and \\(\\theta_2\\).'
                    }
                ]
            },

            // ============================================================
            // Section 1: Normal Forces & Bead on a Wire
            // ============================================================
            {
                id: 'bead-on-wire',
                title: 'Bead on a Wire',
                content: `
<h2>Motion Along a Prescribed Curve</h2>

<p>Consider a bead of mass \\(m\\) sliding without friction on a wire shaped as a curve \\(y = f(x)\\) in a vertical plane, under gravity. The bead has one degree of freedom (its position along the wire, parametrized by \\(x\\) or arc length \\(s\\)).</p>

<h3>Equation of Motion via Energy</h3>

<p>Since the normal force does no work (it is perpendicular to the wire), we can use energy conservation. With \\(y = f(x)\\):</p>

\\[\\tfrac{1}{2}m v^2 + mgy = E\\]

<p>where \\(v = ds/dt\\) is the speed along the wire and \\(E\\) is the total energy. The arc length element is \\(ds = \\sqrt{1 + f'(x)^2}\\,dx\\), so:</p>

\\[v^2 = \\dot{x}^2(1 + f'(x)^2)\\]

<p>Substituting into the energy equation gives a first-order ODE for \\(x(t)\\).</p>

<h3>The Normal Force</h3>

<p>If we need the normal force (e.g., to determine when the bead leaves the wire), we must analyze the acceleration perpendicular to the curve. For a bead moving with speed \\(v\\) along a curve of local radius of curvature \\(\\rho\\), the centripetal acceleration is \\(v^2/\\rho\\). The normal force provides this centripetal acceleration plus the normal component of gravity:</p>

<div class="env-block theorem">
<div class="env-title">Normal Force on a Bead on a Wire</div>
<div class="env-body">
\\[N = m\\frac{v^2}{\\rho} + mg\\cos\\alpha\\]
<p>where \\(\\alpha\\) is the angle between the outward normal to the curve and the vertical (gravity direction), and \\(\\rho\\) is the local radius of curvature. The sign convention is: \\(N > 0\\) means the wire pushes outward (bead on the inside of the curve).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Radius of Curvature</div>
<div class="env-body">
<p>For a curve \\(y = f(x)\\), the radius of curvature is:</p>
\\[\\rho = \\frac{(1 + f'^2)^{3/2}}{|f''|}\\]
</div>
</div>

<div class="viz-placeholder" data-viz="viz-bead-on-curve"></div>

<div class="env-block example">
<div class="env-title">Example: Bead on a Parabolic Wire</div>
<div class="env-body">
<p>A bead slides on the wire \\(y = x^2/2\\) (a parabola opening upward). At the bottom (\\(x = 0\\)), \\(f'' = 1\\), so \\(\\rho = 1\\). If released from \\(x = x_0\\), energy conservation gives \\(v^2 = g(x_0^2 - x^2)(1 + x^2)/(1+x^2)\\). At the bottom, \\(v^2 = gx_0^2\\) and the normal force is \\(N = mv^2/\\rho + mg = m(gx_0^2 + g) = mg(1 + x_0^2)\\).</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-bead-on-curve',
                        title: 'Bead Sliding on Curves',
                        description: 'A bead slides without friction on different curves under gravity. The <strong>green arrow</strong> shows the normal force, the <strong>orange arrow</strong> shows gravity. Select the curve shape and adjust the release point.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 50, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, hh = viz.height;
                            viz.originX = w / 2;
                            viz.originY = hh * 0.65;

                            var curveType = 'parabola';
                            var releaseX = 3.0;
                            var g = 9.8;
                            var t = 0;
                            var state, trail;

                            VizEngine.createButton(controls, 'Parabola', function () { curveType = 'parabola'; reset(); });
                            VizEngine.createButton(controls, 'Circle', function () { curveType = 'circle'; reset(); });
                            VizEngine.createButton(controls, 'Cycloid', function () { curveType = 'cycloid'; reset(); });
                            VizEngine.createSlider(controls, 'Release x', 0.5, 4.0, releaseX, 0.1, function (v) { releaseX = v; reset(); });

                            function curveY(x) {
                                if (curveType === 'parabola') return x * x / 4;
                                if (curveType === 'circle') {
                                    var R = 4;
                                    var val = R * R - x * x;
                                    if (val < 0) return 999;
                                    return R - Math.sqrt(val);
                                }
                                return 0;
                            }

                            function curveDY(x) {
                                if (curveType === 'parabola') return x / 2;
                                if (curveType === 'circle') {
                                    var R = 4;
                                    var val = R * R - x * x;
                                    if (val < 0.01) return 100;
                                    return x / Math.sqrt(val);
                                }
                                return 0;
                            }

                            function curveDDY(x) {
                                if (curveType === 'parabola') return 0.5;
                                if (curveType === 'circle') {
                                    var R = 4;
                                    var val = R * R - x * x;
                                    if (val < 0.01) return 100;
                                    return R * R / Math.pow(val, 1.5);
                                }
                                return 0;
                            }

                            // For cycloid, use parametric approach
                            function cycloidFromParam(theta) {
                                var R = 1.5;
                                return { x: R * (theta - Math.sin(theta)) - Math.PI * R, y: R * (1 - Math.cos(theta)) };
                            }

                            function reset() {
                                t = 0;
                                trail = [];
                                if (curveType === 'cycloid') {
                                    // Parametric: start from a theta
                                    state = { theta: 0.1, dtheta: 0 };
                                } else {
                                    state = { x: Math.min(releaseX, 3.8), vx: 0 };
                                }
                            }
                            reset();

                            function draw() {
                                viz.clear();
                                viz.drawGrid(1);
                                viz.drawAxes('x', 'y');

                                var dt = 0.0003;
                                var steps = 40;

                                if (curveType === 'cycloid') {
                                    // Draw cycloid curve
                                    var R = 1.5;
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 2.5;
                                    ctx.beginPath();
                                    for (var ci = 0; ci <= 200; ci++) {
                                        var th = ci / 200 * 2 * Math.PI;
                                        var cp = cycloidFromParam(th);
                                        var sp = viz.toScreen(cp.x, -cp.y);
                                        if (ci === 0) ctx.moveTo(sp[0], sp[1]);
                                        else ctx.lineTo(sp[0], sp[1]);
                                    }
                                    ctx.stroke();

                                    // Integrate cycloid bead: theta'' = -(g/R)*sin(theta)
                                    for (var si = 0; si < steps; si++) {
                                        var newState = VizEngine.rk4(
                                            [state.theta, state.dtheta], t, dt,
                                            function (s) { return [s[1], -(g / R) * Math.sin(s[0])]; }
                                        );
                                        state.theta = newState[0];
                                        state.dtheta = newState[1];
                                        t += dt;
                                    }

                                    var pos = cycloidFromParam(state.theta + Math.PI);
                                    var bx = pos.x, by = -pos.y;

                                    trail.push([bx, by]);
                                    if (trail.length > 300) trail.shift();

                                    // Trail
                                    viz.drawTrail(trail, viz.colors.orange, 0.5);

                                    // Bead
                                    viz.drawBall(bx, by, 0.15, viz.colors.orange, 2);

                                    // Gravity arrow
                                    viz.drawVector(bx, by, 0, -0.8, viz.colors.yellow, 'mg', 2, 7);

                                } else {
                                    // Draw curve
                                    var xMin = -4.5, xMax = 4.5;
                                    ctx.strokeStyle = viz.colors.teal;
                                    ctx.lineWidth = 2.5;
                                    ctx.beginPath();
                                    var started = false;
                                    for (var xi = 0; xi <= 300; xi++) {
                                        var xx = xMin + (xMax - xMin) * xi / 300;
                                        var yy = curveY(xx);
                                        if (yy > 10) { started = false; continue; }
                                        var spt = viz.toScreen(xx, -yy);
                                        if (!started) { ctx.moveTo(spt[0], spt[1]); started = true; }
                                        else ctx.lineTo(spt[0], spt[1]);
                                    }
                                    ctx.stroke();

                                    // Integrate using energy conservation and ODE along x
                                    // m*x''*(1+f'^2) + m*x'^2*f'*f'' = -m*g*f'
                                    // x'' = (-g*f' - x'^2*f'*f'') / (1+f'^2)
                                    for (var sj = 0; sj < steps; sj++) {
                                        var newSt = VizEngine.rk4(
                                            [state.x, state.vx], t, dt,
                                            function (s) {
                                                var fp = curveDY(s[0]);
                                                var fpp = curveDDY(s[0]);
                                                var denom = 1 + fp * fp;
                                                var ax = (-g * fp - s[1] * s[1] * fp * fpp) / denom;
                                                return [s[1], ax];
                                            }
                                        );
                                        state.x = newSt[0];
                                        state.vx = newSt[1];
                                        t += dt;
                                    }

                                    var bxc = state.x;
                                    var byc = -curveY(state.x);

                                    trail.push([bxc, byc]);
                                    if (trail.length > 300) trail.shift();

                                    // Trail
                                    viz.drawTrail(trail, viz.colors.orange, 0.5);

                                    // Normal force direction
                                    var fp = curveDY(state.x);
                                    var fpp = curveDDY(state.x);
                                    var speed2 = state.vx * state.vx * (1 + fp * fp);
                                    var rho = Math.pow(1 + fp * fp, 1.5) / Math.max(Math.abs(fpp), 0.001);

                                    // Normal direction (pointing toward center of curvature)
                                    var nLen = Math.sqrt(1 + fp * fp);
                                    var nx = fp / nLen;
                                    var ny = 1 / nLen;
                                    if (fpp < 0) { nx = -nx; ny = -ny; }

                                    // Normal force magnitude (centripetal + gravity component)
                                    var cosAlpha = ny;
                                    var Nforce = speed2 / rho + g * cosAlpha;
                                    var Nscale = Nforce * 0.06;
                                    if (Nscale > 2) Nscale = 2;

                                    // Draw normal force vector
                                    if (Nscale > 0.05) {
                                        viz.drawVector(bxc, byc, nx * Nscale, ny * Nscale, viz.colors.green, 'N', 2, 7);
                                    }

                                    // Gravity vector
                                    viz.drawVector(bxc, byc, 0, -0.8, viz.colors.yellow, 'mg', 2, 7);

                                    // Bead
                                    viz.drawBall(bxc, byc, 0.15, viz.colors.orange, 2);
                                }

                                // Curve label
                                var label = curveType === 'parabola' ? 'y = x\u00b2/4' : curveType === 'circle' ? 'Circular arc (R=4)' : 'Cycloid';
                                viz.screenText(label, w / 2, 18, viz.colors.white, 13);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A bead slides on a frictionless circular wire of radius \\(R\\) in a vertical plane. It is released from the top with zero velocity. Find the speed at the bottom and the normal force at the bottom.',
                        hint: 'Use energy conservation for speed. For normal force, the bead undergoes circular motion at the bottom.',
                        solution: 'Energy conservation: \\(\\frac{1}{2}mv^2 = mg(2R)\\), so \\(v = 2\\sqrt{gR}\\). At the bottom, the centripetal acceleration is \\(v^2/R = 4g\\), directed upward. Newton\'s second law radially: \\(N - mg = mv^2/R\\), so \\(N = mg + m(4g) = 5mg\\). The normal force is five times the weight.'
                    }
                ]
            },

            // ============================================================
            // Section 2: The Pendulum as a Constrained System
            // ============================================================
            {
                id: 'pendulum-constraint',
                title: 'The Pendulum',
                content: `
<h2>The Simple Pendulum Revisited</h2>

<p>The simple pendulum is the quintessential constrained system. A mass \\(m\\) swings on a massless, rigid rod of length \\(L\\). The constraint \\(r = L\\) reduces the problem from 2D (two coordinates) to 1D (one angle \\(\\theta\\)).</p>

<h3>Exact Equation of Motion</h3>

<p>Using the tangential component of Newton's second law (or equivalently, torque about the pivot):</p>

<div class="env-block theorem">
<div class="env-title">Pendulum Equation</div>
<div class="env-body">
\\[\\ddot{\\theta} + \\frac{g}{L}\\sin\\theta = 0\\]
<p>This is the exact, nonlinear equation of motion. It is not solvable in terms of elementary functions (the solution involves elliptic integrals).</p>
</div>
</div>

<h3>Small-Angle Approximation</h3>

<p>For \\(|\\theta| \\ll 1\\), \\(\\sin\\theta \\approx \\theta\\), and the equation becomes \\(\\ddot{\\theta} + \\omega_0^2\\theta = 0\\) with \\(\\omega_0 = \\sqrt{g/L}\\). This is simple harmonic motion with period:</p>

\\[T_0 = 2\\pi\\sqrt{\\frac{L}{g}}\\]

<div class="env-block remark">
<div class="env-title">Beyond Small Angles: Exact Period</div>
<div class="env-body">
<p>The exact period for amplitude \\(\\theta_0\\) involves the complete elliptic integral of the first kind:</p>
\\[T = 4\\sqrt{\\frac{L}{g}}\\,K(\\sin^2(\\theta_0/2))\\]
<p>For moderate amplitudes, the series expansion is:</p>
\\[T = T_0\\left(1 + \\frac{1}{4}\\sin^2\\frac{\\theta_0}{2} + \\frac{9}{64}\\sin^4\\frac{\\theta_0}{2} + \\cdots\\right)\\]
<p>At \\(\\theta_0 = 90^\\circ\\), \\(T/T_0 \\approx 1.18\\): the period is 18% longer than the small-angle prediction.</p>
</div>
</div>

<h3>The Tension in the String</h3>

<p>The radial equation gives the tension (constraint force). The centripetal acceleration is \\(L\\dot{\\theta}^2\\), so:</p>

\\[T - mg\\cos\\theta = mL\\dot{\\theta}^2\\]

<p>Using energy conservation \\(\\frac{1}{2}mL^2\\dot{\\theta}^2 = mgL(\\cos\\theta - \\cos\\theta_0)\\):</p>

<div class="env-block theorem">
<div class="env-title">Pendulum String Tension</div>
<div class="env-body">
\\[T = mg(3\\cos\\theta - 2\\cos\\theta_0)\\]
<p>The tension is maximum at the bottom (\\(\\theta = 0\\)): \\(T_{\\max} = mg(3 - 2\\cos\\theta_0)\\). For small amplitudes, \\(T_{\\max} \\approx mg(1 + \\theta_0^2)\\), slightly exceeding the weight.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: When Does the String Go Slack?</div>
<div class="env-body">
<p>If the pendulum is a mass on a string (not a rigid rod), the string goes slack when \\(T = 0\\), i.e., \\(3\\cos\\theta = 2\\cos\\theta_0\\). For this to have a solution with \\(\\cos\\theta \\leq 1\\), we need \\(\\cos\\theta_0 \\leq 3/2\\), which is always true. But for the string to go slack at some angle \\(\\theta < 180^\\circ\\), we need \\(\\theta_0\\) large enough. If the mass is released from \\(\\theta_0 > 90^\\circ\\), it can go slack above the pivot.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Derive the pendulum tension formula \\(T = mg(3\\cos\\theta - 2\\cos\\theta_0)\\) starting from the radial equation and energy conservation.',
                        hint: 'The radial Newton equation is \\(T - mg\\cos\\theta = mL\\dot{\\theta}^2\\). Eliminate \\(\\dot{\\theta}^2\\) using energy conservation.',
                        solution: 'Radially: \\(T = mg\\cos\\theta + mL\\dot{\\theta}^2\\). Energy conservation from angle \\(\\theta_0\\) (released from rest): \\(\\frac{1}{2}mL^2\\dot{\\theta}^2 = mgL(\\cos\\theta - \\cos\\theta_0)\\), so \\(mL\\dot{\\theta}^2 = 2mg(\\cos\\theta - \\cos\\theta_0)/L \\cdot L = 2mg(\\cos\\theta - \\cos\\theta_0)\\). Substituting: \\(T = mg\\cos\\theta + 2mg(\\cos\\theta - \\cos\\theta_0) = mg(3\\cos\\theta - 2\\cos\\theta_0)\\).'
                    },
                    {
                        question: 'A pendulum of length 1 m is released from \\(\\theta_0 = 60^\\circ\\). Compute the exact period using the first correction term and compare to the small-angle period.',
                        hint: '\\(T \\approx T_0(1 + \\frac{1}{4}\\sin^2(\\theta_0/2))\\). \\(T_0 = 2\\pi\\sqrt{L/g}\\).',
                        solution: '\\(T_0 = 2\\pi\\sqrt{1/9.8} = 2.006\\) s. First correction: \\(\\sin^2(30^\\circ) = 0.25\\). \\(T \\approx 2.006(1 + 0.25/4) = 2.006(1.0625) = 2.131\\) s. The period is about 6.3% longer than the small-angle prediction. (Including the next term: \\(9/64 \\times 0.25^2 = 0.0088\\), giving \\(T \\approx 2.006 \\times 1.0713 = 2.149\\) s, about 7.1% longer.)'
                    }
                ]
            },

            // ============================================================
            // Section 3: The Brachistochrone Problem
            // ============================================================
            {
                id: 'brachistochrone',
                title: 'The Brachistochrone',
                content: `
<h2>The Curve of Fastest Descent</h2>

<p>In 1696, Johann Bernoulli posed a famous challenge: what curve between two points allows a bead to slide (frictionlessly, under gravity) from the higher point to the lower point in the least time? This is the <strong>brachistochrone problem</strong> (from Greek: <em>brachistos</em> = shortest, <em>chronos</em> = time).</p>

<div class="env-block theorem">
<div class="env-title">The Brachistochrone Solution</div>
<div class="env-body">
<p>The curve of fastest descent is a <strong>cycloid</strong>: the curve traced by a point on the rim of a rolling circle. In parametric form (with the origin at the starting point, \\(y\\) pointing downward):</p>
\\[x = R(\\theta - \\sin\\theta), \\qquad y = R(1 - \\cos\\theta)\\]
<p>where \\(R\\) is the radius of the generating circle, determined by the endpoint conditions.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why Not a Straight Line?</div>
<div class="env-body">
<p>A straight line is the shortest <em>distance</em>, but not the shortest <em>time</em>. A steeper initial descent gains speed faster, and this extra speed more than compensates for the longer path. The cycloid dips below the straight line at first (gaining speed), then curves back up to reach the endpoint. The net effect is a shorter travel time.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-brachistochrone"></div>

<h3>Connection to the Calculus of Variations</h3>

<p>The brachistochrone was one of the problems that gave birth to the <strong>calculus of variations</strong>, the mathematical framework underlying Lagrangian and Hamiltonian mechanics. The total travel time is a functional:</p>

\\[T[y] = \\int_0^{x_f} \\frac{\\sqrt{1 + y'^2}}{\\sqrt{2gy}}\\,dx\\]

<p>Minimizing this functional (finding the curve \\(y(x)\\) that makes \\(T\\) smallest) leads to the Euler-Lagrange equation, which yields the cycloid.</p>

<div class="env-block remark">
<div class="env-title">The Tautochrone Property</div>
<div class="env-body">
<p>The cycloid has another remarkable property: the time for a bead to slide to the bottom is the <em>same</em> regardless of where on the cycloid it starts. This <strong>tautochrone</strong> (equal-time) property was discovered by Huygens in 1659 and used in the design of pendulum clocks. It is intimately connected to the fact that a bead on a cycloid undergoes simple harmonic motion with period independent of amplitude.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Cycloid vs. Straight Line</div>
<div class="env-body">
<p>Consider a drop from \\((0,0)\\) to \\((d, d)\\) (a 45\\(^\\circ\\) diagonal). The straight-line time is \\(T_{\\text{line}} = \\sqrt{2d/g} \\cdot \\sqrt{2} = 2\\sqrt{d/g}\\). The cycloid time is \\(T_{\\text{cyc}} = \\pi\\sqrt{d/(2g)} \\cdot \\sqrt{2/\\pi}\\). Numerically, for \\(d = 1\\) m: \\(T_{\\text{line}} \\approx 0.639\\) s, \\(T_{\\text{cyc}} \\approx 0.583\\) s. The cycloid is about 9% faster.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-brachistochrone',
                        title: 'Brachistochrone: Straight Line vs. Cycloid',
                        description: 'Two beads are released simultaneously from the same height. One slides along a straight line, the other along a cycloid. The cycloid always wins, despite being a longer path. Press <strong>Drop!</strong> to race them.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, hh = viz.height;

                            var running = false;
                            var t = 0;
                            var finished = [false, false];
                            var finishTimes = [0, 0];

                            VizEngine.createButton(controls, 'Drop!', function () { resetRace(); running = true; });
                            VizEngine.createButton(controls, 'Reset', function () { resetRace(); });

                            // Geometry: start at top-left, end at bottom-right
                            var margin = 60;
                            var startX = margin, startY = margin + 20;
                            var endX = w - margin, endY = hh - margin - 20;
                            var dx = endX - startX, dy = endY - startY;

                            // Cycloid parameters: find R such that cycloid goes from start to end
                            // x = R(theta - sin(theta)), y = R(1 - cos(theta))
                            // We need to solve for R and theta_f
                            // Approximate: for endpoint ratio dy/dx, iterate
                            var R, thetaF;
                            function solveCycloid() {
                                // Simple search for theta_f
                                var bestTheta = Math.PI;
                                var bestErr = 1e10;
                                for (var th = 0.5; th < 2 * Math.PI; th += 0.001) {
                                    var ratio = (1 - Math.cos(th)) / (th - Math.sin(th));
                                    var target = dy / dx;
                                    var err = Math.abs(ratio - target);
                                    if (err < bestErr) { bestErr = err; bestTheta = th; }
                                }
                                thetaF = bestTheta;
                                R = dx / (thetaF - Math.sin(thetaF));
                            }
                            solveCycloid();

                            // Convert parametric cycloid to screen coords
                            function cycloidScreen(theta) {
                                var cx = R * (theta - Math.sin(theta));
                                var cy = R * (1 - Math.cos(theta));
                                return [startX + cx * (dx / (R * (thetaF - Math.sin(thetaF)))),
                                        startY + cy * (dy / (R * (1 - Math.cos(thetaF))))];
                            }

                            // Physical parameters (scaled)
                            var gPhys = 600; // pixels/s^2 effective gravity along fall direction

                            // Straight line: s = 0.5*g_eff*t^2, where g_eff = g*sin(alpha)
                            var lineLen = Math.sqrt(dx * dx + dy * dy);
                            var sinAlpha = dy / lineLen;
                            var gLine = gPhys * sinAlpha;

                            // Cycloid: The time for a cycloid of radius R_phys is T = theta_f * sqrt(R_phys/g_phys)
                            // Map screen R to physical
                            var R_phys = R * (dy / (R * (1 - Math.cos(thetaF))));
                            var cycloidTotalTime = thetaF * Math.sqrt(R_phys / gPhys);

                            // Straight line total time
                            var lineTotalTime = Math.sqrt(2 * lineLen / gLine);

                            // Positions along paths
                            var linePos, cycloidPos;

                            function resetRace() {
                                t = 0;
                                running = false;
                                finished = [false, false];
                                finishTimes = [0, 0];
                                linePos = 0;
                                cycloidPos = 0;
                            }
                            resetRace();

                            function draw() {
                                viz.clear();

                                var dt2 = 0.016;
                                if (running) {
                                    t += dt2;

                                    // Line bead position (fraction along line)
                                    if (!finished[0]) {
                                        var s = 0.5 * gLine * t * t;
                                        linePos = s / lineLen;
                                        if (linePos >= 1) { linePos = 1; finished[0] = true; finishTimes[0] = t; }
                                    }

                                    // Cycloid bead: theta(t) from energy conservation
                                    // For cycloid, use the parametric solution
                                    // The speed at parameter theta is v = sqrt(2*g*y) = sqrt(2*g*R_phys*(1-cos(theta)))
                                    // ds = sqrt((dx/dtheta)^2 + (dy/dtheta)^2) dtheta = R_phys_eff * sqrt(2*(1-cos(theta))) dtheta
                                    // dt = ds/v = R_phys_eff*sqrt(2(1-cos(theta))) / sqrt(2*g*R_phys*(1-cos(theta))) * dtheta
                                    //    = sqrt(R_phys/g) * dtheta ... wait, this gives t = sqrt(R_phys/g)*theta
                                    // So theta = t * sqrt(g / R_phys)
                                    if (!finished[1]) {
                                        var theta = t * Math.sqrt(gPhys / R_phys);
                                        cycloidPos = theta / thetaF;
                                        if (cycloidPos >= 1) { cycloidPos = 1; finished[1] = true; finishTimes[1] = t; }
                                    }

                                    if (finished[0] && finished[1]) running = false;
                                }

                                // Draw paths
                                // Straight line (dashed)
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([8, 4]);
                                ctx.beginPath();
                                ctx.moveTo(startX, startY);
                                ctx.lineTo(endX, endY);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Cycloid curve
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var ci = 0; ci <= 200; ci++) {
                                    var theta2 = (ci / 200) * thetaF;
                                    var cs = cycloidScreen(theta2);
                                    if (ci === 0) ctx.moveTo(cs[0], cs[1]);
                                    else ctx.lineTo(cs[0], cs[1]);
                                }
                                ctx.stroke();

                                // Start and end markers
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath(); ctx.arc(startX, startY, 6, 0, Math.PI * 2); ctx.fill();
                                viz.screenText('Start', startX, startY - 14, viz.colors.green, 11);

                                ctx.fillStyle = viz.colors.red;
                                ctx.beginPath(); ctx.arc(endX, endY, 6, 0, Math.PI * 2); ctx.fill();
                                viz.screenText('End', endX, endY + 16, viz.colors.red, 11);

                                // Line bead
                                var lbx = startX + linePos * dx;
                                var lby = startY + linePos * dy;
                                // Glow
                                var lg = ctx.createRadialGradient(lbx, lby, 3, lbx, lby, 18);
                                lg.addColorStop(0, viz.colors.blue + '66');
                                lg.addColorStop(1, viz.colors.blue + '00');
                                ctx.fillStyle = lg;
                                ctx.beginPath(); ctx.arc(lbx, lby, 18, 0, Math.PI * 2); ctx.fill();

                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(lbx, lby, 8, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                                ctx.beginPath(); ctx.arc(lbx - 2, lby - 2, 3, 0, Math.PI * 2); ctx.fill();

                                // Cycloid bead
                                var cTheta = cycloidPos * thetaF;
                                var cScreen = cycloidScreen(cTheta);
                                var cbx = cScreen[0], cby = cScreen[1];

                                var cg = ctx.createRadialGradient(cbx, cby, 3, cbx, cby, 18);
                                cg.addColorStop(0, viz.colors.orange + '66');
                                cg.addColorStop(1, viz.colors.orange + '00');
                                ctx.fillStyle = cg;
                                ctx.beginPath(); ctx.arc(cbx, cby, 18, 0, Math.PI * 2); ctx.fill();

                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(cbx, cby, 8, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                                ctx.beginPath(); ctx.arc(cbx - 2, cby - 2, 3, 0, Math.PI * 2); ctx.fill();

                                // Legend and times
                                var infoY = 22;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(15, infoY - 5, 14, 3);
                                viz.screenText('Straight line', 35, infoY - 3, viz.colors.blue, 11, 'left');
                                if (finished[0]) {
                                    viz.screenText('t = ' + finishTimes[0].toFixed(3) + 's', 135, infoY - 3, viz.colors.blue, 10, 'left');
                                }

                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillRect(15, infoY + 13, 14, 3);
                                viz.screenText('Cycloid', 35, infoY + 15, viz.colors.orange, 11, 'left');
                                if (finished[1]) {
                                    viz.screenText('t = ' + finishTimes[1].toFixed(3) + 's', 135, infoY + 15, viz.colors.orange, 10, 'left');
                                }

                                if (finished[0] && finished[1]) {
                                    var winner = finishTimes[1] < finishTimes[0] ? 'Cycloid wins!' : 'Straight line wins!';
                                    var wColor = finishTimes[1] < finishTimes[0] ? viz.colors.orange : viz.colors.blue;
                                    viz.screenText(winner, w / 2, hh - 18, wColor, 15);
                                } else if (!running && t === 0) {
                                    viz.screenText('Press "Drop!" to start the race', w / 2, hh - 18, viz.colors.text, 12);
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Show that the time functional for the brachistochrone is \\(T[y] = \\int_0^{x_f} \\sqrt{(1 + y\'^2)/(2gy)}\\,dx\\).',
                        hint: 'The time element is \\(dt = ds/v\\), where \\(ds = \\sqrt{1+y\'^2}\\,dx\\) and \\(v = \\sqrt{2gy}\\) from energy conservation (starting from rest).',
                        solution: 'The bead starts from rest at \\(y=0\\). At height \\(y\\) below the start, energy conservation gives \\(\\frac{1}{2}mv^2 = mgy\\), so \\(v = \\sqrt{2gy}\\). The arc length element along the curve \\(y(x)\\) is \\(ds = \\sqrt{1 + (dy/dx)^2}\\,dx = \\sqrt{1+y\'^2}\\,dx\\). The time element is \\(dt = ds/v = \\sqrt{1+y\'^2}/(\\sqrt{2gy})\\,dx\\). Integrating from \\(x=0\\) to \\(x=x_f\\): \\(T = \\int_0^{x_f}\\sqrt{(1+y\'^2)/(2gy)}\\,dx\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Toward Lagrangian Mechanics
            // ============================================================
            {
                id: 'lagrangian-motivation',
                title: 'Toward Lagrangian Mechanics',
                content: `
<h2>Why Constraints Demand a Better Framework</h2>

<p>The examples in this chapter reveal a pattern. For each constrained system, we had to:</p>
<ol>
<li>Identify the constraints and choose coordinates that respect them.</li>
<li>Decompose forces into components along and perpendicular to the allowed motion.</li>
<li>Solve the tangential equation for the actual motion.</li>
<li>Solve the radial/normal equation separately for the constraint force (if needed).</li>
</ol>

<p>This Newtonian approach works, but it becomes increasingly cumbersome for systems with multiple constraints, multiple bodies, or curvilinear coordinates. The <strong>Lagrangian method</strong> (Chapter 20) automates steps 1-3 and eliminates step 4 entirely.</p>

<h3>The Key Idea</h3>

<div class="env-block intuition">
<div class="env-title">From Forces to Energies</div>
<div class="env-body">
<p>The Lagrangian approach replaces the vector equation \\(\\mathbf{F} = m\\mathbf{a}\\) with a scalar equation derived from the <strong>Lagrangian</strong> \\(L = T - V\\) (kinetic minus potential energy). Since energy is a scalar, it does not require decomposition into components. Constraints are handled automatically by the choice of generalized coordinates.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Preview: The Euler-Lagrange Equation</div>
<div class="env-body">
<p>For a system with generalized coordinate \\(q\\) and Lagrangian \\(L(q, \\dot{q}, t)\\), the equation of motion is:</p>
\\[\\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}} - \\frac{\\partial L}{\\partial q} = 0\\]
<p>This single equation replaces both the tangential and radial Newton equations. Constraint forces never appear (for holonomic constraints).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Pendulum via Lagrangian</div>
<div class="env-body">
<p>For the simple pendulum with generalized coordinate \\(\\theta\\):</p>
\\[T = \\tfrac{1}{2}mL^2\\dot{\\theta}^2, \\qquad V = -mgL\\cos\\theta\\]
\\[L = T - V = \\tfrac{1}{2}mL^2\\dot{\\theta}^2 + mgL\\cos\\theta\\]
<p>The Euler-Lagrange equation:</p>
\\[\\frac{d}{dt}(mL^2\\dot{\\theta}) - (-mgL\\sin\\theta) = 0 \\implies mL^2\\ddot{\\theta} + mgL\\sin\\theta = 0\\]
\\[\\ddot{\\theta} + \\frac{g}{L}\\sin\\theta = 0\\]
<p>We recover the pendulum equation in one line, with no need to decompose forces or find the tension. The constraint force (tension) has been eliminated automatically.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">What We Gain, What We Lose</div>
<div class="env-body">
<p>The Lagrangian method is computationally superior for deriving equations of motion. However, if you need the constraint force itself (e.g., to check whether a bead leaves a wire), you must reintroduce it via the method of Lagrange multipliers or go back to the Newtonian analysis. There is no free lunch: the constraint force information is present in Newton's approach and absent in the basic Lagrangian approach precisely because the Lagrangian was designed to eliminate it.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Bead on Rotating Hoop</div>
<div class="env-body">
<p>A bead slides on a frictionless circular hoop of radius \\(R\\) that rotates about its vertical diameter with angular velocity \\(\\omega\\). With generalized coordinate \\(\\theta\\) (angle from bottom of hoop):</p>
\\[T = \\tfrac{1}{2}mR^2\\dot{\\theta}^2 + \\tfrac{1}{2}mR^2\\omega^2\\sin^2\\theta\\]
\\[V = -mgR\\cos\\theta\\]
<p>The Euler-Lagrange equation gives:</p>
\\[\\ddot{\\theta} = \\omega^2\\sin\\theta\\cos\\theta - \\frac{g}{R}\\sin\\theta = \\sin\\theta\\left(\\omega^2\\cos\\theta - \\frac{g}{R}\\right)\\]
<p>This has equilibria at \\(\\theta = 0\\) (bottom) and \\(\\cos\\theta = g/(R\\omega^2)\\) (if \\(\\omega^2 > g/R\\)). Deriving this via Newtonian force decomposition would be far more laborious.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Use the Lagrangian method to derive the equation of motion for a bead sliding on a frictionless parabolic wire \\(y = ax^2\\) under gravity, using \\(x\\) as the generalized coordinate.',
                        hint: 'Write \\(T = \\frac{1}{2}m(\\dot{x}^2 + \\dot{y}^2)\\) with \\(\\dot{y} = 2ax\\dot{x}\\). Write \\(V = mgy = mgax^2\\). Apply the Euler-Lagrange equation.',
                        solution: '\\(\\dot{y} = 2ax\\dot{x}\\), so \\(T = \\frac{1}{2}m\\dot{x}^2(1 + 4a^2x^2)\\) and \\(V = mgax^2\\). The Lagrangian is \\(L = \\frac{1}{2}m\\dot{x}^2(1+4a^2x^2) - mgax^2\\). Compute: \\(\\partial L/\\partial \\dot{x} = m\\dot{x}(1+4a^2x^2)\\). \\(d/dt[m\\dot{x}(1+4a^2x^2)] = m\\ddot{x}(1+4a^2x^2) + 8ma^2x\\dot{x}^2\\). \\(\\partial L/\\partial x = 4ma^2x\\dot{x}^2 - 2mgax\\). Setting \\(d/dt(\\partial L/\\partial \\dot{x}) - \\partial L/\\partial x = 0\\): \\(m\\ddot{x}(1+4a^2x^2) + 4ma^2x\\dot{x}^2 + 2mgax = 0\\), or \\(\\ddot{x}(1+4a^2x^2) + 4a^2x\\dot{x}^2 + 2gax = 0\\). No constraint force appears.'
                    },
                    {
                        question: 'For the bead on a rotating hoop, find the critical rotation rate \\(\\omega_c\\) above which the bottom of the hoop becomes an unstable equilibrium.',
                        hint: 'Linearize the equation of motion about \\(\\theta = 0\\). For stability, the coefficient of \\(\\theta\\) must be negative (restoring).',
                        solution: 'Near \\(\\theta = 0\\): \\(\\sin\\theta \\approx \\theta\\), \\(\\cos\\theta \\approx 1\\). The equation becomes \\(\\ddot{\\theta} = \\theta(\\omega^2 - g/R)\\). For the bottom to be stable, we need \\(\\omega^2 - g/R < 0\\), i.e., \\(\\omega < \\omega_c = \\sqrt{g/R}\\). For \\(\\omega > \\omega_c\\), the bottom becomes unstable and two new stable equilibria appear at \\(\\cos\\theta = g/(R\\omega^2)\\).'
                    }
                ]
            }
        ]
    });
})();
