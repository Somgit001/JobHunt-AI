const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const API_KEY = process.env.GROQ_API_KEY || '';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/claude') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      let parsed;
      try { parsed = JSON.parse(body); } catch(e) {
        res.writeHead(400); res.end(JSON.stringify({ error: 'Invalid JSON' })); return;
      }

      const groqBody = JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages: parsed.messages || []
      });

      const options = {
        hostname: 'api.groq.com',
        path: '/openai/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + API_KEY,
          'Content-Length': Buffer.byteLength(groqBody)
        }
      };

      const proxyReq = https.request(options, proxyRes => {
        let data = '';
        proxyRes.on('data', chunk => data += chunk);
        proxyRes.on('end', () => {
          try {
            const groqRes = JSON.parse(data);
            const text = groqRes.choices?.[0]?.message?.content || '';
            const converted = JSON.stringify({ content: [{ type: 'text', text }] });
            res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
            res.end(converted);
          } catch(e) {
            res.writeHead(500); res.end(JSON.stringify({ error: 'Parse error' }));
          }
        });
      });

      proxyReq.on('error', err => {
        res.writeHead(500); res.end(JSON.stringify({ error: err.message }));
      });

      proxyReq.write(groqBody);
      proxyReq.end();
    });
    return;
  }

  if (req.method === 'GET') {
    const filePath = path.join(__dirname, 'jobhunt-ai.html');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('jobhunt-ai.html not found. Make sure it is in the same folder as server.js');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log('');
  console.log('  JobHunt AI is running!');
  console.log('  Open this in your browser: http://localhost:' + PORT);
  console.log('');
  if (!API_KEY) {
    console.log('  WARNING: GROQ_API_KEY not set.');
    console.log('  Stop the server (Ctrl+C) and run:');
    console.log('  set GROQ_API_KEY=gsk_your_key_here');
    console.log('  node server.js');
    console.log('');
  } else {
    console.log('  Groq API key loaded. Ready to go!');
    console.log('');
  }
});