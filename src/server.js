require('dotenv/config');
require('module-alias/register');
const app = require('@/config/app');

app.listen(process.env.PORT, () => {
  console.log(`listen on http://localhost:${process.env.PORT}`);
});
