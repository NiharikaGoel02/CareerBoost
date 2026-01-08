const { spawn } = require('child_process');
const net = require('net');

// Function to check if a port is in use
function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close();
      resolve(false);
    });
    server.on('error', () => {
      resolve(true);
    });
  });
}

// Function to kill process on a specific port
async function killProcessOnPort(port) {
  const { exec } = require('child_process');
  return new Promise((resolve) => {
    exec(`netstat -ano | findstr :${port}`, (error, stdout) => {
      if (stdout) {
        const lines = stdout.split('\n');
        for (const line of lines) {
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 5) {
            const pid = parts[4];
            if (pid && pid !== '0') {
              console.log(`Killing process ${pid} on port ${port}...`);
              exec(`taskkill /PID ${pid} /F`, () => {
                console.log(`Process ${pid} killed.`);
              });
            }
          }
        }
      }
      resolve();
    });
  });
}

// Main function
async function startServer() {
  const port = process.env.PORT || 5000;
  
  console.log(`Checking if port ${port} is available...`);
  
  if (await isPortInUse(port)) {
    console.log(`Port ${port} is in use. Attempting to kill existing process...`);
    await killProcessOnPort(port);
    
    // Wait a bit for the process to be killed
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (await isPortInUse(port)) {
      console.log(`Port ${port} is still in use. Trying port ${port + 1}...`);
      process.env.PORT = port + 1;
    }
  }
  
  console.log(`Starting server on port ${process.env.PORT || port}...`);
  
  const server = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
    cwd: __dirname
  });
  
  server.on('error', (error) => {
    console.error('Failed to start server:', error);
  });
  
  server.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  });
}

startServer().catch(console.error); 