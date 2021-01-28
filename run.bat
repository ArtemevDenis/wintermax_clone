call npm install
call npm npm install --prefix _client
call npm npm run build --prefix _client
call cross-env NODE_ENV=production node app.js
pause