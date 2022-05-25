import socials from '$lib/data/socials.json';

export interface Milestone {
  id: number;
  slug: string;
  time: string;
  location: string;
  headline: string;
  title: string;
  paragraphs: string[];
  images: Array<{ id: string; src: string; alt: string; width: number }>;
  timemark?: string;
}

export const milestones: Milestone[] = [
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
    images: [],
  },
  {
    id: 9,
    slug: 'professional-scrum-master-1',
    time: '30th of April, 2022',
    location: 'Ho Chi Minh, Vietnam',
    headline: `<a href="https://www.credly.com/badges/2d1c3bf1-28be-43aa-88c2-5413826174f1/public_url" target="_blank" class="flex items-end">
        <span class="c-link">Professional Scrum Master Certification</span>
        <img src="/images/psm/psm1-logo.webp" alt="Professional Scrum Master 1" width="30" height="30" class="inline-block ml-2" />
      </a>`,
    title: '',
    paragraphs: [
      `This was not meant to facilitate a full-time Scrum Master career, at least not in the near future.
      It was to understand Scrum as a developer, to gain the ability to justify its values and
      practices, and to maximize the contribution to Scrum teams.`,
    ],
    images: [
      {
        id: 'psm1-certificate',
        alt: 'Certificate of Professional Scrum Master 1',
        src: '/images/psm/psm1-certificate.webp',
        width: 100,
      },
    ],
  },
  {
    id: 8,
    slug: 'end-at-designveloper',
    time: 'March, 2022',
    location: 'Ho Chi Minh, Vietnam',
    headline: `
      <a href="${socials.github.href}" target="_blank">
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
    images: [],
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
    images: [
      {
        id: 'ordolink-lagi',
        alt: 'The OrdoLink Bicycle - Lagi',
        src: '/images/ordolink/lagi.webp',
        width: 60,
      },
      {
        id: 'ordolink-nhathoducba',
        alt: 'The OrdoLink Bicycle - Duc Ba Church',
        src: '/images/ordolink/nhathoducba.webp',
        width: 100,
      },
      {
        id: 'ordolink-rungcaosu',
        alt: 'The OrdoLink Bicycle - Rubber Forest',
        src: '/images/ordolink/rungcaosu.webp',
        width: 100,
      },
    ],
  },
  {
    id: 6,
    slug: 'designveloper',
    time: 'December, 2019',
    location: 'Ho Chi Minh, Vietnam',
    headline: `
    <a href="https://www.designveloper.com/" target="_blank">
      <span class="c-link">Designveloper</span>
      <img
        class="inline-block rounded"
        src="/images/designveloper/logo.webp"
        alt="Designveloper"
        width="13.7"
        height="18.5"
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
    images: [
      {
        id: 'dsv-front-selfie',
        alt: 'Designveloper - Front office selfie',
        src: '/images/designveloper/front-selfie.webp',
        width: 100,
      },
      {
        id: 'dsv-christmas-tree',
        alt: 'Designveloper - Christmas tree',
        src: '/images/designveloper/christmas-tree.webp',
        width: 60,
      },
      {
        id: 'dsv-desk',
        alt: 'Designveloper - Desk',
        src: '/images/designveloper/desk.webp',
        width: 60,
      },
    ],
  },
  {
    id: 5,
    slug: 'nodexus',
    time: 'July, 2019',
    location: 'Hayward, California, USA',
    headline: '<a class="c-link" href="http://www.nodexus.com/" target="_blank">Nodexus Inc.</a>',
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
    images: [
      {
        id: 'nodexux-door',
        alt: 'Nodexus - Front door',
        src: '/images/nodexus/door.webp',
        width: 60,
      },
      {
        id: 'nodexux-desk',
        alt: 'Nodexus - Desk',
        src: '/images/nodexus/desk.webp',
        width: 100,
      },
      {
        id: 'nodexux-printer',
        alt: 'Nodexus - Printer',
        src: '/images/nodexus/printer.webp',
        width: 100,
      },
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
    images: [],
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
    timemark: '2019',
    images: [
      {
        id: 'foothill-graduation-photo',
        alt: 'Foothill - Graduation',
        src: '/images/foothill/graduation.webp',
        width: 100,
      },
    ],
  },
  {
    id: 2,
    slug: 'sjsu-simocko',
    time: 'July, 2018',
    location: 'San Jose, California, USA',
    headline:
      '<a class="c-link" href="http://www.sjsu.edu/" target="_blank">San Jose State University</a>',
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
    images: [
      {
        id: 'sjsu-experiment',
        alt: 'SJSU - Experiment',
        src: '/images/sjsu/experiment.webp',
        width: 60,
      },
      {
        id: 'sjsu-selfie',
        alt: 'SJSU - Selfie',
        src: '/images/sjsu/selfie.webp',
        width: 60,
      },
    ],
  },
  {
    id: 1,
    slug: 'foothill',
    time: 'April, 2016',
    location: 'Los Altos, California, USA',
    headline: `
    <a href="https://foothill.edu/" target="_blank">
      <span class="c-link">Foothill College</span>
      <img
        class="inline-block rounded"
        src="/images/foothill/logo.webp"
        alt="Foothill College"
        width="30"
        height="30"
      />
    </a>`,
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
    images: [
      {
        id: 'foothill-pizza',
        alt: 'Foothill - Free Pizza',
        src: '/images/foothill/pizza.webp',
        width: 100,
      },
      {
        id: 'foothill-bamboo',
        alt: 'Foothill - Bamboo Forest',
        src: '/images/foothill/bamboo.webp',
        width: 60,
      },
      {
        id: 'foothill-locker',
        alt: 'Foothill - Locker',
        src: '/images/foothill/locker.webp',
        width: 100,
      },
      {
        id: 'foothill-phonebooth',
        alt: 'Foothill - Phone Booth',
        src: '/images/foothill/phonebooth.webp',
        width: 100,
      },
      {
        id: 'foothill-architect',
        alt: 'Foothill - Science Architecture',
        src: '/images/foothill/architect.webp',
        width: 100,
      },
    ],
  },
  {
    id: 0,
    slug: 'hcmus-biotech',
    time: 'August, 2015',
    location: 'Ho Chi Minh, Vietnam',
    headline: `
    <a href="https://www.hcmus.edu.vn/" target="_blank">
      <span class="c-link">Ho Chi Minh University of Science</span>
      <img
        class="inline-block rounded"
        src="/images/hcmus/logo.webp"
        alt="Ho Chi Minh University of Science"
        width="30"
        height="30"
      />
    </a>`,
    title:
      '<a class="c-link" href="http://www.fbb.hcmus.edu.vn/" target="_blank">Biological Technology</a> major',
    paragraphs: [
      '----------',
      'Moving to the biggest city of Vietnam for the first time was a terrifyingly wonderful experience.',
      'No parents, full dorm life, new friends and "sketchy" people all around, living off instant noodles and scavenging free food at the end of each month when money ran low. What else could one ask for?',
    ],
    timemark: '2015',
    images: [
      {
        id: 'hcmus-walkway',
        alt: 'HCMUS - Walkway',
        src: '/images/hcmus/walkway.webp',
        width: 100,
      },
      {
        id: 'hcmus-room',
        alt: 'HCMUS - Dorm Room',
        src: '/images/hcmus/room.webp',
        width: 100,
      },
      {
        id: 'hcmus-sunset',
        alt: 'HCMUS - Sunset',
        src: '/images/hcmus/sunset.webp',
        width: 100,
      },
      {
        id: 'hcmus-phonebooth',
        alt: 'HCMUS - Phonebooth',
        src: '/images/hcmus/phonebooth.webp',
        width: 100,
      },
      {
        id: 'hcmus-hallway',
        alt: 'HCMUS - hallway',
        src: '/images/hcmus/hallway.webp',
        width: 100,
      },
    ],
  },
];
