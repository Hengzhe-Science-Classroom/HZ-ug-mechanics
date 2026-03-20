window.CHAPTERS = window.CHAPTERS || [];
window.CHAPTERS.push({
    id: 'ch00',
    number: 0,
    title: 'Vectors & Vector Calculus',
    subtitle: 'The language of mechanics: dot product, cross product, vector differentiation, and a preview of div/grad/curl',
    sections: [
        // ===================== Section 1: Vectors and Their Algebra =====================
        {
            id: 'ch00-sec01',
            title: 'Vectors and Their Algebra',
            content: `<h2>Vectors and Their Algebra</h2>

                <div class="env-block intuition">
                    <div class="env-title">Why Vectors?</div>
                    <div class="env-body"><p>Mechanics is fundamentally about quantities that have both magnitude and direction: forces, velocities, accelerations, angular momenta. Scalar quantities (mass, energy, temperature) are not enough. The language of vectors lets us express Newton's laws in a form that is independent of our choice of coordinate system, which is physically essential since the laws of nature do not depend on how we label points in space.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Vector)</div>
                    <div class="env-body"><p>A <strong>vector</strong> in \\(\\mathbb{R}^n\\) is an element of the vector space \\(\\mathbb{R}^n\\). In mechanics we work primarily in \\(\\mathbb{R}^3\\). A vector \\(\\mathbf{A}\\) can be written in terms of a basis \\(\\{\\hat{\\mathbf{e}}_1, \\hat{\\mathbf{e}}_2, \\hat{\\mathbf{e}}_3\\}\\) as
                    \\[\\mathbf{A} = A_1\\,\\hat{\\mathbf{e}}_1 + A_2\\,\\hat{\\mathbf{e}}_2 + A_3\\,\\hat{\\mathbf{e}}_3 = \\sum_{i=1}^{3} A_i\\,\\hat{\\mathbf{e}}_i\\]
                    The scalars \\(A_i\\) are the <strong>components</strong> of \\(\\mathbf{A}\\) with respect to the chosen basis.</p></div>
                </div>

                <p>In the standard Cartesian basis \\(\\{\\hat{\\mathbf{x}}, \\hat{\\mathbf{y}}, \\hat{\\mathbf{z}}\\}\\), we write \\(\\mathbf{A} = A_x\\hat{\\mathbf{x}} + A_y\\hat{\\mathbf{y}} + A_z\\hat{\\mathbf{z}}\\). The <strong>magnitude</strong> (or norm) of a vector is</p>
                \\[|\\mathbf{A}| = \\sqrt{A_x^2 + A_y^2 + A_z^2}\\]

                <p>A <strong>unit vector</strong> is a vector of magnitude 1. Given any nonzero \\(\\mathbf{A}\\), its unit vector is \\(\\hat{\\mathbf{A}} = \\mathbf{A}/|\\mathbf{A}|\\).</p>

                <h3>Vector Addition and Scalar Multiplication</h3>
                <p>Vectors add component-wise:
                \\[\\mathbf{A} + \\mathbf{B} = (A_x + B_x)\\hat{\\mathbf{x}} + (A_y + B_y)\\hat{\\mathbf{y}} + (A_z + B_z)\\hat{\\mathbf{z}}\\]
                Scalar multiplication scales each component: \\(c\\mathbf{A} = (cA_x, cA_y, cA_z)\\).</p>

                <div class="env-block remark">
                    <div class="env-title">Coordinate-Free Thinking</div>
                    <div class="env-body"><p>Although we often write vectors in components for calculation, the vector itself exists independently of any coordinate system. The equation \\(\\mathbf{F} = m\\mathbf{a}\\) is meaningful before we choose axes. This coordinate-free viewpoint is essential for physics: it reminds us that nature does not care about our labeling conventions.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-vector-addition"></div>

                <h3>Linear Independence and Basis</h3>
                <p>A set of vectors \\(\\{\\mathbf{v}_1, \\ldots, \\mathbf{v}_k\\}\\) is <strong>linearly independent</strong> if the only solution to \\(c_1\\mathbf{v}_1 + \\cdots + c_k\\mathbf{v}_k = \\mathbf{0}\\) is \\(c_1 = \\cdots = c_k = 0\\). In \\(\\mathbb{R}^3\\), any three linearly independent vectors form a <strong>basis</strong>, meaning every vector can be uniquely written as a linear combination of them.</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Basis Expansion)</div>
                    <div class="env-body"><p>If \\(\\{\\mathbf{e}_1, \\mathbf{e}_2, \\mathbf{e}_3\\}\\) is a basis for \\(\\mathbb{R}^3\\), then for every \\(\\mathbf{v} \\in \\mathbb{R}^3\\) there exist unique scalars \\(v_1, v_2, v_3\\) such that \\(\\mathbf{v} = v_1\\mathbf{e}_1 + v_2\\mathbf{e}_2 + v_3\\mathbf{e}_3\\).</p></div>
                </div>`,

            visualizations: [
                {
                    id: 'viz-vector-addition',
                    title: 'Vector Addition and Scalar Multiplication',
                    description: 'Drag the tips of \\(\\mathbf{A}\\) (blue) and \\(\\mathbf{B}\\) (orange) to see their sum \\(\\mathbf{A}+\\mathbf{B}\\) (green) constructed via the parallelogram rule.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 40});
                        var dA = viz.addDraggable('A', 3, 2, viz.colors.blue);
                        var dB = viz.addDraggable('B', -1, 3, viz.colors.orange);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes('x', 'y');

                            var ax = dA.x, ay = dA.y;
                            var bx = dB.x, by = dB.y;

                            // Parallelogram dashed lines
                            viz.drawSegment(ax, ay, ax + bx, ay + by, viz.colors.orange + '66', 1.5, true);
                            viz.drawSegment(bx, by, ax + bx, ay + by, viz.colors.blue + '66', 1.5, true);

                            // Vectors
                            viz.drawVector(0, 0, ax, ay, viz.colors.blue, 'A', 2.5);
                            viz.drawVector(0, 0, bx, by, viz.colors.orange, 'B', 2.5);
                            viz.drawVector(0, 0, ax + bx, ay + by, viz.colors.green, 'A+B', 3);

                            // Magnitudes
                            var magA = Math.sqrt(ax * ax + ay * ay).toFixed(2);
                            var magB = Math.sqrt(bx * bx + by * by).toFixed(2);
                            var magS = Math.sqrt((ax + bx) * (ax + bx) + (ay + by) * (ay + by)).toFixed(2);
                            viz.screenText('|A| = ' + magA, 12, 20, viz.colors.blue, 12, 'left');
                            viz.screenText('|B| = ' + magB, 12, 36, viz.colors.orange, 12, 'left');
                            viz.screenText('|A+B| = ' + magS, 12, 52, viz.colors.green, 12, 'left');

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Given \\(\\mathbf{A} = 3\\hat{\\mathbf{x}} - 2\\hat{\\mathbf{y}} + \\hat{\\mathbf{z}}\\) and \\(\\mathbf{B} = -\\hat{\\mathbf{x}} + 4\\hat{\\mathbf{y}} + 2\\hat{\\mathbf{z}}\\), find \\(2\\mathbf{A} - 3\\mathbf{B}\\) and its magnitude.',
                    hint: 'Distribute the scalars, then add component-wise.',
                    solution: '\\(2\\mathbf{A} - 3\\mathbf{B} = (6+3)\\hat{\\mathbf{x}} + (-4-12)\\hat{\\mathbf{y}} + (2-6)\\hat{\\mathbf{z}} = 9\\hat{\\mathbf{x}} - 16\\hat{\\mathbf{y}} - 4\\hat{\\mathbf{z}}\\). Magnitude: \\(\\sqrt{81+256+16} = \\sqrt{353} \\approx 18.79\\).'
                },
                {
                    question: 'Show that if \\(\\mathbf{A}\\) and \\(\\mathbf{B}\\) are nonzero, then \\(|\\mathbf{A} + \\mathbf{B}| \\leq |\\mathbf{A}| + |\\mathbf{B}|\\) (the triangle inequality).',
                    hint: 'Square both sides and use the fact that \\(\\mathbf{A} \\cdot \\mathbf{B} \\leq |\\mathbf{A}||\\mathbf{B}|\\).',
                    solution: '\\(|\\mathbf{A}+\\mathbf{B}|^2 = (\\mathbf{A}+\\mathbf{B})\\cdot(\\mathbf{A}+\\mathbf{B}) = |\\mathbf{A}|^2 + 2\\mathbf{A}\\cdot\\mathbf{B} + |\\mathbf{B}|^2 \\leq |\\mathbf{A}|^2 + 2|\\mathbf{A}||\\mathbf{B}| + |\\mathbf{B}|^2 = (|\\mathbf{A}|+|\\mathbf{B}|)^2\\). Taking square roots gives the result.'
                }
            ]
        },

        // ===================== Section 2: The Dot Product =====================
        {
            id: 'ch00-sec02',
            title: 'The Dot Product',
            content: `<h2>The Dot Product</h2>

                <p>The dot product (inner product) is the fundamental tool for measuring angles, projections, and work in mechanics.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Dot Product)</div>
                    <div class="env-body"><p>For \\(\\mathbf{A}, \\mathbf{B} \\in \\mathbb{R}^3\\), the <strong>dot product</strong> is
                    \\[\\mathbf{A} \\cdot \\mathbf{B} = A_xB_x + A_yB_y + A_zB_z = \\sum_{i=1}^3 A_iB_i\\]
                    Equivalently, in coordinate-free form:
                    \\[\\mathbf{A} \\cdot \\mathbf{B} = |\\mathbf{A}|\\,|\\mathbf{B}|\\cos\\theta\\]
                    where \\(\\theta\\) is the angle between the two vectors.</p></div>
                </div>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Equivalence of Definitions)</div>
                    <div class="env-body"><p>The two definitions are equivalent. Proof: By the law of cosines applied to the triangle with sides \\(\\mathbf{A}\\), \\(\\mathbf{B}\\), and \\(\\mathbf{A}-\\mathbf{B}\\):
                    \\[|\\mathbf{A}-\\mathbf{B}|^2 = |\\mathbf{A}|^2 + |\\mathbf{B}|^2 - 2|\\mathbf{A}||\\mathbf{B}|\\cos\\theta\\]
                    Expanding the left side: \\(|\\mathbf{A}-\\mathbf{B}|^2 = |\\mathbf{A}|^2 - 2\\sum A_iB_i + |\\mathbf{B}|^2\\). Comparing gives \\(\\sum A_iB_i = |\\mathbf{A}||\\mathbf{B}|\\cos\\theta\\).</p></div>
                </div>

                <h3>Properties of the Dot Product</h3>
                <ul>
                    <li><strong>Commutativity:</strong> \\(\\mathbf{A}\\cdot\\mathbf{B} = \\mathbf{B}\\cdot\\mathbf{A}\\)</li>
                    <li><strong>Distributivity:</strong> \\(\\mathbf{A}\\cdot(\\mathbf{B}+\\mathbf{C}) = \\mathbf{A}\\cdot\\mathbf{B} + \\mathbf{A}\\cdot\\mathbf{C}\\)</li>
                    <li><strong>Scalar association:</strong> \\((c\\mathbf{A})\\cdot\\mathbf{B} = c(\\mathbf{A}\\cdot\\mathbf{B})\\)</li>
                    <li><strong>Positive definiteness:</strong> \\(\\mathbf{A}\\cdot\\mathbf{A} = |\\mathbf{A}|^2 \\geq 0\\), with equality iff \\(\\mathbf{A} = \\mathbf{0}\\)</li>
                </ul>

                <h3>Projection</h3>
                <p>The <strong>scalar projection</strong> of \\(\\mathbf{A}\\) onto \\(\\mathbf{B}\\) is
                \\[\\text{comp}_{\\mathbf{B}}\\mathbf{A} = \\frac{\\mathbf{A}\\cdot\\mathbf{B}}{|\\mathbf{B}|} = |\\mathbf{A}|\\cos\\theta\\]
                The <strong>vector projection</strong> is
                \\[\\text{proj}_{\\mathbf{B}}\\mathbf{A} = \\frac{\\mathbf{A}\\cdot\\mathbf{B}}{|\\mathbf{B}|^2}\\,\\mathbf{B}\\]
                This decomposes \\(\\mathbf{A}\\) into a component parallel to \\(\\mathbf{B}\\) and a component perpendicular to it:
                \\[\\mathbf{A} = \\text{proj}_{\\mathbf{B}}\\mathbf{A} + \\mathbf{A}_\\perp\\]</p>

                <div class="env-block example">
                    <div class="env-title">Example (Work)</div>
                    <div class="env-body"><p>In mechanics, the work done by a constant force \\(\\mathbf{F}\\) over a displacement \\(\\mathbf{d}\\) is \\(W = \\mathbf{F}\\cdot\\mathbf{d} = |\\mathbf{F}||\\mathbf{d}|\\cos\\theta\\). Only the component of force along the displacement does work.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-dot-product"></div>`,

            visualizations: [
                {
                    id: 'viz-dot-product',
                    title: 'Dot Product as Projection',
                    description: 'Drag \\(\\mathbf{A}\\) (blue) and \\(\\mathbf{B}\\) (orange). The green segment shows the projection of \\(\\mathbf{A}\\) onto \\(\\mathbf{B}\\). The shaded area represents the scalar \\(\\mathbf{A}\\cdot\\mathbf{B}\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 40});
                        var dA = viz.addDraggable('A', 3, 2.5, viz.colors.blue);
                        var dB = viz.addDraggable('B', 4, 0.5, viz.colors.orange);

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes('x', 'y');

                            var ax = dA.x, ay = dA.y;
                            var bx = dB.x, by = dB.y;
                            var bMag2 = bx * bx + by * by;
                            if (bMag2 < 0.001) { viz.drawDraggables(); return; }

                            // Projection scalar
                            var dotAB = ax * bx + ay * by;
                            var bMag = Math.sqrt(bMag2);
                            var projScalar = dotAB / bMag;
                            var projX = (dotAB / bMag2) * bx;
                            var projY = (dotAB / bMag2) * by;

                            // Shaded projection region (right angle marker)
                            viz.drawSegment(projX, projY, ax, ay, viz.colors.green + '55', 1, true);
                            viz.drawSegment(0, 0, projX, projY, viz.colors.green, 3);

                            // Right-angle marker
                            var perpX = ax - projX, perpY = ay - projY;
                            var perpLen = Math.sqrt(perpX * perpX + perpY * perpY);
                            if (perpLen > 0.1) {
                                var markerSize = 0.25;
                                var ux = perpX / perpLen * markerSize;
                                var uy = perpY / perpLen * markerSize;
                                var bux = (bx / bMag) * markerSize;
                                var buy = (by / bMag) * markerSize;
                                viz.drawSegment(projX + ux, projY + uy, projX + ux + bux, projY + uy + buy, viz.colors.green, 1);
                                viz.drawSegment(projX + bux, projY + buy, projX + ux + bux, projY + uy + buy, viz.colors.green, 1);
                            }

                            // Vectors
                            viz.drawVector(0, 0, ax, ay, viz.colors.blue, 'A', 2.5);
                            viz.drawVector(0, 0, bx, by, viz.colors.orange, 'B', 2.5);

                            // Point at projection
                            viz.drawPoint(projX, projY, viz.colors.green, '', 4);

                            // Info
                            var theta = Math.acos(VizEngine.clamp(dotAB / (Math.sqrt(ax * ax + ay * ay) * bMag), -1, 1));
                            viz.screenText('A . B = ' + dotAB.toFixed(2), 12, 20, viz.colors.white, 13, 'left');
                            viz.screenText('|A|cos(theta) = ' + projScalar.toFixed(2), 12, 38, viz.colors.green, 12, 'left');
                            viz.screenText('theta = ' + (theta * 180 / Math.PI).toFixed(1) + ' deg', 12, 56, viz.colors.text, 12, 'left');

                            // Angle arc
                            var angA = Math.atan2(ay, ax);
                            var angB = Math.atan2(by, bx);
                            viz.drawAngle(0, 0, Math.min(angA, angB), Math.max(angA, angB), 0.6, viz.colors.yellow, 'theta');

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Find the angle between \\(\\mathbf{A} = (1, 2, 2)\\) and \\(\\mathbf{B} = (2, -1, 2)\\).',
                    hint: 'Use \\(\\cos\\theta = \\mathbf{A}\\cdot\\mathbf{B}/(|\\mathbf{A}||\\mathbf{B}|)\\).',
                    solution: '\\(\\mathbf{A}\\cdot\\mathbf{B} = 2-2+4 = 4\\), \\(|\\mathbf{A}| = 3\\), \\(|\\mathbf{B}| = 3\\). So \\(\\cos\\theta = 4/9\\) and \\(\\theta = \\arccos(4/9) \\approx 63.6^\\circ\\).'
                },
                {
                    question: 'Prove the Cauchy-Schwarz inequality \\(|\\mathbf{A}\\cdot\\mathbf{B}| \\leq |\\mathbf{A}||\\mathbf{B}|\\) purely from the algebraic definition.',
                    hint: 'Consider \\(|\\mathbf{A} - t\\mathbf{B}|^2 \\geq 0\\) for all \\(t \\in \\mathbb{R}\\) and optimize over \\(t\\).',
                    solution: '\\(0 \\leq |\\mathbf{A} - t\\mathbf{B}|^2 = |\\mathbf{A}|^2 - 2t(\\mathbf{A}\\cdot\\mathbf{B}) + t^2|\\mathbf{B}|^2\\). This quadratic in \\(t\\) is non-negative for all \\(t\\), so its discriminant must be \\(\\leq 0\\): \\(4(\\mathbf{A}\\cdot\\mathbf{B})^2 - 4|\\mathbf{A}|^2|\\mathbf{B}|^2 \\leq 0\\). Hence \\(|\\mathbf{A}\\cdot\\mathbf{B}| \\leq |\\mathbf{A}||\\mathbf{B}|\\).'
                }
            ]
        },

        // ===================== Section 3: The Cross Product =====================
        {
            id: 'ch00-sec03',
            title: 'The Cross Product',
            content: `<h2>The Cross Product</h2>

                <p>While the dot product measures how much two vectors are aligned, the cross product measures how much they are "perpendicular" and gives a new vector orthogonal to both inputs. It is indispensable for torques, angular momentum, and magnetic forces.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Cross Product)</div>
                    <div class="env-body"><p>For \\(\\mathbf{A}, \\mathbf{B} \\in \\mathbb{R}^3\\), the <strong>cross product</strong> is
                    \\[\\mathbf{A} \\times \\mathbf{B} = \\begin{vmatrix} \\hat{\\mathbf{x}} & \\hat{\\mathbf{y}} & \\hat{\\mathbf{z}} \\\\ A_x & A_y & A_z \\\\ B_x & B_y & B_z \\end{vmatrix}\\]
                    \\[= (A_yB_z - A_zB_y)\\hat{\\mathbf{x}} + (A_zB_x - A_xB_z)\\hat{\\mathbf{y}} + (A_xB_y - A_yB_x)\\hat{\\mathbf{z}}\\]
                    The magnitude is
                    \\[|\\mathbf{A} \\times \\mathbf{B}| = |\\mathbf{A}|\\,|\\mathbf{B}|\\sin\\theta\\]
                    and the direction is given by the right-hand rule.</p></div>
                </div>

                <div class="env-block remark">
                    <div class="env-title">Geometric Meaning</div>
                    <div class="env-body"><p>The magnitude \\(|\\mathbf{A}\\times\\mathbf{B}|\\) equals the area of the parallelogram spanned by \\(\\mathbf{A}\\) and \\(\\mathbf{B}\\). The direction is perpendicular to this parallelogram, chosen by the right-hand rule: curl the fingers of your right hand from \\(\\mathbf{A}\\) toward \\(\\mathbf{B}\\) through the smaller angle, and your thumb points along \\(\\mathbf{A}\\times\\mathbf{B}\\).</p></div>
                </div>

                <h3>Properties</h3>
                <ul>
                    <li><strong>Anti-commutativity:</strong> \\(\\mathbf{A}\\times\\mathbf{B} = -\\mathbf{B}\\times\\mathbf{A}\\)</li>
                    <li><strong>Distributivity:</strong> \\(\\mathbf{A}\\times(\\mathbf{B}+\\mathbf{C}) = \\mathbf{A}\\times\\mathbf{B} + \\mathbf{A}\\times\\mathbf{C}\\)</li>
                    <li><strong>Not associative:</strong> \\(\\mathbf{A}\\times(\\mathbf{B}\\times\\mathbf{C}) \\neq (\\mathbf{A}\\times\\mathbf{B})\\times\\mathbf{C}\\) in general</li>
                    <li><strong>Parallel test:</strong> \\(\\mathbf{A}\\times\\mathbf{B} = \\mathbf{0}\\) iff \\(\\mathbf{A}\\) and \\(\\mathbf{B}\\) are parallel (or one is zero)</li>
                </ul>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (BAC-CAB Rule)</div>
                    <div class="env-body"><p>The vector triple product satisfies
                    \\[\\mathbf{A}\\times(\\mathbf{B}\\times\\mathbf{C}) = \\mathbf{B}(\\mathbf{A}\\cdot\\mathbf{C}) - \\mathbf{C}(\\mathbf{A}\\cdot\\mathbf{B})\\]
                    This is the "BAC minus CAB" identity. It is used constantly in electromagnetic theory and angular momentum calculations.</p></div>
                </div>

                <h3>Scalar Triple Product</h3>
                <p>The <strong>scalar triple product</strong> is
                \\[\\mathbf{A}\\cdot(\\mathbf{B}\\times\\mathbf{C}) = \\begin{vmatrix} A_x & A_y & A_z \\\\ B_x & B_y & B_z \\\\ C_x & C_y & C_z \\end{vmatrix}\\]
                Its absolute value equals the volume of the parallelepiped spanned by the three vectors. The triple product is cyclic: \\(\\mathbf{A}\\cdot(\\mathbf{B}\\times\\mathbf{C}) = \\mathbf{B}\\cdot(\\mathbf{C}\\times\\mathbf{A}) = \\mathbf{C}\\cdot(\\mathbf{A}\\times\\mathbf{B})\\).</p>

                <div class="viz-placeholder" data-viz="viz-cross-product"></div>`,

            visualizations: [
                {
                    id: 'viz-cross-product',
                    title: 'Cross Product: Right-Hand Rule & Parallelogram Area',
                    description: 'Drag \\(\\mathbf{A}\\) (blue) and \\(\\mathbf{B}\\) (orange) in the \\(xy\\)-plane. The cross product \\(\\mathbf{A}\\times\\mathbf{B}\\) points along \\(\\hat{\\mathbf{z}}\\) (shown as a circle). The shaded parallelogram has area \\(|\\mathbf{A}\\times\\mathbf{B}|\\).',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 40});
                        var dA = viz.addDraggable('A', 3, 1, viz.colors.blue);
                        var dB = viz.addDraggable('B', 1, 3, viz.colors.orange);

                        var rotAngle = 0;
                        VizEngine.createSlider(controls, 'Rotate view', 0, 360, 0, 1, function(v) {
                            rotAngle = v * Math.PI / 180;
                        });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes('x', 'y');

                            var ax = dA.x, ay = dA.y;
                            var bx = dB.x, by = dB.y;

                            // Cross product z-component
                            var crossZ = ax * by - ay * bx;

                            // Parallelogram
                            viz.drawPolygon(
                                [[0, 0], [ax, ay], [ax + bx, ay + by], [bx, by]],
                                (crossZ >= 0 ? viz.colors.purple : viz.colors.red) + '22',
                                (crossZ >= 0 ? viz.colors.purple : viz.colors.red) + '66',
                                1
                            );

                            // Vectors
                            viz.drawVector(0, 0, ax, ay, viz.colors.blue, 'A', 2.5);
                            viz.drawVector(0, 0, bx, by, viz.colors.orange, 'B', 2.5);

                            // Cross product indicator (dot or cross in circle for z-direction)
                            var ctx = viz.ctx;
                            var sx0 = viz.originX, sy0 = viz.originY;
                            var indicatorR = 14;
                            ctx.strokeStyle = viz.colors.purple;
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.arc(sx0, sy0 - 35, indicatorR, 0, Math.PI * 2);
                            ctx.stroke();
                            if (crossZ > 0.01) {
                                // Dot (out of page)
                                ctx.fillStyle = viz.colors.purple;
                                ctx.beginPath();
                                ctx.arc(sx0, sy0 - 35, 4, 0, Math.PI * 2);
                                ctx.fill();
                            } else if (crossZ < -0.01) {
                                // X (into page)
                                ctx.strokeStyle = viz.colors.red;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(sx0 - 6, sy0 - 35 - 6);
                                ctx.lineTo(sx0 + 6, sy0 - 35 + 6);
                                ctx.moveTo(sx0 + 6, sy0 - 35 - 6);
                                ctx.lineTo(sx0 - 6, sy0 - 35 + 6);
                                ctx.stroke();
                            }

                            // Info
                            var area = Math.abs(crossZ);
                            var sign = crossZ >= 0 ? '+z (out)' : '-z (in)';
                            viz.screenText('A x B = ' + crossZ.toFixed(2) + ' z-hat', 12, 20, viz.colors.purple, 13, 'left');
                            viz.screenText('Area = ' + area.toFixed(2), 12, 38, viz.colors.text, 12, 'left');
                            viz.screenText('Direction: ' + sign, 12, 56, viz.colors.text, 12, 'left');

                            viz.drawDraggables();
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute \\(\\mathbf{A}\\times\\mathbf{B}\\) for \\(\\mathbf{A} = (2, 3, 1)\\) and \\(\\mathbf{B} = (1, -1, 2)\\). Verify that the result is perpendicular to both \\(\\mathbf{A}\\) and \\(\\mathbf{B}\\).',
                    hint: 'Use the determinant formula, then check by dotting the result with \\(\\mathbf{A}\\) and \\(\\mathbf{B}\\).',
                    solution: '\\(\\mathbf{A}\\times\\mathbf{B} = (3\\cdot2 - 1\\cdot(-1), 1\\cdot1 - 2\\cdot2, 2\\cdot(-1) - 3\\cdot1) = (7, -3, -5)\\). Check: \\((7,-3,-5)\\cdot(2,3,1) = 14-9-5=0\\) and \\((7,-3,-5)\\cdot(1,-1,2) = 7+3-10=0\\). Perpendicular to both.'
                },
                {
                    question: 'Prove the BAC-CAB identity \\(\\mathbf{A}\\times(\\mathbf{B}\\times\\mathbf{C}) = \\mathbf{B}(\\mathbf{A}\\cdot\\mathbf{C}) - \\mathbf{C}(\\mathbf{A}\\cdot\\mathbf{B})\\) by direct computation of components.',
                    hint: 'Write \\(\\mathbf{B}\\times\\mathbf{C}\\) in components, then compute \\(\\mathbf{A}\\times\\) that result. Compare with the right side.',
                    solution: 'Let \\(\\mathbf{D} = \\mathbf{B}\\times\\mathbf{C}\\), so \\(D_x = B_yC_z - B_zC_y\\), etc. Then \\((\\mathbf{A}\\times\\mathbf{D})_x = A_yD_z - A_zD_y = A_y(B_xC_y - B_yC_x) - A_z(B_zC_x - B_xC_z)\\). Expanding: \\(B_x(A_yC_y + A_zC_z) - C_x(A_yB_y + A_zB_z)\\). Adding and subtracting \\(A_xB_xC_x\\) gives \\(B_x(\\mathbf{A}\\cdot\\mathbf{C}) - C_x(\\mathbf{A}\\cdot\\mathbf{B})\\). The other components follow identically.'
                }
            ]
        },

        // ===================== Section 4: Vector Differentiation =====================
        {
            id: 'ch00-sec04',
            title: 'Vector Differentiation',
            content: `<h2>Vector Differentiation</h2>

                <p>In mechanics, positions, velocities, and forces are vector-valued functions of time. Differentiating vectors is therefore the central calculus operation in dynamics.</p>

                <div class="env-block definition">
                    <div class="env-title">Definition (Derivative of a Vector Function)</div>
                    <div class="env-body"><p>Let \\(\\mathbf{r}(t) = x(t)\\hat{\\mathbf{x}} + y(t)\\hat{\\mathbf{y}} + z(t)\\hat{\\mathbf{z}}\\) be a vector function of a scalar parameter \\(t\\). Its derivative is
                    \\[\\frac{d\\mathbf{r}}{dt} = \\lim_{\\Delta t \\to 0} \\frac{\\mathbf{r}(t + \\Delta t) - \\mathbf{r}(t)}{\\Delta t} = \\dot{x}\\,\\hat{\\mathbf{x}} + \\dot{y}\\,\\hat{\\mathbf{y}} + \\dot{z}\\,\\hat{\\mathbf{z}}\\]
                    where the dot denotes \\(d/dt\\).</p></div>
                </div>

                <div class="env-block warning">
                    <div class="env-title">Warning: Basis Vectors May Depend on Time</div>
                    <div class="env-body"><p>The formula \\(d\\mathbf{r}/dt = \\dot{x}\\hat{\\mathbf{x}} + \\dot{y}\\hat{\\mathbf{y}} + \\dot{z}\\hat{\\mathbf{z}}\\) assumes the basis vectors \\(\\hat{\\mathbf{x}}, \\hat{\\mathbf{y}}, \\hat{\\mathbf{z}}\\) are constant (as in a Cartesian frame). In polar or spherical coordinates, the basis vectors rotate as the particle moves, and extra terms appear. This is the subject of Chapter 1.</p></div>
                </div>

                <h3>Product Rules for Vectors</h3>
                <p>The familiar product rule extends to vector operations:</p>
                \\[\\frac{d}{dt}(\\mathbf{A}\\cdot\\mathbf{B}) = \\dot{\\mathbf{A}}\\cdot\\mathbf{B} + \\mathbf{A}\\cdot\\dot{\\mathbf{B}}\\]
                \\[\\frac{d}{dt}(\\mathbf{A}\\times\\mathbf{B}) = \\dot{\\mathbf{A}}\\times\\mathbf{B} + \\mathbf{A}\\times\\dot{\\mathbf{B}}\\]
                \\[\\frac{d}{dt}(f\\mathbf{A}) = \\dot{f}\\mathbf{A} + f\\dot{\\mathbf{A}}\\]

                <div class="env-block warning">
                    <div class="env-title">Warning: Order Matters in Cross Products</div>
                    <div class="env-body"><p>In the cross product rule, keep the order: it is \\(\\dot{\\mathbf{A}}\\times\\mathbf{B} + \\mathbf{A}\\times\\dot{\\mathbf{B}}\\), not the reverse. Since the cross product is anti-commutative, reversing the order introduces a sign error.</p></div>
                </div>

                <div class="env-block example">
                    <div class="env-title">Example (Constant-Magnitude Vectors)</div>
                    <div class="env-body"><p>If \\(|\\mathbf{A}(t)|\\) is constant, then \\(\\mathbf{A}\\cdot\\mathbf{A} = |\\mathbf{A}|^2 = \\text{const}\\). Differentiating: \\(2\\mathbf{A}\\cdot\\dot{\\mathbf{A}} = 0\\), so \\(\\dot{\\mathbf{A}} \\perp \\mathbf{A}\\). This is why the velocity of uniform circular motion is perpendicular to the radius vector.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-vector-diff"></div>

                <h3>Integration of Vector Functions</h3>
                <p>Integration is the inverse operation:
                \\[\\int_a^b \\mathbf{F}(t)\\,dt = \\left(\\int_a^b F_x\\,dt\\right)\\hat{\\mathbf{x}} + \\left(\\int_a^b F_y\\,dt\\right)\\hat{\\mathbf{y}} + \\left(\\int_a^b F_z\\,dt\\right)\\hat{\\mathbf{z}}\\]
                In mechanics, the impulse \\(\\mathbf{J} = \\int\\mathbf{F}\\,dt\\) gives the change in momentum.</p>`,

            visualizations: [
                {
                    id: 'viz-vector-diff',
                    title: 'Derivative of a Vector: Tangent to the Trajectory',
                    description: 'A particle traces a Lissajous curve. The position vector \\(\\mathbf{r}(t)\\) (blue) and velocity vector \\(d\\mathbf{r}/dt\\) (green, drawn from the particle) are shown. Note how the velocity is always tangent to the path.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 50});
                        var speed = 1.0;
                        var trail = [];
                        var maxTrail = 200;

                        VizEngine.createSlider(controls, 'Speed', 0.1, 3, 1, 0.1, function(v) { speed = v; });

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

                            // Lissajous: x = 3cos(t), y = 2sin(2t)
                            var wx = 1, wy = 2;
                            var px = 3 * Math.cos(wx * t0);
                            var py = 2 * Math.sin(wy * t0);
                            var vx = -3 * wx * Math.sin(wx * t0);
                            var vy = 2 * wy * Math.cos(wy * t0);

                            // Draw full curve lightly
                            viz.drawParametric(
                                function(s) { return 3 * Math.cos(wx * s); },
                                function(s) { return 2 * Math.sin(wy * s); },
                                0, 2 * Math.PI, viz.colors.grid, 1, 300
                            );

                            // Trail
                            trail.push([px, py]);
                            if (trail.length > maxTrail) trail.shift();
                            viz.drawTrail(trail, viz.colors.blue);

                            // Position vector
                            viz.drawVector(0, 0, px, py, viz.colors.blue, 'r', 2);

                            // Velocity vector (scaled for visibility)
                            var vScale = 0.3;
                            viz.drawVector(px, py, vx * vScale, vy * vScale, viz.colors.green, 'v', 2.5);

                            // Ball
                            viz.drawBall(px, py, 0.12, viz.colors.cyan, 2);

                            // Info
                            viz.screenText('r = (' + px.toFixed(1) + ', ' + py.toFixed(1) + ')', 12, 20, viz.colors.blue, 12, 'left');
                            viz.screenText('v = (' + vx.toFixed(1) + ', ' + vy.toFixed(1) + ')', 12, 38, viz.colors.green, 12, 'left');
                            var vmag = Math.sqrt(vx * vx + vy * vy);
                            viz.screenText('|v| = ' + vmag.toFixed(2), 12, 56, viz.colors.text, 12, 'left');
                        }

                        viz.animate(draw);
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'A particle has position \\(\\mathbf{r}(t) = (t^2, \\sin t, e^{-t})\\). Find \\(\\mathbf{v}(t)\\) and \\(\\mathbf{a}(t)\\).',
                    solution: '\\(\\mathbf{v} = (2t, \\cos t, -e^{-t})\\). \\(\\mathbf{a} = (2, -\\sin t, e^{-t})\\).'
                },
                {
                    question: 'Prove the product rule for the cross product: \\(\\frac{d}{dt}(\\mathbf{A}\\times\\mathbf{B}) = \\dot{\\mathbf{A}}\\times\\mathbf{B} + \\mathbf{A}\\times\\dot{\\mathbf{B}}\\).',
                    hint: 'Write out the \\(x\\)-component of both sides using the definition \\((\\mathbf{A}\\times\\mathbf{B})_x = A_yB_z - A_zB_y\\) and differentiate.',
                    solution: '\\(\\frac{d}{dt}(A_yB_z - A_zB_y) = \\dot{A}_yB_z + A_y\\dot{B}_z - \\dot{A}_zB_y - A_z\\dot{B}_y = (\\dot{A}_yB_z - \\dot{A}_zB_y) + (A_y\\dot{B}_z - A_z\\dot{B}_y) = (\\dot{\\mathbf{A}}\\times\\mathbf{B})_x + (\\mathbf{A}\\times\\dot{\\mathbf{B}})_x\\). Similarly for \\(y\\) and \\(z\\).'
                }
            ]
        },

        // ===================== Section 5: Gradient, Divergence, and Curl (Preview) =====================
        {
            id: 'ch00-sec05',
            title: 'Gradient, Divergence, Curl (Preview)',
            content: `<h2>Gradient, Divergence, and Curl: A Preview</h2>

                <div class="env-block intuition">
                    <div class="env-title">Why Preview These Now?</div>
                    <div class="env-body"><p>These operations from vector calculus will appear repeatedly in mechanics. The gradient defines conservative forces via \\(\\mathbf{F} = -\\nabla V\\). The divergence appears in Gauss's theorem and fluid mechanics. The curl tests whether a force is conservative (\\(\\nabla \\times \\mathbf{F} = \\mathbf{0}\\)). We give the definitions and physical intuition here; full proofs belong in a vector calculus course.</p></div>
                </div>

                <div class="env-block definition">
                    <div class="env-title">Definition (Del Operator)</div>
                    <div class="env-body"><p>The <strong>del operator</strong> (nabla) in Cartesian coordinates is
                    \\[\\nabla = \\hat{\\mathbf{x}}\\frac{\\partial}{\\partial x} + \\hat{\\mathbf{y}}\\frac{\\partial}{\\partial y} + \\hat{\\mathbf{z}}\\frac{\\partial}{\\partial z}\\]
                    It is a vector of differential operators. When applied to a scalar field it gives the gradient; when dotted with a vector field it gives the divergence; when crossed with a vector field it gives the curl.</p></div>
                </div>

                <h3>Gradient</h3>
                <p>For a scalar field \\(\\phi(x,y,z)\\):
                \\[\\nabla\\phi = \\frac{\\partial\\phi}{\\partial x}\\hat{\\mathbf{x}} + \\frac{\\partial\\phi}{\\partial y}\\hat{\\mathbf{y}} + \\frac{\\partial\\phi}{\\partial z}\\hat{\\mathbf{z}}\\]
                The gradient points in the direction of steepest increase of \\(\\phi\\), and its magnitude is the rate of increase. Level surfaces of \\(\\phi\\) are perpendicular to \\(\\nabla\\phi\\).</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Conservative Forces)</div>
                    <div class="env-body"><p>A force \\(\\mathbf{F}\\) is <strong>conservative</strong> if and only if there exists a potential energy function \\(V(\\mathbf{r})\\) such that
                    \\[\\mathbf{F} = -\\nabla V\\]
                    For a conservative force, the work done is path-independent, and energy is conserved.</p></div>
                </div>

                <h3>Divergence</h3>
                <p>For a vector field \\(\\mathbf{F} = F_x\\hat{\\mathbf{x}} + F_y\\hat{\\mathbf{y}} + F_z\\hat{\\mathbf{z}}\\):
                \\[\\nabla \\cdot \\mathbf{F} = \\frac{\\partial F_x}{\\partial x} + \\frac{\\partial F_y}{\\partial y} + \\frac{\\partial F_z}{\\partial z}\\]
                The divergence measures the "outflow rate" of the field at a point. If \\(\\nabla\\cdot\\mathbf{F} > 0\\), the field is a local source; if \\(\\nabla\\cdot\\mathbf{F} < 0\\), it is a local sink.</p>

                <h3>Curl</h3>
                <p>The curl measures the local rotation (circulation) of a vector field:
                \\[\\nabla \\times \\mathbf{F} = \\begin{vmatrix} \\hat{\\mathbf{x}} & \\hat{\\mathbf{y}} & \\hat{\\mathbf{z}} \\\\ \\partial_x & \\partial_y & \\partial_z \\\\ F_x & F_y & F_z \\end{vmatrix}\\]</p>

                <div class="env-block theorem">
                    <div class="env-title">Theorem (Curl-Free \\(\\Leftrightarrow\\) Conservative)</div>
                    <div class="env-body"><p>On a simply connected domain, \\(\\mathbf{F}\\) is conservative if and only if \\(\\nabla \\times \\mathbf{F} = \\mathbf{0}\\) everywhere. This gives a practical test: compute the curl; if it vanishes, the force derives from a potential.</p></div>
                </div>

                <h3>Key Identities</h3>
                <p>Two identities that will be used throughout the course:</p>
                <ol>
                    <li>\\(\\nabla \\times (\\nabla\\phi) = \\mathbf{0}\\) for any smooth scalar field \\(\\phi\\) (the curl of a gradient is zero).</li>
                    <li>\\(\\nabla \\cdot (\\nabla \\times \\mathbf{F}) = 0\\) for any smooth vector field \\(\\mathbf{F}\\) (the divergence of a curl is zero).</li>
                </ol>

                <div class="env-block definition">
                    <div class="env-title">Definition (Laplacian)</div>
                    <div class="env-body"><p>The <strong>Laplacian</strong> of a scalar field is \\(\\nabla^2\\phi = \\nabla\\cdot(\\nabla\\phi) = \\frac{\\partial^2\\phi}{\\partial x^2} + \\frac{\\partial^2\\phi}{\\partial y^2} + \\frac{\\partial^2\\phi}{\\partial z^2}\\). It measures the deviation of \\(\\phi\\) from its local average. In mechanics, Laplace's equation \\(\\nabla^2\\phi = 0\\) describes gravitational and electrostatic potentials in free space.</p></div>
                </div>

                <div class="viz-placeholder" data-viz="viz-gradient-field"></div>`,

            visualizations: [
                {
                    id: 'viz-gradient-field',
                    title: 'Gradient of a Potential: \\(\\nabla V\\) and Level Curves',
                    description: 'The contours show \\(V(x,y) = \\frac{1}{2}(ax^2 + by^2)\\). Arrows show \\(-\\nabla V\\) (the force direction). Adjust \\(a\\) and \\(b\\) to see how anisotropy changes the field.',
                    setup: function(body, controls) {
                        var viz = new VizEngine(body, {scale: 35});
                        var aa = 1.0, bb = 2.0;

                        VizEngine.createSlider(controls, 'a', 0.2, 3, aa, 0.1, function(v) { aa = v; });
                        VizEngine.createSlider(controls, 'b', 0.2, 3, bb, 0.1, function(v) { bb = v; });

                        function draw() {
                            viz.clear();
                            viz.drawGrid();
                            viz.drawAxes('x', 'y');

                            var ctx = viz.ctx;

                            // Draw contours of V = 0.5*(a*x^2 + b*y^2)
                            var levels = [0.5, 1, 2, 3, 5, 8, 12];
                            for (var li = 0; li < levels.length; li++) {
                                var V0 = levels[li];
                                // Ellipse: a*x^2 + b*y^2 = 2*V0
                                var rx = Math.sqrt(2 * V0 / aa);
                                var ry = Math.sqrt(2 * V0 / bb);
                                if (rx * viz.scale < 5 || ry * viz.scale < 5) continue;
                                if (rx > 10 || ry > 10) continue;
                                var alpha = VizEngine.clamp(0.15 + 0.05 * li, 0.1, 0.5);
                                ctx.strokeStyle = VizEngine.hsl(200, 60, 50);
                                ctx.globalAlpha = alpha;
                                ctx.lineWidth = 1;
                                var sx0 = viz.originX, sy0 = viz.originY;
                                ctx.beginPath();
                                ctx.ellipse(sx0, sy0, rx * viz.scale, ry * viz.scale, 0, 0, 2 * Math.PI);
                                ctx.stroke();
                                ctx.globalAlpha = 1;
                            }

                            // Draw gradient arrows on a grid
                            var spacing = 1.5;
                            var xMin = -Math.floor(viz.originX / viz.scale / spacing) * spacing;
                            var xMax = Math.floor((viz.width - viz.originX) / viz.scale / spacing) * spacing;
                            var yMin = -Math.floor((viz.height - viz.originY) / viz.scale / spacing) * spacing;
                            var yMax = Math.floor(viz.originY / viz.scale / spacing) * spacing;

                            for (var gx = xMin; gx <= xMax; gx += spacing) {
                                for (var gy = yMin; gy <= yMax; gy += spacing) {
                                    if (Math.abs(gx) < 0.01 && Math.abs(gy) < 0.01) continue;
                                    // -grad V = (-a*x, -b*y)
                                    var fx = -aa * gx;
                                    var fy = -bb * gy;
                                    var fmag = Math.sqrt(fx * fx + fy * fy);
                                    if (fmag < 0.01) continue;
                                    // Normalize and scale for display
                                    var displayLen = Math.min(fmag * 0.25, 1.0);
                                    var ux = fx / fmag * displayLen;
                                    var uy = fy / fmag * displayLen;

                                    // Color by magnitude
                                    var hue = VizEngine.clamp(120 - fmag * 15, 0, 240);
                                    var color = VizEngine.hsl(hue, 80, 55);
                                    viz.drawVector(gx, gy, ux, uy, color, '', 1.5, 7);
                                }
                            }

                            viz.screenText('V = (1/2)(ax^2 + by^2)', 12, 20, viz.colors.white, 13, 'left');
                            viz.screenText('F = -grad V = (-ax, -by)', 12, 38, viz.colors.text, 12, 'left');
                            viz.screenText('a = ' + aa.toFixed(1) + ', b = ' + bb.toFixed(1), 12, 56, viz.colors.yellow, 12, 'left');
                        }

                        viz.animate(function() { draw(); });
                        return viz;
                    }
                }
            ],
            exercises: [
                {
                    question: 'Compute the gradient of \\(\\phi(x,y,z) = x^2y + yz^3\\). Evaluate at \\((1,2,1)\\).',
                    solution: '\\(\\nabla\\phi = (2xy, x^2 + z^3, 3yz^2)\\). At \\((1,2,1)\\): \\(\\nabla\\phi = (4, 2, 6)\\).'
                },
                {
                    question: 'Verify that \\(\\nabla\\times(\\nabla\\phi) = \\mathbf{0}\\) for \\(\\phi = x^2yz^3\\).',
                    hint: 'Compute \\(\\nabla\\phi\\) first, then take the curl of the result.',
                    solution: '\\(\\nabla\\phi = (2xyz^3, x^2z^3, 3x^2yz^2)\\). The curl has \\(x\\)-component: \\(\\partial_y(3x^2yz^2) - \\partial_z(x^2z^3) = 3x^2z^2 - 3x^2z^2 = 0\\). Similarly \\(y\\)-component: \\(\\partial_z(2xyz^3) - \\partial_x(3x^2yz^2) = 6xyz^2 - 6xyz^2 = 0\\). And \\(z\\)-component: \\(\\partial_x(x^2z^3) - \\partial_y(2xyz^3) = 2xz^3 - 2xz^3 = 0\\). So \\(\\nabla\\times(\\nabla\\phi) = \\mathbf{0}\\).'
                },
                {
                    question: 'Is the force \\(\\mathbf{F} = (y^2, 2xy + z, y)\\) conservative? If so, find the potential.',
                    hint: 'Check if \\(\\nabla \\times \\mathbf{F} = \\mathbf{0}\\). If yes, integrate \\(F_x = -\\partial V/\\partial x\\) etc.',
                    solution: 'Curl check: \\((\\partial_y F_z - \\partial_z F_y) = 1 - 1 = 0\\), \\((\\partial_z F_x - \\partial_x F_z) = 0 - 0 = 0\\), \\((\\partial_x F_y - \\partial_y F_x) = 2y - 2y = 0\\). Yes, conservative. From \\(F_x = y^2 = -\\partial V/\\partial x\\): \\(V = -xy^2 + g(y,z)\\). From \\(F_y = 2xy + z = -\\partial V/\\partial y = 2xy - g_y\\): so \\(g_y = -z\\), giving \\(g = -yz + h(z)\\). From \\(F_z = y = -\\partial V/\\partial z = y - h\'(z)\\): \\(h\' = 0\\), so \\(h = C\\). Thus \\(V = -xy^2 - yz + C\\).'
                }
            ]
        }
    ]
});
