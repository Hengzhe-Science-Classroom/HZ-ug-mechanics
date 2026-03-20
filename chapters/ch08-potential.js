// === Chapter 8: Potential Energy & Conservation ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch08',
        number: 8,
        title: 'Potential Energy & Conservation',
        subtitle: 'Conservative forces, energy landscapes, and the geometry of motion',
        file: 'ch08-potential',

        sections: [
            // ============================================================
            // Section 0: Conservative Forces
            // ============================================================
            {
                id: 'conservative-forces',
                title: 'Conservative Forces',
                content: `
<h2>Path Independence and Conservative Forces</h2>

<p>In Chapter 7 we defined work as \\(W = \\int_C \\mathbf{F} \\cdot d\\mathbf{r}\\). In general this integral depends on the path \\(C\\). But some forces are special: the work they do depends only on the endpoints, not on the path taken between them. These are the <strong>conservative forces</strong>, and they are the gateway to energy conservation.</p>

<div class="env-block definition">
<div class="env-title">Definition: Conservative Force</div>
<div class="env-body">
<p>A force \\(\\mathbf{F}\\) is <strong>conservative</strong> if the work it does on a particle moving between any two points \\(A\\) and \\(B\\) is independent of the path:</p>
\\[W_{A \\to B} = \\int_A^B \\mathbf{F} \\cdot d\\mathbf{r} \\quad \\text{depends only on } A \\text{ and } B.\\]
<p>Equivalently, the work done around any closed loop vanishes:</p>
\\[\\oint \\mathbf{F} \\cdot d\\mathbf{r} = 0.\\]
</div>
</div>

<p>The equivalence is easy to see. If the work is path-independent, then going from \\(A\\) to \\(B\\) along path 1 and returning along path 2 gives \\(W_1 + W_{2,\\text{return}} = W_1 - W_2 = 0\\). Conversely, if the loop integral vanishes for every loop, then any two paths between \\(A\\) and \\(B\\) must give the same work.</p>

<div class="env-block example">
<div class="env-title">Example: Gravity Near the Earth's Surface</div>
<div class="env-body">
<p>Take \\(\\mathbf{F} = -mg\\,\\hat{\\mathbf{y}}\\). The work along any path from \\((x_1,y_1)\\) to \\((x_2,y_2)\\) is:</p>
\\[W = \\int \\mathbf{F} \\cdot d\\mathbf{r} = \\int (-mg\\,\\hat{\\mathbf{y}}) \\cdot (dx\\,\\hat{\\mathbf{x}} + dy\\,\\hat{\\mathbf{y}}) = -mg \\int_{y_1}^{y_2} dy = -mg(y_2 - y_1).\\]
<p>This depends only on the initial and final heights, not on the shape of the path. Gravity is conservative.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Kinetic Friction Is Not Conservative</div>
<div class="env-body">
<p>Kinetic friction \\(\\mathbf{f}_k = -\\mu_k N \\hat{\\mathbf{v}}\\) always opposes motion. Along any path of length \\(L\\), the work is \\(W = -\\mu_k N L\\). A longer path gives more negative work, so the work is path-dependent. Friction is non-conservative.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why "conservative"?</div>
<div class="env-body">
<p>The name comes from energy conservation. As we will see, conservative forces allow us to define a potential energy function. The total mechanical energy \\(E = T + U\\) is then conserved. Non-conservative forces (friction, drag) convert mechanical energy into heat; the total energy is still conserved, but mechanical energy alone is not.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A force in 2D is given by \\(\\mathbf{F} = (3x^2 y)\\,\\hat{\\mathbf{x}} + (x^3)\\,\\hat{\\mathbf{y}}\\). Compute the work along (a) the straight line from \\((0,0)\\) to \\((1,1)\\), and (b) the path that goes \\((0,0) \\to (1,0) \\to (1,1)\\). Is this force conservative?',
                        hint: 'Parameterize each path and integrate. For the straight line, use \\(x = t, y = t, \\; 0 \\le t \\le 1\\).',
                        solution: '(a) Along \\(x = t, y = t\\): \\(W = \\int_0^1 [3t^2 \\cdot t + t^3] \\, dt = \\int_0^1 4t^3 \\, dt = 1\\). (b) First leg \\(y=0\\): \\(W_1 = \\int_0^1 0\\,dx = 0\\). Second leg \\(x=1\\): \\(W_2 = \\int_0^1 1\\,dy = 1\\). Total \\(W = 1\\). Both paths give \\(W = 1\\), consistent with the force being conservative. Indeed, \\(\\partial F_x/\\partial y = 3x^2 = \\partial F_y/\\partial x\\), confirming it.'
                    }
                ]
            },

            // ============================================================
            // Section 1: The Curl Test
            // ============================================================
            {
                id: 'curl-test',
                title: 'The Curl Test',
                content: `
<h2>A Local Criterion for Conservativeness</h2>

<p>Checking path independence by evaluating integrals over every possible path is impractical. We need a local, pointwise test. By Stokes' theorem, \\(\\oint \\mathbf{F} \\cdot d\\mathbf{r} = \\iint (\\nabla \\times \\mathbf{F}) \\cdot d\\mathbf{A}\\). If this vanishes for every closed loop, then \\(\\nabla \\times \\mathbf{F} = \\mathbf{0}\\) everywhere (assuming the domain is simply connected).</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Curl Test for Conservative Forces</div>
<div class="env-body">
<p>A force \\(\\mathbf{F}\\) defined on a simply connected domain is conservative if and only if</p>
\\[\\nabla \\times \\mathbf{F} = \\mathbf{0} \\quad \\text{everywhere.}\\]
<p>In 2D, with \\(\\mathbf{F} = F_x(x,y)\\,\\hat{\\mathbf{x}} + F_y(x,y)\\,\\hat{\\mathbf{y}}\\), this reduces to:</p>
\\[\\frac{\\partial F_y}{\\partial x} = \\frac{\\partial F_x}{\\partial y}.\\]
<p>In 3D, the full curl must vanish:</p>
\\[\\frac{\\partial F_z}{\\partial y} - \\frac{\\partial F_y}{\\partial z} = 0, \\quad \\frac{\\partial F_x}{\\partial z} - \\frac{\\partial F_z}{\\partial x} = 0, \\quad \\frac{\\partial F_y}{\\partial x} - \\frac{\\partial F_x}{\\partial y} = 0.\\]
</div>
</div>

<div class="env-block warning">
<div class="env-title">Simply Connected Domains</div>
<div class="env-body">
<p>The curl test requires a <strong>simply connected</strong> domain (one with no holes). On a domain with holes, \\(\\nabla \\times \\mathbf{F} = \\mathbf{0}\\) does not guarantee path independence: you can construct loops encircling the hole where \\(\\oint \\mathbf{F} \\cdot d\\mathbf{r} \\neq 0\\). The classic example is the "vortex field" \\(\\mathbf{F} = (-y/(x^2+y^2), \\, x/(x^2+y^2))\\), which has zero curl everywhere except the origin but has nonzero circulation around the origin.</p>
</div>
</div>

<p>Try the curl test visualization below. You can specify a 2D force field and the tool checks whether \\(\\partial F_y/\\partial x = \\partial F_x/\\partial y\\) holds at each point. Green arrows indicate a conservative field; red indicates non-conservative.</p>

<div class="viz-placeholder" data-viz="viz-curl-test"></div>

<div class="env-block example">
<div class="env-title">Example: Testing a Force Field</div>
<div class="env-body">
<p>Is \\(\\mathbf{F} = (y + 2x)\\,\\hat{\\mathbf{x}} + (x + 3y^2)\\,\\hat{\\mathbf{y}}\\) conservative?</p>
<p>Compute \\(\\partial F_x/\\partial y = 1\\) and \\(\\partial F_y/\\partial x = 1\\). They are equal, so \\(\\nabla \\times \\mathbf{F} = 0\\) and the force is conservative. The potential is \\(U = -(x^2 + xy + y^3) + C\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: A Non-Conservative Force</div>
<div class="env-body">
<p>Consider \\(\\mathbf{F} = y\\,\\hat{\\mathbf{x}} - x\\,\\hat{\\mathbf{y}}\\). Then \\(\\partial F_x/\\partial y = 1\\) but \\(\\partial F_y/\\partial x = -1\\). These are unequal, so \\(\\nabla \\times \\mathbf{F} = -2\\,\\hat{\\mathbf{z}} \\neq \\mathbf{0}\\). This force is non-conservative. The field lines form closed loops; there is no potential function.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-curl-test',
                        title: 'Curl Test: Is This Force Field Conservative?',
                        description: 'Use the buttons to select different 2D force fields. Arrows show the force direction and magnitude. <strong>Green</strong> = conservative (curl = 0); <strong>Red</strong> = non-conservative (curl nonzero). The number displayed is the local curl value.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40 });
                            var ctx = viz.ctx;

                            var fields = [
                                {
                                    name: 'F = (y+2x, x+3y²)',
                                    fx: function (x, y) { return y + 2 * x; },
                                    fy: function (x, y) { return x + 3 * y * y; },
                                    curl: function () { return 0; },
                                    conservative: true
                                },
                                {
                                    name: 'F = (y, -x)',
                                    fx: function (x, y) { return y; },
                                    fy: function (x, y) { return -x; },
                                    curl: function () { return -2; },
                                    conservative: false
                                },
                                {
                                    name: 'F = (-y, x)',
                                    fx: function (x, y) { return -y; },
                                    fy: function (x, y) { return x; },
                                    curl: function () { return 2; },
                                    conservative: false
                                },
                                {
                                    name: 'F = (2xy, x²)',
                                    fx: function (x, y) { return 2 * x * y; },
                                    fy: function (x, y) { return x * x; },
                                    curl: function () { return 0; },
                                    conservative: true
                                },
                                {
                                    name: 'F = (x, y) radial',
                                    fx: function (x, y) { return x; },
                                    fy: function (x, y) { return y; },
                                    curl: function () { return 0; },
                                    conservative: true
                                },
                                {
                                    name: 'F = (-y+x², x+y²)',
                                    fx: function (x, y) { return -y + x * x; },
                                    fy: function (x, y) { return x + y * y; },
                                    curl: function () { return 2; },
                                    conservative: false
                                }
                            ];
                            var currentField = 0;

                            fields.forEach(function (f, i) {
                                VizEngine.createButton(controls, f.name, function () {
                                    currentField = i;
                                });
                            });

                            function draw() {
                                viz.clear();
                                viz.drawGrid(1);
                                viz.drawAxes('x', 'y');

                                var field = fields[currentField];
                                var color = field.conservative ? viz.colors.green : viz.colors.red;
                                var spacing = 1;
                                var xMin = Math.ceil(-viz.originX / viz.scale);
                                var xMax = Math.floor((viz.width - viz.originX) / viz.scale);
                                var yMin = Math.ceil(-(viz.height - viz.originY) / viz.scale);
                                var yMax = Math.floor(viz.originY / viz.scale);

                                // Find max magnitude for scaling
                                var maxMag = 0;
                                for (var gx = xMin; gx <= xMax; gx += spacing) {
                                    for (var gy = yMin; gy <= yMax; gy += spacing) {
                                        var mag = Math.sqrt(field.fx(gx, gy) * field.fx(gx, gy) + field.fy(gx, gy) * field.fy(gx, gy));
                                        if (mag > maxMag) maxMag = mag;
                                    }
                                }
                                var arrowScale = maxMag > 0 ? 0.7 / maxMag : 1;

                                for (var ax = xMin; ax <= xMax; ax += spacing) {
                                    for (var ay = yMin; ay <= yMax; ay += spacing) {
                                        var fxv = field.fx(ax, ay);
                                        var fyv = field.fy(ax, ay);
                                        var m = Math.sqrt(fxv * fxv + fyv * fyv);
                                        if (m < 0.01) continue;
                                        viz.drawVector(ax, ay, fxv * arrowScale, fyv * arrowScale, color, null, 1.8, 7);
                                    }
                                }

                                // Display info
                                var curlVal = field.curl();
                                var label = field.conservative ? 'CONSERVATIVE' : 'NON-CONSERVATIVE';
                                viz.screenText(field.name, viz.width / 2, 18, viz.colors.white, 14);
                                viz.screenText(label, viz.width / 2, viz.height - 30, color, 13);
                                viz.screenText('curl F = ' + curlVal.toFixed(1) + ' z\u0302', viz.width / 2, viz.height - 12, viz.colors.text, 11);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Determine whether the force \\(\\mathbf{F} = (e^x \\sin y)\\,\\hat{\\mathbf{x}} + (e^x \\cos y)\\,\\hat{\\mathbf{y}}\\) is conservative. If so, find the potential energy.',
                        hint: 'Check \\(\\partial F_x/\\partial y\\) vs. \\(\\partial F_y/\\partial x\\). If they match, integrate to find \\(U\\).',
                        solution: '\\(\\partial F_x/\\partial y = e^x \\cos y\\) and \\(\\partial F_y/\\partial x = e^x \\cos y\\). They are equal, so the force is conservative. To find \\(U\\): \\(F_x = -\\partial U/\\partial x\\) gives \\(U = -e^x \\sin y + g(y)\\). Then \\(F_y = -\\partial U/\\partial y = -e^x \\cos y - g\'(y)\\). Comparing with \\(F_y = e^x \\cos y\\) gives \\(g\'(y) = -2e^x \\cos y\\)... Actually, let us redo: \\(-\\partial U/\\partial y = -(-e^x \\cos y + g\'(y)) = e^x \\cos y - g\'(y)\\). Setting this equal to \\(e^x \\cos y\\) gives \\(g\'(y) = 0\\), so \\(g = C\\). Therefore \\(U = -e^x \\sin y + C\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Potential Energy Functions
            // ============================================================
            {
                id: 'potential-energy',
                title: 'Potential Energy Functions',
                content: `
<h2>From Conservative Forces to Potential Energy</h2>

<p>If \\(\\mathbf{F}\\) is conservative, the work depends only on the endpoints. This means we can define a scalar function \\(U(\\mathbf{r})\\), the <strong>potential energy</strong>, such that the work done by \\(\\mathbf{F}\\) equals the decrease in \\(U\\).</p>

<div class="env-block definition">
<div class="env-title">Definition: Potential Energy</div>
<div class="env-body">
<p>For a conservative force \\(\\mathbf{F}\\), the <strong>potential energy</strong> \\(U(\\mathbf{r})\\) is defined by:</p>
\\[U(\\mathbf{r}) = -\\int_{\\mathbf{r}_0}^{\\mathbf{r}} \\mathbf{F} \\cdot d\\mathbf{r}' + U(\\mathbf{r}_0)\\]
<p>where \\(\\mathbf{r}_0\\) is a chosen reference point. Equivalently:</p>
\\[\\mathbf{F} = -\\nabla U = -\\left(\\frac{\\partial U}{\\partial x}\\,\\hat{\\mathbf{x}} + \\frac{\\partial U}{\\partial y}\\,\\hat{\\mathbf{y}} + \\frac{\\partial U}{\\partial z}\\,\\hat{\\mathbf{z}}\\right).\\]
</div>
</div>

<div class="env-block remark">
<div class="env-title">The Minus Sign Convention</div>
<div class="env-body">
<p>The minus sign is a convention: the force points in the direction of <em>decreasing</em> potential energy. Objects "roll downhill" in the energy landscape. This is why a ball falls (toward lower gravitational PE) and why a spring returns to equilibrium (toward the minimum of elastic PE).</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Conservation of Mechanical Energy</div>
<div class="env-body">
<p>If the only forces doing work are conservative, then the total mechanical energy is conserved:</p>
\\[E = T + U = \\tfrac{1}{2}mv^2 + U(\\mathbf{r}) = \\text{constant}.\\]
<p><strong>Proof.</strong> The work-energy theorem gives \\(\\Delta T = W\\). For a conservative force, \\(W = -\\Delta U\\). Therefore \\(\\Delta T = -\\Delta U\\), which gives \\(\\Delta(T + U) = 0\\). \\(\\square\\)</p>
</div>
</div>

<h3>Important Potential Energy Functions</h3>

<table style="width:100%;border-collapse:collapse;margin:1em 0;">
<tr style="border-bottom:1px solid #30363d;"><th style="text-align:left;padding:6px;color:#8b949e;">Force</th><th style="text-align:left;padding:6px;color:#8b949e;">\\(\\mathbf{F}\\)</th><th style="text-align:left;padding:6px;color:#8b949e;">\\(U\\)</th></tr>
<tr style="border-bottom:1px solid #1a1a40;"><td style="padding:6px;">Uniform gravity</td><td style="padding:6px;">\\(-mg\\,\\hat{\\mathbf{y}}\\)</td><td style="padding:6px;">\\(mgy\\)</td></tr>
<tr style="border-bottom:1px solid #1a1a40;"><td style="padding:6px;">Spring (Hooke)</td><td style="padding:6px;">\\(-kx\\,\\hat{\\mathbf{x}}\\)</td><td style="padding:6px;">\\(\\tfrac{1}{2}kx^2\\)</td></tr>
<tr style="border-bottom:1px solid #1a1a40;"><td style="padding:6px;">Newtonian gravity</td><td style="padding:6px;">\\(-\\frac{GMm}{r^2}\\,\\hat{\\mathbf{r}}\\)</td><td style="padding:6px;">\\(-\\frac{GMm}{r}\\)</td></tr>
<tr><td style="padding:6px;">Coulomb</td><td style="padding:6px;">\\(\\frac{kq_1q_2}{r^2}\\,\\hat{\\mathbf{r}}\\)</td><td style="padding:6px;">\\(\\frac{kq_1q_2}{r}\\)</td></tr>
</table>

<div class="env-block warning">
<div class="env-title">Reference Point Ambiguity</div>
<div class="env-body">
<p>Potential energy is defined only up to an additive constant (the choice of \\(U(\\mathbf{r}_0)\\)). Only <em>differences</em> in \\(U\\) are physically meaningful. For gravity near Earth's surface, we commonly set \\(U = 0\\) at the ground. For Newtonian gravity and Coulomb forces, \\(U = 0\\) at \\(r = \\infty\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A 2 kg block slides down a frictionless ramp from height \\(h = 3\\) m and reaches the bottom. Find its speed at the bottom using energy conservation.',
                        hint: 'Set the zero of potential energy at the bottom. Then \\(E_i = mgh\\) and \\(E_f = \\frac{1}{2}mv^2\\).',
                        solution: 'At the top: \\(E = mgh + 0 = (2)(9.8)(3) = 58.8\\) J. At the bottom: \\(E = 0 + \\frac{1}{2}(2)v^2\\). Conservation gives \\(v = \\sqrt{2gh} = \\sqrt{2(9.8)(3)} = 7.67\\) m/s. Notice the answer is independent of the ramp shape and the mass.'
                    },
                    {
                        question: 'Show that the force \\(\\mathbf{F} = -\\frac{GMm}{r^2}\\,\\hat{\\mathbf{r}}\\) gives the potential \\(U = -GMm/r\\) (choosing \\(U \\to 0\\) as \\(r \\to \\infty\\)).',
                        hint: 'Integrate \\(-\\int_\\infty^r F_r \\, dr\'\\).',
                        solution: '\\(U(r) = -\\int_\\infty^r F_{r\'} \\, dr\' = -\\int_\\infty^r \\left(-\\frac{GMm}{r\'^2}\\right) dr\' = GMm \\int_\\infty^r \\frac{dr\'}{r\'^2} = GMm\\left[-\\frac{1}{r\'}\\right]_\\infty^r = -\\frac{GMm}{r}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Energy Diagrams & Stability
            // ============================================================
            {
                id: 'energy-diagrams',
                title: 'Energy Diagrams & Stability',
                content: `
<h2>Reading the Energy Landscape</h2>

<p>For one-dimensional motion under a conservative force, the dynamics are entirely determined by the potential energy curve \\(U(x)\\). This is one of the most powerful ideas in all of classical mechanics: instead of solving \\(F = ma\\) as a differential equation, we read off the motion qualitatively from a single plot.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Qualitative Dynamics from \\(U(x)\\)</div>
<div class="env-body">
<p>For a particle of energy \\(E\\) moving in a 1D potential \\(U(x)\\):</p>
<ol>
<li>The particle can only exist where \\(E \\ge U(x)\\), since \\(T = E - U \\ge 0\\).</li>
<li>Points where \\(E = U(x)\\) are <strong>turning points</strong>; the particle reverses direction there.</li>
<li>The kinetic energy is \\(T = E - U(x)\\), so the particle moves fastest where \\(U\\) is lowest.</li>
<li>The force is \\(F = -dU/dx\\): the particle is pushed toward lower \\(U\\).</li>
</ol>
</div>
</div>

<h3>Equilibrium Points</h3>

<p>An <strong>equilibrium point</strong> is where \\(F = -dU/dx = 0\\), i.e., where \\(U(x)\\) has a critical point. The character of the equilibrium depends on the second derivative:</p>

<div class="env-block definition">
<div class="env-title">Classification of Equilibria</div>
<div class="env-body">
<ul>
<li><strong>Stable equilibrium</strong>: \\(U''(x_0) > 0\\) (local minimum). Small displacements produce restoring forces. The particle oscillates about \\(x_0\\).</li>
<li><strong>Unstable equilibrium</strong>: \\(U''(x_0) < 0\\) (local maximum). Small displacements produce forces that push the particle further away.</li>
<li><strong>Neutral equilibrium</strong>: \\(U''(x_0) = 0\\) (and all higher derivatives also vanish, or \\(U\\) is flat). The particle remains in equilibrium wherever it is placed.</li>
</ul>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">The Ball-on-a-Hill Analogy</div>
<div class="env-body">
<p>Think of the \\(U(x)\\) graph as a physical landscape and the particle as a ball rolling on it (under gravity). A ball at the bottom of a valley (minimum of \\(U\\)) is stable; it rolls back when displaced. A ball balanced on top of a hill (maximum of \\(U\\)) is unstable; the slightest push sends it rolling away. A ball on a flat plateau is neutral.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-energy-diagram"></div>

<div class="env-block remark">
<div class="env-title">Small Oscillations Near a Stable Equilibrium</div>
<div class="env-body">
<p>Taylor-expand \\(U(x)\\) about a stable minimum \\(x_0\\):</p>
\\[U(x) \\approx U(x_0) + \\tfrac{1}{2}U''(x_0)(x - x_0)^2 + \\cdots\\]
<p>The leading term is quadratic: a harmonic oscillator with effective spring constant \\(k_{\\text{eff}} = U''(x_0)\\). The oscillation frequency is \\(\\omega = \\sqrt{U''(x_0)/m}\\). Every stable equilibrium looks like SHM for small enough displacements.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-energy-diagram',
                        title: 'Energy Diagram: Particle in a Potential Well',
                        description: 'Drag the <strong>control points</strong> to reshape the potential energy curve \\(U(x)\\). Adjust the <strong>total energy</strong> \\(E\\) with the slider, then press <strong>Drop Particle</strong> to watch it oscillate between turning points. Turning points, forbidden regions, and equilibria are highlighted automatically.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, {
                                scale: 40,
                                originX: 80,
                                originY: 280
                            });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Control points for cubic spline-like potential (screen y = potential)
                            var cptsDefault = [
                                { x: -5, y: 4 },
                                { x: -2.5, y: -1 },
                                { x: -0.5, y: 2 },
                                { x: 1.5, y: -2 },
                                { x: 4, y: 1 },
                                { x: 6.5, y: 4 }
                            ];

                            var cpts = cptsDefault.map(function (p) { return { x: p.x, y: p.y }; });

                            cpts.forEach(function (p, i) {
                                viz.addDraggable('cp' + i, p.x, p.y, viz.colors.purple, 7, function (wx, wy) {
                                    cpts[i].x = wx;
                                    cpts[i].y = wy;
                                });
                            });

                            var totalE = 1.0;
                            var simulating = false;
                            var particleX = -2.5;
                            var particleV = 0;
                            var trail = [];

                            VizEngine.createSlider(controls, 'E', -3, 5, totalE, 0.1, function (v) { totalE = v; simulating = false; trail = []; });
                            VizEngine.createButton(controls, 'Drop Particle', function () {
                                // Find leftmost turning point
                                var xStart = null;
                                for (var sx = -5; sx <= 7; sx += 0.05) {
                                    if (evalU(sx) <= totalE) { xStart = sx; break; }
                                }
                                if (xStart === null) xStart = 0;
                                particleX = xStart + 0.05;
                                particleV = 0;
                                trail = [];
                                simulating = true;
                            });
                            VizEngine.createButton(controls, 'Reset', function () {
                                simulating = false;
                                trail = [];
                                for (var ri = 0; ri < cpts.length; ri++) {
                                    cpts[ri].x = cptsDefault[ri].x;
                                    cpts[ri].y = cptsDefault[ri].y;
                                    viz.draggables[ri].x = cptsDefault[ri].x;
                                    viz.draggables[ri].y = cptsDefault[ri].y;
                                }
                            });

                            // Evaluate U(x) using smooth interpolation through control points
                            function evalU(x) {
                                // Sort cpts by x
                                var sorted = cpts.slice().sort(function (a, b) { return a.x - b.x; });
                                if (x <= sorted[0].x) return sorted[0].y;
                                if (x >= sorted[sorted.length - 1].x) return sorted[sorted.length - 1].y;
                                // Find interval
                                for (var si = 0; si < sorted.length - 1; si++) {
                                    if (x >= sorted[si].x && x <= sorted[si + 1].x) {
                                        var t = (x - sorted[si].x) / (sorted[si + 1].x - sorted[si].x);
                                        // Hermite interpolation
                                        var p0 = sorted[si].y, p1 = sorted[si + 1].y;
                                        var m0 = 0, m1 = 0;
                                        if (si > 0) m0 = 0.5 * (sorted[si + 1].y - sorted[si - 1].y) / (sorted[si + 1].x - sorted[si - 1].x) * (sorted[si + 1].x - sorted[si].x);
                                        if (si < sorted.length - 2) m1 = 0.5 * (sorted[si + 2].y - sorted[si].y) / (sorted[si + 2].x - sorted[si].x) * (sorted[si + 1].x - sorted[si].x);
                                        var t2 = t * t, t3 = t2 * t;
                                        return (2 * t3 - 3 * t2 + 1) * p0 + (t3 - 2 * t2 + t) * m0 + (-2 * t3 + 3 * t2) * p1 + (t3 - t2) * m1;
                                    }
                                }
                                return 0;
                            }

                            function evalDU(x) {
                                var dx = 0.01;
                                return (evalU(x + dx) - evalU(x - dx)) / (2 * dx);
                            }

                            var lastT = null;
                            function draw(timestamp) {
                                if (!lastT) lastT = timestamp;
                                var dt = Math.min((timestamp - lastT) / 1000, 0.05);
                                lastT = timestamp;

                                // Physics step
                                if (simulating) {
                                    var substeps = 10;
                                    var sdt = dt / substeps;
                                    for (var ss = 0; ss < substeps; ss++) {
                                        var F = -evalDU(particleX);
                                        particleV += F * sdt;
                                        particleX += particleV * sdt;
                                        // Clamp to boundaries
                                        var sorted2 = cpts.slice().sort(function (a, b) { return a.x - b.x; });
                                        if (particleX < sorted2[0].x + 0.1) { particleX = sorted2[0].x + 0.1; particleV = Math.abs(particleV) * 0.95; }
                                        if (particleX > sorted2[sorted2.length - 1].x - 0.1) { particleX = sorted2[sorted2.length - 1].x - 0.1; particleV = -Math.abs(particleV) * 0.95; }
                                    }
                                    trail.push([particleX, evalU(particleX)]);
                                    if (trail.length > 200) trail.shift();
                                }

                                viz.clear();
                                viz.drawGrid(1);
                                viz.drawAxes('x', 'U(x)');

                                var sorted3 = cpts.slice().sort(function (a, b) { return a.x - b.x; });
                                var xMin = sorted3[0].x;
                                var xMax = sorted3[sorted3.length - 1].x;

                                // Draw forbidden region (E < U)
                                for (var px = 0; px < w; px++) {
                                    var mx = (px - viz.originX) / viz.scale;
                                    if (mx < xMin || mx > xMax) continue;
                                    var uVal = evalU(mx);
                                    if (uVal > totalE) {
                                        var sy1 = viz.originY - totalE * viz.scale;
                                        var sy2 = viz.originY - uVal * viz.scale;
                                        var top = Math.min(sy1, sy2);
                                        var bot = Math.max(sy1, sy2);
                                        ctx.fillStyle = 'rgba(248,81,73,0.08)';
                                        ctx.fillRect(px, top, 1, bot - top);
                                    }
                                }

                                // Draw U(x) curve
                                viz.drawFunction(evalU, xMin, xMax, viz.colors.blue, 2.5, 400);

                                // Draw total energy line
                                viz.drawSegment(xMin, totalE, xMax, totalE, viz.colors.green, 1.5, true);
                                viz.drawText('E = ' + totalE.toFixed(1), xMax - 0.3, totalE + 0.3, viz.colors.green, 11, 'right');

                                // Mark equilibrium points
                                for (var ex = xMin + 0.1; ex < xMax - 0.1; ex += 0.05) {
                                    var du1 = evalDU(ex);
                                    var du2 = evalDU(ex + 0.05);
                                    if (du1 * du2 <= 0 && Math.abs(du1) < 1) {
                                        var eqx = ex + 0.025;
                                        var eqy = evalU(eqx);
                                        var d2u = (evalU(eqx + 0.05) - 2 * evalU(eqx) + evalU(eqx - 0.05)) / (0.05 * 0.05);
                                        if (d2u > 0.5) {
                                            viz.drawPoint(eqx, eqy, viz.colors.green, 'stable', 5);
                                        } else if (d2u < -0.5) {
                                            viz.drawPoint(eqx, eqy, viz.colors.red, 'unstable', 5);
                                        } else {
                                            viz.drawPoint(eqx, eqy, viz.colors.yellow, 'neutral', 5);
                                        }
                                    }
                                }

                                // Mark turning points
                                for (var tx = xMin + 0.05; tx < xMax - 0.05; tx += 0.03) {
                                    var u1 = evalU(tx) - totalE;
                                    var u2 = evalU(tx + 0.03) - totalE;
                                    if (u1 * u2 <= 0) {
                                        var tpx = tx + 0.015;
                                        var tpy = evalU(tpx);
                                        viz.drawPoint(tpx, tpy, viz.colors.orange, 'TP', 4);
                                    }
                                }

                                // Draw particle trail
                                if (trail.length > 1) {
                                    viz.drawTrail(trail, viz.colors.cyan, 0.4);
                                }

                                // Draw particle
                                if (simulating) {
                                    var pU = evalU(particleX);
                                    viz.drawBall(particleX, pU, 0.2, viz.colors.orange, 2);
                                    // Energy bars
                                    var ke = totalE - pU;
                                    if (ke < 0) ke = 0;
                                    viz.drawEnergyBars(w - 115, h - 35, 28, 80, ke, pU, totalE);
                                }

                                // Draw draggable control points
                                viz.drawDraggables();

                                viz.screenText('Drag purple points to reshape U(x)', w / 2, 14, viz.colors.text, 10);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A particle moves in the potential \\(U(x) = x^4 - 4x^2\\). Find all equilibrium points and classify them as stable or unstable.',
                        hint: 'Set \\(dU/dx = 0\\) to find equilibria, then use \\(d^2U/dx^2\\) to classify.',
                        solution: '\\(dU/dx = 4x^3 - 8x = 4x(x^2 - 2) = 0\\) gives \\(x = 0, \\pm\\sqrt{2}\\). \\(d^2U/dx^2 = 12x^2 - 8\\). At \\(x = 0\\): \\(U\'\' = -8 < 0\\), so unstable. At \\(x = \\pm\\sqrt{2}\\): \\(U\'\' = 24 - 8 = 16 > 0\\), so both are stable. The potential has a double-well structure with an unstable hilltop at the origin.'
                    },
                    {
                        question: 'For the double-well potential above, a particle has total energy \\(E = -3\\). In which region(s) can it move?',
                        hint: 'The particle is confined to regions where \\(U(x) \\le E\\). Find the turning points by solving \\(x^4 - 4x^2 = -3\\).',
                        solution: 'Solve \\(x^4 - 4x^2 + 3 = 0\\), which is \\((x^2 - 1)(x^2 - 3) = 0\\), so \\(x = \\pm 1, \\pm\\sqrt{3}\\). Since \\(U(0) = 0 > -3\\) and \\(U(\\pm\\sqrt{2}) = -4 < -3\\), the particle is trapped in one of two wells: either \\(-\\sqrt{3} \\le x \\le -1\\) or \\(1 \\le x \\le \\sqrt{3}\\). It cannot cross the barrier at \\(x = 0\\) classically.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Energy Conservation in Practice
            // ============================================================
            {
                id: 'energy-conservation-practice',
                title: 'Energy Conservation in Practice',
                content: `
<h2>Solving Problems with Energy Methods</h2>

<p>Energy conservation is often the fastest route to solving mechanics problems. Instead of decomposing forces and solving differential equations, we write \\(E_i = E_f\\) and extract the answer. The method is especially powerful when we do not need to know the time or the shape of the trajectory.</p>

<div class="env-block theorem">
<div class="env-title">Strategy: Using Conservation of Energy</div>
<div class="env-body">
<ol>
<li>Identify the system and all forces. Which forces are conservative?</li>
<li>Choose a reference point where \\(U = 0\\).</li>
<li>Write the total energy at the initial and final states: \\(\\tfrac{1}{2}mv_i^2 + U_i = \\tfrac{1}{2}mv_f^2 + U_f\\).</li>
<li>If non-conservative forces (friction, drag) do work \\(W_{\\text{nc}}\\), include them: \\(E_f = E_i + W_{\\text{nc}}\\).</li>
<li>Solve for the unknown.</li>
</ol>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Escape Velocity</div>
<div class="env-body">
<p>What is the minimum launch speed for a projectile to escape Earth's gravity? At the surface, \\(E_i = \\frac{1}{2}mv_{\\text{esc}}^2 - \\frac{GMm}{R}\\). At infinity, \\(E_f = 0 + 0 = 0\\) (barely escaping). Setting \\(E_i = E_f\\):</p>
\\[\\frac{1}{2}mv_{\\text{esc}}^2 = \\frac{GMm}{R} \\quad \\Rightarrow \\quad v_{\\text{esc}} = \\sqrt{\\frac{2GM}{R}}.\\]
<p>For Earth: \\(v_{\\text{esc}} = \\sqrt{2(6.67 \\times 10^{-11})(5.97 \\times 10^{24})/(6.37 \\times 10^6)} \\approx 11.2\\) km/s.</p>
<p>Notice that \\(v_{\\text{esc}}\\) is independent of the projectile mass and the launch direction.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Pendulum Maximum Speed</div>
<div class="env-body">
<p>A pendulum of length \\(L\\) is released from rest at angle \\(\\theta_0\\). At the initial position, \\(h = L(1 - \\cos\\theta_0)\\) above the lowest point. Energy conservation gives:</p>
\\[mgL(1 - \\cos\\theta_0) = \\frac{1}{2}mv_{\\max}^2 \\quad \\Rightarrow \\quad v_{\\max} = \\sqrt{2gL(1 - \\cos\\theta_0)}.\\]
<p>No need to solve the pendulum ODE. Energy methods bypass the entire differential equation.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-pe-particle-drop"></div>

<div class="env-block warning">
<div class="env-title">When Energy Methods Are Not Sufficient</div>
<div class="env-body">
<p>Energy conservation tells you about speeds but not about <em>when</em> things happen or the shape of the trajectory. If you need the time of flight, the period of oscillation, or the trajectory \\(\\mathbf{r}(t)\\), you must solve the equation of motion. Energy conservation is powerful but not omniscient. Also, when non-conservative forces are present, you must account for the work they do, which often requires knowing the path anyway.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Loop-the-Loop</div>
<div class="env-body">
<p>A ball of mass \\(m\\) slides from rest at height \\(h\\) down a frictionless track into a vertical loop of radius \\(R\\). At the top of the loop, the ball needs centripetal acceleration \\(v^2/R \\ge g\\) to maintain contact. Energy conservation gives \\(v_{\\text{top}}^2 = 2g(h - 2R)\\). Requiring \\(v_{\\text{top}}^2 \\ge gR\\):</p>
\\[2g(h - 2R) \\ge gR \\quad \\Rightarrow \\quad h \\ge \\tfrac{5}{2}R.\\]
<p>This is a classic example of combining energy conservation with a force condition.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-pe-particle-drop',
                        title: 'Particle in a Double Well: Energy Conservation',
                        description: 'Watch a particle oscillate in a double-well potential \\(U(x) = x^4 - 8x^2\\). Adjust total energy \\(E\\) and observe how the accessible region, speed, and turning points change. At high enough energy the particle crosses the central barrier.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, {
                                scale: 18,
                                originX: 250,
                                originY: 280
                            });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            function U(x) { return x * x * x * x - 8 * x * x; }
                            function dU(x) { return 4 * x * x * x - 16 * x; }

                            var totalE = -10;
                            var particleX = -3;
                            var particleV = 0;
                            var running = false;
                            var trail = [];

                            VizEngine.createSlider(controls, 'E', -17, 20, totalE, 0.5, function (v) {
                                totalE = v;
                                running = false;
                                trail = [];
                            });
                            VizEngine.createButton(controls, 'Drop (left well)', function () {
                                // Start near left minimum x = -2
                                particleX = -3.8;
                                var uHere = U(particleX);
                                if (totalE < uHere) { totalE = uHere + 1; }
                                particleV = 0;
                                trail = [];
                                running = true;
                            });
                            VizEngine.createButton(controls, 'Drop (right well)', function () {
                                particleX = 3.8;
                                var uHere = U(particleX);
                                if (totalE < uHere) { totalE = uHere + 1; }
                                particleV = 0;
                                trail = [];
                                running = true;
                            });
                            VizEngine.createButton(controls, 'Stop', function () { running = false; });

                            var lastT = null;
                            function draw(timestamp) {
                                if (!lastT) lastT = timestamp;
                                var dt = Math.min((timestamp - lastT) / 1000, 0.04);
                                lastT = timestamp;

                                // Physics with RK4
                                if (running) {
                                    var steps = 20;
                                    var sdt = dt / steps;
                                    for (var si = 0; si < steps; si++) {
                                        var state = VizEngine.rk4(
                                            [particleX, particleV], 0, sdt * 3,
                                            function (s) { return [s[1], -dU(s[0])]; }
                                        );
                                        particleX = state[0];
                                        particleV = state[1];
                                    }
                                    // Clamp energy drift
                                    var ke = 0.5 * particleV * particleV;
                                    var uNow = U(particleX);
                                    var eCurrent = ke + uNow;
                                    if (Math.abs(eCurrent - totalE) > 0.5) {
                                        var factor = Math.sqrt(Math.max(0, (totalE - uNow)) / Math.max(ke, 1e-10));
                                        particleV *= factor;
                                    }
                                    trail.push([particleX, U(particleX)]);
                                    if (trail.length > 300) trail.shift();
                                }

                                viz.clear();
                                viz.drawGrid(2);

                                // Custom axes
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(w, viz.originY); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(viz.originX, 0); ctx.lineTo(viz.originX, h); ctx.stroke();

                                // Label
                                viz.screenText('x', w - 15, viz.originY - 10, viz.colors.text, 12);
                                viz.screenText('U(x)', viz.originX + 20, 15, viz.colors.text, 12);

                                // Draw U(x) with filled region
                                var xMin = -5, xMax = 5;
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= 400; i++) {
                                    var xv = xMin + (xMax - xMin) * i / 400;
                                    var yv = U(xv);
                                    var sx = viz.originX + xv * viz.scale;
                                    var sy = viz.originY - yv * viz.scale;
                                    if (sy > h + 50 || sy < -50) { started = false; continue; }
                                    if (!started) { ctx.moveTo(sx, sy); started = true; }
                                    else ctx.lineTo(sx, sy);
                                }
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2.5;
                                ctx.stroke();

                                // Energy line
                                var esx1 = viz.originX + xMin * viz.scale;
                                var esx2 = viz.originX + xMax * viz.scale;
                                var esy = viz.originY - totalE * viz.scale;
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(esx1, esy); ctx.lineTo(esx2, esy); ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('E = ' + totalE.toFixed(1), w - 50, esy - 8, viz.colors.green, 11);

                                // Forbidden region shading
                                for (var px = 0; px < w; px++) {
                                    var mx = (px - viz.originX) / viz.scale;
                                    if (mx < xMin || mx > xMax) continue;
                                    var uv = U(mx);
                                    if (uv > totalE) {
                                        ctx.fillStyle = 'rgba(248,81,73,0.06)';
                                        var top2 = Math.min(viz.originY - uv * viz.scale, esy);
                                        var bot2 = Math.max(viz.originY - uv * viz.scale, esy);
                                        ctx.fillRect(px, top2, 1, bot2 - top2);
                                    }
                                }

                                // Particle trail
                                if (trail.length > 1) viz.drawTrail(trail, viz.colors.cyan, 0.3);

                                // Draw particle
                                if (running) {
                                    var pU = U(particleX);
                                    viz.drawBall(particleX, pU, 0.35, viz.colors.orange, 2.5);

                                    // Speed indicator
                                    var spd = Math.abs(particleV);
                                    viz.screenText('v = ' + spd.toFixed(1), 70, 20, viz.colors.orange, 12);

                                    // Energy bars
                                    var ke2 = 0.5 * particleV * particleV;
                                    viz.drawEnergyBars(w - 115, h - 35, 28, 80, ke2, Math.max(pU, 0), Math.max(totalE, 0));
                                }

                                viz.screenText('U(x) = x\u2074 \u2212 8x\u00B2', w / 2, h - 10, viz.colors.text, 10);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A block of mass \\(m\\) is attached to a spring (constant \\(k\\)) on a frictionless surface and is compressed by \\(A\\). It is released and slides up a frictionless ramp of height \\(h\\). What is the maximum compression \\(A\\) such that the block just barely reaches the top?',
                        hint: 'At maximum compression the block is at rest; at the top of the ramp it is also (barely) at rest.',
                        solution: 'Initial energy: \\(E_i = \\frac{1}{2}kA^2\\). Final energy (just reaches top at rest): \\(E_f = mgh\\). Conservation: \\(\\frac{1}{2}kA^2 = mgh\\), so \\(A = \\sqrt{2mgh/k}\\).'
                    },
                    {
                        question: 'Compute the escape velocity from the Moon (\\(M = 7.35 \\times 10^{22}\\) kg, \\(R = 1.74 \\times 10^6\\) m).',
                        hint: 'Use \\(v_{\\text{esc}} = \\sqrt{2GM/R}\\).',
                        solution: '\\(v_{\\text{esc}} = \\sqrt{2(6.674 \\times 10^{-11})(7.35 \\times 10^{22})/(1.74 \\times 10^6)} = \\sqrt{5.63 \\times 10^6} \\approx 2370\\) m/s \\(\\approx 2.37\\) km/s. This is about a fifth of Earth\'s escape velocity, which is why the Moon has essentially no atmosphere.'
                    }
                ]
            }
        ]
    });
})();
