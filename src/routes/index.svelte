<script lang="ts">
  import naq from '$lib/data/naq.json';
  import testimonials from '$lib/data/testimonials.json';
</script>

<navbar id="navbar" />

<h1>
  certified crappy website
  <!-- make this typewritter animation -->
  by nobody
</h1>

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

<section id="naq">
  <div class="text-center">
    <h2 class="text-bold mt-20 text-2xl">Never Asked Questions</h2>
    <p class="mt-2 italic">You might even find some answers</p>
  </div>

  {#each naq as { question, answer }}
    <div>
      <h3>{question}</h3>
      <p>{answer}</p>
    </div>
  {/each}
</section>

<footer id="footer">
  <p>Made with calories 🦠</p>
  <p>
    Quang Phan - {new Date().getFullYear()}
  </p>
</footer>
