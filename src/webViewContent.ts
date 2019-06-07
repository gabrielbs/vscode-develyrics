export const content = () => `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Helvetica
    }

    h3 {
      display: inline-block;
      color: #ebe535;
    }

    form {
      display: flex
    }

    .wrapper {
      text-align: center
    }

    .input {
      width: 80%;
      height: 30px;
      padding: 5px;
      border-radius: 5px;
      border: 1px#9547c6 solid;
      margin-right: 10px;
    }

    .input:focus {
      outline: none
    }

    .button {
      width: 20%;
      border: 0;
      background-color: #9547c6;
      color: #fff;
    }

    .list {
      list-style: none;
      padding: 0;
      margin: 10px 0;
    }

    .list li {
      cursor: pointer;
      padding: 6px;
      margin-bottom: 5px;
    }

    .list li:hover {
      background-color: #c3bacc;
      color: #000;
    }

    .music {
      margin-top: 10px;
      white-space: pre
    }

    .loading {
      width: 50px;
      margin: auto;
      margin-top: -51px;
      padding: 10px;
      font-size: 35px;
      animation: spin 4s infinite linear;
    }

    .hide {
      visibility: hidden;
    }

    .show {
      visibility: visible;
    }

    @-moz-keyframes spin {
      from {
        -moz-transform: rotate(0deg);
      }

      to {
        -moz-transform: rotate(360deg);
      }
    }

    @-webkit-keyframes spin {
      from {
        -webkit-transform: rotate(0deg);
      }

      to {
        -webkit-transform: rotate(360deg);
      }
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }
  </style>
  <title>Develyrics</title>
</head>

<body>
  <div class="wrapper">
    <h3>SEARCH FOR YOUR FAVORITE SONG!</h3>
    <form class='form'>
      <input type="text" name="song" class="input" />
      <button type="submit" class="button">SEARCH &#x1f918;</button>
    </form>
    <div class="loading hide">
      &#x1f3b6;
    </div>
    <ul class="list">
    </ul>
    <div class="music"></div>
  </div>
</body>
<script>
window.onload = () => {
  window.addEventListener('message', ({ data }) => {
    const { apiKey } = data
    const instance = (endpoint) => {
      return \`https://api.vagalume.com.br/\${endpoint}\`
    }
    const get = (endpoint, params) => {
      const url = new URL(instance(endpoint))
      url.search = new URLSearchParams({
        ...params,
        apiKey,
      })

      return window.fetch(url).then(data => data.json())
    }
    const form = document.querySelector('.form')
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const input = document.querySelector('input[name="song"]')
      const loading = document.querySelector('.loading')
      loading.classList.add('show')
      input.classList.add('hide')
      setTimeout(async () => {
        try {
          const data = await get('search.excerpt', { q: input.value })
          loading.classList.remove('show')
          input.classList.remove('hide')
          const docs = data.response.docs
          if (docs) {
            buildMusicList(docs)
          }
        } catch (e) {
          console.log(e)
          const list = document.querySelector('.list')
          list.appendChild(document.createTextNode('It was something wrong with the server'))

        } finally {
          loading.classList.add('hide')
          loading.classList.remove('show')
        }
      }, 1000)
    })

    const buildMusicList = (musics) => {
      const list = document.querySelector('.list')
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
      const musicContainer = document.querySelector('.music')
      const listContainer = document.querySelector('.list')
      musicContainer.innerHtml = ''
      const data = await get('search.php', { musid: musicId })
      musicContainer.appendChild(document.createTextNode(data.mus[0].text))
      listContainer.innerHTML = ''

    }
  })
  }
</script>

</html>`;
