# Local fonts

We are going to put required fonts in this directory and load them through the `import` statement to avoid client browser's extra calls to font hosting server (the google fonts site) which [reportedly](https://www.bricolage.io/typefaces-easiest-way-to-self-host-fonts/) should save from 0.3 up to 1 second for the first time site loading.

## Why not just use the `typeface-<some font>` npm?

Current setup is indeed a local copy of [typeface-roboto](https://www.npmjs.com/package/typeface-roboto) and [typeface-arsenal](https://www.npmjs.com/package/typeface-arsenal) npms, enhanced in a manner that allows importing individual font variants as opposed to loading whole font bundles. This is achieved by slicing the typeface's original css files into smaller chunks: one file per font variant. We can then choose what we are going to load inside the `fonts/index.js` file.

Thus instead of

``` javascript
import 'typeface-roboto'
```

we now can either import the whole font:

``` javascript
// fonts/index.js

import './typeface-roboto'
```

and get the same result, or, alternatively, choose only needed variants and lessen the app's bundle weight:

``` javascript
// fonts/index.js

import './typeface-roboto/300'
import './typeface-roboto/400'
import './typeface-roboto/500'
```

Here, we only import weights of 300, 400 and 500 (should do for the Material-UI) and skip 100, 700, 900 as well as all the italics. This means we only load 25% of all `Roboto` files.

## Consuming fonts inside the app

just import the `fonts/index.js` file anywhere inside the app components hierarchy and the fonts will be available there.

## Credits

Once again, this is just a minor variation of Kyle Mathews' [original brilliant idea](https://www.bricolage.io/typefaces-easiest-way-to-self-host-fonts/) and setup.
