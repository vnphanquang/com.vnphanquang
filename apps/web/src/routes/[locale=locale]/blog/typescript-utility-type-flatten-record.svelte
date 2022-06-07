<script lang="ts">
  import { Highlight } from 'svelte-highlight';
  import typescript from 'svelte-highlight/languages/typescript';
  import gruvbox from 'svelte-highlight/styles/gruvbox-dark-soft';

  import { AppConfig } from '$config';
  import { BLOG_METADATA, BLOG_ID_DICTIONARY } from '$lib/data/blogs';
  import { Heading, TableOfContent } from '$lib/components';
  import { blogDate } from '$lib/utils/datetime';

  const METADATA = BLOG_METADATA[BLOG_ID_DICTIONARY.typescriptUtilityTypeFlattenRecord];

  const RESOURCES = {
    florisBernard: {
      name: "Floris Bernard 's Finite Recursion Method",
      href: 'https://flut1.medium.com/deep-flatten-typescript-types-with-finite-recursion-cb79233d93ca',
    },
    asConstRelease: {
      name: 'Const assertions release note',
      href: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions',
    },
    asConstMatt: {
      name: "Matt Pocock's tip on const assertions",
      href: 'https://twitter.com/mpocock1/status/1526162474084737024',
    },
    conditionalTypes: {
      name: 'Conditional types release note',
      href: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#conditional-types',
    },
    distributiveConditionalTypes: {
      name: 'Distributive conditional types',
      href: 'https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types',
    },
    unionToIntersectionStackoverflow: {
      name: 'Transform Union to Intersection',
      href: 'https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286',
    },
    utilityTypesRecord: {
      name: 'Utility Type - Record',
      href: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type',
    },
    utilityTypesPick: {
      name: 'Utility Type - Pick',
      href: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys',
    },
    utilityTypesOmit: {
      name: 'Utility Type - Omit',
      href: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys',
    },
  } as const;

  const HEADING = {
    title: {
      id: 'utility-type-flatten-record',
      level: 1,
      class: 'font-quang',
      text: METADATA.title,
    },
    toc: {
      id: 'table-of-contents',
      level: 2,
      text: 'Table of Contents',
    },
    note: {
      id: 'note',
      level: 2,
      text: 'Note',
    },
    tldr: {
      id: 'tldr',
      level: 2,
      text: 'TLDR;',
    },
    acknowledgement: {
      id: 'acknowledgement',
      level: 2,
      text: 'Acknowledgement',
    },
    layingOutTheProblem: {
      id: 'laying-out-the-problem',
      level: 2,
      text: 'Laying out the Problem',
    },
    proposingSolution: {
      id: 'proposing-a-target-solution',
      level: 2,
      text: 'Proposing a Target Solution',
    },
    implementation: {
      id: 'implementation',
      level: 2,
      text: 'Walking through the Implementation',
    },
    checkingForObject: {
      id: 'checking-for-object',
      level: 3,
      text: 'Checking for Object',
    },
    extractingNonObjects: {
      id: 'extracting-non-object-properties',
      level: 3,
      text: 'Extracting Non-Object Properties',
    },
    recursion: {
      id: 'recursion',
      level: 3,
      text: 'Recursively Handling Object Properties',
    },
    unionToIntersection: {
      id: 'union-to-intersection',
      level: 4,
      text: 'Transforming Union to Intersection',
    },
    flatObject: {
      id: 'checking-for-flat-object',
      level: 4,
      text: 'Checking for Flat Object',
    },
    puttingThingsTogether: {
      id: 'putting-things-together',
      level: 3,
      text: 'Putting Things Together',
    },
    limitation: {
      id: 'limitation',
      level: 2,
      text: 'Limitation',
    },
    reference: {
      id: 'reference',
      level: 2,
      text: 'Reference',
    },
  } as const;

  const CODES = {
    tldr: `type ValuesOf<T> = T[keyof T];

// check for object (exclude arrays)
type IsObject<T> = T extends Array<any> ? false : T extends object ? true : false;

// check for flat object
type ObjectPropertiesFlatMapping<T> = {
  [K in keyof T]: IsObject<T[K]> extends true ? 'Object' : 'NonObject';
};
type IsFlatObject<T> = ValuesOf<ObjectPropertiesFlatMapping<T>> extends 'NonObject'
  ? true
  : false;

// grab non-object non-object properties
type NonObjectKeysOf<T> = ValuesOf<{
  [K in keyof T]: IsObject<T[K]> extends false ? K : never;
}>;
type NonObjectPropertiesOf<T> = Pick<T, NonObjectKeysOf<T>>;

// transform Union into Intersection
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type ObjectValuesOf<T> = ValuesOf<Omit<T, NonObjectKeysOf<T>>>;

export type FlattenRecord<T> = NonObjectPropertiesOf<T> &
  (IsFlatObject<UnionToIntersection<ObjectValuesOf<T>>> extends true
    ? UnionToIntersection<ObjectValuesOf<T>>
    : FlattenRecord<UnionToIntersection<ObjectValuesOf<T>>>);

`,
    commandLookup: `const COMMAND_LOOKUP = {
  run: {
    theme: {
      toggle: 'theme.toggle',
    },
  },
  open: {
    internal: {
      home: 'open.internal.home',
      blog: 'open.internal.blog',
      resume: 'open.internal.resume',
      // ...
    },
    external: {
      github: 'open.external.github',
      twitter: 'open.external.twitter',
      // ...
    },
  },
} as const;`,
    executeLiteral: `executeCommandWithId('open.internal.home');`,
    executeReference: `executeCommandWithId(COMMAND_LOOKUP.open.internal.home);`,
    commandInterface: `interface Command {
  id:
    | 'theme.toggle'
    | 'open.internal.home'
    | 'open.external.github'
    // ...}`,
    commandTypeId: `type CommandIdType = AllLeafNodeValues<typeof COMMAND_LOOKUP>;`,
    valuesOf: `type ValuesOf<T> = T[keyof T];
// later: type AllLeafNodeValues = ValuesOf<...>`,
    exampleInterface: `interface Example {
  array: ['some', 'elements'];
  object1: {
    nested1: {
      left2: 'leaf2';
    };
    leaf1: 'leaf1';
  };
  object2: {
    nested2: {
      leaf3: 'leaft3';
    };
  };
  nonObject: 'nonObject';
}`,
    isObject: `type IsObject<T> = T extends Array<any> ? false : T extends object ? true : false;`,
    nonObjectKeysOf: `type NonObjectKeysOf<T> = ValuesOf<{
  [K in keyof T]: IsObject<T[K]> extends false ? K : never;
}>;`,
    nonObjectKeysOfIntermediate: `type Intermediate = {
  [K in keyof Example]: IsObject<Example[K]> extends false ? K : never;
};
// => inferred to:
// type Intermediate = {
//     array: 'array';
//     object1: never;
//     object2: never;
//     nonObject: 'nonObject';
// };`,
    nonObjectKeys: `type NonObjectKeys = NonObjectKeysOf<Example>;
// => inferred to:
// type NonObjectKeys = "array" | "nonObject";`,
    nonObjectPropertiesOf: `type NonObjectPropertiesOf<T> = Pick<T, NonObjectKeysOf<T>>;`,
    nonObjectProperties: `type NonObjectProperties = NonObjectPropertiesOf<Example>;
// => inferred to:
// type NonObjectProperties = {
//     array: ['some', 'array'];
//     nonObject: 'nonObject';
// };`,
    objectValuesOf: `type ObjectValuesOf<T> = ValuesOf<Omit<T, NonObjectKeysOf<T>>>;`,
    unionOfObjectValues: `type UnionOfObjectValues = ObjectValuesOf<Example>;
// => inferred type:
// type UnionOfObjectValues = {
//     nested: {
//         left2: 'leaf2';
//     };
//     leaf1: 'leaf1';
// } | {
//     nested: {
//         leaf3: 'leaft3';
//     };
// };`,
    unionToIntersection: `export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;`,
    objectValues: `type ObjectValues = UnionToIntersection<ObjectValuesOf<Example>>;
// inferred type:
// type ObjectValues = {
//     nested: {
//         left2: 'leaf2';
//     };
//     leaf1: 'leaf1';
// } & {
//     nested: {
//         leaf3: 'leaft3';
//     };
// }`,
    isFlatObject: `type ObjectPropertiesFlatMapping<T> = {
  [K in keyof T]: IsObject<T[K]> extends true ? 'Object' : 'NonObject';
};
type IsFlatObject<T> = ValuesOf<ObjectPropertiesFlatMapping<T>> extends 'NonObject'
  ? true
  : false;`,
    isFlatObjectBreakdown: `type NonFlatObject = {
  array: ['some', 'elements'];
  string: 'string';
  nested: {
    string2: 'string2';
  };
};
type Intermediate = ObjectPropertiesFlatMapping<NonFlatObject>;
// => inferred type:
// type Intermediate = {
//     array: "NonObject";
//     string: "NonObject";
//     nested: "Object";
// };

// if all values of Intermediate is of type "NonObject" literal
// then we have a flat object,
// which in this case we don't
type IsFlat = ValuesOf<Intermediate> extends 'NonObject'
  ? true
  : false;
// => inferred to false`,
    flattenRecord: `export type FlattenRecord<T> = NonObjectPropertiesOf<T> &
  (IsFlatObject<UnionToIntersection<ObjectValuesOf<T>>> extends true
    ? UnionToIntersection<ObjectValuesOf<T>>
    : FlattenRecord<UnionToIntersection<ObjectValuesOf<T>>>);`,
    flattenExample: `type FlattenExample = FlattenRecord<Example>;
type PossibleValuesOfFlattenExample = ValuesOf<FlattenExample>;
// inferred type:
// type PossibleValuesOfFlattenExample =
//   | ["some", "elements"]
//   | "leaf2"
//   | "leaf1"
//   | "leaft3"
//   | "nonObject";`,
    commandIdDictionary: `export type CommandIdDictionary = typeof COMMAND_LOOKUP;
type CommandId = ValuesOf<FlattenRecord<CommandIdDictionary>>;
// inferred type:
// type CommandId =
//   | "theme.toggle"
//   | "open.internal.resume"
//   //...; // this is our AllLeafNodeValues`,
    limitationExample: `interface Example {
  object1: {
    key: 'value1';
  };
  object2: {
    key: 'value2';
  };
}
type FlattenExample = FlattenRecord<Example>; // inferred to never`,
  };
</script>

<svelte:head>
  <title>Flatten Record | Blog | vnphanquang</title>
  <meta name="description" content={METADATA.description} />

  <meta property="og:title" content={METADATA.title} />
  <meta property="og:image" content={METADATA.screenshot} />
  <meta property="og:url" content="{AppConfig.urls.web}{METADATA.href}" />
  <meta name="twitter:card" content="summary_large_image" />

  <meta property="og:type" content="article" />
  <meta property="article:author" content="Quang Phan" />
  <meta property="article:tag" content="code" />
  <meta property="article:tag" content="typescript" />
  <meta property="article:published_time" content={METADATA.publishedAt} />
  <meta property="article:modified_time" content={METADATA.publishedAt} />

  {@html gruvbox}
</svelte:head>

<main class="prose relative mx-auto w-full max-w-6xl py-20 px-6 sm:px-10 md:px-20">
  <TableOfContent.Context>
    <section class="text-center">
      <Heading {...HEADING.title} />
      <p class="flex justify-center gap-x-2">
        {#each METADATA.tags as tag}
          <span class="c-tag">{tag}</span>
        {/each}
      </p>
      <p>{blogDate(METADATA.updatedAt)}</p>
    </section>
    <section>
      <Heading {...HEADING.toc} />
      <TableOfContent.Node float={false} />
      <TableOfContent.Node />
    </section>
    <section>
      <Heading {...HEADING.note} />
      <p>
        In this article, I'm using the term "record" and "object" interchangeably. I refer to object
        as "record" for better alignment with the
        <a href={RESOURCES.utilityTypesRecord.href} target="_blank">builtin Record utility type</a>.
      </p>
    </section>
    <section>
      <Heading {...HEADING.tldr} />
      <p>
        See below if you already understand the assignment and just want to grab the code (or you
        want to see everything in one place).
      </p>
      <p>Refer to the table of contents to quickly skip to your points of interest.</p>
      <Highlight class="mt-2" language={typescript} code={CODES.tldr} />
    </section>
    <section>
      <Heading {...HEADING.acknowledgement} />
      <p>
        This article is built upon many techniques borrowed from
        <a href={RESOURCES.florisBernard.href} target="_blank">Floris Bernard's article</a>. His
        <em>finite recursion</em> method is very practical and might be the only solution to some other
        real world problems. I recommend checking it out if you can.
      </p>
    </section>
    <section>
      <Heading {...HEADING.layingOutTheProblem} />
      <p>
        For this website, I want to experiment creating a command palette like one you would see in
        VSCode. In fact, hit 'Ctrl+K' right now and you should be able to see it pop up (press
        'Escape' to close).
      </p>
      <p>
        I need an ID for each supported command, and end up with a dictionary for all these ids.
      </p>
      <details open class="mt-4">
        <summary class="cursor-pointer"><code>COMMAND_LOOKUP</code></summary>
        <Highlight class="mt-2" langtag language={typescript} code={CODES.commandLookup} />
      </details>
      <p>So instead of using literals</p>
      <Highlight class="mt-2" language={typescript} code={CODES.executeLiteral} />
      <p>I could now do</p>
      <Highlight class="mt-2" language={typescript} code={CODES.executeReference} />
      <p>
        You might notice the use of <code>as const</code> in the dictionary declaration. This is
        called "const assertions" and was
        <a class="c-link" href={RESOURCES.asConstRelease.href} target="_blank"
          >introduced in TypeScript 3.4</a
        >. It helps hint immutability and is especially helpful with object mapping. Try leaving it
        in and out and see the change to the inferred type of your constant (just hover your mouse
        over if using VSCode). You can also see
        <a class="c-link" href={RESOURCES.asConstMatt.href} target="_blank"
          >Matt Pocock's short video explanation</a
        >.
      </p>
      <p>
        Now, being pedantic as I often am, I want to "strongly" type the <code>id</code> of my
        <code>Command</code> interface.
      </p>
      <Highlight class="mt-2" language={typescript} code={CODES.commandInterface} />
      <p>
        Of course it's not practical to edit this manually whenever there's change in <code
          >COMMAND_LOOKUP</code
        >. What we all ideally want is a concise <code>CommandIdType</code>
        that automatically covers all leaf nodes of the <code>COMMAND_LOOKUP</code> dictionary.
      </p>
      <Highlight class="mt-2" language={typescript} code={CODES.commandTypeId} />
      <p>And from that emerges our problem. What is <code>AllLeafNodeValues</code>?</p>
    </section>
    <section>
      <Heading {...HEADING.proposingSolution} />
      <p>We will need two steps:</p>
      <ol>
        <li>
          Flatten the nested record <code>COMMAND_LOOKUP</code>, this includes:
          <ol class="list-[lower-alpha]">
            <li>Extract all <strong>non-object </strong> properties of the record,</li>
            <li>
              Extract all <strong>object</strong> properties and recursively repeat (a) & (b) until we
              read the last leaf node,
            </li>
            <li>Merge (a) & (b) together into a final flatten record.</li>
          </ol>
        </li>
        <li>
          Extract all the properties' values of the new flatten record into a union that is our <code
            >AllLeafNodeValues</code
          >.
        </li>
      </ol>
      <p>The second is easy, that's just</p>
      <Highlight class="mt-2" language={typescript} code={CODES.valuesOf} />
    </section>

    <p>
      But the first require a recursive type that is more complicated. Let break it down one step at
      a time.
    </p>
    <section>
      <Heading {...HEADING.implementation} />
      <p>
        Let's introduce an example interface with better coverage than <code>COMMAND_LOOKUP</code>.
        We will work out way through each step with this.
      </p>
      <Highlight class="mt-2" language={typescript} code={CODES.exampleInterface} />
      <section>
        <Heading {...HEADING.checkingForObject} />
        <p>
          The first thing we need to look out for is the fact that arrays in Javascript are objects
          too.
        </p>
        <Highlight class="mt-2" language={typescript} code={`typeof [] === 'object' // => true`} />
        <p>
          Therefore, we need to exclude arrays when checking whether a property is indeed an object
          by our definition.
        </p>
        <Highlight class="mt-2" language={typescript} code={CODES.isObject} />
        <p>
          If you are not familiar with the phrase <code>T extends ... ? ... : ...</code>, it is
          called "conditional types" and was
          <a href={RESOURCES.conditionalTypes.href} target="_blank">introduced in Typescript 2.8</a
          >. We will utilize this concept extensively throughout the rest of the journey here.
        </p>
      </section>
      <section>
        <Heading {...HEADING.extractingNonObjects} />
        <p>
          First we iterate through the keys of the record and remove any object properties and focus
          on non-object ones for now.
        </p>
        <Highlight class="mt-2" language={typescript} code={CODES.nonObjectKeysOf} />
        <p>
          There are two parts to this. First, we map the original record into another where each
          property' value is either its associated key if it is a non-object or
          <code>never</code> otherwise.
        </p>
        <Highlight class="mt-2" language={typescript} code={CODES.nonObjectKeysOfIntermediate} />
        <p>
          The rest is just <code>Intermediate[keyof T]</code>, which is
          <code>'array' | never | 'nonObject'</code>. And since <code>never</code> is inclusive in
          any union, that eventually just means <code>'array' | 'nonObject'</code>.
        </p>
        <Highlight class="mt-2" language={typescript} code={CODES.nonObjectKeys} />
        <p>
          Now we can use the builtin
          <a href={RESOURCES.utilityTypesPick.href} target="_blank"
            >utility type <code>Pick</code></a
          >
          to scoop out all the non-object properties.
        </p>
        <Highlight class="mt-2" language={typescript} code={CODES.nonObjectPropertiesOf} />
        <p>Phew..., with that, here's where we are at:</p>
        <Highlight class="mt-2" language={typescript} code={CODES.nonObjectProperties} />
      </section>
      <section>
        <Heading {...HEADING.recursion} />
        <p>
          Reusing our <code>NonObjectKeysOf</code> type, we can utilize another
          <a href={RESOURCES.utilityTypesOmit.href}>builtin utility type <code>Omit</code></a>
          to extract a union of the non-object properties' values.
        </p>
        <Highlight class="mt-2" language={typescript} code={CODES.objectValuesOf} />
        <p>
          Apply that to our <code>Example</code> interface:
        </p>
        <Highlight class="mt-2" language={typescript} code={CODES.unionOfObjectValues} />
        <p>
          Note that information about the keys <code>object1</code> and <code>object2</code>
          is lost from this point. But we are flattening the record so we don't care about the keys.
        </p>
        <section>
          <Heading {...HEADING.unionToIntersection} />
          <p>
            We can't really do much with the <code>UnionOfObjectValues</code> we've just got. We'd
            prefer merging them into a single interface, aka an <strong>intersection</strong>, to be
            able continue our recursive algorithm.
          </p>
          <Highlight class="mt-2" language={typescript} code={CODES.unionToIntersection} />
          <p>
            Now this is some mind-bending typescript magic that requires much explaining, but I
            won't add another explanation here because it might confuse you even further.
          </p>
          <p>
            You can read <a href={RESOURCES.unionToIntersectionStackoverflow.href} target="_blank"
              >this stackoverflow post</a
            >, where the code comes from. What you need to know is that it employs the concepts of
            <a href={RESOURCES.distributiveConditionalTypes.href} target="_blank"
              >distributive conditional types & type inference</a
            >
            and covariance/contravariance (especially in the context of function argument).
          </p>
          <p>For now, let's move on.</p>
          <Highlight class="mt-2" language={typescript} code={CODES.objectValues} />
        </section>
        <section>
          <Heading {...HEADING.flatObject} />
          <p>
            We have everything ready except the terminal case, aka when do we stop the recursive
            algorithm (or else it will run indefinitely)?
          </p>
          <p>
            For that, we need a <code>IsFlatObject</code> check.
          </p>
          <Highlight class="mt-2" language={typescript} code={CODES.isFlatObject} />
          <p>
            This looks much but is actually quite simple. It's just an extension on <code
              >IsObject</code
            >. Here's an example.
          </p>
          <Highlight class="mt-2" language={typescript} code={CODES.isFlatObjectBreakdown} />
        </section>
      </section>
      <section>
        <Heading {...HEADING.puttingThingsTogether} />
        <Highlight class="mt-2" language={typescript} code={CODES.flattenRecord} />
        <p>
          There's not much left to explain, we're just putting together what we've already covered
          in previous sections. Let's put it to use:
        </p>
        <Highlight class="mt-2" language={typescript} code={CODES.flattenExample} />
        <p>Finally, we can come back and resolve the original problem.</p>
        <Highlight class="mt-2" language={typescript} code={CODES.commandIdDictionary} />
      </section>
    </section>

    <section>
      <Heading {...HEADING.limitation} />
      <p>
        There is no deep merging strategy involved, meaning if two nested properties contain one
        same key with different values, <code>FlattenRecord</code> will result in
        <code>never</code>.
      </p>
      <Highlight class="mt-2" language={typescript} code={CODES.limitationExample} />
      <p>
        This makes sense since you cannot have an record that satisfies <code>key</code> of type
        <code>'value1' & 'value2'</code>. Perhaps this can be improved further.
      </p>
    </section>
    <section>
      <Heading {...HEADING.reference} />
      <p>Listed in plain text below are all the resources linked from this post.</p>
      <ul class="">
        {#each Object.values(RESOURCES) as { name, href }}
          <li class="mt-8 break-words">
            {name}: <a {href} target="_blank">{href}</a>
          </li>
        {/each}
      </ul>
    </section>
  </TableOfContent.Context>
</main>
