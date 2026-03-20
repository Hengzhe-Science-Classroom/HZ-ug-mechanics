// === Chapter 16: Damped & Driven Oscillations ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch16',
        number: 16,
        title: 'Damped & Driven Oscillations',
        subtitle: 'Dissipation, resonance, and the interplay of transient and steady-state response',
        file: 'ch16-damped',

        sections: [
            // ============================================================
            // Section 0: Damped Harmonic Oscillator
            // ============================================================
            {
                id: 'damped-oscillator',
                title: 'Damped Harmonic Oscillator',
                content: `
<h2>Adding Dissipation</h2>

<p>Every real oscillator loses energy to its environment. The simplest model of dissipation is a velocity-dependent damping force, proportional and opposite to the velocity. For a mass \\(m\\) on a spring with constant \\(k\\) and damping coefficient \\(b\\), Newton's second law gives:</p>

\\[m\\ddot{x} + b\\dot{x} + kx = 0\\]

<div class="env-block definition">
<div class="env-title">Definition: Damping Ratio and Natural Frequency</div>
<div class="env-body">
<p>Define the <strong>natural frequency</strong> \\(\\omega_0 = \\sqrt{k/m}\\) and the <strong>damping parameter</strong> \\(\\gamma = b/(2m)\\). The equation of motion becomes:</p>
\\[\\ddot{x} + 2\\gamma\\dot{x} + \\omega_0^2 x = 0\\]
<p>The <strong>damping ratio</strong> is \\(\\zeta = \\gamma/\\omega_0 = b/(2\\sqrt{mk})\\). The character of the motion depends entirely on whether \\(\\zeta < 1\\), \\(\\zeta = 1\\), or \\(\\zeta > 1\\).</p>
</div>
</div>

<p>We seek solutions of the form \\(x(t) = A e^{\\alpha t}\\). Substituting:</p>

\\[\\alpha^2 + 2\\gamma\\alpha + \\omega_0^2 = 0 \\implies \\alpha = -\\gamma \\pm \\sqrt{\\gamma^2 - \\omega_0^2}\\]

<p>The discriminant \\(\\gamma^2 - \\omega_0^2\\) determines the three regimes.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Three Damping Regimes</div>
<div class="env-body">
<p><strong>Underdamped</strong> (\\(\\zeta < 1\\)): The roots are complex, \\(\\alpha = -\\gamma \\pm i\\omega_1\\) where \\(\\omega_1 = \\sqrt{\\omega_0^2 - \\gamma^2}\\). The solution is:</p>
\\[x(t) = A e^{-\\gamma t} \\cos(\\omega_1 t + \\phi)\\]
<p>The system oscillates with exponentially decaying amplitude and a frequency \\(\\omega_1 < \\omega_0\\).</p>
<p><strong>Critically damped</strong> (\\(\\zeta = 1\\)): The roots are degenerate, \\(\\alpha = -\\gamma\\). The general solution is:</p>
\\[x(t) = (A + Bt)e^{-\\gamma t}\\]
<p>The system returns to equilibrium in the shortest time without oscillating.</p>
<p><strong>Overdamped</strong> (\\(\\zeta > 1\\)): The roots are real and distinct. Writing \\(\\alpha_\\pm = -\\gamma \\pm \\sqrt{\\gamma^2 - \\omega_0^2}\\):</p>
\\[x(t) = A e^{\\alpha_+ t} + B e^{\\alpha_- t}\\]
<p>Both exponentials are decaying (\\(\\alpha_\\pm < 0\\)). The system returns to equilibrium sluggishly, without oscillation.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Physical content of critical damping</div>
<div class="env-body">
<p>Critical damping is not a "boundary" between oscillation and non-oscillation in the same sense as a phase transition. It is simply the value of \\(\\zeta\\) that minimizes the time to return to equilibrium for a given \\(\\omega_0\\). Engineers design door closers and shock absorbers near critical damping for exactly this reason.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-damped-regimes"></div>
`,
                visualizations: [
                    {
                        id: 'viz-damped-regimes',
                        title: 'Damped Oscillation: Three Regimes',
                        description: 'Adjust the damping ratio \\(\\zeta\\) to see underdamped (\\(\\zeta<1\\)), critically damped (\\(\\zeta=1\\)), and overdamped (\\(\\zeta>1\\)) behavior. The envelope \\(\\pm A e^{-\\gamma t}\\) is shown as a dashed curve.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 60, originY: 180 });
                            var ctx = viz.ctx;

                            var zeta = 0.15;
                            var omega0 = 2 * Math.PI;
                            var x0 = 3.0;

                            VizEngine.createSlider(controls, 'Damping ratio \u03B6', 0.01, 3.0, zeta, 0.01, function (v) { zeta = v; });

                            function draw() {
                                viz.clear();
                                // axes
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(60, viz.height); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(0, 180); ctx.lineTo(viz.width, 180); ctx.stroke();
                                // labels
                                viz.screenText('t', viz.width - 15, 193, viz.colors.text, 13, 'center', 'top');
                                viz.screenText('x(t)', 72, 10, viz.colors.text, 13, 'left', 'top');

                                var gamma = zeta * omega0;
                                var tMax = 4.0;
                                var steps = 600;
                                var dt = tMax / steps;
                                var scaleX = (viz.width - 80) / tMax;
                                var scaleY = 50;

                                // Compute x(t)
                                function xt(t) {
                                    if (zeta < 0.999) {
                                        var w1 = omega0 * Math.sqrt(1 - zeta * zeta);
                                        return x0 * Math.exp(-gamma * t) * Math.cos(w1 * t);
                                    } else if (zeta < 1.001) {
                                        return x0 * (1 + gamma * t) * Math.exp(-gamma * t);
                                    } else {
                                        var disc = Math.sqrt(gamma * gamma - omega0 * omega0);
                                        var ap = -gamma + disc;
                                        var am = -gamma - disc;
                                        return x0 * (am * Math.exp(ap * t) - ap * Math.exp(am * t)) / (am - ap);
                                    }
                                }

                                // Draw envelope for underdamped
                                if (zeta < 0.999) {
                                    ctx.setLineDash([6, 4]);
                                    ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    for (var i = 0; i <= steps; i++) {
                                        var t = i * dt;
                                        var env = x0 * Math.exp(-gamma * t);
                                        var px = 60 + t * scaleX;
                                        var py = 180 - env * scaleY;
                                        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                                    }
                                    ctx.stroke();
                                    ctx.beginPath();
                                    for (var i = 0; i <= steps; i++) {
                                        var t = i * dt;
                                        var env = -x0 * Math.exp(-gamma * t);
                                        var px = 60 + t * scaleX;
                                        var py = 180 - env * scaleY;
                                        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                                    }
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                }

                                // Draw x(t)
                                var color = zeta < 0.999 ? viz.colors.blue : (zeta < 1.001 ? viz.colors.green : viz.colors.orange);
                                ctx.strokeStyle = color; ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var i = 0; i <= steps; i++) {
                                    var t = i * dt;
                                    var x = xt(t);
                                    var px = 60 + t * scaleX;
                                    var py = 180 - x * scaleY;
                                    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // regime label
                                var label = zeta < 0.999 ? 'Underdamped (\u03B6 < 1)' : (zeta < 1.001 ? 'Critically damped (\u03B6 = 1)' : 'Overdamped (\u03B6 > 1)');
                                viz.screenText(label, viz.width / 2, viz.height - 20, color, 14);
                                viz.screenText('\u03B6 = ' + zeta.toFixed(2), viz.width / 2, viz.height - 40, viz.colors.text, 12);

                                // tick marks
                                ctx.fillStyle = viz.colors.text; ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center'; ctx.textBaseline = 'top';
                                for (var ts = 0; ts <= 4; ts++) {
                                    var px = 60 + ts * scaleX;
                                    ctx.beginPath(); ctx.moveTo(px, 178); ctx.lineTo(px, 182); ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1; ctx.stroke();
                                    ctx.fillText(ts + 's', px, 184);
                                }
                            }

                            viz.animate(function () { draw(); });
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A 0.5 kg mass on a spring (\\(k = 50\\) N/m) has a damping coefficient \\(b = 2\\) N\\(\\cdot\\)s/m. Determine (a) the natural frequency \\(\\omega_0\\), (b) the damping parameter \\(\\gamma\\), (c) the damping ratio \\(\\zeta\\), and (d) classify the motion.',
                        hint: 'Use \\(\\omega_0 = \\sqrt{k/m}\\), \\(\\gamma = b/(2m)\\), \\(\\zeta = \\gamma/\\omega_0\\).',
                        solution: '(a) \\(\\omega_0 = \\sqrt{50/0.5} = 10\\) rad/s. (b) \\(\\gamma = 2/(2 \\cdot 0.5) = 2\\) s\\(^{-1}\\). (c) \\(\\zeta = 2/10 = 0.2\\). (d) Since \\(\\zeta < 1\\), the motion is underdamped. The damped frequency is \\(\\omega_1 = 10\\sqrt{1 - 0.04} \\approx 9.80\\) rad/s.'
                    },
                    {
                        question: 'Show that for an underdamped oscillator, the ratio of successive amplitude maxima satisfies \\(x_n / x_{n+1} = e^{\\gamma T_1}\\), where \\(T_1 = 2\\pi/\\omega_1\\) is the damped period. This ratio is called the <em>logarithmic decrement</em>.',
                        hint: 'Maxima occur when \\(\\cos(\\omega_1 t + \\phi) = 1\\), separated by \\(T_1\\). The exponential envelope at consecutive maxima differs by \\(e^{-\\gamma T_1}\\).',
                        solution: 'Consecutive maxima occur at times \\(t_n\\) and \\(t_{n+1} = t_n + T_1\\). The amplitudes are \\(A_n = A_0 e^{-\\gamma t_n}\\) and \\(A_{n+1} = A_0 e^{-\\gamma(t_n + T_1)}\\). Their ratio is \\(A_n/A_{n+1} = e^{\\gamma T_1}\\). The logarithmic decrement is \\(\\delta = \\ln(A_n/A_{n+1}) = \\gamma T_1 = 2\\pi\\gamma/\\omega_1 = 2\\pi\\zeta/\\sqrt{1 - \\zeta^2}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 1: Energy Dissipation and the Q Factor
            // ============================================================
            {
                id: 'q-factor',
                title: 'Energy Dissipation & Q Factor',
                content: `
<h2>How Quickly Does Energy Drain?</h2>

<p>For an underdamped oscillator, the total energy decays exponentially. Since the amplitude decays as \\(e^{-\\gamma t}\\), and energy is proportional to amplitude squared:</p>

\\[E(t) = E_0 \\, e^{-2\\gamma t}\\]

<p>The energy \\(e\\)-folding time is \\(\\tau_E = 1/(2\\gamma)\\). In one oscillation period \\(T_1 = 2\\pi/\\omega_1\\), the fractional energy loss is:</p>

\\[\\frac{\\Delta E}{E} = 1 - e^{-2\\gamma T_1} \\approx 2\\gamma T_1 = \\frac{4\\pi\\gamma}{\\omega_1}\\]

<p>for small damping.</p>

<div class="env-block definition">
<div class="env-title">Definition: Quality Factor</div>
<div class="env-body">
<p>The <strong>quality factor</strong> (or Q factor) measures how many radians the oscillator swings through before the energy drops by a factor of \\(e\\):</p>
\\[Q = \\frac{\\omega_0}{2\\gamma} = \\frac{1}{2\\zeta}\\]
<p>Equivalently, for weak damping:</p>
\\[Q \\approx 2\\pi \\times \\frac{\\text{energy stored}}{\\text{energy lost per cycle}} = \\frac{\\omega_1}{2\\gamma}\\]
<p>A high-Q oscillator rings for many cycles before its energy is appreciably depleted. A tuning fork has \\(Q \\sim 10^3\\); a quartz crystal \\(Q \\sim 10^5\\); a laser cavity \\(Q \\sim 10^9\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Energy decay of a piano string</div>
<div class="env-body">
<p>A piano string vibrates at 440 Hz with \\(Q \\approx 3000\\). The damping parameter is \\(\\gamma = \\omega_0/(2Q) = 2\\pi(440)/(6000) \\approx 0.46\\) s\\(^{-1}\\). The energy \\(e\\)-folding time is \\(\\tau_E = 1/(2 \\times 0.46) \\approx 1.1\\) s. After 3 seconds, the energy has fallen to \\(e^{-2(0.46)(3)} \\approx 0.064\\) of its initial value, i.e., about 6%.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Q factor is defined at the natural frequency</div>
<div class="env-body">
<p>The Q factor characterizes the free oscillator, not a driven one. When we discuss driven systems, the "Q at resonance" uses \\(\\omega_0\\), not the driving frequency. Conflating the two is a common source of confusion.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Q as a dimensionless lifetime</div>
<div class="env-body">
<p>Think of Q as the number of radians the oscillator "lives." After \\(Q\\) radians (i.e., \\(Q/(2\\pi)\\) cycles), the energy has dropped to \\(1/e\\). High Q means a slowly dying oscillation; low Q means a quickly dying one.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A damped oscillator has \\(\\omega_0 = 100\\) rad/s and \\(Q = 50\\). (a) Find \\(\\gamma\\). (b) How many cycles until the amplitude drops to half its initial value?',
                        hint: 'The amplitude is \\(A_0 e^{-\\gamma t}\\). Set \\(e^{-\\gamma t} = 1/2\\) and convert \\(t\\) to number of cycles using \\(T_1 \\approx 2\\pi/\\omega_0\\) for high Q.',
                        solution: '(a) \\(\\gamma = \\omega_0/(2Q) = 100/100 = 1\\) s\\(^{-1}\\). (b) \\(e^{-t} = 1/2\\) gives \\(t = \\ln 2 \\approx 0.693\\) s. The period is \\(T_1 \\approx 2\\pi/100 = 0.0628\\) s. Number of cycles: \\(0.693/0.0628 \\approx 11.0\\) cycles.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Driven Oscillations and Steady State
            // ============================================================
            {
                id: 'driven-oscillations',
                title: 'Driven Oscillations & Steady State',
                content: `
<h2>Applying an External Force</h2>

<p>Now add a sinusoidal driving force \\(F(t) = F_0 \\cos(\\omega t)\\) to the damped oscillator:</p>

\\[\\ddot{x} + 2\\gamma\\dot{x} + \\omega_0^2 x = \\frac{F_0}{m}\\cos(\\omega t)\\]

<p>The general solution is the sum of the complementary (homogeneous) solution and a particular solution. The complementary solution is the transient, which decays as \\(e^{-\\gamma t}\\). After enough time, only the particular solution survives: the <strong>steady state</strong>.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Steady-State Solution</div>
<div class="env-body">
<p>The steady-state solution is \\(x_p(t) = A(\\omega)\\cos(\\omega t - \\delta(\\omega))\\), where the amplitude and phase lag are:</p>
\\[A(\\omega) = \\frac{F_0/m}{\\sqrt{(\\omega_0^2 - \\omega^2)^2 + 4\\gamma^2\\omega^2}}\\]
\\[\\tan\\delta = \\frac{2\\gamma\\omega}{\\omega_0^2 - \\omega^2}\\]
<p>The phase lag \\(\\delta\\) runs from 0 (low \\(\\omega\\)) through \\(\\pi/2\\) (at \\(\\omega = \\omega_0\\)) to \\(\\pi\\) (high \\(\\omega\\)).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The complex exponential method</div>
<div class="env-body">
<p>The standard derivation uses the ansatz \\(\\tilde{x}(t) = \\tilde{A} e^{i\\omega t}\\), substitutes into the equation with driving \\((F_0/m)e^{i\\omega t}\\), and solves for the complex amplitude \\(\\tilde{A}\\). The physical solution is \\(x_p = \\text{Re}(\\tilde{A} e^{i\\omega t})\\). This approach yields the amplitude and phase simultaneously: \\(A = |\\tilde{A}|\\), \\(\\delta = -\\arg(\\tilde{A})\\).</p>
</div>
</div>

<h3>Transient + Steady State</h3>

<p>The full solution is:</p>

\\[x(t) = \\underbrace{C e^{-\\gamma t}\\cos(\\omega_1 t + \\phi_0)}_{\\text{transient}} + \\underbrace{A(\\omega)\\cos(\\omega t - \\delta)}_{\\text{steady state}}\\]

<p>The constants \\(C\\) and \\(\\phi_0\\) are fixed by initial conditions. After a time of order \\(1/\\gamma\\), the transient dies and the oscillator locks to the driving frequency. This is independent of initial conditions: all initial conditions lead to the same steady state.</p>

<div class="env-block intuition">
<div class="env-title">Why the steady state has the driving frequency</div>
<div class="env-body">
<p>This is not obvious from the physics alone. The mathematical reason is that the driven equation is linear with constant coefficients. A sinusoidal input at frequency \\(\\omega\\) produces a sinusoidal output at the same frequency \\(\\omega\\). The system cannot generate new frequencies (unlike a nonlinear oscillator). The amplitude and phase are the system's linear response.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Transient beating</div>
<div class="env-body">
<p>If \\(\\omega \\approx \\omega_1\\) and \\(\\gamma\\) is small, the transient and steady-state terms have nearly the same frequency but different amplitudes. Their superposition produces beats that slowly die away as the transient decays. The beating period is \\(\\approx 2\\pi/|\\omega - \\omega_1|\\). This is commonly observed when a driving force is suddenly turned on near resonance.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Derive the steady-state amplitude \\(A(\\omega)\\) using the complex exponential method. Substitute \\(\\tilde{x} = \\tilde{A}e^{i\\omega t}\\) into \\(\\ddot{x} + 2\\gamma\\dot{x} + \\omega_0^2 x = (F_0/m)e^{i\\omega t}\\) and solve for \\(\\tilde{A}\\).',
                        hint: 'Derivatives bring down powers of \\(i\\omega\\). You get \\((-\\omega^2 + 2i\\gamma\\omega + \\omega_0^2)\\tilde{A} = F_0/m\\).',
                        solution: 'Substituting: \\((-\\omega^2 + 2i\\gamma\\omega + \\omega_0^2)\\tilde{A} = F_0/m\\). So \\(\\tilde{A} = (F_0/m)/(\\omega_0^2 - \\omega^2 + 2i\\gamma\\omega)\\). The modulus is \\(|\\tilde{A}| = (F_0/m)/\\sqrt{(\\omega_0^2 - \\omega^2)^2 + 4\\gamma^2\\omega^2}\\), as required. The phase is \\(\\delta = \\arctan[2\\gamma\\omega/(\\omega_0^2 - \\omega^2)]\\).'
                    },
                    {
                        question: 'For a driven oscillator with \\(\\omega_0 = 10\\) rad/s, \\(\\gamma = 0.5\\) s\\(^{-1}\\), and \\(F_0/m = 100\\) m/s\\(^2\\), compute the steady-state amplitude at \\(\\omega = 10\\) rad/s (resonance) and at \\(\\omega = 5\\) rad/s.',
                        hint: 'Plug into the amplitude formula. At \\(\\omega = \\omega_0\\), the term \\((\\omega_0^2 - \\omega^2)\\) vanishes.',
                        solution: 'At \\(\\omega = 10\\): \\(A = 100/\\sqrt{0 + 4(0.25)(100)} = 100/10 = 10\\) m. At \\(\\omega = 5\\): \\(A = 100/\\sqrt{(100-25)^2 + 4(0.25)(25)} = 100/\\sqrt{5625 + 25} = 100/75.17 \\approx 1.33\\) m. The amplitude at resonance is about 7.5 times larger.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Resonance
            // ============================================================
            {
                id: 'resonance',
                title: 'Resonance',
                content: `
<h2>The Amplitude Peak</h2>

<p>The steady-state amplitude \\(A(\\omega)\\) has a maximum near \\(\\omega = \\omega_0\\). To find the precise peak, we differentiate \\(A^2(\\omega)\\) with respect to \\(\\omega^2\\) and set it to zero:</p>

\\[\\omega_{\\text{res}} = \\sqrt{\\omega_0^2 - 2\\gamma^2} = \\omega_0\\sqrt{1 - 2\\zeta^2}\\]

<p>This is the <strong>amplitude resonance frequency</strong>. It exists only if \\(\\zeta < 1/\\sqrt{2}\\), i.e., if the damping is not too heavy.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Resonance Amplitude and Width</div>
<div class="env-body">
<p>At resonance (and for small damping, \\(\\omega_{\\text{res}} \\approx \\omega_0\\)), the peak amplitude is:</p>
\\[A_{\\text{max}} \\approx \\frac{F_0}{m} \\cdot \\frac{1}{2\\gamma\\omega_0} = \\frac{F_0}{m\\omega_0^2} \\cdot Q\\]
<p>The peak amplitude is proportional to \\(Q\\). The full width at half-maximum (FWHM) of the power absorbed (proportional to \\(A^2\\)) satisfies:</p>
\\[\\Delta\\omega \\approx \\frac{\\omega_0}{Q} = 2\\gamma\\]
<p>High Q means a tall, narrow resonance peak; low Q means a short, broad one.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Three resonance frequencies</div>
<div class="env-body">
<p>There are actually three distinct "resonance" frequencies: (1) the natural frequency \\(\\omega_0\\), (2) the amplitude resonance \\(\\omega_{\\text{res}} = \\omega_0\\sqrt{1 - 2\\zeta^2}\\), and (3) the phase resonance \\(\\omega = \\omega_0\\) (where \\(\\delta = \\pi/2\\)). For small damping, all three coincide to leading order. The distinction matters only when \\(\\zeta\\) is not small.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-resonance-curve"></div>

<h3>Power Absorption</h3>

<p>The time-averaged power delivered by the driving force to the oscillator is:</p>

\\[\\langle P \\rangle = \\frac{1}{2} F_0 \\omega A(\\omega) \\sin\\delta(\\omega) = \\frac{F_0^2}{2m} \\cdot \\frac{2\\gamma\\omega^2}{(\\omega_0^2 - \\omega^2)^2 + 4\\gamma^2\\omega^2}\\]

<p>This is a Lorentzian in \\(\\omega^2\\), peaked precisely at \\(\\omega = \\omega_0\\). At resonance, the driving force is exactly \\(90^\\circ\\) ahead of the displacement (and in phase with the velocity), so power transfer is maximized.</p>

<div class="env-block warning">
<div class="env-title">Resonance does not mean infinite amplitude</div>
<div class="env-body">
<p>At resonance, the driving force pumps energy in at the same rate that damping dissipates it. The amplitude grows until these rates balance: \\(A_{\\text{max}} = F_0/(2m\\gamma\\omega_0)\\). Without damping (\\(\\gamma \\to 0\\)), the amplitude would grow without bound, which is the resonance catastrophe. Real systems always have some damping, and may also become nonlinear at large amplitudes.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-resonance-curve',
                        title: 'Resonance Curve: Amplitude and Phase vs. Driving Frequency',
                        description: 'Adjust the Q factor to see how the resonance peak sharpens. The top panel shows amplitude \\(A(\\omega)\\); the bottom shows the phase lag \\(\\delta(\\omega)\\).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 60, originY: 100 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var Q = 10;
                            VizEngine.createSlider(controls, 'Q factor', 1, 50, Q, 0.5, function (v) { Q = v; });

                            function draw() {
                                viz.clear();
                                var omega0 = 1.0;
                                var gamma = omega0 / (2 * Q);
                                var f0m = 1.0; // F0/m

                                // Amplitude plot (top half)
                                var ampH = h * 0.5 - 20;
                                var ampTop = 20;
                                var plotL = 70, plotR = w - 20;
                                var omegaMax = 2.5;

                                // Axes for amplitude
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(plotL, ampTop); ctx.lineTo(plotL, ampTop + ampH); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(plotL, ampTop + ampH); ctx.lineTo(plotR, ampTop + ampH); ctx.stroke();
                                viz.screenText('A(\u03C9)', plotL - 5, ampTop + 10, viz.colors.text, 11, 'right', 'top');
                                viz.screenText('\u03C9', plotR - 5, ampTop + ampH + 12, viz.colors.text, 11, 'center', 'top');

                                // Peak amplitude for scaling
                                var Apeak = f0m / (2 * gamma * omega0);
                                var Ascale = (ampH - 10) / Apeak;

                                // Draw amplitude curve
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var steps = 500;
                                for (var i = 0; i <= steps; i++) {
                                    var om = 0.01 + (omegaMax - 0.01) * i / steps;
                                    var denom = Math.sqrt(Math.pow(omega0 * omega0 - om * om, 2) + 4 * gamma * gamma * om * om);
                                    var A = f0m / denom;
                                    var px = plotL + (om / omegaMax) * (plotR - plotL);
                                    var py = ampTop + ampH - A * Ascale;
                                    if (py < ampTop) py = ampTop;
                                    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Mark omega_0
                                var om0px = plotL + (omega0 / omegaMax) * (plotR - plotL);
                                ctx.setLineDash([4, 3]);
                                ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 0.8;
                                ctx.beginPath(); ctx.moveTo(om0px, ampTop); ctx.lineTo(om0px, ampTop + ampH); ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('\u03C9\u2080', om0px, ampTop + ampH + 12, viz.colors.orange, 11);

                                // Phase plot (bottom half)
                                var phTop = h * 0.55;
                                var phH = h * 0.35;

                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(plotL, phTop); ctx.lineTo(plotL, phTop + phH); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(plotL, phTop + phH); ctx.lineTo(plotR, phTop + phH); ctx.stroke();
                                viz.screenText('\u03B4(\u03C9)', plotL - 5, phTop + 10, viz.colors.text, 11, 'right', 'top');
                                viz.screenText('\u03C9', plotR - 5, phTop + phH + 12, viz.colors.text, 11, 'center', 'top');

                                // Phase labels
                                viz.screenText('\u03C0', plotL - 12, phTop, viz.colors.text, 10, 'right', 'middle');
                                viz.screenText('\u03C0/2', plotL - 12, phTop + phH / 2, viz.colors.text, 10, 'right', 'middle');
                                viz.screenText('0', plotL - 12, phTop + phH, viz.colors.text, 10, 'right', 'middle');

                                // pi/2 line
                                ctx.setLineDash([3, 3]);
                                ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(plotL, phTop + phH / 2); ctx.lineTo(plotR, phTop + phH / 2); ctx.stroke();
                                ctx.setLineDash([]);

                                // Draw phase curve
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var i = 0; i <= steps; i++) {
                                    var om = 0.01 + (omegaMax - 0.01) * i / steps;
                                    var delta = Math.atan2(2 * gamma * om, omega0 * omega0 - om * om);
                                    if (delta < 0) delta += Math.PI;
                                    var px = plotL + (om / omegaMax) * (plotR - plotL);
                                    var py = phTop + phH - (delta / Math.PI) * phH;
                                    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // omega_0 line on phase
                                ctx.setLineDash([4, 3]);
                                ctx.strokeStyle = viz.colors.text; ctx.lineWidth = 0.8;
                                ctx.beginPath(); ctx.moveTo(om0px, phTop); ctx.lineTo(om0px, phTop + phH); ctx.stroke();
                                ctx.setLineDash([]);

                                // Q label
                                viz.screenText('Q = ' + Q.toFixed(1), w - 80, 20, viz.colors.teal, 13, 'center', 'top');
                                viz.screenText('\u0394\u03C9 \u2248 \u03C9\u2080/Q = ' + (omega0 / Q).toFixed(3), w - 100, 38, viz.colors.text, 11, 'center', 'top');
                            }

                            viz.animate(function () { draw(); });
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Derive the amplitude resonance frequency \\(\\omega_{\\text{res}} = \\omega_0\\sqrt{1 - 2\\zeta^2}\\) by minimizing the denominator of \\(A(\\omega)\\).',
                        hint: 'Minimize \\(D(\\omega^2) = (\\omega_0^2 - \\omega^2)^2 + 4\\gamma^2\\omega^2\\) with respect to \\(u = \\omega^2\\). Set \\(dD/du = 0\\).',
                        solution: 'Let \\(u = \\omega^2\\). Then \\(D = (\\omega_0^2 - u)^2 + 4\\gamma^2 u\\). Differentiating: \\(dD/du = -2(\\omega_0^2 - u) + 4\\gamma^2 = 0\\), giving \\(u = \\omega_0^2 - 2\\gamma^2\\). So \\(\\omega_{\\text{res}}^2 = \\omega_0^2 - 2\\gamma^2 = \\omega_0^2(1 - 2\\zeta^2)\\), hence \\(\\omega_{\\text{res}} = \\omega_0\\sqrt{1 - 2\\zeta^2}\\). This is real only when \\(\\zeta < 1/\\sqrt{2}\\).'
                    },
                    {
                        question: 'Show that the FWHM of the power curve \\(\\langle P(\\omega)\\rangle\\) is \\(\\Delta\\omega = 2\\gamma\\) to leading order in small \\(\\gamma\\).',
                        hint: 'Near \\(\\omega_0\\), write \\(\\omega = \\omega_0 + \\epsilon\\) and expand the denominator to leading order in \\(\\epsilon\\) and \\(\\gamma\\).',
                        solution: 'The power denominator is \\((\\omega_0^2 - \\omega^2)^2 + 4\\gamma^2\\omega^2\\). Near \\(\\omega = \\omega_0\\), write \\(\\omega = \\omega_0 + \\epsilon\\), so \\(\\omega^2 \\approx \\omega_0^2 + 2\\omega_0\\epsilon\\). The denominator becomes \\(4\\omega_0^2\\epsilon^2 + 4\\gamma^2\\omega_0^2 = 4\\omega_0^2(\\epsilon^2 + \\gamma^2)\\). This is a Lorentzian in \\(\\epsilon\\) with half-width \\(\\gamma\\). The FWHM is \\(2\\gamma\\), so \\(\\Delta\\omega = 2\\gamma = \\omega_0/Q\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Phase Lag Visualization & Transient Behavior
            // ============================================================
            {
                id: 'phase-and-transient',
                title: 'Phase Lag & Transient Behavior',
                content: `
<h2>Understanding the Phase Response</h2>

<p>The phase lag \\(\\delta(\\omega)\\) tells us how the response trails behind the driving force. Three limiting cases illuminate the physics:</p>

<div class="env-block theorem">
<div class="env-title">Three Limits of Phase Response</div>
<div class="env-body">
<p><strong>Low frequency</strong> (\\(\\omega \\ll \\omega_0\\)): \\(\\delta \\to 0\\). The displacement follows the force quasi-statically. The spring dominates; inertia and damping are negligible.</p>
<p><strong>At resonance</strong> (\\(\\omega = \\omega_0\\)): \\(\\delta = \\pi/2\\). The displacement lags the force by a quarter cycle. The velocity is in phase with the force, so power transfer is maximal.</p>
<p><strong>High frequency</strong> (\\(\\omega \\gg \\omega_0\\)): \\(\\delta \\to \\pi\\). The displacement is \\(180^\\circ\\) out of phase with the force. The mass cannot keep up; it moves opposite to the force at each instant.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Phase lag as the handoff between spring and inertia</div>
<div class="env-body">
<p>At low frequency, the spring force balances the driving force: \\(kx \\approx F_0\\cos(\\omega t)\\), so \\(x \\propto \\cos(\\omega t)\\) with no lag. At high frequency, the inertial term dominates: \\(m\\ddot{x} \\approx F_0\\cos(\\omega t)\\), so \\(\\ddot{x} \\propto \\cos(\\omega t)\\) and thus \\(x \\propto -\\cos(\\omega t)\\) (the double integral introduces a sign flip). The transition between these regimes is where damping matters most, at resonance.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-phase-lag"></div>

<h3>Transient Behavior</h3>

<p>When the driving force is first turned on, the full solution includes a transient. If the system starts from rest (\\(x(0) = 0\\), \\(\\dot{x}(0) = 0\\)), the initial conditions determine \\(C\\) and \\(\\phi_0\\) in:</p>

\\[x(t) = C e^{-\\gamma t}\\cos(\\omega_1 t + \\phi_0) + A(\\omega)\\cos(\\omega t - \\delta)\\]

<p>The transient decays on a timescale \\(\\sim 1/\\gamma\\). For high-Q systems, this can take many oscillation cycles. During the transient, the amplitude may overshoot or beat. After time \\(\\sim Q/\\omega_0\\), the system settles into steady state.</p>

<div class="env-block example">
<div class="env-title">Example: Turn-on transient at resonance</div>
<div class="env-body">
<p>At \\(\\omega = \\omega_0\\) with high Q, the steady-state amplitude is \\(A_{\\text{max}} = Q \\cdot F_0/(m\\omega_0^2)\\). Starting from rest, the transient must cancel the steady state at \\(t=0\\). The resulting envelope grows from 0 to \\(A_{\\text{max}}\\) with a characteristic time \\(1/\\gamma = 2Q/\\omega_0\\). The system takes roughly \\(Q/\\pi\\) cycles to reach full amplitude. A high-Q resonator stores energy slowly.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-phase-lag',
                        title: 'Phase Lag: Driving Force vs. Response',
                        description: 'The driving force (orange) and the steady-state displacement (blue) are shown as functions of time. Adjust \\(\\omega/\\omega_0\\) to see the phase lag change. At resonance, the displacement lags by exactly \\(\\pi/2\\).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 60, originY: 180 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var ratio = 1.0;
                            var Q = 10;

                            VizEngine.createSlider(controls, '\u03C9/\u03C9\u2080', 0.1, 3.0, ratio, 0.01, function (v) { ratio = v; });
                            VizEngine.createSlider(controls, 'Q', 1, 40, Q, 0.5, function (v) { Q = v; });

                            var time = 0;

                            function draw(ts) {
                                time = (ts || 0) / 1000.0;
                                viz.clear();

                                var omega0 = 2 * Math.PI;
                                var omega = ratio * omega0;
                                var gamma = omega0 / (2 * Q);
                                var f0m = 1.0;

                                var denom = Math.sqrt(Math.pow(omega0 * omega0 - omega * omega, 2) + 4 * gamma * gamma * omega * omega);
                                var A = f0m / denom;
                                var delta = Math.atan2(2 * gamma * omega, omega0 * omega0 - omega * omega);
                                if (delta < 0) delta += Math.PI;

                                // Normalize amplitudes for display
                                var fAmp = 50;
                                var xAmp = Math.min(A / (f0m / (omega0 * omega0)) * 50, 140);

                                var plotL = 70, plotR = w - 20;
                                var centerY = h * 0.45;
                                var tRange = 3.0;

                                // Axes
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(plotL, 20); ctx.lineTo(plotL, h - 20); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(plotL, centerY); ctx.lineTo(plotR, centerY); ctx.stroke();
                                viz.screenText('t', plotR - 5, centerY + 12, viz.colors.text, 11);

                                // Draw force F(t) = cos(omega * t)
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                                ctx.beginPath();
                                var steps = 400;
                                for (var i = 0; i <= steps; i++) {
                                    var t = i / steps * tRange;
                                    var F = Math.cos(omega * t) * fAmp;
                                    var px = plotL + (t / tRange) * (plotR - plotL);
                                    var py = centerY - F;
                                    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Draw response x(t) = A cos(omega t - delta)
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var i = 0; i <= steps; i++) {
                                    var t = i / steps * tRange;
                                    var x = Math.cos(omega * t - delta) * xAmp;
                                    var px = plotL + (t / tRange) * (plotR - plotL);
                                    var py = centerY - x;
                                    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Legend
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(w - 180, 25); ctx.lineTo(w - 155, 25); ctx.stroke();
                                viz.screenText('F(t)', w - 140, 25, viz.colors.orange, 11, 'left', 'middle');

                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2.5;
                                ctx.beginPath(); ctx.moveTo(w - 180, 42); ctx.lineTo(w - 155, 42); ctx.stroke();
                                viz.screenText('x(t)', w - 140, 42, viz.colors.blue, 11, 'left', 'middle');

                                // Phase info
                                viz.screenText('\u03B4 = ' + (delta * 180 / Math.PI).toFixed(1) + '\u00B0', w / 2, h - 30, viz.colors.teal, 13);
                                viz.screenText('\u03C9/\u03C9\u2080 = ' + ratio.toFixed(2), w / 2, h - 48, viz.colors.text, 11);
                                viz.screenText('A/A\u2080 = ' + (A * omega0 * omega0 / f0m).toFixed(2), w / 2, h - 12, viz.colors.text, 11);
                            }

                            viz.animate(draw);
                            return { stopAnimation: function () { viz.stopAnimation(); } };
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A driven oscillator with \\(Q = 100\\) is turned on from rest at resonance. Estimate (a) the time to reach 63% of steady-state amplitude and (b) the number of oscillation cycles this corresponds to.',
                        hint: 'The envelope approaches steady state as \\(1 - e^{-\\gamma t}\\). The time constant is \\(1/\\gamma = 2Q/\\omega_0\\). Each cycle takes \\(T \\approx 2\\pi/\\omega_0\\).',
                        solution: '(a) 63% is reached at \\(t = 1/\\gamma = 2Q/\\omega_0 = 200/\\omega_0\\). (b) Number of cycles: \\(t/T = (200/\\omega_0)/(2\\pi/\\omega_0) = 200/(2\\pi) \\approx 31.8\\) cycles. A high-Q oscillator takes many cycles to reach steady state.'
                    },
                    {
                        question: 'Explain physically why the phase lag is exactly \\(\\pi/2\\) at \\(\\omega = \\omega_0\\), regardless of the damping strength.',
                        hint: 'At \\(\\omega = \\omega_0\\), the spring force and inertial force exactly cancel. What remains?',
                        solution: 'At \\(\\omega = \\omega_0\\): the spring force \\(-kx = -m\\omega_0^2 x\\) and the inertial pseudo-force \\(-m\\ddot{x} = m\\omega^2 x = m\\omega_0^2 x\\) cancel exactly. The only remaining equation is \\(b\\dot{x} = F_0\\cos(\\omega_0 t)\\), which means the velocity (not displacement) is in phase with the driving force. Since velocity leads displacement by \\(\\pi/2\\), the displacement lags the force by \\(\\pi/2\\). This cancellation occurs at \\(\\omega = \\omega_0\\) regardless of \\(b\\).'
                    }
                ]
            }
        ]
    });
})();
