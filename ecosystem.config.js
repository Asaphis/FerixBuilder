module.exports = {
  apps: [
    {
      name: 'ferixbuilder-backend',
      script: './dist/index.js',
      cwd: '/home/ubuntu/FerixBuilder',
      env: {
        NODE_ENV: 'production',
        PORT: 5006
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M'
    },
    {
      name: 'ferixbuilder-frontend',
      script: 'npm',
      args: 'run start',
      cwd: '/home/ubuntu/FerixBuilder/Web/frontend',
      env: {
        NODE_ENV: 'production',
        VITE_PORT: 5173,
        VITE_API_URL: 'http://localhost:5006/api'
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '300M'
    },
    {
      name: 'ferixbuilder-admin',
      script: 'npm',
      args: 'run start',
      cwd: '/home/ubuntu/FerixBuilder/Web/admin',
      env: {
        NODE_ENV: 'production',
        VITE_PORT: 5174,
        VITE_API_URL: 'http://localhost:5006/api'
      },
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '300M'
    }
  ]
};
