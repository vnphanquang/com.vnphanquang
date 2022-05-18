<script lang="ts">
  import { intersect } from '@svelte-put/intersect';

  const milestones = [
    {
      id: 7,
      time: '30th of April, 2022',
      location: 'Ho Chi Minh, Vietnam',
      headline: '<a class="c-link" href="https://www.credly.com/badges/2d1c3bf1-28be-43aa-88c2-5413826174f1/public_url" target="_blank">Professional Scrum Master Certification</a>',
      title: '',
      paragraphs: [
        `This is not meant to facilitate a full-time Scrum Master career, at least not in the near future.
        It is to understand Scrum as a developer, to gain the ability to understand its values and
        pratices, and to maximize the contribution to Scrum team.`,
      ],
    },
    {
      id: 6,
      time: 'March, 2022',
      location: 'Ho Chi Minh, Vietnam',
      headline: 'Open source developer',
      title: '',
      paragraphs: [
        `<a href="https://github.com/vnphanquang">
          <img src="/images/socials/github.svg" alt="github" width="30" />
        </a>`,
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
        `Time was spent to research the Scrum framework and
        to catch up with interesting technologies such as
        <a class="c-link" href="https://turborepo.org/" target="_blank">Turborepo</a>,
        <a class="c-link" href="https://svelte.dev/" target="_blank">Svelte</a>,
        <a class="c-link" href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>,
        <a class="c-link" href="https://threejs.org/" target="_blank">Three.JS</a>, ...`,
      ],
      timemark: '2022',
    },
    {
      id: 5,
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
        `It was name the "OrdoLink".`,
      ],
    },
    {
      id: 4,
      time: 'December, 2019',
      location: 'Ho Chi Minh, Vietnam',
      headline: `
      <a class="flex items-end" href="https://www.designveloper.com/">
        <span class="c-link">Designveloper</span>
        <img
          class="inline-block rounded ml-2"
          src="/images/designveloper.webp"
          alt="Designveloper"
          width="30"
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
        `It was sad saying goodbye to those lovely people. But time was on its way.
        The path out of the comfort zone into new territories now opened
        with a new chapter full of the unknown.`,
      ],
      // timemark: '2019',
    },
    {
      id: 3,
      time: 'July, 2019',
      location: 'Hayward, California, USA',
      headline: '<a class="c-link" href="http://www.nodexus.com/">Nodexus Inc.</a>',
      title: 'Software R&D intern - Nodexus circuit printer system',
      paragraphs: [
        `Developer for the well-documented core implementation of Nodexus printer control operations, responsible for
        motor synchronization at thousand-Hz & micron precision, a dedicated minimal UI.`,
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
      timemark: '2019',
    },
    {
      id: 2,
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
        But you do look cool in lab coats so it's all worth it really!`
      ],
      timemark: '2018',
    },
    {
      id: 1,
      time: 'April, 2016',
      location: 'Los Altos, California, USA',
      headline: '<a class="c-link" href="https://foothill.edu/">Foothill College</a>',
      title:
        'High Honors Associate in Science degrees in Computer Science, Mathematics, and Chemistry',
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
        `A naive decision to grab a backpack and go study aboard led to countless mistakes
        that could be avoided by a more thought-out plan. For the first time the importance of
        planning & research is learned & imprinted.`,
      ],
      timemark: '2016',
    },
    {
      id: 0,
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

  const milestonesIntersectedMap: Record<number, boolean> = milestones.reduce((acc, curr) => {
    acc[curr.id] = false;
    return acc;
  }, {} as Record<number, boolean>);
  const intersectedMap = {
    header: false,
    timelineHeading: false,
    next: false,
    previous: false,
    signature: false,
  };

  function onIntersect(id: number): void {
    milestonesIntersectedMap[id] = true;
  }
</script>

<main class="grid flex-1 place-items-center gap-y-14 py-10">
  <section
    class="
        grid place-items-center gap-y-6
        {intersectedMap.header ? 'animate-fade-in-up' : 'opacity-0'}
      "
      use:intersect={{ threshold: 0.3, enabled: !intersectedMap.header }}
      on:intersectonce={() => intersectedMap.header = true}
    >
    <h1 class="text-center font-quang text-5xl font-bold">
      Quang Phan
    </h1>
    <h2 class="text-center font-quang text-2xl italic">
      Learner, Developer, Jack of Zero Trade
    </h2>
    <img
      src="/images/sketch_portrait.svg"
      alt="portrait" width="100"
      class="bg-bg"
    />
    <button
      id="resume-download"
      type="button"
      class="c-btn py-1 px-2 text-sm uppercase"
    >
      <a href="/QuangPhan_Resume.pdf" target="_blank" >
        Download PDF resume
      </a>
    </button>
  </section>
  <p class="text-primary">~ • ~</p>
  <section class="w-full max-w-6xl px-4 md:px-10 xl:px-0">
    <h2
      class="
        font-quang text-center text-3xl font-bold
        {intersectedMap.timelineHeading ? 'animate-fade-in-up' : 'opacity-0'}
      "
      use:intersect={{ threshold: 0.3, enabled: !intersectedMap.timelineHeading }}
      on:intersectonce={() => intersectedMap.timelineHeading = true}
    >
      A Truncated Timeline
    </h2>
    <ul class="flex flex-col items-center mt-6">
      <li
        class="
          mb-4 text-sm italic self-start md:self-auto
          {intersectedMap.next ? 'animate-fade-in-up' : 'opacity-0'}
        "
        use:intersect={{ threshold: 0.3, enabled: !intersectedMap.next }}
        on:intersectonce={() => intersectedMap.next = true}
      >
        next journey awaits ...
      </li>
      {#each milestones as milestone, index (milestone.id)}
        <li
          class="
            mt-1 grid grid-cols-[45px,1fr] md:grid-cols-[1fr,auto,1fr] justify-center gap-x-4 md:gap-x-8
            {milestonesIntersectedMap[milestone.id] ? 'animate-fade-in-up' : 'opacity-0'}
          "
          use:intersect={{ threshold: 0.2, enabled: !milestonesIntersectedMap[milestone.id] }}
          on:intersectonce={() => onIntersect(milestone.id)}
        >
          <div
            class="hidden md:block
            mt-1 text-sm text-[#7c6f64]
            {index % 2 === 1
              ? 'md:col-start-3 md:row-start-1 md:justify-self-start md:text-left'
              : 'md:justify-self-end md:text-right'}
          "
          >
            <p class="font-semibold">{milestone.time}</p>
            <p class="mt-4 italic">{milestone.location}</p>
          </div>
          <div class="md:col-start-2 mt-1 flex flex-col items-center">
            <div class="h-4 w-4 rounded-full border-2 border-primary bg-primary" />
            <div class="mt-2 w-[3px] flex-1 rounded-t bg-border" />
          </div>
          <div
            class="
            grid grid-cols-1 gap-y-4
            {milestone.timemark ? 'pb-4' : 'pb-10'}
            {index % 2 === 1 ? 'md:col-start-1 md:row-start-1 md:text-right md:justify-items-end' : 'md:text-left md:justify-items-start'}
          "
          >
            <p class="text-sm">
              {milestone.time} - <span class="mt-4 italic">{milestone.location}</span>
            </p>
            {#if milestone.headline}
              <h3 class="text-lg font-semibold">
                {@html milestone.headline}
              </h3>
            {/if}
            {#if milestone.title}
              <h4 class="text-sm italic">
                {@html milestone.title}
              </h4>
            {/if}
            {#each milestone.paragraphs as paragraph}
              <p class="text-sm">
                {@html paragraph}
              </p>
            {/each}
          </div>
          {#if milestone.timemark}
            <div class="relative md:col-[1/4] md:row-start-2 pt-8 pb-20">
              <div class="absolute top-0 left-1/2 h-[3px] w-4 -translate-x-1/2 rounded bg-border" />
              <div
                class="absolute bottom-12 left-1/2 h-[3px] w-4 -translate-x-1/2 rounded bg-border"
              />
              <div
                class="absolute bottom-0 left-1/2 h-12 w-[3px] -translate-x-1/2 rounded-b bg-border"
              />
              <p class="text-center md:text-2xl font-semibold">{milestone.timemark}</p>
            </div>
          {/if}
        </li>
      {/each}
      <li
        class="
          mt-2 text-sm italic self-start md:self-auto
          {intersectedMap.previous ? 'animate-fade-in-up' : 'opacity-0'}
        "
        use:intersect={{ threshold: 0.3, enabled: !intersectedMap.previous }}
        on:intersectonce={() => intersectedMap.previous = true}
      >
        ... previous adventures echoed
      </li>
    </ul>
  </section>
  <img
    src="/images/signature.svg"
    alt="signature"
    width="200"
    class="{intersectedMap.signature ? 'animate-fade-in-up' : 'opacity-0'}"
    use:intersect={{ threshold: 0.3, enabled: !intersectedMap.signature }}
    on:intersectonce={() => intersectedMap.signature = true}
  />
</main>
