#!/usr/bin/env node

import app from '../app';

const port = 8080;
app().listen(port, () => {
  console.log(`Server was started on '${port}'`);
});
