import Express from 'express';
import bodyParser from 'body-parser';

import Post from './entities/post';

export default () => {
  const app = new Express();
  app.set('view engine', 'pug');
  app.use(bodyParser.urlencoded({ extended: false }));

  const posts = [
    new Post('hello', 'how are your?'),
    new Post('nodejs', 'story about nodejs'),
    new Post('buy', 'get away'),
  ];

  app.get('/', (req, res) => {
    res.render('index');
  });
  app.get('/posts', (req, res) => {
    res.render('./posts/index', { posts });
  });
  app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = posts[id];
    res.render('./posts/show', { ...post });
  });

  app.get('/posts/new', (req, res) => {
    res.render('posts/new', { form: {}, errors: {} });
  });

  app.post('/posts', (req, res) => {
    const { title, body } = req.query;
    const post = new Post(title, body);
    posts.push(post);
    res.redirect(302, `/posts/${post.id}`);
  });

  return app;
};
