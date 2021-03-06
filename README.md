
# 🔌 Guillotina Management Interface

It's build around the idea of a framework to roll you own GMI.

## Status

Alpha version. The app is usable, but still needs some love.


## Roll your own guillotina

### With create react app

```bash

npx create-react-app gmi_demo
cd gmi_demo

yarn add @guillotinaweb/react-gmi

```

App.js
```jsx
import React from 'react';
import {Layout} from '@guillotinaweb/react-gmi'
import {Auth} from '@guillotinaweb/react-gmi'
import {Guillotina} from '@guillotinaweb/react-gmi'
import {Login} from '@guillotinaweb/react-gmi'
import {useState} from 'react'
import '@guillotinaweb/react-gmi/dist/css/style.css'

// guillotina url
let url = 'http://localhost:8080/'

const auth = new Auth(url)

function App() {

  const [isLogged, setLogged] = useState(auth.isLogged)

  // You can do whatever you want on login, this includes,
  // if you have a router, move it to it's user home folder,
  // or the root...
  const onLogin = () => {
    setLogged(true)
  }
  const onLogout = () => setLogged(false)

  auth.onLogout = onLogout

  return (

      <Layout auth={auth} onLogout={onLogout}>
        { isLogged && <Guillotina auth={auth} url={url} />}
        { !isLogged && (
          <div className="columns is-centered">
            <div className="columns is-half">
              <Login onLogin={onLogin} auth={auth} />
            </div>
          </div>
        )}
      </Layout>
  );
}


export default App;
```

### To add icons:


Add the icons to the default public/index.html header

```diff
<meta name="viewport" content="width=device-width, initial-scale=1" />
+ <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
<meta
      name="description"
      content="Web site created using create-react-app"
    />
```

- Copy guillotina logo to your public

```bash
curl https://raw.githubusercontent.com/guillotinaweb/guillotina_react/master/public/logo.svg > public/logo.svg

```

## Docs?

- [Howto Extend Guillotina React form outside?](docs/extend.md)
- [Narrative Docs](docs/api.md)


## Develop

```
run a local guillotina
yarn
yarn start

```

## Screenshots

![](screenshots/screen2.png)
![](screenshots/screen1.png)
![](screenshots/screen3.png)


## Sponsors

This project is sponsored by <a href="https://www.vinissimus.com">Vinissimus Wine Shop</a>

<a href="https://www.vinissimus.com"><img src="https://cdn.vinissimus.com/front/static/images/vinissimus-logo.svg" /></a>
