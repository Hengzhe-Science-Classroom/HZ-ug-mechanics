// === Chapter 10: Collisions ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch10',
        number: 10,
        title: 'Collisions',
        subtitle: 'Elastic and inelastic scattering in the lab and CM frames',
        file: 'ch10-collisions',

        sections: [
            // ============================================================
            // Section 0: Classification of Collisions
            // ============================================================
            {
                id: 'classification',
                title: 'Classification of Collisions',
                content: `
<h2>Elastic, Inelastic, and Perfectly Inelastic</h2>

<p>A <strong>collision</strong> is any interaction where two (or more) bodies exert strong, short-range forces on each other over a brief time interval. During that interval, external forces (gravity, friction) are typically negligible compared to the collision forces, so momentum is conserved. The key question is: what happens to kinetic energy?</p>

<div class="env-block definition">
<div class="env-title">Classification of Collisions</div>
<div class="env-body">
<ul>
<li><strong>Elastic collision</strong>: kinetic energy is conserved. \\(T_i = T_f\\). Examples: billiard balls (approximately), atomic collisions, hard-sphere scattering.</li>
<li><strong>Inelastic collision</strong>: kinetic energy is <em>not</em> conserved. Some KE is converted to heat, deformation, sound, etc. \\(T_f < T_i\\).</li>
<li><strong>Perfectly inelastic collision</strong>: the objects stick together. Maximum possible KE loss (consistent with momentum conservation).</li>
<li><strong>Super-elastic (explosive) collision</strong>: \\(T_f > T_i\\). Internal energy is released (e.g., an explosion, a spring release).</li>
</ul>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: KE Loss in a Perfectly Inelastic Collision</div>
<div class="env-body">
<p>Two objects (\\(m_1, v_1\\)) and (\\(m_2, v_2\\)) stick together. The final velocity is \\(V = (m_1 v_1 + m_2 v_2)/(m_1 + m_2)\\), which is just the CM velocity. The KE loss is:</p>
\\[\\Delta T = \\frac{1}{2}\\frac{m_1 m_2}{m_1 + m_2}(v_1 - v_2)^2 = \\frac{1}{2}\\mu \\, v_{\\text{rel}}^2\\]
<p>where \\(\\mu = m_1 m_2/(m_1 + m_2)\\) is the <strong>reduced mass</strong> and \\(v_{\\text{rel}} = |v_1 - v_2|\\) is the relative speed. This equals the total internal KE (K&ouml;nig's theorem), confirming that a perfectly inelastic collision destroys all internal kinetic energy.</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Coefficient of Restitution</div>
<div class="env-body">
<p>The <strong>coefficient of restitution</strong> \\(e\\) characterizes the "bounciness" of a 1D collision:</p>
\\[e = \\frac{v_{2f} - v_{1f}}{v_{1i} - v_{2i}} = \\frac{\\text{relative speed after}}{\\text{relative speed before}}.\\]
<p>\\(e = 1\\): perfectly elastic. \\(e = 0\\): perfectly inelastic. \\(0 < e < 1\\): partially inelastic.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Bouncing Ball</div>
<div class="env-body">
<p>A ball dropped from height \\(h_0\\) bounces to height \\(h_1\\). The coefficient of restitution with the floor is:</p>
\\[e = \\sqrt{\\frac{h_1}{h_0}}.\\]
<p>If \\(h_1 = 0.64 h_0\\), then \\(e = 0.8\\). After \\(n\\) bounces, the height is \\(h_n = e^{2n} h_0\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A 5 kg ball moving at 4 m/s hits a stationary 3 kg ball. They stick together. Find (a) the final velocity, (b) the kinetic energy lost, and (c) the fraction of KE lost.',
                        hint: 'Use momentum conservation for (a). Compute KE before and after for (b).',
                        solution: '(a) \\(V = 5 \\times 4 / 8 = 2.5\\) m/s. (b) \\(T_i = \\frac{1}{2}(5)(16) = 40\\) J. \\(T_f = \\frac{1}{2}(8)(6.25) = 25\\) J. \\(\\Delta T = 15\\) J. Check: \\(\\frac{1}{2}\\mu v_{\\text{rel}}^2 = \\frac{1}{2} \\cdot \\frac{15}{8} \\cdot 16 = 15\\) J. \\(\\checkmark\\) (c) Fraction lost: \\(15/40 = 37.5\\%\\). This equals \\(m_2/(m_1 + m_2) = 3/8\\) when the target is at rest.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Elastic Collisions in 1D
            // ============================================================
            {
                id: 'elastic-1d',
                title: 'Elastic Collisions in 1D',
                content: `
<h2>Solving the 1D Elastic Collision</h2>

<p>For an elastic collision in one dimension, we have two conservation laws (momentum and KE) and two unknowns (the two final velocities). The system is exactly determined.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: 1D Elastic Collision Formulas</div>
<div class="env-body">
<p>Particle 1 (mass \\(m_1\\), velocity \\(v_1\\)) collides elastically with particle 2 (mass \\(m_2\\), velocity \\(v_2\\)). The final velocities are:</p>
\\[v_{1f} = \\frac{m_1 - m_2}{m_1 + m_2}\\,v_1 + \\frac{2m_2}{m_1 + m_2}\\,v_2\\]
\\[v_{2f} = \\frac{2m_1}{m_1 + m_2}\\,v_1 + \\frac{m_2 - m_1}{m_1 + m_2}\\,v_2.\\]
</div>
</div>

<div class="env-block remark">
<div class="env-title">Elegant Derivation via Relative Velocity</div>
<div class="env-body">
<p>Instead of solving a quadratic, use the trick: for elastic collisions in 1D, the relative velocity reverses sign:</p>
\\[v_{1f} - v_{2f} = -(v_{1i} - v_{2i}).\\]
<p>This, combined with momentum conservation (a linear equation), gives two linear equations in two unknowns, which is algebraically trivial. The reversal of relative velocity is equivalent to \\(e = 1\\).</p>
</div>
</div>

<h3>Special Cases (Target at Rest, \\(v_2 = 0\\))</h3>

<div class="env-block example">
<div class="env-title">Case 1: Equal Masses (\\(m_1 = m_2\\))</div>
<div class="env-body">
<p>\\(v_{1f} = 0, \\quad v_{2f} = v_1\\). Complete transfer of motion. This is the "Newton's cradle" effect: the first ball stops dead, the second moves off with the first ball's original velocity.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Case 2: Heavy Projectile (\\(m_1 \\gg m_2\\))</div>
<div class="env-body">
<p>\\(v_{1f} \\approx v_1\\) (barely affected), \\(v_{2f} \\approx 2v_1\\). The light target shoots off at twice the projectile speed. Think: bowling ball hitting a tennis ball.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Case 3: Light Projectile (\\(m_1 \\ll m_2\\))</div>
<div class="env-body">
<p>\\(v_{1f} \\approx -v_1\\) (bounces back at nearly the same speed), \\(v_{2f} \\approx 0\\). Think: tennis ball hitting a wall.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Gravitational Slingshot</div>
<div class="env-body">
<p>A spacecraft (mass \\(m\\)) approaches Jupiter (mass \\(M \\gg m\\)) at speed \\(v\\) while Jupiter moves at speed \\(V\\) in the opposite direction. In Jupiter's frame, the spacecraft approaches at \\(v + V\\) and bounces back at \\(v + V\\) (elastic, \\(M \\gg m\\)). Transforming back to the Sun's frame: \\(v_f = (v + V) + V = v + 2V\\). The spacecraft gains speed \\(2V\\), stolen from Jupiter's orbital energy. This is the principle behind gravity assists used by Voyager, Cassini, and New Horizons.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A ball of mass \\(m\\) sits on top of a ball of mass \\(M \\gg m\\), and both are dropped together from height \\(h\\). After the heavy ball bounces off the floor, what is the maximum height the small ball reaches? Assume all collisions are elastic and one-dimensional.',
                        hint: 'After the floor bounce, the heavy ball moves up at \\(v = \\sqrt{2gh}\\). The small ball is still coming down at \\(v\\). Use the \\(M \\gg m\\) limit for elastic collisions.',
                        solution: 'Just before floor bounce, both move down at \\(v = \\sqrt{2gh}\\). After the heavy ball bounces, it moves up at \\(v\\), while the small ball still moves down at \\(v\\). The relative approach speed is \\(2v\\). In the \\(M \\gg m\\) limit, the small ball bounces off with speed \\(\\approx 2v + v = 3v\\) upward. It rises to \\(h\' = (3v)^2/(2g) = 9v^2/(2g) = 9h\\). The small ball bounces nine times higher than the original drop height.'
                    }
                ]
            },

            // ============================================================
            // Section 2: The CM Frame Transform (SHOWPIECE)
            // ============================================================
            {
                id: 'cm-frame-transform',
                title: 'The CM Frame Transform',
                content: `
<h2>Same Collision, Two Frames</h2>

<p>The CM frame is the natural frame for analyzing collisions. In the CM frame, the total momentum is zero, so the two particles approach each other head-on and leave head-on (in 1D). The final speeds in the CM frame are the same as the initial speeds (for elastic collisions); only the directions reverse. All the complexity of the lab-frame formulas is just the Galilean boost between frames.</p>

<div class="env-block theorem">
<div class="env-title">Elastic Collision in the CM Frame</div>
<div class="env-body">
<p>In the CM frame, the momenta satisfy \\(m_1 v_1' + m_2 v_2' = 0\\) before and after. For an elastic collision, the speeds are unchanged; only the signs flip:</p>
\\[v_{1f}' = -v_{1i}', \\qquad v_{2f}' = -v_{2i}'.\\]
<p>To get lab-frame results, boost back: \\(v_{if} = v_{if}' + V_{\\text{cm}}\\).</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why the CM Frame Is Simpler</div>
<div class="env-body">
<p>In the lab frame, the incoming particle might scatter forward or backward depending on mass ratios, and the formulas are asymmetric. In the CM frame, the collision is always symmetric: particles approach, particles recede. For elastic collisions, the speeds just flip. This makes it trivial to solve the problem in the CM frame and then boost back to the lab frame. The visualization below demonstrates this directly.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-cm-showpiece"></div>

<h3>Energy Considerations in the CM Frame</h3>

<p>By K&ouml;nig's theorem, the total KE splits into CM kinetic energy \\(\\frac{1}{2}MV^2\\) and internal KE \\(T_{\\text{int}}\\). The CM kinetic energy is "locked up" by momentum conservation and can never be converted. Only the internal KE is available for conversion in an inelastic collision. This is why a head-on collision (\\(V_{\\text{cm}} = 0\\)) is the most destructive: all KE is internal.</p>

<div class="env-block example">
<div class="env-title">Example: Collider vs. Fixed Target</div>
<div class="env-body">
<p>In particle physics, a fixed-target experiment with beam energy \\(E\\) has CM energy \\(\\sqrt{s} \\sim \\sqrt{2mE}\\) (growing as \\(\\sqrt{E}\\)), because most of the energy goes into CM motion. A collider where two beams of energy \\(E/2\\) hit head-on has \\(\\sqrt{s} = E\\) (growing linearly). This is why the LHC uses colliding beams: it is vastly more energy-efficient for creating heavy particles.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-cm-showpiece',
                        title: 'SHOWPIECE: Same Collision in Lab and CM Frames',
                        description: 'The <strong>left panel</strong> shows the collision in the lab frame; the <strong>right panel</strong> shows the same collision in the CM frame. Adjust masses and initial velocity, then press <strong>Collide</strong>. Notice how the CM frame is always symmetric.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, {
                                scale: 1,
                                originX: 0,
                                originY: 0,
                                width: 900,
                                height: 400
                            });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            var midX = w / 2;

                            var m1 = 2, m2 = 3;
                            var v1i = 5; // lab frame, target at rest
                            var elastic = true;
                            var eCoeff = 1.0;

                            VizEngine.createSlider(controls, 'm\u2081', 0.5, 5, m1, 0.5, function (v) { m1 = v; reset(); });
                            VizEngine.createSlider(controls, 'm\u2082', 0.5, 5, m2, 0.5, function (v) { m2 = v; reset(); });
                            VizEngine.createSlider(controls, 'v\u2081 (lab)', 1, 10, v1i, 0.5, function (v) { v1i = v; reset(); });
                            VizEngine.createSlider(controls, 'e (restitution)', 0, 1, eCoeff, 0.1, function (v) { eCoeff = v; });

                            var collideBtn;
                            collideBtn = VizEngine.createButton(controls, 'Collide', function () { startCollision(); });
                            VizEngine.createButton(controls, 'Reset', function () { reset(); });

                            // State
                            var phase = 'setup'; // 'setup', 'approaching', 'receding'
                            var tAnim = 0;
                            var approachDuration = 1.5;
                            var recedeDuration = 2.0;

                            // Lab frame positions (normalized 0-1 along panel width)
                            var panelW = midX - 20;
                            var panelL_lab = 10, panelR_lab = midX - 10;
                            var panelL_cm = midX + 10, panelR_cm = w - 10;
                            var panelY = h / 2 + 20;

                            // Computed velocities
                            var Vcm, v1i_cm, v2i_cm, v1f_lab, v2f_lab, v1f_cm, v2f_cm;

                            function computeCollision() {
                                Vcm = m1 * v1i / (m1 + m2);
                                v1i_cm = v1i - Vcm;
                                v2i_cm = 0 - Vcm;
                                // Using coefficient of restitution
                                // v1f - v2f = -e * (v1i - 0) and m1*v1f + m2*v2f = m1*v1i
                                v1f_lab = (m1 * v1i + m2 * eCoeff * (0 - v1i) + m2 * 0) / (m1 + m2);
                                v1f_lab = ((m1 - eCoeff * m2) * v1i) / (m1 + m2);
                                v2f_lab = (m1 * (1 + eCoeff) * v1i) / (m1 + m2);
                                v1f_cm = v1f_lab - Vcm;
                                v2f_cm = v2f_lab - Vcm;
                            }

                            function reset() {
                                phase = 'setup';
                                tAnim = 0;
                                computeCollision();
                            }

                            function startCollision() {
                                computeCollision();
                                phase = 'approaching';
                                tAnim = 0;
                            }

                            computeCollision();

                            function drawBallAt(sx, sy, radius, color, mass, label) {
                                var r = 8 + mass * 5;
                                ctx.save();
                                ctx.shadowColor = color;
                                ctx.shadowBlur = 10;
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.arc(sx, sy, r, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.restore();
                                // Highlight
                                ctx.fillStyle = 'rgba(255,255,255,0.2)';
                                ctx.beginPath();
                                ctx.arc(sx - r * 0.25, sy - r * 0.25, r * 0.3, 0, Math.PI * 2);
                                ctx.fill();
                                if (label) {
                                    viz.screenText(label, sx, sy - r - 10, color, 10);
                                }
                            }

                            function drawVelocityArrow(sx, sy, vel, maxVel, panelWidth, color) {
                                if (Math.abs(vel) < 0.05) return;
                                var arrowLen = (vel / maxVel) * panelWidth * 0.3;
                                var ex = sx + arrowLen;
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(sx, sy + 22);
                                ctx.lineTo(ex, sy + 22);
                                ctx.stroke();
                                // arrowhead
                                var dir = vel > 0 ? 1 : -1;
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.moveTo(ex, sy + 22);
                                ctx.lineTo(ex - dir * 6, sy + 16);
                                ctx.lineTo(ex - dir * 6, sy + 28);
                                ctx.closePath();
                                ctx.fill();
                            }

                            var lastTime = null;
                            function draw(timestamp) {
                                if (!lastTime) lastTime = timestamp;
                                var dt = Math.min((timestamp - lastTime) / 1000, 0.05);
                                lastTime = timestamp;

                                if (phase === 'approaching' || phase === 'receding') {
                                    tAnim += dt;
                                }
                                if (phase === 'approaching' && tAnim >= approachDuration) {
                                    phase = 'receding';
                                    tAnim = 0;
                                }

                                computeCollision();

                                // Clear
                                ctx.fillStyle = viz.colors.bg;
                                ctx.fillRect(0, 0, w, h);

                                // Panel borders
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(panelL_lab, 30, panelR_lab - panelL_lab, h - 60);
                                ctx.strokeRect(panelL_cm, 30, panelR_cm - panelL_cm, h - 60);

                                // Divider
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(midX, 25);
                                ctx.lineTo(midX, h - 25);
                                ctx.stroke();

                                // Titles
                                viz.screenText('LAB FRAME', (panelL_lab + panelR_lab) / 2, 18, viz.colors.white, 14);
                                viz.screenText('CM FRAME', (panelL_cm + panelR_cm) / 2, 18, viz.colors.cyan, 14);

                                // Track lines
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(panelL_lab + 20, panelY);
                                ctx.lineTo(panelR_lab - 20, panelY);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(panelL_cm + 20, panelY);
                                ctx.lineTo(panelR_cm - 20, panelY);
                                ctx.stroke();

                                // Compute positions
                                var labCenterX = (panelL_lab + panelR_lab) / 2;
                                var cmCenterX = (panelL_cm + panelR_cm) / 2;
                                var spread = 100;

                                var lab_x1, lab_x2, cm_x1, cm_x2;
                                var showV1_lab, showV2_lab, showV1_cm, showV2_cm;

                                if (phase === 'setup') {
                                    lab_x1 = labCenterX - spread;
                                    lab_x2 = labCenterX + spread;
                                    cm_x1 = cmCenterX - spread;
                                    cm_x2 = cmCenterX + spread;
                                    showV1_lab = v1i;
                                    showV2_lab = 0;
                                    showV1_cm = v1i_cm;
                                    showV2_cm = v2i_cm;
                                } else if (phase === 'approaching') {
                                    var frac = tAnim / approachDuration;
                                    var ease = frac * frac * (3 - 2 * frac); // smoothstep
                                    lab_x1 = labCenterX - spread * (1 - ease);
                                    lab_x2 = labCenterX + spread * (1 - ease * 0.6);
                                    cm_x1 = cmCenterX - spread * (1 - ease);
                                    cm_x2 = cmCenterX + spread * (1 - ease);
                                    showV1_lab = v1i;
                                    showV2_lab = 0;
                                    showV1_cm = v1i_cm;
                                    showV2_cm = v2i_cm;
                                } else { // receding
                                    var frac2 = Math.min(tAnim / recedeDuration, 1);
                                    var ease2 = frac2 * frac2 * (3 - 2 * frac2);
                                    lab_x1 = labCenterX + (v1f_lab > 0 ? 1 : -1) * spread * ease2 * Math.abs(v1f_lab) / Math.max(v1i, 1);
                                    lab_x2 = labCenterX + spread * ease2 * v2f_lab / Math.max(v1i, 1);
                                    cm_x1 = cmCenterX + (v1f_cm > 0 ? 1 : -1) * spread * ease2;
                                    cm_x2 = cmCenterX + (v2f_cm > 0 ? 1 : -1) * spread * ease2;
                                    showV1_lab = v1f_lab;
                                    showV2_lab = v2f_lab;
                                    showV1_cm = v1f_cm;
                                    showV2_cm = v2f_cm;
                                }

                                // Draw CM marker in lab frame
                                var cmPos_lab;
                                if (phase === 'setup' || phase === 'approaching') {
                                    cmPos_lab = (m1 * lab_x1 + m2 * lab_x2) / (m1 + m2);
                                } else {
                                    cmPos_lab = labCenterX + spread * (tAnim / recedeDuration) * Vcm / Math.max(v1i, 1) * 0.8;
                                }

                                // CM vertical line in lab
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.moveTo(cmPos_lab, panelY - 50);
                                ctx.lineTo(cmPos_lab, panelY + 50);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('CM', cmPos_lab, panelY - 55, viz.colors.green, 9);

                                // CM dot at origin in CM frame
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.moveTo(cmCenterX, panelY - 50);
                                ctx.lineTo(cmCenterX, panelY + 50);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('CM (origin)', cmCenterX, panelY - 55, viz.colors.green, 9);

                                // Clamp positions to panels
                                lab_x1 = VizEngine.clamp(lab_x1, panelL_lab + 30, panelR_lab - 30);
                                lab_x2 = VizEngine.clamp(lab_x2, panelL_lab + 30, panelR_lab - 30);
                                cm_x1 = VizEngine.clamp(cm_x1, panelL_cm + 30, panelR_cm - 30);
                                cm_x2 = VizEngine.clamp(cm_x2, panelL_cm + 30, panelR_cm - 30);

                                // Draw balls
                                drawBallAt(lab_x1, panelY, m1, viz.colors.orange, m1, 'm\u2081=' + m1.toFixed(1));
                                drawBallAt(lab_x2, panelY, m2, viz.colors.blue, m2, 'm\u2082=' + m2.toFixed(1));
                                drawBallAt(cm_x1, panelY, m1, viz.colors.orange, m1, 'm\u2081');
                                drawBallAt(cm_x2, panelY, m2, viz.colors.blue, m2, 'm\u2082');

                                // Velocity arrows
                                var maxV = Math.max(Math.abs(v1i), Math.abs(v1i_cm), Math.abs(v2i_cm), 1);
                                drawVelocityArrow(lab_x1, panelY, showV1_lab, maxV, panelW, viz.colors.orange);
                                drawVelocityArrow(lab_x2, panelY, showV2_lab, maxV, panelW, viz.colors.blue);
                                drawVelocityArrow(cm_x1, panelY, showV1_cm, maxV, panelW, viz.colors.orange);
                                drawVelocityArrow(cm_x2, panelY, showV2_cm, maxV, panelW, viz.colors.blue);

                                // Info box
                                var infoY = h - 80;
                                ctx.fillStyle = 'rgba(12,12,32,0.8)';
                                ctx.fillRect(10, infoY, w - 20, 55);

                                var phaseLabel = phase === 'setup' ? 'BEFORE' : (phase === 'approaching' ? 'APPROACHING...' : 'AFTER');
                                viz.screenText(phaseLabel, w / 2, infoY + 10, viz.colors.white, 12);

                                // Lab info
                                viz.screenText('Lab: v\u2081=' + showV1_lab.toFixed(2) + '  v\u2082=' + showV2_lab.toFixed(2) +
                                    '  V_cm=' + Vcm.toFixed(2), midX / 2, infoY + 30, viz.colors.text, 10);
                                // CM info
                                viz.screenText('CM: v\u2081\'=' + showV1_cm.toFixed(2) + '  v\u2082\'=' + showV2_cm.toFixed(2) +
                                    '  (sum=0)', midX + midX / 2, infoY + 30, viz.colors.cyan, 10);

                                // KE info
                                var T_lab = 0.5 * m1 * v1i * v1i;
                                var Tcm_only = 0.5 * (m1 + m2) * Vcm * Vcm;
                                var Tint = T_lab - Tcm_only;
                                viz.screenText('T_total=' + T_lab.toFixed(1) + '  T_cm=' + Tcm_only.toFixed(1) +
                                    '  T_int=' + Tint.toFixed(1) + '  e=' + eCoeff.toFixed(1), w / 2, infoY + 46, viz.colors.green, 10);

                                // Collision flash
                                if (phase === 'receding' && tAnim < 0.2) {
                                    var flashAlpha = (0.2 - tAnim) / 0.2;
                                    ctx.fillStyle = 'rgba(255,255,255,' + (flashAlpha * 0.3) + ')';
                                    ctx.beginPath();
                                    ctx.arc(labCenterX, panelY, 30, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.beginPath();
                                    ctx.arc(cmCenterX, panelY, 30, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'In the CM frame, show that for an elastic collision, the speed of each particle is the same before and after the collision.',
                        hint: 'In the CM frame, \\(m_1 v_1\' + m_2 v_2\' = 0\\). Use this plus KE conservation.',
                        solution: 'In the CM frame, \\(v_2\' = -m_1 v_1\'/m_2\\). KE conservation: \\(\\frac{1}{2}m_1 v_{1i}\'^2 + \\frac{1}{2}m_2 v_{2i}\'^2 = \\frac{1}{2}m_1 v_{1f}\'^2 + \\frac{1}{2}m_2 v_{2f}\'^2\\). Substituting the zero-momentum constraint: \\(m_1(1 + m_1/m_2)v_{1i}\'^2 = m_1(1 + m_1/m_2)v_{1f}\'^2\\), so \\(|v_{1f}\'| = |v_{1i}\'|\\). Since the particles must separate after collision, the only option is \\(v_{1f}\' = -v_{1i}\'\\) and \\(v_{2f}\' = -v_{2i}\'\\). \\(\\square\\)'
                    }
                ]
            },

            // ============================================================
            // Section 3: 2D Collisions and Scattering
            // ============================================================
            {
                id: 'scattering-2d',
                title: '2D Collisions & Scattering',
                content: `
<h2>Elastic Scattering in Two Dimensions</h2>

<p>In two dimensions, momentum conservation gives two equations but we have four unknowns (two final velocity components each). Even adding energy conservation (one equation), we still have three equations for four unknowns. The system is <strong>underdetermined</strong> by one parameter, which is the <strong>scattering angle</strong> (or equivalently, the <strong>impact parameter</strong>).</p>

<div class="env-block definition">
<div class="env-title">Definition: Scattering Angle and Impact Parameter</div>
<div class="env-body">
<p>The <strong>scattering angle</strong> \\(\\theta\\) is the angle between the incoming and outgoing velocities of the projectile. The <strong>impact parameter</strong> \\(b\\) is the perpendicular distance between the projectile's initial trajectory and a parallel line through the target center.</p>
<p>For a given interaction potential, the impact parameter determines the scattering angle: \\(\\theta = \\theta(b)\\).</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: Lab vs. CM Scattering Angles</div>
<div class="env-body">
<p>Let \\(\\theta_{\\text{cm}}\\) be the scattering angle in the CM frame and \\(\\theta_{\\text{lab}}\\) in the lab frame. For elastic scattering of \\(m_1\\) off stationary \\(m_2\\):</p>
\\[\\tan\\theta_{\\text{lab}} = \\frac{\\sin\\theta_{\\text{cm}}}{\\cos\\theta_{\\text{cm}} + m_1/m_2}.\\]
<p>Key consequence: if \\(m_1 > m_2\\), there is a maximum lab scattering angle \\(\\theta_{\\text{lab,max}} = \\arcsin(m_2/m_1)\\). A heavy particle cannot be deflected past 90 degrees by a lighter target.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Equal-Mass 2D Elastic Collision</div>
<div class="env-body">
<p>When \\(m_1 = m_2\\) and the target is at rest, something remarkable happens: the two particles always emerge at <strong>90 degrees</strong> to each other (for non-head-on collisions). This is easily seen in the CM frame: the particles scatter at angles \\(\\pm(\\pi - \\theta_{\\text{cm}})/2\\) from the CM velocity. After boosting to the lab frame, the opening angle is always \\(\\pi/2\\).</p>
<p>This \\(90^\\circ\\) rule is readily observed in billiard ball collisions (approximate equal masses, approximately elastic).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-scattering"></div>

<div class="env-block remark">
<div class="env-title">Differential Cross Section (Preview)</div>
<div class="env-body">
<p>In a scattering experiment with a beam hitting many targets, the <strong>differential cross section</strong> \\(d\\sigma/d\\Omega\\) quantifies how many particles scatter into a given solid angle. For hard-sphere scattering, it is isotropic in the CM frame: \\(d\\sigma/d\\Omega = R^2/4\\) where \\(R\\) is the sum of radii. For Coulomb scattering, Rutherford derived:</p>
\\[\\frac{d\\sigma}{d\\Omega} = \\left(\\frac{a}{4}\\right)^2 \\csc^4\\frac{\\theta}{2}, \\qquad a = \\frac{Z_1 Z_2 e^2}{4\\mu v_0^2}.\\]
<p>This \\(\\csc^4(\\theta/2)\\) dependence, with its strong forward peak and divergence at \\(\\theta = 0\\), was the formula that explained Rutherford's alpha-particle scattering experiments and led to the discovery of the atomic nucleus.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-scattering',
                        title: 'Scattering with Adjustable Impact Parameter',
                        description: 'A projectile scatters off a target via a repulsive \\(1/r^2\\) force (Rutherford-like). Drag the <strong>yellow handle</strong> to change the impact parameter \\(b\\). Watch how the scattering angle changes. Small \\(b\\) gives large deflection (near head-on); large \\(b\\) gives small deflection (glancing).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, {
                                scale: 25,
                                originX: 350,
                                originY: 200
                            });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            // Impact parameter (draggable)
                            var bParam = 2.0;
                            var bHandle = viz.addDraggable('bhandle', -10, bParam, viz.colors.yellow, 8, function (wx, wy) {
                                bParam = wy;
                                bHandle.x = -10;
                                bHandle.y = bParam;
                                needRecompute = true;
                            });

                            var strength = 50; // force constant k in F = k/r^2
                            VizEngine.createSlider(controls, 'Force strength', 10, 150, strength, 5, function (v) {
                                strength = v;
                                needRecompute = true;
                            });

                            var showCMframe = false;
                            VizEngine.createButton(controls, 'Toggle CM frame overlay', function () {
                                showCMframe = !showCMframe;
                            });

                            var needRecompute = true;
                            var trajectory = [];
                            var scatterAngle = 0;

                            function computeTrajectory() {
                                trajectory = [];
                                var x0 = -12, y0 = bParam;
                                var vx0 = 6, vy0 = 0;
                                var state = [x0, y0, vx0, vy0];
                                var dt2 = 0.005;
                                var steps = 8000;

                                function derivs(s) {
                                    var rx = s[0], ry = s[1];
                                    var r2 = rx * rx + ry * ry;
                                    var r = Math.sqrt(r2);
                                    if (r < 0.3) r = 0.3;
                                    var r3 = r * r * r;
                                    var ax = strength * rx / r3;
                                    var ay = strength * ry / r3;
                                    return [s[2], s[3], ax, ay];
                                }

                                for (var i = 0; i < steps; i++) {
                                    state = VizEngine.rk4(state, i * dt2, dt2, derivs);
                                    if (i % 4 === 0) {
                                        trajectory.push([state[0], state[1]]);
                                    }
                                    // Stop if particle is far away and moving outward
                                    var r = Math.sqrt(state[0] * state[0] + state[1] * state[1]);
                                    if (r > 15 && state[0] > 0) break;
                                }

                                // Compute scattering angle
                                if (trajectory.length > 10) {
                                    var last = trajectory[trajectory.length - 1];
                                    var prev = trajectory[trajectory.length - 10];
                                    var dvx = last[0] - prev[0];
                                    var dvy = last[1] - prev[1];
                                    var outAngle = Math.atan2(dvy, dvx);
                                    scatterAngle = outAngle; // incoming angle is 0
                                }
                                needRecompute = false;
                            }

                            function draw() {
                                if (needRecompute) computeTrajectory();

                                viz.clear();
                                viz.drawGrid(2);

                                // Target at origin
                                viz.drawBall(0, 0, 0.4, viz.colors.red, 3);
                                viz.drawText('Target', 0, -1.2, viz.colors.red, 11);

                                // Impact parameter line
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 3]);
                                var bsy = viz.originY - bParam * viz.scale;
                                ctx.beginPath();
                                ctx.moveTo(0, bsy);
                                ctx.lineTo(viz.originX, bsy);
                                ctx.stroke();
                                // b label
                                ctx.setLineDash([]);
                                viz.screenText('b = ' + Math.abs(bParam).toFixed(2), 40, bsy - 8, viz.colors.yellow, 11, 'left');

                                // Vertical b bracket
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1;
                                var bx = viz.originX - 8 * viz.scale;
                                ctx.beginPath();
                                ctx.moveTo(bx, viz.originY);
                                ctx.lineTo(bx, bsy);
                                ctx.stroke();

                                // Draw incoming direction
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 4]);
                                ctx.beginPath();
                                ctx.moveTo(0, bsy);
                                ctx.lineTo(w, bsy);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Draw trajectory
                                if (trajectory.length > 1) {
                                    ctx.strokeStyle = viz.colors.cyan;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    var ts = viz.toScreen(trajectory[0][0], trajectory[0][1]);
                                    ctx.moveTo(ts[0], ts[1]);
                                    for (var ti = 1; ti < trajectory.length; ti++) {
                                        ts = viz.toScreen(trajectory[ti][0], trajectory[ti][1]);
                                        ctx.lineTo(ts[0], ts[1]);
                                    }
                                    ctx.stroke();

                                    // Scattering angle arc
                                    if (Math.abs(scatterAngle) > 0.02) {
                                        var arcR = 60;
                                        ctx.strokeStyle = viz.colors.green;
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath();
                                        var startAng = 0;
                                        var endAng = -scatterAngle;
                                        if (endAng < startAng) {
                                            ctx.arc(viz.originX, viz.originY, arcR, endAng, startAng);
                                        } else {
                                            ctx.arc(viz.originX, viz.originY, arcR, startAng, endAng);
                                        }
                                        ctx.stroke();

                                        var midAng = -scatterAngle / 2;
                                        var lx = viz.originX + (arcR + 15) * Math.cos(midAng);
                                        var ly = viz.originY + (arcR + 15) * Math.sin(midAng);
                                        var angleDeg = Math.abs(scatterAngle * 180 / Math.PI);
                                        viz.screenText('\u03B8 = ' + angleDeg.toFixed(1) + '\u00B0', lx, ly, viz.colors.green, 12);
                                    }

                                    // Outgoing asymptote
                                    if (trajectory.length > 5) {
                                        var endPt = trajectory[trajectory.length - 1];
                                        var es = viz.toScreen(endPt[0], endPt[1]);
                                        ctx.strokeStyle = viz.colors.text;
                                        ctx.lineWidth = 1;
                                        ctx.setLineDash([3, 4]);
                                        ctx.beginPath();
                                        ctx.moveTo(viz.originX, viz.originY);
                                        ctx.lineTo(es[0], es[1]);
                                        ctx.stroke();
                                        ctx.setLineDash([]);
                                    }
                                }

                                // Draw draggables
                                viz.drawDraggables();

                                // Info
                                viz.screenText('Drag yellow handle to change impact parameter b', w / 2, h - 12, viz.colors.text, 10);

                                if (showCMframe) {
                                    viz.screenText('[CM frame overlay: on]', w - 80, 16, viz.colors.cyan, 10);
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Two billiard balls of equal mass collide. Ball 1 was moving; ball 2 was at rest. After the collision, ball 1 moves at 30 degrees from its original direction. At what angle does ball 2 move?',
                        hint: 'For equal-mass elastic collisions, the outgoing velocities are perpendicular.',
                        solution: 'Ball 2 moves at \\(90^\\circ - 30^\\circ = 60^\\circ\\) on the other side of the original direction. The two balls always emerge at 90 degrees to each other (for equal-mass elastic collisions with one initially at rest). This can be proven by showing that \\(\\mathbf{v}_{1f} \\cdot \\mathbf{v}_{2f} = 0\\) using momentum and energy conservation.'
                    },
                    {
                        question: 'For Rutherford scattering, what impact parameter \\(b\\) gives a scattering angle of 90 degrees? Express in terms of the distance of closest approach \\(a\\).',
                        hint: 'The Rutherford formula is \\(b = (a/2)\\cot(\\theta/2)\\).',
                        solution: '\\(b = \\frac{a}{2}\\cot(45^\\circ) = \\frac{a}{2}\\). The impact parameter for 90-degree scattering is half the distance of closest approach in a head-on collision. This gives a characteristic scale for the scattering process.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Inelastic Collisions and Real-World Applications
            // ============================================================
            {
                id: 'inelastic-applications',
                title: 'Inelastic Collisions & Applications',
                content: `
<h2>When Kinetic Energy Is Not Conserved</h2>

<p>Most real collisions are inelastic. Cars crumple, putty sticks, bullets embed. The coefficient of restitution \\(e\\) parameterizes how much "bounce" remains. The general 1D formulas with restitution \\(e\\) are:</p>

<div class="env-block theorem">
<div class="env-title">General 1D Collision with Restitution \\(e\\)</div>
<div class="env-body">
\\[v_{1f} = \\frac{m_1 v_1 + m_2 v_2 - e\\,m_2(v_1 - v_2)}{m_1 + m_2}\\]
\\[v_{2f} = \\frac{m_1 v_1 + m_2 v_2 + e\\,m_1(v_1 - v_2)}{m_1 + m_2}\\]
<p>Setting \\(e = 1\\) recovers the elastic formulas; \\(e = 0\\) gives the perfectly inelastic result.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Ballistic Pendulum</div>
<div class="env-body">
<p>A bullet of mass \\(m = 10\\) g embeds in a wooden block of mass \\(M = 2\\) kg suspended as a pendulum. The block swings to a height \\(h = 5\\) cm. What was the bullet's speed?</p>
<p>Step 1 (collision, momentum conservation): \\(mv_0 = (m + M)V\\).</p>
<p>Step 2 (swing, energy conservation): \\(\\frac{1}{2}(m + M)V^2 = (m + M)gh\\), so \\(V = \\sqrt{2gh}\\).</p>
\\[v_0 = \\frac{m + M}{m}\\sqrt{2gh} = \\frac{2.01}{0.01}\\sqrt{2(9.8)(0.05)} = 201 \\times 0.99 \\approx 199 \\text{ m/s}.\\]
<p>We must use momentum conservation for the collision (not energy, since it is highly inelastic) and energy conservation for the pendulum swing (conservative forces only).</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Do Not Mix Up Conservation Laws</div>
<div class="env-body">
<p>A common error is applying energy conservation during an inelastic collision or applying momentum conservation during a process with external forces. The correct strategy: (1) During the brief collision, use momentum conservation (external forces are negligible over the short time). (2) Before and after the collision, use energy conservation if forces are conservative. Apply each law to the appropriate phase of the motion.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Newton's Cradle</div>
<div class="env-body">
<p>In Newton's cradle, only one ball swinging in and one ball swinging out is the unique solution that satisfies <em>both</em> momentum and energy conservation. If two balls swung in, two swing out. If someone objects "why not two balls at half speed?", the answer is: that would conserve momentum but violate energy conservation (check it!). The constraint of simultaneous momentum and energy conservation is very restrictive.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Car Crash Analysis</div>
<div class="env-body">
<p>Two cars collide head-on and lock together. Car A (1500 kg) was going 20 m/s east; car B (1200 kg) was going 15 m/s west. After collision:</p>
\\[V = \\frac{1500(20) + 1200(-15)}{2700} = \\frac{30000 - 18000}{2700} = \\frac{12000}{2700} \\approx 4.44 \\text{ m/s east}.\\]
<p>KE before: \\(\\frac{1}{2}(1500)(400) + \\frac{1}{2}(1200)(225) = 300000 + 135000 = 435000\\) J. KE after: \\(\\frac{1}{2}(2700)(19.7) = 26667\\) J. Energy absorbed by deformation: \\(\\approx 408000\\) J (94%). This enormous energy dissipation is what makes head-on collisions so destructive.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Collisions in Higher Dimensions</div>
<div class="env-body">
<p>Everything we have done extends to 3D. Momentum conservation gives three equations. Energy conservation (if elastic) gives one more. For two-body elastic scattering in 3D, we have 6 unknowns (final velocity vectors) and 4 equations, leaving 2 undetermined parameters (the two scattering angles in 3D, or equivalently the impact parameter vector). The full solution requires knowing the interaction potential, which determines the deflection function \\(\\theta(b)\\). This is the domain of scattering theory, which connects classical mechanics to quantum mechanics and particle physics.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Show that in a perfectly inelastic collision with a stationary target, the fraction of KE lost is \\(m_2/(m_1 + m_2)\\).',
                        hint: 'Compute \\(T_i\\) and \\(T_f\\) using the final velocity from momentum conservation.',
                        solution: '\\(T_i = \\frac{1}{2}m_1 v_1^2\\). The final velocity is \\(V = m_1 v_1/(m_1 + m_2)\\), so \\(T_f = \\frac{1}{2}(m_1 + m_2)V^2 = \\frac{m_1^2 v_1^2}{2(m_1 + m_2)}\\). The fraction lost: \\(1 - T_f/T_i = 1 - m_1/(m_1 + m_2) = m_2/(m_1 + m_2)\\). If a bullet (\\(m_1 \\ll m_2\\)) hits a block, nearly all KE is lost. If a truck (\\(m_1 \\gg m_2\\)) hits a pebble, almost no KE is lost.'
                    },
                    {
                        question: 'A neutron (mass \\(m\\)) collides elastically with a stationary nucleus of mass \\(Am\\) (where \\(A\\) is the mass number). Show that the maximum fractional energy transfer is \\(4A/(1+A)^2\\). For what \\(A\\) is this maximized?',
                        hint: 'Use the elastic collision formulas with \\(m_1 = m, m_2 = Am\\). Maximum transfer is for a head-on collision.',
                        solution: 'In a head-on elastic collision, \\(v_{2f} = 2m_1 v_1/(m_1 + m_2) = 2v_1/(1+A)\\). The KE transferred to the nucleus: \\(\\frac{1}{2}Am [2v/(1+A)]^2 = 2Amv^2/(1+A)^2\\). The fraction: \\(\\Delta T/T_i = 4A/(1+A)^2\\). This is maximized when \\(d/dA[4A/(1+A)^2] = 0\\), giving \\(A = 1\\). Maximum transfer is \\(4/4 = 100\\%\\) for \\(A = 1\\) (hydrogen). This is why water (with hydrogen nuclei) is an effective neutron moderator in nuclear reactors.'
                    }
                ]
            }
        ]
    });
})();
