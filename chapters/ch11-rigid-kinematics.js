// === Chapter 11: Rigid Body Kinematics ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch11',
        number: 11,
        title: 'Rigid Body Kinematics',
        subtitle: 'Angular velocity, instantaneous axes, and the geometry of rotation',
        file: 'ch11-rigid-kinematics',

        sections: [
            // ============================================================
            // Section 0: What Is a Rigid Body?
            // ============================================================
            {
                id: 'rigid-body-definition',
                title: 'What Is a Rigid Body?',
                content: `
<h2>The Rigidity Constraint</h2>

<p>Until now, we have treated objects as point particles. Real objects are extended, and when they rotate, different parts have different velocities. A <strong>rigid body</strong> is an idealization in which the distance between any two points is fixed. This constraint dramatically reduces the degrees of freedom.</p>

<div class="env-block definition">
<div class="env-title">Definition: Rigid Body</div>
<div class="env-body">
<p>A <strong>rigid body</strong> is a system of particles with the constraint that for every pair of particles \\(i, j\\):</p>
\\[|\\mathbf{r}_i - \\mathbf{r}_j| = \\text{constant for all time}.\\]
<p>Equivalently, the body does not deform: no stretching, compressing, or shearing.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: Degrees of Freedom</div>
<div class="env-body">
<p>A rigid body in 3D has <strong>6 degrees of freedom</strong>: 3 translational (position of a reference point, e.g., the CM) and 3 rotational (orientation). To specify the orientation, we need 3 angles (e.g., Euler angles). In 2D, a rigid body has 3 degrees of freedom: 2 translational and 1 rotational.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Why 6, Not \\(3N\\)?</div>
<div class="env-body">
<p>A system of \\(N\\) particles in 3D has \\(3N\\) degrees of freedom. Adding the rigidity constraints removes all but 6. For \\(N = 3\\) non-collinear particles, there are \\(3 \\times 3 = 9\\) coordinates and \\(3\\) distance constraints, leaving \\(6\\). For \\(N > 3\\), additional particles add 3 coordinates each but also 3 independent constraints (distance to 3 non-collinear existing points), so the total stays at 6.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Chasles' Theorem (1830)</div>
<div class="env-body">
<p>The most general displacement of a rigid body is a <strong>screw motion</strong>: a rotation about some axis combined with a translation along that axis. Special cases: pure translation (rotation angle = 0), pure rotation (translation = 0). In 2D, the general displacement is either a pure translation or a rotation about some point.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Separating Translation and Rotation</div>
<div class="env-body">
<p>The motion of a rigid body can always be decomposed into (1) the translation of the center of mass, and (2) rotation about the center of mass. This decomposition is unique and extremely useful: the CM moves according to \\(M\\mathbf{a}_{\\text{cm}} = \\mathbf{F}_{\\text{ext}}\\) (as if the body were a point particle), and the rotation obeys a separate dynamical equation (torque = rate of change of angular momentum). We treat the rotation kinematics in this chapter and the dynamics in Chapters 12-14.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A molecule of 4 atoms (not all coplanar) moves freely in 3D. How many degrees of freedom does it have as (a) 4 free particles, (b) a rigid body?',
                        hint: 'For (a), each atom has 3 DOF. For (b), use the rigid body count.',
                        solution: '(a) \\(4 \\times 3 = 12\\) DOF. (b) As a rigid body (non-coplanar, so a full 3D object): 6 DOF. The remaining \\(12 - 6 = 6\\) DOF correspond to internal vibrations (which is exactly \\(3N - 6\\) for a non-linear molecule).'
                    }
                ]
            },

            // ============================================================
            // Section 1: Angular Velocity Vector
            // ============================================================
            {
                id: 'angular-velocity',
                title: 'The Angular Velocity Vector',
                content: `
<h2>Angular Velocity as a Vector</h2>

<p>For rotation about a fixed axis, we defined angular velocity \\(\\omega = d\\theta/dt\\). But in three dimensions, the axis of rotation can point in any direction, so angular velocity must be a <strong>vector</strong> \\(\\boldsymbol{\\omega}\\).</p>

<div class="env-block definition">
<div class="env-title">Definition: Angular Velocity Vector</div>
<div class="env-body">
<p>The <strong>angular velocity vector</strong> \\(\\boldsymbol{\\omega}\\) points along the instantaneous axis of rotation (by the right-hand rule) and has magnitude \\(|\\boldsymbol{\\omega}| = d\\theta/dt\\). The velocity of any point \\(P\\) in the rigid body relative to the base point \\(O\\) is:</p>
\\[\\mathbf{v}_P = \\boldsymbol{\\omega} \\times \\mathbf{r}_{OP}\\]
<p>where \\(\\mathbf{r}_{OP}\\) is the position vector from \\(O\\) to \\(P\\).</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: Velocity of a Point in a Rigid Body</div>
<div class="env-body">
<p>For a rigid body with CM velocity \\(\\mathbf{V}_{\\text{cm}}\\) and angular velocity \\(\\boldsymbol{\\omega}\\), the velocity of any point \\(P\\) is:</p>
\\[\\mathbf{v}_P = \\mathbf{V}_{\\text{cm}} + \\boldsymbol{\\omega} \\times \\mathbf{r}'_P\\]
<p>where \\(\\mathbf{r}'_P\\) is the position of \\(P\\) relative to the CM.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Finite Rotations Do Not Commute</div>
<div class="env-body">
<p>Although \\(\\boldsymbol{\\omega}\\) is a vector and <em>infinitesimal</em> rotations add like vectors (\\(d\\boldsymbol{\\theta}_1 + d\\boldsymbol{\\theta}_2 = d\\boldsymbol{\\theta}_{\\text{total}}\\)), <em>finite</em> rotations do not commute. Rotating \\(90^\\circ\\) about \\(x\\) then \\(90^\\circ\\) about \\(z\\) gives a different final orientation than \\(90^\\circ\\) about \\(z\\) then \\(90^\\circ\\) about \\(x\\). This is why rotations are described by matrices (or quaternions), not simple vectors. The vector nature of \\(\\boldsymbol{\\omega}\\) works only because it describes an <em>instantaneous</em> (infinitesimal) rate.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-omega-vector"></div>

<div class="env-block example">
<div class="env-title">Example: Spinning Top</div>
<div class="env-body">
<p>A top spins about its symmetry axis at \\(\\omega_s = 100\\) rad/s while that axis precesses about the vertical at \\(\\omega_p = 2\\) rad/s. The total angular velocity is:</p>
\\[\\boldsymbol{\\omega} = \\omega_s \\hat{\\mathbf{e}}_3 + \\omega_p \\hat{\\mathbf{z}}\\]
<p>where \\(\\hat{\\mathbf{e}}_3\\) is the symmetry axis and \\(\\hat{\\mathbf{z}}\\) is vertical. Since \\(\\omega_s \\gg \\omega_p\\), \\(\\boldsymbol{\\omega}\\) points nearly along the symmetry axis.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-omega-vector',
                        title: 'Rigid Body with Angular Velocity Vector',
                        description: 'A rigid body (rectangle) rotates about an axis through its center. The <strong>green arrow</strong> shows \\(\\boldsymbol{\\omega}\\). Individual point velocities \\(\\mathbf{v} = \\boldsymbol{\\omega} \\times \\mathbf{r}\\) are shown in blue. Adjust \\(\\omega\\) with the slider.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 250, originY: 200 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var omega = 1.5;
                            var theta = 0;

                            VizEngine.createSlider(controls, '\u03C9 (rad/s)', -4, 4, omega, 0.1, function (v) { omega = v; });

                            // Body: rectangle vertices in body frame
                            var bodyPts = [
                                [-2, -1], [2, -1], [2, 1], [-2, 1]
                            ];
                            // Sample points on body for velocity arrows
                            var samplePts = [
                                [2, 1], [2, -1], [-2, 1], [-2, -1],
                                [2, 0], [-2, 0], [0, 1], [0, -1],
                                [1, 0.5], [-1, -0.5]
                            ];

                            var lastTime = null;
                            function draw(timestamp) {
                                if (!lastTime) lastTime = timestamp;
                                var dt = Math.min((timestamp - lastTime) / 1000, 0.05);
                                lastTime = timestamp;

                                theta += omega * dt;

                                function rotate(x, y) {
                                    var c = Math.cos(theta), s = Math.sin(theta);
                                    return [x * c - y * s, x * s + y * c];
                                }

                                viz.clear();
                                viz.drawGrid(1);
                                viz.drawAxes('x', 'y');

                                // Draw rotation center
                                viz.drawPoint(0, 0, viz.colors.white, 'O', 4);

                                // Draw body
                                var rotated = bodyPts.map(function (p) { return rotate(p[0], p[1]); });
                                ctx.fillStyle = viz.colors.purple + '30';
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                rotated.forEach(function (p, i) {
                                    var s = viz.toScreen(p[0], p[1]);
                                    if (i === 0) ctx.moveTo(s[0], s[1]);
                                    else ctx.lineTo(s[0], s[1]);
                                });
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();

                                // Mark a reference corner
                                var refPt = rotate(2, 1);
                                viz.drawPoint(refPt[0], refPt[1], viz.colors.orange, 'P', 4);

                                // Draw velocity vectors at sample points
                                var velScale = 0.3;
                                for (var i = 0; i < samplePts.length; i++) {
                                    var sp = samplePts[i];
                                    var rp = rotate(sp[0], sp[1]);
                                    // v = omega cross r (in 2D: v = omega * (-y, x))
                                    var vx = -omega * rp[1] * velScale;
                                    var vy = omega * rp[0] * velScale;
                                    if (Math.abs(vx) + Math.abs(vy) > 0.05) {
                                        viz.drawVector(rp[0], rp[1], vx, vy, viz.colors.blue, null, 1.5, 6);
                                    }
                                }

                                // Draw omega vector (out of screen, show as circle with dot or cross)
                                var omegaScreenX = w - 80, omegaScreenY = 50;
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(omegaScreenX, omegaScreenY, 18, 0, Math.PI * 2);
                                ctx.stroke();

                                if (omega > 0) {
                                    // Dot (out of screen)
                                    ctx.fillStyle = viz.colors.green;
                                    ctx.beginPath();
                                    ctx.arc(omegaScreenX, omegaScreenY, 4, 0, Math.PI * 2);
                                    ctx.fill();
                                    viz.screenText('\u03C9 \u2299 (out)', omegaScreenX, omegaScreenY + 30, viz.colors.green, 10);
                                } else if (omega < 0) {
                                    // Cross (into screen)
                                    ctx.strokeStyle = viz.colors.green;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(omegaScreenX - 8, omegaScreenY - 8);
                                    ctx.lineTo(omegaScreenX + 8, omegaScreenY + 8);
                                    ctx.moveTo(omegaScreenX + 8, omegaScreenY - 8);
                                    ctx.lineTo(omegaScreenX - 8, omegaScreenY + 8);
                                    ctx.stroke();
                                    viz.screenText('\u03C9 \u2297 (in)', omegaScreenX, omegaScreenY + 30, viz.colors.green, 10);
                                } else {
                                    viz.screenText('\u03C9 = 0', omegaScreenX, omegaScreenY + 30, viz.colors.text, 10);
                                }

                                // Info
                                viz.screenText('\u03C9 = ' + omega.toFixed(2) + ' rad/s', w / 2, h - 12, viz.colors.green, 12);
                                viz.screenText('v = \u03C9 \u00D7 r', 60, h - 12, viz.colors.blue, 11);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A disk of radius \\(R = 0.5\\) m rotates about its center at \\(\\omega = 10\\) rad/s. What is the velocity of a point on the rim? What about a point at \\(r = R/2\\)?',
                        hint: 'Use \\(v = \\omega r\\) for the magnitude of \\(\\mathbf{v} = \\boldsymbol{\\omega} \\times \\mathbf{r}\\).',
                        solution: 'On the rim: \\(v = \\omega R = 10 \\times 0.5 = 5\\) m/s. At \\(r = R/2\\): \\(v = 10 \\times 0.25 = 2.5\\) m/s. The velocity is tangential and proportional to the distance from the axis.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Instantaneous Axis of Rotation
            // ============================================================
            {
                id: 'instantaneous-axis',
                title: 'Instantaneous Axis of Rotation',
                content: `
<h2>The Point That Doesn't Move</h2>

<p>At any instant, the general 2D motion of a rigid body (excluding pure translation) can be described as a rotation about a single point called the <strong>instantaneous center of rotation</strong> (or instantaneous axis in 3D). This is a powerful kinematic tool.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Existence of the Instantaneous Center (2D)</div>
<div class="env-body">
<p>For any planar rigid body motion that is not a pure translation, there exists a unique point \\(I\\) (the <strong>instantaneous center</strong>) with zero velocity at that instant. Every point in the body instantaneously moves in a circle centered at \\(I\\).</p>
<p>If the velocity of any point \\(A\\) is \\(\\mathbf{v}_A\\), then \\(I\\) lies along the line perpendicular to \\(\\mathbf{v}_A\\) through \\(A\\), at a distance \\(d = |\\mathbf{v}_A|/|\\omega|\\) from \\(A\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Rolling Wheel</div>
<div class="env-body">
<p>For a wheel rolling without slipping, the contact point \\(C\\) has zero velocity (it is momentarily at rest on the ground). Therefore \\(C\\) is the instantaneous center. Every point on the wheel moves in a circle centered at \\(C\\). The top of the wheel, being at distance \\(2R\\) from \\(C\\), has speed \\(v_{\\text{top}} = \\omega \\cdot 2R = 2v_{\\text{cm}}\\). The center has speed \\(v_{\\text{cm}} = \\omega R\\).</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Finding the Instantaneous Center</div>
<div class="env-body">
<p>To find \\(I\\) geometrically: take any two points whose velocities you know. Draw the perpendicular to each velocity vector through its point. The intersection is \\(I\\). (If the velocities are parallel but unequal, \\(I\\) is at the intersection of lines connecting corresponding velocity endpoints.)</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-rolling-wheel"></div>

<div class="env-block remark">
<div class="env-title">The Instantaneous Center Moves</div>
<div class="env-body">
<p>The instantaneous center is generally not a fixed point. It moves as the body moves. For a rolling wheel, the contact point changes continuously. The locus of all instantaneous centers in the fixed frame is called the <strong>space centrode</strong>; in the body frame, the <strong>body centrode</strong>. The body centrode rolls on the space centrode without slipping, which gives a beautiful geometric picture of rigid body motion.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-rolling-wheel',
                        title: 'Rolling Wheel: Contact Point Velocity = 0',
                        description: 'A wheel rolls without slipping. The <strong>red dot</strong> marks the contact point (instantaneous center), which has zero velocity. Velocity vectors are shown at several points. Notice the top moves at \\(2v_{\\text{cm}}\\) and the contact point is stationary.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, {
                                scale: 55,
                                originX: 80,
                                originY: 280
                            });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var R = 1.5;
                            var omega = 1.5;
                            var theta = 0;
                            var cx = 0; // center x
                            var showTrail = true;
                            var trailPt = []; // cycloidal trail for a rim point

                            VizEngine.createSlider(controls, '\u03C9 (rad/s)', 0, 4, omega, 0.1, function (v) { omega = v; });
                            VizEngine.createButton(controls, 'Toggle Cycloid Trail', function () {
                                showTrail = !showTrail;
                                if (!showTrail) trailPt = [];
                            });
                            VizEngine.createButton(controls, 'Reset', function () {
                                theta = 0;
                                cx = 0;
                                trailPt = [];
                            });

                            var lastTime = null;
                            function draw(timestamp) {
                                if (!lastTime) lastTime = timestamp;
                                var dt = Math.min((timestamp - lastTime) / 1000, 0.05);
                                lastTime = timestamp;

                                theta += omega * dt;
                                cx += omega * R * dt;

                                // Track a point on the rim (the one that starts at the bottom)
                                var trackAngle = -Math.PI / 2 - theta;
                                var trackX = cx + R * Math.cos(trackAngle);
                                var trackY = R + R * Math.sin(trackAngle);
                                if (showTrail) {
                                    trailPt.push([trackX, trackY]);
                                    if (trailPt.length > 2000) trailPt.shift();
                                }

                                // Reset when off screen
                                if (cx > (w - viz.originX) / viz.scale + 2) {
                                    cx = -(viz.originX) / viz.scale - 2;
                                    trailPt = [];
                                }

                                viz.clear();

                                // Ground
                                viz.drawGround(0, viz.colors.text);

                                // Cycloid trail
                                if (showTrail && trailPt.length > 1) {
                                    viz.drawTrail(trailPt, viz.colors.pink, 0.5);
                                }

                                // Wheel
                                var centerY = R;
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2;
                                var sc = viz.toScreen(cx, centerY);
                                ctx.beginPath();
                                ctx.arc(sc[0], sc[1], R * viz.scale, 0, Math.PI * 2);
                                ctx.stroke();

                                // Spokes
                                var nSpokes = 8;
                                for (var si = 0; si < nSpokes; si++) {
                                    var spokeAngle = theta + (si / nSpokes) * 2 * Math.PI;
                                    var sx1 = cx, sy1 = centerY;
                                    var sx2 = cx + R * Math.cos(spokeAngle);
                                    var sy2 = centerY + R * Math.sin(spokeAngle);
                                    viz.drawSegment(sx1, sy1, sx2, sy2, viz.colors.purple + '66', 1);
                                }

                                // Center dot
                                viz.drawPoint(cx, centerY, viz.colors.white, 'C', 4);

                                // Contact point (instantaneous center)
                                viz.drawPoint(cx, 0, viz.colors.red, 'I (v=0)', 6);

                                // Top point
                                viz.drawPoint(cx, 2 * R, viz.colors.orange, 'Top', 4);

                                // Tracked rim point
                                viz.drawBall(trackX, trackY, 0.08, viz.colors.pink, 1.5);

                                // Velocity vectors
                                var velScale = 0.35;
                                // Center velocity: v = omega * R, rightward
                                var vCm = omega * R * velScale;
                                if (vCm > 0.05) {
                                    viz.drawVector(cx, centerY, vCm, 0, viz.colors.cyan, 'v_cm', 2, 8);
                                }
                                // Top velocity: 2 * v_cm
                                var vTop = 2 * omega * R * velScale;
                                if (vTop > 0.05) {
                                    viz.drawVector(cx, 2 * R, vTop, 0, viz.colors.orange, '2v_cm', 2, 8);
                                }

                                // Velocity at a few rim points
                                var rimAngles = [0, Math.PI / 2, Math.PI, -Math.PI / 4, Math.PI / 4 * 3];
                                for (var ri = 0; ri < rimAngles.length; ri++) {
                                    var ra = rimAngles[ri] + theta;
                                    var rpx = cx + R * Math.cos(ra);
                                    var rpy = centerY + R * Math.sin(ra);
                                    // v = omega cross r_from_contact
                                    // r_from_contact = (rpx - cx, rpy - 0)
                                    var rvx = -omega * (rpy - 0) * velScale;
                                    var rvy = omega * (rpx - cx) * velScale;
                                    if (Math.abs(rvx) + Math.abs(rvy) > 0.05) {
                                        viz.drawVector(rpx, rpy, rvx, rvy, viz.colors.blue + '99', null, 1.2, 5);
                                    }
                                }

                                // Lines from I to a few points (showing circular arcs)
                                ctx.strokeStyle = viz.colors.red + '33';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                var pts2 = [[cx, centerY], [cx, 2 * R]];
                                for (var li = 0; li < pts2.length; li++) {
                                    var ls1 = viz.toScreen(cx, 0);
                                    var ls2 = viz.toScreen(pts2[li][0], pts2[li][1]);
                                    ctx.beginPath();
                                    ctx.moveTo(ls1[0], ls1[1]);
                                    ctx.lineTo(ls2[0], ls2[1]);
                                    ctx.stroke();
                                }
                                ctx.setLineDash([]);

                                // Labels
                                viz.screenText('\u03C9 = ' + omega.toFixed(2) + ' rad/s', w / 2, 16, viz.colors.green, 12);
                                viz.screenText('Rolling constraint: v_cm = \u03C9R', w / 2, h - 10, viz.colors.text, 10);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A wheel of radius \\(R\\) rolls without slipping at speed \\(v\\). Find the velocity of the point at the very back of the wheel (the point diametrically opposite to the direction of travel, at the same height as the center).',
                        hint: 'This point is at distance \\(R\\) from the contact point (instantaneous center). What direction is the velocity?',
                        solution: 'The point at the back is at position \\((-R, R)\\) relative to the contact point \\(I\\). Its distance from \\(I\\) is \\(\\sqrt{R^2 + R^2} = R\\sqrt{2}\\). Its speed is \\(\\omega \\cdot R\\sqrt{2} = v\\sqrt{2}\\). The velocity direction is perpendicular to the line from \\(I\\), pointing upward and forward (at 45 degrees above horizontal). So \\(\\mathbf{v} = (v, v)\\) in the \\((\\text{forward}, \\text{up})\\) basis, with magnitude \\(v\\sqrt{2}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Euler Angles (Preview)
            // ============================================================
            {
                id: 'euler-angles',
                title: 'Euler Angles (Preview)',
                content: `
<h2>Parameterizing 3D Rotations</h2>

<p>In 2D, a single angle \\(\\theta\\) specifies the orientation of a rigid body. In 3D, we need three parameters. The most common choice is the <strong>Euler angles</strong> \\((\\phi, \\theta, \\psi)\\), though other conventions exist (Tait-Bryan angles, quaternions, rotation matrices).</p>

<div class="env-block definition">
<div class="env-title">Definition: Euler Angles (\\(zxz\\) Convention)</div>
<div class="env-body">
<p>The orientation of a rigid body is specified by three successive rotations from a reference orientation:</p>
<ol>
<li>Rotate by \\(\\phi\\) about the space-fixed \\(z\\)-axis (precession).</li>
<li>Rotate by \\(\\theta\\) about the new \\(x'\\)-axis (nutation).</li>
<li>Rotate by \\(\\psi\\) about the new \\(z''\\)-axis (spin).</li>
</ol>
<p>The ranges are typically \\(0 \\le \\phi < 2\\pi\\), \\(0 \\le \\theta \\le \\pi\\), \\(0 \\le \\psi < 2\\pi\\).</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Angular Velocity in Terms of Euler Angles</div>
<div class="env-body">
<p>The angular velocity vector expressed in the body frame is:</p>
\\[\\boldsymbol{\\omega} = (\\dot{\\phi}\\sin\\theta\\sin\\psi + \\dot{\\theta}\\cos\\psi)\\,\\hat{\\mathbf{e}}_1 + (\\dot{\\phi}\\sin\\theta\\cos\\psi - \\dot{\\theta}\\sin\\psi)\\,\\hat{\\mathbf{e}}_2 + (\\dot{\\phi}\\cos\\theta + \\dot{\\psi})\\,\\hat{\\mathbf{e}}_3\\]
<p>where \\(\\hat{\\mathbf{e}}_1, \\hat{\\mathbf{e}}_2, \\hat{\\mathbf{e}}_3\\) are the body-frame axes.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Gimbal Lock</div>
<div class="env-body">
<p>Euler angles suffer from <strong>gimbal lock</strong> at \\(\\theta = 0\\) or \\(\\theta = \\pi\\): the first and third rotations become indistinguishable (they both rotate about \\(z\\)), so \\(\\phi\\) and \\(\\psi\\) are not independently defined. This is a coordinate singularity, not a physical one. For numerical work (robotics, spacecraft, game engines), <strong>quaternions</strong> avoid gimbal lock entirely and are the preferred parameterization.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Rotation Matrices and Lie Groups</div>
<div class="env-body">
<p>A rotation in 3D is represented by a \\(3 \\times 3\\) orthogonal matrix \\(R\\) with \\(\\det R = +1\\). The set of all such matrices forms the group \\(\\text{SO}(3)\\), the <strong>special orthogonal group</strong> in three dimensions. This is a 3-dimensional Lie group, which is why three parameters (Euler angles) suffice. The angular velocity \\(\\boldsymbol{\\omega}\\) lives in the Lie algebra \\(\\mathfrak{so}(3)\\), which is isomorphic to \\(\\mathbb{R}^3\\) with the cross product. This algebraic structure underpins all of rotational mechanics.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Symmetric Top</div>
<div class="env-body">
<p>For an axially symmetric top, the Euler angle \\(\\psi\\) represents spin about the symmetry axis, \\(\\theta\\) is the tilt from vertical, and \\(\\phi\\) is the precession about the vertical. If the top spins fast (\\(\\dot{\\psi} \\gg \\dot{\\phi}\\)), the angular velocity is approximately \\(\\boldsymbol{\\omega} \\approx \\dot{\\psi}\\,\\hat{\\mathbf{e}}_3\\) (pointing along the symmetry axis). The precession and nutation are slow modulations on top of the fast spin.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Show that for \\(\\theta = 0\\), the angular velocity depends only on \\(\\dot{\\phi} + \\dot{\\psi}\\), not on \\(\\dot{\\phi}\\) and \\(\\dot{\\psi}\\) individually. Why does this represent a loss of one degree of freedom?',
                        hint: 'Substitute \\(\\theta = 0\\) into the expression for \\(\\boldsymbol{\\omega}\\) in terms of Euler angles.',
                        solution: 'At \\(\\theta = 0\\): \\(\\sin\\theta = 0\\), so \\(\\omega_1 = \\dot{\\theta}\\cos\\psi\\), \\(\\omega_2 = -\\dot{\\theta}\\sin\\psi\\), \\(\\omega_3 = \\dot{\\phi} + \\dot{\\psi}\\). The third component depends only on the sum \\(\\dot{\\phi} + \\dot{\\psi}\\). If \\(\\dot{\\theta} = 0\\) also, then \\(\\boldsymbol{\\omega} = (\\dot{\\phi} + \\dot{\\psi})\\hat{\\mathbf{e}}_3\\), fully determined by one number. We cannot independently determine \\(\\phi\\) and \\(\\psi\\); they are degenerate. The two "separate" rotations about the same axis collapse into one. This is gimbal lock.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Rolling Constraints and Applications
            // ============================================================
            {
                id: 'rolling-constraints',
                title: 'Rolling Constraints',
                content: `
<h2>Rolling Without Slipping</h2>

<p>The <strong>rolling constraint</strong> is the most important constraint in rigid body kinematics. It relates the translational and rotational motion by requiring that the contact point has zero velocity relative to the surface.</p>

<div class="env-block definition">
<div class="env-title">Definition: Rolling Without Slipping</div>
<div class="env-body">
<p>A rigid body <strong>rolls without slipping</strong> on a surface if the velocity of the contact point is zero (or equals the surface velocity if the surface moves). For a circle/sphere of radius \\(R\\) rolling on a flat surface:</p>
\\[v_{\\text{cm}} = R\\omega\\]
<p>and upon differentiation:</p>
\\[a_{\\text{cm}} = R\\alpha\\]
<p>where \\(\\alpha = d\\omega/dt\\) is the angular acceleration.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: Velocity of Any Point on a Rolling Body</div>
<div class="env-body">
<p>For a wheel of radius \\(R\\) rolling at speed \\(v = \\omega R\\), the velocity of a point at angle \\(\\phi\\) from the bottom (measured from center) is:</p>
\\[v_x = v(1 - \\cos\\phi), \\quad v_y = v\\sin\\phi.\\]
<p>The speed is \\(|\\mathbf{v}| = 2v\\sin(\\phi/2)\\). At the bottom (\\(\\phi = 0\\)): \\(|\\mathbf{v}| = 0\\). At the top (\\(\\phi = \\pi\\)): \\(|\\mathbf{v}| = 2v\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Cone Rolling on a Table</div>
<div class="env-body">
<p>A cone of half-angle \\(\\alpha\\) rolls without slipping on a horizontal table with its apex fixed at the origin. The contact line rotates about the vertical axis. If the cone's symmetry axis makes angle \\(\\alpha\\) with the table and precesses at rate \\(\\Omega\\), the angular velocity has two components:</p>
<ul>
<li><strong>Spin</strong> about the cone axis: \\(\\omega_s\\)</li>
<li><strong>Precession</strong> about the vertical: \\(\\Omega\\)</li>
</ul>
<p>The rolling constraint requires \\(\\omega_s = \\Omega \\cos\\alpha / \\sin\\alpha = \\Omega \\cot\\alpha\\). The total \\(\\boldsymbol{\\omega}\\) lies along the contact line (the instantaneous axis of rotation).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-rolling-cone"></div>

<div class="env-block remark">
<div class="env-title">Holonomic vs. Non-Holonomic Constraints</div>
<div class="env-body">
<p>The rolling constraint \\(v_{\\text{cm}} = R\\omega\\) for a wheel rolling in a straight line is <strong>holonomic</strong>: it can be integrated to \\(x_{\\text{cm}} = R\\theta + C\\), relating coordinates directly. But a ball rolling on a plane has <strong>non-holonomic</strong> constraints: the no-slip condition involves velocities and cannot be integrated to a constraint on positions alone. Non-holonomic constraints are more subtle and arise naturally in robotics and vehicle dynamics.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Cycloid</div>
<div class="env-body">
<p>A point on the rim of a wheel of radius \\(R\\) rolling at angular speed \\(\\omega\\) traces a <strong>cycloid</strong>:</p>
\\[x = R(\\omega t - \\sin\\omega t), \\qquad y = R(1 - \\cos\\omega t).\\]
<p>The cycloid has cusps at the points where the rim touches the ground (the particle momentarily has zero velocity). Between cusps, the particle follows a smooth arch. The cycloid is also the solution to the brachistochrone and tautochrone problems, making it one of the most important curves in classical mechanics.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-rolling-cone',
                        title: 'Cone Rolling on a Table (Top View)',
                        description: 'A cone rolls without slipping on a flat surface with its apex fixed. The view is from above. The <strong>green line</strong> is the contact line (instantaneous axis of rotation). The red dot is the apex. Adjust the half-angle and precession rate.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 50, originX: 300, originY: 200 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var halfAngle = 30; // degrees
                            var precRate = 0.8; // rad/s
                            var phi = 0; // precession angle
                            var spinAngle = 0;

                            VizEngine.createSlider(controls, 'Half-angle (\u00B0)', 10, 70, halfAngle, 5, function (v) { halfAngle = v; });
                            VizEngine.createSlider(controls, 'Precession \u03A9', 0, 3, precRate, 0.1, function (v) { precRate = v; });

                            var lastTime = null;
                            function draw(timestamp) {
                                if (!lastTime) lastTime = timestamp;
                                var dt = Math.min((timestamp - lastTime) / 1000, 0.05);
                                lastTime = timestamp;

                                phi += precRate * dt;
                                var alphaRad = halfAngle * Math.PI / 180;
                                var omegaSpin = precRate / Math.tan(alphaRad);
                                spinAngle += omegaSpin * dt;

                                viz.clear();
                                viz.drawGrid(1);

                                // Apex at origin
                                viz.drawPoint(0, 0, viz.colors.red, 'Apex', 5);

                                // Contact line (from apex, along precession angle)
                                var coneLen = 3; // length of cone along table
                                var contactX = coneLen * Math.cos(phi);
                                var contactY = coneLen * Math.sin(phi);
                                viz.drawSegment(0, 0, contactX, contactY, viz.colors.green, 2.5);
                                viz.drawText('Contact line', contactX * 0.5 + 0.3, contactY * 0.5 + 0.3, viz.colors.green, 10);

                                // Cone body (projected top view: triangle)
                                var baseR = coneLen * Math.sin(alphaRad) / Math.cos(alphaRad) * 0.5;
                                var perpX = -Math.sin(phi);
                                var perpY = Math.cos(phi);
                                var baseCx = contactX * 0.7;
                                var baseCy = contactY * 0.7;

                                ctx.fillStyle = viz.colors.purple + '25';
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                var as = viz.toScreen(0, 0);
                                ctx.moveTo(as[0], as[1]);
                                var b1 = viz.toScreen(contactX + perpX * baseR, contactY + perpY * baseR);
                                var b2 = viz.toScreen(contactX - perpX * baseR, contactY - perpY * baseR);
                                ctx.lineTo(b1[0], b1[1]);
                                ctx.lineTo(b2[0], b2[1]);
                                ctx.closePath();
                                ctx.fill();
                                ctx.stroke();

                                // Spin markers on the base circle
                                var baseCenterX = contactX * 0.85;
                                var baseCenterY = contactY * 0.85;
                                var nMarks = 6;
                                for (var mi = 0; mi < nMarks; mi++) {
                                    var markAngle = spinAngle + (mi / nMarks) * 2 * Math.PI;
                                    var mx = baseCenterX + baseR * 0.7 * (Math.cos(markAngle) * perpX + Math.sin(markAngle) * Math.cos(phi));
                                    var my = baseCenterY + baseR * 0.7 * (Math.cos(markAngle) * perpY + Math.sin(markAngle) * Math.sin(phi));
                                    viz.drawPoint(mx, my, viz.colors.cyan, null, 2);
                                }

                                // Precession circle (dashed)
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                var cs = viz.toScreen(0, 0);
                                ctx.beginPath();
                                ctx.arc(cs[0], cs[1], coneLen * viz.scale, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // omega vector (along contact line)
                                var omegaTotal = Math.sqrt(precRate * precRate + omegaSpin * omegaSpin);
                                var omegaDirX = contactX / coneLen;
                                var omegaDirY = contactY / coneLen;
                                var omegaDispLen = 1.5;
                                viz.drawVector(0, 0, omegaDirX * omegaDispLen, omegaDirY * omegaDispLen, viz.colors.yellow, '\u03C9', 2.5, 9);

                                // Info
                                viz.screenText('Top view', w / 2, 14, viz.colors.text, 11);
                                viz.screenText('\u03B1 = ' + halfAngle + '\u00B0  \u03A9 = ' + precRate.toFixed(1) +
                                    '  \u03C9_spin = ' + omegaSpin.toFixed(2), w / 2, h - 12, viz.colors.text, 10);
                                viz.screenText('\u03C9 lies along the contact line (instantaneous axis)', w / 2, h - 28, viz.colors.yellow, 10);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A cylinder of radius \\(R\\) rolls without slipping inside a hollow cylinder of radius \\(2R\\). If the inner cylinder has angular velocity \\(\\omega\\) about its own axis, what is the angular velocity of the contact point about the center of the outer cylinder?',
                        hint: 'The no-slip condition relates the spin of the inner cylinder to the angular rate about the outer center. The contact point traces a circle of radius \\(R\\) (since the center of the inner cylinder is at distance \\(R\\) from the center of the outer).',
                        solution: 'The inner cylinder\'s center moves in a circle of radius \\(2R - R = R\\) about the outer center. The no-slip condition: the arc traversed on the inner cylinder equals the arc on the outer. If the center advances by angle \\(\\Omega\\) about the outer center, the contact arc on the outer wall is \\(2R\\Omega\\), and the contact arc on the inner cylinder is \\(R\\omega_{\\text{roll}}\\). So \\(R\\omega_{\\text{roll}} = 2R\\Omega\\), giving \\(\\Omega = \\omega_{\\text{roll}}/2\\). But \\(\\omega_{\\text{roll}}\\) is the rolling angular velocity: the spin is \\(\\omega\\) about its own axis, so \\(\\Omega = \\omega/2\\). The contact point orbits the outer center at half the spin rate.'
                    },
                    {
                        question: 'Derive the cycloid parametric equations for a point on the rim of a wheel of radius \\(R\\) rolling at angular speed \\(\\omega\\).',
                        hint: 'The center is at \\((R\\omega t, R)\\). The rim point is displaced by \\((-R\\sin\\omega t, -R\\cos\\omega t)\\) from the center.',
                        solution: 'The center of the wheel is at \\((R\\omega t, R)\\). A point on the rim at angle \\(\\omega t\\) below the center (starting at the bottom) has position: \\(x = R\\omega t - R\\sin(\\omega t) = R(\\omega t - \\sin\\omega t)\\), \\(y = R - R\\cos(\\omega t) = R(1 - \\cos\\omega t)\\). At \\(\\omega t = 0, 2\\pi, \\ldots\\), the point is at the ground with \\(y = 0\\) (cusps). At \\(\\omega t = \\pi\\), it reaches maximum height \\(y = 2R\\) (the top of the wheel). The velocity at the cusp is zero: \\(\\dot{x} = R\\omega(1 - \\cos\\omega t) = 0\\) and \\(\\dot{y} = R\\omega\\sin\\omega t = 0\\) at \\(\\omega t = 0\\). \\(\\square\\)'
                    }
                ]
            }
        ]
    });
})();
