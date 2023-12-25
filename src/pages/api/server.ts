// server.ts
import http from 'http';
import sendMail from './contact';

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/sendMail') {
    try {
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });

      req.on('end', async () => {
        const { name, email, subject, message } = JSON.parse(data);

        if (!name || !email || !subject || !message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Missing fields' }));
          return;
        }

        const result = await sendMail({ name, email, subject, message });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      });
    } catch (error) {
      console.error(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Internal server error' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
