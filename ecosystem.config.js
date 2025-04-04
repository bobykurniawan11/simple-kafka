module.exports = {
  apps: [
    {
      name: "kafka-app",
      script: "dist/index.js",
      watch: false,
      autorestart: true,
      restart_delay: 5000, // Auto restart setelah 5 detik jika crash
    },
  ],
};
