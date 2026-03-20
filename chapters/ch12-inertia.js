// === Chapter 12: Moment of Inertia ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch12',
        number: 12,
        title: 'Moment of Inertia',
        subtitle: 'The rotational analog of mass: how mass distribution determines resistance to angular acceleration',
        file: 'ch12-inertia',

        sections: [
            // ============================================================
            // Section 0: The Inertia Tensor in Two Dimensions
            // ============================================================
            {
                id: 'inertia-tensor',
                title: 'The Inertia Tensor (2D)',
                content: `
<h2>Rotational Inertia: Beyond a Single Number</h2>

<p>In translation, mass tells you how hard it is to accelerate an object: \\(F = ma\\). For rotation about a fixed axis, the analogous quantity is the <strong>moment of inertia</strong> \\(I\\), appearing in \\(\\tau = I\\alpha\\). But for a general rigid body, a single scalar is not enough. The full story requires a <em>tensor</em>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Moment of Inertia about an Axis</div>
<div class="env-body">
<p>For a rigid body rotating about a fixed axis, the <strong>moment of inertia</strong> is</p>
\\[I = \\sum_i m_i\\, r_{i\\perp}^2 \\quad \\text{(discrete)}\\qquad I = \\int r_\\perp^2\\, dm \\quad \\text{(continuous)}\\]
<p>where \\(r_{i\\perp}\\) is the perpendicular distance of mass element \\(m_i\\) from the rotation axis. Units: kg m\\(^2\\).</p>
</div>
</div>

<p>Why \\(r_\\perp^2\\) and not just \\(r_\\perp\\)? Because the kinetic energy of a rotating particle is \\(\\tfrac{1}{2}m v^2 = \\tfrac{1}{2}m(r_\\perp \\omega)^2\\), so the total rotational kinetic energy is</p>

\\[K_{\\text{rot}} = \\tfrac{1}{2}\\biggl(\\sum_i m_i r_{i\\perp}^2\\biggr)\\omega^2 = \\tfrac{1}{2} I \\omega^2\\]

<p>This is the rotational analog of \\(K = \\tfrac{1}{2}mv^2\\).</p>

<div class="env-block definition">
<div class="env-title">Definition: The 2D Inertia Tensor</div>
<div class="env-body">
<p>For a planar body in the \\(xy\\)-plane, the full inertia tensor (about the origin) is the \\(2\\times 2\\) symmetric matrix</p>
\\[\\mathbf{I} = \\begin{pmatrix} I_{xx} & -I_{xy} \\\\ -I_{xy} & I_{yy} \\end{pmatrix}\\]
<p>where</p>
\\[I_{xx} = \\int y^2\\,dm, \\quad I_{yy} = \\int x^2\\,dm, \\quad I_{xy} = \\int xy\\,dm\\]
<p>The diagonal entries \\(I_{xx}, I_{yy}\\) are the moments of inertia about the \\(x\\)- and \\(y\\)-axes. The off-diagonal entry \\(I_{xy}\\) is the <strong>product of inertia</strong>.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why a tensor?</div>
<div class="env-body">
<p>When \\(I_{xy} \\neq 0\\), the angular momentum \\(\\mathbf{L} = \\mathbf{I}\\boldsymbol{\\omega}\\) is <em>not</em> parallel to \\(\\boldsymbol{\\omega}\\). This means spinning a body about one axis can produce angular momentum components along perpendicular axes. The tensor encodes this directional coupling between \\(\\boldsymbol{\\omega}\\) and \\(\\mathbf{L}\\).</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: Principal Axes</div>
<div class="env-body">
<p>Because \\(\\mathbf{I}\\) is real and symmetric, it can be diagonalized. There exist orthogonal directions (the <strong>principal axes</strong>) along which \\(\\mathbf{L} = I_k \\omega_k \\hat{e}_k\\) for each axis \\(k\\). In the principal-axis frame, the products of inertia vanish and \\(\\mathbf{I}\\) is diagonal.</p>
</div>
</div>

<p>For bodies with a symmetry axis, the principal axes are obvious by inspection: the symmetry axis is always a principal axis.</p>

<div class="env-block example">
<div class="env-title">Example: Thin Rod about Its Center</div>
<div class="env-body">
<p>A uniform rod of mass \\(M\\) and length \\(L\\), lying along the \\(x\\)-axis from \\(-L/2\\) to \\(L/2\\). The linear mass density is \\(\\lambda = M/L\\). About the \\(y\\)-axis (perpendicular to the rod through its center):</p>
\\[I_{yy} = \\int_{-L/2}^{L/2} x^2\\,\\lambda\\,dx = \\frac{M}{L}\\cdot\\frac{x^3}{3}\\bigg|_{-L/2}^{L/2} = \\frac{1}{12}ML^2\\]
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A square plate of side \\(a\\) and mass \\(M\\) lies in the \\(xy\\)-plane with its center at the origin. By symmetry, what is \\(I_{xy}\\)? Compute \\(I_{xx}\\) and verify it equals \\(I_{yy}\\).',
                        hint: 'Use \\(dm = (M/a^2)\\,dx\\,dy\\) and integrate over \\([-a/2, a/2]^2\\). The product of inertia vanishes because the integrand \\(xy\\) is odd under \\(x \\to -x\\).',
                        solution: 'By the odd-symmetry argument, \\(I_{xy} = 0\\). For \\(I_{xx} = \\int y^2\\,dm\\): \\(I_{xx} = \\frac{M}{a^2}\\int_{-a/2}^{a/2}dx\\int_{-a/2}^{a/2}y^2\\,dy = \\frac{M}{a^2}\\cdot a \\cdot \\frac{a^3}{12} = \\frac{1}{12}Ma^2\\). By the \\(x \\leftrightarrow y\\) symmetry of a square, \\(I_{yy} = \\frac{1}{12}Ma^2 = I_{xx}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 1: Parallel Axis Theorem
            // ============================================================
            {
                id: 'parallel-axis',
                title: 'The Parallel Axis Theorem',
                content: `
<h2>Shifting the Rotation Axis</h2>

<p>Computing moments of inertia about the center of mass is often simplest, but many problems require \\(I\\) about a different, parallel axis. The parallel axis theorem (also called Steiner's theorem) provides the bridge.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Parallel Axis Theorem (Steiner's Theorem)</div>
<div class="env-body">
<p>Let \\(I_{\\text{cm}}\\) be the moment of inertia of a body of mass \\(M\\) about an axis through the center of mass. Then the moment of inertia about any parallel axis a distance \\(d\\) away is</p>
\\[I = I_{\\text{cm}} + Md^2\\]
</div>
</div>

<p><strong>Proof.</strong> Place the origin at the center of mass. Let the rotation axis be at displacement \\(\\mathbf{a}\\) from the CM, perpendicular to the page. The distance of mass element \\(dm\\) from the new axis is \\(|\\mathbf{r} - \\mathbf{a}|\\), so</p>

\\[I = \\int |\\mathbf{r} - \\mathbf{a}|^2\\,dm = \\int r^2\\,dm - 2\\mathbf{a}\\cdot\\underbrace{\\int \\mathbf{r}\\,dm}_{= M\\mathbf{r}_{\\text{cm}} = \\mathbf{0}} + a^2\\int dm = I_{\\text{cm}} + Ma^2\\]

<p>The cross term vanishes because the origin is at the center of mass, so \\(\\int \\mathbf{r}\\,dm = \\mathbf{0}\\). \\(\\square\\)</p>

<div class="env-block warning">
<div class="env-title">The parallel axis theorem only works from the CM</div>
<div class="env-body">
<p>The cross term vanishes <em>only</em> when one of the axes passes through the center of mass. You cannot use \\(I_B = I_A + Md^2\\) for two arbitrary parallel axes \\(A\\) and \\(B\\) unless \\(A\\) goes through the CM. To shift between two arbitrary parallel axes, go through the CM: \\(I_B = I_A - Md_A^2 + Md_B^2\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Rod about Its End</div>
<div class="env-body">
<p>We found \\(I_{\\text{cm}} = \\frac{1}{12}ML^2\\) for a rod about its center. The end is at distance \\(d = L/2\\) from the center, so</p>
\\[I_{\\text{end}} = \\frac{1}{12}ML^2 + M\\left(\\frac{L}{2}\\right)^2 = \\frac{1}{12}ML^2 + \\frac{1}{4}ML^2 = \\frac{1}{3}ML^2\\]
</div>
</div>

<div class="env-block remark">
<div class="env-title">The CM gives the minimum \\(I\\)</div>
<div class="env-body">
<p>Since \\(Md^2 \\geq 0\\), the moment of inertia about the center of mass is always the <em>smallest</em> moment of inertia among all parallel axes. Moving the axis away from the CM always increases \\(I\\).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-parallel-axis"></div>
`,
                visualizations: [
                    {
                        id: 'viz-parallel-axis',
                        title: 'Parallel Axis Theorem',
                        description: 'Drag the rotation axis (yellow dot) away from the center of mass. Watch how \\(I\\) increases as \\(Md^2\\). The red bar shows \\(I_{\\text{cm}}\\), the blue bar shows \\(Md^2\\), and the green bar shows the total \\(I = I_{\\text{cm}} + Md^2\\).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 60, originX: undefined, originY: undefined });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w / 2;
                            viz.originY = h * 0.45;

                            var shape = 'rod';
                            var M = 2.0;
                            var L = 3.0; // rod length or disc radius etc.

                            function getIcm() {
                                if (shape === 'rod') return (1 / 12) * M * L * L;
                                if (shape === 'disc') return 0.5 * M * (L / 2) * (L / 2);
                                if (shape === 'hoop') return M * (L / 2) * (L / 2);
                                return (1 / 12) * M * L * L;
                            }

                            var axisDrag = viz.addDraggable('axis', 1.0, 0, viz.colors.yellow, 10);

                            VizEngine.createButton(controls, 'Rod', function () { shape = 'rod'; });
                            VizEngine.createButton(controls, 'Disc', function () { shape = 'disc'; });
                            VizEngine.createButton(controls, 'Hoop', function () { shape = 'hoop'; });

                            function draw() {
                                viz.clear();
                                viz.drawGrid(1);
                                viz.drawAxes('x', 'y');

                                var Icm = getIcm();
                                var dx = axisDrag.x;
                                var dy = axisDrag.y;
                                var d = Math.sqrt(dx * dx + dy * dy);
                                var Md2 = M * d * d;
                                var Itotal = Icm + Md2;

                                // Draw shape at origin (CM)
                                ctx.save();
                                if (shape === 'rod') {
                                    var half = L / 2;
                                    viz.drawSegment(-half, 0, half, 0, viz.colors.teal, 6);
                                    viz.drawPoint(0, 0, viz.colors.teal, 'CM', 4);
                                } else if (shape === 'disc') {
                                    var R = L / 2;
                                    viz.drawCircle(0, 0, R, viz.colors.teal + '33', viz.colors.teal, 2);
                                    viz.drawPoint(0, 0, viz.colors.teal, 'CM', 4);
                                } else if (shape === 'hoop') {
                                    var R2 = L / 2;
                                    viz.drawCircle(0, 0, R2, null, viz.colors.teal, 3);
                                    viz.drawPoint(0, 0, viz.colors.teal, 'CM', 4);
                                }
                                ctx.restore();

                                // Draw axis marker
                                var asx = viz.toScreen(axisDrag.x, axisDrag.y);
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.arc(asx[0], asx[1], 18, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Distance line
                                if (d > 0.05) {
                                    viz.drawSegment(0, 0, axisDrag.x, axisDrag.y, viz.colors.orange, 1.5, true);
                                    viz.drawText('d = ' + d.toFixed(2), axisDrag.x / 2, axisDrag.y / 2 + 0.3, viz.colors.orange, 12);
                                }

                                // Draggable dot
                                viz.drawDraggables();

                                // Energy-style bar chart for I
                                var barX = w - 130;
                                var barY = h - 30;
                                var barW = 28;
                                var barH = h * 0.55;
                                var maxI = Math.max(Itotal * 1.3, 1);

                                ctx.fillStyle = viz.colors.bg + 'dd';
                                ctx.fillRect(barX - 12, barY - barH - 30, barW * 3 + 44, barH + 55);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.strokeRect(barX - 12, barY - barH - 30, barW * 3 + 44, barH + 55);

                                // Icm bar
                                var h1 = (Icm / maxI) * barH;
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillRect(barX, barY - h1, barW, h1);
                                viz.screenText('I_cm', barX + barW / 2, barY + 14, viz.colors.red, 10, 'center');
                                viz.screenText(Icm.toFixed(2), barX + barW / 2, barY - h1 - 8, viz.colors.red, 9, 'center');

                                // Md^2 bar
                                var h2 = (Md2 / maxI) * barH;
                                ctx.fillStyle = viz.colors.blue;
                                ctx.fillRect(barX + barW + 6, barY - h2, barW, h2);
                                viz.screenText('Md\u00B2', barX + barW + 6 + barW / 2, barY + 14, viz.colors.blue, 10, 'center');
                                viz.screenText(Md2.toFixed(2), barX + barW + 6 + barW / 2, barY - h2 - 8, viz.colors.blue, 9, 'center');

                                // Total bar
                                var h3 = (Itotal / maxI) * barH;
                                ctx.fillStyle = viz.colors.green;
                                ctx.fillRect(barX + 2 * (barW + 6), barY - h3, barW, h3);
                                viz.screenText('I_tot', barX + 2 * (barW + 6) + barW / 2, barY + 14, viz.colors.green, 10, 'center');
                                viz.screenText(Itotal.toFixed(2), barX + 2 * (barW + 6) + barW / 2, barY - h3 - 8, viz.colors.green, 9, 'center');

                                // Info text
                                viz.screenText('Shape: ' + shape + '   M = ' + M.toFixed(1) + ' kg', w / 2, 18, viz.colors.text, 12, 'center');
                                viz.screenText('I = I_cm + Md\u00B2 = ' + Icm.toFixed(2) + ' + ' + Md2.toFixed(2) + ' = ' + Itotal.toFixed(2) + ' kg\u00B7m\u00B2', w / 2, 36, viz.colors.white, 13, 'center');
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A thin uniform disc of mass \\(M\\) and radius \\(R\\) is pivoted about a point on its rim. Find the moment of inertia about this pivot.',
                        hint: 'Use the parallel axis theorem with \\(I_{\\text{cm}} = \\frac{1}{2}MR^2\\) and \\(d = R\\).',
                        solution: '\\(I = I_{\\text{cm}} + MR^2 = \\frac{1}{2}MR^2 + MR^2 = \\frac{3}{2}MR^2\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Perpendicular Axis Theorem
            // ============================================================
            {
                id: 'perpendicular-axis',
                title: 'The Perpendicular Axis Theorem',
                content: `
<h2>A Shortcut for Flat Objects</h2>

<p>For planar (2D) objects, there is a powerful identity that relates moments of inertia about three mutually perpendicular axes.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: Perpendicular Axis Theorem</div>
<div class="env-body">
<p>For a plane lamina lying in the \\(xy\\)-plane, let \\(I_x\\), \\(I_y\\) be the moments of inertia about the \\(x\\)- and \\(y\\)-axes (both in the plane of the lamina), and \\(I_z\\) be the moment of inertia about the \\(z\\)-axis (perpendicular to the lamina). Then</p>
\\[I_z = I_x + I_y\\]
</div>
</div>

<p><strong>Proof.</strong> For a mass element at position \\((x, y, 0)\\), its squared distance from the \\(z\\)-axis is \\(x^2 + y^2\\), from the \\(x\\)-axis is \\(y^2\\), and from the \\(y\\)-axis is \\(x^2\\). Therefore</p>

\\[I_z = \\int (x^2 + y^2)\\,dm = \\int x^2\\,dm + \\int y^2\\,dm = I_y + I_x \\quad \\square\\]

<div class="env-block warning">
<div class="env-title">Only for planar bodies!</div>
<div class="env-body">
<p>The perpendicular axis theorem applies <strong>only</strong> to flat (two-dimensional) objects, not to three-dimensional bodies. For a solid sphere or solid cylinder, this theorem does not hold.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Thin Ring / Hoop</div>
<div class="env-body">
<p>A thin hoop of mass \\(M\\) and radius \\(R\\) in the \\(xy\\)-plane. About the \\(z\\)-axis (perpendicular, through center): \\(I_z = MR^2\\). By symmetry, \\(I_x = I_y\\). The perpendicular axis theorem gives</p>
\\[MR^2 = I_x + I_y = 2I_x \\quad \\Longrightarrow \\quad I_x = I_y = \\tfrac{1}{2}MR^2\\]
<p>This is the moment of inertia of a hoop about a diameter, obtained without any integration.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Thin Disc about a Diameter</div>
<div class="env-body">
<p>A thin uniform disc of mass \\(M\\) and radius \\(R\\). About the perpendicular axis through its center, \\(I_z = \\frac{1}{2}MR^2\\). By the perpendicular axis theorem and symmetry,</p>
\\[\\frac{1}{2}MR^2 = 2I_{\\text{diam}} \\quad \\Longrightarrow \\quad I_{\\text{diam}} = \\frac{1}{4}MR^2\\]
</div>
</div>

<div class="env-block remark">
<div class="env-title">Combining the two theorems</div>
<div class="env-body">
<p>The parallel and perpendicular axis theorems together are extremely powerful. From a single calculation of \\(I_{\\text{cm}}\\) about one axis, you can often derive \\(I\\) about any axis. Typical workflow: (1) compute \\(I_z\\) through the CM by integration, (2) use the perpendicular axis theorem to get \\(I_x\\) or \\(I_y\\), (3) use the parallel axis theorem to shift to any parallel axis.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A thin uniform square plate of mass \\(M\\) and side \\(a\\) lies in the \\(xy\\)-plane centered at the origin. We found \\(I_x = I_y = \\frac{1}{12}Ma^2\\). Use the perpendicular axis theorem to find \\(I_z\\). Then use the parallel axis theorem to find \\(I\\) about an axis perpendicular to the plate through one corner.',
                        hint: 'For the first part, apply \\(I_z = I_x + I_y\\). For the second, the distance from center to corner is \\(d = a\\sqrt{2}/2\\).',
                        solution: '\\(I_z = I_x + I_y = \\frac{1}{12}Ma^2 + \\frac{1}{12}Ma^2 = \\frac{1}{6}Ma^2\\). Distance from center to corner: \\(d = a/\\sqrt{2}\\). By the parallel axis theorem: \\(I_{\\text{corner}} = \\frac{1}{6}Ma^2 + M(a/\\sqrt{2})^2 = \\frac{1}{6}Ma^2 + \\frac{1}{2}Ma^2 = \\frac{2}{3}Ma^2\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Standard Moments of Inertia
            // ============================================================
            {
                id: 'standard-shapes',
                title: 'Standard Shapes',
                content: `
<h2>A Catalog of Moments of Inertia</h2>

<p>Computing \\(I\\) by direct integration is a rite of passage. Here we derive the most important results. Every undergraduate physicist should be able to reproduce these.</p>

<div class="env-block example">
<div class="env-title">Derivation: Uniform Thin Rod (center)</div>
<div class="env-body">
<p>Mass \\(M\\), length \\(L\\), axis perpendicular to the rod through its center. Let \\(\\lambda = M/L\\).</p>
\\[I = \\int_{-L/2}^{L/2} x^2\\,\\lambda\\,dx = \\lambda\\,\\frac{x^3}{3}\\bigg|_{-L/2}^{L/2} = \\frac{M}{L}\\cdot\\frac{2}{3}\\cdot\\frac{L^3}{8} = \\frac{1}{12}ML^2\\]
</div>
</div>

<div class="env-block example">
<div class="env-title">Derivation: Uniform Disc (perpendicular axis through center)</div>
<div class="env-body">
<p>Mass \\(M\\), radius \\(R\\). Use concentric rings of radius \\(r\\) and width \\(dr\\). The surface mass density is \\(\\sigma = M/(\\pi R^2)\\). Each ring has mass \\(dm = \\sigma \\cdot 2\\pi r\\,dr\\) and moment of inertia \\(dI = r^2\\,dm\\).</p>
\\[I = \\int_0^R r^2 \\cdot \\sigma \\cdot 2\\pi r\\,dr = \\frac{2M}{R^2}\\int_0^R r^3\\,dr = \\frac{2M}{R^2}\\cdot\\frac{R^4}{4} = \\frac{1}{2}MR^2\\]
</div>
</div>

<div class="env-block example">
<div class="env-title">Derivation: Solid Sphere (axis through center)</div>
<div class="env-body">
<p>Mass \\(M\\), radius \\(R\\). Slice the sphere into thin discs perpendicular to the axis. A disc at height \\(z\\) from the center has radius \\(r(z) = \\sqrt{R^2 - z^2}\\) and thickness \\(dz\\). With volume density \\(\\rho = 3M/(4\\pi R^3)\\), the mass of a disc is \\(dm = \\rho\\pi r^2\\,dz\\). Each disc has \\(dI = \\frac{1}{2}r^2\\,dm\\):</p>
\\[I = \\int_{-R}^{R} \\frac{1}{2}(R^2 - z^2)\\cdot\\rho\\pi(R^2 - z^2)\\,dz = \\frac{\\rho\\pi}{2}\\int_{-R}^{R}(R^2 - z^2)^2\\,dz\\]
<p>Expanding and integrating:</p>
\\[= \\frac{\\rho\\pi}{2}\\left[R^4\\cdot 2R - \\frac{2R^3}{3}\\cdot 2R^2 + \\frac{2R^5}{5}\\right] = \\frac{\\rho\\pi}{2}\\cdot\\frac{16R^5}{15} = \\frac{2}{5}MR^2\\]
</div>
</div>

<p>The key results to remember:</p>

<table style="width:100%;border-collapse:collapse;margin:1em 0;">
<tr style="border-bottom:2px solid #30363d;"><th style="text-align:left;padding:8px;">Shape</th><th style="text-align:left;padding:8px;">Axis</th><th style="text-align:left;padding:8px;">\\(I\\)</th><th style="text-align:left;padding:8px;">\\(I/MR^2\\)</th></tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:8px;">Thin hoop</td><td style="padding:8px;">Perpendicular, center</td><td style="padding:8px;">\\(MR^2\\)</td><td style="padding:8px;">1</td></tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:8px;">Thin disc</td><td style="padding:8px;">Perpendicular, center</td><td style="padding:8px;">\\(\\frac{1}{2}MR^2\\)</td><td style="padding:8px;">1/2</td></tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:8px;">Solid sphere</td><td style="padding:8px;">Any diameter</td><td style="padding:8px;">\\(\\frac{2}{5}MR^2\\)</td><td style="padding:8px;">2/5</td></tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:8px;">Spherical shell</td><td style="padding:8px;">Any diameter</td><td style="padding:8px;">\\(\\frac{2}{3}MR^2\\)</td><td style="padding:8px;">2/3</td></tr>
<tr style="border-bottom:1px solid #21262d;"><td style="padding:8px;">Solid cylinder</td><td style="padding:8px;">Central axis</td><td style="padding:8px;">\\(\\frac{1}{2}MR^2\\)</td><td style="padding:8px;">1/2</td></tr>
<tr><td style="padding:8px;">Thin rod</td><td style="padding:8px;">Perpendicular, center</td><td style="padding:8px;">\\(\\frac{1}{12}ML^2\\)</td><td style="padding:8px;">-</td></tr>
</table>

<div class="env-block intuition">
<div class="env-title">Pattern: mass further from axis means larger \\(I/MR^2\\)</div>
<div class="env-body">
<p>The ratio \\(I/MR^2\\) is a pure number that characterizes how far the mass is distributed from the axis. A hoop (all mass at \\(R\\)) has \\(I/MR^2 = 1\\). A solid sphere (mass distributed from \\(0\\) to \\(R\\)) has \\(I/MR^2 = 2/5\\). Objects with mass concentrated far from the axis are harder to spin up.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-shape-selector"></div>
`,
                visualizations: [
                    {
                        id: 'viz-shape-selector',
                        title: 'Interactive Moment of Inertia Calculator',
                        description: 'Select a shape and see its moment of inertia. Adjust mass and radius/length. The visualization shows the mass distribution and the computed \\(I\\).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 50, originX: undefined, originY: undefined });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w * 0.35;
                            viz.originY = h * 0.5;

                            var shape = 'disc';
                            var R = 2.0;
                            var M = 1.0;
                            var angle = 0;

                            VizEngine.createButton(controls, 'Rod', function () { shape = 'rod'; });
                            VizEngine.createButton(controls, 'Disc', function () { shape = 'disc'; });
                            VizEngine.createButton(controls, 'Sphere', function () { shape = 'sphere'; });
                            VizEngine.createButton(controls, 'Hoop', function () { shape = 'hoop'; });
                            VizEngine.createSlider(controls, 'R or L/2', 0.5, 3.5, R, 0.1, function (v) { R = v; });
                            VizEngine.createSlider(controls, 'Mass M', 0.5, 5, M, 0.1, function (v) { M = v; });

                            function getI() {
                                if (shape === 'rod') return (1 / 12) * M * (2 * R) * (2 * R);
                                if (shape === 'disc') return 0.5 * M * R * R;
                                if (shape === 'sphere') return 0.4 * M * R * R;
                                if (shape === 'hoop') return M * R * R;
                                return 0;
                            }

                            function getFormula() {
                                if (shape === 'rod') return 'I = (1/12)ML\u00B2';
                                if (shape === 'disc') return 'I = (1/2)MR\u00B2';
                                if (shape === 'sphere') return 'I = (2/5)MR\u00B2';
                                if (shape === 'hoop') return 'I = MR\u00B2';
                                return '';
                            }

                            function getRatio() {
                                if (shape === 'rod') return '1/12 (per L\u00B2)';
                                if (shape === 'disc') return '1/2';
                                if (shape === 'sphere') return '2/5';
                                if (shape === 'hoop') return '1';
                                return '';
                            }

                            function draw(t) {
                                angle = t * 0.001;
                                viz.clear();

                                var I = getI();

                                // Draw shape
                                ctx.save();
                                if (shape === 'rod') {
                                    // Rotating rod
                                    var ca = Math.cos(angle);
                                    var sa = Math.sin(angle);
                                    var half = R;
                                    viz.drawSegment(-half * ca, -half * sa, half * ca, half * sa, viz.colors.teal, 5);
                                    // Axis indicator (dot at center)
                                    viz.drawPoint(0, 0, viz.colors.yellow, '', 6);
                                    // Show mass elements
                                    for (var k = -4; k <= 4; k++) {
                                        var frac = k / 4;
                                        var px = frac * half * ca;
                                        var py = frac * half * sa;
                                        viz.drawPoint(px, py, viz.colors.orange, '', 3);
                                    }
                                } else if (shape === 'disc') {
                                    viz.drawCircle(0, 0, R, viz.colors.teal + '44', viz.colors.teal, 2);
                                    // Concentric rings to show mass distribution
                                    for (var rr = R * 0.25; rr < R; rr += R * 0.25) {
                                        viz.drawCircle(0, 0, rr, null, viz.colors.teal + '33', 0.5);
                                    }
                                    // Radial line rotating
                                    viz.drawSegment(0, 0, R * Math.cos(angle), R * Math.sin(angle), viz.colors.orange, 2);
                                    viz.drawPoint(0, 0, viz.colors.yellow, '', 5);
                                } else if (shape === 'sphere') {
                                    // Draw as filled circle with shading to suggest 3D
                                    var grad = ctx.createRadialGradient(
                                        viz.toScreen(0, 0)[0] - R * viz.scale * 0.3,
                                        viz.toScreen(0, 0)[1] - R * viz.scale * 0.3,
                                        R * viz.scale * 0.1,
                                        viz.toScreen(0, 0)[0],
                                        viz.toScreen(0, 0)[1],
                                        R * viz.scale
                                    );
                                    grad.addColorStop(0, viz.colors.teal + 'aa');
                                    grad.addColorStop(1, viz.colors.teal + '22');
                                    viz.drawCircle(0, 0, R, grad, viz.colors.teal, 2);
                                    // Equatorial ring
                                    ctx.strokeStyle = viz.colors.orange + '88';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    var sc = viz.toScreen(0, 0);
                                    ctx.ellipse(sc[0], sc[1], R * viz.scale, R * viz.scale * 0.3, 0, 0, Math.PI * 2);
                                    ctx.stroke();
                                    // Axis
                                    viz.drawSegment(0, -R * 1.3, 0, R * 1.3, viz.colors.yellow, 1, true);
                                    viz.drawPoint(0, 0, viz.colors.yellow, '', 4);
                                } else if (shape === 'hoop') {
                                    viz.drawCircle(0, 0, R, null, viz.colors.teal, 4);
                                    // Marker particle rotating
                                    viz.drawPoint(R * Math.cos(angle), R * Math.sin(angle), viz.colors.orange, '', 5);
                                    viz.drawPoint(0, 0, viz.colors.yellow, '', 5);
                                }
                                ctx.restore();

                                // Info panel on right
                                var px = w * 0.68;
                                var py = 40;
                                viz.screenText('Shape: ' + shape.charAt(0).toUpperCase() + shape.slice(1), px, py, viz.colors.white, 16, 'left');
                                viz.screenText(getFormula(), px, py + 28, viz.colors.teal, 14, 'left');
                                viz.screenText('I = ' + I.toFixed(3) + ' kg\u00B7m\u00B2', px, py + 56, viz.colors.orange, 14, 'left');
                                viz.screenText('I/MR\u00B2 = ' + getRatio(), px, py + 84, viz.colors.purple, 13, 'left');
                                viz.screenText('M = ' + M.toFixed(1) + ' kg', px, py + 116, viz.colors.text, 12, 'left');
                                if (shape === 'rod') {
                                    viz.screenText('L = ' + (2 * R).toFixed(1) + ' m', px, py + 138, viz.colors.text, 12, 'left');
                                } else {
                                    viz.screenText('R = ' + R.toFixed(1) + ' m', px, py + 138, viz.colors.text, 12, 'left');
                                }

                                // Bar showing I/MR^2 comparison
                                var barTop = h * 0.65;
                                var barWidth = w * 0.28;
                                var shapes = [
                                    { name: 'Sphere', ratio: 0.4, col: viz.colors.green },
                                    { name: 'Disc', ratio: 0.5, col: viz.colors.blue },
                                    { name: 'Shell', ratio: 2 / 3, col: viz.colors.purple },
                                    { name: 'Hoop', ratio: 1.0, col: viz.colors.red }
                                ];
                                viz.screenText('I / MR\u00B2 comparison:', px, barTop - 10, viz.colors.text, 11, 'left');
                                for (var si = 0; si < shapes.length; si++) {
                                    var by = barTop + si * 22 + 6;
                                    var bw = shapes[si].ratio * barWidth;
                                    ctx.fillStyle = shapes[si].col + '88';
                                    ctx.fillRect(px, by, bw, 14);
                                    viz.screenText(shapes[si].name + ' (' + shapes[si].ratio.toFixed(2) + ')', px + bw + 6, by + 7, shapes[si].col, 10, 'left');
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Derive the moment of inertia of a thin spherical shell of mass \\(M\\) and radius \\(R\\) about a diameter. (Hint: use thin rings at colatitude \\(\\theta\\).)',
                        hint: 'A ring at colatitude \\(\\theta\\) has radius \\(R\\sin\\theta\\), width \\(R\\,d\\theta\\), and area \\(2\\pi R\\sin\\theta \\cdot R\\,d\\theta\\). Use \\(\\sigma = M/(4\\pi R^2)\\).',
                        solution: '\\(I = \\int_0^\\pi (R\\sin\\theta)^2 \\cdot \\sigma \\cdot 2\\pi R\\sin\\theta \\cdot R\\,d\\theta = \\frac{M}{2}R^2 \\int_0^\\pi \\sin^3\\theta\\,d\\theta = \\frac{M}{2}R^2 \\cdot \\frac{4}{3} = \\frac{2}{3}MR^2\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Radius of Gyration & Practical Applications
            // ============================================================
            {
                id: 'radius-of-gyration',
                title: 'Radius of Gyration & Applications',
                content: `
<h2>Condensing \\(I\\) into a Single Length</h2>

<div class="env-block definition">
<div class="env-title">Definition: Radius of Gyration</div>
<div class="env-body">
<p>The <strong>radius of gyration</strong> \\(k\\) of a body with moment of inertia \\(I\\) and mass \\(M\\) is defined by</p>
\\[I = Mk^2 \\qquad \\Longrightarrow \\qquad k = \\sqrt{\\frac{I}{M}}\\]
<p>It is the distance from the axis at which all the mass could be concentrated to give the same \\(I\\). For a solid sphere, \\(k = R\\sqrt{2/5}\\). For a hoop, \\(k = R\\).</p>
</div>
</div>

<p>The radius of gyration is useful for comparing rotational properties of objects with different shapes and masses. It also appears naturally in the period of a physical pendulum (Chapter 15) and in the condition for rolling (Chapter 14).</p>

<div class="env-block example">
<div class="env-title">Example: Which rolls faster?</div>
<div class="env-body">
<p>When objects roll down an incline without slipping, the translational acceleration is (as derived in Chapter 14):</p>
\\[a = \\frac{g\\sin\\theta}{1 + I/(MR^2)} = \\frac{g\\sin\\theta}{1 + (k/R)^2}\\]
<p>A smaller \\(k/R\\) means faster acceleration. Ranking by \\(k/R\\):</p>
<ul>
<li>Solid sphere: \\(k/R = \\sqrt{2/5} \\approx 0.632\\) (fastest)</li>
<li>Solid cylinder / disc: \\(k/R = \\sqrt{1/2} \\approx 0.707\\)</li>
<li>Spherical shell: \\(k/R = \\sqrt{2/3} \\approx 0.816\\)</li>
<li>Thin hoop: \\(k/R = 1\\) (slowest)</li>
</ul>
<p>The ranking is independent of \\(M\\), \\(R\\), and \\(\\theta\\).</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: Additivity of \\(I\\) for Composite Bodies</div>
<div class="env-body">
<p>If a rigid body is composed of several parts with moments of inertia \\(I_1, I_2, \\ldots\\) about the same axis, then</p>
\\[I_{\\text{total}} = I_1 + I_2 + \\cdots\\]
<p>This follows directly from the linearity of the integral \\(\\int r^2\\,dm\\). To subtract a hole, simply subtract its \\(I\\) from the original body's \\(I\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Disc with a Hole</div>
<div class="env-body">
<p>A uniform disc of mass density \\(\\sigma\\), outer radius \\(R\\), with a concentric circular hole of radius \\(R/2\\). The total mass is \\(M = \\sigma\\pi(R^2 - R^2/4) = \\frac{3}{4}\\sigma\\pi R^2\\). The moment of inertia:</p>
\\[I = \\frac{1}{2}\\sigma\\pi R^2 \\cdot R^2 - \\frac{1}{2}\\sigma\\pi\\frac{R^2}{4}\\cdot\\frac{R^2}{4} = \\frac{1}{2}\\sigma\\pi R^4\\left(1 - \\frac{1}{16}\\right) = \\frac{15}{32}\\sigma\\pi R^4\\]
<p>In terms of \\(M\\): \\(\\sigma\\pi R^2 = \\frac{4M}{3}\\), so \\(I = \\frac{15}{32}\\cdot\\frac{4M}{3}\\cdot R^2 = \\frac{5}{8}MR^2\\).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Looking ahead</div>
<div class="env-body">
<p>The moment of inertia connects to every rotational topic in Parts D and E. In Chapter 13, we use it to relate torque to angular acceleration. In Chapter 14, it determines which objects roll faster. In Chapter 15, it governs the period of a physical pendulum. Master \\(I\\) now; it pays dividends throughout the course.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A compound pendulum consists of a uniform rod of mass \\(m\\) and length \\(\\ell\\), with a solid disc of mass \\(M\\) and radius \\(R\\) attached to the free end of the rod. The rod is pivoted at its top end. Find the moment of inertia of the system about the pivot.',
                        hint: 'Compute \\(I_{\\text{rod}}\\) about its end using the parallel axis theorem (or the known formula \\(\\frac{1}{3}m\\ell^2\\)). For the disc, first find \\(I_{\\text{disc,cm}}\\) and then shift using the parallel axis theorem with \\(d = \\ell + R\\) (if the disc center is at distance \\(\\ell\\) from the pivot) or \\(d = \\ell\\) (if attached at the rim). Clarification: assume the disc center is at the rod end, so \\(d = \\ell\\).',
                        solution: '\\(I_{\\text{rod}} = \\frac{1}{3}m\\ell^2\\). \\(I_{\\text{disc}} = \\frac{1}{2}MR^2 + M\\ell^2\\). Total: \\(I = \\frac{1}{3}m\\ell^2 + \\frac{1}{2}MR^2 + M\\ell^2\\).'
                    }
                ]
            }
        ]
    });
})();
