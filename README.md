![](https://github.com/alamshafil/simple/blob/master/logo-full-black.png)


[![](https://api.travis-ci.com/alamshafil/simple.svg?branch=master)](https://travis-ci.com/alamshafil/simple)
[![](https://david-dm.org/alamshafil/simple.svg)](https://david-dm.org/alamshafil/simple)
[![](https://snyk.io/test/github/alamshafil/simple/badge.svg)](https://snyk.io/test/github/alamshafil/simple)

A scripting language designed to be robust and easy.

# Build Instructions
To get started, install the latest source code from Github.

To build [Simple](https://github.com/alamshafil/simple/) you need to install the following:
* [`Node.js`](https://nodejs.org/)
* [`electron-packager`](https://github.com/electron/electron-packager)

First install [`Node.js`](https://nodejs.org/), you will install [`electron-packager`](https://github.com/electron/electron-packager) later.

Once you have installed [`Node.js`](https://nodejs.org/) open your terminal and go to where have downloaded the source code.

For example, I downloaded the source to `C:\Users\Admin\Desktop\simple` 

I would type the following in the terminal:
```
cd C:\Users\Admin\Desktop\simple
```
*Note: This command should work on Windows, Linux, and MacOS.*

Once you have performed the command, type:
```
npm install electron-packager -g
```

This will install [`electron-packager`](https://github.com/electron/electron-packager) onto your machine.

After it is completed installing, you can type `electron-packager` to build executables.

You can read the documentation on using `electron-packager` [here](https://github.com/electron/electron-packager).

The following is basic usage of `electron-packager` in the command line:
```
electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]
```

For example I want to compile a 64-bit `.exe` for Windows, I would type:

```
electron-packager . Simple —-platform=win32 —-arch=x64
```







