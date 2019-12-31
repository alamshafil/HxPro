---
layout: page
title: HaxPro
subtitle: A scripting language designed to be robust and easy.
hero_height: is-large
hero_link: /download/
hero_link_text: Download Now
hero_image: hero.png
show_sidebar: false
callouts: main_callouts
---

## Getting started

First, download the [HaxPro IDE](https://alamshafil.github.io/HaxPro/download) or open your perfered IDE and install the [HaxPro CLI](https://alamshafil.github.io/HaxPro/download).


## Create a new project

In the HaxPro IDE, press `New.`

![](https://alamshafil.github.io/HaxPro/res/new.png)

Or, open your perfered IDE and a command prompt.

In the command prompt, type

```
hax init {name}
```

Make sure you replace `{name}` with the name of your project!

Type to start coding!

## Import basic packages

Start by using `use:` to import some basic packages.

```
use: haxpro.main
use: haxpro.ui
```

* `use: haxpro.main` imports the basic function and object of the language.

* `use: haxpro.ui` imports the built-in UI package of HaxPro. The UI can be created in the `UI Editor` in the HaxPro IDE.

Then, we will use the `write:` to print some text to the screen. *Note: the `write:` function comes from `haxpro.ui`*

Finally, we will write `Hello World!`

```
use: haxpro.main
use: haxpro.ui

write: "Hello World!
```

You're done, let's test it!

## Testing your project

To test your project in the HaxPro IDE, press `Run.`

![](https://alamshafil.github.io/HaxPro/res/run.png)

Or, type in the command prompt:

```
hax build
```

You should end up with this:

![](https://alamshafil.github.io/HaxPro/res/hello-world.png)

You just made your first HaxPro app!