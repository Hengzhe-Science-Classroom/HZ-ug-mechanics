// === Chapter 9: Momentum & Center of Mass ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch09',
        number: 9,
        title: 'Momentum & Center of Mass',
        subtitle: 'From Newton\'s third law to rockets: the physics of many-body systems',
        file: 'ch09-momentum',

        sections: [
            // ============================================================
            // Section 0: Momentum Conservation from Newton's Third Law
            // ============================================================
            {
                id: 'momentum-conservation',
                title: 'Momentum Conservation',
                content: `
<h2>Momentum and Newton's Third Law</h2>

<p>Momentum is, at the deepest level, more fundamental than force. In modern physics (Noether's theorem), conservation of momentum follows from the translational invariance of space. But in Newtonian mechanics, the derivation is immediate from Newton's second and third laws.</p>

<div class="env-block definition">
<div class="env-title">Definition: Linear Momentum</div>
<div class="env-body">
<p>The <strong>linear momentum</strong> of a particle of mass \\(m\\) and velocity \\(\\mathbf{v}\\) is:</p>
\\[\\mathbf{p} = m\\mathbf{v}.\\]
<p>Newton's second law in its most general form is \\(\\mathbf{F} = d\\mathbf{p}/dt\\). For constant mass, this reduces to \\(\\mathbf{F} = m\\mathbf{a}\\).</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: Conservation of Momentum for an Isolated System</div>
<div class="env-body">
<p>Consider a system of \\(N\\) particles. The total momentum is \\(\\mathbf{P} = \\sum_{i=1}^N m_i \\mathbf{v}_i\\). Newton's second law for each particle gives:</p>
\\[\\frac{d\\mathbf{P}}{dt} = \\sum_i \\mathbf{F}_i^{\\text{ext}} + \\sum_{i \\neq j} \\mathbf{F}_{ij}\\]
<p>By Newton's third law, \\(\\mathbf{F}_{ij} = -\\mathbf{F}_{ji}\\), so all internal forces cancel in pairs:</p>
\\[\\frac{d\\mathbf{P}}{dt} = \\mathbf{F}^{\\text{ext}}_{\\text{total}}.\\]
<p>If the system is isolated (\\(\\mathbf{F}^{\\text{ext}} = \\mathbf{0}\\)), then \\(\\mathbf{P} = \\text{constant}\\).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Component-by-Component Conservation</div>
<div class="env-body">
<p>Momentum is a vector equation. Even if the external force is nonzero, any component of \\(\\mathbf{F}^{\\text{ext}}\\) that vanishes implies that the corresponding component of \\(\\mathbf{P}\\) is conserved. Example: during a projectile explosion in flight, the vertical momentum is not conserved (gravity acts), but the horizontal momentum is conserved (no horizontal external force).</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Impulse</div>
<div class="env-body">
<p>The <strong>impulse</strong> delivered by a force is the time integral of the force:</p>
\\[\\mathbf{J} = \\int_{t_1}^{t_2} \\mathbf{F}\\,dt = \\Delta \\mathbf{p}.\\]
<p>The impulse-momentum theorem states that the change in momentum equals the impulse. For a short, intense force (a collision), the impulse is approximately \\(F_{\\text{avg}} \\cdot \\Delta t\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Recoil of a Gun</div>
<div class="env-body">
<p>A gun of mass \\(M = 4\\) kg fires a bullet of mass \\(m = 10\\) g at \\(v = 400\\) m/s. By momentum conservation (initial momentum = 0):</p>
\\[0 = mv + MV \\quad \\Rightarrow \\quad V = -\\frac{mv}{M} = -\\frac{0.01 \\times 400}{4} = -1 \\text{ m/s}.\\]
<p>The gun recoils at 1 m/s in the opposite direction. The minus sign indicates the gun moves backward.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Two ice skaters stand facing each other on frictionless ice. Skater A (\\(m_A = 60\\) kg) pushes skater B (\\(m_B = 80\\) kg) and B moves away at 1.5 m/s. What is A\'s velocity?',
                        hint: 'The system is isolated (ice is frictionless, push forces are internal). Total initial momentum is zero.',
                        solution: '\\(m_A v_A + m_B v_B = 0\\), so \\(v_A = -m_B v_B / m_A = -(80)(1.5)/60 = -2.0\\) m/s. Skater A moves backward at 2.0 m/s. The lighter skater recoils faster, as expected.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Center of Mass
            // ============================================================
            {
                id: 'center-of-mass',
                title: 'Center of Mass',
                content: `
<h2>The Center of Mass</h2>

<p>The center of mass is the "average position" of the system, weighted by mass. Its importance: the total momentum of the system equals the total mass times the velocity of the center of mass. The CM moves as if all external forces act on a single particle located there.</p>

<div class="env-block definition">
<div class="env-title">Definition: Center of Mass</div>
<div class="env-body">
<p>For \\(N\\) particles with masses \\(m_i\\) and positions \\(\\mathbf{r}_i\\):</p>
\\[\\mathbf{R} = \\frac{\\sum_{i=1}^N m_i \\mathbf{r}_i}{\\sum_{i=1}^N m_i} = \\frac{1}{M} \\sum_{i=1}^N m_i \\mathbf{r}_i\\]
<p>where \\(M = \\sum m_i\\) is the total mass. For a continuous body:</p>
\\[\\mathbf{R} = \\frac{1}{M} \\int \\mathbf{r}\\, dm.\\]
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: CM Motion</div>
<div class="env-body">
<p>Differentiating the CM position:</p>
\\[M\\dot{\\mathbf{R}} = \\sum m_i \\dot{\\mathbf{r}}_i = \\mathbf{P}\\]
\\[M\\ddot{\\mathbf{R}} = \\mathbf{F}^{\\text{ext}}_{\\text{total}}.\\]
<p>The center of mass accelerates exactly as if it were a point particle of mass \\(M\\) subject to the total external force. Internal forces do not affect the CM motion.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Exploding Firework</div>
<div class="env-body">
<p>A firework shell is launched and follows a parabolic trajectory. When it explodes, the fragments fly in all directions, but the <em>center of mass of all fragments</em> continues on the original parabola (assuming air drag is negligible). This is because the explosion forces are internal; only gravity (external) acts on the CM.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-fireworks"></div>

<div class="env-block example">
<div class="env-title">Example: CM of Two Particles</div>
<div class="env-body">
<p>A 3 kg particle is at \\(x = 2\\) m and a 1 kg particle is at \\(x = 6\\) m.</p>
\\[X_{\\text{cm}} = \\frac{3 \\times 2 + 1 \\times 6}{3 + 1} = \\frac{12}{4} = 3 \\text{ m}.\\]
<p>The CM is closer to the heavier particle. It divides the distance in the ratio \\(m_2 : m_1 = 1:3\\), so it is 1/4 of the way from particle 1 to particle 2.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-fireworks',
                        title: 'Fireworks Explosion: CM Stays on the Parabola',
                        description: 'A firework is launched and explodes at the apex. The colored fragments fly in all directions, but the <strong>white cross</strong> (center of mass) continues on the original parabolic trajectory. Press <strong>Launch</strong> to fire.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, {
                                scale: 30,
                                originX: 60,
                                originY: 350
                            });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var g = 9.8;
                            var v0x = 5, v0y = 12;
                            var launched = false;
                            var exploded = false;
                            var t = 0;
                            var explodeTime = v0y / g; // at apex
                            var fragments = [];
                            var nFragments = 12;
                            var fragmentColors;
                            var shellTrail = [];
                            var cmTrail = [];
                            var fragTrails = [];

                            function resetColors() {
                                fragmentColors = [
                                    viz.colors.red, viz.colors.orange, viz.colors.yellow,
                                    viz.colors.green, viz.colors.blue, viz.colors.purple,
                                    viz.colors.pink, viz.colors.cyan, viz.colors.gold,
                                    viz.colors.teal, viz.colors.red, viz.colors.orange
                                ];
                            }
                            resetColors();

                            VizEngine.createButton(controls, 'Launch', function () {
                                launched = true;
                                exploded = false;
                                t = 0;
                                fragments = [];
                                shellTrail = [];
                                cmTrail = [];
                                fragTrails = [];
                            });
                            VizEngine.createButton(controls, 'Reset', function () {
                                launched = false;
                                exploded = false;
                                t = 0;
                                fragments = [];
                                shellTrail = [];
                                cmTrail = [];
                                fragTrails = [];
                            });

                            function shellPos(time) {
                                return { x: v0x * time, y: v0y * time - 0.5 * g * time * time };
                            }

                            function doExplode(time) {
                                var pos = shellPos(time);
                                var totalMass = 1.0;
                                var fragMass = totalMass / nFragments;
                                // Random velocities summing to (v0x, v0y - g*t) to conserve momentum
                                var shellVx = v0x, shellVy = v0y - g * time;
                                var sumDvx = 0, sumDvy = 0;
                                var dvs = [];
                                for (var fi = 0; fi < nFragments - 1; fi++) {
                                    var angle = (fi / nFragments) * 2 * Math.PI + (Math.random() - 0.5) * 0.5;
                                    var speed = 3 + Math.random() * 5;
                                    var dvx = speed * Math.cos(angle);
                                    var dvy = speed * Math.sin(angle);
                                    dvs.push({ dvx: dvx, dvy: dvy });
                                    sumDvx += dvx;
                                    sumDvy += dvy;
                                }
                                // Last fragment ensures momentum conservation
                                dvs.push({ dvx: -sumDvx, dvy: -sumDvy });

                                for (var fj = 0; fj < nFragments; fj++) {
                                    fragments.push({
                                        x: pos.x,
                                        y: pos.y,
                                        vx: shellVx + dvs[fj].dvx,
                                        vy: shellVy + dvs[fj].dvy,
                                        mass: fragMass,
                                        color: fragmentColors[fj % fragmentColors.length]
                                    });
                                    fragTrails.push([]);
                                }
                            }

                            var lastTime = null;
                            function draw(timestamp) {
                                if (!lastTime) lastTime = timestamp;
                                var dt = Math.min((timestamp - lastTime) / 1000, 0.04);
                                lastTime = timestamp;

                                if (launched) {
                                    t += dt;

                                    if (!exploded && t >= explodeTime) {
                                        doExplode(explodeTime);
                                        exploded = true;
                                    }

                                    if (!exploded) {
                                        var sp = shellPos(t);
                                        shellTrail.push([sp.x, sp.y]);
                                        if (shellTrail.length > 500) shellTrail.shift();
                                    }

                                    if (exploded) {
                                        for (var fi = 0; fi < fragments.length; fi++) {
                                            var fr = fragments[fi];
                                            fr.vy -= g * dt;
                                            fr.x += fr.vx * dt;
                                            fr.y += fr.vy * dt;
                                            fragTrails[fi].push([fr.x, fr.y]);
                                            if (fragTrails[fi].length > 200) fragTrails[fi].shift();
                                        }
                                    }
                                }

                                viz.clear();

                                // Ground
                                viz.drawGround(0, viz.colors.text);

                                // Parabolic trajectory (ghost)
                                if (launched) {
                                    ctx.strokeStyle = viz.colors.text;
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([3, 4]);
                                    ctx.beginPath();
                                    var pStarted = false;
                                    var tEnd = 2 * v0y / g + 0.5;
                                    for (var pi = 0; pi <= 200; pi++) {
                                        var pt = (pi / 200) * tEnd;
                                        var pp = shellPos(pt);
                                        if (pp.y < -0.5) { if (pStarted) break; continue; }
                                        var psx = viz.originX + pp.x * viz.scale;
                                        var psy = viz.originY - pp.y * viz.scale;
                                        if (!pStarted) { ctx.moveTo(psx, psy); pStarted = true; }
                                        else ctx.lineTo(psx, psy);
                                    }
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                }

                                // Shell trail
                                if (shellTrail.length > 1) {
                                    viz.drawTrail(shellTrail, viz.colors.yellow, 0.6);
                                }

                                // Shell before explosion
                                if (launched && !exploded) {
                                    var sp2 = shellPos(t);
                                    if (sp2.y >= 0) {
                                        viz.drawBall(sp2.x, sp2.y, 0.25, viz.colors.yellow, 2.5);
                                    }
                                }

                                // Fragments after explosion
                                if (exploded) {
                                    for (var fj2 = 0; fj2 < fragments.length; fj2++) {
                                        var fr2 = fragments[fj2];
                                        if (fr2.y < -1) continue;
                                        if (fragTrails[fj2].length > 1) {
                                            viz.drawTrail(fragTrails[fj2], fr2.color, 0.3);
                                        }
                                        viz.drawBall(fr2.x, fr2.y, 0.12, fr2.color, 1.5);
                                    }

                                    // CM position
                                    var cmx = 0, cmy = 0, totalM = 0;
                                    for (var fk = 0; fk < fragments.length; fk++) {
                                        cmx += fragments[fk].mass * fragments[fk].x;
                                        cmy += fragments[fk].mass * fragments[fk].y;
                                        totalM += fragments[fk].mass;
                                    }
                                    cmx /= totalM;
                                    cmy /= totalM;
                                    cmTrail.push([cmx, cmy]);
                                    if (cmTrail.length > 300) cmTrail.shift();

                                    // CM trail
                                    if (cmTrail.length > 1) {
                                        viz.drawTrail(cmTrail, viz.colors.white, 0.7);
                                    }

                                    // CM marker (cross)
                                    var cmSx = viz.originX + cmx * viz.scale;
                                    var cmSy = viz.originY - cmy * viz.scale;
                                    ctx.strokeStyle = viz.colors.white;
                                    ctx.lineWidth = 2.5;
                                    ctx.beginPath(); ctx.moveTo(cmSx - 8, cmSy); ctx.lineTo(cmSx + 8, cmSy); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(cmSx, cmSy - 8); ctx.lineTo(cmSx, cmSy + 8); ctx.stroke();

                                    viz.screenText('CM', cmSx + 12, cmSy - 8, viz.colors.white, 11);
                                }

                                // Labels
                                viz.screenText('Fireworks: CM follows the original parabola', w / 2, 16, viz.colors.text, 11);
                                if (launched) {
                                    viz.screenText('t = ' + t.toFixed(2) + ' s', w - 60, 16, viz.colors.yellow, 11);
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A 70 kg person stands at one end of a 5 m long, 200 kg boat at rest on still water (no friction). The person walks to the other end. How far does the boat move?',
                        hint: 'The CM of the system cannot move (no external horizontal force). If the person moves \\(d\\) relative to the boat, the boat moves in the opposite direction.',
                        solution: 'Let the person walk distance \\(L = 5\\) m relative to the boat. The boat moves distance \\(D\\) in the opposite direction. CM conservation: \\(m_{\\text{person}}(L - D) = m_{\\text{boat}} D\\), so \\(70(5 - D) = 200D\\), giving \\(350 = 270D\\), \\(D = 350/270 \\approx 1.30\\) m. The boat moves about 1.3 m opposite to the person\'s walking direction.'
                    }
                ]
            },

            // ============================================================
            // Section 2: The CM Frame
            // ============================================================
            {
                id: 'cm-frame',
                title: 'The CM Frame',
                content: `
<h2>The Center-of-Mass Reference Frame</h2>

<p>Many problems simplify dramatically when analyzed in the reference frame where the center of mass is at rest. This frame, called the <strong>CM frame</strong> (or zero-momentum frame), is indispensable for collisions, decays, and scattering.</p>

<div class="env-block definition">
<div class="env-title">Definition: CM Frame</div>
<div class="env-body">
<p>The <strong>center-of-mass frame</strong> is the reference frame in which \\(\\mathbf{P}_{\\text{total}} = \\mathbf{0}\\). If the CM moves with velocity \\(\\mathbf{V} = \\mathbf{P}/M\\) in the lab frame, then the velocity of particle \\(i\\) in the CM frame is:</p>
\\[\\mathbf{v}_i' = \\mathbf{v}_i - \\mathbf{V}.\\]
<p>In this frame, the momenta always sum to zero: \\(\\sum m_i \\mathbf{v}_i' = \\mathbf{0}\\).</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Theorem: Kinetic Energy Decomposition (K&ouml;nig's Theorem)</div>
<div class="env-body">
<p>The total kinetic energy of a system decomposes into two parts:</p>
\\[T = \\frac{1}{2}MV^2 + \\sum_i \\frac{1}{2}m_i v_i'^2 = T_{\\text{cm}} + T_{\\text{internal}}\\]
<p>where \\(V = |\\mathbf{V}|\\) is the CM speed and \\(v_i'\\) are the speeds in the CM frame. The cross terms vanish because \\(\\sum m_i \\mathbf{v}_i' = \\mathbf{0}\\).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Proof of K&ouml;nig's Theorem</div>
<div class="env-body">
<p>Write \\(\\mathbf{v}_i = \\mathbf{V} + \\mathbf{v}_i'\\). Then:</p>
\\[T = \\sum \\frac{1}{2} m_i |\\mathbf{V} + \\mathbf{v}_i'|^2 = \\frac{1}{2}MV^2 + \\mathbf{V} \\cdot \\underbrace{\\sum m_i \\mathbf{v}_i'}_{= 0} + \\sum \\frac{1}{2} m_i v_i'^2.\\]
<p>The cross term vanishes by definition of the CM frame. \\(\\square\\)</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why the CM Frame Matters</div>
<div class="env-body">
<p>In the CM frame, two-body collisions are symmetric: the particles approach each other, interact, and separate. The total momentum is zero throughout, so knowing one particle's motion determines the other. This reduces a two-body problem to effectively a one-body problem. We will exploit this heavily in Chapter 10 (Collisions).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Two-Body CM Frame</div>
<div class="env-body">
<p>Particle 1 (\\(m_1 = 2\\) kg, \\(v_1 = 6\\) m/s) approaches stationary particle 2 (\\(m_2 = 3\\) kg). The CM velocity is:</p>
\\[V = \\frac{m_1 v_1 + m_2 \\cdot 0}{m_1 + m_2} = \\frac{2 \\times 6}{5} = 2.4 \\text{ m/s}.\\]
<p>In the CM frame: \\(v_1' = 6 - 2.4 = 3.6\\) m/s, \\(v_2' = 0 - 2.4 = -2.4\\) m/s. Check: \\(2(3.6) + 3(-2.4) = 7.2 - 7.2 = 0\\). \\(\\checkmark\\)</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A 1 kg ball moving at 10 m/s collides with a 4 kg ball at rest. (a) What is the CM velocity? (b) What are the velocities in the CM frame? (c) What fraction of the total KE is internal (available for the collision)?',
                        hint: 'Use \\(V = m_1 v_1 / (m_1 + m_2)\\). The internal KE is \\(T - T_{\\text{cm}}\\).',
                        solution: '(a) \\(V = 1 \\times 10 / 5 = 2\\) m/s. (b) \\(v_1\' = 10 - 2 = 8\\) m/s, \\(v_2\' = 0 - 2 = -2\\) m/s. (c) \\(T = \\frac{1}{2}(1)(10)^2 = 50\\) J. \\(T_{\\text{cm}} = \\frac{1}{2}(5)(2)^2 = 10\\) J. \\(T_{\\text{int}} = 50 - 10 = 40\\) J. So 80% of the KE is internal. In a perfectly inelastic collision, all 40 J are lost to heat, leaving only the 10 J of CM motion.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Variable Mass Systems
            // ============================================================
            {
                id: 'variable-mass',
                title: 'Variable Mass Systems',
                content: `
<h2>The Rocket Equation</h2>

<p>Newton's second law \\(\\mathbf{F} = d\\mathbf{p}/dt\\) applies to a system of fixed identity. For a rocket, mass is continuously ejected, so we must be careful about what "the system" means. The key is to track the total momentum of rocket + exhaust over an infinitesimal time step.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: The Rocket Equation (Tsiolkovsky, 1903)</div>
<div class="env-body">
<p>At time \\(t\\), a rocket has mass \\(m\\) and velocity \\(v\\). In time \\(dt\\), it ejects mass \\(|dm|\\) (where \\(dm < 0\\)) at exhaust velocity \\(v_{\\text{ex}}\\) relative to the rocket. Momentum conservation gives:</p>
\\[m\\,dv = -v_{\\text{ex}}\\,dm \\quad \\Rightarrow \\quad dv = -v_{\\text{ex}} \\frac{dm}{m}.\\]
<p>Integrating from initial mass \\(m_0\\) to final mass \\(m_f\\):</p>
\\[\\Delta v = v_{\\text{ex}} \\ln\\frac{m_0}{m_f}.\\]
<p>This is the <strong>Tsiolkovsky rocket equation</strong>. The velocity change depends logarithmically on the mass ratio.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Derivation Detail</div>
<div class="env-body">
<p>At time \\(t\\): rocket has mass \\(m\\), velocity \\(v\\). At \\(t + dt\\): rocket has mass \\(m + dm\\) (with \\(dm < 0\\)) and velocity \\(v + dv\\); ejected mass \\(-dm\\) has velocity \\(v - v_{\\text{ex}}\\) in the ground frame. Momentum conservation:</p>
\\[mv = (m + dm)(v + dv) + (-dm)(v - v_{\\text{ex}})\\]
\\[mv = mv + m\\,dv + v\\,dm + dm\\,dv - v\\,dm + v_{\\text{ex}}\\,dm\\]
\\[0 = m\\,dv + v_{\\text{ex}}\\,dm + \\underbrace{dm\\,dv}_{\\approx 0}\\]
<p>Dropping the second-order term \\(dm\\,dv\\) gives \\(m\\,dv = -v_{\\text{ex}}\\,dm\\).</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Common Error: \\(F = ma\\) for Rockets</div>
<div class="env-body">
<p>You cannot naively write \\(F = dp/dt = d(mv)/dt = m\\dot{v} + \\dot{m}v\\) and interpret \\(\\dot{m}v\\) as a force. The issue is that \\(d(mv)/dt\\) for a variable-mass system does not equal the external force. You must use the momentum of the entire system (rocket + recently ejected gas) and the correct equation is the <strong>thrust equation</strong>:</p>
\\[m\\frac{dv}{dt} = F_{\\text{ext}} + v_{\\text{ex}}|\\dot{m}|\\]
<p>where \\(v_{\\text{ex}}|\\dot{m}|\\) is the <strong>thrust</strong>.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-rocket"></div>

<div class="env-block example">
<div class="env-title">Example: Single-Stage vs. Multi-Stage</div>
<div class="env-body">
<p>A rocket with \\(v_{\\text{ex}} = 3\\) km/s and mass ratio \\(m_0/m_f = 10\\) achieves:</p>
\\[\\Delta v = 3 \\ln 10 = 6.9 \\text{ km/s}.\\]
<p>To reach Low Earth Orbit (\\(\\Delta v \\approx 9.4\\) km/s), a single stage would need \\(m_0/m_f = e^{9.4/3} \\approx 23\\), meaning 96% of the initial mass is fuel. This is barely achievable. <strong>Staging</strong> helps: by discarding empty tanks, each stage starts with a better mass ratio. Two stages each with ratio 5 give \\(\\Delta v = 3\\ln 5 + 3\\ln 5 = 9.66\\) km/s, comfortably reaching orbit with less extreme engineering.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-rocket',
                        title: 'Rocket Propulsion: Tsiolkovsky Equation',
                        description: 'Watch a rocket accelerate as it ejects exhaust. The mass decreases, the acceleration increases. Adjust the exhaust velocity and burn rate. The readout shows \\(\\Delta v = v_{\\text{ex}} \\ln(m_0/m)\\).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, {
                                scale: 1,
                                originX: 0,
                                originY: 0
                            });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var vex = 3.0; // km/s
                            var burnRate = 0.15; // fraction per second
                            var running = false;
                            var t = 0;
                            var rocketMass = 1.0; // normalized m/m0
                            var rocketV = 0;
                            var rocketY = 0; // in display units
                            var exhaustParticles = [];

                            VizEngine.createSlider(controls, 'v_ex (km/s)', 1, 5, vex, 0.5, function (v) { vex = v; });
                            VizEngine.createSlider(controls, 'Burn rate', 0.05, 0.4, burnRate, 0.01, function (v) { burnRate = v; });
                            VizEngine.createButton(controls, 'Launch', function () {
                                running = true;
                                t = 0;
                                rocketMass = 1.0;
                                rocketV = 0;
                                rocketY = 0;
                                exhaustParticles = [];
                            });
                            VizEngine.createButton(controls, 'Reset', function () {
                                running = false;
                                t = 0;
                                rocketMass = 1.0;
                                rocketV = 0;
                                rocketY = 0;
                                exhaustParticles = [];
                            });

                            var lastTime = null;
                            function draw(timestamp) {
                                if (!lastTime) lastTime = timestamp;
                                var dt = Math.min((timestamp - lastTime) / 1000, 0.04);
                                lastTime = timestamp;

                                if (running && rocketMass > 0.05) {
                                    t += dt;
                                    var dm = burnRate * dt;
                                    if (rocketMass - dm < 0.05) dm = rocketMass - 0.05;
                                    var dv = vex * dm / rocketMass;
                                    rocketV += dv;
                                    rocketMass -= dm;
                                    rocketY += rocketV * dt * 20; // scale for display

                                    // Spawn exhaust particles
                                    if (dm > 0) {
                                        for (var ep = 0; ep < 3; ep++) {
                                            exhaustParticles.push({
                                                x: w / 2 + (Math.random() - 0.5) * 14,
                                                y: h - 80 + 20, // just below rocket nozzle
                                                vx: (Math.random() - 0.5) * 40,
                                                vy: 60 + Math.random() * 40,
                                                life: 1.0,
                                                size: 2 + Math.random() * 3
                                            });
                                        }
                                    }
                                }

                                // Update exhaust particles
                                for (var ei = exhaustParticles.length - 1; ei >= 0; ei--) {
                                    var p = exhaustParticles[ei];
                                    p.x += p.vx * dt;
                                    p.y += p.vy * dt;
                                    p.life -= dt * 1.5;
                                    if (p.life <= 0 || p.y > h + 20) {
                                        exhaustParticles.splice(ei, 1);
                                    }
                                }

                                // Draw
                                ctx.fillStyle = '#0a0a1a';
                                ctx.fillRect(0, 0, w, h);

                                // Stars
                                ctx.fillStyle = '#ffffff';
                                for (var si = 0; si < 80; si++) {
                                    var seed = si * 137.508;
                                    var starX = (seed * 7.31) % w;
                                    var starY = ((seed * 13.17 + rocketY * 0.3) % (h + 20));
                                    if (starY < 0) starY += h;
                                    if (starY > h) starY -= h;
                                    ctx.globalAlpha = 0.3 + 0.5 * ((seed * 3.7) % 1);
                                    ctx.fillRect(starX, starY, 1.5, 1.5);
                                }
                                ctx.globalAlpha = 1;

                                // Exhaust particles
                                for (var ej = 0; ej < exhaustParticles.length; ej++) {
                                    var ep2 = exhaustParticles[ej];
                                    var alpha = ep2.life * 0.8;
                                    var r = Math.round(255);
                                    var g2 = Math.round(100 + 155 * ep2.life);
                                    var b = Math.round(50 * ep2.life);
                                    ctx.fillStyle = 'rgba(' + r + ',' + g2 + ',' + b + ',' + alpha + ')';
                                    ctx.beginPath();
                                    ctx.arc(ep2.x, ep2.y, ep2.size * ep2.life, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Rocket body
                                var rx = w / 2, ry = h - 80;
                                var rw = 16 + rocketMass * 10;
                                var rh = 40 + rocketMass * 20;

                                // Rocket body gradient
                                var rGrad = ctx.createLinearGradient(rx - rw, ry - rh, rx + rw, ry - rh);
                                rGrad.addColorStop(0, '#333355');
                                rGrad.addColorStop(0.5, '#6666aa');
                                rGrad.addColorStop(1, '#333355');

                                // Nose cone
                                ctx.fillStyle = rGrad;
                                ctx.beginPath();
                                ctx.moveTo(rx, ry - rh - 15);
                                ctx.lineTo(rx - rw, ry - rh + 5);
                                ctx.lineTo(rx - rw, ry);
                                ctx.lineTo(rx + rw, ry);
                                ctx.lineTo(rx + rw, ry - rh + 5);
                                ctx.closePath();
                                ctx.fill();
                                ctx.strokeStyle = '#8888cc';
                                ctx.lineWidth = 1;
                                ctx.stroke();

                                // Nozzle
                                ctx.fillStyle = '#555577';
                                ctx.beginPath();
                                ctx.moveTo(rx - rw * 0.5, ry);
                                ctx.lineTo(rx - rw * 0.7, ry + 10);
                                ctx.lineTo(rx + rw * 0.7, ry + 10);
                                ctx.lineTo(rx + rw * 0.5, ry);
                                ctx.closePath();
                                ctx.fill();

                                // Flame
                                if (running && rocketMass > 0.05) {
                                    var flameH = 15 + Math.random() * 20 + (1 - rocketMass) * 20;
                                    var fGrad = ctx.createLinearGradient(rx, ry + 10, rx, ry + 10 + flameH);
                                    fGrad.addColorStop(0, 'rgba(255,200,50,0.9)');
                                    fGrad.addColorStop(0.4, 'rgba(255,100,20,0.7)');
                                    fGrad.addColorStop(1, 'rgba(255,50,10,0)');
                                    ctx.fillStyle = fGrad;
                                    ctx.beginPath();
                                    ctx.moveTo(rx - rw * 0.5, ry + 10);
                                    ctx.quadraticCurveTo(rx, ry + 10 + flameH, rx + rw * 0.5, ry + 10);
                                    ctx.closePath();
                                    ctx.fill();
                                }

                                // HUD
                                var hudX = 15, hudY = 20;
                                ctx.fillStyle = 'rgba(12,12,32,0.8)';
                                ctx.fillRect(hudX - 5, hudY - 5, 200, 100);
                                ctx.strokeStyle = '#30363d';
                                ctx.strokeRect(hudX - 5, hudY - 5, 200, 100);

                                viz.screenText('Mass: ' + (rocketMass * 100).toFixed(1) + '% of m\u2080', hudX + 95, hudY + 8, viz.colors.white, 12, 'center');
                                viz.screenText('v = ' + rocketV.toFixed(2) + ' km/s', hudX + 95, hudY + 28, viz.colors.cyan, 12, 'center');

                                var theoreticalDv = rocketMass > 0.01 ? vex * Math.log(1 / rocketMass) : 0;
                                viz.screenText('\u0394v (theory) = v_ex ln(m\u2080/m) = ' + theoreticalDv.toFixed(2) + ' km/s', hudX + 95, hudY + 48, viz.colors.green, 11, 'center');
                                viz.screenText('v_ex = ' + vex.toFixed(1) + ' km/s', hudX + 95, hudY + 68, viz.colors.text, 11, 'center');

                                // Mass bar
                                var barX = w - 45, barY = 40, barW2 = 20, barH2 = h - 80;
                                ctx.fillStyle = '#1a1a40';
                                ctx.fillRect(barX, barY, barW2, barH2);
                                ctx.strokeStyle = '#30363d';
                                ctx.strokeRect(barX, barY, barW2, barH2);

                                // Fuel remaining
                                var fuelH = rocketMass * barH2;
                                var fuelGrad = ctx.createLinearGradient(barX, barY + barH2 - fuelH, barX, barY + barH2);
                                fuelGrad.addColorStop(0, viz.colors.orange);
                                fuelGrad.addColorStop(1, viz.colors.red);
                                ctx.fillStyle = fuelGrad;
                                ctx.fillRect(barX + 2, barY + barH2 - fuelH, barW2 - 4, fuelH);

                                viz.screenText('Fuel', barX + barW2 / 2, barY - 8, viz.colors.text, 10);

                                if (!running) {
                                    viz.screenText('Press Launch to fire the rocket', w / 2, h / 2, viz.colors.text, 14);
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A rocket in deep space (no gravity, no drag) has exhaust velocity \\(v_{\\text{ex}} = 4\\) km/s. What mass ratio \\(m_0/m_f\\) is needed to achieve \\(\\Delta v = 11\\) km/s?',
                        hint: 'Invert the Tsiolkovsky equation: \\(m_0/m_f = e^{\\Delta v / v_{\\text{ex}}}\\).',
                        solution: '\\(m_0/m_f = e^{11/4} = e^{2.75} \\approx 15.6\\). About 94% of the initial mass must be propellant. This illustrates the tyranny of the rocket equation: the required mass ratio grows exponentially with the desired \\(\\Delta v\\).'
                    },
                    {
                        question: 'Derive the thrust force on a rocket. If \\(\\dot{m} = -\\alpha\\) (mass decreases at rate \\(\\alpha > 0\\)), what is the initial acceleration from rest?',
                        hint: 'Thrust = \\(v_{\\text{ex}} |\\dot{m}|\\). Use \\(F_{\\text{thrust}} = m a\\) at \\(t = 0\\).',
                        solution: 'The thrust is \\(F = v_{\\text{ex}} \\alpha\\). At \\(t = 0\\), \\(m = m_0\\), so \\(a_0 = v_{\\text{ex}} \\alpha / m_0\\). As fuel burns and \\(m\\) decreases, the acceleration increases (constant thrust, decreasing mass), producing the characteristic acceleration profile of a rocket.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Applications and Deeper Results
            // ============================================================
            {
                id: 'applications',
                title: 'Applications & Deeper Results',
                content: `
<h2>Beyond the Basics</h2>

<p>Momentum conservation and the CM concept have far-reaching consequences. Here we collect several important results and applications that recur throughout mechanics and beyond.</p>

<div class="env-block theorem">
<div class="env-title">Theorem: CM of Composite Bodies</div>
<div class="env-body">
<p>If a body is composed of parts with known CMs and masses, the overall CM is:</p>
\\[\\mathbf{R} = \\frac{\\sum_k M_k \\mathbf{R}_k}{\\sum_k M_k}\\]
<p>where \\(M_k\\) and \\(\\mathbf{R}_k\\) are the mass and CM of part \\(k\\). This is the "superposition principle" for centers of mass, and it works for subtraction too: to find the CM of a plate with a hole, treat it as (whole plate) minus (removed piece).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: CM of a Plate with a Hole</div>
<div class="env-body">
<p>A uniform square plate of side \\(L\\) and mass \\(M\\) has a circular hole of radius \\(R = L/4\\) cut from one corner, centered at \\((3L/4, 3L/4)\\). The mass of the removed disk is \\(m = M \\pi R^2 / L^2 = \\pi M/16\\). The CM of the whole plate is at \\((L/2, L/2)\\). Using subtraction:</p>
\\[X_{\\text{cm}} = \\frac{M(L/2) - m(3L/4)}{M - m} = \\frac{ML/2 - (\\pi M/16)(3L/4)}{M(1 - \\pi/16)}.\\]
<p>This gives a CM shifted away from the hole, as physical intuition demands.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">The Virial Theorem (Preview)</div>
<div class="env-body">
<p>For a system of particles interacting via power-law forces \\(F \\propto r^n\\), the time-averaged kinetic and potential energies satisfy:</p>
\\[2\\langle T \\rangle = (n+1) \\langle U \\rangle.\\]
<p>For gravity (\\(n = -2\\)): \\(2\\langle T \\rangle = -\\langle U \\rangle\\), so \\(\\langle E \\rangle = -\\langle T \\rangle\\). We will prove this in Chapter 18.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Conveyor Belt Problem</div>
<div class="env-body">
<p>Sand falls vertically at rate \\(\\dot{m}\\) onto a horizontal conveyor belt moving at speed \\(v\\). What force must the belt exert to maintain constant speed? The belt must accelerate each arriving grain from 0 to \\(v\\) horizontally. The required force is:</p>
\\[F = \\dot{m}\\,v.\\]
<p>The power input is \\(P = Fv = \\dot{m}v^2\\), but the kinetic energy gained by the sand per unit time is only \\(\\frac{1}{2}\\dot{m}v^2\\). The other half goes into heat from the sand grains skidding on the belt. This is a classic example where naive energy conservation fails because of the inelastic collision between the sand and belt.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Chain Falling Off a Table</div>
<div class="env-body">
<p>A uniform chain of length \\(L\\) and mass \\(M\\) lies on a frictionless table with a length \\(y_0\\) hanging over the edge. As it slides, the hanging portion grows. If \\(y\\) is the length hanging at time \\(t\\), the equation of motion is:</p>
\\[M\\ddot{y} = \\frac{M}{L} g y \\quad \\Rightarrow \\quad \\ddot{y} = \\frac{g}{L} y.\\]
<p>This is not SHM (note the positive sign); the solution involves exponential growth: \\(y(t) = A e^{\\sqrt{g/L}\\,t} + B e^{-\\sqrt{g/L}\\,t}\\). The chain accelerates exponentially until it leaves the table entirely.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Momentum in Modern Physics</div>
<div class="env-body">
<p>Conservation of momentum extends far beyond Newtonian mechanics. In electrodynamics, the electromagnetic field carries momentum \\(\\mathbf{g} = \\epsilon_0(\\mathbf{E} \\times \\mathbf{B})\\). In quantum mechanics, momentum is the generator of spatial translations (\\(\\hat{p} = -i\\hbar \\nabla\\)). In special relativity, energy and momentum unify into a four-vector \\(p^\\mu = (E/c, \\mathbf{p})\\). At every level, momentum conservation is a consequence of the homogeneity of space.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A person of mass \\(m\\) stands on a railroad car of mass \\(M\\) at rest on frictionless rails. The person throws a ball of mass \\(m_b\\) horizontally at speed \\(u\\) (relative to the ground). What is the recoil speed of the person + car system?',
                        hint: 'Momentum is initially zero. After the throw, \\(m_b u + (M + m)V = 0\\).',
                        solution: '\\(V = -m_b u / (M + m)\\). The person and car recoil in the opposite direction. If the person throws multiple balls, each successive throw starts with a smaller "remaining mass" and gives a diminishing velocity increment, analogous to the rocket equation. In fact, this is exactly the discrete version of the Tsiolkovsky problem.'
                    },
                    {
                        question: 'Prove that the CM of a uniform solid hemisphere of radius \\(R\\) is located at \\(3R/8\\) above the flat face. (Use \\(dm = \\rho \\pi (R^2 - z^2) dz\\) for horizontal slices.)',
                        hint: 'Integrate \\(z\\,dm\\) from \\(0\\) to \\(R\\), then divide by total mass \\(M = \\frac{2}{3}\\pi \\rho R^3\\).',
                        solution: '\\(z_{\\text{cm}} = \\frac{\\int_0^R z \\cdot \\rho \\pi(R^2 - z^2)\\,dz}{\\frac{2}{3}\\pi \\rho R^3} = \\frac{\\rho\\pi [R^2 z^2/2 - z^4/4]_0^R}{\\frac{2}{3}\\pi \\rho R^3} = \\frac{\\rho\\pi(R^4/2 - R^4/4)}{\\frac{2}{3}\\pi \\rho R^3} = \\frac{R^4/4}{\\frac{2}{3}R^3} = \\frac{3R}{8}\\).'
                    }
                ]
            }
        ]
    });
})();
