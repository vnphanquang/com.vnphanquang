import socials from '$lib/data/socials.json';

export const milestones = [
  {
    id: 10,
    slug: 'personal-website-2nd',
    time: '18th of May, 2022',
    location: 'Ho Chi Minh, Vietnam',
    headline: 'Relaunch of Personal Website',
    title: 'Second version',
    paragraphs: [
      `This time the website was rebuilt with more modern technologies including
      <a href="https://kit.svelte.dev/" class="c-link" target="_blank">Svelte-kit</a>,
      <a class="c-link" href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>,
      and hosted by <a class="c-link" href="https://vercel.com" target="_blank">Vercel</a>.`,
    ],
  },
  {
    id: 9,
    slug: 'professional-scrum-master-1',
    time: '30th of April, 2022',
    location: 'Ho Chi Minh, Vietnam',
    headline: `<a href="https://www.credly.com/badges/2d1c3bf1-28be-43aa-88c2-5413826174f1/public_url" target="_blank" class="flex items-end">
        <span class="c-link">Professional Scrum Master Certification</span>
        <img src="/images/psm1.webp" alt="Professional Scrum Master 1" width="30" height="30" class="inline-block ml-2" />
      </a>`,
    title: '',
    paragraphs: [
      `This was not meant to facilitate a full-time Scrum Master career, at least not in the near future.
      It was to understand Scrum as a developer, to gain the ability to justify its values and
      practices, and to maximize the contribution to Scrum teams.`,
    ],
  },
  {
    id: 8,
    slug: 'end-at-designveloper',
    time: 'March, 2022',
    location: 'Ho Chi Minh, Vietnam',
    headline: `
      <a href="${socials.github.href}">
        <span class="c-link">Open source developer</span>
        <img src="${socials.github.icon}" alt="github" width="30" height="30" class="inline-block" />
      </a>`,
    title: '',
    paragraphs: [
      `Contributor to the ecosystems of
      <a class="c-link" href="https://svelte.dev/" target="_blank">Svelte</a>
      (<a class="c-link" href="https://github.com/vnphanquang/svelte-put" target="_blank">@svelte-put</a>,
      <a class="c-link" href="https://github.com/vnphanquang/roullector" target="_blank">roullector</a>),
      <a class="c-link" href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>
      (through <a class="c-link" href="https://daisyui.com/" target="_blank">Daisy UI</a>), and
      <a class="c-link" href="https://monkeytype.com/" target="_blank">Monkeytype</a>
      (<a class="c-link" href="https://github.com/vnphanquang/monkeytype-readme" target="_blank">monkeytype-readme</a>)`,
      '----------',
      'A break from 9-5 jobs.',
      `It was sad saying goodbye to the lovely people at
      <a class="c-link" href="#designveloper">Designveloper</a>.
      But time was on its way. The path out of the comfort zone into new territories
      now opened with a new chapter full of the unknown.`,
      `Time was spent to research the Scrum framework and
      to catch up with interesting technologies such as
      <a class="c-link" href="https://turborepo.org/" target="_blank">Turborepo</a>,
      <a class="c-link" href="https://svelte.dev/" target="_blank">Svelte</a>,
      <a class="c-link" href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>,
      <a class="c-link" href="https://threejs.org/" target="_blank">Three.JS</a>, ...`,
    ],
  },
  {
    id: 7,
    slug: 'the-ordolink',
    time: 'December, 2020',
    location: 'Ho Chi Minh, Vietnam',
    headline: 'The OrdoLink',
    title: '',
    paragraphs: [
      `<a style="
          display:inline-block;
          background-color:#FC5200;
          color:#fff;
          padding:5px 10px 5px 30px;
          font-size:11px;
          font-family:Helvetica, Arial, sans-serif;
          white-space:nowrap;
          text-decoration:none;
          background-repeat:no-repeat;
          background-position:10px center;
          border-radius:3px;
          background-image:url('https://badges.strava.com/logo-strava-echelon.png')
        "
        href='https://strava.com/athletes/49111844'
        target="_clean"
      >
        Follow me on
        <img
          src='https://badges.strava.com/logo-strava.png'
          alt='Strava'
          style='display:inline-block;margin-left:2px;vertical-align:text-bottom'
          height=13
          width=51
        />
      </a>`,
      'Award receiver of a Giant touring bicycle from client for good performance in a project at Designveloper',
      '----------',
      `This bike took the place of the previous daily driver Fornix mountain bike.
      The daily commute became more fun. More and more long-distance journeys were
      made possible.`,
      `It was named the "OrdoLink".`,
    ],
  },
  {
    id: 6,
    slug: 'designveloper',
    time: 'December, 2019',
    location: 'Ho Chi Minh, Vietnam',
    headline: `
    <a href="https://www.designveloper.com/">
      <span class="c-link">Designveloper</span>
      <img
        class="inline-block rounded"
        src="/images/designveloper.webp"
        alt="Designveloper"
        width="30"
        height="30"
      />
    </a>`,
    title: 'Software Developer',
    paragraphs: [
      `Developer of web & desktop applications for international
      clients and businesses among various industries including healthcare, education,
      energy management, and social network`,
      `Maintainer of internal toolings and documentation, participating in
      next-generation technology evaluation, debate, adoption, and sharing sessions`,
      '----------',
      `A professional work environment, a young & growing company culture, strong teams,
      encouraging mentors, amazing colleagues, and great opportunities for self development`,
    ],
  },
  {
    id: 5,
    slug: 'nodexus',
    time: 'July, 2019',
    location: 'Hayward, California, USA',
    headline: '<a class="c-link" href="http://www.nodexus.com/">Nodexus Inc.</a>',
    title: 'Software R&D intern - Nodexus circuit printer system',
    paragraphs: [
      `Developer for the well-documented core implementation of Nodexus printer control operations, responsible for
      motor synchronization at thousand-Hz & micron precision and a dedicated minimal UI.`,
      '----------',
      `It's surprising how far Python can go even at low level. Although of course you cannot compare it to C / Rust,
      the whole embedded system for this printer was made possible in
      short enough time with reasonable performance thanks to Python.`,
      `This is the first experience working in a startup, and the first time academic knowledge had
      direct impact on the productivity of solving real world problems.`,
      '"Theory is abstracted practice, and practice is applied theory", as they say.',
      `Also here was where chemistry laboratory experience and programming skill somewhat converged.
      A future emerged anew.`,
    ],
  },
  {
    id: 4,
    slug: 'personal-website-1st',
    time: 'June, 2019',
    location: 'San Jose, California, USA',
    headline: 'Launch of Personal Website',
    title: 'First version',
    paragraphs: [
      `At the time it was just plain HTML, CSS, Javascript, served by a node server,
      using the EJS template system, and hosted initially with Heroku then migrated
      to a DigitalOcean droplet.`,
      `Suprisingly, the Heroku demo can still be
      <a class="c-link" href="https://phanvn-quang.herokuapp.com/" target="_blank">accessed here</a>.`,
      `There was also a
      <a class="c-link" href="https://jsfiddle.net/vnphanquang/0hacv51p/" target="_blank">typing animation</a>
      built from <a class="c-link" href="https://github.com/vnphanquang/pq-typewriterjs" target="_blank">scratch</a> with a
      rather noble declaration method of annotating the markup with typing commands (in the form of HTML comments).`,
    ],
  },
  {
    id: 3,
    slug: 'foothill-graduation',
    time: 'April, 2019',
    location: 'Los Altos, California, USA',
    headline: `Graduation from
    <a class="c-link" href="#foothill">Foothill College</a>`,
    title:
      'High Honors Associate in Science degrees in Computer Science, Mathematics, and Chemistry',
    paragraphs: [],
    timemark: '2019'
  },
  {
    id: 2,
    slug: 'san-jose-simocko',
    time: 'July, 2018',
    location: 'San Jose, California, USA',
    headline: '<a class="c-link" href="http://www.sjsu.edu/">San Jose State University</a>',
    title:
      'Research intern in <a class="c-link" href="http://www.sjsu.edu/simocko/" target="_blank">Dr. Chester Simocko\'s</a> team on olefin metathesis polymerization',
    paragraphs: [
      '----------',
      'Exposure to laboratory environment with academic mentorship and modern equipments',
      `Research in the field of organic polymer chemistry demands patience and precision.
      A few milligrams of this, a few grams of that, and a few hours of meticulously
      babysitting a reaction in some air-tight nitrogen-filled tubes: that is typical.
      But you do look cool in lab coats so it's all worth it really!`,
    ],
    timemark: '2018',
  },
  {
    id: 1,
    slug: 'foothill',
    time: 'April, 2016',
    location: 'Los Altos, California, USA',
    headline: '<a class="c-link" href="https://foothill.edu/">Foothill College</a>',
    title: '',
    paragraphs: [
      `Chemistry and Math tutor at the
      <a class="c-link" href="https://foothill.edu/eops" target="_blank">Extended Opportunity Program & Services</a> and
      <a class="c-link" href="https://foothill.edu/torch" target="_blank">Pass The Torch</a> programs
      with annual Certificates of Gratitude for two consecutive years`,
      'Front desk assistant at the <a class="c-link" href="https://foothill.edu/international/" target="_blank">International Student Programs</a> office',
      'Mentor for international freshmen in the Global Liaison program',
      `Receiver of the Achievement Award for high performance by doctor Gail Katsir and the department of
      <a class="c-link" href="https://foothill.edu/psme" target="_blank">Physical Sciences, Mathematics & Engineering</a>`,
      '----------',
      `A naive decision to grab a backpack and go study aboard that would led to countless mistakes
      which could be avoided by a more thought-out plan. For the first time the importance of
      planning & research is learned.`,
    ],
    timemark: '2016',
  },
  {
    id: 0,
    slug: 'hcmus-biotech',
    time: 'August, 2015',
    location: 'Ho Chi Minh, Vietnam',
    headline:
      '<a class="c-link" href="https://www.hcmus.edu.vn/">Ho Chi Minh University of Science</a>',
    title:
      '<a class="c-link" href="http://www.fbb.hcmus.edu.vn/ target="_blank">Biological Technology</a> major',
    paragraphs: [
      '----------',
      'Moving to the biggest city of Vietnam for the first time was a terrifyingly wonderful experience.',
      'No parents, full dorm life, new friends and "sketchy" people all around, living off instant noodles and scavenging free food at the end of each month when money ran low. What else could one ask for?',
    ],
    timemark: '2015',
  },
];
