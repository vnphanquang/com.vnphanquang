<script lang="ts">
  import naq from '$lib/data/naq.json';
  import testimonials from '$lib/data/testimonials.json';
  import { Naq } from '$lib/ui/components';
</script>

<title>Home | vnphanquang</title>

<h1>certified crappy website by nobody</h1>

<section id="testimonials">
  <h2>Testimonials</h2>
  {#each testimonials as { quote, author, title }}
    <div>
      <blockquote>
        "{quote}"
        <footer>
          <cite>{author} - {title}</cite>
        </footer>
      </blockquote>
    </div>
  {/each}
</section>

<Naq data={naq} />
