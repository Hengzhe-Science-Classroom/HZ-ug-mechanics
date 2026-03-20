// === Chapter 14: Rolling & Precession ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch14',
        number: 14,
        title: 'Rolling & Precession',
        subtitle: 'Rolling without slipping, the great incline race, and the full theory of spinning tops',
        file: 'ch14-rolling',

        sections: [
            // ============================================================
            // Section 0: Rolling Without Slipping
            // ============================================================
            {
                id: 'rolling-constraint',
                title: 'Rolling Without Slipping',
                content: `
<h2>The Rolling Constraint</h2>

<p>When a round object rolls on a surface without slipping, there is a precise kinematic relationship between its translational and rotational motion.</p>

<div class="env-block definition">
<div class="env-title">Definition: Rolling Without Slipping</div>
<div class="env-body">
<p>A body of radius \\(R\\) rolls without slipping on a surface if the velocity of the contact point is zero relative to the surface. This gives the <strong>rolling constraint</strong>:</p>
\\[v_{\\text{cm}} = R\\omega\\]
<p>Differentiating: \\(a_{\\text{cm}} = R\\alpha\\). The arc length rolled equals the distance traveled: \\(s = R\\theta\\).</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why zero velocity at the contact point?</div>
<div class="env-body">
<p>If the contact point had nonzero velocity relative to the surface, kinetic friction would act. "Rolling without slipping" means the contact point is instantaneously at rest, so only <em>static</em> friction acts (if needed). The rolling constraint \\(v = R\\omega\\) is the mathematical expression of this condition.</p>
</div>
</div>

<p>The velocity of any point on a rolling body is the sum of translational and rotational components. The contact point has \\(v_{\\text{trans}} = v_{\\text{cm}}\\) forward and \\(v_{\\text{rot}} = R\\omega\\) backward, which sum to zero. The top of the wheel has both components forward, giving speed \\(2v_{\\text{cm}}\\).</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Kinetic Energy of Rolling</div>
<div class="env-body">
<p>The kinetic energy of a body rolling without slipping is</p>
\\[K = \\frac{1}{2}Mv_{\\text{cm}}^2 + \\frac{1}{2}I_{\\text{cm}}\\omega^2 = \\frac{1}{2}\\left(M + \\frac{I_{\\text{cm}}}{R^2}\\right)v_{\\text{cm}}^2 = \\frac{1}{2}M\\left(1 + \\frac{k^2}{R^2}\\right)v_{\\text{cm}}^2\\]
<p>where \\(k\\) is the radius of gyration. The rolling body has <em>both</em> translational and rotational kinetic energy.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Static friction does no work in pure rolling</div>
<div class="env-body">
<p>Since the contact point has zero velocity, the static friction force does no work (\\(P = \\mathbf{f} \\cdot \\mathbf{v}_{\\text{contact}} = 0\\)). It changes the <em>partitioning</em> between translational and rotational KE but does not add or remove energy. Energy methods (rather than force methods) are therefore particularly clean for rolling problems.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Rolling down an incline</div>
<div class="env-body">
<p>A body starts from rest at height \\(h\\) on an incline and rolls without slipping to the bottom. By energy conservation (static friction does no work):</p>
\\[Mgh = \\frac{1}{2}M\\left(1 + \\frac{k^2}{R^2}\\right)v^2 \\quad \\Longrightarrow \\quad v = \\sqrt{\\frac{2gh}{1 + k^2/R^2}}\\]
<p>The acceleration down the incline is</p>
\\[a = \\frac{g\\sin\\theta}{1 + k^2/R^2}\\]
<p>Objects with smaller \\(k/R\\) reach the bottom first. The mass and radius cancel; only the <em>shape</em> (through \\(k/R\\)) matters.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A solid cylinder rolls without slipping down a \\(30^\\circ\\) incline. What fraction of its kinetic energy is rotational? What is its acceleration?',
                        hint: 'For a solid cylinder, \\(I_{\\text{cm}} = \\frac{1}{2}MR^2\\), so \\(k^2/R^2 = 1/2\\). The fraction of KE that is rotational is \\(K_{\\text{rot}}/K_{\\text{total}}\\). Use the rolling constraint to express everything in terms of \\(v_{\\text{cm}}\\).',
                        solution: '\\(K_{\\text{tot}} = \\frac{1}{2}Mv^2 + \\frac{1}{2}(\\frac{1}{2}MR^2)(v/R)^2 = \\frac{3}{4}Mv^2\\). Rotational fraction: \\(\\frac{1}{4}Mv^2 / \\frac{3}{4}Mv^2 = 1/3\\). Acceleration: \\(a = g\\sin 30^\\circ / (1 + 1/2) = (9.8 \\times 0.5)/1.5 = 3.27\\) m/s\\(^2\\).'
                    }
                ]
            },

            // ============================================================
            // Section 1: The Great Incline Race
            // ============================================================
            {
                id: 'incline-race',
                title: 'The Incline Race',
                content: `
<h2>Sphere vs. Cylinder vs. Hoop vs. Block</h2>

<p>One of the most beautiful demonstrations in mechanics: release different objects simultaneously from the top of an incline and watch them race. The result depends only on the dimensionless ratio \\(k^2/R^2 = I_{\\text{cm}}/(MR^2)\\).</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Acceleration of Rolling Bodies on an Incline</div>
<div class="env-body">
<p>For any axially symmetric body rolling without slipping down an incline of angle \\(\\theta\\):</p>
\\[a = \\frac{g\\sin\\theta}{1 + I_{\\text{cm}}/(MR^2)}\\]
<p>The ranking (fastest to slowest):</p>
<ol>
<li><strong>Frictionless block</strong> (sliding, no rolling): \\(a = g\\sin\\theta\\) (nothing diverted to rotation)</li>
<li><strong>Solid sphere</strong>: \\(I/(MR^2) = 2/5\\), so \\(a = \\frac{5}{7}g\\sin\\theta\\)</li>
<li><strong>Solid cylinder</strong>: \\(I/(MR^2) = 1/2\\), so \\(a = \\frac{2}{3}g\\sin\\theta\\)</li>
<li><strong>Thin spherical shell</strong>: \\(I/(MR^2) = 2/3\\), so \\(a = \\frac{3}{5}g\\sin\\theta\\)</li>
<li><strong>Thin hoop</strong>: \\(I/(MR^2) = 1\\), so \\(a = \\frac{1}{2}g\\sin\\theta\\) (slowest roller)</li>
</ol>
</div>
</div>

<p><strong>Derivation via forces.</strong> On the incline, the forces along the slope are gravity \\(Mg\\sin\\theta\\) (down the slope) and static friction \\(f\\) (up the slope). Newton's second law:</p>

\\[Mg\\sin\\theta - f = Ma\\]

<p>Torque about the CM (only friction exerts a torque, since gravity and the normal force pass through the CM):</p>

\\[fR = I_{\\text{cm}}\\alpha = I_{\\text{cm}}\\frac{a}{R}\\]

<p>Solving for \\(f\\) from the torque equation and substituting:</p>

\\[Mg\\sin\\theta - \\frac{I_{\\text{cm}}a}{R^2} = Ma \\quad \\Longrightarrow \\quad a = \\frac{g\\sin\\theta}{1 + I_{\\text{cm}}/(MR^2)}\\]

<div class="env-block intuition">
<div class="env-title">Why does the block win?</div>
<div class="env-body">
<p>The block does not rotate; all gravitational PE converts to translational KE. Each rolling body must share its PE between translation and rotation. The hoop, with all mass at radius \\(R\\), has the most to "spend" on rotation and is slowest. The result is independent of mass, radius, and incline angle.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">What about friction?</div>
<div class="env-body">
<p>The static friction required for rolling without slipping is \\(f = \\frac{I_{\\text{cm}}/(MR^2)}{1 + I_{\\text{cm}}/(MR^2)} Mg\\sin\\theta\\). This must not exceed \\(\\mu_s N = \\mu_s Mg\\cos\\theta\\). If the incline is too steep or \\(\\mu_s\\) too small, the body slips instead of rolling purely. The hoop requires the most friction; the sphere requires the least.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-race"></div>
`,
                visualizations: [
                    {
                        id: 'viz-race',
                        title: 'SHOWPIECE: The Great Incline Race',
                        description: 'A solid sphere, solid cylinder, thin hoop, and frictionless sliding block race down an incline. Click "Start Race" to begin. The sphere always beats the cylinder, which beats the hoop. The frictionless block beats them all. Mass and size do not matter; only shape.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var inclineAngle = 25; // degrees
                            var g = 9.8;
                            var raceRunning = false;
                            var raceTime = 0;
                            var prevTime = 0;

                            // Track geometry
                            var startX = 60, startY = 70;
                            var rampLen = w * 0.75;
                            var angleRad = inclineAngle * Math.PI / 180;
                            var endX = startX + rampLen * Math.cos(angleRad);
                            var endY = startY + rampLen * Math.sin(angleRad);
                            var groundY = endY;

                            // Objects: each has {name, color, IoverMR2, pos, vel, R, theta, finished, finishTime}
                            var objects = [];
                            var ballR = 16;

                            function resetRace() {
                                raceRunning = false;
                                raceTime = 0;
                                angleRad = inclineAngle * Math.PI / 180;
                                endX = startX + rampLen * Math.cos(angleRad);
                                endY = startY + rampLen * Math.sin(angleRad);
                                groundY = endY;

                                objects = [
                                    { name: 'Sphere', color: viz.colors.green, IoverMR2: 2 / 5, pos: 0, vel: 0, R: ballR, theta: 0, finished: false, finishTime: Infinity },
                                    { name: 'Cylinder', color: viz.colors.blue, IoverMR2: 1 / 2, pos: 0, vel: 0, R: ballR, theta: 0, finished: false, finishTime: Infinity },
                                    { name: 'Hoop', color: viz.colors.red, IoverMR2: 1, pos: 0, vel: 0, R: ballR, theta: 0, finished: false, finishTime: Infinity },
                                    { name: 'Block', color: viz.colors.orange, IoverMR2: 0, pos: 0, vel: 0, R: ballR, theta: 0, finished: false, finishTime: Infinity, isBlock: true }
                                ];
                            }

                            resetRace();

                            VizEngine.createButton(controls, 'Start Race', function () {
                                resetRace();
                                raceRunning = true;
                                prevTime = 0;
                            });
                            VizEngine.createButton(controls, 'Reset', function () { resetRace(); });
                            VizEngine.createSlider(controls, 'Incline angle (\u00B0)', 10, 45, inclineAngle, 1, function (v) { inclineAngle = v; resetRace(); });

                            function draw(t) {
                                var dt = 0;
                                if (raceRunning) {
                                    dt = prevTime > 0 ? (t - prevTime) / 1000 : 0;
                                    if (dt > 0.04) dt = 0.04;
                                    raceTime += dt;
                                }
                                prevTime = t;

                                // Update physics
                                if (raceRunning) {
                                    var allDone = true;
                                    for (var oi = 0; oi < objects.length; oi++) {
                                        var obj = objects[oi];
                                        if (obj.finished) continue;
                                        allDone = false;

                                        var acc = g * Math.sin(angleRad) / (1 + obj.IoverMR2);
                                        obj.vel += acc * dt * 100; // scale for visual
                                        obj.pos += obj.vel * dt;
                                        if (!obj.isBlock) {
                                            obj.theta += (obj.vel / obj.R) * dt;
                                        }

                                        if (obj.pos >= rampLen) {
                                            obj.pos = rampLen;
                                            obj.finished = true;
                                            obj.finishTime = raceTime;
                                        }
                                    }
                                    if (allDone) raceRunning = false;
                                }

                                viz.clear();

                                // Draw incline
                                ctx.fillStyle = '#1a1a3a';
                                ctx.beginPath();
                                ctx.moveTo(startX, startY);
                                ctx.lineTo(endX, endY);
                                ctx.lineTo(endX, startY);
                                ctx.closePath();
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(startX, startY);
                                ctx.lineTo(endX, endY);
                                ctx.stroke();

                                // Ground
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(endX, groundY);
                                ctx.lineTo(w - 20, groundY);
                                ctx.stroke();
                                for (var gx = endX; gx < w - 20; gx += 15) {
                                    ctx.beginPath();
                                    ctx.moveTo(gx, groundY);
                                    ctx.lineTo(gx - 7, groundY + 8);
                                    ctx.stroke();
                                }

                                // Angle arc
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(endX, endY, 40, -Math.PI, -Math.PI + angleRad);
                                ctx.stroke();
                                viz.screenText(inclineAngle + '\u00B0', endX - 55, endY - 12, viz.colors.yellow, 11, 'center');

                                // Draw objects on the ramp
                                var laneWidth = (h * 0.15);
                                for (var oi2 = 0; oi2 < objects.length; oi2++) {
                                    var obj2 = objects[oi2];
                                    var frac = obj2.pos / rampLen;

                                    // Position along ramp
                                    var cx2 = startX + frac * rampLen * Math.cos(angleRad);
                                    var cy2 = startY + frac * rampLen * Math.sin(angleRad);

                                    // Offset perpendicular to ramp for lane separation
                                    var perpX = -Math.sin(angleRad);
                                    var perpY = Math.cos(angleRad);
                                    var laneOffset = (oi2 - 1.5) * laneWidth * 0.3;
                                    cx2 += perpX * laneOffset;
                                    cy2 += perpY * laneOffset;

                                    // Offset above ramp surface
                                    cx2 -= perpX * obj2.R;
                                    cy2 -= perpY * obj2.R;

                                    if (obj2.isBlock) {
                                        // Draw block
                                        ctx.save();
                                        ctx.translate(cx2, cy2);
                                        ctx.rotate(angleRad);
                                        ctx.fillStyle = obj2.color + 'aa';
                                        ctx.strokeStyle = obj2.color;
                                        ctx.lineWidth = 2;
                                        ctx.fillRect(-obj2.R, -obj2.R, obj2.R * 2, obj2.R * 2);
                                        ctx.strokeRect(-obj2.R, -obj2.R, obj2.R * 2, obj2.R * 2);
                                        ctx.restore();
                                    } else {
                                        // Draw rolling object
                                        ctx.beginPath();
                                        ctx.arc(cx2, cy2, obj2.R, 0, Math.PI * 2);
                                        ctx.fillStyle = obj2.color + '44';
                                        ctx.fill();
                                        ctx.strokeStyle = obj2.color;
                                        ctx.lineWidth = obj2.IoverMR2 >= 0.9 ? 4 : 2;
                                        ctx.stroke();

                                        // Rotation indicator (spoke)
                                        ctx.strokeStyle = obj2.color;
                                        ctx.lineWidth = 2;
                                        ctx.beginPath();
                                        ctx.moveTo(cx2, cy2);
                                        ctx.lineTo(cx2 + obj2.R * 0.8 * Math.cos(obj2.theta), cy2 + obj2.R * 0.8 * Math.sin(obj2.theta));
                                        ctx.stroke();

                                        // Center dot
                                        ctx.fillStyle = obj2.color;
                                        ctx.beginPath();
                                        ctx.arc(cx2, cy2, 3, 0, Math.PI * 2);
                                        ctx.fill();
                                    }

                                    // Label
                                    viz.screenText(obj2.name, cx2, cy2 - obj2.R - 10, obj2.color, 11, 'center');
                                }

                                // Leaderboard
                                var sorted = objects.slice().sort(function (a, b) { return a.finishTime - b.finishTime; });
                                var lbx = 14, lby = h - objects.length * 24 - 10;
                                viz.screenText('Results:', lbx, lby - 18, viz.colors.white, 13, 'left');
                                for (var si = 0; si < sorted.length; si++) {
                                    var s = sorted[si];
                                    var label = (si + 1) + '. ' + s.name;
                                    if (s.finished) label += '  t=' + s.finishTime.toFixed(2) + 's';
                                    var col = s.finished ? s.color : viz.colors.text;
                                    viz.screenText(label, lbx, lby + si * 24, col, 12, 'left');
                                }

                                // Info
                                viz.screenText('a = g sin\u03B8 / (1 + I/MR\u00B2)', w - 14, 20, viz.colors.text, 11, 'right');
                                viz.screenText('Only shape matters, not mass or size!', w - 14, 38, viz.colors.yellow, 11, 'right');

                                // I/MR^2 table
                                var tx = w - 14;
                                viz.screenText('I/MR\u00B2:', tx, 64, viz.colors.text, 10, 'right');
                                viz.screenText('Block: 0 (slides)', tx, 80, viz.colors.orange, 10, 'right');
                                viz.screenText('Sphere: 2/5 = 0.40', tx, 96, viz.colors.green, 10, 'right');
                                viz.screenText('Cylinder: 1/2 = 0.50', tx, 112, viz.colors.blue, 10, 'right');
                                viz.screenText('Hoop: 1', tx, 128, viz.colors.red, 10, 'right');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A solid sphere and a hollow sphere (spherical shell) of the same mass and radius start from rest at the top of an incline. The solid sphere reaches the bottom in time \\(T\\). How long does the hollow sphere take? Express your answer in terms of \\(T\\).',
                        hint: 'The time to travel distance \\(d\\) from rest with constant acceleration \\(a\\) is \\(t = \\sqrt{2d/a}\\). Form the ratio of times using the ratio of accelerations.',
                        solution: 'For the solid sphere: \\(a_s = g\\sin\\theta / (1 + 2/5) = 5g\\sin\\theta/7\\). For the shell: \\(a_h = g\\sin\\theta / (1 + 2/3) = 3g\\sin\\theta/5\\). Time ratio: \\(T_h / T_s = \\sqrt{a_s / a_h} = \\sqrt{(5/7)/(3/5)} = \\sqrt{25/21} = 5/\\sqrt{21} \\approx 1.091\\). So \\(T_h \\approx 1.09\\,T\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Precession Derivation
            // ============================================================
            {
                id: 'precession-derivation',
                title: 'Precession: Full Derivation',
                content: `
<h2>Steady Precession from the Euler Equations</h2>

<p>In Chapter 13, we derived the precession rate \\(\\Omega_p = Mg\\ell / (I_s \\omega_s)\\) using a geometric argument. Here we derive it more carefully using the Euler equations for a symmetric top.</p>

<div class="env-block definition">
<div class="env-title">Definition: Symmetric Top (Gyroscope)</div>
<div class="env-body">
<p>A <strong>symmetric top</strong> is a rigid body with an axis of symmetry (the "figure axis" or "spin axis"). The two principal moments of inertia perpendicular to this axis are equal: \\(I_1 = I_2 \\equiv I_\\perp\\). The moment about the symmetry axis is \\(I_3 \\equiv I_s\\). The body spins about its symmetry axis with angular velocity \\(\\omega_s\\).</p>
</div>
</div>

<p>Place the pivot at the origin. Let \\(\\theta\\) be the angle between the symmetry axis and the vertical. In steady precession, \\(\\theta\\) is constant, and the symmetry axis sweeps a cone about the vertical at rate \\(\\Omega_p\\).</p>

<p>The angular velocity in components along the body-fixed principal axes is:</p>
\\[\\omega_1 = \\Omega_p \\sin\\theta, \\quad \\omega_2 = 0, \\quad \\omega_3 = \\omega_s + \\Omega_p \\cos\\theta\\]

<p>For <strong>steady precession</strong> (\\(\\dot{\\theta} = 0\\)), the Euler equation about the horizontal axis (perpendicular to the precession and symmetry axes) gives:</p>

\\[\\tau = Mg\\ell\\sin\\theta = \\Omega_p \\sin\\theta \\bigl[I_s(\\omega_s + \\Omega_p\\cos\\theta) - I_\\perp \\Omega_p \\cos\\theta\\bigr]\\]

<p>Dividing by \\(\\sin\\theta\\) (assuming \\(\\theta \\neq 0\\)):</p>

\\[Mg\\ell = I_s \\Omega_p \\omega_s + \\Omega_p^2 \\cos\\theta (I_s - I_\\perp)\\]

<div class="env-block theorem">
<div class="env-title">Theorem: Precession Rate (Exact Quadratic)</div>
<div class="env-body">
<p>The steady precession rate \\(\\Omega_p\\) satisfies</p>
\\[(I_s - I_\\perp)\\cos\\theta \\cdot \\Omega_p^2 + I_s\\omega_s \\cdot \\Omega_p - Mg\\ell = 0\\]
<p>This is a quadratic in \\(\\Omega_p\\). In the limit of fast spin (\\(\\omega_s \\gg \\Omega_p\\)), the quadratic term is negligible, and we recover</p>
\\[\\Omega_p \\approx \\frac{Mg\\ell}{I_s\\omega_s}\\]
<p>The other root gives a fast precession mode (\\(\\Omega_p \\sim \\omega_s\\)), which is rarely observed because it requires special initial conditions.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The precession rate is independent of \\(\\theta\\)</div>
<div class="env-body">
<p>In the slow-precession approximation, \\(\\Omega_p = Mg\\ell/(I_s\\omega_s)\\) does not depend on the tilt angle \\(\\theta\\). This remarkable fact means a gyroscope precesses at the same rate whether nearly vertical or nearly horizontal. The exact equation does have \\(\\theta\\)-dependence through the \\(\\Omega_p^2\\) term, but this is small when \\(\\omega_s \\gg \\Omega_p\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Show that for a gyroscope with \\(I_s = I_\\perp\\) (a sphere), the exact precession equation becomes linear in \\(\\Omega_p\\) and the tilt angle drops out entirely.',
                        hint: 'Set \\(I_s - I_\\perp = 0\\) in the quadratic equation.',
                        solution: 'When \\(I_s = I_\\perp\\), the coefficient of \\(\\Omega_p^2\\) vanishes, and the equation becomes \\(I_s \\omega_s \\Omega_p = Mg\\ell\\), giving \\(\\Omega_p = Mg\\ell / (I_s\\omega_s)\\) exactly (no approximation needed). The \\(\\theta\\)-dependence disappears completely.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Nutation
            // ============================================================
            {
                id: 'nutation',
                title: 'Nutation',
                content: `
<h2>The Wobble on Top of the Precession</h2>

<p>If a gyroscope is released without the "correct" initial precession rate, the spin axis does not precess smoothly. Instead, it <strong>nutates</strong>: the tilt angle \\(\\theta\\) oscillates rapidly while the axis precesses. The spin axis traces out a wavy path on the imaginary sphere of directions.</p>

<div class="env-block definition">
<div class="env-title">Definition: Nutation</div>
<div class="env-body">
<p><strong>Nutation</strong> is the rapid oscillation of the tilt angle \\(\\theta\\) of a precessing body. It is superimposed on the slower precession. For a fast-spinning top, the nutation frequency is approximately</p>
\\[\\omega_n \\approx \\frac{I_s \\omega_s}{I_\\perp}\\]
<p>which is much faster than the precession rate when \\(\\omega_s\\) is large.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Where does nutation come from?</div>
<div class="env-body">
<p>When you release a gyroscope from rest (no initial precession), gravity pulls it down, starting to change \\(\\theta\\). But as \\(\\theta\\) changes, the precession starts, and the Coriolis-like terms in the Euler equations push \\(\\theta\\) back. The result is a rapid back-and-forth in \\(\\theta\\), superimposed on a slow drift in the precession angle \\(\\phi\\). The faster the spin, the faster and smaller the nutation.</p>
</div>
</div>

<p>The three canonical nutation patterns depend on the initial conditions:</p>

<ol>
<li><strong>Cusps</strong>: Released from rest (no initial precession). The axis dips, picks up precession speed, rises back, slows the precession, dips again. The tip traces cusps on the sphere.</li>
<li><strong>Loops</strong>: Released with some precession but less than \\(\\Omega_p\\). The axis traces loops.</li>
<li><strong>Smooth waves</strong>: Released with the "wrong" precession rate (more or less than the steady value). The axis traces sinusoidal waves.</li>
</ol>

<div class="env-block remark">
<div class="env-title">Damping of nutation</div>
<div class="env-body">
<p>In practice, air resistance and pivot friction quickly damp the nutation, leaving only the steady precession. This is why a well-spun top appears to precess smoothly after a transient wobble at the start.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-nutation"></div>
`,
                visualizations: [
                    {
                        id: 'viz-nutation',
                        title: 'Precessing Top with Nutation',
                        description: 'A spinning top precesses and nutates. The trace shows the path of the tip of the spin axis on a sphere. Adjust the spin speed and initial conditions to see cusps, loops, or smooth waves.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var omegaSpin = 15;
                            var initPrec = 0.0; // initial precession fraction of Omega_p
                            var damping = 0.0;
                            var M = 1.0, grav = 9.8, ell = 0.15;
                            var Is = 0.005;
                            var Iperp = 0.008;
                            var theta0 = 50 * Math.PI / 180;

                            // State: [theta, theta_dot, phi, phi_dot]
                            var state = [theta0, 0, 0, 0];
                            var trail = [];
                            var simTime = 0;
                            var prevTime = 0;

                            VizEngine.createSlider(controls, 'Spin rate \u03C9_s', 5, 40, omegaSpin, 0.5, function (v) { omegaSpin = v; resetSim(); });
                            VizEngine.createSlider(controls, 'Initial precession (%)', 0, 150, initPrec * 100, 5, function (v) { initPrec = v / 100; resetSim(); });
                            VizEngine.createButton(controls, 'Reset', function () { resetSim(); });

                            function resetSim() {
                                var OmP = M * grav * ell / (Is * omegaSpin);
                                state = [theta0, 0, 0, initPrec * OmP];
                                trail = [];
                                simTime = 0;
                                prevTime = 0;
                            }
                            resetSim();

                            function derivs(s) {
                                var th = s[0], thd = s[1], phi = s[2], phid = s[3];
                                var sinTh = Math.sin(th);
                                var cosTh = Math.cos(th);
                                if (Math.abs(sinTh) < 1e-8) sinTh = 1e-8;

                                var Ls = Is * omegaSpin;
                                // Euler-Lagrange for symmetric top
                                var thdd = sinTh * cosTh * phid * phid - (Ls / Iperp) * sinTh * phid + M * grav * ell * sinTh / Iperp;
                                // phi: conservation of Lz => phi_dot = (Lz - Ls*cos(th)) / (Iperp * sin^2(th))
                                // Actually, for proper dynamics, we use the equations of motion:
                                var Lz = Iperp * sinTh * sinTh * phid + Ls * cosTh;
                                // thdd is correct from above
                                // phidd from torque equation: d/dt(Iperp * sin^2(th) * phi_dot) = ...
                                // Simpler: use Lz = const to update phi_dot
                                // Lz computed from initial conditions
                                var phidd = (-2 * cosTh * thd * phid + (Ls / Iperp) * thd) / sinTh;

                                return [thd, thdd - damping * thd, phid, phidd];
                            }

                            function draw(t) {
                                var dt = prevTime > 0 ? (t - prevTime) / 1000 : 0;
                                if (dt > 0.03) dt = 0.03;
                                prevTime = t;

                                // Sub-step integration
                                var steps = 20;
                                var subdt = dt / steps;
                                for (var si = 0; si < steps; si++) {
                                    state = VizEngine.rk4(state, simTime, subdt, derivs);
                                    simTime += subdt;
                                    // Clamp theta
                                    if (state[0] < 0.05) { state[0] = 0.05; state[1] = Math.abs(state[1]); }
                                    if (state[0] > Math.PI - 0.05) { state[0] = Math.PI - 0.05; state[1] = -Math.abs(state[1]); }
                                }

                                var theta = state[0];
                                var phi = state[2];

                                // Store trail point (spherical to projected 2D)
                                var projR = 130;
                                var centerX = w * 0.5;
                                var centerY = h * 0.45;
                                // Stereographic-ish projection of axis tip on a sphere
                                var tipX = projR * Math.sin(theta) * Math.cos(phi);
                                var tipZ = projR * Math.sin(theta) * Math.sin(phi);
                                var tipY = projR * Math.cos(theta);
                                // 2D oblique projection
                                var pX = centerX + tipX + tipZ * 0.3;
                                var pY = centerY - tipY + tipZ * 0.15;

                                trail.push([pX, pY]);
                                if (trail.length > 2000) trail.shift();

                                viz.clear();

                                // Draw reference sphere outline
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(centerX, centerY, projR, 0, Math.PI * 2);
                                ctx.stroke();

                                // Draw equator
                                ctx.strokeStyle = viz.colors.axis + '44';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.ellipse(centerX, centerY, projR, projR * 0.3, 0, 0, Math.PI * 2);
                                ctx.stroke();

                                // Vertical axis
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.moveTo(centerX, centerY - projR - 20);
                                ctx.lineTo(centerX, centerY + projR + 20);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Draw trail
                                if (trail.length > 1) {
                                    for (var ti = 1; ti < trail.length; ti++) {
                                        var alpha = ti / trail.length;
                                        ctx.strokeStyle = 'rgba(255, 215, 0, ' + (alpha * 0.7) + ')';
                                        ctx.lineWidth = 1 + alpha;
                                        ctx.beginPath();
                                        ctx.moveTo(trail[ti - 1][0], trail[ti - 1][1]);
                                        ctx.lineTo(trail[ti][0], trail[ti][1]);
                                        ctx.stroke();
                                    }
                                }

                                // Draw spin axis line from pivot to tip
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(centerX, centerY);
                                ctx.lineTo(pX, pY);
                                ctx.stroke();

                                // Disc at tip
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath();
                                ctx.arc(pX, pY, 6, 0, Math.PI * 2);
                                ctx.fill();

                                // Pivot
                                ctx.fillStyle = viz.colors.yellow;
                                ctx.beginPath();
                                ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
                                ctx.fill();

                                // Gravity arrow
                                ctx.save();
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(centerX + 20, centerY);
                                ctx.lineTo(centerX + 20, centerY + 35);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.purple;
                                ctx.beginPath();
                                ctx.moveTo(centerX + 20, centerY + 40);
                                ctx.lineTo(centerX + 15, centerY + 32);
                                ctx.lineTo(centerX + 25, centerY + 32);
                                ctx.closePath();
                                ctx.fill();
                                ctx.restore();
                                viz.screenText('g', centerX + 35, centerY + 20, viz.colors.purple, 12, 'left');

                                // Info
                                var OmP = M * grav * ell / (Is * omegaSpin);
                                viz.screenText('\u03C9_s = ' + omegaSpin.toFixed(1) + ' rad/s', 14, h - 60, viz.colors.teal, 12, 'left');
                                viz.screenText('\u03A9_p \u2248 ' + OmP.toFixed(2) + ' rad/s', 14, h - 40, viz.colors.yellow, 12, 'left');
                                viz.screenText('\u03B8 = ' + (theta * 180 / Math.PI).toFixed(1) + '\u00B0', 14, h - 20, viz.colors.text, 12, 'left');

                                var pattern = '';
                                if (initPrec < 0.05) pattern = 'Pattern: cusps';
                                else if (initPrec < 0.9) pattern = 'Pattern: loops';
                                else if (initPrec > 1.1) pattern = 'Pattern: waves';
                                else pattern = 'Pattern: near-steady';
                                viz.screenText(pattern, w - 14, h - 20, viz.colors.gold, 12, 'right');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Estimate the nutation frequency and period for a toy gyroscope with \\(I_s = 5 \\times 10^{-5}\\) kg m\\(^2\\), \\(I_\\perp = 3 \\times 10^{-5}\\) kg m\\(^2\\), spinning at 100 rev/s. Why is nutation usually invisible to the eye?',
                        hint: 'Use \\(\\omega_n \\approx I_s \\omega_s / I_\\perp\\). Convert rev/s to rad/s first.',
                        solution: '\\(\\omega_s = 100 \\times 2\\pi = 628\\) rad/s. \\(\\omega_n \\approx (5/3) \\times 628 = 1047\\) rad/s. Period \\(T_n = 2\\pi/1047 \\approx 0.006\\) s \\(= 6\\) ms. This is far too fast for the eye to resolve, so the gyroscope appears to precess smoothly.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Rolling with Slipping & Advanced Topics
            // ============================================================
            {
                id: 'rolling-slipping',
                title: 'Rolling with Slipping & Transitions',
                content: `
<h2>When Pure Rolling Fails</h2>

<p>Not all situations allow pure rolling from the start. A bowling ball released with backspin, a car tire on ice, a billiard ball struck off-center: these all involve an initial phase of <strong>slipping</strong> before (possibly) transitioning to pure rolling.</p>

<div class="env-block definition">
<div class="env-title">Definition: Rolling with Slipping</div>
<div class="env-body">
<p>When \\(v_{\\text{cm}} \\neq R\\omega\\), kinetic friction acts at the contact point. If \\(v_{\\text{cm}} > R\\omega\\) (translational motion exceeds rotational), friction acts backward on the translating body and provides torque that spins it up. If \\(v_{\\text{cm}} < R\\omega\\) (overspin), friction acts forward, slowing the spin and accelerating the translation.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Bowling Ball Transition to Pure Rolling</div>
<div class="env-body">
<p>A bowling ball (solid sphere, \\(I = \\frac{2}{5}MR^2\\)) is thrown with initial speed \\(v_0\\) and no spin (\\(\\omega_0 = 0\\)) onto a surface with kinetic friction coefficient \\(\\mu_k\\).</p>
<p><strong>Translation:</strong> \\(Ma = -\\mu_k Mg \\Rightarrow v(t) = v_0 - \\mu_k g t\\)</p>
<p><strong>Rotation:</strong> \\(\\frac{2}{5}MR^2 \\cdot \\alpha = \\mu_k Mg R \\Rightarrow \\omega(t) = \\frac{5\\mu_k g}{2R} t\\)</p>
<p>The ball transitions to pure rolling when \\(v = R\\omega\\):</p>
\\[v_0 - \\mu_k g t^* = R \\cdot \\frac{5\\mu_k g}{2R} t^* = \\frac{5\\mu_k g}{2} t^*\\]
\\[t^* = \\frac{2v_0}{7\\mu_k g}, \\qquad v_{\\text{final}} = v_0 - \\mu_k g \\cdot \\frac{2v_0}{7\\mu_k g} = \\frac{5}{7}v_0\\]
<p>After this time, the ball rolls without slipping at \\(\\frac{5}{7}\\) of its initial speed.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Energy accounting</div>
<div class="env-body">
<p>Initial KE: \\(\\frac{1}{2}Mv_0^2\\). Final KE: \\(\\frac{1}{2}M(5v_0/7)^2 + \\frac{1}{2}(\\frac{2}{5}MR^2)(5v_0/(7R))^2 = \\frac{5}{14}Mv_0^2\\). Lost to friction: \\(\\frac{1}{2}Mv_0^2 - \\frac{5}{14}Mv_0^2 = \\frac{1}{7}Mv_0^2\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Billiard Ball with Backspin</div>
<div class="env-body">
<p>A billiard ball is struck so that it has initial \\(v_0\\) forward and \\(\\omega_0\\) backward (i.e., the bottom of the ball moves forward relative to the surface). Kinetic friction acts backward (opposing the contact point's forward motion). The ball slows in both \\(v\\) and \\(\\omega\\). If \\(v\\) reaches zero before \\(\\omega\\) does, the ball reverses direction. This is the famous "draw shot."</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Two distinct phases</div>
<div class="env-body">
<p>Always analyze rolling problems in two phases if slipping is involved: (1) the slipping phase, governed by kinetic friction, and (2) the pure rolling phase (if reached), governed by static friction or energy conservation. The transition occurs when \\(v_{\\text{cm}} = R\\omega\\). Do not mix the equations from the two phases.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A uniform solid cylinder is placed on a rough incline (angle \\(\\theta\\), kinetic friction \\(\\mu_k\\), static friction \\(\\mu_s\\)). Under what condition on \\(\\mu_s\\) does it roll without slipping from the start?',
                        hint: 'Compute the friction force needed for pure rolling: \\(f = \\frac{I/(MR^2)}{1+I/(MR^2)} Mg\\sin\\theta\\). This must satisfy \\(f \\leq \\mu_s N = \\mu_s Mg\\cos\\theta\\).',
                        solution: 'For a cylinder, \\(I/(MR^2) = 1/2\\). Required friction: \\(f = \\frac{1/2}{1+1/2}Mg\\sin\\theta = \\frac{1}{3}Mg\\sin\\theta\\). Condition: \\(\\frac{1}{3}Mg\\sin\\theta \\leq \\mu_s Mg\\cos\\theta\\), so \\(\\mu_s \\geq \\frac{1}{3}\\tan\\theta\\). For a \\(30^\\circ\\) incline, \\(\\mu_s \\geq 0.192\\).'
                    }
                ]
            }
        ]
    });
})();
