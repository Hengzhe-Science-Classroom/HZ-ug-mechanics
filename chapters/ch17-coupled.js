// === Chapter 17: Coupled Oscillators & Normal Modes ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch17',
        number: 17,
        title: 'Coupled Oscillators & Normal Modes',
        subtitle: 'From two pendulums to the continuum: the origin of waves',
        file: 'ch17-coupled',

        sections: [
            // ============================================================
            // Section 0: Two Coupled Pendulums
            // ============================================================
            {
                id: 'two-coupled',
                title: 'Two Coupled Pendulums',
                content: `
<h2>The Simplest Coupled System</h2>

<p>Consider two identical pendulums, each of mass \\(m\\) and length \\(\\ell\\), connected by a light spring of constant \\(\\kappa\\) attached at the bobs. For small angles \\(\\theta_1\\) and \\(\\theta_2\\), the linearized equations of motion are:</p>

\\[m\\ell\\ddot{\\theta}_1 = -mg\\theta_1 - \\kappa\\ell(\\theta_1 - \\theta_2)\\]
\\[m\\ell\\ddot{\\theta}_2 = -mg\\theta_2 - \\kappa\\ell(\\theta_2 - \\theta_1)\\]

<p>Dividing through by \\(m\\ell\\) and defining \\(\\omega_0^2 = g/\\ell\\) and \\(\\omega_c^2 = \\kappa/m\\):</p>

\\[\\ddot{\\theta}_1 = -\\omega_0^2\\theta_1 - \\omega_c^2(\\theta_1 - \\theta_2)\\]
\\[\\ddot{\\theta}_2 = -\\omega_0^2\\theta_2 - \\omega_c^2(\\theta_2 - \\theta_1)\\]

<div class="env-block definition">
<div class="env-title">Definition: Coupling Parameter</div>
<div class="env-body">
<p>The parameter \\(\\omega_c^2 = \\kappa/m\\) measures the strength of the coupling between the oscillators. When \\(\\omega_c = 0\\), the pendulums are independent. When \\(\\omega_c \\gg \\omega_0\\), the coupling dominates over gravity.</p>
</div>
</div>

<p>We can write this as a matrix equation:</p>

\\[\\begin{pmatrix} \\ddot{\\theta}_1 \\\\ \\ddot{\\theta}_2 \\end{pmatrix} = -\\begin{pmatrix} \\omega_0^2 + \\omega_c^2 & -\\omega_c^2 \\\\ -\\omega_c^2 & \\omega_0^2 + \\omega_c^2 \\end{pmatrix} \\begin{pmatrix} \\theta_1 \\\\ \\theta_2 \\end{pmatrix}\\]

<p>The key to solving coupled systems is to find <strong>normal modes</strong>: special combinations of coordinates that oscillate independently.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Normal Modes of Two Coupled Pendulums</div>
<div class="env-body">
<p>Define the normal coordinates \\(q_+ = \\theta_1 + \\theta_2\\) and \\(q_- = \\theta_1 - \\theta_2\\). Adding and subtracting the equations of motion:</p>
\\[\\ddot{q}_+ = -\\omega_0^2 q_+ \\quad \\Rightarrow \\quad \\omega_+ = \\omega_0\\]
\\[\\ddot{q}_- = -(\\omega_0^2 + 2\\omega_c^2) q_- \\quad \\Rightarrow \\quad \\omega_- = \\sqrt{\\omega_0^2 + 2\\omega_c^2}\\]
<p>The <strong>symmetric mode</strong> (\\(q_+\\)): both pendulums swing together in phase, at frequency \\(\\omega_+\\). The spring is never stretched, so its frequency is just the free pendulum frequency \\(\\omega_0\\).</p>
<p>The <strong>antisymmetric mode</strong> (\\(q_-\\)): the pendulums swing in opposition, at frequency \\(\\omega_- > \\omega_+\\). The spring is maximally stretched, adding stiffness and raising the frequency.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why the antisymmetric mode is always faster</div>
<div class="env-body">
<p>In the antisymmetric mode, the spring stretches and compresses, providing an additional restoring force on top of gravity. More restoring force means higher frequency. In the symmetric mode, the spring length never changes, so it contributes nothing. This pattern generalizes: modes that activate more coupling springs have higher frequencies.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Two identical pendulums (\\(m = 0.5\\) kg, \\(\\ell = 1\\) m) are coupled by a spring with \\(\\kappa = 2\\) N/m. Find the two normal mode frequencies.',
                        hint: 'Compute \\(\\omega_0 = \\sqrt{g/\\ell}\\) and \\(\\omega_c = \\sqrt{\\kappa/m}\\), then use \\(\\omega_+ = \\omega_0\\) and \\(\\omega_- = \\sqrt{\\omega_0^2 + 2\\omega_c^2}\\).',
                        solution: '\\(\\omega_0 = \\sqrt{9.8/1} = 3.13\\) rad/s, \\(\\omega_c = \\sqrt{2/0.5} = 2.0\\) rad/s. Symmetric mode: \\(\\omega_+ = 3.13\\) rad/s. Antisymmetric mode: \\(\\omega_- = \\sqrt{9.8 + 8} = \\sqrt{17.8} = 4.22\\) rad/s.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Beating and Energy Transfer
            // ============================================================
            {
                id: 'beating',
                title: 'Beating & Energy Transfer',
                content: `
<h2>When One Pendulum Starts</h2>

<p>Suppose we displace only pendulum 1 and release both from rest: \\(\\theta_1(0) = \\Theta\\), \\(\\theta_2(0) = 0\\). In normal coordinates: \\(q_+(0) = \\Theta\\), \\(q_-(0) = \\Theta\\). The solution is:</p>

\\[q_+(t) = \\Theta\\cos(\\omega_+ t), \\qquad q_-(t) = \\Theta\\cos(\\omega_- t)\\]

<p>Converting back to physical coordinates \\(\\theta_1 = (q_+ + q_-)/2\\), \\(\\theta_2 = (q_+ - q_-)/2\\):</p>

\\[\\theta_1(t) = \\Theta\\cos\\left(\\frac{\\omega_- - \\omega_+}{2}t\\right)\\cos\\left(\\frac{\\omega_- + \\omega_+}{2}t\\right)\\]
\\[\\theta_2(t) = \\Theta\\sin\\left(\\frac{\\omega_- - \\omega_+}{2}t\\right)\\sin\\left(\\frac{\\omega_- + \\omega_+}{2}t\\right)\\]

<div class="env-block theorem">
<div class="env-title">Theorem: Beat Frequency</div>
<div class="env-body">
<p>The amplitudes of the two pendulums are modulated at the <strong>beat frequency</strong>:</p>
\\[\\omega_{\\text{beat}} = \\omega_- - \\omega_+\\]
<p>The beat period is \\(T_{\\text{beat}} = 2\\pi/(\\omega_- - \\omega_+)\\). After half a beat period, all the energy has transferred from pendulum 1 to pendulum 2, and vice versa. The energy sloshes back and forth periodically.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Weak coupling limit</div>
<div class="env-body">
<p>When \\(\\omega_c \\ll \\omega_0\\), we have \\(\\omega_- \\approx \\omega_0 + \\omega_c^2/\\omega_0\\), so \\(\\omega_{\\text{beat}} \\approx \\omega_c^2/\\omega_0\\). The beat period becomes \\(T_{\\text{beat}} \\approx 2\\pi\\omega_0/\\omega_c^2\\), which is much longer than the oscillation period. The pendulums swing many times at nearly \\(\\omega_0\\) while the energy slowly transfers. This slow modulation is what makes coupled oscillators visually striking.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-coupled-pendulums"></div>

<div class="env-block example">
<div class="env-title">Example: Energy transfer time</div>
<div class="env-body">
<p>With \\(\\omega_0 = 3.13\\) rad/s and \\(\\omega_c = 0.5\\) rad/s, the beat frequency is \\(\\omega_{\\text{beat}} = \\sqrt{\\omega_0^2 + 2\\omega_c^2} - \\omega_0 \\approx 3.13\\sqrt{1 + 0.051} - 3.13 \\approx 0.080\\) rad/s. The beat period is \\(T_{\\text{beat}} \\approx 79\\) s, during which each pendulum completes about \\(79/(2\\pi/3.13) \\approx 39\\) oscillations. An observer sees each pendulum alternately swing and pause.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-coupled-pendulums',
                        title: 'SHOWPIECE: Coupled Pendulums with Energy Transfer',
                        description: 'Two pendulums connected by a spring. Start one swinging and watch energy transfer back and forth (beating). Toggle to see the symmetric and antisymmetric normal modes.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 50, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var coupling = 0.3;
                            var omega0 = 4.0;
                            var pendLen = 120;
                            var mode = 'beat'; // 'beat', 'symmetric', 'antisymmetric'
                            var time = 0;
                            var running = true;

                            VizEngine.createSlider(controls, 'Coupling \u03BA', 0.05, 2.0, coupling, 0.05, function (v) {
                                coupling = v; time = 0;
                            });

                            VizEngine.createButton(controls, 'Beat', function () { mode = 'beat'; time = 0; });
                            VizEngine.createButton(controls, 'Symmetric', function () { mode = 'symmetric'; time = 0; });
                            VizEngine.createButton(controls, 'Antisymmetric', function () { mode = 'antisymmetric'; time = 0; });
                            VizEngine.createButton(controls, 'Reset', function () { time = 0; });

                            var prevTs = null;

                            function draw(ts) {
                                if (prevTs === null) prevTs = ts;
                                var dt = Math.min((ts - prevTs) / 1000, 0.05);
                                prevTs = ts;
                                if (running) time += dt;

                                viz.clear();

                                var wc2 = coupling;
                                var wp = omega0;
                                var wm = Math.sqrt(omega0 * omega0 + 2 * wc2);
                                var amp = 0.35; // radians

                                var th1, th2;
                                if (mode === 'beat') {
                                    // One pendulum initially displaced
                                    th1 = amp * Math.cos((wm - wp) / 2 * time) * Math.cos((wm + wp) / 2 * time);
                                    th2 = amp * Math.sin((wm - wp) / 2 * time) * Math.sin((wm + wp) / 2 * time);
                                } else if (mode === 'symmetric') {
                                    th1 = amp * Math.cos(wp * time);
                                    th2 = amp * Math.cos(wp * time);
                                } else {
                                    th1 = amp * Math.cos(wm * time);
                                    th2 = -amp * Math.cos(wm * time);
                                }

                                // Pivot positions
                                var piv1x = w * 0.35, piv2x = w * 0.65;
                                var pivY = 40;

                                // Bob positions
                                var bob1x = piv1x + pendLen * Math.sin(th1);
                                var bob1y = pivY + pendLen * Math.cos(th1);
                                var bob2x = piv2x + pendLen * Math.sin(th2);
                                var bob2y = pivY + pendLen * Math.cos(th2);

                                // Draw support beam
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.moveTo(w * 0.15, pivY); ctx.lineTo(w * 0.85, pivY); ctx.stroke();

                                // Hatching
                                for (var hx = w * 0.15; hx < w * 0.85; hx += 15) {
                                    ctx.beginPath(); ctx.moveTo(hx, pivY); ctx.lineTo(hx - 8, pivY - 10);
                                    ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1; ctx.stroke();
                                }

                                // Draw spring between bobs
                                var springAmplitude = 8;
                                var springCoils = 12;
                                var sdx = bob2x - bob1x, sdy = bob2y - bob1y;
                                var sLen = Math.sqrt(sdx * sdx + sdy * sdy);
                                if (sLen > 1) {
                                    var sux = sdx / sLen, suy = sdy / sLen;
                                    var snx = -suy, sny = sux;
                                    ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(bob1x, bob1y);
                                    var segL = sLen / (springCoils * 2 + 2);
                                    var cx = bob1x + sux * segL, cy = bob1y + suy * segL;
                                    ctx.lineTo(cx, cy);
                                    for (var i = 0; i < springCoils * 2; i++) {
                                        var sign = (i % 2 === 0) ? 1 : -1;
                                        cx += sux * segL;
                                        cy += suy * segL;
                                        ctx.lineTo(cx + snx * springAmplitude * sign, cy + sny * springAmplitude * sign);
                                    }
                                    cx += sux * segL;
                                    cy += suy * segL;
                                    ctx.lineTo(cx, cy);
                                    ctx.lineTo(bob2x, bob2y);
                                    ctx.stroke();
                                }

                                // Draw strings
                                ctx.strokeStyle = viz.colors.white; ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(piv1x, pivY); ctx.lineTo(bob1x, bob1y); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(piv2x, pivY); ctx.lineTo(bob2x, bob2y); ctx.stroke();

                                // Draw bobs
                                var bobR = 12;
                                ctx.save();
                                ctx.shadowColor = viz.colors.blue; ctx.shadowBlur = 10;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath(); ctx.arc(bob1x, bob1y, bobR, 0, Math.PI * 2); ctx.fill();
                                ctx.shadowColor = viz.colors.orange;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(bob2x, bob2y, bobR, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();

                                // Highlight
                                ctx.fillStyle = 'rgba(255,255,255,0.2)';
                                ctx.beginPath(); ctx.arc(bob1x - 3, bob1y - 3, 4, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(bob2x - 3, bob2y - 3, 4, 0, Math.PI * 2); ctx.fill();

                                // Energy bars
                                var ke1 = 0.5 * pendLen * pendLen * Math.pow((th1 - (prevTh1 || th1)) / Math.max(dt, 0.001), 2);
                                var pe1 = 0.5 * omega0 * omega0 * pendLen * pendLen * th1 * th1;
                                var ke2 = 0.5 * pendLen * pendLen * Math.pow((th2 - (prevTh2 || th2)) / Math.max(dt, 0.001), 2);
                                var pe2 = 0.5 * omega0 * omega0 * pendLen * pendLen * th2 * th2;
                                prevTh1 = th1; prevTh2 = th2;

                                // Simple energy indicator (bar at bottom)
                                var barY = h - 50;
                                var barMaxW = w * 0.3;
                                var e1 = 0.5 * th1 * th1 * (omega0 * omega0);
                                var e2 = 0.5 * th2 * th2 * (omega0 * omega0);
                                var eMax = 0.5 * amp * amp * omega0 * omega0 * 1.1;

                                viz.screenText('Energy in bob 1', w * 0.25, barY - 8, viz.colors.blue, 11);
                                ctx.fillStyle = viz.colors.blue + '44';
                                ctx.fillRect(w * 0.05, barY, barMaxW, 12);
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(w * 0.05, barY, barMaxW * Math.min(e1 / eMax, 1), 12);

                                viz.screenText('Energy in bob 2', w * 0.75, barY - 8, viz.colors.orange, 11);
                                ctx.fillStyle = viz.colors.orange + '44';
                                ctx.fillRect(w * 0.55, barY, barMaxW, 12);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillRect(w * 0.55, barY, barMaxW * Math.min(e2 / eMax, 1), 12);

                                // Mode label
                                var modeLabel = mode === 'beat' ? 'Beating (one bob started)' : (mode === 'symmetric' ? 'Symmetric mode (\u03C9\u208A)' : 'Antisymmetric mode (\u03C9\u208B)');
                                viz.screenText(modeLabel, w / 2, h - 18, viz.colors.white, 13);

                                // Frequency info
                                viz.screenText('\u03C9\u208A = ' + wp.toFixed(2) + '   \u03C9\u208B = ' + wm.toFixed(2) + '   \u0394\u03C9 = ' + (wm - wp).toFixed(3), w / 2, barY - 28, viz.colors.text, 10);
                            }

                            var prevTh1 = 0, prevTh2 = 0;

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'For two coupled pendulums with \\(\\omega_0 = 5\\) rad/s and \\(\\omega_c^2 = 1\\) s\\(^{-2}\\), compute (a) the normal mode frequencies, (b) the beat frequency, and (c) the number of oscillations of each pendulum per beat period.',
                        hint: 'Use \\(\\omega_+ = \\omega_0\\), \\(\\omega_- = \\sqrt{\\omega_0^2 + 2\\omega_c^2}\\). The beat frequency is \\(\\omega_- - \\omega_+\\).',
                        solution: '(a) \\(\\omega_+ = 5\\) rad/s, \\(\\omega_- = \\sqrt{25 + 2} = \\sqrt{27} = 5.196\\) rad/s. (b) \\(\\omega_{\\text{beat}} = 5.196 - 5 = 0.196\\) rad/s. (c) Beat period: \\(T_{\\text{beat}} = 2\\pi/0.196 = 32.1\\) s. Average oscillation period: \\(T_{\\text{avg}} = 2\\pi/5.098 = 1.232\\) s. Number of oscillations: \\(32.1/1.232 \\approx 26\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: General Formalism for N Coupled Oscillators
            // ============================================================
            {
                id: 'n-oscillators',
                title: 'N Coupled Oscillators',
                content: `
<h2>The Eigenvalue Problem</h2>

<p>For \\(N\\) coupled oscillators with coordinates \\(q_1, \\ldots, q_N\\), the linearized equations of motion take the matrix form:</p>

\\[\\mathbf{M}\\ddot{\\mathbf{q}} = -\\mathbf{K}\\mathbf{q}\\]

<p>where \\(\\mathbf{M}\\) is the mass matrix and \\(\\mathbf{K}\\) is the stiffness matrix. Both are real, symmetric, and positive definite (for stable equilibria).</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Normal Modes as Generalized Eigenvalues</div>
<div class="env-body">
<p>Seeking solutions \\(\\mathbf{q}(t) = \\mathbf{a} e^{i\\omega t}\\) leads to the generalized eigenvalue problem:</p>
\\[\\mathbf{K}\\mathbf{a} = \\omega^2 \\mathbf{M}\\mathbf{a}\\]
<p>Since \\(\\mathbf{M}\\) and \\(\\mathbf{K}\\) are symmetric positive definite, there exist exactly \\(N\\) real, non-negative eigenvalues \\(\\omega_1^2 \\leq \\omega_2^2 \\leq \\cdots \\leq \\omega_N^2\\) and corresponding eigenvectors \\(\\mathbf{a}_r\\) that are orthogonal with respect to \\(\\mathbf{M}\\):</p>
\\[\\mathbf{a}_r^T \\mathbf{M} \\mathbf{a}_s = \\mu_r \\delta_{rs}\\]
<p>These eigenvectors are the <strong>normal mode shapes</strong>; the eigenvalues give the <strong>normal mode frequencies</strong>.</p>
</div>
</div>

<h3>The N-Mass Chain</h3>

<p>Consider \\(N\\) identical masses \\(m\\) connected by identical springs \\(k\\), with the endpoints fixed. Let \\(x_j\\) be the displacement of the \\(j\\)-th mass from equilibrium. The equation of motion for the \\(j\\)-th mass is:</p>

\\[m\\ddot{x}_j = k(x_{j+1} - x_j) - k(x_j - x_{j-1}) = k(x_{j+1} - 2x_j + x_{j-1})\\]

<p>with boundary conditions \\(x_0 = x_{N+1} = 0\\).</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Normal Modes of the N-Mass Chain</div>
<div class="env-body">
<p>The normal mode shapes and frequencies are:</p>
\\[a_j^{(r)} = \\sin\\left(\\frac{\\pi r j}{N+1}\\right), \\qquad \\omega_r = 2\\sqrt{\\frac{k}{m}}\\sin\\left(\\frac{\\pi r}{2(N+1)}\\right)\\]
<p>for \\(r = 1, 2, \\ldots, N\\). Mode \\(r\\) has \\(r-1\\) internal nodes (points of zero displacement). The lowest mode is a half-sine wave; the highest is a zigzag pattern where neighboring masses move in opposition.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The dispersion relation</div>
<div class="env-body">
<p>If we define a "wave number" \\(\\kappa_r = \\pi r/(N+1)a\\), where \\(a\\) is the equilibrium spacing, then \\(\\omega_r = 2\\sqrt{k/m}\\sin(\\kappa_r a/2)\\). This is the discrete dispersion relation. It is periodic in \\(\\kappa\\) with period \\(2\\pi/a\\), a consequence of the discrete lattice. The maximum frequency \\(2\\sqrt{k/m}\\) is achieved at the Brillouin zone boundary.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-n-chain"></div>
`,
                visualizations: [
                    {
                        id: 'viz-n-chain',
                        title: 'N-Mass Chain: Normal Modes',
                        description: 'An N-mass chain with fixed endpoints. Select a mode number to see the corresponding standing wave pattern. The mode shape is \\(\\sin(\\pi r j/(N+1))\\).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var N = 8;
                            var modeR = 1;
                            var time = 0;
                            var prevTs = null;

                            VizEngine.createSlider(controls, 'N masses', 3, 20, N, 1, function (v) { N = Math.round(v); if (modeR > N) modeR = N; time = 0; });
                            VizEngine.createSlider(controls, 'Mode r', 1, 20, modeR, 1, function (v) { modeR = Math.min(Math.round(v), N); time = 0; });

                            function draw(ts) {
                                if (prevTs === null) prevTs = ts;
                                var dt = Math.min((ts - prevTs) / 1000, 0.05);
                                prevTs = ts;
                                time += dt;

                                viz.clear();
                                if (modeR > N) modeR = N;

                                var omega0base = 2 * Math.PI;
                                var omegaR = 2 * omega0base * Math.sin(Math.PI * modeR / (2 * (N + 1)));
                                var amp = 50;

                                // Layout
                                var marginX = 50;
                                var chainW = w - 2 * marginX;
                                var spacing = chainW / (N + 1);
                                var centerY = h * 0.45;

                                // Fixed walls
                                ctx.fillStyle = viz.colors.axis;
                                ctx.fillRect(marginX - 6, centerY - 40, 6, 80);
                                ctx.fillRect(w - marginX, centerY - 40, 6, 80);

                                // Compute displacements
                                var displacements = [];
                                for (var j = 0; j <= N + 1; j++) {
                                    if (j === 0 || j === N + 1) {
                                        displacements.push(0);
                                    } else {
                                        var shape = Math.sin(Math.PI * modeR * j / (N + 1));
                                        displacements.push(shape * amp * Math.cos(omegaR * time));
                                    }
                                }

                                // Draw springs and masses
                                for (var j = 0; j <= N; j++) {
                                    var x1 = marginX + j * spacing;
                                    var y1 = centerY + displacements[j];
                                    var x2 = marginX + (j + 1) * spacing;
                                    var y2 = centerY + displacements[j + 1];

                                    // Spring (screen coords)
                                    var sdx = x2 - x1, sdy = y2 - y1;
                                    var sLen = Math.sqrt(sdx * sdx + sdy * sdy);
                                    if (sLen > 1) {
                                        var sux = sdx / sLen, suy = sdy / sLen;
                                        var snx = -suy, sny = sux;
                                        ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 1;
                                        ctx.beginPath();
                                        ctx.moveTo(x1, y1);
                                        var coils = 6;
                                        var segSp = sLen / (coils * 2 + 2);
                                        var scx = x1 + sux * segSp, scy = y1 + suy * segSp;
                                        ctx.lineTo(scx, scy);
                                        for (var ci = 0; ci < coils * 2; ci++) {
                                            var sgn = (ci % 2 === 0) ? 1 : -1;
                                            scx += sux * segSp;
                                            scy += suy * segSp;
                                            ctx.lineTo(scx + snx * 5 * sgn, scy + sny * 5 * sgn);
                                        }
                                        scx += sux * segSp; scy += suy * segSp;
                                        ctx.lineTo(scx, scy); ctx.lineTo(x2, y2);
                                        ctx.stroke();
                                    }
                                }

                                // Draw masses
                                for (var j = 1; j <= N; j++) {
                                    var mx = marginX + j * spacing;
                                    var my = centerY + displacements[j];
                                    var intensity = Math.abs(Math.sin(Math.PI * modeR * j / (N + 1)));
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.blue; ctx.shadowBlur = 6 * intensity;
                                    ctx.fillStyle = viz.colors.blue;
                                    ctx.beginPath(); ctx.arc(mx, my, 8, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                    ctx.fillStyle = 'rgba(255,255,255,0.2)';
                                    ctx.beginPath(); ctx.arc(mx - 2, my - 2, 3, 0, Math.PI * 2); ctx.fill();
                                }

                                // Equilibrium positions (grey dots)
                                ctx.fillStyle = viz.colors.grid;
                                for (var j = 1; j <= N; j++) {
                                    var ex = marginX + j * spacing;
                                    ctx.beginPath(); ctx.arc(ex, centerY, 2, 0, Math.PI * 2); ctx.fill();
                                }

                                // Info
                                viz.screenText('Mode r = ' + modeR + '/' + N, w / 2, h - 50, viz.colors.white, 14);
                                viz.screenText('\u03C9\u1D63 = 2\u03C9\u2080 sin(\u03C0r/2(N+1)) = ' + omegaR.toFixed(2) + ' rad/s', w / 2, h - 30, viz.colors.text, 11);
                                viz.screenText(modeR - 1 + ' internal node' + (modeR - 1 !== 1 ? 's' : ''), w / 2, h - 12, viz.colors.text, 11);
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'For a 3-mass chain (\\(N=3\\)) with equal masses and springs, find all three normal mode frequencies and sketch the mode shapes.',
                        hint: 'Use \\(\\omega_r = 2\\omega_0 \\sin(\\pi r / 8)\\) for \\(r = 1, 2, 3\\) where \\(\\omega_0 = \\sqrt{k/m}\\).',
                        solution: '\\(\\omega_1 = 2\\omega_0\\sin(\\pi/8) = 2\\omega_0 \\times 0.383 = 0.765\\omega_0\\). \\(\\omega_2 = 2\\omega_0\\sin(\\pi/4) = 2\\omega_0/\\sqrt{2} = \\sqrt{2}\\omega_0\\). \\(\\omega_3 = 2\\omega_0\\sin(3\\pi/8) = 2\\omega_0 \\times 0.924 = 1.848\\omega_0\\). Mode 1: all three move in the same direction (half sine). Mode 2: outer masses move opposite to each other, middle stationary (one node). Mode 3: alternating displacements (zigzag, two nodes).'
                    },
                    {
                        question: 'Show that the highest normal mode frequency of an \\(N\\)-mass chain approaches \\(2\\sqrt{k/m}\\) as \\(N \\to \\infty\\).',
                        hint: 'The highest mode has \\(r = N\\). Write out \\(\\omega_N\\) and take the limit.',
                        solution: '\\(\\omega_N = 2\\sqrt{k/m}\\sin(\\pi N/(2(N+1)))\\). As \\(N \\to \\infty\\), \\(\\pi N/(2(N+1)) \\to \\pi/2\\), so \\(\\sin \\to 1\\) and \\(\\omega_N \\to 2\\sqrt{k/m}\\). This is the maximum frequency of the discrete lattice (the Brillouin zone edge). No normal mode can exceed this frequency because neighboring masses moving in perfect opposition is the stiffest possible pattern.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Continuum Limit and the Wave Equation
            // ============================================================
            {
                id: 'continuum',
                title: 'Continuum Limit',
                content: `
<h2>From Discrete to Continuous</h2>

<p>Take the \\(N\\)-mass chain and let \\(N \\to \\infty\\) while keeping the total mass \\(M = Nm\\) and total length \\(L = (N+1)a\\) fixed. Define the linear mass density \\(\\mu = M/L = m/a\\) and the tension \\(T = ka\\) (the product of spring constant and spacing).</p>

<p>The discrete equation \\(m\\ddot{x}_j = k(x_{j+1} - 2x_j + x_{j-1})\\) becomes, in the limit:</p>

\\[\\mu \\frac{\\partial^2 u}{\\partial t^2} = T \\frac{\\partial^2 u}{\\partial x^2}\\]

<div class="env-block theorem">
<div class="env-title">Theorem: The Wave Equation</div>
<div class="env-body">
<p>This is the one-dimensional <strong>wave equation</strong>, with wave speed:</p>
\\[v = \\sqrt{\\frac{T}{\\mu}}\\]
<p>The normal modes of the continuous string with fixed endpoints are:</p>
\\[u_n(x, t) = \\sin\\left(\\frac{n\\pi x}{L}\\right)\\cos(\\omega_n t), \\qquad \\omega_n = \\frac{n\\pi v}{L}\\]
<p>In the continuum limit, the normal mode frequencies form a harmonic series: \\(\\omega_n = n\\omega_1\\). The discrete dispersion relation \\(\\omega \\propto \\sin(\\kappa a/2)\\) linearizes to \\(\\omega = v\\kappa\\) for long wavelengths (\\(\\kappa a \\ll 1\\)).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The continuum limit erases the lattice</div>
<div class="env-body">
<p>In the discrete chain, the dispersion relation is nonlinear and periodic in \\(\\kappa\\). The maximum frequency \\(2\\sqrt{k/m}\\) is a consequence of the lattice spacing. In the continuum limit, the dispersion relation becomes linear (\\(\\omega = v\\kappa\\)) and there is no maximum frequency. The lattice cutoff disappears because we have taken \\(a \\to 0\\). Physically, this means the continuum approximation fails for wavelengths comparable to the interatomic spacing.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Continuum limit verification</div>
<div class="env-body">
<p>For the discrete chain, \\(\\omega_r = 2\\sqrt{k/m}\\sin(\\pi r/(2(N+1)))\\). For small mode numbers \\(r \\ll N\\), \\(\\sin(\\pi r/(2(N+1))) \\approx \\pi r/(2(N+1))\\), giving \\(\\omega_r \\approx \\sqrt{k/m} \\cdot \\pi r/(N+1)\\). Now \\(ka = T\\), \\(m/a = \\mu\\), and \\((N+1)a = L\\), so \\(\\sqrt{k/m} = \\sqrt{T/(\\mu a^2)} = v/a\\). Hence \\(\\omega_r \\approx (v/a) \\cdot \\pi r a/L = r\\pi v/L = \\omega_r^{\\text{cont}}\\). The low-frequency modes of the discrete chain match the continuum exactly.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why sound has a maximum frequency in a crystal</div>
<div class="env-body">
<p>In a real crystal, atoms are discrete. Phonon (sound wave) frequencies cannot exceed the Debye cutoff, which is the lattice version of \\(2\\sqrt{k/m}\\). This is why the specific heat of solids deviates from the classical Dulong-Petit law at low temperatures: high-frequency modes cannot be thermally excited when \\(k_B T \\ll \\hbar\\omega_{\\max}\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A guitar string has length \\(L = 0.65\\) m, linear density \\(\\mu = 0.001\\) kg/m, and tension \\(T = 70\\) N. Find the fundamental frequency and the frequency of the 5th harmonic.',
                        hint: 'The wave speed is \\(v = \\sqrt{T/\\mu}\\) and the fundamental frequency is \\(f_1 = v/(2L)\\).',
                        solution: '\\(v = \\sqrt{70/0.001} = 264.6\\) m/s. \\(f_1 = 264.6/(2 \\times 0.65) = 203.5\\) Hz. The 5th harmonic: \\(f_5 = 5 \\times 203.5 = 1018\\) Hz.'
                    },
                    {
                        question: 'Show that in the continuum limit (\\(a \\to 0\\), \\(N \\to \\infty\\) with \\(L\\) and \\(\\mu\\) fixed), the discrete dispersion relation reduces to \\(\\omega = v \\kappa\\) for \\(\\kappa a \\ll 1\\).',
                        hint: 'Expand \\(\\sin(\\kappa a/2) \\approx \\kappa a/2\\) for small argument.',
                        solution: 'Discrete: \\(\\omega = 2\\sqrt{k/m}\\sin(\\kappa a/2)\\). For \\(\\kappa a \\ll 1\\): \\(\\sin(\\kappa a/2) \\approx \\kappa a/2\\), so \\(\\omega \\approx 2\\sqrt{k/m} \\cdot \\kappa a/2 = \\kappa a \\sqrt{k/m}\\). Now \\(a\\sqrt{k/m} = \\sqrt{ka^2/m} = \\sqrt{(ka)(a/m)} = \\sqrt{T/\\mu} = v\\). Therefore \\(\\omega = v\\kappa\\), which is the linear (non-dispersive) dispersion relation of the wave equation.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Superposition and General Motion
            // ============================================================
            {
                id: 'superposition',
                title: 'Superposition & General Motion',
                content: `
<h2>General Solution as Normal Mode Expansion</h2>

<p>The general motion of a coupled system is a superposition of all normal modes. For the \\(N\\)-mass chain:</p>

\\[x_j(t) = \\sum_{r=1}^{N} \\left[ C_r \\cos(\\omega_r t) + D_r \\sin(\\omega_r t) \\right] \\sin\\left(\\frac{\\pi r j}{N+1}\\right)\\]

<p>The \\(2N\\) constants \\(C_r, D_r\\) are determined by the \\(2N\\) initial conditions \\(x_j(0)\\) and \\(\\dot{x}_j(0)\\). The normal mode decomposition is a discrete Fourier sine transform.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Orthogonality of Normal Modes</div>
<div class="env-body">
<p>The mode shapes satisfy the orthogonality relation:</p>
\\[\\sum_{j=1}^{N} \\sin\\left(\\frac{\\pi r j}{N+1}\\right) \\sin\\left(\\frac{\\pi s j}{N+1}\\right) = \\frac{N+1}{2} \\delta_{rs}\\]
<p>This allows extraction of each coefficient independently:</p>
\\[C_r = \\frac{2}{N+1} \\sum_{j=1}^{N} x_j(0) \\sin\\left(\\frac{\\pi r j}{N+1}\\right)\\]
\\[D_r = \\frac{2}{(N+1)\\omega_r} \\sum_{j=1}^{N} \\dot{x}_j(0) \\sin\\left(\\frac{\\pi r j}{N+1}\\right)\\]
</div>
</div>

<div class="env-block remark">
<div class="env-title">Energy partitioning</div>
<div class="env-body">
<p>The total energy of the system is the sum of the energies in each normal mode. If only mode \\(r\\) is excited, the energy sits entirely in that mode and stays there forever (in the linear approximation). Modes do not exchange energy. This is the deepest consequence of normal mode decomposition: a complicated coupled problem decomposes into \\(N\\) independent simple harmonic oscillators.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why normal modes matter beyond oscillations</div>
<div class="env-body">
<p>The normal mode idea is one of the most far-reaching in physics. Every small oscillation problem, every wave equation, every quantum field theory is fundamentally a normal mode decomposition. The Fourier transform is a normal mode decomposition in the continuum limit. Phonons in solid-state physics, photons in QED, quasinormal modes of black holes: all are descendants of this same structure.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Plucking a string</div>
<div class="env-body">
<p>A guitar string is plucked at its center, giving an initial triangular shape: \\(x_j(0) = (2h/N) \\min(j, N+1-j)\\) with \\(\\dot{x}_j(0) = 0\\). By the orthogonality relation, only odd modes are excited (even modes have a node at the center and contribute nothing). The coefficients are \\(C_r = 8h/(\\pi^2 r^2) \\sin(r\\pi/2)\\), which gives zero for even \\(r\\) and \\(\\pm 8h/(\\pi^2 r^2)\\) for odd \\(r\\). The higher harmonics fall off as \\(1/r^2\\), giving a mellow tone.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Nonlinearity destroys normal mode independence</div>
<div class="env-body">
<p>Normal mode decomposition is exact only for linear systems. In a real physical system with nonlinear restoring forces (e.g., large-amplitude oscillations), modes couple and exchange energy. The Fermi-Pasta-Ulam-Tsingou problem (1955) famously showed that a nonlinear chain does not thermalize as expected; instead, energy recurs to the initial mode quasi-periodically. This remains an active research topic.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Verify the orthogonality relation \\(\\sum_{j=1}^{N} \\sin(\\pi r j/(N+1)) \\sin(\\pi s j/(N+1)) = (N+1)/2 \\cdot \\delta_{rs}\\) for \\(N=3\\), \\(r=1\\), \\(s=2\\).',
                        hint: 'Compute \\(\\sin(\\pi j/4)\\) and \\(\\sin(2\\pi j/4) = \\sin(\\pi j/2)\\) for \\(j=1,2,3\\), multiply, and sum.',
                        solution: 'For \\(j=1\\): \\(\\sin(\\pi/4)\\sin(\\pi/2) = (\\sqrt{2}/2)(1) = \\sqrt{2}/2\\). For \\(j=2\\): \\(\\sin(\\pi/2)\\sin(\\pi) = (1)(0) = 0\\). For \\(j=3\\): \\(\\sin(3\\pi/4)\\sin(3\\pi/2) = (\\sqrt{2}/2)(-1) = -\\sqrt{2}/2\\). Sum: \\(\\sqrt{2}/2 + 0 - \\sqrt{2}/2 = 0 = (N+1)/2 \\cdot \\delta_{12} = 0\\). Verified.'
                    },
                    {
                        question: 'For a string plucked at position \\(x = L/4\\), which harmonics have zero amplitude and why?',
                        hint: 'The initial shape has a kink at \\(L/4\\). Which mode shapes have a node there?',
                        solution: 'Modes with a node at \\(x = L/4\\) have \\(\\sin(n\\pi/4) = 0\\), which requires \\(n\\pi/4 = k\\pi\\) for integer \\(k\\), i.e., \\(n = 4, 8, 12, \\ldots\\) Every 4th harmonic has zero amplitude. Physically, these modes have a node precisely at the pluck point and cannot be excited by a displacement there. The Fourier coefficient is proportional to \\(\\sin(n\\pi/4)/n^2\\), which vanishes for multiples of 4.'
                    }
                ]
            }
        ]
    });
})();
