<script lang="ts" context="module">
  import { toc } from '@svelte-put/toc';
  import type { TocEventDetails, TocEventItemDetails } from '@svelte-put/toc';
  import { Highlight } from 'svelte-highlight';
  import typescript from 'svelte-highlight/languages/typescript';
  import gruvbox from 'svelte-highlight/styles/gruvbox-dark-soft';

  import { TableOfContent } from '$lib/components';
  import { BLOG_METADATA, BLOG_ID_DICTIONARY } from '$lib/data/blogs';
  import { NotFoundBlog } from '$lib/errors';
  import type { PostForPageQuery } from '$lib/services/api/graphql/queries/Post.gq';
  import { getPostForPage } from '$lib/services/api/graphql/queries/Post.gq';
  import { Locale, locale } from '$lib/services/i18n';
  import { blogDate } from '$lib/utils/datetime';

  import type { Load } from '.svelte-kit/types/src/routes/[locale=locale]/blog/__types/typescript-utility-type-flatten-record';

  export const load: Load = async ({ url, fetch }) => {
    const slug = url.pathname.substring(url.pathname.lastIndexOf('/') + 1);
    const { postBySlug } = await getPostForPage({
      fetch: fetch as any,
      variables: { slug },
    });
    if (!postBySlug) {
      return {
        status: 404,
        error: new NotFoundBlog(`Not found: ${url.pathname}`),
      };
    }
    return {
      props: {
        post: postBySlug,
      },
      stuff: {
        meta: {
          title: 'Flatten Record | Blog | vnphanquang',
          description: postBySlug.locale?.summary,
          og: {
            type: 'article',
            title: postBySlug.locale?.title,
            image: BLOG_METADATA[BLOG_ID_DICTIONARY.typescriptUtilityTypeFlattenRecord].screenshot,
          },
          article: {
            author: 'Quang Phan',
            section: postBySlug.category,
            tags: [postBySlug.category, ...postBySlug.tags],
            publishedTime: postBySlug.locale?.publishedAt,
            modifiedTime: postBySlug.locale?.updatedAt,
          },
        },
      },
    };
  };
</script>

<script lang="ts">
  export let post: NonNullable<PostForPageQuery['postBySlug']>;

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

  const date = blogDate(post.locale?.updatedAt, $locale as Locale);

  let tocItems: TocEventItemDetails[] = [];
  function onToc(e: CustomEvent<TocEventDetails>) {
    tocItems = e.detail.items;
  }
</script>

<svelte:head>
  {@html gruvbox}
</svelte:head>

<main
  class="prose relative mx-auto w-full max-w-6xl py-20 px-6 sm:px-10 md:px-20"
  use:toc={{ indicator: false, stimulateHashNavigation: true }} on:toc={onToc}
>
  <section class="text-center">
    <h1>{post.locale?.title}</h1>
    <p class="flex justify-center gap-x-2">
      {#each post.tags as tag}
        <span class="c-tag">{tag}</span>
      {/each}
    </p>
    <p>{date}</p>
  </section>

  <h2>Table of Contents</h2>
  <TableOfContent float={false} items={tocItems} />
  <TableOfContent items={tocItems} />

  <h2>Note</h2>
  <p>
    In this article, I'm using the term "record" and "object" interchangeably. I refer to object as
    "record" for better alignment with the
    <a href={RESOURCES.utilityTypesRecord.href} target="_blank">builtin Record utility type</a>.
  </p>

  <h2>TLDR;</h2>
  <p>
    See below if you already understand the assignment and just want to grab the code (or you want
    to see everything in one place).
  </p>
  <p>Refer to the table of contents to quickly skip to your points of interest.</p>
  <Highlight language={typescript} code={CODES.tldr} />

  <h2>Acknowledgement</h2>
  <p>
    This article is built upon many techniques borrowed from
    <a href={RESOURCES.florisBernard.href} target="_blank">Floris Bernard's article</a>. His
    <em>finite recursion</em> method is very practical and might be the only solution to some other real
    world problems. I recommend checking it out if you can.
  </p>

  <h2>Laying out the Problem</h2>
  <p>
    For this website, I want to experiment creating a command palette like one you would see in
    VSCode. In fact, hit 'Ctrl+K' right now and you should be able to see it pop up (press 'Escape'
    to close).
  </p>
  <p>I need an ID for each supported command, and end up with a dictionary for all these ids.</p>
  <details open class="mt-4">
    <summary class="cursor-pointer"><code>COMMAND_LOOKUP</code></summary>
    <Highlight language={typescript} code={CODES.commandLookup} />
  </details>
  <p>So instead of using literals</p>
  <Highlight language={typescript} code={CODES.executeLiteral} />
  <p>I could now do</p>
  <Highlight language={typescript} code={CODES.executeReference} />
  <p>
    You might notice the use of <code>as const</code> in the dictionary declaration. This is called
    "const assertions" and was
    <a class="c-link" href={RESOURCES.asConstRelease.href} target="_blank"
      >introduced in TypeScript 3.4</a
    >. It helps hint immutability and is especially helpful with object mapping. Try leaving it in
    and out and see the change to the inferred type of your constant (just hover your mouse over if
    using VSCode). You can also see
    <a class="c-link" href={RESOURCES.asConstMatt.href} target="_blank"
      >Matt Pocock's short video explanation</a
    >.
  </p>
  <p>
    Now, being pedantic as I often am, I want to "strongly" type the <code>id</code> of my
    <code>Command</code> interface.
  </p>
  <Highlight language={typescript} code={CODES.commandInterface} />
  <p>
    Of course it's not practical to edit this manually whenever there's change in <code
      >COMMAND_LOOKUP</code
    >. What we all ideally want is a concise <code>CommandIdType</code>
    that automatically covers all leaf nodes of the <code>COMMAND_LOOKUP</code> dictionary.
  </p>
  <Highlight language={typescript} code={CODES.commandTypeId} />
  <p>And from that emerges our problem. What is <code>AllLeafNodeValues</code>?</p>

  <h2>Proposing a Target Solution</h2>
  <p>We will need two steps:</p>
  <ol>
    <li>
      Flatten the nested record <code>COMMAND_LOOKUP</code>, this includes:
      <ol class="list-[lower-alpha]">
        <li>Extract all <strong>non-object </strong> properties of the record,</li>
        <li>
          Extract all <strong>object</strong> properties and recursively repeat (a) & (b) until we read
          the last leaf node,
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
  <Highlight language={typescript} code={CODES.valuesOf} />
  <p>
    But the first require a recursive type that is more complicated. Let break it down one step at a
    time.
  </p>

  <h2>Walking through the Implementation</h2>
  <p>
    Let's introduce an example interface with better coverage than <code>COMMAND_LOOKUP</code>. We
    will work out way through each step with this.
  </p>
  <Highlight language={typescript} code={CODES.exampleInterface} />

  <h3>Checking for Object</h3>
  <p>
    The first thing we need to look out for is the fact that arrays in Javascript are objects too.
  </p>
  <Highlight language={typescript} code={`typeof [] === 'object' // => true`} />
  <p>
    Therefore, we need to exclude arrays when checking whether a property is indeed an object by our
    definition.
  </p>
  <Highlight language={typescript} code={CODES.isObject} />
  <p>
    If you are not familiar with the phrase <code>T extends ... ? ... : ...</code>, it is called
    "conditional types" and was
    <a href={RESOURCES.conditionalTypes.href} target="_blank">introduced in Typescript 2.8</a>. We
    will utilize this concept extensively throughout the rest of the journey here.
  </p>

  <h3>Extracting Non-Object Properties</h3>
  <p>
    First we iterate through the keys of the record and remove any object properties and focus on
    non-object ones for now.
  </p>
  <Highlight language={typescript} code={CODES.nonObjectKeysOf} />
  <p>
    There are two parts to this. First, we map the original record into another where each property'
    value is either its associated key if it is a non-object or
    <code>never</code> otherwise.
  </p>
  <Highlight language={typescript} code={CODES.nonObjectKeysOfIntermediate} />
  <p>
    The rest is just <code>Intermediate[keyof T]</code>, which is
    <code>'array' | never | 'nonObject'</code>. And since <code>never</code> is inclusive in any
    union, that eventually just means <code>'array' | 'nonObject'</code>.
  </p>
  <Highlight language={typescript} code={CODES.nonObjectKeys} />
  <p>
    Now we can use the builtin
    <a href={RESOURCES.utilityTypesPick.href} target="_blank">utility type <code>Pick</code></a>
    to scoop out all the non-object properties.
  </p>
  <Highlight language={typescript} code={CODES.nonObjectPropertiesOf} />
  <p>Phew..., with that, here's where we are at:</p>
  <Highlight language={typescript} code={CODES.nonObjectProperties} />

  <h3>Recursively Handling Object Properties</h3>
  <p>
    Reusing our <code>NonObjectKeysOf</code> type, we can utilize another
    <a href={RESOURCES.utilityTypesOmit.href}>builtin utility type <code>Omit</code></a>
    to extract a union of the non-object properties' values.
  </p>
  <Highlight language={typescript} code={CODES.objectValuesOf} />
  <p>
    Apply that to our <code>Example</code> interface:
  </p>
  <Highlight language={typescript} code={CODES.unionOfObjectValues} />
  <p>
    Note that information about the keys <code>object1</code> and <code>object2</code>
    is lost from this point. But we are flattening the record so we don't care about the keys.
  </p>

  <h4>Transforming Union to Intersection</h4>
  <p>
    We can't really do much with the <code>UnionOfObjectValues</code> we've just got. We'd prefer
    merging them into a single interface, aka an <strong>intersection</strong>, to be able continue
    our recursive algorithm.
  </p>
  <Highlight language={typescript} code={CODES.unionToIntersection} />
  <p>
    Now this is some mind-bending typescript magic that requires much explaining, but I won't add
    another explanation here because it might confuse you even further.
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
  <Highlight language={typescript} code={CODES.objectValues} />

  <h4>Checking for Flat Object</h4>
  <p>
    We have everything ready except the terminal case, aka when do we stop the recursive algorithm
    (or else it will run indefinitely)?
  </p>
  <p>
    For that, we need a <code>IsFlatObject</code> check.
  </p>
  <Highlight language={typescript} code={CODES.isFlatObject} />
  <p>
    This looks much but is actually quite simple. It's just an extension on <code>IsObject</code>.
    Here's an example.
  </p>
  <Highlight language={typescript} code={CODES.isFlatObjectBreakdown} />

  <h3>Putting Things Together</h3>
  <Highlight language={typescript} code={CODES.flattenRecord} />
  <p>
    There's not much left to explain, we're just putting together what we've already covered in
    previous sections. Let's put it to use:
  </p>
  <Highlight language={typescript} code={CODES.flattenExample} />
  <p>Finally, we can come back and resolve the original problem.</p>
  <Highlight language={typescript} code={CODES.commandIdDictionary} />

  <h2>Limitation</h2>
  <p>
    There is no deep merging strategy involved, meaning if two nested properties contain one same
    key with different values, <code>FlattenRecord</code> will result in
    <code>never</code>.
  </p>
  <Highlight language={typescript} code={CODES.limitationExample} />
  <p>
    This makes sense since you cannot have an record that satisfies <code>key</code> of type
    <code>'value1' & 'value2'</code>. Perhaps this can be improved further.
  </p>

  <h2>Reference</h2>
  <p>Listed in plain text below are all the resources linked from this post.</p>
  <ul class="">
    {#each Object.values(RESOURCES) as { name, href }}
      <li class="mt-8 break-words">
        {name}: <a {href} target="_blank">{href}</a>
      </li>
    {/each}
  </ul>
</main>
