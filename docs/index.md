---
layout: page
title: HaxPro
subtitle: A scripting language designed to be robust and easy.
hero_height: is-large
hero_link: /download/
hero_link_text: Download Now
show_sidebar: false
callouts: main_callouts
---

## General page content

This is the rest of the page content. You can add what you like here.

## Hero Link

If you would like to add a call to action button in the hero then add `hero_link` and `hero_link_text` to the page's frontmatter

```yaml
layout: page
title: Example Landing Page
subtitle: This is an example landing page with callouts
hero_height: is-large
hero_link: /page-1/
hero_link_text: Download
```


## Create a callout data file

Create a data file following the below format. The style is for classes to set the background colour and sizes you would like to use of the Bulma hero container for the callouts.

**New in 0.5.7** You can set the height of the callouts in the data file, such as is-small, is-medium or is-large. If unset it will be is-medium by default.

The items have 5 fields, but only the title and subtitle are required. 

```yaml
style: is-light
height: is-medium
items:
  - title: Read the Docs
    subtitle: 
    icon: fa-space-shuttle
    description: >
      Use Simple to it's full power by the reading the easy-to-read documentation!

      For example, such as this. 
    call_to_action_name: Go to Docs
    call_to_action_link: /page-1/
  - title: Get extension
    subtitle: 
    icon: fa-wrench
    description: >
      Simple allows for users to create extensions and can upload them to our extension store!

    call_to_action_name: Go to Store
    call_to_action_link: /page-2/
  - title: Visit our GitHub!
    subtitle: 
    icon: fab fa-github
    description: >
      You can view my GitHub or clone it! Any help and collaboration will help the growth of this project, thank you!

      For example, such as this.
    call_to_action_name: Go to GitHub
    call_to_action_link: https://github.com/alamshafil/simple
```

## Set the callouts in the frontmatter

To display the callouts on your page, add a callouts property in the frontmatter and set it to the name of your data file without the extension.

```yaml
layout: page
title: Simple
subtitle: The Robust language
callouts: example_callouts
```