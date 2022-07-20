export class NotFoundBlog extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NotFoundBlog';
  }
}
