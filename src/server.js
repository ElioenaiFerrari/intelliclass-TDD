require('dotenv/config');
require('module-alias/register');
require('@/config/database')(process.env.DATABASE_URL);
const app = require('@/config/app');

app.listen(process.env.PORT, () => {
  console.log(`listen on http://localhost:${process.env.PORT}`);
});
