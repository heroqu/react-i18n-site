# Hosting the fonts

We are going to self-host the fonts required by the app, so that we could load them with simple `import` statement.

By including fonts in the app bundle we should  ([reportedly](https://www.bricolage.io/typefaces-easiest-way-to-self-host-fonts/))  achieve from 300 to 1000 milliseconds gain during the application first start.

## Why not just use the `typeface-<some font>` npm?

Current setup is an enhancement over how the same effect is achieved in [typeface-roboto](https://www.npmjs.com/package/typeface-roboto) and [typeface-arsenal](https://www.npmjs.com/package/typeface-arsenal) npms.

I've used the files from these two packages as the starting point and then sliced the original css files into smaller chunks: one file per font variant. Because of this we now are able to select which font variants to import and which to not, and this makes the application bundle skinnier.

I had also to replace the Roboto and Arsenal font files (.woff and .woff2) with the variant that include cyrillic character subsets, which typeface npms haven't.

## Usage

To make these fonts accessible inside the application we simply import them the same exact way as we import CSS files:

``` JavaScript
import '../assets/fonts'
```

## Credits

The idea and implementation are based on Kyle Mathews' [original idea](https://www.bricolage.io/typefaces-easiest-way-to-self-host-fonts/) and his npms.
