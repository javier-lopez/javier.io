---
layout: post
title: "vim autocompletion in debian/changelog"
tags: [ubuntu, motu]
description: "So I was testing hooks functionality in pbuilder, and from one link to another I found that vim (at least the vim version that comes with Ubuntu) is able to ..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

So I was testing hooks functionality in pbuilder, and from one link to another
I found that vim (at least the vim version that comes with Ubuntu) is able to
autocomplete LP: # bugs!

To use it:

<pre class="sh_sh">
$ vim debian/changelog or $ dch -i
</pre>

And then in “LP: #” press Ctrl-x Ctrl-o and it will provide with a list of
open bugs of the current package =)

[![Image][161]][161]

Seems like it’s been a while since this little hack was made:

<https://web.archive.org/web/20100911131524/http://www.chiark.greenend.org.uk:80/ucgi/~cjwatson/blosxom/2008/01/31>

<http://tinyurl.com/7es2j48>

  [161]: /assets/img/viajemotu-vim-autocompletion-in-debian-changelog-1.png

Originally published at [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2012/03/11/vim-autocompletion-in-debianchangelog-6/)
