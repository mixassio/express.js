
export default class Post {
  static id = 0;
  constructor(title, body) {
    this.title = title;
    this.body = body;
    Post.id += 1;
  }
}
