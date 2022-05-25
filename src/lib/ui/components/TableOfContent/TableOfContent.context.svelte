<script lang="ts">
  import { TableOfContentContext } from './TableOfContent.context';
  import { createTableOfContentStore } from './TableOfContent.store';

  TableOfContentContext.set(createTableOfContentStore());
</script>

<slot />
