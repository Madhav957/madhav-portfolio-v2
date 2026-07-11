// ==========================================================
// Madhav Jayanti — Portfolio interactions
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTypedRoles();
  initTerminalSim();
  initScrollReveal();
  initContactForm();
});

/* ---------------- Mobile nav ---------------- */
function initNav(){
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if(!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------- Typed role animation ---------------- */
function initTypedRoles(){
  const el = document.getElementById('typedText');
  if(!el) return;
  const roles = ['AWS Enthusiast', 'Python Developer', 'Cloud Automation Builder', 'Backend Learner'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(reduceMotion){
    el.textContent = roles[0];
    return;
  }

  let roleIdx = 0, charIdx = 0, deleting = false;
  const TYPE_SPEED = 65, DELETE_SPEED = 35, HOLD = 1400, GAP = 400;

  function tick(){
    const current = roles[roleIdx];
    if(!deleting){
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if(charIdx === current.length){
        deleting = true;
        return setTimeout(tick, HOLD);
      }
      return setTimeout(tick, TYPE_SPEED);
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if(charIdx === 0){
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        return setTimeout(tick, GAP);
      }
      return setTimeout(tick, DELETE_SPEED);
    }
  }
  tick();
}

/* ---------------- Terminal CLI simulation (hero signature element) ---------------- */
function initTerminalSim(){
  const body = document.getElementById('terminalBody');
  if(!body) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sequence of "screens" the fake CLI walks through.
  const menu =
`$ python cloud_resource_manager.py

========== Cloud Resource Manager ==========

  1. Amazon S3
  2. Amazon EC2
  3. Amazon IAM

Select Service: `;

  const s3Flow = [
    { type: 'input', text: '1' },
    { type: 'out', text:
`
---------- Amazon S3 ----------
  1. Create Bucket
  2. List Buckets
  3. Upload Files
  4. Delete Objects

Select Action: ` },
    { type: 'input', text: '2' },
    { type: 'out', text:
`
Fetching buckets ...
  ✓ madhav-cloud-assets
  ✓ resource-manager-logs
  ✓ cloudwatch-exports

3 buckets found.
` },
  ];

  const ec2Flow = [
    { type: 'input', text: '2' },
    { type: 'out', text:
`
---------- Amazon EC2 ----------
  1. List Instances
  2. Launch Instance
  3. Start / Stop Instance
  4. Terminate Instance

Select Action: ` },
    { type: 'input', text: '1' },
    { type: 'out', text:
`
Fetching instances ...
  i-0a3f9c2b  t2.micro   running
  i-0d81ea77  t3.small   stopped

2 instances found.
` },
  ];

  if(reduceMotion){
    body.textContent = menu + '1' + s3Flow[1].text;
    return;
  }

  let cancelled = false;
  body.setAttribute('aria-hidden', 'true');

  async function typeText(str, speed = 22){
    for(let i = 0; i < str.length; i++){
      if(cancelled) return;
      body.textContent += str[i];
      body.scrollTop = body.scrollHeight;
      await sleep(speed);
    }
  }

  function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

  async function playFlow(flow){
    for(const step of flow){
      if(cancelled) return;
      if(step.type === 'input'){
        await sleep(500);
        await typeText(step.text, 90);
        await sleep(250);
        body.textContent += '\n';
      } else {
        await typeText(step.text, 10);
      }
    }
  }

  async function loop(){
    while(!cancelled){
      body.textContent = '';
      await typeText(menu, 18);
      await playFlow(s3Flow);
      await sleep(2200);

      body.textContent = '';
      await typeText(menu, 18);
      await playFlow(ec2Flow);
      await sleep(2200);
    }
  }

  // Pause the simulation when the hero scrolls out of view to save cycles.
  const heroVisual = document.querySelector('.hero-visual');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      cancelled = !entry.isIntersecting;
      if(entry.isIntersecting) loop();
    });
  }, { threshold: 0.15 });

  if(heroVisual) observer.observe(heroVisual);
  else loop();
}

/* ---------------- Scroll reveal + sticky nav shadow ---------------- */
function initScrollReveal(){
  const targets = document.querySelectorAll(
    '.about-copy, .about-stats, .skill-group, .feature-card, .project-card, .timeline-col, .cert-card, .github-grid, .contact-info, .contact-form'
  );
  targets.forEach(t => t.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(t => io.observe(t));

  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 12) nav.style.boxShadow = '0 8px 24px rgba(0,0,0,.3)';
    else nav.style.boxShadow = 'none';
  }, { passive: true });
}

/* ---------------- Contact form (front-end only placeholder) ---------------- */
function initContactForm(){
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if(!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Hook this up to your backend / form service (e.g. Formspree, AWS SES via API Gateway + Lambda).
    status.textContent = 'Message captured locally — connect a backend endpoint to send it for real.';
    form.reset();
  });
}
