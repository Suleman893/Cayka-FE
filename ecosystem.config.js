module.exports = {
  apps: [
    {
      name: 'cayka-super-admin-portal',
      script: 'npm run start',
      instances: 1,
      autorestart: true,
      watch: false,
      watch_options: {
        followSymlinks: false
      },
      env: {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: process.env.DEV_APP_PORT || 3035, // Default to 3000 if not set
      },
      max_memory_restart: '1G'
    }
  ]
};
