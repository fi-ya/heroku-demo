const layout = require('../layout');
const model = require('../database/model.js');
const db = require('../database/connection');

function htmlPostForm() {
  return `
    <h1>Checkin'?</h1>
    <form action="/posts" method="POST">
        <div>
            <label for="text_content"> Leave your question here! </label>
            <textarea name= "text_content" id="text_content" rows="4" cols="50" autofocus required>
            </textarea>
        </div>
        <button type="submit">Submit</button>
    </form>
    <a href="/">Back to Homepage</a>
    `;
}

function displayPosts() {
  return db.query('SELECT * FROM posts').then((result) => {
    const posts = result.rows;
    const postContent = posts
      .map(
        (question) => `
    <div>
    <span>${question.user_id}</span>
    <p>${question.text_content}</p>
    <form action="/delete-post" method="POST" style="display: inline;">
        <button name="id" value="${question.id}" aria-label="Delete post">
          Delete
        </button>
      </form>
      </div>`
      )
      .join('');

    return `
    <section>
    ${postContent}
    <section>
    `;
  });
}

function get(request, response) {
  displayPosts().then((post) => {
    const html = layout(`Checkin'?`, htmlPostForm() + post);
    response.send(html);
  });
}

function post(request, response) {
  const { text_content } = request.body;
  const sid = request.signedCookies.sid;

  if (sid) {
    model
      .getUserSessionData(sid)
      .then((result) => {
        const user_id = result.data.user.id;

        return model.createPost(user_id, text_content);
      })
      .then(response.redirect('/posts'));
  }

  response.redirect('/log-in');
}

function deletePost(request, response) {
  const postId = request.body.id;
  const sid = request.signedCookies.sid;

  if (sid) {
    const userData = model.getUserSessionData(sid);
    const postData = model.getPostByID(postId);

    Promise.all([userData, postData]).then((values) => {
      const userId = values[0].data.user.id;
      const postUserId = values[1].rows[0].user_id;

      if (userId === postUserId) {
        return model.deletePost(postId).then(() => {
          response.redirect('/posts');
        });
      } else {
        response.redirect('/posts');
      }
    });
  } else {
    response.redirect('/posts');
  }
}

module.exports = { get, post, deletePost };
