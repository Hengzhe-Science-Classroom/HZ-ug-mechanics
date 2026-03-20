// === Chapter 4: Non-Inertial Reference Frames ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch04',
        number: 4,
        title: 'Non-Inertial Frames',
        subtitle: 'Rotating frames, fictitious forces, and why hurricanes spin',
        file: 'ch04-non-inertial',

        sections: [
            // ============================================================
            // Section 0: Accelerating Frames & Fictitious Forces
            // ============================================================
            {
                id: 'accelerating-frames',
                title: 'Accelerating Frames',
                content: `
<h2>When Newton's Laws Seem to Fail</h2>

<p>Newton's second law \\(\\mathbf{F} = m\\mathbf{a}\\) holds in <em>inertial</em> frames: frames in uniform, straight-line motion (or at rest) relative to the fixed stars. But physicists and engineers routinely work in frames that accelerate, rotate, or both. In such <strong>non-inertial frames</strong>, objects appear to accelerate even when no real force acts on them. To salvage Newtonian analysis, we introduce <strong>fictitious forces</strong> (also called pseudo-forces or inertial forces).</p>

<div class="env-block definition">
<div class="env-title">Definition: Inertial vs. Non-Inertial Frame</div>
<div class="env-body">
<p>An <strong>inertial frame</strong> is one in which a free particle (subject to no forces) moves in a straight line at constant speed. A <strong>non-inertial frame</strong> is any frame that accelerates relative to an inertial frame. In a non-inertial frame, free particles appear to accelerate, violating Newton's first law unless fictitious forces are introduced.</p>
</div>
</div>

<h3>Linearly Accelerating Frame</h3>

<p>Consider an elevator accelerating upward with acceleration \\(\\mathbf{A}\\) relative to an inertial frame. Let \\(\\mathbf{r}_0\\) denote positions in the inertial frame and \\(\\mathbf{r}'\\) in the elevator frame. Then \\(\\mathbf{r}_0 = \\mathbf{r}' + \\mathbf{R}(t)\\), where \\(\\mathbf{R}(t)\\) is the position of the elevator's origin. Differentiating twice:</p>

\\[\\mathbf{a}_0 = \\mathbf{a}' + \\mathbf{A}\\]

<p>Newton's second law in the inertial frame: \\(\\mathbf{F} = m\\mathbf{a}_0\\). Substituting:</p>

\\[m\\mathbf{a}' = \\mathbf{F} - m\\mathbf{A}\\]

<p>The term \\(-m\\mathbf{A}\\) is the <strong>fictitious force</strong> in the accelerating frame. It is not caused by any interaction; it arises purely from the frame's acceleration.</p>

<div class="env-block example">
<div class="env-title">Example: Pendulum in an Accelerating Train</div>
<div class="env-body">
<p>A pendulum hangs in a train accelerating forward at \\(a\\). In the train's frame, the bob is in equilibrium when the string makes angle \\(\\theta\\) with the vertical, where the tension balances both gravity and the fictitious force:</p>
\\[\\tan\\theta = \\frac{a}{g}\\]
<p>The effective gravity is \\(g_{\\text{eff}} = \\sqrt{g^2 + a^2}\\), tilted backward.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Warning: Fictitious Forces Are Frame Artifacts</div>
<div class="env-body">
<p>Fictitious forces have no agent. There is no third-law reaction partner. They cannot be detected by a force meter attached to the object's surface. They are purely kinematic consequences of using a non-inertial coordinate system. In any inertial frame, the same motion is explained without them.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'You stand on a scale in an elevator accelerating upward at \\(2\\) m/s\\(^2\\). Your mass is 70 kg. What does the scale read?',
                        hint: 'In the elevator frame, you are in equilibrium. The effective gravity is \\(g + a\\).',
                        solution: 'The scale reads the normal force \\(N = m(g + a) = 70(9.8 + 2) = 826\\) N. This is equivalent to an apparent weight of \\(826/9.8 \\approx 84.3\\) kg. The fictitious force \\(-m\\mathbf{A}\\) acts downward (since \\(\\mathbf{A}\\) is upward), adding to gravity in the elevator frame.'
                    }
                ]
            },

            // ============================================================
            // Section 1: The Rotating Frame Equation
            // ============================================================
            {
                id: 'rotating-frame',
                title: 'The Rotating Frame',
                content: `
<h2>Kinematics in a Rotating Frame</h2>

<p>The most important non-inertial frames in physics are <em>rotating</em> frames. The Earth itself is a rotating frame, and understanding its effects is essential for meteorology, ballistics, navigation, and satellite dynamics.</p>

<h3>The Transport Theorem</h3>

<p>Let \\(S\\) be an inertial frame and \\(S'\\) a frame rotating with angular velocity \\(\\boldsymbol{\\omega}\\) relative to \\(S\\). For any vector \\(\\mathbf{Q}\\), the time derivatives in the two frames are related by:</p>

<div class="env-block theorem">
<div class="env-title">Transport Theorem</div>
<div class="env-body">
\\[\\left(\\frac{d\\mathbf{Q}}{dt}\\right)_S = \\left(\\frac{d\\mathbf{Q}}{dt}\\right)_{S'} + \\boldsymbol{\\omega} \\times \\mathbf{Q}\\]
<p>The inertial rate of change equals the rate of change as seen in the rotating frame, plus the rotation-induced change \\(\\boldsymbol{\\omega} \\times \\mathbf{Q}\\).</p>
</div>
</div>

<p>Apply this to the position vector \\(\\mathbf{r}\\) to get the velocity relation. Then apply it again to the velocity to obtain the acceleration. Let primes denote quantities measured in the rotating frame:</p>

\\[\\mathbf{v}_S = \\mathbf{v}' + \\boldsymbol{\\omega} \\times \\mathbf{r}\\]

<p>Differentiating once more (and applying the transport theorem to each term):</p>

<div class="env-block theorem">
<div class="env-title">Acceleration in a Rotating Frame</div>
<div class="env-body">
\\[\\mathbf{a}_S = \\mathbf{a}' + 2\\boldsymbol{\\omega} \\times \\mathbf{v}' + \\boldsymbol{\\omega} \\times (\\boldsymbol{\\omega} \\times \\mathbf{r}) + \\dot{\\boldsymbol{\\omega}} \\times \\mathbf{r}\\]
<p>where \\(\\mathbf{a}'\\) is the acceleration in the rotating frame, \\(2\\boldsymbol{\\omega}\\times\\mathbf{v}'\\) is the Coriolis term, \\(\\boldsymbol{\\omega}\\times(\\boldsymbol{\\omega}\\times\\mathbf{r})\\) is the centripetal term, and \\(\\dot{\\boldsymbol{\\omega}}\\times\\mathbf{r}\\) is the Euler term (present only if the rotation rate changes).</p>
</div>
</div>

<p>Inserting \\(\\mathbf{F} = m\\mathbf{a}_S\\) and solving for \\(m\\mathbf{a}'\\):</p>

\\[m\\mathbf{a}' = \\mathbf{F} - 2m\\boldsymbol{\\omega}\\times\\mathbf{v}' - m\\boldsymbol{\\omega}\\times(\\boldsymbol{\\omega}\\times\\mathbf{r}) - m\\dot{\\boldsymbol{\\omega}}\\times\\mathbf{r}\\]

<p>The three extra terms are the <strong>Coriolis force</strong>, the <strong>centrifugal force</strong>, and the <strong>Euler force</strong>, respectively.</p>

<div class="env-block remark">
<div class="env-title">Constant \\(\\boldsymbol{\\omega}\\) Simplification</div>
<div class="env-body">
<p>For the Earth (and most applications), \\(\\dot{\\boldsymbol{\\omega}} \\approx 0\\), so the Euler force vanishes. We are left with two fictitious forces: Coriolis and centrifugal.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Derive the velocity transformation \\(\\mathbf{v}_S = \\mathbf{v}\\prime + \\boldsymbol{\\omega}\\times\\mathbf{r}\\) by applying the transport theorem to \\(\\mathbf{r}\\).',
                        hint: 'Set \\(\\mathbf{Q} = \\mathbf{r}\\) in the transport theorem. The left-hand side is the inertial velocity.',
                        solution: 'Let \\(\\mathbf{Q} = \\mathbf{r}\\). Then \\((d\\mathbf{r}/dt)_S = (d\\mathbf{r}/dt)_{S\'} + \\boldsymbol{\\omega}\\times\\mathbf{r}\\). The left-hand side is \\(\\mathbf{v}_S\\) and the first term on the right is \\(\\mathbf{v}\'\\), giving \\(\\mathbf{v}_S = \\mathbf{v}\' + \\boldsymbol{\\omega}\\times\\mathbf{r}\\).'
                    },
                    {
                        question: 'If the angular velocity is \\(\\boldsymbol{\\omega} = \\omega\\hat{z}\\) and \\(\\mathbf{r} = R\\hat{x}\\), compute the centripetal acceleration \\(\\boldsymbol{\\omega}\\times(\\boldsymbol{\\omega}\\times\\mathbf{r})\\). Verify it points inward.',
                        hint: 'Compute the inner cross product first: \\(\\boldsymbol{\\omega}\\times\\mathbf{r} = \\omega R(\\hat{z}\\times\\hat{x}) = \\omega R\\hat{y}\\).',
                        solution: '\\(\\boldsymbol{\\omega}\\times\\mathbf{r} = \\omega\\hat{z}\\times R\\hat{x} = \\omega R\\hat{y}\\). Then \\(\\boldsymbol{\\omega}\\times(\\boldsymbol{\\omega}\\times\\mathbf{r}) = \\omega\\hat{z}\\times\\omega R\\hat{y} = \\omega^2 R(\\hat{z}\\times\\hat{y}) = -\\omega^2 R\\hat{x}\\). This points radially inward (toward the axis), confirming it is centripetal. The centrifugal force \\(-m\\boldsymbol{\\omega}\\times(\\boldsymbol{\\omega}\\times\\mathbf{r}) = +m\\omega^2 R\\hat{x}\\) points outward.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Centrifugal Force & Coriolis Force
            // ============================================================
            {
                id: 'centrifugal-coriolis',
                title: 'Centrifugal & Coriolis',
                content: `
<h2>The Two Great Fictitious Forces</h2>

<h3>Centrifugal Force</h3>

<div class="env-block definition">
<div class="env-title">Definition: Centrifugal Force</div>
<div class="env-body">
<p>In a frame rotating with constant angular velocity \\(\\boldsymbol{\\omega}\\), every object of mass \\(m\\) at position \\(\\mathbf{r}\\) from the rotation axis experiences a fictitious force:</p>
\\[\\mathbf{F}_{\\text{cf}} = -m\\boldsymbol{\\omega}\\times(\\boldsymbol{\\omega}\\times\\mathbf{r}) = m\\omega^2 \\mathbf{r}_\\perp\\]
<p>where \\(\\mathbf{r}_\\perp\\) is the component of \\(\\mathbf{r}\\) perpendicular to the rotation axis. The centrifugal force points radially outward from the axis, regardless of the object's velocity.</p>
</div>
</div>

<p>The centrifugal force is velocity-independent. It acts on every object in the rotating frame, moving or stationary. On Earth's surface, it slightly reduces the effective gravitational acceleration and causes the Earth to bulge at the equator.</p>

<div class="env-block example">
<div class="env-title">Example: Centrifugal Reduction of Gravity</div>
<div class="env-body">
<p>At the equator, \\(r_\\perp = R_E = 6.37\\times 10^6\\) m, \\(\\omega = 7.29\\times 10^{-5}\\) rad/s. The centrifugal acceleration is:</p>
\\[\\omega^2 R_E = (7.29\\times 10^{-5})^2(6.37\\times 10^6) \\approx 0.034 \\text{ m/s}^2\\]
<p>This is about 0.35% of \\(g\\). The effective gravity at the equator is reduced by this amount (plus an additional geometric effect from Earth's oblate shape).</p>
</div>
</div>

<h3>Coriolis Force</h3>

<div class="env-block definition">
<div class="env-title">Definition: Coriolis Force</div>
<div class="env-body">
<p>An object moving with velocity \\(\\mathbf{v}'\\) in a frame rotating at \\(\\boldsymbol{\\omega}\\) experiences:</p>
\\[\\mathbf{F}_{\\text{Cor}} = -2m\\boldsymbol{\\omega}\\times\\mathbf{v}'\\]
<p>The Coriolis force is perpendicular to the velocity and to the rotation axis. It deflects moving objects without changing their speed (analogous to a magnetic force).</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why Does the Coriolis Force Deflect?</div>
<div class="env-body">
<p>Imagine throwing a ball radially outward on a rotating turntable. In the inertial frame, the ball moves in a straight line. But the turntable rotates underneath it. From the turntable's perspective, the ball curves to one side. No real force caused the curve; it is the turntable's rotation that makes a straight-line path look curved. The Coriolis force quantifies this apparent deflection.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-coriolis-platform"></div>

<div class="env-block remark">
<div class="env-title">Key Properties of the Coriolis Force</div>
<div class="env-body">
<ul>
<li>Proportional to velocity: stationary objects feel no Coriolis force.</li>
<li>Always perpendicular to \\(\\mathbf{v}'\\): it does no work and cannot change the speed, only the direction.</li>
<li>On Earth (\\(\\boldsymbol{\\omega}\\) pointing north along the rotation axis), objects moving in the Northern Hemisphere are deflected to the right; in the Southern Hemisphere, to the left.</li>
</ul>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-coriolis-platform',
                        title: 'Coriolis Deflection on a Rotating Platform',
                        description: 'A ball is launched radially outward on a rotating platform. In the <strong>lab frame</strong> the path is straight. In the <strong>rotating frame</strong>, the Coriolis force curves it. Toggle between frames and adjust the rotation rate.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            var cx = w / 2, cy = h / 2;

                            var omega = 1.5;
                            var showRotating = true;
                            var running = true;
                            var t = 0;

                            VizEngine.createSlider(controls, '\u03c9 (rad/s)', 0.2, 4.0, omega, 0.1, function (v) { omega = v; resetSim(); });
                            VizEngine.createButton(controls, 'Lab Frame', function () { showRotating = false; resetSim(); });
                            VizEngine.createButton(controls, 'Rotating Frame', function () { showRotating = true; resetSim(); });
                            VizEngine.createButton(controls, 'Reset', function () { resetSim(); });

                            var launchSpeed = 2.5;
                            var ballState, trail, platformAngle;

                            function resetSim() {
                                t = 0;
                                platformAngle = 0;
                                ballState = { x: 0.3, y: 0, vx: launchSpeed, vy: 0 };
                                trail = [];
                                running = true;
                            }
                            resetSim();

                            var sc = 38;
                            var R = 5.5;

                            function drawPlatform(angle) {
                                // Platform circle
                                ctx.strokeStyle = viz.colors.teal + '66';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(cx, cy, R * sc, 0, Math.PI * 2);
                                ctx.stroke();

                                // Radial lines
                                for (var i = 0; i < 8; i++) {
                                    var a = angle + i * Math.PI / 4;
                                    ctx.strokeStyle = viz.colors.grid;
                                    ctx.lineWidth = 0.8;
                                    ctx.beginPath();
                                    ctx.moveTo(cx, cy);
                                    ctx.lineTo(cx + R * sc * Math.cos(a), cy - R * sc * Math.sin(a));
                                    ctx.stroke();
                                }

                                // Concentric rings
                                for (var r = 1.5; r <= R; r += 1.5) {
                                    ctx.strokeStyle = viz.colors.grid + '44';
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath();
                                    ctx.arc(cx, cy, r * sc, 0, Math.PI * 2);
                                    ctx.stroke();
                                }

                                // Center pivot
                                ctx.fillStyle = viz.colors.axis;
                                ctx.beginPath();
                                ctx.arc(cx, cy, 4, 0, Math.PI * 2);
                                ctx.fill();
                            }

                            function worldToScreen(wx, wy) {
                                return [cx + wx * sc, cy - wy * sc];
                            }

                            function draw() {
                                viz.clear();
                                var dt = 0.016;

                                if (running) {
                                    t += dt;
                                    platformAngle += omega * dt;

                                    // In inertial frame, ball travels straight
                                    // Inertial coords: X = x0 + vx*t, Y = y0
                                    // We store inertial coords
                                    ballState.x += ballState.vx * dt;
                                    ballState.y += ballState.vy * dt;

                                    var dist = Math.sqrt(ballState.x * ballState.x + ballState.y * ballState.y);
                                    if (dist > R + 0.5) running = false;
                                }

                                // Compute rotating-frame coords
                                var cosA = Math.cos(platformAngle);
                                var sinA = Math.sin(platformAngle);
                                var rx = cosA * ballState.x + sinA * ballState.y;
                                var ry = -sinA * ballState.x + cosA * ballState.y;

                                if (showRotating) {
                                    trail.push([rx, ry]);
                                } else {
                                    trail.push([ballState.x, ballState.y]);
                                }
                                if (trail.length > 600) trail.shift();

                                var dispAngle = showRotating ? 0 : platformAngle;
                                drawPlatform(dispAngle);

                                // Draw trail
                                if (trail.length > 1) {
                                    for (var i = 1; i < trail.length; i++) {
                                        var alpha = i / trail.length;
                                        var p1 = worldToScreen(trail[i - 1][0], trail[i - 1][1]);
                                        var p2 = worldToScreen(trail[i][0], trail[i][1]);
                                        ctx.strokeStyle = viz.colors.orange;
                                        ctx.globalAlpha = alpha * 0.8;
                                        ctx.lineWidth = 1 + alpha * 2;
                                        ctx.beginPath();
                                        ctx.moveTo(p1[0], p1[1]);
                                        ctx.lineTo(p2[0], p2[1]);
                                        ctx.stroke();
                                    }
                                    ctx.globalAlpha = 1;
                                }

                                // Draw ball
                                var bx, by;
                                if (showRotating) {
                                    bx = rx; by = ry;
                                } else {
                                    bx = ballState.x; by = ballState.y;
                                }
                                var bs = worldToScreen(bx, by);
                                // Glow
                                var grad = ctx.createRadialGradient(bs[0], bs[1], 2, bs[0], bs[1], 18);
                                grad.addColorStop(0, viz.colors.orange + '88');
                                grad.addColorStop(1, viz.colors.orange + '00');
                                ctx.fillStyle = grad;
                                ctx.beginPath(); ctx.arc(bs[0], bs[1], 18, 0, Math.PI * 2); ctx.fill();

                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(bs[0], bs[1], 7, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                                ctx.beginPath(); ctx.arc(bs[0] - 2, bs[1] - 2, 2.5, 0, Math.PI * 2); ctx.fill();

                                // Arrow showing launch direction in rotating frame
                                if (showRotating && trail.length < 5) {
                                    var arrowEnd = worldToScreen(rx + 1.5, ry);
                                    ctx.strokeStyle = viz.colors.green;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.moveTo(bs[0], bs[1]); ctx.lineTo(arrowEnd[0], arrowEnd[1]); ctx.stroke();
                                }

                                // Rotation indicator
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(cx, cy, R * sc + 12, Math.PI * 0.1, Math.PI * 0.1 + platformAngle % (Math.PI * 2));
                                ctx.stroke();

                                // Labels
                                var frameLabel = showRotating ? 'Rotating Frame' : 'Lab Frame (Inertial)';
                                viz.screenText(frameLabel, w / 2, 18, viz.colors.white, 13);
                                viz.screenText('\u03c9 = ' + omega.toFixed(1) + ' rad/s', w / 2, h - 12, viz.colors.teal, 11);

                                if (showRotating && trail.length > 30) {
                                    viz.screenText('Coriolis deflection', w - 80, 35, viz.colors.orange, 11);
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'On the rotating platform, the ball is launched radially. In the rotating frame it curves. Does the Coriolis force do work on the ball? Explain.',
                        hint: 'The Coriolis force is \\(-2m\\boldsymbol{\\omega}\\times\\mathbf{v}\'\\). What is the angle between this force and \\(\\mathbf{v}\'\\)?',
                        solution: 'The Coriolis force is always perpendicular to the velocity (since it is a cross product with \\(\\mathbf{v}\'\\)). Therefore \\(\\mathbf{F}_{\\text{Cor}}\\cdot\\mathbf{v}\' = 0\\), and the Coriolis force does zero work. It changes the direction of motion but not the speed, analogous to the magnetic Lorentz force.'
                    }
                ]
            },

            // ============================================================
            // Section 3: The Foucault Pendulum
            // ============================================================
            {
                id: 'foucault-pendulum',
                title: 'Foucault Pendulum',
                content: `
<h2>Proof That the Earth Rotates</h2>

<p>In 1851, Leon Foucault suspended a 67-meter pendulum from the dome of the Pantheon in Paris and demonstrated that its plane of oscillation slowly rotates. This was the first direct, non-astronomical proof that the Earth rotates. The rotation of the pendulum plane is a Coriolis effect.</p>

<h3>Analysis</h3>

<p>Consider a pendulum at latitude \\(\\lambda\\) on the Earth's surface. The Earth's angular velocity has a vertical component \\(\\omega_v = \\omega\\sin\\lambda\\) (where \\(\\omega = 7.29\\times 10^{-5}\\) rad/s). For small oscillations in the horizontal plane, the Coriolis force produces a slow precession of the oscillation plane.</p>

<div class="env-block theorem">
<div class="env-title">Foucault Precession Rate</div>
<div class="env-body">
\\[\\Omega_{\\text{Foucault}} = -\\omega\\sin\\lambda\\]
<p>The pendulum's plane of oscillation rotates (as seen from above) at angular rate \\(\\omega\\sin\\lambda\\), clockwise in the Northern Hemisphere, counterclockwise in the Southern Hemisphere. At the poles (\\(\\lambda = 90^\\circ\\)), the plane completes a full rotation in one sidereal day. At the equator (\\(\\lambda = 0\\)), there is no precession.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why \\(\\sin\\lambda\\)?</div>
<div class="env-body">
<p>At the North Pole, the pendulum swings in a fixed plane while the Earth rotates underneath it; the plane appears to rotate once per day. At the equator, the Earth's rotation axis is horizontal, so there is no vertical component of \\(\\boldsymbol{\\omega}\\) to cause precession. At intermediate latitudes, only the vertical component \\(\\omega\\sin\\lambda\\) contributes.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-foucault"></div>

<div class="env-block example">
<div class="env-title">Example: Foucault Pendulum in Paris</div>
<div class="env-body">
<p>Paris is at latitude \\(\\lambda \\approx 48.9^\\circ\\). The precession rate is:</p>
\\[\\Omega = \\omega\\sin(48.9^\\circ) = 7.29\\times 10^{-5}\\times 0.754 = 5.49\\times 10^{-5}\\text{ rad/s}\\]
<p>The period of one full rotation of the pendulum plane is \\(T = 2\\pi/\\Omega \\approx 31.8\\) hours, or about 11.3 degrees per hour. This is exactly what Foucault observed.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Derivation Sketch</div>
<div class="env-body">
<p>For small horizontal displacements \\((x,y)\\) at latitude \\(\\lambda\\), the equations of motion in the rotating Earth frame are:</p>
\\[\\ddot{x} - 2\\omega\\sin\\lambda\\,\\dot{y} = -\\omega_0^2 x\\]
\\[\\ddot{y} + 2\\omega\\sin\\lambda\\,\\dot{x} = -\\omega_0^2 y\\]
<p>where \\(\\omega_0 = \\sqrt{g/L}\\) is the pendulum frequency. Defining \\(\\eta = x + iy\\), these combine into \\(\\ddot{\\eta} + 2i\\omega\\sin\\lambda\\,\\dot{\\eta} + \\omega_0^2\\eta = 0\\). Since \\(\\omega\\sin\\lambda \\ll \\omega_0\\), the solution is a fast oscillation at \\(\\approx \\omega_0\\) modulated by a slow precession at \\(\\omega\\sin\\lambda\\).</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-foucault',
                        title: 'Foucault Pendulum',
                        description: 'The pendulum swings while the Earth rotates beneath it. The green line marks the initial swing plane. Adjust <strong>latitude</strong> to see how the precession rate changes. Time is greatly accelerated.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            var cxp = w / 2, cyp = h / 2;

                            var latitude = 49;
                            var timeScale = 800;
                            var t = 0;

                            VizEngine.createSlider(controls, 'Latitude (\u00b0)', 0, 90, latitude, 1, function (v) { latitude = v; t = 0; });
                            VizEngine.createButton(controls, 'Reset', function () { t = 0; });

                            var pendR = Math.min(w, h) * 0.32;
                            var omega0 = 4;

                            function draw() {
                                viz.clear();
                                var dt = 0.016;
                                t += dt;

                                var omegaE = 7.29e-5;
                                var omegaV = omegaE * Math.sin(latitude * Math.PI / 180);
                                var precessionAngle = omegaV * t * timeScale;

                                // Pendulum oscillation
                                var swingAngle = Math.sin(omega0 * t * 8) * 0.95;
                                var px = swingAngle * Math.cos(precessionAngle);
                                var py = swingAngle * Math.sin(precessionAngle);

                                // Draw Earth disk (top-down view)
                                ctx.save();
                                ctx.strokeStyle = viz.colors.teal + '30';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(cxp, cyp, pendR + 30, 0, Math.PI * 2);
                                ctx.stroke();

                                // Earth rotation indicator
                                var earthAngle = omegaE * t * timeScale;
                                for (var i = 0; i < 12; i++) {
                                    var ea = earthAngle + i * Math.PI / 6;
                                    var er = pendR + 30;
                                    ctx.strokeStyle = viz.colors.grid + '44';
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath();
                                    ctx.moveTo(cxp + (er - 15) * Math.cos(ea), cyp - (er - 15) * Math.sin(ea));
                                    ctx.lineTo(cxp + er * Math.cos(ea), cyp - er * Math.sin(ea));
                                    ctx.stroke();
                                }
                                ctx.restore();

                                // Initial swing plane (fixed green line)
                                ctx.strokeStyle = viz.colors.green + '55';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath();
                                ctx.moveTo(cxp - pendR, cyp);
                                ctx.lineTo(cxp + pendR, cyp);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Current swing plane line
                                ctx.strokeStyle = viz.colors.blue + 'aa';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(cxp - pendR * Math.cos(precessionAngle), cyp + pendR * Math.sin(precessionAngle));
                                ctx.lineTo(cxp + pendR * Math.cos(precessionAngle), cyp - pendR * Math.sin(precessionAngle));
                                ctx.stroke();

                                // Pendulum bob trail
                                var trailLen = 200;
                                var trailDt = 0.003;
                                ctx.beginPath();
                                var first = true;
                                for (var j = 0; j < trailLen; j++) {
                                    var tt = t - j * trailDt;
                                    if (tt < 0) break;
                                    var pa = omegaV * tt * timeScale;
                                    var sa = Math.sin(omega0 * tt * 8) * 0.95;
                                    var tx = cxp + sa * Math.cos(pa) * pendR;
                                    var ty = cyp - sa * Math.sin(pa) * pendR;
                                    if (first) { ctx.moveTo(tx, ty); first = false; }
                                    else ctx.lineTo(tx, ty);
                                }
                                ctx.strokeStyle = viz.colors.orange + '55';
                                ctx.lineWidth = 1.5;
                                ctx.stroke();

                                // Pendulum bob
                                var bx = cxp + px * pendR;
                                var by = cyp - py * pendR;

                                // String
                                ctx.strokeStyle = viz.colors.white + '88';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(cxp, cyp);
                                ctx.lineTo(bx, by);
                                ctx.stroke();

                                // Bob glow
                                var grd = ctx.createRadialGradient(bx, by, 3, bx, by, 20);
                                grd.addColorStop(0, viz.colors.orange + '88');
                                grd.addColorStop(1, viz.colors.orange + '00');
                                ctx.fillStyle = grd;
                                ctx.beginPath(); ctx.arc(bx, by, 20, 0, Math.PI * 2); ctx.fill();

                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(bx, by, 8, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                                ctx.beginPath(); ctx.arc(bx - 2, by - 2, 3, 0, Math.PI * 2); ctx.fill();

                                // Pivot
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath(); ctx.arc(cxp, cyp, 4, 0, Math.PI * 2); ctx.fill();

                                // Precession angle arc
                                if (Math.abs(precessionAngle) > 0.02) {
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    var startA = 0;
                                    var endA = -precessionAngle;
                                    ctx.arc(cxp, cyp, 45, startA, endA, precessionAngle > 0);
                                    ctx.stroke();
                                }

                                // Info text
                                var degPerHr = (omegaV * 3600) * (180 / Math.PI);
                                viz.screenText('Latitude: ' + latitude + '\u00b0', 75, 20, viz.colors.white, 12, 'left');
                                viz.screenText('Precession: ' + degPerHr.toFixed(1) + '\u00b0/hr', 75, 38, viz.colors.yellow, 11, 'left');
                                var totalDeg = precessionAngle * 180 / Math.PI;
                                viz.screenText('Rotated: ' + totalDeg.toFixed(1) + '\u00b0', 75, 54, viz.colors.orange, 11, 'left');
                                viz.screenText('Top-down view (N pole up)', w / 2, h - 14, viz.colors.text, 10);

                                // Legend
                                ctx.fillStyle = viz.colors.green + '88';
                                ctx.fillRect(w - 155, 12, 12, 3);
                                viz.screenText('Initial plane', w - 135, 14, viz.colors.green, 10, 'left');
                                ctx.fillStyle = viz.colors.blue + 'cc';
                                ctx.fillRect(w - 155, 28, 12, 3);
                                viz.screenText('Current plane', w - 135, 30, viz.colors.blue, 10, 'left');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'How long does it take for the Foucault pendulum plane to rotate 360\\(^\\circ\\) at the South Pole? At latitude 30\\(^\\circ\\) N?',
                        hint: 'The period is \\(T = 2\\pi/(\\omega\\sin\\lambda)\\). At the pole, \\(\\lambda = 90^\\circ\\).',
                        solution: 'At the South Pole, \\(\\sin 90^\\circ = 1\\), so \\(T = 2\\pi/\\omega = 23.93\\) hours (one sidereal day). The rotation is counterclockwise (viewed from above the South Pole). At 30\\(^\\circ\\) N, \\(T = 2\\pi/(\\omega\\sin 30^\\circ) = 2\\pi/(\\omega \\cdot 0.5) = 47.9\\) hours \\(\\approx 2\\) sidereal days.'
                    },
                    {
                        question: 'Why is there no Foucault precession at the equator?',
                        hint: 'What is \\(\\sin 0^\\circ\\)?',
                        solution: 'At the equator, \\(\\lambda = 0\\) and \\(\\sin 0 = 0\\), so \\(\\Omega_{\\text{Foucault}} = \\omega \\sin 0 = 0\\). The vertical component of \\(\\boldsymbol{\\omega}\\) vanishes. The Coriolis force due to horizontal motion at the equator is purely vertical (it has no horizontal component to cause precession of the swing plane).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Weather Patterns & Geophysical Effects
            // ============================================================
            {
                id: 'weather-patterns',
                title: 'Weather & Geophysics',
                content: `
<h2>Coriolis Effects at Planetary Scale</h2>

<p>The most dramatic everyday consequence of the Coriolis force is the large-scale circulation of the atmosphere and oceans. Hurricanes, trade winds, and ocean gyres all owe their rotational structure to the Coriolis effect.</p>

<h3>Why Hurricanes Spin</h3>

<p>A low-pressure system draws air inward from surrounding regions. Without the Coriolis force, air would flow radially toward the center. But on the rotating Earth, the Coriolis force deflects this inward-flowing air: to the right in the Northern Hemisphere, to the left in the Southern Hemisphere.</p>

<div class="env-block theorem">
<div class="env-title">Hurricane Rotation Direction</div>
<div class="env-body">
<p>In the Northern Hemisphere, Coriolis deflection causes air flowing toward a low-pressure center to spiral <strong>counterclockwise</strong> (cyclonic). In the Southern Hemisphere, the spiral is <strong>clockwise</strong>. This is a direct consequence of \\(\\mathbf{F}_{\\text{Cor}} = -2m\\boldsymbol{\\omega}\\times\\mathbf{v}'\\) changing sign as the vertical component of \\(\\boldsymbol{\\omega}\\) reverses across the equator.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-hurricane"></div>

<div class="env-block intuition">
<div class="env-title">The Bathtub Myth</div>
<div class="env-body">
<p>It is widely claimed that water drains counterclockwise in the Northern Hemisphere and clockwise in the Southern Hemisphere. This is false for ordinary bathtubs. The Coriolis acceleration for water in a draining tub is roughly \\(10^{-5}\\) m/s\\(^2\\), far too small to compete with residual currents, basin asymmetry, or convective effects. The Coriolis force only dominates on scales of hundreds of kilometers and over many hours, as in weather systems.</p>
</div>
</div>

<h3>Other Geophysical Effects</h3>

<ul>
<li><strong>Trade winds:</strong> Air heated at the equator rises, flows poleward aloft, is deflected east by Coriolis, and returns at the surface deflected west, creating the easterlies (trade winds).</li>
<li><strong>Ekman spiral:</strong> Wind-driven ocean currents are deflected by Coriolis, each deeper layer deflecting further, creating a spiral of current directions with depth.</li>
<li><strong>Inertial oscillations:</strong> An object given an initial velocity on a rotating planet (with no other forces) traces circles in the rotating frame. The period is \\(T = 2\\pi/(2\\omega\\sin\\lambda) = \\pi/(\\omega\\sin\\lambda)\\), half the Foucault period.</li>
</ul>

<div class="env-block example">
<div class="env-title">Example: Coriolis Deflection of a Cannonball</div>
<div class="env-body">
<p>A cannonball is fired due north with speed \\(v = 500\\) m/s at latitude \\(\\lambda = 45^\\circ\\). The Coriolis acceleration is:</p>
\\[a_{\\text{Cor}} = 2\\omega v\\sin\\lambda = 2(7.29\\times 10^{-5})(500)(\\sin 45^\\circ) \\approx 0.052 \\text{ m/s}^2\\]
<p>Over a flight time of \\(t = 30\\) s, the eastward deflection is \\(\\frac{1}{2}a_{\\text{Cor}}t^2 \\approx 23\\) m. Small but militarily significant at long range, which motivated some of the earliest quantitative studies of the Coriolis force.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The Rossby Number</div>
<div class="env-body">
<p>The dimensionless <strong>Rossby number</strong> \\(\\text{Ro} = U/(fL)\\), where \\(f = 2\\omega\\sin\\lambda\\) and \\(U, L\\) are characteristic velocity and length scales, measures the importance of Coriolis relative to inertial effects. When \\(\\text{Ro} \\ll 1\\), Coriolis dominates (large-scale weather). When \\(\\text{Ro} \\gg 1\\), Coriolis is negligible (bathtubs, tornadoes).</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-hurricane',
                        title: 'Hurricane Rotation: Northern vs Southern Hemisphere',
                        description: 'Air parcels are drawn toward a low-pressure center. The Coriolis force deflects them, creating cyclonic rotation. Toggle hemispheres to see the direction reverse.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var hemisphere = 1; // 1 = North, -1 = South
                            var t = 0;

                            VizEngine.createButton(controls, 'Northern Hemisphere', function () { hemisphere = 1; resetParticles(); });
                            VizEngine.createButton(controls, 'Southern Hemisphere', function () { hemisphere = -1; resetParticles(); });
                            VizEngine.createButton(controls, 'Reset', function () { resetParticles(); });

                            var cxh = w / 2, cyh = h / 2;
                            var nPart = 40;
                            var particles = [];

                            function resetParticles() {
                                t = 0;
                                particles = [];
                                for (var i = 0; i < nPart; i++) {
                                    var angle = Math.random() * Math.PI * 2;
                                    var dist = 100 + Math.random() * 120;
                                    particles.push({
                                        x: cxh + dist * Math.cos(angle),
                                        y: cyh + dist * Math.sin(angle),
                                        trail: [],
                                        age: 0
                                    });
                                }
                            }
                            resetParticles();

                            function draw() {
                                viz.clear();
                                t += 0.016;

                                // Low-pressure center
                                var grad = ctx.createRadialGradient(cxh, cyh, 5, cxh, cyh, 80);
                                grad.addColorStop(0, viz.colors.blue + '44');
                                grad.addColorStop(1, viz.colors.blue + '00');
                                ctx.fillStyle = grad;
                                ctx.beginPath(); ctx.arc(cxh, cyh, 80, 0, Math.PI * 2); ctx.fill();

                                viz.screenText('L', cxh, cyh, viz.colors.blue, 22);

                                // Update particles
                                var inwardStrength = 30;
                                var coriolisStrength = 40 * hemisphere;

                                for (var i = 0; i < particles.length; i++) {
                                    var p = particles[i];
                                    var dx = cxh - p.x;
                                    var dy = cyh - p.y;
                                    var dist = Math.sqrt(dx * dx + dy * dy);
                                    if (dist < 1) dist = 1;

                                    // Inward pressure gradient force
                                    var fx = inwardStrength * dx / dist;
                                    var fy = inwardStrength * dy / dist;

                                    // Coriolis: deflect velocity perpendicular
                                    // In 2D top-down: F_cor ~ -2*omega*sign * (v cross z)
                                    // For velocity (vx, vy), Coriolis gives (-sign*vy, sign*vx)
                                    var vx = fx;
                                    var vy = fy;
                                    var corX = -coriolisStrength * vy / dist * 3;
                                    var corY = coriolisStrength * vx / dist * 3;

                                    var totalFx = fx + corX;
                                    var totalFy = fy + corY;

                                    var speed = 0.7;
                                    var mag = Math.sqrt(totalFx * totalFx + totalFy * totalFy);
                                    if (mag > 0) {
                                        p.x += speed * totalFx / mag;
                                        p.y += speed * totalFy / mag;
                                    }

                                    p.trail.push([p.x, p.y]);
                                    if (p.trail.length > 120) p.trail.shift();
                                    p.age += 0.016;

                                    // Respawn if too close or too old
                                    if (dist < 15 || p.age > 6) {
                                        var angle = Math.random() * Math.PI * 2;
                                        var rd = 110 + Math.random() * 110;
                                        p.x = cxh + rd * Math.cos(angle);
                                        p.y = cyh + rd * Math.sin(angle);
                                        p.trail = [];
                                        p.age = 0;
                                    }
                                }

                                // Draw trails
                                for (var j = 0; j < particles.length; j++) {
                                    var tr = particles[j].trail;
                                    if (tr.length < 2) continue;
                                    for (var k = 1; k < tr.length; k++) {
                                        var alpha = k / tr.length * 0.6;
                                        ctx.strokeStyle = viz.colors.cyan;
                                        ctx.globalAlpha = alpha;
                                        ctx.lineWidth = 1 + (k / tr.length);
                                        ctx.beginPath();
                                        ctx.moveTo(tr[k - 1][0], tr[k - 1][1]);
                                        ctx.lineTo(tr[k][0], tr[k][1]);
                                        ctx.stroke();
                                    }
                                }
                                ctx.globalAlpha = 1;

                                // Draw particles
                                for (var m = 0; m < particles.length; m++) {
                                    ctx.fillStyle = viz.colors.white;
                                    ctx.beginPath();
                                    ctx.arc(particles[m].x, particles[m].y, 2.5, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Rotation arrow
                                var arrowR = 38;
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 2.5;
                                var startAngle = -Math.PI / 3;
                                var endAngle = Math.PI / 3;
                                if (hemisphere === 1) {
                                    // CCW arrow
                                    ctx.beginPath();
                                    ctx.arc(cxh, cyh, arrowR, startAngle, endAngle);
                                    ctx.stroke();
                                    var ax = cxh + arrowR * Math.cos(endAngle);
                                    var ay = cyh + arrowR * Math.sin(endAngle);
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.beginPath();
                                    ctx.moveTo(ax - 4, ay - 8);
                                    ctx.lineTo(ax + 6, ay);
                                    ctx.lineTo(ax - 4, ay + 3);
                                    ctx.fill();
                                } else {
                                    // CW arrow
                                    ctx.beginPath();
                                    ctx.arc(cxh, cyh, arrowR, -endAngle, -startAngle);
                                    ctx.stroke();
                                    var ax2 = cxh + arrowR * Math.cos(-startAngle);
                                    var ay2 = cyh + arrowR * Math.sin(-startAngle);
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.beginPath();
                                    ctx.moveTo(ax2 + 4, ay2 + 3);
                                    ctx.lineTo(ax2 - 6, ay2 - 5);
                                    ctx.lineTo(ax2 + 4, ay2 - 8);
                                    ctx.fill();
                                }

                                // Labels
                                var hemiLabel = hemisphere === 1 ? 'Northern Hemisphere' : 'Southern Hemisphere';
                                var dirLabel = hemisphere === 1 ? 'Counterclockwise (Cyclonic)' : 'Clockwise (Cyclonic)';
                                viz.screenText(hemiLabel, w / 2, 18, viz.colors.white, 14);
                                viz.screenText(dirLabel, w / 2, h - 14, viz.colors.yellow, 12);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Estimate the Rossby number for (a) a hurricane (\\(U \\sim 50\\) m/s, \\(L \\sim 500\\) km, \\(\\lambda = 20^\\circ\\)) and (b) a tornado (\\(U \\sim 100\\) m/s, \\(L \\sim 300\\) m, \\(\\lambda = 35^\\circ\\)). In which case does Coriolis matter?',
                        hint: 'Compute \\(f = 2\\omega\\sin\\lambda\\) first, then \\(\\text{Ro} = U/(fL)\\).',
                        solution: '(a) \\(f = 2(7.29\\times 10^{-5})\\sin 20^\\circ = 4.99\\times 10^{-5}\\) s\\(^{-1}\\). \\(\\text{Ro} = 50/(4.99\\times 10^{-5}\\times 5\\times 10^5) = 2.0\\). Ro is order unity, so Coriolis is important but not completely dominant. (b) \\(f = 2(7.29\\times 10^{-5})\\sin 35^\\circ = 8.36\\times 10^{-5}\\) s\\(^{-1}\\). \\(\\text{Ro} = 100/(8.36\\times 10^{-5}\\times 300) \\approx 4000\\). Ro \\(\\gg 1\\), so Coriolis is utterly negligible for tornadoes. Tornado rotation comes from wind shear and updrafts, not Coriolis.'
                    },
                    {
                        question: 'A projectile is fired due east at the equator. Is there a Coriolis deflection? If so, in which direction?',
                        hint: 'At the equator, \\(\\boldsymbol{\\omega}\\) is horizontal (pointing north). Compute \\(-2m\\boldsymbol{\\omega}\\times\\mathbf{v}\'\\) with \\(\\mathbf{v}\'\\) pointing east.',
                        solution: 'Yes. At the equator, \\(\\boldsymbol{\\omega} = \\omega\\hat{N}\\) (pointing north along the axis). For \\(\\mathbf{v}\' = v\\hat{E}\\) (eastward), the Coriolis force is \\(-2m\\omega\\hat{N}\\times v\\hat{E} = -2m\\omega v(\\hat{N}\\times\\hat{E})\\). Since \\(\\hat{N}\\times\\hat{E} = -\\hat{\\text{up}}\\) (using right-hand rule: north cross east points downward), the force is \\(+2m\\omega v\\hat{\\text{up}}\\). Wait, recomputing: actually \\(\\hat{N}\\times\\hat{E}\\) depends on convention. Using local coordinates at the equator where \\(\\hat{z}\\) is up, \\(\\hat{x}\\) is east, \\(\\hat{y}\\) is north, \\(\\boldsymbol{\\omega} = \\omega\\hat{y}\\), \\(\\mathbf{v}\' = v\\hat{x}\\). Then \\(\\boldsymbol{\\omega}\\times\\mathbf{v}\' = \\omega v(\\hat{y}\\times\\hat{x}) = -\\omega v\\hat{z}\\). The Coriolis force is \\(-2m(-\\omega v\\hat{z}) = 2m\\omega v\\hat{z}\\), pointing upward. An eastward-moving projectile at the equator is deflected upward (it feels lighter). This is a small effect: the deflection is vertically upward, reducing the effective gravity.'
                    }
                ]
            }
        ]
    });
})();
