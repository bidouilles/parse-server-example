export DATABASE_URI='mongodb://parse:trainspot@ds011459.mlab.com:11459/parse_trainspot'
export APP_ID='GztnVWZMmQmG8ZgP1C9JK0aFtFj4psoX9balGNHL'
export MASTER_KEY='k4A5zwH8g96wuqAwjd8s0diM9ZZlLLi5tMq2IcPD'
#npm run start
pm2 start index.js -i 1
