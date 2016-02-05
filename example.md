---
# Everything between the two --- lines can be valid YAML and will be
# available in a 'meta' property
title: Title can go here
author: Foo Bar
list:
    - one
    - two
    - three
---
# Introduction
Anything you write here is Markdown. And will be available as parsed HTML in the
`content` property.

---
title: Another block
---
You can have as many blocks as you want.

---
title: Yet another block
---
Neat huh?