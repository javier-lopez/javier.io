---
layout: post
title: "updating ubuntu for ubuntu development (precise – raring)"
tags: [ubuntu, motu]
description: "Another Ubuntu version is open for development and I plan to participate =) . So in order to do it the first step is to upgrade the environment for raring, c..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Another Ubuntu version is open for development and I plan to participate =) .
So in order to do it the [first step][204] is to upgrade the environment for
raring, currently I’m working on precise so what I do is upgrade the pbuilder
conf and the virtual machine to test the packages.

<pre class="sh_sh">
$ mkdir -pv $HOME/misc/packaging/ubuntu/ubuntu-13-04
$ cd $HOME/misc/packaging/ubuntu/ubuntu-13-04
$ mkdir  -pv app  diffs  isos  merge  udw
$ mkdir $HOME/misc/packaging/ubuntu/results/raring-i386
$ mkdir $HOME/misc/packaging/ubuntu/results/raring-amd64
</pre>

Once the directories are created I upgrade the pbuilder configuration, I edit
[$HOME/.pbuilderrc][205] to add “raring” to the next line:

<pre class="sh_sh">
UBUNTU_SUITES=("raring" "quantal" "precise")
</pre>

And then I edit the file [**/etc/bash_completion.d/pbuilder**][206]to add the
line:

<pre class="sh_sh">
[
</pre>“$have” ] && complete -F _pbuilder -o filenames pbuilder
> pbuilder.precise.amd64 pbuilder.precise.i386 pbuilder.quantal.amd64
> pbuilder.quantal.i386 pbuilder.raring.i386 pbuilder.raring.amd64
> pbuilder.sid.amd64 pbuilder.sid.i386

When done I create the new raring setup.., however before been able to do it,
I create a link in **/usr/share/debootstrap/scripts** from raring -> gutsy (LP
[#1068707][207])

<pre class="sh_sh">
$ cd /usr/share/debootstrap/scripts
$ sudo ln -s gutsy raring
</pre>

After that I’m able to continue with:

<pre class="sh_sh">
$ alias pbuilder.raring.i386
alias pbuilder.raring.i386='sudo DIST=raring ARCH=i386 pbuilder'
$ pbuilder.raring.i386 create
$ alias pbuilder.raring.amd64
alias pbuilder.raring.amd64='sudo DIST=raring ARCH=amd64 pbuilder'
$ pbuilder.raring.amd64  create
</pre>

Which will create minimal setups for raring.., now I’ll test them.., I’ll
download a package to compile it..,

<pre class="sh_sh">
$ mkdir -pv hello &amp;&amp; cd hello
$ bzr branch ubuntu:hello &amp;&amp; cd hello
$ echo bzr.debuild
alias bzr.debuild='bzr bd -- -S -uc -us'
$ bzr.debuild
$ pbuilder.raring.i386 build ../hello_2.8-2.dsc
</pre>

So, after reviewing the hello_2.8-2_i386.deb file in
**$HOME/misc/packaging/ubuntu/results/raring-i386** (default will be in
**/var/cache/pbuilder/raring-i386/result/** ) I can mark pbuilder as done.

Next step is to setup the VM.., however since no .iso is available right now,
I’ll do this step later on.., to know when I can install it from an .iso file,
I’ll be looking at <http://iso.qa.ubuntu.com/qatracker/milestones/243/builds>
.., of course I could go right now with the netboot images.., however I prefer
to wait a little bit for the ubuntu-desktop juice.

I’ve setup ubuntu hours to have enough time every 2 days to work on this..,
the first one (where I updated my environment) is available here:

<https://www.youtube.com/watch?v=z8TWTCcCwIM> //only spanish

Dotfile changes:
<https://github.com/chilicuil/dotfiles/commit/173b3ff89de8db9ca27a20624b6ba99ad95826c7>

In case you’re starting from a pristine environment, you may want to install:

<pre class="sh_sh">
$ sudo apt-get install gnupg pbuilder ubuntu-dev-tools bzr-builddeb apt-file git dput debhelper
</pre>

Have fun n_n/

  [204]: /blog/en/2011/11/23/setting-up-ubuntu-for-ubuntu-development-upgrade.html
  [205]: https://github.com/chilicuil/dotfiles/blob/master/.pbuilderrc
  [206]: https://github.com/chilicuil/learn/blob/master/autocp/bash_completion.d/pbuilder
  [207]: https://bugs.launchpad.net/ubuntu/+source/debootstrap/+bug/1068707

Originally published at [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2012/11/03/updating-ubuntu-for-ubuntu-development-precise-raring/)
