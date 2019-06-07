export const content = () => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    h3 {
      display: inline-block;
    }

    #list {
      list-style: none;
      padding: 0;
      margin: 10px 0;
    }

    #list li {
      cursor: pointer;
      margin-bottom: 5px;
    }

    #list li:hover {
      background-color: #c3bacc;
    }

    #music {
      margin-top: 10px;
      white-space: pre
    }
  </style>
  <title>Cat Coding</title>
</head>

<body>
  <h3>Search for your favorite song!</h3>
  <form id='form'>
    <input type="text" name="song" />
    <button type="submit" id="button">Search</button>
  </form>
  <ul id='list'>
  </ul>
  <div id='music'></div>
</body>
<script>
  const form = document.querySelector('#form')
  window.onload = () => {
    const apiKey = '93d3d93f93aa2de699a8d27525df761a'
    const instance = (endpoint) => {
      return \`https://api.vagalume.com.br/\${endpoint}?apikey=\${apiKey}\`
    }
const get = (endpoint, params) => (
  window.fetch(\`\${instance(endpoint)}&\${params}\`).then(data => data.json())
)
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const inputValue = document.querySelector('input[name="song"]')
  const data = await get('search.excerpt', \`q=\${inputValue.value}\`)

  const docs = data.response.docs
  if (docs) {
    buildMusicList(docs)
  }
})

const buildMusicList = (musics) => {
  const list = document.querySelector('#list')
  const items = musics.map(music => {
    const li = document.createElement('li')
    const content = document.createTextNode(music.band)
    li.appendChild(content)
    li.setAttribute('data-musicId', music.id)
    li.addEventListener('click', getMusicLyric)
    return li
  })

  items.forEach(item => list.appendChild(item))
}

const getMusicLyric = async (event) => {
  const element = event.currentTarget
  const musicId = element.getAttribute('data-musicId')
  const musicContainer = document.querySelector('#music')
  const listContainer = document.querySelector('#list')
  musicContainer.innerHtml = ''
  const data = await get('search.php', \`musid=\${musicId}\`)
  musicContainer.appendChild(document.createTextNode(data.mus[0].text))
  listContainer.innerHTML = ''

}
  }
</script>

  </html>
`;
