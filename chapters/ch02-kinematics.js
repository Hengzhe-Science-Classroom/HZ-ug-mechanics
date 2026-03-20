window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch02',
    number: 2,
    title: 'Kinematics',
    subtitle: 'Position, velocity, acceleration vectors; projectile motion with drag; the Frenet-Serret frame; relative motion',
    sections: [
        // ===================== Section 1: Position, Velocity, Acceleration =====================
        {
            id: 'ch02-sec01',
            title: 'Position, Velocity, Acceleration',
            content: `<h2>Position, Velocity, and Acceleration Vectors</h2>

                <div class="env-block intuition">
                    <div class="env-title">Kinematics vs. Dynamics</div>
                    <div class="env-body"><p><strong>Kinematics</strong> describes <em>how</em> things move, without asking <em>why</em>. It is pure geometry of motion: trajectories, speeds, turning rates. <strong>Dynamics</strong> (Chapter 3 onward) asks why, using Newton's laws. Kinematics provides the vocabulary; dynamics provides the grammar. A clear understanding of kinematics is prerequisite to everything that follows.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Kinematic Quantities)</div>
                    <div class="env-body"><p>For a particle with position vector \\(\\mathbf{r}(t)\\):
                    <ul>
                        <li><strong>Velocity:</strong> \\(\\mathbf{v}(t) = \\frac{d\\mathbf{r}}{dt}\\). Tangent to the trajectory; \\(|\\mathbf{v}|\\) is the speed.</li>
                        <li><strong>Acceleration:</strong> \\(\\mathbf{a}(t) = \\frac{d\\mathbf{v}}{dt} = \\frac{d^2\\mathbf{r}}{dt^2}\\). Points toward the concave side of the curve.</li>
                    </ul></p></div>
                </div>

                <h3>Rectilinear Motion</h3>
                <p>For motion along a straight line (say the \\(x\\)-axis), the vector equations reduce to scalar ones. With constant acceleration \\(a\\):
                \\[v(t) = v_0 + at\\]
                \\[x(t) = x_0 + v_0 t + \\frac{1}{2}at^2\\]
                \\[v^2 = v_0^2 + 2a(x - x_0)\\]
                These are the "SUVAT" equations. They hold <em>only</em> for constant acceleration.</p>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body"><p>Students often misapply constant-acceleration formulas to problems where acceleration varies (e.g., air resistance, springs, gravity varying with height). Always verify that \\(a\\) is truly constant before using SUVAT. For non-constant acceleration, you must integrate the equation of motion directly.</p></div>
                </div>

                <h3>General Vector Integration</h3>
                <p>Given \\(\\mathbf{a}(t)\\) and initial conditions \\(\\mathbf{v}(0) = \\mathbf{v}_0\\), \\(\\mathbf{r}(0) = \\mathbf{r}_0\\):
                \\[\\mathbf{v}(t) = \\mathbf{v}_0 + \\int_0^t \\mathbf{a}(t')\\,dt'\\]
                \\[\\mathbf{r}(t) = \\mathbf{r}_0 + \\int_0^t \\mathbf{v}(t')\\,dt'\\]
                These integrals are performed component by component.</p>`,

            visualizations: [],
            exercises: [
                {
                    question: 'A particle has acceleration \\(\\mathbf{a}(t) = (6t, 2, -e^{-t})\\) with \\(\\mathbf{v}(0) = (0, 1, 1)\\) and \\(\\mathbf{r}(0) = (0, 0, 0)\\). Find \\(\\mathbf{r}(t)\\).',
                    hint: 'Integrate \\(\\mathbf{a}\\) to get \\(\\mathbf{v}\\) (with initial condition), then integrate \\(\\mathbf{v}\\) to get \\(\\mathbf{r}\\).',
                    solution: '\\(\\mathbf{v}(t) = (3t^2, 2t+1, e^{-t})\\) (using \\(\\int -e^{-t}dt = e^{-t}\\) and \\(v_z(0) = e^0 = 1\\) checks). \\(\\mathbf{r}(t) = (t^3, t^2+t, 1-e^{-t})\\) (using \\(r_z(0) = 1-1 = 0\\) checks).'
                }
            ]
        },

        // ===================== Section 2: Projectile Motion =====================
        {
            id: 'ch02-sec02',
            title: 'Projectile Motion',
            content: `<h2>Projectile Motion</h2>

                <h3>Ideal (Vacuum) Projectile</h3>
                <p>With uniform gravity \\(\\mathbf{g} = -g\\hat{\\mathbf{y}}\\) and no air resistance, the equations of motion separate into horizontal (constant velocity) and vertical (constant acceleration) components:</p>
                \\[x(t) = v_0\\cos\\alpha\\,t, \\quad y(t) = v_0\\sin\\alpha\\,t - \\frac{1}{2}gt^2\\]
                <p>where \\(\\alpha\\) is the launch angle and \\(v_0\\) the initial speed. Eliminating \\(t\\) gives the parabolic trajectory:
                \\[y = x\\tan\\alpha - \\frac{g}{2v_0^2\\cos^2\\alpha}\\,x^2\\]</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Range and Maximum Height)</div>
                    <div class="env-body"><p>For a projectile launched from and landing on the same height:
                    \\[R = \\frac{v_0^2\\sin 2\\alpha}{g}, \\qquad H = \\frac{v_0^2\\sin^2\\alpha}{2g}\\]
                    The maximum range occurs at \\(\\alpha = 45^\\circ\\).</p></div>
                </div>

                <h3>Linear Drag: \\(\\mathbf{F}_{\\text{drag}} = -b\\mathbf{v}\\)</h3>
                <p>For small, slow objects (Stokes drag), the resistive force is proportional to velocity. Define the time constant \\(\\tau = m/b\\). Newton's second law gives:</p>
                \\[m\\dot{v}_x = -bv_x, \\quad m\\dot{v}_y = -mg - bv_y\\]
                <p>The solutions (with initial velocity \\((v_0\\cos\\alpha, v_0\\sin\\alpha)\\)) are:</p>
                \\[v_x(t) = v_0\\cos\\alpha\\,e^{-t/\\tau}\\]
                \\[v_y(t) = \\left(v_0\\sin\\alpha + v_T\\right)e^{-t/\\tau} - v_T\\]
                <p>where \\(v_T = mg/b = g\\tau\\) is the terminal speed.</p>

                <h3>Quadratic Drag: \\(\\mathbf{F}_{\\text{drag}} = -\\frac{1}{2}C_D \\rho A v^2\\,\\hat{\\mathbf{v}}\\)</h3>
                <p>For larger, faster objects (Reynolds number \\(\\gtrsim 10^3\\)), drag is proportional to \\(v^2\\). This couples the \\(x\\) and \\(y\\) equations through \\(v = \\sqrt{v_x^2 + v_y^2}\\) and generally requires numerical solution.</p>

                <div class="env-block remark">
                    <div class="env-title">Physical Insight</div>
                    <div class="env-body"><p>Drag breaks the parabolic symmetry. With linear drag, the trajectory tilts forward: the descent is steeper than the ascent because the particle is slower (having lost energy to drag). With quadratic drag, the effect is even more dramatic for fast projectiles.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-projectile-drag"></div>`,

            visualizations: [
                {
                    id: 'viz-projectile-drag',
                    title: 'Projectile: Vacuum vs. Linear Drag vs. Quadratic Drag',
                    description: 'Compare three trajectories launched at the same angle and speed. Blue: no drag. Orange: linear drag. Red: quadratic drag. Adjust launch angle, speed, and drag coefficient.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 18, originX: 60, originY: body.clientHeight ? body.clientHeight - 40 : 280});
                        var angle = 45, v0 = 15, dragB = 0.3, dragQ = 0.02;
                        var g = 9.8;

                        VizEngine.createSlider(controls, 'Angle (deg)', 10, 80, angle, 1, function(v) { angle = v; compute(); });
                        VizEngine.createSlider(controls, 'Speed', 5, 25, v0, 0.5, function(v) { v0 = v; compute(); });
                        VizEngine.createSlider(controls, 'Linear drag b/m', 0, 1, dragB, 0.05, function(v) { dragB = v; compute(); });
                        VizEngine.createSlider(controls, 'Quad drag coeff', 0, 0.1, dragQ, 0.005, function(v) { dragQ = v; compute(); });

                        var pathVacuum = [], pathLinear = [], pathQuad = [];

                        function compute() {
                            var a = angle * Math.PI / 180;
                            var vx0 = v0 * Math.cos(a);
                            var vy0 = v0 * Math.sin(a);
                            var dt = 0.01;

                            // Vacuum
                            pathVacuum = [];
                            for (var t = 0; t < 20; t += dt) {
                                var xx = vx0 * t;
                                var yy = vy0 * t - 0.5 * g * t * t;
                                if (yy < -0.1 && t > 0.1) break;
                                pathVacuum.push([xx, yy]);
                            }

                            // Linear drag: state = [x, y, vx, vy]
                            pathLinear = [];
                            var state = [0, 0, vx0, vy0];
                            for (var t2 = 0; t2 < 20; t2 += dt) {
                                pathLinear.push([state[0], state[1]]);
                                if (state[1] < -0.1 && t2 > 0.1) break;
                                state = VizEngine.rk4(state, t2, dt, function(s) {
                                    return [s[2], s[3], -dragB * s[2], -g - dragB * s[3]];
                                });
                            }

                            // Quadratic drag
                            pathQuad = [];
                            state = [0, 0, vx0, vy0];
                            for (var t3 = 0; t3 < 20; t3 += dt) {
                                pathQuad.push([state[0], state[1]]);
                                if (state[1] < -0.1 && t3 > 0.1) break;
                                state = VizEngine.rk4(state, t3, dt, function(s) {
                                    var spd = Math.sqrt(s[2] * s[2] + s[3] * s[3]);
                                    if (spd < 1e-10) return [s[2], s[3], 0, -g];
                                    return [s[2], s[3], -dragQ * spd * s[2], -g - dragQ * spd * s[3]];
                                });
                            }
                        }

                        compute();

                        function drawPath(path, color) {
                            if (path.length < 2) return;
                            var ctx = viz.ctx;
                            ctx.strokeStyle = color;
                            ctx.lineWidth = 2.5;
                            ctx.beginPath();
                            for (var i = 0; i < path.length; i++) {
                                var sc = viz.toScreen(path[i][0], path[i][1]);
                                if (i === 0) ctx.moveTo(sc[0], sc[1]);
                                else ctx.lineTo(sc[0], sc[1]);
                            }
                            ctx.stroke();
                        }

                        function draw() {
                            viz.clear();
                            viz.drawGrid(2);
                            viz.drawGround(0, viz.colors.text + '44');

                            // Axes
                            var ctx = viz.ctx;
                            ctx.strokeStyle = viz.colors.axis;
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(viz.originX, 0);
                            ctx.lineTo(viz.originX, viz.height);
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(0, viz.originY);
                            ctx.lineTo(viz.width, viz.originY);
                            ctx.stroke();

                            drawPath(pathVacuum, viz.colors.blue);
                            drawPath(pathLinear, viz.colors.orange);
                            drawPath(pathQuad, viz.colors.red);

                            // Landing points
                            if (pathVacuum.length > 0) {
                                var last = pathVacuum[pathVacuum.length - 1];
                                viz.drawPoint(last[0], Math.max(last[1], 0), viz.colors.blue, 'R=' + last[0].toFixed(1), 4);
                            }
                            if (pathLinear.length > 0) {
                                var lastL = pathLinear[pathLinear.length - 1];
                                viz.drawPoint(lastL[0], Math.max(lastL[1], 0), viz.colors.orange, lastL[0].toFixed(1), 4);
                            }
                            if (pathQuad.length > 0) {
                                var lastQ = pathQuad[pathQuad.length - 1];
                                viz.drawPoint(lastQ[0], Math.max(lastQ[1], 0), viz.colors.red, lastQ[0].toFixed(1), 4);
                            }

                            // Launch arrow
                            var aRad = angle * Math.PI / 180;
                            var arrLen = 2;
                            viz.drawVector(0, 0, arrLen * Math.cos(aRad), arrLen * Math.sin(aRad), viz.colors.white, 'v0', 2, 9);

                            // Legend
                            viz.screenText('No drag', viz.width - 10, 20, viz.colors.blue, 12, 'right');
                            viz.screenText('Linear drag', viz.width - 10, 38, viz.colors.orange, 12, 'right');
                            viz.screenText('Quadratic drag', viz.width - 10, 56, viz.colors.red, 12, 'right');
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Show that for a vacuum projectile, the maximum range occurs at \\(\\alpha = 45^\\circ\\) and equals \\(v_0^2/g\\).',
                    solution: '\\(R = v_0^2 \\sin 2\\alpha / g\\). Since \\(\\sin 2\\alpha \\leq 1\\) with equality at \\(2\\alpha = 90^\\circ\\), i.e., \\(\\alpha = 45^\\circ\\). Then \\(R_{\\max} = v_0^2/g\\).'
                },
                {
                    question: 'For linear drag \\(\\mathbf{F} = -b\\mathbf{v}\\), derive the position as a function of time by integrating the velocity solution.',
                    hint: 'Integrate \\(v_x(t) = v_0\\cos\\alpha\\,e^{-t/\\tau}\\) and \\(v_y(t) = (v_0\\sin\\alpha + v_T)e^{-t/\\tau} - v_T\\) with \\(\\tau = m/b\\).',
                    solution: '\\(x(t) = v_0\\cos\\alpha\\,\\tau(1 - e^{-t/\\tau})\\). \\(y(t) = (v_0\\sin\\alpha + v_T)\\tau(1 - e^{-t/\\tau}) - v_T t\\). As \\(t \\to \\infty\\), \\(x \\to v_0\\cos\\alpha\\,\\tau\\) (finite horizontal range!) and \\(y \\to -v_T t + \\text{const}\\) (terminal velocity descent).'
                }
            ]
        },

        // ===================== Section 3: The Frenet-Serret Frame =====================
        {
            id: 'ch02-sec03',
            title: 'The Frenet-Serret Frame',
            content: `<h2>The Frenet-Serret Frame (TNB Frame)</h2>

                <p>The Cartesian and polar decompositions of acceleration are tied to a specific coordinate system. The <strong>Frenet-Serret frame</strong> provides an intrinsic decomposition that depends only on the geometry of the trajectory itself, not on any external coordinate axes.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (TNB Frame)</div>
                    <div class="env-body"><p>At each point of a smooth curve \\(\\mathbf{r}(t)\\), define:
                    <ul>
                        <li><strong>Tangent:</strong> \\(\\hat{\\mathbf{T}} = \\frac{\\mathbf{v}}{|\\mathbf{v}|}\\), the unit vector along the velocity</li>
                        <li><strong>Normal:</strong> \\(\\hat{\\mathbf{N}} = \\frac{d\\hat{\\mathbf{T}}/ds}{|d\\hat{\\mathbf{T}}/ds|}\\), pointing toward the center of curvature</li>
                        <li><strong>Binormal:</strong> \\(\\hat{\\mathbf{B}} = \\hat{\\mathbf{T}} \\times \\hat{\\mathbf{N}}\\), completing the right-handed triad</li>
                    </ul>
                    Here \\(s\\) is the arc length parameter, related to \\(t\\) by \\(ds/dt = |\\mathbf{v}|\\).</p></div>
                </div>

                <h3>Curvature and Radius of Curvature</h3>
                <p>The <strong>curvature</strong> \\(\\kappa\\) measures how fast the tangent direction rotates per unit arc length:
                \\[\\kappa = \\left|\\frac{d\\hat{\\mathbf{T}}}{ds}\\right| = \\frac{|\\mathbf{v} \\times \\mathbf{a}|}{|\\mathbf{v}|^3}\\]
                The <strong>radius of curvature</strong> is \\(R = 1/\\kappa\\). At each point, the curve locally approximates a circle of radius \\(R\\).</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Tangential-Normal Decomposition of Acceleration)</div>
                    <div class="env-body"><p>The acceleration decomposes as
                    \\[\\mathbf{a} = \\frac{dv}{dt}\\hat{\\mathbf{T}} + \\frac{v^2}{R}\\hat{\\mathbf{N}}\\]
                    where \\(v = |\\mathbf{v}|\\) is the speed. The tangential component \\(dv/dt\\) changes the speed; the normal component \\(v^2/R\\) changes the direction. For uniform-speed motion, only the normal component survives.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Physical Interpretation</div>
                    <div class="env-body"><p>The Frenet-Serret decomposition makes an important point: acceleration has two fundamentally different roles. Tangential acceleration changes how fast you move; centripetal (normal) acceleration changes which way you move. A car speeding up on a curve experiences both simultaneously.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-frenet-serret"></div>

                <h3>The Frenet-Serret Formulas</h3>
                <p>The derivatives of the TNB vectors with respect to arc length are:</p>
                \\[\\frac{d\\hat{\\mathbf{T}}}{ds} = \\kappa\\hat{\\mathbf{N}}\\]
                \\[\\frac{d\\hat{\\mathbf{N}}}{ds} = -\\kappa\\hat{\\mathbf{T}} + \\tau\\hat{\\mathbf{B}}\\]
                \\[\\frac{d\\hat{\\mathbf{B}}}{ds} = -\\tau\\hat{\\mathbf{N}}\\]
                <p>where \\(\\tau\\) is the <strong>torsion</strong>, measuring how the curve twists out of its osculating plane. For planar curves, \\(\\tau = 0\\) and \\(\\hat{\\mathbf{B}}\\) is constant.</p>`,

            visualizations: [
                {
                    id: 'viz-frenet-serret',
                    title: 'Frenet-Serret Frame Moving Along a 3D Curve',
                    description: 'A particle traces a 3D curve (projected to 2D). The tangent \\(\\hat{\\mathbf{T}}\\) (green), normal \\(\\hat{\\mathbf{N}}\\) (orange), and binormal \\(\\hat{\\mathbf{B}}\\) (purple) frame moves with the particle.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 50});
                        var speed = 0.5;
                        var trail = [];
                        var maxTrail = 300;

                        VizEngine.createSlider(controls, 'Speed', 0.1, 2, speed, 0.1, function(v) { speed = v; });

                        var t0 = 0;
                        var lastTime = null;

                        // 3D curve projected to 2D: trefoil-like curve
                        function curvePos(t) {
                            var x = (2 + Math.cos(3 * t)) * Math.cos(2 * t);
                            var y = (2 + Math.cos(3 * t)) * Math.sin(2 * t);
                            var z = Math.sin(3 * t);
                            // Project: use x and y + 0.3*z for depth
                            return [x, y + 0.3 * z];
                        }

                        function curveVel(t) {
                            var eps = 0.001;
                            var p1 = curvePos(t + eps);
                            var p0 = curvePos(t - eps);
                            return [(p1[0] - p0[0]) / (2 * eps), (p1[1] - p0[1]) / (2 * eps)];
                        }

                        function curveAcc(t) {
                            var eps = 0.001;
                            var v1 = curveVel(t + eps);
                            var v0 = curveVel(t - eps);
                            return [(v1[0] - v0[0]) / (2 * eps), (v1[1] - v0[1]) / (2 * eps)];
                        }

                        function draw(timestamp) {
                            if (!lastTime) lastTime = timestamp;
                            var dt = (timestamp - lastTime) / 1000;
                            lastTime = timestamp;
                            t0 += dt * speed;

                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes('x', 'y');

                            // Draw full curve
                            viz.drawParametric(
                                function(s) { return curvePos(s)[0]; },
                                function(s) { return curvePos(s)[1]; },
                                0, 2 * Math.PI, viz.colors.grid, 1.5, 500
                            );

                            var pos = curvePos(t0);
                            var vel = curveVel(t0);
                            var acc = curveAcc(t0);

                            trail.push(pos);
                            if (trail.length > maxTrail) trail.shift();
                            viz.drawTrail(trail, viz.colors.cyan);

                            var vMag = Math.sqrt(vel[0] * vel[0] + vel[1] * vel[1]);
                            if (vMag < 0.01) { viz.drawBall(pos[0], pos[1], 0.1, viz.colors.cyan, 2); return; }

                            // T-hat
                            var Tx = vel[0] / vMag, Ty = vel[1] / vMag;

                            // N-hat: component of acceleration perpendicular to T
                            var aT = acc[0] * Tx + acc[1] * Ty; // tangential component
                            var aNx = acc[0] - aT * Tx;
                            var aNy = acc[1] - aT * Ty;
                            var aNmag = Math.sqrt(aNx * aNx + aNy * aNy);
                            var Nx = 0, Ny = 0;
                            if (aNmag > 0.01) {
                                Nx = aNx / aNmag;
                                Ny = aNy / aNmag;
                            }

                            // B-hat = T x N (in 2D, it points out of plane; we show it as a short perpendicular)
                            var Bz = Tx * Ny - Ty * Nx;

                            var frameLen = 0.8;

                            // Draw T, N vectors
                            viz.drawVector(pos[0], pos[1], Tx * frameLen, Ty * frameLen, viz.colors.green, 'T', 2.5, 9);
                            if (aNmag > 0.01) {
                                viz.drawVector(pos[0], pos[1], Nx * frameLen, Ny * frameLen, viz.colors.orange, 'N', 2.5, 9);
                            }

                            // Osculating circle
                            if (aNmag > 0.01) {
                                var kappa = aNmag / (vMag * vMag);
                                var R = 1 / kappa;
                                if (R < 8 && R > 0.1) {
                                    var cx = pos[0] + Nx * R;
                                    var cy = pos[1] + Ny * R;
                                    viz.drawCircle(cx, cy, R, null, viz.colors.yellow + '33', 1);
                                    viz.drawPoint(cx, cy, viz.colors.yellow + '66', '', 3);
                                }
                            }

                            viz.drawBall(pos[0], pos[1], 0.1, viz.colors.cyan, 2);

                            // Info
                            var kVal = aNmag > 0.01 ? aNmag / (vMag * vMag) : 0;
                            var RVal = kVal > 0.001 ? 1 / kVal : Infinity;
                            viz.screenText('kappa = ' + kVal.toFixed(3), 12, 20, viz.colors.yellow, 12, 'left');
                            viz.screenText('R = ' + (RVal < 100 ? RVal.toFixed(2) : 'large'), 12, 38, viz.colors.yellow, 12, 'left');
                            viz.screenText('a_T = ' + aT.toFixed(2) + ', a_N = ' + aNmag.toFixed(2), 12, 56, viz.colors.text, 12, 'left');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'For the helix \\(\\mathbf{r}(t) = (a\\cos t, a\\sin t, bt)\\), compute the TNB frame, curvature, and torsion.',
                    hint: 'First find \\(\\mathbf{v}\\) and \\(|\\mathbf{v}|\\), then \\(\\hat{\\mathbf{T}} = \\mathbf{v}/|\\mathbf{v}|\\). Differentiate \\(\\hat{\\mathbf{T}}\\) with respect to \\(s\\) (or equivalently \\(t\\), then divide by \\(|\\mathbf{v}|\\)).',
                    solution: '\\(\\mathbf{v} = (-a\\sin t, a\\cos t, b)\\), \\(|\\mathbf{v}| = \\sqrt{a^2+b^2} \\equiv c\\). \\(\\hat{\\mathbf{T}} = (-a\\sin t, a\\cos t, b)/c\\). \\(d\\hat{\\mathbf{T}}/dt = (-a\\cos t, -a\\sin t, 0)/c\\), so \\(d\\hat{\\mathbf{T}}/ds = d\\hat{\\mathbf{T}}/dt \\cdot 1/c = (-a\\cos t, -a\\sin t, 0)/c^2\\). Thus \\(\\kappa = a/c^2\\) and \\(\\hat{\\mathbf{N}} = (-\\cos t, -\\sin t, 0)\\). \\(\\hat{\\mathbf{B}} = \\hat{\\mathbf{T}}\\times\\hat{\\mathbf{N}} = (b\\sin t, -b\\cos t, a)/c\\). Torsion: \\(d\\hat{\\mathbf{B}}/ds = (b\\cos t, b\\sin t, 0)/c^2 = -(b/c^2)\\hat{\\mathbf{N}}\\), so \\(\\tau = b/c^2\\).'
                }
            ]
        },

        // ===================== Section 4: Trajectory in Different Coordinates =====================
        {
            id: 'ch02-sec04',
            title: 'Trajectories in Different Coordinates',
            content: `<h2>Trajectories in Different Coordinate Systems</h2>

                <p>The same trajectory looks different in different coordinate systems. This section builds intuition by examining how familiar trajectories are described in Cartesian, polar, and natural (arc-length) parameterizations.</p>

                <div class="env-block example">
                    <div class="env-title">Example (Circular Motion in Two Coordinate Systems)</div>
                    <div class="env-body"><p><strong>Cartesian:</strong> \\(x = R\\cos(\\omega t)\\), \\(y = R\\sin(\\omega t)\\). The velocity components oscillate: \\(v_x = -R\\omega\\sin(\\omega t)\\), \\(v_y = R\\omega\\cos(\\omega t)\\). The acceleration \\(\\mathbf{a} = (-R\\omega^2\\cos\\omega t, -R\\omega^2\\sin\\omega t)\\) looks complicated.
                    <br><strong>Polar:</strong> \\(r = R\\) (constant), \\(\\theta = \\omega t\\). Then \\(v_r = 0\\), \\(v_\\theta = R\\omega\\), and \\(a_r = -R\\omega^2\\), \\(a_\\theta = 0\\). The physics is transparent: the acceleration is purely centripetal.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (Spiral)</div>
                    <div class="env-body"><p>The logarithmic spiral \\(r = ae^{b\\theta}\\) in polar form is simple, but in Cartesian form \\(x = ae^{b\\theta}\\cos\\theta\\), \\(y = ae^{b\\theta}\\sin\\theta\\) is a transcendental curve that is hard to work with algebraically. The spiral has the remarkable property that the angle between \\(\\hat{\\mathbf{r}}\\) and the velocity is constant (= \\(\\arctan(1/b)\\)).</p></div>
                </div>

                <h3>The Equation of the Path (Orbit Equation)</h3>
                <p>In many problems (especially central forces), we are interested in the <strong>shape</strong> of the orbit \\(r(\\theta)\\) rather than the time parameterization \\(r(t), \\theta(t)\\). Using the chain rule with angular momentum \\(\\ell = r^2\\dot{\\theta}\\):
                \\[\\frac{d}{dt} = \\dot{\\theta}\\frac{d}{d\\theta} = \\frac{\\ell}{r^2}\\frac{d}{d\\theta}\\]
                This converts the time-dependent equations of motion into an ODE for \\(r(\\theta)\\) or, with the Binet substitution \\(u = 1/r\\), into \\(u(\\theta)\\).</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Binet's Equation)</div>
                    <div class="env-body"><p>For a central force \\(F(r)\\hat{\\mathbf{r}}\\) with angular momentum \\(\\ell = r^2\\dot{\\theta}\\), the orbit equation in terms of \\(u = 1/r\\) is
                    \\[\\frac{d^2u}{d\\theta^2} + u = -\\frac{m}{\\ell^2 u^2}F(1/u)\\]
                    For the inverse-square force \\(F = -k/r^2 = -ku^2\\), this becomes \\(u'' + u = mk/\\ell^2\\), which is the equation for conic sections.</p></div>
                </div>`,

            visualizations: [],
            exercises: [
                {
                    question: 'Show that for the logarithmic spiral \\(r = ae^{b\\theta}\\), the angle between \\(\\mathbf{v}\\) and \\(\\hat{\\mathbf{r}}\\) is constant.',
                    hint: 'Compute \\(v_r = \\dot{r}\\) and \\(v_\\theta = r\\dot{\\theta}\\), then \\(\\tan\\psi = v_\\theta/v_r\\).',
                    solution: '\\(\\dot{r} = ab\\dot{\\theta}e^{b\\theta} = br\\dot{\\theta}\\). So \\(v_r = br\\dot{\\theta}\\) and \\(v_\\theta = r\\dot{\\theta}\\). The angle is \\(\\psi = \\arctan(v_\\theta/v_r) = \\arctan(1/b)\\), which is indeed constant.'
                },
                {
                    question: 'Derive Binet\'s equation from \\(F(r) = m(\\ddot{r} - r\\dot{\\theta}^2)\\) using the substitution \\(u = 1/r\\) and \\(\\ell = r^2\\dot{\\theta}\\).',
                    hint: 'Express \\(\\dot{r}\\) in terms of \\(du/d\\theta\\) using the chain rule, then differentiate again.',
                    solution: '\\(r = 1/u\\), so \\(\\dot{r} = -\\dot{u}/u^2 = -(1/u^2)(du/d\\theta)\\dot{\\theta} = -(\\ell/r^2)(du/d\\theta)/u^2 = -\\ell\\,du/d\\theta\\) (using \\(\\dot{\\theta} = \\ell u^2\\)). Then \\(\\ddot{r} = -\\ell(d^2u/d\\theta^2)\\dot{\\theta} = -\\ell^2 u^2(d^2u/d\\theta^2)\\). Substituting: \\(F = m(-\\ell^2 u^2 u\'\' - (1/u)(\\ell u^2)^2) = m(-\\ell^2 u^2 u\'\' - \\ell^2 u^3)\\). So \\(F/(m\\ell^2 u^2) = -u\'\' - u\\), giving \\(u\'\' + u = -F/(m\\ell^2 u^2)\\).'
                }
            ]
        },

        // ===================== Section 5: Relative Motion =====================
        {
            id: 'ch02-sec05',
            title: 'Relative Motion',
            content: `<h2>Relative Motion</h2>

                <p>The description of motion depends on the observer's frame of reference. This section treats relative motion between frames in uniform relative translation. Rotating frames are deferred to Chapter 4.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Reference Frame)</div>
                    <div class="env-body"><p>A <strong>reference frame</strong> is a set of coordinate axes together with a clock. Frame \\(S\\) uses coordinates \\((x, y, z, t)\\) and frame \\(S'\\) uses \\((x', y', z', t')\\).</p></div>
                </div>

                <h3>Galilean Transformation</h3>
                <p>If frame \\(S'\\) moves with constant velocity \\(\\mathbf{V}\\) relative to frame \\(S\\), and the origins coincide at \\(t = 0\\):
                \\[\\mathbf{r} = \\mathbf{r}' + \\mathbf{V}t, \\quad t = t'\\]
                Differentiating:
                \\[\\mathbf{v} = \\mathbf{v}' + \\mathbf{V}\\]
                \\[\\mathbf{a} = \\mathbf{a}'\\]</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Galilean Invariance of Acceleration)</div>
                    <div class="env-body"><p>If \\(S'\\) moves with constant velocity \\(\\mathbf{V}\\) relative to \\(S\\), then the acceleration is the same in both frames: \\(\\mathbf{a} = \\mathbf{a}'\\). This means Newton's second law \\(\\mathbf{F} = m\\mathbf{a}\\) has the same form in all inertial frames (frames in uniform relative motion). This is the <strong>principle of Galilean relativity</strong>.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Velocity Addition in Practice</div>
                    <div class="env-body"><p>A boat crossing a river at velocity \\(\\mathbf{v}'\\) relative to the water, with the water moving at velocity \\(\\mathbf{V}\\) relative to the bank, has velocity \\(\\mathbf{v} = \\mathbf{v}' + \\mathbf{V}\\) relative to the bank. This is the vector addition of velocities. The direction of the boat's path over the ground differs from its heading through the water.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-relative-motion"></div>

                <h3>Non-Inertial Frames (Preview)</h3>
                <p>If \\(S'\\) accelerates relative to \\(S\\), then \\(\\mathbf{a} \\neq \\mathbf{a}'\\). Newton's laws in their simple form \\(\\mathbf{F} = m\\mathbf{a}'\\) no longer hold in \\(S'\\) unless we introduce <strong>fictitious forces</strong>. In an accelerating frame with acceleration \\(\\mathbf{A}\\):
                \\[m\\mathbf{a}' = \\mathbf{F} - m\\mathbf{A}\\]
                The term \\(-m\\mathbf{A}\\) is the fictitious force (pseudo-force). In a rotating frame, the fictitious forces are the Coriolis and centrifugal forces (Chapter 4).</p>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body"><p>Fictitious forces are not "real" in the sense that they do not arise from any physical interaction. They are mathematical artifacts of working in a non-inertial frame. The centrifugal "force" does not exist in an inertial frame. But they are extremely useful computational tools, and for an observer in the non-inertial frame, they are operationally indistinguishable from real forces.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-relative-motion',
                    title: 'Galilean Velocity Addition',
                    description: 'A boat (cyan) moves at velocity \\(\\mathbf{v}\'\\) relative to the river (blue arrows). The river flows at \\(\\mathbf{V}\\) relative to the bank. The boat\'s ground velocity is \\(\\mathbf{v} = \\mathbf{v}\' + \\mathbf{V}\\) (green). Drag the sliders to change the boat heading and river speed.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 40, originX: 280, originY: 220});

                        var boatAngle = 60; // degrees from +x, in river frame
                        var boatSpeed = 2;
                        var riverSpeed = 1.5;

                        VizEngine.createSlider(controls, 'Boat heading (deg)', 0, 360, boatAngle, 5, function(v) { boatAngle = v; });
                        VizEngine.createSlider(controls, 'Boat speed', 0.5, 4, boatSpeed, 0.1, function(v) { boatSpeed = v; });
                        VizEngine.createSlider(controls, 'River speed', 0, 3, riverSpeed, 0.1, function(v) { riverSpeed = v; });

                        var t0 = 0;
                        var lastTime = null;
                        var boatTrail = [];
                        var maxTrail = 200;

                        function draw(timestamp) {
                            if (!lastTime) lastTime = timestamp;
                            var dt = (timestamp - lastTime) / 1000;
                            lastTime = timestamp;
                            t0 += dt;

                            viz.clear();
                            viz.drawGrid();

                            // River flow arrows (background)
                            var ctx = viz.ctx;
                            for (var gy = -4; gy <= 4; gy += 1.5) {
                                for (var gx = -5; gx <= 5; gx += 2.5) {
                                    viz.drawVector(gx, gy, riverSpeed * 0.5, 0, viz.colors.blue + '33', '', 1, 5);
                                }
                            }

                            // Boat velocity in river frame
                            var aRad = boatAngle * Math.PI / 180;
                            var vbx = boatSpeed * Math.cos(aRad);
                            var vby = boatSpeed * Math.sin(aRad);

                            // River velocity
                            var vrx = riverSpeed;
                            var vry = 0;

                            // Ground velocity
                            var vgx = vbx + vrx;
                            var vgy = vby + vry;

                            // Boat position (cyclic)
                            var period = 8;
                            var frac = (t0 % period) / period;
                            var bx = -5 + vgx * (t0 % period);
                            var by = -3 + vgy * (t0 % period);

                            // Wrap
                            if (bx > 7 || bx < -7 || by > 5 || by < -5) {
                                bx = -5 + vgx * 0;
                                by = -3 + vgy * 0;
                                boatTrail = [];
                            }

                            boatTrail.push([bx, by]);
                            if (boatTrail.length > maxTrail) boatTrail.shift();
                            viz.drawTrail(boatTrail, viz.colors.cyan);

                            // Velocity vectors from boat
                            viz.drawVector(bx, by, vbx, vby, viz.colors.orange, "v'", 2.5, 10);
                            viz.drawVector(bx, by, vrx, vry, viz.colors.blue, 'V', 2.5, 10);
                            viz.drawVector(bx, by, vgx, vgy, viz.colors.green, 'v=v\'+V', 3, 11);

                            // Parallelogram
                            viz.drawSegment(bx + vbx, by + vby, bx + vgx, by + vgy, viz.colors.blue + '55', 1, true);
                            viz.drawSegment(bx + vrx, by + vry, bx + vgx, by + vgy, viz.colors.orange + '55', 1, true);

                            viz.drawBall(bx, by, 0.15, viz.colors.cyan, 2);

                            // Info
                            var gSpeed = Math.sqrt(vgx * vgx + vgy * vgy);
                            var gAngle = Math.atan2(vgy, vgx) * 180 / Math.PI;
                            viz.screenText("v' (boat in river) = " + boatSpeed.toFixed(1) + ' at ' + boatAngle.toFixed(0) + ' deg', 12, 20, viz.colors.orange, 12, 'left');
                            viz.screenText('V (river) = ' + riverSpeed.toFixed(1) + ' rightward', 12, 38, viz.colors.blue, 12, 'left');
                            viz.screenText('v (ground) = ' + gSpeed.toFixed(2) + ' at ' + gAngle.toFixed(1) + ' deg', 12, 56, viz.colors.green, 12, 'left');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A boat can travel at 5 m/s in still water. The river is 100 m wide and flows at 3 m/s. (a) If the boat heads straight across, how far downstream does it land? (b) At what angle should the boat head to arrive directly across?',
                    solution: '(a) Time to cross: \\(t = 100/5 = 20\\) s. Downstream drift: \\(3 \\times 20 = 60\\) m. (b) The boat must head upstream at angle \\(\\alpha\\) from the perpendicular such that \\(5\\sin\\alpha = 3\\), i.e., \\(\\alpha = \\arcsin(3/5) \\approx 36.9^\\circ\\). The crossing speed is \\(5\\cos\\alpha = 4\\) m/s, time = 25 s.'
                },
                {
                    question: 'Show that Newton\'s second law \\(\\mathbf{F} = m\\mathbf{a}\\) is Galilean invariant: it has the same form in any frame moving with constant velocity relative to an inertial frame.',
                    solution: 'Under Galilean transformation, \\(\\mathbf{a}\' = \\mathbf{a}\\) (since \\(\\mathbf{V}\\) is constant, \\(d\\mathbf{V}/dt = 0\\)). Forces depend on relative positions and velocities, which are Galilean invariant (\\(\\mathbf{r}_1 - \\mathbf{r}_2 = \\mathbf{r}_1\' - \\mathbf{r}_2\'\\), \\(\\mathbf{v}_1 - \\mathbf{v}_2 = \\mathbf{v}_1\' - \\mathbf{v}_2\'\\)). So \\(\\mathbf{F}\' = \\mathbf{F}\\) and \\(\\mathbf{F}\' = m\\mathbf{a}\'\\) holds.'
                }
            ]
        }
    ]
});
