window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch03',
    number: 3,
    title: "Newton's Laws (Rigorous)",
    subtitle: 'Inertial frames, the three laws stated precisely, free-body diagrams, constraint forces, and the generalized Atwood machine',
    sections: [
        // ===================== Section 1: Inertial Frames and the First Law =====================
        {
            id: 'ch03-sec01',
            title: 'Inertial Frames & the First Law',
            content: `<h2>Inertial Frames and the First Law</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Logical Structure of Newton's Laws</div>
                    <div class="env-body"><p>Newton's laws are often taught as three independent statements, but they have a tight logical structure. The first law is not merely a special case of the second. It defines the <em>arena</em> in which the second law operates: the inertial frame. Without the first law, the second law is meaningless because it does not specify what kind of frame \\(\\mathbf{F} = m\\mathbf{a}\\) holds in. The first law says: there exist frames where a free particle moves in a straight line at constant speed. These are the inertial frames. The second law then quantifies how forces alter motion within such a frame.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Inertial Frame)</div>
                    <div class="env-body"><p>An <strong>inertial frame</strong> is a reference frame in which a free particle (one subject to no forces) moves with constant velocity (including zero). Equivalently, it is a frame in which Newton's first law holds.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Newton's First Law (Law of Inertia)</div>
                    <div class="env-body"><p>There exist reference frames (inertial frames) in which every body continues in its state of rest or of uniform motion in a straight line unless acted upon by a net external force. Furthermore, any frame in uniform translational motion relative to an inertial frame is also inertial.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">What Is Not an Inertial Frame?</div>
                    <div class="env-body"><p>A rotating frame (such as the Earth's surface) is not inertial: objects at rest in the lab frame appear to curve (Coriolis effect) when viewed from a rotating frame. An accelerating elevator is not inertial: a hanging plumb bob tilts. The "fixed stars" provide an excellent approximation to an inertial frame; the Earth's surface is approximately inertial for most laboratory-scale experiments, with corrections of order \\(\\Omega^2 R \\sim 0.03\\) m/s\\(^2\\).</p></div>
                </div>

                <h3>Mass and the Concept of Inertia</h3>
                <p>The <strong>inertial mass</strong> \\(m\\) of a body quantifies its resistance to acceleration. It is an intrinsic scalar property, independent of the body's location, velocity, or the forces acting on it. Operationally, \\(m\\) is defined by comparing accelerations when two bodies interact: if body A pushes body B and they accelerate at \\(a_A\\) and \\(a_B\\) respectively, then \\(m_A/m_B = a_B/a_A\\) (by the third law).</p>

                <div class="env-block warning">
                    <div class="env-title">Warning: Mass vs. Weight</div>
                    <div class="env-body"><p>Mass \\(m\\) is an intrinsic property measured in kilograms. Weight \\(W = mg\\) is a force (the gravitational force on the body) measured in Newtons, and it depends on the local gravitational field \\(g\\). An astronaut's mass is the same on Earth and on the Moon; their weight is not.</p></div>
                </div>`,

            visualizations: [],
            exercises: [
                {
                    question: 'A ball is thrown straight up in a train moving at constant velocity. From the perspective of an observer on the ground and an observer on the train, describe the trajectory. Is Newton\'s first law satisfied in both frames?',
                    solution: 'On the train (inertial): the ball goes straight up and comes straight down, consistent with the first law (horizontal velocity is zero, vertical has gravity). On the ground (also inertial): the ball follows a parabolic arc, consistent with Newton\'s laws with gravity as the only force. Both frames are inertial, and the trajectories are related by a Galilean transformation.'
                },
                {
                    question: 'Explain why the first law is logically independent of the second law, not merely the \\(\\mathbf{F}=0\\) case.',
                    solution: 'The second law says \\(\\mathbf{F} = m\\mathbf{a}\\), but this equation is frame-dependent. In a non-inertial frame, \\(\\mathbf{a}\' \\neq \\mathbf{a}\\), so \\(\\mathbf{F} \\neq m\\mathbf{a}\'\\). The second law does not tell us which frames to use it in. The first law identifies the class of inertial frames by a physical criterion (free particles travel in straight lines). Only then can we apply the second law. Without the first law, we would not know where \\(\\mathbf{F} = m\\mathbf{a}\\) is valid.'
                }
            ]
        },

        // ===================== Section 2: The Second and Third Laws =====================
        {
            id: 'ch03-sec02',
            title: "The Second & Third Laws",
            content: `<h2>The Second and Third Laws</h2>

                <div class="env-block theorem">
                    <div class="env-title">Newton's Second Law</div>
                    <div class="env-body"><p>In an inertial frame, the rate of change of momentum of a body equals the net external force applied to it:
                    \\[\\mathbf{F}_{\\text{net}} = \\frac{d\\mathbf{p}}{dt}\\]
                    where \\(\\mathbf{p} = m\\mathbf{v}\\) is the momentum. For constant mass, this reduces to
                    \\[\\mathbf{F}_{\\text{net}} = m\\mathbf{a}\\]</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">The Momentum Form is More General</div>
                    <div class="env-body"><p>The momentum form \\(\\mathbf{F} = d\\mathbf{p}/dt\\) applies even when mass is not constant (e.g., a rocket expelling fuel, or sand falling on a conveyor belt). The form \\(\\mathbf{F} = m\\mathbf{a}\\) is valid only for constant-mass systems. Throughout this course we use \\(\\mathbf{F} = m\\mathbf{a}\\) for point particles with fixed mass, but the momentum form is always in the background.</p></div>
                </div>

                <h3>Superposition of Forces</h3>
                <p>Newton's second law implicitly assumes the <strong>superposition principle</strong>: if multiple forces act on a body, the net force is their vector sum:
                \\[\\mathbf{F}_{\\text{net}} = \\sum_i \\mathbf{F}_i\\]
                This is an empirical fact, not a mathematical necessity. It holds to extraordinary precision in classical mechanics.</p>

                <div class="env-block theorem">
                    <div class="env-title">Newton's Third Law</div>
                    <div class="env-body"><p>If body A exerts a force \\(\\mathbf{F}_{AB}\\) on body B, then body B exerts a force \\(\\mathbf{F}_{BA}\\) on body A, where
                    \\[\\mathbf{F}_{BA} = -\\mathbf{F}_{AB}\\]
                    These forces are equal in magnitude, opposite in direction, act on <em>different</em> bodies, and are of the same type (both gravitational, both normal, both tension, etc.).</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning: Common Misconceptions about the Third Law</div>
                    <div class="env-body"><p>
                    <strong>Misconception 1:</strong> "The third-law pair of my weight is the normal force from the floor." Wrong. The third-law pair of the gravitational force the Earth exerts on you is the gravitational force you exert on the Earth. The normal force is a <em>different</em> force that happens to equal your weight in static equilibrium.
                    <br><strong>Misconception 2:</strong> "Third-law pairs cancel out." Third-law pairs act on different bodies, so they never cancel in the equation of motion for a single body. Forces cancel only when two forces act on the <em>same</em> body.
                    </p></div>
                </div>

                <h3>Determining the Equation of Motion</h3>
                <p>The general procedure for any mechanics problem:</p>
                <ol>
                    <li>Identify the system (which body or bodies?).</li>
                    <li>Draw a free-body diagram for each body.</li>
                    <li>Choose a coordinate system.</li>
                    <li>Write \\(\\mathbf{F}_{\\text{net}} = m\\mathbf{a}\\) in components.</li>
                    <li>Use constraint equations to relate unknowns.</li>
                    <li>Solve the resulting system of equations.</li>
                </ol>`,

            visualizations: [],
            exercises: [
                {
                    question: 'A 5 kg block sits on a 10 kg block, which sits on a frictionless floor. A horizontal force \\(F = 30\\) N is applied to the bottom block. The coefficient of static friction between the blocks is \\(\\mu_s = 0.4\\). Do the blocks move together or does the top block slip?',
                    hint: 'First assume they move together and compute the friction needed. Then check against the maximum static friction.',
                    solution: 'If together: \\(a = F/(m_1+m_2) = 30/15 = 2\\) m/s\\(^2\\). Friction on top block: \\(f = m_1 a = 5 \\times 2 = 10\\) N. Max static friction: \\(f_{\\max} = \\mu_s m_1 g = 0.4 \\times 5 \\times 9.8 = 19.6\\) N. Since \\(10 < 19.6\\), the blocks move together at 2 m/s\\(^2\\).'
                },
                {
                    question: 'Identify the third-law pair for each force acting on a book resting on a table.',
                    solution: 'Forces on book: (1) Weight \\(W\\) (Earth pulls book down). Third-law pair: book pulls Earth up with force \\(W\\). (2) Normal force \\(N\\) (table pushes book up). Third-law pair: book pushes table down with force \\(N\\). Note: \\(W\\) and \\(N\\) are NOT third-law pairs of each other, even though they are equal in magnitude in equilibrium.'
                }
            ]
        },

        // ===================== Section 3: Free-Body Diagrams =====================
        {
            id: 'ch03-sec03',
            title: 'Free-Body Diagrams & Strategy',
            content: `<h2>Free-Body Diagrams and Problem-Solving Strategy</h2>

                <p>The free-body diagram (FBD) is the single most important tool in Newtonian mechanics. It forces you to identify every force acting on a body and prevents the most common errors: forgetting forces, double-counting them, or confusing internal and external forces.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Free-Body Diagram)</div>
                    <div class="env-body"><p>A <strong>free-body diagram</strong> for body \\(A\\) is a drawing showing:
                    <ul>
                        <li>Body \\(A\\) represented as a simple shape (dot, rectangle, etc.).</li>
                        <li>Every external force acting on \\(A\\), drawn as a vector arrow from the appropriate point of application.</li>
                        <li>A coordinate system.</li>
                        <li>The acceleration vector (if known or assumed).</li>
                    </ul>
                    No forces that \\(A\\) exerts on other bodies appear in \\(A\\)'s FBD.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Checklist of Common Forces</div>
                    <div class="env-body"><p>For each body, systematically check:
                    <ul>
                        <li><strong>Gravity:</strong> \\(m\\mathbf{g}\\) downward, always present near Earth.</li>
                        <li><strong>Normal force:</strong> Perpendicular to any contact surface, away from the surface.</li>
                        <li><strong>Friction:</strong> Parallel to surface, opposing relative motion (kinetic) or tendency to slide (static).</li>
                        <li><strong>Tension:</strong> Along string/rope, pulling the body toward the string.</li>
                        <li><strong>Spring:</strong> \\(-k\\Delta x\\) along the spring axis.</li>
                        <li><strong>Applied forces:</strong> Any specified pushes/pulls.</li>
                        <li><strong>Drag:</strong> Opposing velocity, if specified.</li>
                    </ul></p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (Block on an Incline)</div>
                    <div class="env-body"><p>A block of mass \\(m\\) slides down a rough incline of angle \\(\\alpha\\). FBD: (1) Weight \\(mg\\) downward. (2) Normal force \\(N\\) perpendicular to incline surface. (3) Kinetic friction \\(f_k = \\mu_k N\\) up the incline.
                    <br>Choose axes: \\(x\\) along incline (positive down-slope), \\(y\\) perpendicular to incline (positive outward).
                    <br>\\(x\\): \\(mg\\sin\\alpha - \\mu_k N = ma\\)
                    <br>\\(y\\): \\(N - mg\\cos\\alpha = 0\\)
                    <br>From \\(y\\): \\(N = mg\\cos\\alpha\\). Substituting: \\(a = g(\\sin\\alpha - \\mu_k\\cos\\alpha)\\).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-incline-fbd"></div>

                <h3>Massless Strings and Ideal Pulleys</h3>
                <p>Two standard idealizations that simplify many problems:</p>
                <ul>
                    <li><strong>Massless string:</strong> If the string has mass \\(m_s = 0\\), then \\(F = m_s a = 0\\) for any acceleration. This means the net force on any segment of string is zero, so the tension is the same throughout the string (uniform tension).</li>
                    <li><strong>Ideal (massless, frictionless) pulley:</strong> The pulley changes the direction of the string without changing the tension. The net torque on a massless pulley is zero, so the tension entering equals the tension leaving.</li>
                </ul>

                <div class="env-block warning">
                    <div class="env-title">Warning</div>
                    <div class="env-body"><p>If the string has mass, or the pulley has mass and friction, the tension is NOT uniform. A massive rope hanging vertically has higher tension at the top than the bottom because it must support the weight of the rope below. A massive pulley requires a net torque to accelerate, so the tensions on the two sides differ.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-incline-fbd',
                    title: 'Block on an Incline: Free-Body Diagram',
                    description: 'Adjust the incline angle \\(\\alpha\\) and friction coefficient \\(\\mu_k\\). The FBD shows all forces and the resulting acceleration. Green means the block accelerates down the slope; red means friction is too large.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 35, originX: 200, originY: 280});
                        var alpha = 30, muK = 0.2;
                        var g = 9.8;

                        VizEngine.createSlider(controls, 'Angle (deg)', 5, 85, alpha, 1, function(v) { alpha = v; });
                        VizEngine.createSlider(controls, 'mu_k', 0, 1, muK, 0.05, function(v) { muK = v; });

                        function draw() {
                            viz.clear();

                            var ctx = viz.ctx;
                            var aRad = alpha * Math.PI / 180;

                            // Draw incline as a triangle
                            var incW = 10;
                            var incH = incW * Math.tan(aRad);
                            var pts = [[0, 0], [incW, 0], [0, incH]];
                            viz.drawPolygon(pts, viz.colors.grid + '44', viz.colors.text, 2);

                            // Ground
                            viz.drawGround(0, viz.colors.text + '44');

                            // Block position on incline
                            var bFrac = 0.55;
                            var bx = incW * (1 - bFrac);
                            var by = incH * bFrac;
                            var blockSize = 0.8;

                            // Block (rotated rectangle, drawn with polygon)
                            var cosA = Math.cos(aRad), sinA = Math.sin(aRad);
                            var dx = cosA * blockSize, dy = sinA * blockSize;
                            var nx = -sinA * blockSize, ny = cosA * blockSize;
                            var block = [
                                [bx - dx / 2 - nx / 2, by - dy / 2 + ny / 2],
                                [bx + dx / 2 - nx / 2, by + dy / 2 + ny / 2],
                                [bx + dx / 2 + nx / 2, by + dy / 2 - ny / 2],
                                [bx - dx / 2 + nx / 2, by - dy / 2 - ny / 2]
                            ];
                            viz.drawPolygon(block, viz.colors.teal + '55', viz.colors.teal, 2);

                            // Center of block
                            var cx = bx, cy = by;

                            // Force scale
                            var fScale = 0.15;
                            var m = 5; // kg for display
                            var N = m * g * Math.cos(aRad);
                            var fGravParallel = m * g * Math.sin(aRad);
                            var fFriction = muK * N;
                            var acc = g * (Math.sin(aRad) - muK * Math.cos(aRad));

                            // Weight (straight down)
                            viz.drawVector(cx, cy, 0, -m * g * fScale, viz.colors.red, 'mg', 2.5, 10);

                            // Normal (perpendicular to incline, outward)
                            viz.drawVector(cx, cy, -sinA * N * fScale, cosA * N * fScale, viz.colors.blue, 'N', 2.5, 10);

                            // Friction (along incline, up the slope)
                            if (fFriction > 0.1) {
                                viz.drawVector(cx, cy, -cosA * fFriction * fScale, -sinA * fFriction * fScale, viz.colors.orange, 'f_k', 2.5, 10);
                            }

                            // Acceleration arrow (along incline, down slope)
                            if (acc > 0.1) {
                                viz.drawVector(cx + cosA * 1.5, cy + sinA * 1.5, cosA * acc * fScale * 2, sinA * acc * fScale * 2, viz.colors.green, 'a', 3, 11);
                            }

                            // Angle arc at base
                            viz.drawAngle(0, 0, 0, aRad, 1.2, viz.colors.yellow, 'alpha');

                            // Info panel
                            var accel = acc > 0 ? acc.toFixed(2) : '0 (static)';
                            var color = acc > 0 ? viz.colors.green : viz.colors.red;
                            viz.screenText('alpha = ' + alpha + ' deg, mu_k = ' + muK.toFixed(2), 12, 20, viz.colors.white, 13, 'left');
                            viz.screenText('a = g(sin(a) - mu*cos(a)) = ' + accel + ' m/s^2', 12, 40, color, 12, 'left');
                            viz.screenText('N = mg*cos(a) = ' + N.toFixed(1) + ' N', 12, 58, viz.colors.blue, 11, 'left');
                            viz.screenText('f_k = mu*N = ' + fFriction.toFixed(1) + ' N', 12, 74, viz.colors.orange, 11, 'left');

                            if (acc <= 0) {
                                viz.screenText('Block does not slide (friction > gravity component)', 12, 94, viz.colors.red, 11, 'left');
                            }
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Two blocks of mass \\(m_1 = 3\\) kg and \\(m_2 = 5\\) kg are connected by a massless string over a massless pulley (simple Atwood machine). Find the acceleration and string tension.',
                    hint: 'Draw FBDs for each mass. Use the constraint that they have the same magnitude of acceleration (one goes up, the other goes down).',
                    solution: 'For \\(m_2\\) (heavier, goes down): \\(m_2 g - T = m_2 a\\). For \\(m_1\\) (lighter, goes up): \\(T - m_1 g = m_1 a\\). Adding: \\((m_2 - m_1)g = (m_1 + m_2)a\\), so \\(a = \\frac{m_2 - m_1}{m_1 + m_2}g = \\frac{2}{8}(9.8) = 2.45\\) m/s\\(^2\\). Tension: \\(T = m_1(g+a) = 3(9.8 + 2.45) = 36.75\\) N. Or: \\(T = \\frac{2m_1 m_2}{m_1+m_2}g = \\frac{30}{8}(9.8) = 36.75\\) N.'
                }
            ]
        },

        // ===================== Section 4: Constraint Forces =====================
        {
            id: 'ch03-sec04',
            title: 'Constraint Forces',
            content: `<h2>Constraint Forces</h2>

                <p>Many mechanical systems have <strong>constraints</strong>: geometric restrictions on the allowed motions. A bead on a wire can only move along the wire. A block on a table cannot fall through the table. A pendulum bob maintains a fixed distance from the pivot. These constraints are enforced by <strong>constraint forces</strong> (normal forces, tension, etc.).</p>

                <div class="env-block definition">
                    <div name="env-title">Definition (Holonomic Constraint)</div>
                    <div class="env-body"><p>A constraint is <strong>holonomic</strong> if it can be expressed as an equation relating the coordinates:
                    \\[f(\\mathbf{r}_1, \\mathbf{r}_2, \\ldots, t) = 0\\]
                    Examples: rigid rod (\\(|\\mathbf{r}_1 - \\mathbf{r}_2| = L\\)), bead on a sphere (\\(r = R\\)), particle on a surface (\\(g(x,y,z) = 0\\)). A constraint that cannot be written in this form (e.g., an inequality like \\(r \\geq R\\)) is non-holonomic.</p></div>
                </div>

                <h3>Constraint Equations and Degrees of Freedom</h3>
                <p>A system of \\(N\\) particles in 3D has \\(3N\\) coordinates. Each independent holonomic constraint removes one degree of freedom. With \\(k\\) constraints, the number of degrees of freedom is \\(n = 3N - k\\).</p>

                <div class="env-block example">
                    <div class="env-title">Example (Atwood Constraint)</div>
                    <div class="env-body"><p>An Atwood machine with two masses on a string of length \\(L\\) over a pulley at height \\(h\\). Let \\(y_1\\) and \\(y_2\\) be the distances from the pulley to each mass. The constraint is \\(y_1 + y_2 = L\\) (constant string length). Differentiating: \\(\\dot{y}_1 + \\dot{y}_2 = 0\\) and \\(\\ddot{y}_1 + \\ddot{y}_2 = 0\\). So if mass 1 accelerates down at rate \\(a\\), mass 2 accelerates up at rate \\(a\\).</p></div>
                </div>

                <h3>Constraint Forces Are Determined by the Equations of Motion</h3>
                <p>A key point: constraint forces (like normal forces and tensions) are <em>not</em> given in advance. They are unknowns that are determined together with the accelerations by solving the equations of motion plus the constraint equations. The number of equations (Newton's second law components + constraints) always matches the number of unknowns (accelerations + constraint forces).</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (d'Alembert's Principle)</div>
                    <div class="env-body"><p>For a system with holonomic constraints, the constraint forces do no virtual work for displacements consistent with the constraints:
                    \\[\\sum_i (\\mathbf{F}_i - m_i\\mathbf{a}_i)\\cdot\\delta\\mathbf{r}_i = 0\\]
                    for all virtual displacements \\(\\delta\\mathbf{r}_i\\) consistent with the constraints. This principle is the bridge from Newtonian to Lagrangian mechanics (Chapter 20).</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Why d'Alembert Matters</div>
                    <div class="env-body"><p>d'Alembert's principle lets us eliminate constraint forces entirely. Instead of solving for \\(N\\), \\(T\\), etc. as separate unknowns, we work only with the "true" degrees of freedom. This is the physical motivation for Lagrangian mechanics, where constraint forces never appear.</p></div>
                </div>`,

            visualizations: [],
            exercises: [
                {
                    question: 'A bead of mass \\(m\\) slides without friction on a circular hoop of radius \\(R\\) in a vertical plane. At angle \\(\\theta\\) from the bottom, find the normal force of the hoop on the bead, given the bead\'s speed \\(v(\\theta)\\).',
                    hint: 'Use polar coordinates centered at the hoop center. The constraint is \\(r = R\\). The centripetal acceleration is \\(v^2/R\\).',
                    solution: 'At angle \\(\\theta\\) from the bottom (measuring counterclockwise from lowest point): the forces on the bead along the radial direction (toward center) are the component of gravity and the normal force \\(N\\). Gravity radially inward component: \\(mg\\cos\\theta\\) when \\(\\theta\\) is measured from bottom. Newton\'s second law (radial, toward center): \\(N - mg\\cos\\theta = -mv^2/R\\) (wait, need to be careful with signs). Actually, \\(N\\) points inward (hoop pushes bead inward if bead is on inside), and the centripetal acceleration is \\(v^2/R\\) toward center. So \\(N - mg\\cos\\theta = mv^2/R\\), giving \\(N = m(v^2/R + g\\cos\\theta)\\). If on outside of hoop, \\(N\\) points outward and the equation changes.'
                },
                {
                    question: 'Count the degrees of freedom: (a) a rigid body in 3D; (b) two particles connected by a rigid rod; (c) a double pendulum in a plane.',
                    solution: '(a) 6: three for translation of center of mass, three for rotation. Or: 3 particles define the body position, but the 3 rigidity constraints (fixed mutual distances) reduce \\(3 \\times 3 - 3 = 6\\). (b) \\(3 \\times 2 - 1 = 5\\) (one distance constraint). (c) Two particles in 2D: \\(2 \\times 2 = 4\\) coordinates. Two constraints (each rod length fixed): \\(4 - 2 = 2\\) degrees of freedom.'
                }
            ]
        },

        // ===================== Section 5: The Generalized Atwood Machine =====================
        {
            id: 'ch03-sec05',
            title: 'The Generalized Atwood Machine',
            content: `<h2>The Generalized Atwood Machine</h2>

                <p>The Atwood machine is the paradigmatic constraint problem. The generalized version, with multiple masses, pulleys, and inclined surfaces, provides a rich testing ground for the Newtonian method.</p>

                <div class="env-block example">
                    <div class="env-title">Example (Three-Mass Atwood with Incline)</div>
                    <div class="env-body"><p>Consider mass \\(m_1\\) on a frictionless incline of angle \\(\\alpha\\), connected by a string over a pulley to mass \\(m_2\\) hanging vertically. A second string connects \\(m_2\\) over another pulley to mass \\(m_3\\) hanging vertically.
                    <br>This system has <strong>two</strong> degrees of freedom (two independent string segments), so we need two generalized coordinates and two constraint equations from the string lengths.</p></div>
                </div>

                <h3>Systematic Method for Multi-Body Systems</h3>
                <ol>
                    <li><strong>Coordinates:</strong> Assign a position variable to each mass (e.g., \\(x_1, x_2, x_3\\) measuring distance along each mass's allowed direction of motion).</li>
                    <li><strong>Constraints:</strong> For each inextensible string, write \\(\\text{string length} = \\text{const}\\). Differentiate twice to get acceleration constraints.</li>
                    <li><strong>FBDs:</strong> Draw free-body diagram for each mass. Write \\(F = ma\\) along the direction of motion.</li>
                    <li><strong>Solve:</strong> You now have equations (one per mass) and constraint equations. The unknowns are the accelerations and tensions. Solve the linear system.</li>
                </ol>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Atwood Machine Formula)</div>
                    <div class="env-body"><p>For the simple Atwood machine with masses \\(m_1\\) and \\(m_2\\) (\\(m_2 > m_1\\)) over a massless, frictionless pulley:
                    \\[a = \\frac{m_2 - m_1}{m_1 + m_2}\\,g, \\qquad T = \\frac{2m_1 m_2}{m_1 + m_2}\\,g\\]
                    Note the limiting cases: if \\(m_1 = m_2\\), then \\(a = 0\\) (equilibrium). If \\(m_1 \\to 0\\), then \\(a \\to g\\) and \\(T \\to 0\\) (free fall). If \\(m_1 = m_2 = m\\), then \\(T = mg\\) (each side supports the other).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-atwood"></div>

                <h3>Double Atwood Machine</h3>
                <p>In the <strong>double Atwood machine</strong>, a simple Atwood machine (with masses \\(m_2\\) and \\(m_3\\)) hangs from one side of a pulley, and mass \\(m_1\\) hangs from the other side. The compound pulley introduces a subtlety: the constraint is that the string over the top pulley has fixed length, and the string over the bottom pulley has fixed length. But the bottom pulley accelerates, so the accelerations of \\(m_2\\) and \\(m_3\\) relative to the ground involve both the pulley's acceleration and their accelerations relative to the pulley.</p>

                <div class="env-block example">
                    <div class="env-title">Example (Double Atwood Solution)</div>
                    <div class="env-body"><p>Let \\(a_1\\) be the downward acceleration of \\(m_1\\), and let \\(a'\\) be the acceleration of \\(m_2\\) relative to the lower pulley (downward positive). The constraint from the top string gives the lower pulley acceleration as \\(-a_1\\) (it accelerates up when \\(m_1\\) goes down). Then:
                    <br>\\(m_2\\)'s absolute acceleration: \\(-a_1 + a'\\) (down)
                    <br>\\(m_3\\)'s absolute acceleration: \\(-a_1 - a'\\) (down)
                    <br>Writing Newton's second law for each mass and for the (massless) lower pulley, one obtains a system of linear equations whose solution gives \\(a_1\\), \\(a'\\), and the tensions.</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-atwood',
                    title: 'Generalized Atwood Machine Simulator',
                    description: 'Two masses connected by a string over a pulley. Adjust \\(m_1\\) and \\(m_2\\) to see the acceleration, tension, and animated motion. Forces are shown on each mass.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 30, originX: 280, originY: 60});
                        var m1 = 3, m2 = 5;
                        var g = 9.8;
                        var running = false;
                        var t0 = 0;
                        var y1 = 0, y2 = 0, v1 = 0, v2 = 0;

                        VizEngine.createSlider(controls, 'm1 (kg)', 0.5, 10, m1, 0.5, function(v) { m1 = v; resetSim(); });
                        VizEngine.createSlider(controls, 'm2 (kg)', 0.5, 10, m2, 0.5, function(v) { m2 = v; resetSim(); });
                        VizEngine.createButton(controls, 'Start/Reset', function() {
                            if (running) { resetSim(); } else { running = true; }
                        });

                        function resetSim() {
                            t0 = 0; y1 = 0; y2 = 0; v1 = 0; v2 = 0; running = false;
                        }

                        var lastTime = null;

                        function draw(timestamp) {
                            if (!lastTime) lastTime = timestamp;
                            var dt = Math.min((timestamp - lastTime) / 1000, 0.05);
                            lastTime = timestamp;

                            // Physics
                            var acc = (m2 - m1) / (m1 + m2) * g;
                            var T = 2 * m1 * m2 / (m1 + m2) * g;

                            if (running) {
                                t0 += dt;
                                // m1 goes up, m2 goes down (if m2 > m1)
                                v1 += -acc * dt;  // m1 velocity (positive = down)
                                v2 += acc * dt;
                                y1 += v1 * dt;
                                y2 += v2 * dt;

                                // Clamp
                                if (y2 > 5) { y2 = 5; y1 = -5; v1 = 0; v2 = 0; running = false; }
                                if (y1 > 5) { y1 = 5; y2 = -5; v1 = 0; v2 = 0; running = false; }
                            }

                            viz.clear();

                            var ctx = viz.ctx;
                            var pulleyX = 0, pulleyY = 0;
                            var pulleyR = 0.5;
                            var leftX = -3, rightX = 3;
                            var baseY = -1;

                            // Pulley
                            var ps = viz.toScreen(pulleyX, pulleyY);
                            ctx.strokeStyle = viz.colors.text;
                            ctx.lineWidth = 3;
                            ctx.beginPath();
                            ctx.arc(ps[0], ps[1], pulleyR * viz.scale, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.fillStyle = viz.colors.grid;
                            ctx.fill();

                            // Support
                            viz.drawSegment(pulleyX, pulleyY + pulleyR, pulleyX, pulleyY + pulleyR + 1, viz.colors.text, 2);
                            var topY = pulleyY + pulleyR + 1;
                            viz.drawSegment(pulleyX - 1.5, topY, pulleyX + 1.5, topY, viz.colors.text, 3);

                            // String
                            var m1Y = baseY + y1;
                            var m2Y = baseY + y2;
                            viz.drawSegment(leftX, m1Y + 0.5, leftX, pulleyY, viz.colors.text, 1.5);
                            viz.drawSegment(leftX, pulleyY, rightX, pulleyY, viz.colors.text + '44', 1, true);
                            viz.drawSegment(rightX, pulleyY, rightX, m2Y + 0.5, viz.colors.text, 1.5);

                            // Mass 1 (left)
                            var blockW = 1.2, blockH = 0.8;
                            var m1s = Math.min(0.5 + m1 * 0.1, 1.5);
                            viz.drawPolygon(
                                [[leftX - m1s / 2, m1Y + m1s], [leftX + m1s / 2, m1Y + m1s],
                                 [leftX + m1s / 2, m1Y], [leftX - m1s / 2, m1Y]],
                                viz.colors.blue + '88', viz.colors.blue, 2
                            );
                            viz.drawText('m1', leftX, m1Y + m1s / 2, viz.colors.white, 13);

                            // Mass 2 (right)
                            var m2s = Math.min(0.5 + m2 * 0.1, 1.5);
                            viz.drawPolygon(
                                [[rightX - m2s / 2, m2Y + m2s], [rightX + m2s / 2, m2Y + m2s],
                                 [rightX + m2s / 2, m2Y], [rightX - m2s / 2, m2Y]],
                                viz.colors.orange + '88', viz.colors.orange, 2
                            );
                            viz.drawText('m2', rightX, m2Y + m2s / 2, viz.colors.white, 13);

                            // Force arrows on masses
                            var fScale = 0.05;
                            // m1: weight down, tension up
                            viz.drawVector(leftX + m1s / 2 + 0.3, m1Y + m1s / 2, 0, -m1 * g * fScale, viz.colors.red, 'mg', 1.5, 7);
                            viz.drawVector(leftX - m1s / 2 - 0.3, m1Y + m1s / 2, 0, T * fScale, viz.colors.green, 'T', 1.5, 7);

                            // m2: weight down, tension up
                            viz.drawVector(rightX + m2s / 2 + 0.3, m2Y + m2s / 2, 0, -m2 * g * fScale, viz.colors.red, 'mg', 1.5, 7);
                            viz.drawVector(rightX - m2s / 2 - 0.3, m2Y + m2s / 2, 0, T * fScale, viz.colors.green, 'T', 1.5, 7);

                            // Info
                            viz.screenText('a = (m2-m1)/(m1+m2) * g = ' + acc.toFixed(3) + ' m/s^2', 12, viz.height - 56, viz.colors.white, 12, 'left');
                            viz.screenText('T = 2*m1*m2/(m1+m2) * g = ' + T.toFixed(2) + ' N', 12, viz.height - 38, viz.colors.green, 12, 'left');
                            viz.screenText(running ? 'Running... t = ' + t0.toFixed(1) + ' s' : 'Press Start to animate', 12, viz.height - 20, viz.colors.text, 11, 'left');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'In a double Atwood machine, \\(m_1 = 4\\) kg hangs from one side of the top pulley. A second (massless) pulley hangs from the other side, supporting \\(m_2 = 3\\) kg and \\(m_3 = 1\\) kg. Find the acceleration of each mass.',
                    hint: 'Let \\(a\\) be the acceleration of \\(m_1\\) downward, and \\(a\'\\) the acceleration of \\(m_2\\) relative to the lower pulley downward. For the top string, \\(T_1\\) is the tension; for the bottom string, \\(T_2\\). The massless lower pulley gives \\(T_1 = 2T_2\\).',
                    solution: 'Equations: \\(m_1 g - T_1 = m_1 a\\) ... (1). For lower pulley (massless): \\(T_1 = 2T_2\\) ... (2). For \\(m_2\\): \\(m_2 g - T_2 = m_2(-a + a\')\\) ... (3). For \\(m_3\\): \\(m_3 g - T_2 = m_3(-a - a\')\\) ... (4). From (3)+(4): \\((m_2+m_3)g - 2T_2 = -(m_2+m_3)a + (m_2-m_3)a\'\\). From (3)-(4): \\((m_2-m_3)g = (m_2+m_3)a\'\\), so \\(a\' = \\frac{m_2-m_3}{m_2+m_3}g = \\frac{2}{4}g = g/2\\). Substituting back and solving (it takes some algebra): \\(a = \\frac{4m_2 m_3 - m_1(m_2+m_3)}{4m_2 m_3 + m_1(m_2+m_3)}g = \\frac{12-16}{12+16}g = \\frac{-4}{28}g = -g/7\\). So \\(m_1\\) goes UP at \\(g/7 \\approx 1.4\\) m/s\\(^2\\). \\(m_2\\) acceleration: \\(-a + a\' = g/7 + g/2 = 9g/14 \\approx 6.3\\) m/s\\(^2\\) down. \\(m_3\\) acceleration: \\(-a - a\' = g/7 - g/2 = -5g/14 \\approx -3.5\\) m/s\\(^2\\) (i.e., UP at \\(5g/14\\)).'
                },
                {
                    question: 'A mass \\(m_1\\) on a frictionless horizontal table is connected by a string through a hole in the table to a mass \\(m_2\\) hanging vertically. Mass \\(m_1\\) moves in a circle of radius \\(r\\). Find the condition on \\(r\\) and the angular velocity \\(\\omega\\) for equilibrium (\\(m_2\\) stationary).',
                    hint: 'If \\(m_2\\) is stationary, the tension equals \\(m_2 g\\). For \\(m_1\\), the tension provides the centripetal force.',
                    solution: 'Tension \\(T = m_2 g\\) (from \\(m_2\\) in equilibrium). For \\(m_1\\) in circular motion: \\(T = m_1 \\omega^2 r\\). So \\(m_2 g = m_1 \\omega^2 r\\), giving \\(\\omega = \\sqrt{m_2 g/(m_1 r)}\\). For a given radius \\(r\\), only this angular velocity maintains equilibrium.'
                }
            ]
        }
    ]
});
