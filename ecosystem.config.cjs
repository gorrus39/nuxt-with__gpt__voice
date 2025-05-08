module.exports = {
  apps: [
    {
      name: "NuxtAppName",
      script: "./.output/server/index.mjs",
      interpreter: "node",
      // exec_mode: "cluster",
      // instances: "max",
      env: {
        NODE_ENV: "production",
        PORT: 6600,
      },
    },
  ],
};
