---
title: "use:"
subtitle: Infomation on "use:"
layout: page
show_sidebar: false
menubar: example_menu
---

## use:

`use:` is a function that is imported from `haxpro.main`.

The function `use:` is used to import a HaxPro extension.

There are mulitple way to import a HaxPro extension, and install them.

## Using the HaxPro CLI
You can use the `HaxPro CLI` to download extensions for use in your project. 

To install an extension, type in the terminal:
```
hax install (extension name)
```

Then, you can import it by typing:
```
use: files.(extension name)
```

## Using an external source
You can import a extension from an external source.

*Note: You must know the location (URL) for your external source, and must be an uncompiled `.js` file.*
*Example : `https://alamshafil.github.io/HaxPro/store/extensions/test/test.js`*

To import it, you can type:
```
use: https://(url of file)/
```

## Using an internal extension
HaxPro has many internal extension, but there are two main ones.

There are `haxpro.main` and `haxpro.ui`.

You would use `haxpro.main` to access all basic functions of HaxPro, and you would type:
```
use: haxpro.main
```

You would use `haxpro.ui` to access all UI functions and use the UI designer, and you would type:
```
use: haxpro.ui
```