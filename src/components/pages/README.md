# Pages directory

This directory contains all the page files in all the languages. Currently I set it up that it gets populated automatically from [Authoring sub-project](https://github.com/heroqu/rs-authoring). But this is not the point, as one can make these files manually too.

This is how the files look for my particular site:

```
.
├── en
│  ├── index.js
│  ├── About.js
│  ├── Contact.js
│  ├── Education.js
│  ├── Experience.js
│  ├── Foss.js
│  ├── Intro.js
│  ├── Portfolio.js
│  └── Skills.js
├── ru
│  ├── index.js
│  ├── About.js
│  ├── Contact.js
│  ├── Education.js
│  ├── Experience.js
│  ├── Foss.js
│  ├── Intro.js
│  ├── Portfolio.js
│  └── Skills.js
├── .gitignore
├── index.js
├── index.js.sample   <---- example of index.js
└── README.md         <---- the file you are reading now
```

First of all, none of these `.js` files is tracked here by git, and this is on purpose: these files are the actual *content*, while we are here in the React app, which only consumes the content, even though technically the files are full fledged React JSX pieces of code. So, those `.js` files are coming from content management subproject and should be tracked there (and they are).

The second important thing here is that each directory (the root and the locale ones) has an `index.js` file. In my case these `index.js` files do also come here for free from [Authoring sub-project](https://github.com/heroqu/rs-authoring), but if you are not using such an automatic setup, then just make sure to have them in place.

And here is how they should be looking:

The `index.js` inside the pages root (depends on actual locales):

```JavaScript
import en from './en'
import ru from './ru'

export default {
  en,
  ru
}
```

Inside locale sub-directory it should look something like this:

```JavaScript
import About from './About'
import Contact from './Contact'
import Education from './Education'
import Experience from './Experience'
import Foss from './Foss'
import Intro from './Intro'
import Portfolio from './Portfolio'
import Skills from './Skills'

export default {
  about: About,
  contact: Contact,
  education: Education,
  experience: Experience,
  foss: Foss,
  intro: Intro,
  portfolio: Portfolio,
  skills: Skills
}
```

Basically this is just a re-export and it should probably be identical for each locale.

Note that exported keys are all in lower case ('about', not 'About' etc.)

Again, the factual page names should correspond the actual page files.

The reason why these index files are important is because in `Content.js` we are going to import all the pages in all locales with a single line of code:

```JavaScript
import pages from './pages'
```

So, with those index files in place we get a sort of cascading import which result in a nested pages object:

```JavaScript
// ( a pseudo-code )
const pages = {
  en: {
    about: About,
    contact: Contact,
    education: Education,
    experience: Experience,
    foss: Foss,
    intro: Intro,
    portfolio: Portfolio,
    skills: Skills
  },
  ru: {
    about: About,
    contact: Contact,
    education: Education,
    experience: Experience,
    foss: Foss,
    intro: Intro,
    portfolio: Portfolio,
    skills: Skills
  }
}
```

This a pseudo-code: the leaf values are actual React component imported from particular files, I mean About value in 'en' branch is different from About in 'ru' branch. Anyway.
