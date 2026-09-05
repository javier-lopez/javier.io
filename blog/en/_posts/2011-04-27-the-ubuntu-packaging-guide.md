---
layout: post
title: "the ubuntu packaging guide"
tags: [ubuntu, motu]
description: "Browsing around I came to the ubuntu packaging guide , a work in progress, with lots of interesting tips and howto\u2019s about what people need to get started wi..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Browsing around I came to the [ubuntu packaging guide][130], a work in
progress, with lots of interesting tips and howto’s about what people need to
get started with ubuntu development (I really hope someone could document how
to work with [merges][131] and [FTBFS][132] bugs, still no light for me), now
I’ll just record how I ‘compile’ it, in case wanted to add something and I
forget how to test it xD

I’m running Ubuntu lucid (10.04 also known as the LTS version), and I only had
to:

#### download the source

<pre class="sh_sh">
$ bzr branch lp:ubuntu-packaging-guide
</pre>

#### install sphinx ( <https://web.archive.org/web/20121022183301/http://sphinx.pocoo.org:80/> )

<pre class="sh_sh">
$ sudo apt-get install python-sphinx
</pre>

#### produce the documentation

<pre class="sh_sh">
$ make html #or make latexpdf, check the Makefile out for more options
</pre>

I know nothing about sphinx but looking at the files I suppose the *.rst are
whom produce the files…

Still no idea how to get the .deb package from it, but thanks to tumbleweed
from #ubuntu-motu to show me how simple getting the docs actually was >_>’
(even without the .deb package), i10n is still in progress at
[mainstream][133]

Not a lot had happened for me, the alpha group is having a lot of more
comments, but still not sure if it’s having the success it was suppose to
have, the final iso testing for natty has been started, the oneiric (the next
ubuntu version) topics also have started, the newletters seems dead, people
talked about unity till the last minute…

The blogs I keep reading and that I really, really recommend are:

<http://raphaelhertzog.com/>

<http://daniel.holba.ch/blog/>

…going back to what people call ‘reality’ =(

  [130]: https://launchpad.net/ubuntu-packaging-guide
  [131]: https://merges.ubuntu.com/
  [132]: http://qa.ubuntuwire.com/ftbfs/
  [133]: https://bitbucket.org/birkenfeld/sphinx/issue/561/configuration-option-store-translations-in

Originally published at [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2011/04/27/the-ubuntu-packaging-guide/)
