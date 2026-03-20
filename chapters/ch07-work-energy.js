// === Chapter 7: Work & Kinetic Energy ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch07',
        number: 7,
        title: 'Work & Kinetic Energy',
        subtitle: 'Work as a line integral, the work-energy theorem, and the deep shift from forces to scalars',
        file: 'ch07-work-energy',

        sections: [
            // ============================================================
            // Section 0: Work Done by a Force
            // ============================================================
            {
                id: 'work-definition',
                title: 'Work Done by a Force',
                content: `
<h2>From Force to Scalar</h2>

<p>We have been solving mechanics problems by analyzing forces (vectors). Now we introduce a scalar quantity, <strong>work</strong>, that packages the effect of a force along a path into a single number. This is the gateway to energy methods, which are often more powerful than direct force analysis.</p>

<div class="env-block definition">
<div class="env-title">Definition: Work (Constant Force)</div>
<div class="env-body">
<p>The work done by a constant force \\(\\mathbf{F}\\) on a particle that undergoes displacement \\(\\Delta\\mathbf{r}\\) is:</p>
\\[W = \\mathbf{F} \\cdot \\Delta\\mathbf{r} = |\\mathbf{F}||\\Delta\\mathbf{r}|\\cos\\theta\\]
<p>where \\(\\theta\\) is the angle between \\(\\mathbf{F}\\) and \\(\\Delta\\mathbf{r}\\). Work is a scalar with SI units of joules (J = N m).</p>
</div>
</div>

<p>Key observations:</p>
<ul>
<li>If \\(\\mathbf{F} \\perp \\Delta\\mathbf{r}\\), the force does zero work. (Normal forces, centripetal forces, Coriolis force.)</li>
<li>If \\(\\theta < 90^\\circ\\), \\(W > 0\\): the force speeds up the particle. If \\(\\theta > 90^\\circ\\), \\(W < 0\\): the force slows it down.</li>
<li>Work is done by a <em>specific force</em> on a <em>specific object</em>. Different forces acting on the same object do different amounts of work.</li>
</ul>

<h3>Work as a Line Integral</h3>

<p>For a force that varies along the path, we must sum the infinitesimal work \\(dW = \\mathbf{F}\\cdot d\\mathbf{r}\\) over the entire path:</p>

<div class="env-block definition">
<div class="env-title">Definition: Work (General, Variable Force)</div>
<div class="env-body">
\\[W = \\int_C \\mathbf{F} \\cdot d\\mathbf{r} = \\int_A^B \\mathbf{F}(\\mathbf{r}) \\cdot d\\mathbf{r}\\]
<p>This is a <strong>line integral</strong> of the force field along the curve \\(C\\) from point \\(A\\) to point \\(B\\). In Cartesian coordinates:</p>
\\[W = \\int_A^B (F_x\\,dx + F_y\\,dy + F_z\\,dz)\\]
</div>
</div>

<div class="env-block intuition">
<div class="env-title">The Geometry of Work</div>
<div class="env-body">
<p>The line integral \\(\\int \\mathbf{F}\\cdot d\\mathbf{r}\\) projects the force onto the tangent to the path at each point and accumulates the result. It measures how much the force "pushes along" the motion, summed over the entire trajectory. Forces perpendicular to the path contribute nothing.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Work by a Spring</div>
<div class="env-body">
<p>A spring with constant \\(k\\) exerts force \\(F = -kx\\) (Hooke's law). The work done by the spring as the mass moves from \\(x_1\\) to \\(x_2\\):</p>
\\[W = \\int_{x_1}^{x_2} (-kx)\\,dx = -\\tfrac{1}{2}k(x_2^2 - x_1^2) = \\tfrac{1}{2}kx_1^2 - \\tfrac{1}{2}kx_2^2\\]
<p>When the spring is compressed further (\\(|x_2| > |x_1|\\)), the spring does negative work (stores energy). When released (\\(|x_2| < |x_1|\\)), it does positive work (releases energy).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A force \\(\\mathbf{F} = (3x^2\\hat{x} + 2y\\hat{y})\\) N acts on a particle. Compute the work done as the particle moves from \\((0,0)\\) to \\((1,1)\\) along the path \\(y = x\\).',
                        hint: 'Parametrize: \\(x = t\\), \\(y = t\\), \\(dx = dt\\), \\(dy = dt\\), with \\(t\\) from 0 to 1.',
                        solution: '\\(W = \\int_0^1 [3t^2(1) + 2t(1)]\\,dt = \\int_0^1 (3t^2 + 2t)\\,dt = [t^3 + t^2]_0^1 = 1 + 1 = 2\\) J.'
                    },
                    {
                        question: 'Show that the normal force on a particle sliding on a surface does zero work.',
                        hint: 'The normal force is perpendicular to the surface, and the displacement \\(d\\mathbf{r}\\) is tangent to the surface.',
                        solution: 'The normal force \\(\\mathbf{N}\\) is, by definition, perpendicular to the surface at every point. The displacement \\(d\\mathbf{r}\\) of a particle sliding on the surface lies in the tangent plane. Therefore \\(\\mathbf{N}\\cdot d\\mathbf{r} = 0\\) at every point, and \\(W = \\int \\mathbf{N}\\cdot d\\mathbf{r} = 0\\).'
                    }
                ]
            },

            // ============================================================
            // Section 1: The Work-Energy Theorem
            // ============================================================
            {
                id: 'work-energy-theorem',
                title: 'Work-Energy Theorem',
                content: `
<h2>The Bridge Between Force and Energy</h2>

<p>The work-energy theorem is one of the most useful results in mechanics. It relates the total work done on a particle to the change in its kinetic energy, without requiring knowledge of the detailed trajectory.</p>

<h3>Derivation</h3>

<p>Start from Newton's second law: \\(\\mathbf{F}_{\\text{net}} = m\\mathbf{a}\\). Take the dot product with the velocity \\(\\mathbf{v} = d\\mathbf{r}/dt\\):</p>

\\[\\mathbf{F}_{\\text{net}} \\cdot \\mathbf{v} = m\\mathbf{a}\\cdot\\mathbf{v} = m\\frac{d\\mathbf{v}}{dt}\\cdot\\mathbf{v} = \\frac{d}{dt}\\left(\\tfrac{1}{2}mv^2\\right)\\]

<p>where we used the identity \\(d(v^2)/dt = d(\\mathbf{v}\\cdot\\mathbf{v})/dt = 2\\mathbf{v}\\cdot d\\mathbf{v}/dt\\). Integrating over time from \\(t_1\\) to \\(t_2\\):</p>

\\[\\int_{t_1}^{t_2} \\mathbf{F}_{\\text{net}}\\cdot\\mathbf{v}\\,dt = \\tfrac{1}{2}mv_2^2 - \\tfrac{1}{2}mv_1^2\\]

<p>The left side is the total work (since \\(\\mathbf{v}\\,dt = d\\mathbf{r}\\)):</p>

<div class="env-block theorem">
<div class="env-title">Work-Energy Theorem</div>
<div class="env-body">
\\[W_{\\text{net}} = \\int_A^B \\mathbf{F}_{\\text{net}}\\cdot d\\mathbf{r} = \\Delta K = \\tfrac{1}{2}mv_B^2 - \\tfrac{1}{2}mv_A^2\\]
<p>The net work done on a particle by all forces equals the change in the particle's kinetic energy \\(K = \\frac{1}{2}mv^2\\).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Remarks on the Theorem</div>
<div class="env-body">
<ul>
<li>This is not an assumption or a definition; it is a <em>theorem</em>, derived directly from \\(\\mathbf{F} = m\\mathbf{a}\\).</li>
<li>It holds for <em>any</em> force (conservative or not, constant or not).</li>
<li>It is a scalar equation, which is why it is often easier to use than the vector equation \\(\\mathbf{F} = m\\mathbf{a}\\).</li>
<li>It gives the speed, not the direction of motion. If you need the trajectory, you still need Newton's second law.</li>
</ul>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Block on a Rough Incline</div>
<div class="env-body">
<p>A block of mass \\(m\\) slides distance \\(d\\) down a rough incline (angle \\(\\alpha\\), kinetic friction coefficient \\(\\mu_k\\)), starting from rest. Find the final speed.</p>
<p>The forces: gravity component along incline \\(mg\\sin\\alpha\\) (positive work), friction \\(\\mu_k mg\\cos\\alpha\\) (negative work), normal force (zero work). Net work:</p>
\\[W_{\\text{net}} = mgd\\sin\\alpha - \\mu_k mgd\\cos\\alpha = mgd(\\sin\\alpha - \\mu_k\\cos\\alpha)\\]
<p>By the work-energy theorem: \\(\\frac{1}{2}mv^2 = mgd(\\sin\\alpha - \\mu_k\\cos\\alpha)\\), so:</p>
\\[v = \\sqrt{2gd(\\sin\\alpha - \\mu_k\\cos\\alpha)}\\]
</div>
</div>

<div class="env-block warning">
<div class="env-title">Warning: Work by Individual Forces</div>
<div class="env-body">
<p>The work-energy theorem uses the <em>net</em> work (work by the net force). You can equivalently sum the work done by each individual force. But be careful: if multiple forces act, each does its own work, and these can have different signs. The net work is the algebraic sum.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Derive the work-energy theorem starting from \\(\\mathbf{F} = m\\mathbf{a}\\). Clearly identify where you use the chain rule.',
                        hint: 'Dot both sides with \\(\\mathbf{v}\\) and use \\(\\mathbf{a}\\cdot\\mathbf{v} = \\frac{d}{dt}(\\frac{1}{2}v^2)\\).',
                        solution: 'Start: \\(\\mathbf{F}_{\\text{net}} = m\\dot{\\mathbf{v}}\\). Dot with \\(\\mathbf{v}\\): \\(\\mathbf{F}_{\\text{net}}\\cdot\\mathbf{v} = m\\dot{\\mathbf{v}}\\cdot\\mathbf{v}\\). The chain rule gives: \\(\\frac{d}{dt}(\\mathbf{v}\\cdot\\mathbf{v}) = 2\\dot{\\mathbf{v}}\\cdot\\mathbf{v}\\), so \\(\\dot{\\mathbf{v}}\\cdot\\mathbf{v} = \\frac{1}{2}\\frac{d}{dt}(v^2)\\). Thus \\(\\mathbf{F}_{\\text{net}}\\cdot\\mathbf{v} = \\frac{d}{dt}(\\frac{1}{2}mv^2) = \\dot{K}\\). Since \\(\\mathbf{F}\\cdot\\mathbf{v}\\,dt = \\mathbf{F}\\cdot d\\mathbf{r} = dW\\), integrating: \\(W_{\\text{net}} = \\Delta K\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Work in Multiple Dimensions
            // ============================================================
            {
                id: 'work-line-integral',
                title: 'Work as a Line Integral',
                content: `
<h2>Path Integrals and Path Dependence</h2>

<p>In one dimension, the work integral \\(\\int F\\,dx\\) is an ordinary integral and always gives the same result regardless of how fast or slow the particle moves. But in two or more dimensions, the line integral \\(\\int_C \\mathbf{F}\\cdot d\\mathbf{r}\\) depends on the <em>path</em> \\(C\\), not just the endpoints, unless the force has a special property (conservativeness).</p>

<div class="env-block definition">
<div class="env-title">Definition: Conservative Force</div>
<div class="env-body">
<p>A force \\(\\mathbf{F}(\\mathbf{r})\\) is <strong>conservative</strong> if the work it does depends only on the endpoints and not on the path:</p>
\\[\\oint \\mathbf{F}\\cdot d\\mathbf{r} = 0 \\quad \\text{for every closed loop}\\]
<p>Equivalently, \\(\\mathbf{F}\\) is conservative if and only if there exists a scalar function \\(V(\\mathbf{r})\\) such that \\(\\mathbf{F} = -\\nabla V\\). The function \\(V\\) is the <strong>potential energy</strong>.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Curl Test for Conservativeness</div>
<div class="env-body">
<p>A force field \\(\\mathbf{F}(\\mathbf{r})\\) (defined on a simply connected domain) is conservative if and only if:</p>
\\[\\nabla \\times \\mathbf{F} = \\mathbf{0}\\]
<p>In 2D, this reduces to: \\(\\partial F_x/\\partial y = \\partial F_y/\\partial x\\).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-work-path"></div>

<div class="env-block example">
<div class="env-title">Example: Path Dependence of a Non-Conservative Force</div>
<div class="env-body">
<p>Consider \\(\\mathbf{F} = (y, 0)\\). Check: \\(\\partial F_x/\\partial y = 1\\) but \\(\\partial F_y/\\partial x = 0\\). Since these are unequal, \\(\\mathbf{F}\\) is not conservative.</p>
<p><strong>Path 1:</strong> \\((0,0) \\to (1,0) \\to (1,1)\\). Along \\(y=0\\): \\(W_1 = \\int_0^1 0\\,dx = 0\\). Along \\(x=1\\): \\(W_2 = \\int_0^1 0\\,dy = 0\\). Total: \\(W = 0\\).</p>
<p><strong>Path 2:</strong> \\((0,0) \\to (0,1) \\to (1,1)\\). Along \\(x=0\\): \\(W_1 = 0\\). Along \\(y=1\\): \\(W_2 = \\int_0^1 1\\,dx = 1\\). Total: \\(W = 1\\).</p>
<p>Different paths give different work. This force is non-conservative.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Why Path Dependence Matters</div>
<div class="env-body">
<p>For conservative forces, we can define a potential energy and use energy conservation (a powerful shortcut). For non-conservative forces (friction, drag, general velocity-dependent forces), there is no potential energy, and work depends on the specific path taken. Energy methods still apply (via the work-energy theorem), but there is no conservation law for mechanical energy.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-work-path',
                        title: 'Work Along Different Paths in a Force Field',
                        description: 'A non-conservative force field \\(\\mathbf{F} = (y, -x)/r\\) is shown. The particle travels from A to B along two different paths. The accumulated work differs, demonstrating path dependence. Drag point <strong>B</strong> to explore.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 50, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, hh = viz.height;
                            viz.originX = w / 2;
                            viz.originY = hh / 2;

                            // Non-conservative force: F = (y, -x) (like a vortex)
                            function forceField(x, y) {
                                return [y, -x];
                            }

                            // Draggable endpoint
                            var bPt = viz.addDraggable('B', 2.5, 2.0, viz.colors.red, 8);
                            var aPt = { x: -2, y: -1.5 };

                            function computeWork(path) {
                                var W = 0;
                                for (var i = 1; i < path.length; i++) {
                                    var mx = (path[i - 1][0] + path[i][0]) / 2;
                                    var my = (path[i - 1][1] + path[i][1]) / 2;
                                    var f = forceField(mx, my);
                                    var dx = path[i][0] - path[i - 1][0];
                                    var dy = path[i][1] - path[i - 1][1];
                                    W += f[0] * dx + f[1] * dy;
                                }
                                return W;
                            }

                            function makePath1() {
                                // Path 1: straight line A -> B
                                var pts = [];
                                var N = 200;
                                for (var i = 0; i <= N; i++) {
                                    var t = i / N;
                                    pts.push([aPt.x + t * (bPt.x - aPt.x), aPt.y + t * (bPt.y - aPt.y)]);
                                }
                                return pts;
                            }

                            function makePath2() {
                                // Path 2: go right first, then up (L-shape)
                                var pts = [];
                                var N = 100;
                                for (var i = 0; i <= N; i++) {
                                    var t = i / N;
                                    pts.push([aPt.x + t * (bPt.x - aPt.x), aPt.y]);
                                }
                                for (var j = 1; j <= N; j++) {
                                    var t2 = j / N;
                                    pts.push([bPt.x, aPt.y + t2 * (bPt.y - aPt.y)]);
                                }
                                return pts;
                            }

                            function makePath3() {
                                // Path 3: curved arc (quarter circle if roughly same distance)
                                var pts = [];
                                var N = 200;
                                var mx = (aPt.x + bPt.x) / 2;
                                var my = (aPt.y + bPt.y) / 2;
                                var dx = bPt.x - aPt.x;
                                var dy = bPt.y - aPt.y;
                                for (var i = 0; i <= N; i++) {
                                    var t = i / N;
                                    var bulge = 1.5 * Math.sin(Math.PI * t);
                                    pts.push([
                                        aPt.x + t * dx - bulge * dy * 0.3,
                                        aPt.y + t * dy + bulge * dx * 0.3
                                    ]);
                                }
                                return pts;
                            }

                            function draw() {
                                viz.clear();
                                viz.drawGrid(1);
                                viz.drawAxes();

                                // Draw force field arrows
                                var step = 0.8;
                                var xMin = -4, xMax = 4, yMin = -3, yMax = 3;
                                for (var gx = xMin; gx <= xMax; gx += step) {
                                    for (var gy = yMin; gy <= yMax; gy += step) {
                                        var f = forceField(gx, gy);
                                        var mag = Math.sqrt(f[0] * f[0] + f[1] * f[1]);
                                        if (mag < 0.01) continue;
                                        var sc = 0.15;
                                        var sp1 = viz.toScreen(gx, gy);
                                        var sp2 = viz.toScreen(gx + f[0] * sc, gy + f[1] * sc);

                                        ctx.strokeStyle = viz.colors.teal + '55';
                                        ctx.lineWidth = 1;
                                        ctx.beginPath();
                                        ctx.moveTo(sp1[0], sp1[1]);
                                        ctx.lineTo(sp2[0], sp2[1]);
                                        ctx.stroke();

                                        // Tiny arrowhead
                                        var adx = sp2[0] - sp1[0], ady = sp2[1] - sp1[1];
                                        var aLen = Math.sqrt(adx * adx + ady * ady);
                                        if (aLen > 2) {
                                            var angle = Math.atan2(ady, adx);
                                            ctx.fillStyle = viz.colors.teal + '55';
                                            ctx.beginPath();
                                            ctx.moveTo(sp2[0], sp2[1]);
                                            ctx.lineTo(sp2[0] - 4 * Math.cos(angle - 0.4), sp2[1] - 4 * Math.sin(angle - 0.4));
                                            ctx.lineTo(sp2[0] - 4 * Math.cos(angle + 0.4), sp2[1] - 4 * Math.sin(angle + 0.4));
                                            ctx.fill();
                                        }
                                    }
                                }

                                // Compute paths and work
                                var path1 = makePath1();
                                var path2 = makePath2();
                                var path3 = makePath3();

                                var W1 = computeWork(path1);
                                var W2 = computeWork(path2);
                                var W3 = computeWork(path3);

                                // Draw paths
                                function drawPath(pts, color, lw, dash) {
                                    ctx.strokeStyle = color;
                                    ctx.lineWidth = lw;
                                    if (dash) ctx.setLineDash(dash);
                                    ctx.beginPath();
                                    for (var i = 0; i < pts.length; i++) {
                                        var sp = viz.toScreen(pts[i][0], pts[i][1]);
                                        if (i === 0) ctx.moveTo(sp[0], sp[1]);
                                        else ctx.lineTo(sp[0], sp[1]);
                                    }
                                    ctx.stroke();
                                    if (dash) ctx.setLineDash([]);
                                }

                                drawPath(path1, viz.colors.blue, 2.5, null);
                                drawPath(path2, viz.colors.orange, 2.5, null);
                                drawPath(path3, viz.colors.purple, 2, [6, 4]);

                                // Point A
                                var ap = viz.toScreen(aPt.x, aPt.y);
                                ctx.fillStyle = viz.colors.green;
                                ctx.beginPath(); ctx.arc(ap[0], ap[1], 7, 0, Math.PI * 2); ctx.fill();
                                viz.screenText('A', ap[0] - 14, ap[1] - 2, viz.colors.green, 13);

                                // Point B (draggable)
                                viz.drawDraggables();
                                viz.screenText('B', viz.toScreen(bPt.x, bPt.y)[0] + 14, viz.toScreen(bPt.x, bPt.y)[1] - 2, viz.colors.red, 13);

                                // Work labels
                                var panelX = 12, panelY = 14;
                                ctx.fillStyle = viz.colors.bg + 'dd';
                                ctx.fillRect(panelX - 4, panelY - 8, 210, 68);

                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(panelX, panelY, 14, 3);
                                viz.screenText('Straight: W = ' + W1.toFixed(3) + ' J', panelX + 20, panelY + 2, viz.colors.blue, 11, 'left');

                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillRect(panelX, panelY + 18, 14, 3);
                                viz.screenText('L-path:    W = ' + W2.toFixed(3) + ' J', panelX + 20, panelY + 20, viz.colors.orange, 11, 'left');

                                ctx.fillStyle = viz.colors.purple;
                                ctx.strokeStyle = viz.colors.purple; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
                                ctx.beginPath(); ctx.moveTo(panelX, panelY + 36); ctx.lineTo(panelX + 14, panelY + 36); ctx.stroke(); ctx.setLineDash([]);
                                viz.screenText('Curved:   W = ' + W3.toFixed(3) + ' J', panelX + 20, panelY + 38, viz.colors.purple, 11, 'left');

                                // Field label
                                viz.screenText('F = (y, \u2212x)', w / 2, hh - 14, viz.colors.teal, 12);
                                viz.screenText('Non-conservative: \u2207\u00d7F \u2260 0', w / 2, hh - 30, viz.colors.text, 10);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Verify that the force \\(\\mathbf{F} = (y, -x)\\) is non-conservative by computing \\(\\nabla\\times\\mathbf{F}\\) (the \\(z\\)-component of the curl in 2D).',
                        hint: '\\((\\nabla\\times\\mathbf{F})_z = \\partial F_y/\\partial x - \\partial F_x/\\partial y\\).',
                        solution: '\\((\\nabla\\times\\mathbf{F})_z = \\partial(-x)/\\partial x - \\partial(y)/\\partial y = -1 - 1 = -2 \\neq 0\\). The curl is nonzero everywhere, so the force is non-conservative. Physically, this is a rotational (vortex-like) force field, and work around a closed loop is nonzero.'
                    },
                    {
                        question: 'Is the gravitational force \\(\\mathbf{F} = -mg\\hat{y}\\) conservative? If so, find the potential energy \\(V(x,y)\\).',
                        hint: 'Check the curl. Then integrate \\(F_y = -\\partial V/\\partial y\\).',
                        solution: 'Curl: \\(\\partial F_y/\\partial x - \\partial F_x/\\partial y = 0 - 0 = 0\\). Conservative. From \\(F_y = -mg = -\\partial V/\\partial y\\), integrate: \\(V = mgy + f(x)\\). From \\(F_x = 0 = -\\partial V/\\partial x = -f\'(x)\\), so \\(f(x) = C\\). Thus \\(V(x,y) = mgy + C\\), the familiar gravitational potential energy.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Variable Forces & Power
            // ============================================================
            {
                id: 'variable-forces-power',
                title: 'Variable Forces & Power',
                content: `
<h2>Work Done by Variable Forces</h2>

<p>Many forces in nature vary with position. Springs obey Hooke's law (\\(F \\propto x\\)), gravity varies as \\(1/r^2\\), and air resistance depends on speed. Computing work for such forces requires integration.</p>

<div class="env-block example">
<div class="env-title">Example: Work Against Gravity (Exact, \\(1/r^2\\) Law)</div>
<div class="env-body">
<p>The gravitational force on mass \\(m\\) at distance \\(r\\) from a planet of mass \\(M\\):</p>
\\[F = -\\frac{GMm}{r^2}\\hat{r}\\]
<p>Work done by gravity as the mass moves from \\(r_1\\) to \\(r_2\\) (radially):</p>
\\[W = \\int_{r_1}^{r_2} \\left(-\\frac{GMm}{r^2}\\right)dr = GMm\\left(\\frac{1}{r_2} - \\frac{1}{r_1}\\right)\\]
<p>If \\(r_2 > r_1\\) (moving away from the planet), \\(W < 0\\): gravity does negative work. The potential energy is \\(V(r) = -GMm/r\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Work by a Position-Dependent Force</div>
<div class="env-body">
<p>A particle moves along the \\(x\\)-axis under force \\(F(x) = F_0 e^{-x/a}\\). Work from \\(x = 0\\) to \\(x = d\\):</p>
\\[W = \\int_0^d F_0 e^{-x/a}\\,dx = -F_0 a\\left[e^{-x/a}\\right]_0^d = F_0 a\\left(1 - e^{-d/a}\\right)\\]
<p>For \\(d \\ll a\\): \\(W \\approx F_0 d\\) (constant-force approximation). For \\(d \\gg a\\): \\(W \\to F_0 a\\) (the force decays, and there is a maximum total work).</p>
</div>
</div>

<h3>Power</h3>

<div class="env-block definition">
<div class="env-title">Definition: Power</div>
<div class="env-body">
<p><strong>Power</strong> is the rate at which work is done:</p>
\\[P = \\frac{dW}{dt} = \\mathbf{F}\\cdot\\mathbf{v}\\]
<p>SI unit: watt (W = J/s). Power is a scalar that can be positive (force adds energy), negative (force removes energy), or zero (force perpendicular to velocity).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Power at Terminal Velocity</div>
<div class="env-body">
<p>At terminal velocity, the net force is zero and acceleration is zero. But individual forces still do work. Gravity does work at rate \\(P_{\\text{grav}} = mgv_T\\), and drag does work at rate \\(P_{\\text{drag}} = -mgv_T\\). The total power is zero (consistent with \\(\\Delta K = 0\\)). All the gravitational potential energy is being dissipated by drag.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Power Required to Climb a Hill</div>
<div class="env-body">
<p>A cyclist (total mass 80 kg) climbs a 6% grade at 5 m/s. The power against gravity:</p>
\\[P = mgv\\sin\\theta = 80(9.8)(5)(0.06) \\approx 235 \\text{ W}\\]
<p>This is about 0.32 horsepower, a sustainable effort for a fit cyclist. Adding rolling resistance (~10 W) and air drag (~15 W at 5 m/s), the total is about 260 W.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Work-Energy Theorem in Terms of Power</div>
<div class="env-body">
\\[P_{\\text{net}} = \\frac{dK}{dt}\\]
<p>The net power delivered to a particle equals the rate of change of its kinetic energy.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A car engine delivers constant power \\(P\\) to accelerate a car of mass \\(m\\) from rest on a level road (ignore drag). Find \\(v(t)\\).',
                        hint: 'Use \\(P = Fv = mav = mv\\,dv/dt\\). Separate variables: \\(v\\,dv = (P/m)dt\\).',
                        solution: '\\(P = mv\\,dv/dt\\), so \\(v\\,dv = (P/m)dt\\). Integrating with \\(v(0)=0\\): \\(\\frac{1}{2}v^2 = Pt/m\\), giving \\(v = \\sqrt{2Pt/m}\\). The speed grows as \\(\\sqrt{t}\\), not linearly (because as the car speeds up, the force \\(F = P/v\\) decreases). The distance is \\(x = \\int_0^t v\\,dt\' = \\frac{2}{3}\\sqrt{2P/m}\\,t^{3/2}\\).'
                    },
                    {
                        question: 'Show that the average power over a time interval equals the total work divided by the time: \\(\\bar{P} = W/\\Delta t\\).',
                        hint: 'This follows directly from the definition \\(W = \\int P\\,dt\\).',
                        solution: 'By definition, \\(W = \\int_{t_1}^{t_2} P(t)\\,dt\\). The average power is \\(\\bar{P} = \\frac{1}{\\Delta t}\\int_{t_1}^{t_2} P(t)\\,dt = W/\\Delta t\\), where \\(\\Delta t = t_2 - t_1\\). This is the mean value theorem for integrals applied to power.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Applications & Conceptual Synthesis
            // ============================================================
            {
                id: 'applications-synthesis',
                title: 'Applications & Synthesis',
                content: `
<h2>Putting Work-Energy to Use</h2>

<p>The work-energy theorem is often the fastest route to a problem's answer when you want the speed at some point and do not care about the time or trajectory details. Here we work through several instructive applications.</p>

<div class="env-block example">
<div class="env-title">Example: Bead on a Vertical Loop</div>
<div class="env-body">
<p>A bead slides on a frictionless vertical circular loop of radius \\(R\\). It is released from the top. What is its speed at the bottom? What normal force does the track exert at the bottom?</p>
<p><strong>Speed:</strong> By work-energy theorem (only gravity does work), \\(\\frac{1}{2}mv^2 = mg(2R)\\), so \\(v = 2\\sqrt{gR}\\).</p>
<p><strong>Normal force:</strong> At the bottom, the net upward force provides centripetal acceleration: \\(N - mg = mv^2/R = 4mg\\), so \\(N = 5mg\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Escape Velocity</div>
<div class="env-body">
<p>What is the minimum launch speed for a projectile to escape the Earth's gravity (reach \\(r \\to \\infty\\) with \\(v \\to 0\\))?</p>
<p>Work-energy theorem from surface (\\(r = R_E\\)) to infinity:</p>
\\[0 - \\tfrac{1}{2}mv_{\\text{esc}}^2 = W_{\\text{grav}} = GMm\\left(\\frac{1}{\\infty} - \\frac{1}{R_E}\\right) = -\\frac{GMm}{R_E}\\]
\\[v_{\\text{esc}} = \\sqrt{\\frac{2GM}{R_E}} = \\sqrt{2gR_E} \\approx 11.2 \\text{ km/s}\\]
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Roller Coaster with Friction</div>
<div class="env-body">
<p>A roller coaster car (mass \\(m\\)) starts from height \\(h\\) with zero speed and descends to ground level over a track of total length \\(s\\). The coefficient of kinetic friction is \\(\\mu_k\\) and the normal force varies along the track, but the average normal force is \\(\\bar{N}\\). By the work-energy theorem:</p>
\\[\\tfrac{1}{2}mv^2 = mgh - \\mu_k \\bar{N} s\\]
<p>This gives the final speed without knowing the detailed shape of the track. The only information needed is the height drop and the total friction work.</p>
</div>
</div>

<h3>When to Use Work-Energy vs. Newton's Laws</h3>

<div class="env-block remark">
<div class="env-title">Choosing Your Approach</div>
<div class="env-body">
<p>Use the <strong>work-energy theorem</strong> when:</p>
<ul>
<li>You want the speed at a point (not the trajectory).</li>
<li>You can compute the work done by all forces easily.</li>
<li>Some forces (like normal forces) do zero work, simplifying the calculation.</li>
</ul>
<p>Use <strong>Newton's second law</strong> when:</p>
<ul>
<li>You need the trajectory \\(\\mathbf{r}(t)\\).</li>
<li>You need the time of transit.</li>
<li>You need the constraint forces (normal force, tension).</li>
</ul>
<p>In practice, you often use both: work-energy to find speeds, then Newton's law at specific points to find forces.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-work-accumulation"></div>

<div class="env-block theorem">
<div class="env-title">Summary: The Energy Hierarchy</div>
<div class="env-body">
<p>Chapter 7 establishes:</p>
<ul>
<li><strong>Kinetic energy</strong> \\(K = \\frac{1}{2}mv^2\\): the energy of motion.</li>
<li><strong>Work</strong> \\(W = \\int \\mathbf{F}\\cdot d\\mathbf{r}\\): how forces transfer energy.</li>
<li><strong>Work-energy theorem</strong>: \\(W_{\\text{net}} = \\Delta K\\).</li>
<li><strong>Power</strong>: \\(P = \\mathbf{F}\\cdot\\mathbf{v} = dW/dt\\).</li>
</ul>
<p>Next (Chapter 8): We introduce <strong>potential energy</strong> for conservative forces, leading to the conservation of total mechanical energy \\(E = K + V\\).</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-work-accumulation',
                        title: 'Work Accumulation Along a Path',
                        description: 'A particle moves through a force field. The bar on the right shows the accumulated work \\(W = \\int \\mathbf{F}\\cdot d\\mathbf{r}\\) and the kinetic energy, demonstrating the work-energy theorem in real time.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 50, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, hh = viz.height;
                            viz.originX = w * 0.4;
                            viz.originY = hh / 2;

                            var t = 0;
                            var running = true;

                            VizEngine.createButton(controls, 'Reset', function () { t = 0; running = true; state = [startX, startY, 1.5, 1.0]; trail = []; workAcc = 0; });
                            VizEngine.createButton(controls, 'Pause / Resume', function () { running = !running; });

                            // Conservative force field: F = -grad(V) with V = 0.5*(x^2 + 2*y^2) (anisotropic oscillator)
                            function forceAt(x, y) {
                                return [-x, -2 * y];
                            }

                            var startX = -3, startY = -1.5;
                            var state = [startX, startY, 1.5, 1.0];
                            var trail = [];
                            var workAcc = 0;
                            var mass = 1.0;

                            function derivs(s) {
                                var f = forceAt(s[0], s[1]);
                                return [s[2], s[3], f[0] / mass, f[1] / mass];
                            }

                            // Bar chart layout
                            var barX = w * 0.82, barW = 22, barH = hh * 0.35;
                            var barBaseY = hh / 2 + barH / 2;

                            function draw() {
                                viz.clear();
                                viz.drawGrid(1);
                                viz.drawAxes('x', 'y');

                                var dt = 0.004;
                                var steps = 8;

                                if (running && t < 30) {
                                    for (var si = 0; si < steps; si++) {
                                        var oldState = state.slice();
                                        state = VizEngine.rk4(state, t, dt, derivs);
                                        t += dt;

                                        // Accumulate work: F dot dr
                                        var mx = (oldState[0] + state[0]) / 2;
                                        var my = (oldState[1] + state[1]) / 2;
                                        var f = forceAt(mx, my);
                                        var dx = state[0] - oldState[0];
                                        var dy = state[1] - oldState[1];
                                        workAcc += f[0] * dx + f[1] * dy;
                                    }

                                    trail.push([state[0], state[1]]);
                                    if (trail.length > 800) trail.shift();
                                }

                                // Draw force field arrows
                                var step = 1.0;
                                for (var gx = -4; gx <= 3; gx += step) {
                                    for (var gy = -3; gy <= 3; gy += step) {
                                        var ff = forceAt(gx, gy);
                                        var fmag = Math.sqrt(ff[0] * ff[0] + ff[1] * ff[1]);
                                        if (fmag < 0.01) continue;
                                        var fsc = 0.12;
                                        var fp1 = viz.toScreen(gx, gy);
                                        var fp2 = viz.toScreen(gx + ff[0] * fsc, gy + ff[1] * fsc);

                                        ctx.strokeStyle = viz.colors.teal + '40';
                                        ctx.lineWidth = 1;
                                        ctx.beginPath();
                                        ctx.moveTo(fp1[0], fp1[1]);
                                        ctx.lineTo(fp2[0], fp2[1]);
                                        ctx.stroke();
                                    }
                                }

                                // Trail
                                viz.drawTrail(trail, viz.colors.blue, 0.6);

                                // Particle
                                viz.drawBall(state[0], state[1], 0.12, viz.colors.orange, 2.5);

                                // Velocity vector
                                viz.drawVector(state[0], state[1], state[2] * 0.25, state[3] * 0.25, viz.colors.green, 'v', 2, 7);

                                // Force vector at particle
                                var fp = forceAt(state[0], state[1]);
                                viz.drawVector(state[0], state[1], fp[0] * 0.15, fp[1] * 0.15, viz.colors.red, 'F', 2, 7);

                                // Kinetic energy
                                var KE = 0.5 * mass * (state[2] * state[2] + state[3] * state[3]);
                                var KE0 = 0.5 * mass * (1.5 * 1.5 + 1.0 * 1.0);

                                // Energy bars
                                var maxE = Math.max(KE0 * 2.5, 1);
                                var keBarH = (KE / maxE) * barH;
                                var workBarH = (workAcc / maxE) * barH;

                                // Background panel
                                ctx.fillStyle = viz.colors.bg + 'cc';
                                ctx.fillRect(barX - 20, barBaseY - barH - 30, barW * 2 + 55, barH + 60);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.strokeRect(barX - 20, barBaseY - barH - 30, barW * 2 + 55, barH + 60);

                                // Zero line
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(barX - 10, barBaseY);
                                ctx.lineTo(barX + barW * 2 + 25, barBaseY);
                                ctx.stroke();

                                // KE bar
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillRect(barX, barBaseY - keBarH, barW, keBarH);
                                viz.screenText('K', barX + barW / 2, barBaseY + 14, viz.colors.orange, 10);

                                // Work bar (can be negative)
                                ctx.fillStyle = viz.colors.blue;
                                if (workBarH >= 0) {
                                    ctx.fillRect(barX + barW + 8, barBaseY - workBarH, barW, workBarH);
                                } else {
                                    ctx.fillRect(barX + barW + 8, barBaseY, barW, -workBarH);
                                }
                                viz.screenText('W', barX + barW + 8 + barW / 2, barBaseY + 14, viz.colors.blue, 10);

                                // Numerical values
                                viz.screenText('K = ' + KE.toFixed(2), barX + barW, barBaseY - barH - 18, viz.colors.orange, 10);
                                viz.screenText('W = ' + workAcc.toFixed(2), barX + barW, barBaseY - barH - 6, viz.colors.blue, 10);

                                // Delta K check
                                var deltaK = KE - KE0;
                                viz.screenText('\u0394K = ' + deltaK.toFixed(2), barX + barW, barBaseY + 28, viz.colors.green, 10);

                                viz.screenText('F = (\u2212x, \u22122y)', w * 0.4, hh - 14, viz.colors.teal, 11);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A bead slides on a frictionless wire shaped as \\(y = A\\sin(kx)\\). It starts from rest at \\((0, 0)\\) and reaches the first trough at \\(x = \\pi/k\\), \\(y = 0\\). What is its speed there?',
                        hint: 'The bead returns to the same height. What does the work-energy theorem say?',
                        solution: 'At \\(x = \\pi/k\\), \\(y = A\\sin(\\pi) = 0\\). The bead has returned to its starting height. Since the wire is frictionless, only gravity does work, and the net work is \\(W = mg\\Delta y = mg(0) = 0\\). By the work-energy theorem, \\(\\Delta K = 0\\), so the final speed equals the initial speed: \\(v = 0\\). Wait, this cannot be right if the bead starts from rest at a point with \\(y=0\\) and the wire dips below. Let me reconsider: if the wire dips (the sine goes negative), the bead gains potential energy loss and speeds up in the trough, then slows returning to \\(y=0\\). The net height change is zero, so the speed at \\(x=\\pi/k\\) is indeed 0, the same as the start. The bead cannot reach there unless given initial speed. The exercise illustrates that on a frictionless track, returning to the same height means returning to the same speed.'
                    },
                    {
                        question: 'A 2 kg block is pushed across a floor by a force \\(F = 10(1 - x/5)\\) N for \\(0 \\le x \\le 5\\) m. The coefficient of kinetic friction is \\(\\mu_k = 0.2\\). The block starts from rest. Find its speed at \\(x = 5\\) m.',
                        hint: 'Compute the work done by the applied force (integrate) and the work done by friction (constant friction force times distance). Apply the work-energy theorem.',
                        solution: 'Applied force work: \\(W_F = \\int_0^5 10(1-x/5)\\,dx = 10[x - x^2/10]_0^5 = 10(5 - 2.5) = 25\\) J. Friction work: \\(W_f = -\\mu_k mg \\cdot d = -(0.2)(2)(9.8)(5) = -19.6\\) J. Net work: \\(W_{\\text{net}} = 25 - 19.6 = 5.4\\) J. By work-energy theorem: \\(\\frac{1}{2}(2)v^2 = 5.4\\), so \\(v = \\sqrt{5.4} \\approx 2.32\\) m/s.'
                    }
                ]
            }
        ]
    });
})();
