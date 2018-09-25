import Express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import methodOverride from 'method-override';


import Post from './entities/post';

export default () => {
  const app = new Express();
  app.use(morgan('combined'));
  app.set('view engine', 'pug');
  //app.use('/assets', Express.static(process.env.NODE_PATH.split(':')[0]));
  app.use(methodOverride('_method'));
  app.use(bodyParser.urlencoded({ extended: false }));

  let posts = [
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
  app.get('/posts/new', (req, res) => {
    res.render('posts/new', { form: {}, errors: {} });
  });
  app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id.toString() === req.params.id);
    res.render('posts/show', { post });
  });
  app.post('/posts', (req, res) => {
    const { title, body } = req.body;
    const errors = {};
    if (!title) {
      errors.title = "Can't be blank";
    }
    if (!body) {
      errors.body = "Can't be blank";
    }
    if (Object.keys(errors).length === 0) {
      const post = new Post(title, body);
      posts.push(post);
      res.redirect(`/posts/${post.id}/edit`);
      return;
    }
    res.status(422);
    res.render('posts/new', { form: req.body, errors });
  });
  // -------
  app.get('/posts/:id/edit', (req, res) => {
    const post = posts.find(p => p.id.toString() === req.params.id);
    res.render('posts/edit', { post, form: post, errors: {} });
  });

  app.patch('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id.toString() === req.params.id);
    const { title, body } = req.body;

    const errors = {};
    if (!title) {
      errors.title = "Can't be blank";
    }

    if (!body) {
      errors.body = "Can't be blank";
    }

    if (Object.keys(errors).length === 0) {
      post.title = title;
      post.body = body;
      res.redirect(`/posts/${post.id}/edit`);
      return;
    }

    res.status(422);
    res.render('posts/edit', { post, form: req.body, errors });
  });
  app.delete('/posts/:id', (req, res) => {
    posts = posts.filter(post => post.id.toString() !== req.params.id);
    res.redirect('/posts');
  });
  return app;
};
