// === Chapter 13: Torque & Angular Momentum ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch13',
        number: 13,
        title: 'Torque & Angular Momentum',
        subtitle: 'The rotational analogs of force and momentum, and a conservation law with spectacular consequences',
        file: 'ch13-angular-momentum',

        sections: [
            // ============================================================
            // Section 0: Torque as r x F
            // ============================================================
            {
                id: 'torque',
                title: 'Torque as \\(\\mathbf{r} \\times \\mathbf{F}\\)',
                content: `
<h2>The Rotational Analog of Force</h2>

<p>Just as force produces linear acceleration (\\(\\mathbf{F} = m\\mathbf{a}\\)), torque produces angular acceleration. But torque is more subtle: it depends not only on the applied force but on <em>where</em> and <em>how</em> the force is applied relative to the pivot.</p>

<div class="env-block definition">
<div class="env-title">Definition: Torque</div>
<div class="env-body">
<p>The <strong>torque</strong> (or <strong>moment of force</strong>) about a point \\(O\\) due to a force \\(\\mathbf{F}\\) applied at position \\(\\mathbf{r}\\) (measured from \\(O\\)) is</p>
\\[\\boldsymbol{\\tau} = \\mathbf{r} \\times \\mathbf{F}\\]
<p>The magnitude is \\(|\\boldsymbol{\\tau}| = rF\\sin\\theta = F \\cdot r_\\perp\\), where \\(\\theta\\) is the angle between \\(\\mathbf{r}\\) and \\(\\mathbf{F}\\), and \\(r_\\perp = r\\sin\\theta\\) is the <strong>moment arm</strong> (perpendicular distance from \\(O\\) to the line of action of \\(\\mathbf{F}\\)). Units: N m.</p>
</div>
</div>

<p>The cross product ensures that \\(\\boldsymbol{\\tau}\\) is a vector perpendicular to the plane containing \\(\\mathbf{r}\\) and \\(\\mathbf{F}\\), with direction given by the right-hand rule. In 2D, torque is effectively a signed scalar: positive for counterclockwise, negative for clockwise.</p>

<div class="env-block intuition">
<div class="env-title">The wrench analogy</div>
<div class="env-body">
<p>A longer wrench produces more torque for the same force (larger \\(r_\\perp\\)). Pushing perpendicular to the wrench (\\(\\theta = 90^\\circ\\)) maximizes torque. Pushing along the wrench (\\(\\theta = 0\\)) produces zero torque. This is the content of \\(\\tau = rF\\sin\\theta\\).</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: Newton's Second Law for Rotation (Fixed Axis)</div>
<div class="env-body">
<p>For a rigid body rotating about a fixed axis with moment of inertia \\(I\\),</p>
\\[\\tau_{\\text{net}} = I\\alpha\\]
<p>where \\(\\alpha = \\ddot{\\theta}\\) is the angular acceleration and \\(\\tau_{\\text{net}}\\) is the net torque about the axis.</p>
</div>
</div>

<p><strong>Proof sketch.</strong> For a single particle at distance \\(r\\) from the axis, the tangential component of \\(\\mathbf{F} = m\\mathbf{a}\\) gives \\(F_\\perp = m r\\alpha\\). Multiplying by \\(r\\): \\(rF_\\perp = mr^2\\alpha\\). Summing over all particles: \\(\\sum \\tau_i = (\\sum m_i r_i^2)\\alpha = I\\alpha\\). Internal forces cancel in pairs (Newton's third law). \\(\\square\\)</p>

<div class="env-block warning">
<div class="env-title">Torque depends on the reference point</div>
<div class="env-body">
<p>Unlike force, torque is not an intrinsic property of a force. It depends on the choice of origin \\(O\\). Changing the reference point changes \\(\\mathbf{r}\\) and hence \\(\\boldsymbol{\\tau}\\). Always specify the reference point when computing torques.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Atwood Machine Revisited</div>
<div class="env-body">
<p>Two masses \\(m_1 > m_2\\) hang from a massive pulley (disc of mass \\(M\\), radius \\(R\\)). The net torque about the pulley center is \\(\\tau = (m_1 - m_2)gR\\). The total moment of inertia is \\(I_{\\text{pulley}} + m_1 R^2 + m_2 R^2 = \\frac{1}{2}MR^2 + (m_1 + m_2)R^2\\). Therefore:</p>
\\[\\alpha = \\frac{(m_1 - m_2)g}{(\\frac{1}{2}M + m_1 + m_2)R}\\]
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A uniform beam of mass \\(M\\) and length \\(L\\) is pivoted at one end and held horizontal by a vertical string attached at the other end. What is the tension in the string?',
                        hint: 'Take torques about the pivot. The weight \\(Mg\\) acts at the center of mass (distance \\(L/2\\) from the pivot). The string provides torque at distance \\(L\\).',
                        solution: 'Torque balance about pivot: \\(T \\cdot L = Mg \\cdot (L/2)\\), so \\(T = Mg/2\\). The pivot carries the other half of the weight.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Angular Momentum
            // ============================================================
            {
                id: 'angular-momentum',
                title: 'Angular Momentum',
                content: `
<h2>The Rotational Analog of Linear Momentum</h2>

<div class="env-block definition">
<div class="env-title">Definition: Angular Momentum</div>
<div class="env-body">
<p>The <strong>angular momentum</strong> of a particle about a point \\(O\\) is</p>
\\[\\mathbf{L} = \\mathbf{r} \\times \\mathbf{p} = \\mathbf{r} \\times (m\\mathbf{v})\\]
<p>For a rigid body rotating about a fixed axis, the total angular momentum about that axis is</p>
\\[L = I\\omega\\]
</div>
</div>

<p>The fundamental dynamical equation for angular momentum is the rotational analog of Newton's second law in its momentum form (\\(\\mathbf{F} = d\\mathbf{p}/dt\\)):</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Rotational Equation of Motion</div>
<div class="env-body">
\\[\\boldsymbol{\\tau}_{\\text{net}} = \\frac{d\\mathbf{L}}{dt}\\]
<p>The net external torque about a point equals the time rate of change of angular momentum about that same point.</p>
</div>
</div>

<p><strong>Proof.</strong> Differentiate \\(\\mathbf{L} = \\mathbf{r} \\times \\mathbf{p}\\):</p>
\\[\\frac{d\\mathbf{L}}{dt} = \\dot{\\mathbf{r}} \\times \\mathbf{p} + \\mathbf{r} \\times \\dot{\\mathbf{p}} = \\mathbf{v} \\times m\\mathbf{v} + \\mathbf{r} \\times \\mathbf{F} = \\mathbf{0} + \\boldsymbol{\\tau}\\]
<p>since \\(\\mathbf{v} \\times \\mathbf{v} = \\mathbf{0}\\). \\(\\square\\)</p>

<p>For a rigid body about a fixed axis, this reduces to \\(\\tau = d(I\\omega)/dt = I\\alpha\\) when \\(I\\) is constant.</p>

<div class="env-block definition">
<div class="env-title">Definition: Angular Impulse</div>
<div class="env-body">
<p>The <strong>angular impulse</strong> is</p>
\\[\\mathbf{J}_{\\text{ang}} = \\int_{t_1}^{t_2} \\boldsymbol{\\tau}\\,dt = \\Delta\\mathbf{L}\\]
<p>This is the rotational analog of the impulse-momentum theorem.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">When \\(\\mathbf{L} \\neq I\\omega\\hat{z}\\)</div>
<div class="env-body">
<p>The relation \\(L = I\\omega\\) is for fixed-axis rotation. For general 3D motion, \\(\\mathbf{L} = \\mathbf{I}\\boldsymbol{\\omega}\\) where \\(\\mathbf{I}\\) is the full inertia tensor. If \\(\\boldsymbol{\\omega}\\) is not along a principal axis, \\(\\mathbf{L}\\) and \\(\\boldsymbol{\\omega}\\) point in different directions. This mismatch is the origin of precession and nutation (Chapter 14).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Bullet Embeds in Rotating Rod</div>
<div class="env-body">
<p>A bullet of mass \\(m\\) and speed \\(v\\) strikes and embeds in the end of a stationary uniform rod of mass \\(M\\) and length \\(L\\), pivoted at the other end. Find the angular velocity immediately after impact.</p>
<p>Angular momentum about the pivot is conserved (the pivot exerts no torque about itself, and the collision is instantaneous):</p>
\\[L_i = mvL = L_f = \\left(\\frac{1}{3}ML^2 + mL^2\\right)\\omega \\quad \\Longrightarrow \\quad \\omega = \\frac{mv}{(\\frac{1}{3}M + m)L}\\]
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A particle of mass \\(m\\) moves in a straight line with constant velocity \\(v\\) past a fixed point \\(O\\), with closest approach distance \\(b\\). What is \\(|\\mathbf{L}|\\) about \\(O\\)? Is it constant?',
                        hint: 'Use \\(|\\mathbf{L}| = |\\mathbf{r} \\times m\\mathbf{v}| = mvr\\sin\\theta\\). The perpendicular distance from \\(O\\) to the line of motion is always \\(b\\), regardless of where the particle is on its trajectory.',
                        solution: '\\(|\\mathbf{L}| = mvb\\). This is constant because \\(r\\sin\\theta = b\\) is the same at every point along the straight-line path. Equivalently, \\(\\boldsymbol{\\tau} = \\mathbf{r} \\times \\mathbf{F} = \\mathbf{0}\\) since \\(\\mathbf{F} = \\mathbf{0}\\), so \\(d\\mathbf{L}/dt = \\mathbf{0}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Conservation of Angular Momentum
            // ============================================================
            {
                id: 'conservation',
                title: 'Conservation of Angular Momentum',
                content: `
<h2>When Torque Vanishes</h2>

<div class="env-block theorem">
<div class="env-title">Theorem: Conservation of Angular Momentum</div>
<div class="env-body">
<p>If the net external torque about a point (or axis) is zero, the total angular momentum about that point (or axis) is conserved:</p>
\\[\\boldsymbol{\\tau}_{\\text{ext}} = \\mathbf{0} \\quad \\Longrightarrow \\quad \\mathbf{L} = \\text{const.}\\]
</div>
</div>

<p>This is one of the great conservation laws of physics, on equal footing with conservation of energy and momentum. It has spectacular consequences.</p>

<div class="env-block example">
<div class="env-title">Example: The Spinning Figure Skater</div>
<div class="env-body">
<p>A figure skater spins with arms extended. Her moment of inertia is \\(I_1\\) and angular velocity is \\(\\omega_1\\). She pulls her arms in, reducing her moment of inertia to \\(I_2 < I_1\\). No external torque acts about the vertical axis (friction at the blade tip is negligible for this purpose). Therefore:</p>
\\[L = I_1\\omega_1 = I_2\\omega_2 \\quad \\Longrightarrow \\quad \\omega_2 = \\frac{I_1}{I_2}\\omega_1\\]
<p>Since \\(I_1 > I_2\\), we get \\(\\omega_2 > \\omega_1\\): she spins faster. A typical skater might reduce \\(I\\) by a factor of 3, tripling her spin rate.</p>
<p><strong>Energy check:</strong> The kinetic energy changes from \\(\\frac{1}{2}I_1\\omega_1^2\\) to \\(\\frac{1}{2}I_2\\omega_2^2 = \\frac{1}{2}\\frac{I_1^2}{I_2}\\omega_1^2 = \\frac{I_1}{I_2} \\cdot \\frac{1}{2}I_1\\omega_1^2 > \\frac{1}{2}I_1\\omega_1^2\\). Energy <em>increases</em>. The skater does work by pulling her arms inward against centripetal acceleration.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Where does the extra energy come from?</div>
<div class="env-body">
<p>The skater's muscles do work. Each piece of mass moving inward moves against the centripetal acceleration it already experiences, so the skater must exert force through a displacement. This is internal work that converts chemical energy (muscles) into rotational kinetic energy, while \\(L\\) stays constant.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Two Discs Coupling</div>
<div class="env-body">
<p>A rotating disc (\\(I_1, \\omega_1\\)) drops onto a stationary disc (\\(I_2\\), \\(\\omega_2 = 0\\)) and they couple by friction. Final angular velocity:</p>
\\[\\omega_f = \\frac{I_1\\omega_1}{I_1 + I_2}\\]
<p>Energy is lost to friction: \\(\\Delta K = -\\frac{1}{2}\\frac{I_1 I_2}{I_1 + I_2}\\omega_1^2 < 0\\). Angular momentum is conserved; energy is not (analogous to a perfectly inelastic collision).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-skater"></div>
`,
                visualizations: [
                    {
                        id: 'viz-skater',
                        title: 'Spinning Skater: Conservation of Angular Momentum',
                        description: 'Pull the arms in (use the slider) to decrease the moment of inertia. Watch the spin rate increase while angular momentum \\(L = I\\omega\\) stays constant. The energy bar shows that kinetic energy increases when arms are pulled in.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: undefined, originY: undefined });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w * 0.38;
                            viz.originY = h * 0.5;

                            var armExtension = 1.0; // 0 = arms in, 1 = arms out
                            var L0 = 10; // conserved angular momentum
                            var bodyRadius = 0.4;
                            var armMinR = 0.5;
                            var armMaxR = 2.5;
                            var armMassFrac = 0.35; // fraction of mass in arms
                            var totalMass = 2.0;
                            var angle = 0;

                            VizEngine.createSlider(controls, 'Arm extension', 0.0, 1.0, armExtension, 0.02, function (v) { armExtension = v; });
                            VizEngine.createButton(controls, 'Reset', function () { angle = 0; armExtension = 1.0; });

                            function getI(ext) {
                                var Ibody = 0.5 * totalMass * (1 - armMassFrac) * bodyRadius * bodyRadius;
                                var armR = armMinR + ext * (armMaxR - armMinR);
                                var Iarms = totalMass * armMassFrac * armR * armR;
                                return Ibody + Iarms;
                            }

                            var prevTime = 0;

                            function draw(t) {
                                var dt = prevTime > 0 ? (t - prevTime) / 1000 : 0;
                                if (dt > 0.05) dt = 0.05;
                                prevTime = t;

                                var I = getI(armExtension);
                                var omega = L0 / I;
                                angle += omega * dt;

                                viz.clear();

                                var cx = 0, cy = 0;
                                var armR = armMinR + armExtension * (armMaxR - armMinR);

                                // Draw skater body (circle)
                                ctx.save();
                                var sc = viz.toScreen(cx, cy);

                                // Rotating reference
                                var ca = Math.cos(angle), sa = Math.sin(angle);

                                // Body
                                viz.drawBall(cx, cy, bodyRadius, viz.colors.teal, 1.5);

                                // Arms (two mass points)
                                var ax1 = armR * ca, ay1 = armR * sa;
                                var ax2 = -armR * ca, ay2 = -armR * sa;
                                viz.drawSegment(cx, cy, ax1, ay1, viz.colors.orange, 3);
                                viz.drawSegment(cx, cy, ax2, ay2, viz.colors.orange, 3);
                                viz.drawBall(ax1, ay1, 0.2, viz.colors.orange, 1.2);
                                viz.drawBall(ax2, ay2, 0.2, viz.colors.orange, 1.2);

                                // Rotation indicator
                                var angArc = 0.5;
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.arc(sc[0], sc[1], bodyRadius * viz.scale * 2.5, -angle, -angle + angArc);
                                ctx.stroke();
                                // Arrowhead at arc end
                                var ax = sc[0] + bodyRadius * viz.scale * 2.5 * Math.cos(-angle + angArc);
                                var ay3 = sc[1] + bodyRadius * viz.scale * 2.5 * Math.sin(-angle + angArc);
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath();
                                ctx.arc(ax, ay3, 4, 0, Math.PI * 2);
                                ctx.fill();

                                ctx.restore();

                                // Info panel
                                var px = w * 0.62;
                                var py = 30;
                                var Imax = getI(1.0);
                                var omegaMax = L0 / getI(0.0);
                                var KE = 0.5 * I * omega * omega;
                                var KEmax = 0.5 * getI(0.0) * omegaMax * omegaMax;

                                viz.screenText('Angular Momentum (conserved)', px, py, viz.colors.text, 11, 'left');
                                viz.screenText('L = ' + L0.toFixed(1) + ' kg\u00B7m\u00B2/s', px, py + 20, viz.colors.green, 14, 'left');

                                viz.screenText('Moment of Inertia', px, py + 50, viz.colors.text, 11, 'left');
                                viz.screenText('I = ' + I.toFixed(3) + ' kg\u00B7m\u00B2', px, py + 70, viz.colors.blue, 14, 'left');

                                viz.screenText('Angular Velocity', px, py + 100, viz.colors.text, 11, 'left');
                                viz.screenText('\u03C9 = ' + omega.toFixed(2) + ' rad/s', px, py + 120, viz.colors.orange, 14, 'left');

                                viz.screenText('Kinetic Energy', px, py + 150, viz.colors.text, 11, 'left');
                                viz.screenText('K = \u00BD I\u03C9\u00B2 = ' + KE.toFixed(2) + ' J', px, py + 170, viz.colors.red, 14, 'left');

                                // Energy bar
                                var barTop = py + 200;
                                var barH = h - barTop - 40;
                                var barW = 30;

                                // KE bar
                                var keH = (KE / KEmax) * barH;
                                ctx.fillStyle = viz.colors.red + '88';
                                ctx.fillRect(px, barTop + barH - keH, barW, keH);
                                ctx.strokeStyle = viz.colors.red;
                                ctx.strokeRect(px, barTop + barH - keH, barW, keH);
                                viz.screenText('KE', px + barW / 2, barTop + barH + 14, viz.colors.red, 10, 'center');

                                // L bar (should be constant height)
                                var lH = barH * 0.7;
                                ctx.fillStyle = viz.colors.green + '88';
                                ctx.fillRect(px + barW + 10, barTop + barH - lH, barW, lH);
                                ctx.strokeStyle = viz.colors.green;
                                ctx.strokeRect(px + barW + 10, barTop + barH - lH, barW, lH);
                                viz.screenText('L', px + barW + 10 + barW / 2, barTop + barH + 14, viz.colors.green, 10, 'center');

                                // I bar
                                var iH = (I / Imax) * barH;
                                ctx.fillStyle = viz.colors.blue + '88';
                                ctx.fillRect(px + 2 * (barW + 10), barTop + barH - iH, barW, iH);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.strokeRect(px + 2 * (barW + 10), barTop + barH - iH, barW, iH);
                                viz.screenText('I', px + 2 * (barW + 10) + barW / 2, barTop + barH + 14, viz.colors.blue, 10, 'center');

                                viz.screenText('Pull arms in \u2192 I down, \u03C9 up, K up', w / 2, h - 12, viz.colors.text, 11, 'center');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A merry-go-round (disc, \\(I_0 = 500\\) kg m\\(^2\\)) rotates at \\(2\\) rad/s. A child (\\(m = 30\\) kg) standing at the rim (\\(R = 2\\) m) walks to the center. What is the new angular velocity? How much kinetic energy was gained, and where did it come from?',
                        hint: 'Initial \\(I = I_0 + mR^2\\). Final \\(I = I_0\\). Use \\(L = I\\omega = \\text{const}\\).',
                        solution: '\\(I_i = 500 + 30(4) = 620\\) kg m\\(^2\\). \\(L = 620 \\times 2 = 1240\\) kg m\\(^2\\)/s. Final: \\(\\omega_f = 1240/500 = 2.48\\) rad/s. \\(K_i = \\frac{1}{2}(620)(4) = 1240\\) J. \\(K_f = \\frac{1}{2}(500)(2.48^2) = 1537\\) J. \\(\\Delta K = 297\\) J, supplied by the child doing work (walking inward against centripetal acceleration).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Gyroscopic Motion Preview
            // ============================================================
            {
                id: 'gyroscope',
                title: 'Gyroscopes & Precession',
                content: `
<h2>Why a Spinning Top Does Not Fall</h2>

<p>A spinning gyroscope with one end supported on a pivot does something deeply counterintuitive: instead of falling, it sweeps horizontally around the pivot. This is <strong>precession</strong>, and it is a direct consequence of the vector equation \\(\\boldsymbol{\\tau} = d\\mathbf{L}/dt\\).</p>

<div class="env-block intuition">
<div class="env-title">The key insight: torque changes the direction of \\(\\mathbf{L}\\), not its magnitude</div>
<div class="env-body">
<p>Gravity exerts a torque \\(\\boldsymbol{\\tau} = \\mathbf{r}_{\\text{cm}} \\times M\\mathbf{g}\\) about the pivot. This torque is horizontal, perpendicular to both \\(\\mathbf{r}_{\\text{cm}}\\) and \\(\\mathbf{g}\\). Since \\(\\boldsymbol{\\tau} = d\\mathbf{L}/dt\\), the angular momentum vector \\(\\mathbf{L}\\) (which points along the spin axis) changes in the horizontal direction. The spin axis sweeps around horizontally rather than tipping down. The torque does not fight the spin; it redirects it.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: Steady Precession Rate</div>
<div class="env-body">
<p>A gyroscope spinning with angular momentum \\(L = I\\omega_s\\) (where \\(\\omega_s\\) is the spin rate), with its center of mass at distance \\(\\ell\\) from the pivot and mass \\(M\\), precesses at angular rate</p>
\\[\\Omega_p = \\frac{Mg\\ell}{I\\omega_s} = \\frac{Mg\\ell}{L}\\]
<p>This assumes steady (non-nutating) precession and that \\(\\omega_s \\gg \\Omega_p\\) (fast spin).</p>
</div>
</div>

<p><strong>Derivation.</strong> The magnitude of the gravitational torque about the pivot is \\(\\tau = Mg\\ell\\sin\\alpha\\), where \\(\\alpha\\) is the angle the spin axis makes with the vertical. But \\(\\mathbf{L}\\) has a horizontal component \\(L_\\perp = L\\sin\\alpha\\), and in steady precession this component sweeps around at rate \\(\\Omega_p\\). The rate of change of \\(\\mathbf{L}\\) is:</p>

\\[\\left|\\frac{d\\mathbf{L}}{dt}\\right| = L\\sin\\alpha \\cdot \\Omega_p = \\tau = Mg\\ell\\sin\\alpha\\]

<p>The \\(\\sin\\alpha\\) cancels, giving \\(\\Omega_p = Mg\\ell / L\\). Remarkably, the precession rate is independent of the tilt angle \\(\\alpha\\).</p>

<div class="env-block remark">
<div class="env-title">Faster spin \\(\\Rightarrow\\) slower precession</div>
<div class="env-body">
<p>This is counterintuitive. The faster the gyroscope spins, the <em>slower</em> it precesses, because \\(\\Omega_p \\propto 1/\\omega_s\\). A very fast spin means a very large \\(\\mathbf{L}\\), and it takes a long time for the fixed torque to rotate such a large vector through a given angle.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Steady precession is an idealization</div>
<div class="env-body">
<p>In practice, if the gyroscope is released from rest (not given an initial precession push), it also <strong>nutates</strong>: the spin axis bobs up and down while precessing. Nutation is treated in detail in Chapter 14. Steady precession is the time-averaged behavior after nutation is damped by friction.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-gyroscope"></div>
`,
                visualizations: [
                    {
                        id: 'viz-gyroscope',
                        title: 'Gyroscope Precession',
                        description: 'A spinning gyroscope precesses under gravity. The green arrow is \\(\\mathbf{L}\\), the red arrow is \\(\\boldsymbol{\\tau}\\) (horizontal, perpendicular to the spin axis). Notice that \\(\\boldsymbol{\\tau}\\) changes the <em>direction</em> of \\(\\mathbf{L}\\), causing precession rather than falling. Increase spin speed to slow the precession.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: undefined, originY: undefined });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w * 0.4;
                            viz.originY = h * 0.55;

                            var spinRate = 8; // omega_s
                            var tilt = 60; // degrees
                            var M = 1.0, ell = 1.5, g = 9.8;
                            var gyroI = 0.5; // moment of inertia about spin axis

                            VizEngine.createSlider(controls, 'Spin rate \u03C9_s', 2, 30, spinRate, 0.5, function (v) { spinRate = v; });
                            VizEngine.createSlider(controls, 'Tilt (deg)', 20, 80, tilt, 1, function (v) { tilt = v; });

                            var precAngle = 0;
                            var prevTime = 0;

                            function draw(t) {
                                var dt = prevTime > 0 ? (t - prevTime) / 1000 : 0;
                                if (dt > 0.05) dt = 0.05;
                                prevTime = t;

                                var L = gyroI * spinRate;
                                var omegaP = M * g * ell / L;
                                precAngle += omegaP * dt;

                                viz.clear();

                                var tiltRad = tilt * Math.PI / 180;

                                // Project 3D gyroscope axis onto 2D
                                // The spin axis is tilted at angle tilt from vertical, precessing around vertical axis
                                var axisLen = 3.0;
                                // 3D axis endpoint: (sin(tilt)*cos(precAngle), cos(tilt), sin(tilt)*sin(precAngle))
                                // Project to 2D with simple oblique projection
                                var projScale = 0.5; // depth foreshortening
                                var axX3 = axisLen * Math.sin(tiltRad) * Math.cos(precAngle);
                                var axY3 = axisLen * Math.cos(tiltRad);
                                var axZ3 = axisLen * Math.sin(tiltRad) * Math.sin(precAngle);

                                // 2D projection: x = X + Z*projScale*cos(45deg), y = Y + Z*projScale*sin(45deg)
                                var projAngle = -0.5;
                                var tipX = axX3 + axZ3 * projScale * Math.cos(projAngle);
                                var tipY = axY3 + axZ3 * projScale * Math.sin(projAngle);

                                // Pivot point
                                viz.drawPoint(0, 0, viz.colors.yellow, 'Pivot', 6);

                                // Support structure
                                viz.drawSegment(0, -1.5, 0, 0, viz.colors.text, 2);
                                viz.drawGround(-1.5, viz.colors.text);

                                // Gyroscope axis
                                ctx.save();
                                ctx.shadowColor = viz.colors.teal;
                                ctx.shadowBlur = 4;
                                viz.drawSegment(0, 0, tipX, tipY, viz.colors.white, 3);
                                ctx.restore();

                                // Disc at end (ellipse to suggest 3D)
                                var discR = 0.8;
                                var sc = viz.toScreen(tipX, tipY);
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                // Disc orientation depends on axis direction
                                var discTilt = Math.abs(Math.cos(precAngle)) * 0.3 + 0.1;
                                ctx.ellipse(sc[0], sc[1], discR * viz.scale, discR * viz.scale * discTilt, 0, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.teal + '22';
                                ctx.fill();

                                // Angular momentum vector L (along axis, green)
                                var lScale = L / 8;
                                viz.drawVector(0, 0, tipX * lScale, tipY * lScale, viz.colors.green, 'L');

                                // Torque vector (perpendicular to axis, horizontal plane)
                                // tau = r_cm x Mg = horizontal, perp to spin axis projection
                                var tauMag = M * g * ell;
                                var tauScale = tauMag / 15;
                                // Torque direction: perpendicular to the horizontal projection of the axis
                                var horizX = Math.sin(tiltRad) * Math.cos(precAngle);
                                var horizZ = Math.sin(tiltRad) * Math.sin(precAngle);
                                // Perp in horizontal plane: (-horizZ, 0, horizX)
                                var tauX3 = -horizZ;
                                var tauZ3 = horizX;
                                var tauProjX = (tauX3 + tauZ3 * projScale * Math.cos(projAngle)) * tauScale;
                                var tauProjY = (tauZ3 * projScale * Math.sin(projAngle)) * tauScale;
                                viz.drawVector(tipX * 0.5, tipY * 0.5, tauProjX, tauProjY, viz.colors.red, '\u03C4');

                                // Gravity vector at CM
                                var cmX = tipX * 0.5;
                                var cmY = tipY * 0.5;
                                viz.drawVector(cmX, cmY, 0, -0.8, viz.colors.purple, 'Mg');

                                // Trace of precession (circle on the "ground plane" projection)
                                ctx.strokeStyle = viz.colors.yellow + '44';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                var traceR = axisLen * Math.sin(tiltRad);
                                var traceSteps = 60;
                                for (var i = 0; i <= traceSteps; i++) {
                                    var a = (i / traceSteps) * Math.PI * 2;
                                    var tx = traceR * Math.cos(a);
                                    var tz = traceR * Math.sin(a);
                                    var tpx = tx + tz * projScale * Math.cos(projAngle);
                                    var tpy = axisLen * Math.cos(tiltRad) + tz * projScale * Math.sin(projAngle);
                                    var sp = viz.toScreen(tpx, tpy);
                                    if (i === 0) ctx.moveTo(sp[0], sp[1]);
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.closePath();
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Info
                                var px = w * 0.68;
                                viz.screenText('Precession', px, 25, viz.colors.white, 15, 'left');
                                viz.screenText('\u03A9_p = Mg\u2113 / I\u03C9_s', px, 48, viz.colors.yellow, 12, 'left');
                                viz.screenText('= ' + omegaP.toFixed(3) + ' rad/s', px, 68, viz.colors.yellow, 13, 'left');
                                viz.screenText('L = I\u03C9_s = ' + L.toFixed(2), px, 96, viz.colors.green, 12, 'left');
                                viz.screenText('\u03C4 = Mg\u2113 = ' + tauMag.toFixed(2) + ' N\u00B7m', px, 116, viz.colors.red, 12, 'left');
                                viz.screenText('Faster spin \u2192 slower precession', px, h - 20, viz.colors.text, 11, 'left');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A bicycle wheel (\\(I = 0.3\\) kg m\\(^2\\), \\(R = 0.35\\) m, \\(M = 2\\) kg) spins at \\(\\omega_s = 20\\) rad/s. It is held horizontally by one end of its axle, which is \\(\\ell = 0.15\\) m from the center of the wheel to the hand. Find the precession rate.',
                        hint: 'Apply \\(\\Omega_p = Mg\\ell / (I\\omega_s)\\).',
                        solution: '\\(\\Omega_p = (2)(9.8)(0.15) / (0.3 \\times 20) = 2.94 / 6 = 0.49\\) rad/s \\(\\approx 4.7\\) rpm. A slow, stately precession.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Angular Momentum in Systems
            // ============================================================
            {
                id: 'systems',
                title: 'Angular Momentum for Systems',
                content: `
<h2>From Single Particles to Systems</h2>

<p>For a system of particles, the total angular momentum is</p>
\\[\\mathbf{L}_{\\text{tot}} = \\sum_i \\mathbf{r}_i \\times m_i \\mathbf{v}_i\\]

<p>and the equation of motion involves only external torques:</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Angular Momentum Equation for Systems</div>
<div class="env-body">
\\[\\frac{d\\mathbf{L}_{\\text{tot}}}{dt} = \\boldsymbol{\\tau}_{\\text{ext}}\\]
<p>Internal forces (which obey Newton's third law and act along the line connecting two particles) produce no net torque.</p>
</div>
</div>

<p><strong>Proof.</strong> The internal torque from particle \\(j\\) on particle \\(i\\) is \\(\\boldsymbol{\\tau}_{ij} = \\mathbf{r}_i \\times \\mathbf{f}_{ij}\\), and the torque from \\(i\\) on \\(j\\) is \\(\\boldsymbol{\\tau}_{ji} = \\mathbf{r}_j \\times \\mathbf{f}_{ji} = -\\mathbf{r}_j \\times \\mathbf{f}_{ij}\\). Their sum is</p>
\\[\\boldsymbol{\\tau}_{ij} + \\boldsymbol{\\tau}_{ji} = (\\mathbf{r}_i - \\mathbf{r}_j) \\times \\mathbf{f}_{ij}\\]
<p>If \\(\\mathbf{f}_{ij}\\) acts along \\(\\mathbf{r}_i - \\mathbf{r}_j\\) (the strong form of Newton's third law), this cross product vanishes. \\(\\square\\)</p>

<div class="env-block definition">
<div class="env-title">Definition: Spin and Orbital Angular Momentum</div>
<div class="env-body">
<p>The total angular momentum about a fixed point \\(O\\) can be decomposed as</p>
\\[\\mathbf{L}_{\\text{tot}} = \\underbrace{\\mathbf{R}_{\\text{cm}} \\times M\\mathbf{V}_{\\text{cm}}}_{\\mathbf{L}_{\\text{orbital}}} + \\underbrace{\\sum_i \\mathbf{r}'_i \\times m_i \\mathbf{v}'_i}_{\\mathbf{L}_{\\text{spin}}}\\]
<p>where \\(\\mathbf{r}'_i\\) and \\(\\mathbf{v}'_i\\) are measured from the center of mass. The first term is the angular momentum of the CM treated as a point mass ("orbital"); the second is the angular momentum <em>about</em> the CM ("spin").</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: The Earth</div>
<div class="env-body">
<p>The Earth has orbital angular momentum (about the Sun) from its yearly revolution, and spin angular momentum from its daily rotation. These are essentially independent. The orbital \\(L\\) is about \\(2.7 \\times 10^{40}\\) kg m\\(^2\\)/s; the spin \\(L\\) is about \\(7.1 \\times 10^{33}\\) kg m\\(^2\\)/s. The orbital angular momentum dominates by a factor of about \\(4 \\times 10^6\\).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">A subtle point about reference points</div>
<div class="env-body">
<p>The equation \\(\\boldsymbol{\\tau} = d\\mathbf{L}/dt\\) holds straightforwardly when the reference point is (1) fixed in an inertial frame, or (2) the center of mass of the system (even if the CM is accelerating). For an arbitrary accelerating reference point, extra terms appear. In this course, we always use either a fixed pivot or the CM.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: A Falling Stick</div>
<div class="env-body">
<p>A uniform stick of length \\(L\\) and mass \\(M\\) stands vertically on a frictionless surface and is given a tiny push. As it falls, no horizontal external force acts (frictionless), so the CM falls straight down. But angular momentum about the CM is not conserved (gravity exerts a torque about the CM once the stick tilts). The analysis requires solving \\(\\tau_{\\text{cm}} = I_{\\text{cm}}\\alpha\\) with the constraint of the CM falling vertically.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Two particles, each of mass \\(m\\), move in opposite directions with speed \\(v\\) along parallel lines separated by distance \\(d\\). What is the total angular momentum about (a) the midpoint between the two lines, and (b) a point on one of the lines? Is angular momentum zero in either case?',
                        hint: 'For each particle, \\(|\\mathbf{L}| = mvr_\\perp\\), where \\(r_\\perp\\) is the perpendicular distance from the reference point to the line of motion. Check the directions using the right-hand rule.',
                        solution: '(a) About the midpoint: each particle contributes \\(L_i = mv(d/2)\\), both in the same direction (same sense of rotation). Total \\(L = mvd\\). (b) About a point on one line: that particle contributes zero (\\(r_\\perp = 0\\)); the other contributes \\(L = mvd\\). Same total in both cases. This makes sense: \\(L\\) about different points differs by \\(\\mathbf{R} \\times \\mathbf{P}_{\\text{tot}}\\), and here \\(\\mathbf{P}_{\\text{tot}} = \\mathbf{0}\\) (momenta cancel), so \\(L\\) is the same about all points.'
                    }
                ]
            }
        ]
    });
})();
