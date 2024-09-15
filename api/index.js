const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests only from this origin
}));
app.use(bodyParser.json());

// Create a new SQLite database (in-memory for now, but you can use a file-based DB)
const db = new sqlite3.Database(':memory:');

// Create the Posts table
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL)");
});

// API Endpoints
// GET /posts: Retrieve all blog posts
app.get('/posts', (req, res) => {
  db.all('SELECT * FROM posts', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ posts: rows });
  });
});

// GET /posts/:id: Retrieve a single blog post by ID
app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json({ post: row });
  });
});

// POST /posts: Create a new blog post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ post: { id: this.lastID, title, content } });
  });
});

// DELETE /posts/:id: Delete a blog post by ID
app.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM posts WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(204).send();
  });
});

app.put('/posts/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  
  try {
    const updatedPost = await db.run(`UPDATE posts SET title = ?, content = ? WHERE id = ?`, [title, content, id]);
    res.json({ message: 'Post updated successfully', updatedPost });
  } catch (error) {
    res.status(500).json({ error: 'Error updating post' });
  }
});


// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});

module.exports = app;
