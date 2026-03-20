window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch01',
    number: 1,
    title: 'Coordinate Systems',
    subtitle: 'Cartesian, polar, cylindrical, spherical: basis vectors, velocity, and acceleration in curvilinear coordinates',
    sections: [
        // ===================== Section 1: Cartesian Coordinates =====================
        {
            id: 'ch01-sec01',
            title: 'Cartesian Coordinates',
            content: `<h2>Cartesian Coordinates</h2>

                <div class="env-block intuition">
                    <div class="env-title">The Simplest Frame</div>
                    <div class="env-body"><p>Cartesian coordinates \\((x, y, z)\\) are the "default" coordinate system. The basis vectors \\(\\hat{\\mathbf{x}}, \\hat{\\mathbf{y}}, \\hat{\\mathbf{z}}\\) are fixed in space, they do not change from point to point. This makes differentiation trivial: \\(d\\hat{\\mathbf{x}}/dt = 0\\). But this simplicity comes at a cost. Many physical problems (planetary orbits, rotating systems, projectiles on a sphere) have symmetries that Cartesian coordinates cannot exploit. The art of mechanics includes choosing coordinates that match the symmetry of the problem.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Cartesian Coordinate System)</div>
                    <div class="env-body"><p>A <strong>Cartesian coordinate system</strong> in \\(\\mathbb{R}^3\\) consists of three mutually orthogonal axes meeting at an origin \\(O\\), with unit vectors \\(\\hat{\\mathbf{x}}, \\hat{\\mathbf{y}}, \\hat{\\mathbf{z}}\\) satisfying
                    \\[\\hat{\\mathbf{x}} \\cdot \\hat{\\mathbf{y}} = 0, \\quad \\hat{\\mathbf{y}} \\cdot \\hat{\\mathbf{z}} = 0, \\quad \\hat{\\mathbf{z}} \\cdot \\hat{\\mathbf{x}} = 0\\]
                    \\[\\hat{\\mathbf{x}} \\times \\hat{\\mathbf{y}} = \\hat{\\mathbf{z}} \\quad \\text{(right-handed)}\\]
                    A point \\(P\\) has position \\(\\mathbf{r} = x\\hat{\\mathbf{x}} + y\\hat{\\mathbf{y}} + z\\hat{\\mathbf{z}}\\).</p></div>
                </div>

                <h3>Velocity and Acceleration</h3>
                <p>Since the basis vectors are constant:</p>
                \\[\\mathbf{v} = \\dot{\\mathbf{r}} = \\dot{x}\\hat{\\mathbf{x}} + \\dot{y}\\hat{\\mathbf{y}} + \\dot{z}\\hat{\\mathbf{z}}\\]
                \\[\\mathbf{a} = \\ddot{\\mathbf{r}} = \\ddot{x}\\hat{\\mathbf{x}} + \\ddot{y}\\hat{\\mathbf{y}} + \\ddot{z}\\hat{\\mathbf{z}}\\]

                <p>Newton's second law in Cartesian form decomposes into three independent scalar equations:
                \\[F_x = m\\ddot{x}, \\quad F_y = m\\ddot{y}, \\quad F_z = m\\ddot{z}\\]
                This decoupling is the chief virtue of Cartesian coordinates: each component of the equation of motion is independent of the others.</p>

                <h3>The Line Element and Volume Element</h3>
                <p>Infinitesimal displacement: \\(d\\mathbf{r} = dx\\,\\hat{\\mathbf{x}} + dy\\,\\hat{\\mathbf{y}} + dz\\,\\hat{\\mathbf{z}}\\)</p>
                <p>Line element: \\(ds^2 = dx^2 + dy^2 + dz^2\\) (the Euclidean metric)</p>
                <p>Volume element: \\(dV = dx\\,dy\\,dz\\)</p>

                <div class="env-block remark">
                    <div class="env-title">When Cartesian is Best</div>
                    <div class="env-body"><p>Cartesian coordinates are ideal when the geometry is rectilinear (blocks on inclines, coupled springs along a line) or when forces have no particular symmetry. They fail to exploit circular or spherical symmetry, leading to unnecessarily complicated equations for orbital problems or rotational dynamics.</p></div>
                </div>`,

            visualizations: [],
            exercises: [
                {
                    question: 'A particle moves along \\(\\mathbf{r}(t) = (3t - t^3)\\hat{\\mathbf{x}} + 3t^2\\hat{\\mathbf{y}} + (3t + t^3)\\hat{\\mathbf{z}}\\). Show that \\(|\\mathbf{v}|\\) simplifies to a nice form and find the acceleration magnitude.',
                    hint: 'Compute \\(\\mathbf{v}\\), then \\(|\\mathbf{v}|^2\\) and simplify.',
                    solution: '\\(\\mathbf{v} = (3 - 3t^2, 6t, 3 + 3t^2)\\). Then \\(|\\mathbf{v}|^2 = (3-3t^2)^2 + 36t^2 + (3+3t^2)^2 = 9(1-t^2)^2 + 36t^2 + 9(1+t^2)^2 = 9(1-2t^2+t^4) + 36t^2 + 9(1+2t^2+t^4) = 18 + 18t^4 + 36t^2 = 18(1+t^2)^2\\). So \\(|\\mathbf{v}| = 3\\sqrt{2}(1+t^2)\\). Acceleration: \\(\\mathbf{a} = (-6t, 6, 6t)\\), \\(|\\mathbf{a}| = 6\\sqrt{1+2t^2}\\).'
                }
            ]
        },

        // ===================== Section 2: Polar Coordinates =====================
        {
            id: 'ch01-sec02',
            title: 'Polar Coordinates',
            content: `<h2>Polar Coordinates in 2D</h2>

                <p>Many problems in mechanics have circular or rotational symmetry. Polar coordinates \\((r, \\theta)\\) are the natural choice for such problems.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Polar Coordinates)</div>
                    <div class="env-body"><p>A point in the plane is specified by its distance \\(r \\geq 0\\) from the origin and the angle \\(\\theta\\) measured from the positive \\(x\\)-axis:
                    \\[x = r\\cos\\theta, \\quad y = r\\sin\\theta\\]
                    The inverse relations are \\(r = \\sqrt{x^2 + y^2}\\) and \\(\\theta = \\arctan(y/x)\\) (with appropriate quadrant correction).</p></div>
                </div>

                <h3>The Polar Basis Vectors</h3>
                <p>Define the <strong>local</strong> unit vectors at each point:</p>
                \\[\\hat{\\mathbf{r}} = \\cos\\theta\\,\\hat{\\mathbf{x}} + \\sin\\theta\\,\\hat{\\mathbf{y}}\\]
                \\[\\hat{\\boldsymbol{\\theta}} = -\\sin\\theta\\,\\hat{\\mathbf{x}} + \\cos\\theta\\,\\hat{\\mathbf{y}}\\]

                <div class="env-block warning">
                    <div class="env-title">Warning: These Basis Vectors Rotate!</div>
                    <div class="env-body"><p>Unlike \\(\\hat{\\mathbf{x}}\\) and \\(\\hat{\\mathbf{y}}\\), the vectors \\(\\hat{\\mathbf{r}}\\) and \\(\\hat{\\boldsymbol{\\theta}}\\) depend on \\(\\theta\\) and therefore change as the particle moves. Their time derivatives are:
                    \\[\\dot{\\hat{\\mathbf{r}}} = \\dot{\\theta}\\,\\hat{\\boldsymbol{\\theta}}, \\qquad \\dot{\\hat{\\boldsymbol{\\theta}}} = -\\dot{\\theta}\\,\\hat{\\mathbf{r}}\\]
                    These are the key formulas. Forgetting them leads to wrong expressions for velocity and acceleration.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-polar-basis"></div>

                <h3>Velocity in Polar Coordinates</h3>
                <p>The position vector is \\(\\mathbf{r} = r\\hat{\\mathbf{r}}\\). Differentiating, using the product rule and \\(\\dot{\\hat{\\mathbf{r}}} = \\dot{\\theta}\\hat{\\boldsymbol{\\theta}}\\):</p>
                \\[\\mathbf{v} = \\dot{r}\\hat{\\mathbf{r}} + r\\dot{\\theta}\\hat{\\boldsymbol{\\theta}}\\]

                <div class="env-block remark">
                    <div class="env-title">Physical Interpretation</div>
                    <div class="env-body"><p>The term \\(\\dot{r}\\hat{\\mathbf{r}}\\) is the <strong>radial velocity</strong> (motion toward/away from origin). The term \\(r\\dot{\\theta}\\hat{\\boldsymbol{\\theta}}\\) is the <strong>tangential velocity</strong> (motion around the origin). For uniform circular motion (\\(\\dot{r}=0\\), \\(\\dot{\\theta}=\\omega\\)), we recover \\(v = r\\omega\\).</p></div>
                </div>

                <h3>Acceleration in Polar Coordinates</h3>
                <p>Differentiating \\(\\mathbf{v}\\) again (carefully applying product rules and the basis vector derivatives):</p>
                \\[\\mathbf{a} = (\\ddot{r} - r\\dot{\\theta}^2)\\hat{\\mathbf{r}} + (r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta})\\hat{\\boldsymbol{\\theta}}\\]

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Acceleration Decomposition in Polar Coordinates)</div>
                    <div class="env-body"><p>The radial and tangential components of acceleration are:
                    \\[a_r = \\ddot{r} - r\\dot{\\theta}^2 \\qquad \\text{(radial)}\\]
                    \\[a_\\theta = r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta} = \\frac{1}{r}\\frac{d}{dt}(r^2\\dot{\\theta}) \\qquad \\text{(tangential)}\\]
                    The term \\(-r\\dot{\\theta}^2\\) is the centripetal acceleration. The term \\(2\\dot{r}\\dot{\\theta}\\) is the Coriolis-like term. Note that \\(a_\\theta = \\frac{1}{r}\\frac{d}{dt}(r^2\\dot{\\theta})\\) involves the angular momentum per unit mass \\(\\ell = r^2\\dot{\\theta}\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-polar-basis',
                    title: 'Polar Basis Vectors: \\(\\hat{\\mathbf{r}}\\) and \\(\\hat{\\boldsymbol{\\theta}}\\) Rotating',
                    description: 'A particle (cyan) moves along a spiral. The blue arrow is \\(\\hat{\\mathbf{r}}\\) and the orange arrow is \\(\\hat{\\boldsymbol{\\theta}}\\). Watch how they rotate with the particle, always maintaining their local orientation.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 40});
                        var speed = 0.8;
                        var trail = [];
                        var maxTrail = 300;

                        VizEngine.createSlider(controls, 'Speed', 0.1, 2, speed, 0.1, function(v) { speed = v; });

                        var showCartesian = true;
                        VizEngine.createButton(controls, 'Toggle Cartesian', function() {
                            showCartesian = !showCartesian;
                        });

                        var t0 = 0;
                        var lastTime = null;

                        function draw(timestamp) {
                            if (!lastTime) lastTime = timestamp;
                            var dt = (timestamp - lastTime) / 1000;
                            lastTime = timestamp;
                            t0 += dt * speed;

                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes('x', 'y');

                            // Spiral: r = 1 + 0.5*t mod period, theta = t
                            var theta = t0;
                            var rr = 1.5 + 1.2 * Math.sin(0.4 * t0);
                            var px = rr * Math.cos(theta);
                            var py = rr * Math.sin(theta);

                            // Draw spiral path lightly
                            viz.drawParametric(
                                function(s) { return (1.5 + 1.2 * Math.sin(0.4 * s)) * Math.cos(s); },
                                function(s) { return (1.5 + 1.2 * Math.sin(0.4 * s)) * Math.sin(s); },
                                t0 - 6 * Math.PI, t0 + 0.01, viz.colors.grid, 1, 500
                            );

                            // Trail
                            trail.push([px, py]);
                            if (trail.length > maxTrail) trail.shift();
                            viz.drawTrail(trail, viz.colors.cyan);

                            // r-hat and theta-hat
                            var rhatX = Math.cos(theta), rhatY = Math.sin(theta);
                            var thatX = -Math.sin(theta), thatY = Math.cos(theta);
                            var basisLen = 1.5;

                            viz.drawVector(px, py, rhatX * basisLen, rhatY * basisLen, viz.colors.blue, 'r-hat', 2.5, 10);
                            viz.drawVector(px, py, thatX * basisLen, thatY * basisLen, viz.colors.orange, 'theta-hat', 2.5, 10);

                            // Optionally show Cartesian basis at the particle (fixed)
                            if (showCartesian) {
                                viz.drawVector(px, py, basisLen, 0, viz.colors.green + '66', 'x-hat', 1.5, 7);
                                viz.drawVector(px, py, 0, basisLen, viz.colors.red + '66', 'y-hat', 1.5, 7);
                            }

                            // Radial line from origin
                            viz.drawSegment(0, 0, px, py, viz.colors.text + '44', 1, true);

                            // Angle arc
                            var displayTheta = ((theta % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
                            viz.drawAngle(0, 0, 0, displayTheta, 0.5, viz.colors.yellow, 'theta');

                            viz.drawBall(px, py, 0.15, viz.colors.cyan, 2);

                            // Velocity decomposition
                            var rdot = 1.2 * 0.4 * Math.cos(0.4 * t0);
                            var vr = rdot;
                            var vtheta = rr * speed;
                            viz.screenText('r = ' + rr.toFixed(2) + ',  theta = ' + (displayTheta * 180 / Math.PI).toFixed(0) + ' deg', 12, 20, viz.colors.white, 12, 'left');
                            viz.screenText('v_r = ' + (vr * speed).toFixed(2) + ',  v_theta = ' + vtheta.toFixed(2), 12, 38, viz.colors.text, 12, 'left');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Derive \\(\\dot{\\hat{\\mathbf{r}}} = \\dot{\\theta}\\hat{\\boldsymbol{\\theta}}\\) from the definition \\(\\hat{\\mathbf{r}} = \\cos\\theta\\,\\hat{\\mathbf{x}} + \\sin\\theta\\,\\hat{\\mathbf{y}}\\).',
                    solution: '\\(\\dot{\\hat{\\mathbf{r}}} = -\\dot{\\theta}\\sin\\theta\\,\\hat{\\mathbf{x}} + \\dot{\\theta}\\cos\\theta\\,\\hat{\\mathbf{y}} = \\dot{\\theta}(-\\sin\\theta\\,\\hat{\\mathbf{x}} + \\cos\\theta\\,\\hat{\\mathbf{y}}) = \\dot{\\theta}\\hat{\\boldsymbol{\\theta}}\\).'
                },
                {
                    question: 'For circular motion \\(r = R\\), \\(\\theta = \\omega t\\) with \\(R, \\omega\\) constant, find the velocity and acceleration in polar components. Identify the centripetal term.',
                    solution: '\\(\\dot{r} = 0\\), \\(\\ddot{r} = 0\\), \\(\\dot{\\theta} = \\omega\\), \\(\\ddot{\\theta} = 0\\). Then \\(\\mathbf{v} = R\\omega\\hat{\\boldsymbol{\\theta}}\\) and \\(\\mathbf{a} = -R\\omega^2\\hat{\\mathbf{r}}\\). The centripetal acceleration is \\(-R\\omega^2\\hat{\\mathbf{r}}\\), pointing inward.'
                }
            ]
        },

        // ===================== Section 3: Cylindrical Coordinates =====================
        {
            id: 'ch01-sec03',
            title: 'Cylindrical Coordinates',
            content: `<h2>Cylindrical Coordinates</h2>

                <p>Cylindrical coordinates \\((\\rho, \\phi, z)\\) are the natural extension of polar coordinates to 3D. They are ideal for problems with axial symmetry, such as motion along or around a cylinder, a wire, or a solenoid.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Cylindrical Coordinates)</div>
                    <div class="env-body"><p>A point in 3D is specified by
                    \\[\\rho = \\sqrt{x^2 + y^2} \\geq 0, \\quad \\phi = \\arctan(y/x), \\quad z = z\\]
                    The inverse relations are \\(x = \\rho\\cos\\phi\\), \\(y = \\rho\\sin\\phi\\), \\(z = z\\).
                    The basis vectors are
                    \\[\\hat{\\boldsymbol{\\rho}} = \\cos\\phi\\,\\hat{\\mathbf{x}} + \\sin\\phi\\,\\hat{\\mathbf{y}}\\]
                    \\[\\hat{\\boldsymbol{\\phi}} = -\\sin\\phi\\,\\hat{\\mathbf{x}} + \\cos\\phi\\,\\hat{\\mathbf{y}}\\]
                    \\[\\hat{\\mathbf{z}} = \\hat{\\mathbf{z}}\\]
                    Note: \\(\\hat{\\boldsymbol{\\rho}}\\) and \\(\\hat{\\boldsymbol{\\phi}}\\) are the same as the polar \\(\\hat{\\mathbf{r}}\\) and \\(\\hat{\\boldsymbol{\\theta}}\\), just with different naming.</p></div>
                </div>

                <h3>Position, Velocity, Acceleration</h3>
                \\[\\mathbf{r} = \\rho\\hat{\\boldsymbol{\\rho}} + z\\hat{\\mathbf{z}}\\]
                \\[\\mathbf{v} = \\dot{\\rho}\\hat{\\boldsymbol{\\rho}} + \\rho\\dot{\\phi}\\hat{\\boldsymbol{\\phi}} + \\dot{z}\\hat{\\mathbf{z}}\\]
                \\[\\mathbf{a} = (\\ddot{\\rho} - \\rho\\dot{\\phi}^2)\\hat{\\boldsymbol{\\rho}} + (\\rho\\ddot{\\phi} + 2\\dot{\\rho}\\dot{\\phi})\\hat{\\boldsymbol{\\phi}} + \\ddot{z}\\hat{\\mathbf{z}}\\]

                <p>The \\(z\\)-component decouples completely. The \\(\\rho\\) and \\(\\phi\\) components are identical to polar coordinates.</p>

                <h3>Line Element and Volume Element</h3>
                \\[d\\mathbf{r} = d\\rho\\,\\hat{\\boldsymbol{\\rho}} + \\rho\\,d\\phi\\,\\hat{\\boldsymbol{\\phi}} + dz\\,\\hat{\\mathbf{z}}\\]
                \\[ds^2 = d\\rho^2 + \\rho^2\\,d\\phi^2 + dz^2\\]
                \\[dV = \\rho\\,d\\rho\\,d\\phi\\,dz\\]

                <div class="env-block remark">
                    <div class="env-title">Scale Factors</div>
                    <div class="env-body"><p>The factor of \\(\\rho\\) in the \\(\\phi\\) term of \\(d\\mathbf{r}\\) is a <strong>scale factor</strong>: \\(h_\\rho = 1\\), \\(h_\\phi = \\rho\\), \\(h_z = 1\\). These scale factors appear in grad, div, curl in curvilinear coordinates. For the gradient:
                    \\[\\nabla f = \\frac{\\partial f}{\\partial \\rho}\\hat{\\boldsymbol{\\rho}} + \\frac{1}{\\rho}\\frac{\\partial f}{\\partial \\phi}\\hat{\\boldsymbol{\\phi}} + \\frac{\\partial f}{\\partial z}\\hat{\\mathbf{z}}\\]</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (Helical Motion)</div>
                    <div class="env-body"><p>A charged particle in a uniform magnetic field along \\(\\hat{\\mathbf{z}}\\) moves in a helix: \\(\\rho = R\\), \\(\\phi = \\omega t\\), \\(z = v_0 t\\). The velocity is \\(\\mathbf{v} = R\\omega\\hat{\\boldsymbol{\\phi}} + v_0\\hat{\\mathbf{z}}\\) and the acceleration is \\(\\mathbf{a} = -R\\omega^2\\hat{\\boldsymbol{\\rho}}\\), purely centripetal.</p></div>
                </div>`,

            visualizations: [],
            exercises: [
                {
                    question: 'A bead slides along a helical wire: \\(\\rho = R\\), \\(\\phi = \\omega t\\), \\(z = bt\\). Find the speed \\(|\\mathbf{v}|\\) and the magnitude of acceleration.',
                    solution: '\\(\\mathbf{v} = R\\omega\\hat{\\boldsymbol{\\phi}} + b\\hat{\\mathbf{z}}\\). Speed: \\(|\\mathbf{v}| = \\sqrt{R^2\\omega^2 + b^2}\\). Acceleration: \\(\\mathbf{a} = -R\\omega^2\\hat{\\boldsymbol{\\rho}}\\), so \\(|\\mathbf{a}| = R\\omega^2\\).'
                },
                {
                    question: 'Write \\(\\nabla \\cdot \\mathbf{F}\\) and \\(\\nabla \\times \\mathbf{F}\\) in cylindrical coordinates for a general \\(\\mathbf{F} = F_\\rho\\hat{\\boldsymbol{\\rho}} + F_\\phi\\hat{\\boldsymbol{\\phi}} + F_z\\hat{\\mathbf{z}}\\).',
                    solution: '\\(\\nabla\\cdot\\mathbf{F} = \\frac{1}{\\rho}\\frac{\\partial}{\\partial\\rho}(\\rho F_\\rho) + \\frac{1}{\\rho}\\frac{\\partial F_\\phi}{\\partial\\phi} + \\frac{\\partial F_z}{\\partial z}\\). The curl is \\(\\nabla\\times\\mathbf{F} = \\left(\\frac{1}{\\rho}\\frac{\\partial F_z}{\\partial\\phi} - \\frac{\\partial F_\\phi}{\\partial z}\\right)\\hat{\\boldsymbol{\\rho}} + \\left(\\frac{\\partial F_\\rho}{\\partial z} - \\frac{\\partial F_z}{\\partial\\rho}\\right)\\hat{\\boldsymbol{\\phi}} + \\frac{1}{\\rho}\\left(\\frac{\\partial}{\\partial\\rho}(\\rho F_\\phi) - \\frac{\\partial F_\\rho}{\\partial\\phi}\\right)\\hat{\\mathbf{z}}\\).'
                }
            ]
        },

        // ===================== Section 4: Spherical Coordinates =====================
        {
            id: 'ch01-sec04',
            title: 'Spherical Coordinates',
            content: `<h2>Spherical Coordinates</h2>

                <p>Spherical coordinates are essential for central force problems (gravity, Coulomb) and any situation with spherical symmetry. They are also the natural coordinates for the surface of the Earth.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Spherical Coordinates)</div>
                    <div class="env-body"><p>A point in 3D is specified by
                    \\[r \\geq 0, \\quad 0 \\leq \\theta \\leq \\pi, \\quad 0 \\leq \\phi < 2\\pi\\]
                    where \\(r\\) is the distance from the origin, \\(\\theta\\) is the polar angle from the \\(+z\\) axis, and \\(\\phi\\) is the azimuthal angle in the \\(xy\\)-plane from \\(+x\\). The conversion to Cartesian is:
                    \\[x = r\\sin\\theta\\cos\\phi, \\quad y = r\\sin\\theta\\sin\\phi, \\quad z = r\\cos\\theta\\]</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Convention Warning</div>
                    <div class="env-body"><p>The physics convention (used here and in Kleppner & Kolenkow, Griffiths, Jackson) is \\(\\theta\\) = polar, \\(\\phi\\) = azimuthal. The mathematics convention (used in some calculus texts) swaps them. Always check the convention.</p></div>
                </div>

                <h3>Basis Vectors</h3>
                \\[\\hat{\\mathbf{r}} = \\sin\\theta\\cos\\phi\\,\\hat{\\mathbf{x}} + \\sin\\theta\\sin\\phi\\,\\hat{\\mathbf{y}} + \\cos\\theta\\,\\hat{\\mathbf{z}}\\]
                \\[\\hat{\\boldsymbol{\\theta}} = \\cos\\theta\\cos\\phi\\,\\hat{\\mathbf{x}} + \\cos\\theta\\sin\\phi\\,\\hat{\\mathbf{y}} - \\sin\\theta\\,\\hat{\\mathbf{z}}\\]
                \\[\\hat{\\boldsymbol{\\phi}} = -\\sin\\phi\\,\\hat{\\mathbf{x}} + \\cos\\phi\\,\\hat{\\mathbf{y}}\\]

                <p>These form a right-handed orthonormal triad at every point: \\(\\hat{\\mathbf{r}} \\times \\hat{\\boldsymbol{\\theta}} = \\hat{\\boldsymbol{\\phi}}\\).</p>

                <h3>Velocity and Acceleration</h3>
                <p>Position: \\(\\mathbf{r} = r\\hat{\\mathbf{r}}\\). The velocity is (after considerable algebra with the time derivatives of the basis vectors):</p>
                \\[\\mathbf{v} = \\dot{r}\\hat{\\mathbf{r}} + r\\dot{\\theta}\\hat{\\boldsymbol{\\theta}} + r\\sin\\theta\\,\\dot{\\phi}\\hat{\\boldsymbol{\\phi}}\\]

                <p>The acceleration is:</p>
                \\[\\mathbf{a} = (\\ddot{r} - r\\dot{\\theta}^2 - r\\sin^2\\theta\\,\\dot{\\phi}^2)\\hat{\\mathbf{r}}\\]
                \\[\\quad + (r\\ddot{\\theta} + 2\\dot{r}\\dot{\\theta} - r\\sin\\theta\\cos\\theta\\,\\dot{\\phi}^2)\\hat{\\boldsymbol{\\theta}}\\]
                \\[\\quad + (r\\sin\\theta\\,\\ddot{\\phi} + 2\\dot{r}\\sin\\theta\\,\\dot{\\phi} + 2r\\dot{\\theta}\\cos\\theta\\,\\dot{\\phi})\\hat{\\boldsymbol{\\phi}}\\]

                <div class="env-block remark">
                    <div class="env-title">Line and Volume Elements</div>
                    <div class="env-body"><p>
                    \\[d\\mathbf{r} = dr\\,\\hat{\\mathbf{r}} + r\\,d\\theta\\,\\hat{\\boldsymbol{\\theta}} + r\\sin\\theta\\,d\\phi\\,\\hat{\\boldsymbol{\\phi}}\\]
                    Scale factors: \\(h_r = 1\\), \\(h_\\theta = r\\), \\(h_\\phi = r\\sin\\theta\\). The volume element is
                    \\[dV = r^2\\sin\\theta\\,dr\\,d\\theta\\,d\\phi\\]
                    The factor \\(r^2\\sin\\theta\\) is the Jacobian of the coordinate transformation.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Gradient in Spherical Coordinates)</div>
                    <div class="env-body"><p>
                    \\[\\nabla f = \\frac{\\partial f}{\\partial r}\\hat{\\mathbf{r}} + \\frac{1}{r}\\frac{\\partial f}{\\partial\\theta}\\hat{\\boldsymbol{\\theta}} + \\frac{1}{r\\sin\\theta}\\frac{\\partial f}{\\partial\\phi}\\hat{\\boldsymbol{\\phi}}\\]
                    For a central potential \\(V(r)\\), the gradient is simply \\(\\nabla V = V'(r)\\hat{\\mathbf{r}}\\), which is radial.</p></div>
                </div>`,

            visualizations: [],
            exercises: [
                {
                    question: 'A particle moves on the surface of a sphere of radius \\(R\\) with \\(\\theta(t) = \\pi/4\\) (constant latitude) and \\(\\phi = \\omega t\\). Find its velocity and acceleration.',
                    hint: 'Since \\(r = R\\), \\(\\dot{r} = 0\\), \\(\\dot{\\theta} = 0\\). Plug into the spherical formulas.',
                    solution: '\\(\\mathbf{v} = R\\sin(\\pi/4)\\omega\\hat{\\boldsymbol{\\phi}} = \\frac{R\\omega}{\\sqrt{2}}\\hat{\\boldsymbol{\\phi}}\\). For acceleration, with \\(\\dot{r}=\\ddot{r}=\\dot{\\theta}=\\ddot{\\theta}=\\ddot{\\phi}=0\\): \\(a_r = -R\\sin^2(\\pi/4)\\omega^2 = -R\\omega^2/2\\), \\(a_\\theta = -R\\sin(\\pi/4)\\cos(\\pi/4)\\omega^2 = -R\\omega^2/2\\), \\(a_\\phi = 0\\). So \\(\\mathbf{a} = -\\frac{R\\omega^2}{2}(\\hat{\\mathbf{r}} + \\hat{\\boldsymbol{\\theta}})\\).'
                }
            ]
        },

        // ===================== Section 5: Velocity Decomposition Comparison =====================
        {
            id: 'ch01-sec05',
            title: 'Velocity Decomposition Compared',
            content: `<h2>Velocity Decomposition: Cartesian vs. Polar</h2>

                <p>To develop true fluency with coordinate systems, it is essential to see the same motion described simultaneously in multiple coordinate systems. The velocity vector \\(\\mathbf{v}\\) is one and the same physical quantity; only its <em>components</em> change with the coordinate system.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Transformation of Velocity Components)</div>
                    <div class="env-body"><p>The Cartesian and polar components of velocity are related by the rotation:
                    \\[\\begin{pmatrix} v_r \\\\ v_\\theta \\end{pmatrix} = \\begin{pmatrix} \\cos\\theta & \\sin\\theta \\\\ -\\sin\\theta & \\cos\\theta \\end{pmatrix} \\begin{pmatrix} v_x \\\\ v_y \\end{pmatrix}\\]
                    This is the rotation matrix that takes the fixed basis to the local basis at angle \\(\\theta\\).</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-velocity-decomp"></div>

                <h3>When to Use Which Coordinate System</h3>
                <table style="width:100%; border-collapse:collapse; margin:1em 0;">
                    <tr style="border-bottom:1px solid #30363d;">
                        <th style="padding:8px; text-align:left; color:#8b949e;">Symmetry</th>
                        <th style="padding:8px; text-align:left; color:#8b949e;">Best Coordinates</th>
                        <th style="padding:8px; text-align:left; color:#8b949e;">Example</th>
                    </tr>
                    <tr style="border-bottom:1px solid #1a1a40;">
                        <td style="padding:8px;">None / rectilinear</td>
                        <td style="padding:8px;">Cartesian</td>
                        <td style="padding:8px;">Blocks on planes, coupled springs</td>
                    </tr>
                    <tr style="border-bottom:1px solid #1a1a40;">
                        <td style="padding:8px;">Circular / rotational (2D)</td>
                        <td style="padding:8px;">Polar</td>
                        <td style="padding:8px;">Central force in a plane, orbits</td>
                    </tr>
                    <tr style="border-bottom:1px solid #1a1a40;">
                        <td style="padding:8px;">Axial (cylinder)</td>
                        <td style="padding:8px;">Cylindrical</td>
                        <td style="padding:8px;">Charged particle in solenoid, bead on helix</td>
                    </tr>
                    <tr>
                        <td style="padding:8px;">Spherical / central</td>
                        <td style="padding:8px;">Spherical</td>
                        <td style="padding:8px;">Gravity, Kepler problem, pendulum on sphere</td>
                    </tr>
                </table>

                <div class="env-block intuition">
                    <div class="env-title">The Principle of Choosing Coordinates</div>
                    <div class="env-body"><p>Good coordinates make the physics obvious. If a force is always radial, polar/spherical coordinates let you write \\(F_\\theta = 0\\) immediately, which constrains the motion. In Cartesian, the same constraint is a coupled system of equations that obscures the simplicity.</p></div>
                </div>

                <h3>General Orthogonal Curvilinear Coordinates</h3>
                <p>All the coordinate systems above are special cases of <strong>orthogonal curvilinear coordinates</strong> \\((q_1, q_2, q_3)\\) with scale factors \\(h_1, h_2, h_3\\) defined by
                \\[d\\mathbf{r} = h_1 dq_1\\,\\hat{\\mathbf{e}}_1 + h_2 dq_2\\,\\hat{\\mathbf{e}}_2 + h_3 dq_3\\,\\hat{\\mathbf{e}}_3\\]
                The velocity is \\(\\mathbf{v} = h_1\\dot{q}_1\\hat{\\mathbf{e}}_1 + h_2\\dot{q}_2\\hat{\\mathbf{e}}_2 + h_3\\dot{q}_3\\hat{\\mathbf{e}}_3\\) and the kinetic energy is
                \\[T = \\frac{1}{2}m(h_1^2\\dot{q}_1^2 + h_2^2\\dot{q}_2^2 + h_3^2\\dot{q}_3^2)\\]
                This formula will be the starting point for Lagrangian mechanics in Chapter 20.</p>`,

            visualizations: [
                {
                    id: 'viz-velocity-decomp',
                    title: 'Velocity in Cartesian vs. Polar Coordinates',
                    description: 'A particle moves along an elliptical orbit. The velocity vector (white) is decomposed into Cartesian components \\((v_x, v_y)\\) (green) and polar components \\((v_r, v_\\theta)\\) (blue/orange). Both decompositions give the same vector.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 45});
                        var speed = 0.7;

                        VizEngine.createSlider(controls, 'Speed', 0.1, 2, speed, 0.1, function(v) { speed = v; });

                        var showCartesian = true, showPolar = true;
                        VizEngine.createButton(controls, 'Toggle Cartesian', function() { showCartesian = !showCartesian; });
                        VizEngine.createButton(controls, 'Toggle Polar', function() { showPolar = !showPolar; });

                        var t0 = 0;
                        var lastTime = null;
                        var trail = [];
                        var maxTrail = 250;

                        function draw(timestamp) {
                            if (!lastTime) lastTime = timestamp;
                            var dt = (timestamp - lastTime) / 1000;
                            lastTime = timestamp;
                            t0 += dt * speed;

                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes('x', 'y');

                            // Elliptical orbit
                            var aa = 3.5, bb = 2.2;
                            var px = aa * Math.cos(t0);
                            var py = bb * Math.sin(t0);
                            var vx = -aa * Math.sin(t0) * speed;
                            var vy = bb * Math.cos(t0) * speed;

                            // Draw full orbit lightly
                            viz.drawParametric(
                                function(s) { return aa * Math.cos(s); },
                                function(s) { return bb * Math.sin(s); },
                                0, 2 * Math.PI, viz.colors.grid, 1, 300
                            );

                            trail.push([px, py]);
                            if (trail.length > maxTrail) trail.shift();
                            viz.drawTrail(trail, viz.colors.cyan);

                            // Total velocity (white)
                            var vScale = 0.6;
                            viz.drawVector(px, py, vx * vScale, vy * vScale, viz.colors.white, 'v', 3, 11);

                            // Cartesian decomposition
                            if (showCartesian) {
                                viz.drawVector(px, py, vx * vScale, 0, viz.colors.green, 'vx', 1.5, 7);
                                viz.drawVector(px + vx * vScale, py, 0, vy * vScale, viz.colors.green, 'vy', 1.5, 7);
                            }

                            // Polar decomposition
                            if (showPolar) {
                                var rr = Math.sqrt(px * px + py * py);
                                if (rr > 0.01) {
                                    var rhatx = px / rr, rhaty = py / rr;
                                    var thatx = -rhaty, thaty = rhatx;
                                    var vr = vx * rhatx + vy * rhaty;
                                    var vt = vx * thatx + vy * thaty;
                                    viz.drawVector(px, py, rhatx * vr * vScale, rhaty * vr * vScale, viz.colors.blue, 'v_r', 1.5, 7);
                                    viz.drawVector(px + rhatx * vr * vScale, py + rhaty * vr * vScale, thatx * vt * vScale, thaty * vt * vScale, viz.colors.orange, 'v_th', 1.5, 7);
                                }
                            }

                            // Radial line
                            viz.drawSegment(0, 0, px, py, viz.colors.text + '33', 1, true);

                            viz.drawBall(px, py, 0.12, viz.colors.cyan, 2);

                            // Labels
                            var rr2 = Math.sqrt(px * px + py * py);
                            var th2 = Math.atan2(py, px);
                            if (th2 < 0) th2 += 2 * Math.PI;
                            viz.screenText('Cartesian: vx=' + vx.toFixed(2) + ', vy=' + vy.toFixed(2), 12, 20, viz.colors.green, 11, 'left');
                            if (rr2 > 0.01) {
                                var rh = px / rr2, th = -py / rr2;
                                var vrr = vx * (px / rr2) + vy * (py / rr2);
                                var vtt = vx * (-py / rr2) + vy * (px / rr2);
                                viz.screenText('Polar: v_r=' + vrr.toFixed(2) + ', v_th=' + vtt.toFixed(2), 12, 38, viz.colors.blue, 11, 'left');
                            }
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Verify the rotation matrix relation: for a particle at angle \\(\\theta = \\pi/3\\) with Cartesian velocity \\((v_x, v_y) = (1, \\sqrt{3})\\), compute \\(v_r\\) and \\(v_\\theta\\) using both the rotation matrix and the definitions \\(v_r = \\dot{r}\\), \\(v_\\theta = r\\dot{\\theta}\\).',
                    hint: 'For the rotation matrix approach, just multiply. For the definition approach, use \\(r = \\sqrt{x^2+y^2}\\) and \\(\\theta = \\arctan(y/x)\\).',
                    solution: 'Rotation matrix at \\(\\theta = \\pi/3\\): \\(v_r = \\cos(\\pi/3)\\cdot 1 + \\sin(\\pi/3)\\cdot\\sqrt{3} = 1/2 + 3/2 = 2\\). \\(v_\\theta = -\\sin(\\pi/3)\\cdot 1 + \\cos(\\pi/3)\\cdot\\sqrt{3} = -\\sqrt{3}/2 + \\sqrt{3}/2 = 0\\). So the velocity is purely radial, which makes sense: the velocity \\((1, \\sqrt{3})\\) has angle \\(\\arctan(\\sqrt{3}/1) = \\pi/3\\), the same as the position angle.'
                },
                {
                    question: 'Write the kinetic energy in spherical coordinates using the general formula \\(T = \\frac{1}{2}m(h_1^2\\dot{q}_1^2 + h_2^2\\dot{q}_2^2 + h_3^2\\dot{q}_3^2)\\).',
                    solution: 'The scale factors are \\(h_r = 1\\), \\(h_\\theta = r\\), \\(h_\\phi = r\\sin\\theta\\). So \\(T = \\frac{1}{2}m(\\dot{r}^2 + r^2\\dot{\\theta}^2 + r^2\\sin^2\\theta\\,\\dot{\\phi}^2)\\).'
                }
            ]
        }
    ]
});
