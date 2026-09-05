---
layout: post
title: "tip: enable -updates when doing -proposed tests - motu"
tags: [ubuntu, motu]
description: "Some days I like helping -proposed updates to go faster to -updates, I do that by testing -proposed changes, I borrow some of them from: http://people.canoni..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Some days I like helping -proposed updates to go faster to -updates, I do that
by testing -proposed changes, I borrow some of them from:
<http://people.canonical.com/~ubuntu-archive/pending-sru.html>

I always do it in a pbuilder environment or when the changes requires lots of
packages I use a virtualbox machine, when using pbuilder I add the -proposed
repositories and do the tests, yesterday I was testing [#1073574][208] and
found a weird error:

<pre class="sh_sh">
root@sup:/# apt-get install havp
 Reading package lists... Done
 Building dependency tree
 Reading state information... Done
 Some packages could not be installed. This may mean that you have
 requested an impossible situation or if you are using the unstable
 distribution that some required packages have not yet been created
 or been moved out of Incoming.
 The following information may help to resolve the situation:
 The following packages have unmet dependencies:
havp : Depends: libclamav6 (&gt;= 0.97.6+dfsg) but 0.97.3+
dfsg-2.1ubuntu1 is to be installed
 E: Unable to correct problems, you have held broken packages.
</pre>

It was a simple change, it should had to work but it wasn’t.., so I posted it,
and ScottK help me to remember that -updates wasn’t enable, so I add them and
it worked =), I hadn’t had this problem because with some packages the -update
repository isn’t needed, however I’ll remember to do it next time it fails to
install.

<pre class="sh_sh">
deb http://us.archive.ubuntu.com/ubuntu/ quantal main restricted ...
deb http://us.archive.ubuntu.com/ubuntu/ quantal-proposed main restricted ...
deb http://us.archive.ubuntu.com/ubuntu/ quantal-updates main restricted ...
</pre>

  [208]: https://bugs.launchpad.net/ubuntu/+source/havp/+bug/1073574

Originally published at [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2012/11/22/tip-enable-updates-when-doing-proposed-tests/)
