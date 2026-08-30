---
layout: post
title: "long way to go - motu"
tags: [ubuntu, motu]
description: "Today I read that the MOTU team received a new member, congratulations Marcin Juszkiewicz =)!!, this let\u2019 me think that we (ronicardona and I) still have a n..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Today I read that the MOTU team received a new member, congratulations [Marcin
Juszkiewicz][162] =)!!, this let’ me think that we (ronicardona and I) still
have a nice and long way to go, I don’t have any problem with that, I’m pretty
sure it’ll be fun =3 (the kind of fun I like), I only hope that we can help to
get involved to lots of local people in the process, I’ll copy & paste the log
so we can remember from time to time in what areas we should keep improving.

<pre class="sh_sh">
=== meetingology changed the topic of #ubuntu-meeting to: Marcin
    Juszkiewicz's MOTU application
[14:07] &lt;hrw&gt; o/
[14:07] &lt;bdrung&gt; hrw: please introduce yourself
[14:07] &lt;hrw&gt; sure
[14:08] &lt;hrw&gt; I work for Linaro project. Our priority is to
        improve Linux on ARM.
[14:08] &lt;hrw&gt; I maintain arm(el,hf) cross compilers in Ubuntu since
        maverick (PPU for it got ~year ago)
[14:09] &lt;hrw&gt; in spare time or during Linaro ARM porting jams I work
        on fixing ftfbs for armel/armhf packages in Ubuntu
[14:10] &lt;hrw&gt; I worked on multiarching few packages to make cross
        compilation easier
[14:11] &lt;hrw&gt; list of ftfbs bugs which I fixed is in application
[14:11] &lt;hrw&gt; I think thats all - rest is in application
[14:12] &lt;stgraber&gt; how familiar are you with the Ubuntu release
        process and more specifically the various freezes?
[14:12] &lt;hrw&gt; stgraber: did FFe for cross compiler in maverick time,
        had SRU for it after maverick release.
[14:13] &lt;stgraber&gt; you mentioned multiarching packages, do you need
        a FFe for these if you were to do some now?
[14:14] &lt;hrw&gt; stgraber: until final freeze universe packages are
        allowed to be upload unless new features are added - as
        for those I usually check do I need FFe for them or not
[14:14] &lt;hrw&gt; stgraber: as multiarch is feature I would ask for FFe
        in such case.
[14:14] &lt;stgraber&gt; good :)
[14:14] &lt;hrw&gt; stgraber: maybe it will be decided that it may go as
        is but I prefer to be safe then sorry.
[14:15] &lt;hrw&gt; ofcourse before asking for FFe I check rebuild of
        packages which b-d on it
[14:15] &lt;tumbleweed&gt; i'd say it's more a "non-trivial packaging
        change" than a feature, but yes, FFe is appreciated
[14:15] &lt;hrw&gt; otherwise it is just asking for problems
[14:15] &lt;stgraber&gt; hrw: are you subscribed to ubuntu-devel-announce
        and read it at least daily?
[14:15]  * tumbleweed wishes people checked reverse dependencies
        before filing FFes :P
[14:16] &lt;hrw&gt; stgraber: I am subscribed there. last mail was there
        at 01.03.2012
[14:16] &lt;hrw&gt; tumbleweed: I am used to daily builds of whole
        distributions so 'better safe then sorry' is my second name
        ;F
[14:17] &lt;hrw&gt; tumbleweed: red buildbot meant 'drop everything and fix'
[14:17] &lt;hrw&gt; stgraber: so, yes I read it when new mails arrive
[14:17] &lt;stgraber&gt; hrw: perfect
[14:17] &lt;hrw&gt; stgraber: also ubuntu-devel, launchpad-announce
[14:18] &lt;micahg&gt; hrw: is there a reason you're using your linaro
        address instead of your Ubuntu address for uploads as
        update-maintainer is set to error out on an Ubuntu address
[14:18] &lt;hrw&gt; and few debian lists (-arm -embedded) due to work
[14:18] &lt;hrw&gt; micahg: I do this as part of my Linaro work.
[14:18] &lt;micahg&gt; hrw: ah, ok
[14:19] &lt;stgraber&gt; hrw: now, let's say we are in milestone freeze
        (beta2) and you want to upload python-gevent which is a
        universe package, can you do it and if not why?
[14:19] &lt;hrw&gt; micahg: due years of my work for different clients I
        always used their domain on my work
[14:20] &lt;hrw&gt; stgraber: beta freeze means manual appoval for
        main/restricted so I could upload to universe. But as this
        is &gt;beta I would first check is it worth and does it break
        something
[14:21] &lt;tumbleweed&gt; actually, manual approval everywhere, but
        universe uploads are waved through
[14:21] &lt;micahg&gt; tumbleweed: hrw: not ture :)
[14:21] &lt;stgraber&gt; most of universe ;)
[14:21] &lt;micahg&gt; *ture
[14:21] &lt;micahg&gt; *true
[14:21] &lt;hrw&gt; ops then
[14:21]  * micahg needs to fix that wiki page...
[14:21] &lt;tumbleweed&gt; micahg: right, there is some review
[14:21] &lt;stgraber&gt; hrw: so in this case, python-gevent is covered by
        the freeze even though it's in universe, do you know why?
[14:22] &lt;hrw&gt; stgraber: to not increase amount of possible rc bugs
[14:22] &lt;stgraber&gt; hrw: well, that's indeed important but that's not
        the reason :)
[14:23] &lt;hrw&gt; stgraber: nope
=== JanC_ is now known as JanC
[14:24] &lt;tumbleweed&gt; hrw: have you seen the seeded-in-ubuntu tool?
[14:24] &lt;stgraber&gt; python-gevent is an rdepends of python-x2go
[14:24] &lt;stgraber&gt; python-x2go is seeded by Edubuntu
[14:24] &lt;hrw&gt; tumbleweed: no, I did not
[14:24] &lt;stgraber&gt; and so is covered by the freeze
[14:24] &lt;hrw&gt; stgraber: ah. ok, now I understand
[14:24] &lt;stgraber&gt; anything that's in universe and seeded is covered
        by the freeze just as much as main is
[14:25] &lt;stgraber&gt; seeded-in-ubuntu python-gevent would indeed let you
        check this
[14:25] &lt;hrw&gt; thank you
[14:25] &lt;hrw&gt; will make use of it for my linaro seeds
[14:26] &lt;tumbleweed&gt; it gets its data from the most recent CD builds,
        so using it for linaro may be non-trivial
[14:26] &lt;tumbleweed&gt; hrw: you've only been doing a small corner of the
        work MOTUs do (FTBFS and multi-arching) are you intending to
        broaden out? I assume you are focussing there for work reasons?
[14:26] &lt;hrw&gt; tumbleweed: but checking how it works and wriiting similar
        one may be useful one day
[14:27] &lt;hrw&gt; tumbleweed: yes, I am focusing most of my Ubuntu work on
        my work reasons.
=== smb` is now known as smb
[14:27] &lt;hrw&gt; tumbleweed: will use motu rights also to upload fixes done
        by coworkers. but as I lurk in #ubuntu-motu I can work on
        sponsoring other people
[14:28] &lt;tumbleweed&gt; great to hear
[14:28] &lt;tumbleweed&gt; if you come across an area you aren't already
        familiar with, you'd ask for help?
[14:28] &lt;hrw&gt; motu is not ppu - there are some duties attached
[14:28] &lt;hrw&gt; tumbleweed: yes, I would
[14:28] &lt;tumbleweed&gt; well, no duties, but we are a community
[14:29] &lt;hrw&gt; tumbleweed: trying to find way in darkness can hurt
        so it is better to ask
[14:29] &lt;tumbleweed&gt; if you are unsure, at least
[14:29] &lt;tumbleweed&gt; I'm done here, I think
[14:29] &lt;hrw&gt; tumbleweed: English is not my native. duties as 'will
        be nice to help others due to increased permissions'
[14:30] &lt;bdrung&gt; hi, i am back. i had an issue with my internet
        connection.
[14:30] &lt;bdrung&gt; sorry for that.
[14:31] &lt;micahg&gt; hrw: how do you ensure that all changelogs between
        the version in the Ubuntu archive and a merge from Debian
        are present when uploading?
[14:31] &lt;hrw&gt; micahg: I use debdiff + gvim(diff) when merge such ones.
[14:32] &lt;tumbleweed&gt; micahg: I don't think hrw has uploaded a merge yet
[14:32] &lt;hrw&gt; micahg: I know that merge-changelog exists
[14:32] &lt;hrw&gt; tumbleweed: dpkg-cross
[14:33] &lt;tumbleweed&gt; ah
[14:33] &lt;hrw&gt; tumbleweed: 2.6.2 and 2.6.5
[14:33] &lt;hrw&gt; I am also doing merges for few ppa only packages
[14:33] &lt;micahg&gt; hrw: yes, but you didn't upload those :), sorry, I
        guess you probably won't be able to answer the question
[14:34] &lt;micahg&gt; that's ok though :)
[14:34] &lt;hrw&gt; micahg: they were sponsored from my debdiffs ;)
[14:34] &lt;micahg&gt; hrw: right, but this is something to check with the
        source package before upload or during generation and not
        the diff
[14:34] &lt;hrw&gt; ok
[14:36] &lt;hrw&gt; I had issues with bzr merging of changelogs and due
        to that reverted to do it by hand in gvim. gcc-x.y have
        changelog not compatible with current Debian policies
[14:37] &lt;micahg&gt; hrw: bzr-builddeb also has issues generating a
        proper source.changes file with all the changelog entries
        needed in it
[14:38] &lt;hrw&gt; micahg: I am not a fan of bzr anyway. But know how
        to use it
[14:38] &lt;stgraber&gt; micahg: "bzr bd -S -- -sa -v&lt;version&gt;" usually
        works fine here
[14:38] &lt;micahg&gt; stgraber: yes, but you need the -v, not just
        --package-merge
[14:38] &lt;stgraber&gt; micahg: right, I just don't trust
        --package-merge ;)
[14:40] &lt;micahg&gt; hrw: BTW, it's that -v option you need when merging
        to generate a source.changes with all the appropriate
        changelog entries and then they get sent to the -changes list
[14:40] &lt;hrw&gt; micahg: thanks
[14:40] &lt;micahg&gt; the merge-package scripts from a merge can do this
        for you in most cases
[14:41] &lt;micahg&gt; * from merges.ubuntu.com
[14:41] &lt;tumbleweed&gt; it's also mentioned in the Merging wiki page
[14:41] &lt;hrw&gt; used merges.ubuntu.com few times already
[14:42] &lt;hrw&gt; mostly for dpkg-cross work but also took a look there
        on other packages few times
[14:44] &lt;micahg&gt; hrw: do you have an interest in Debian?
[14:45] &lt;hrw&gt; micahg: I used Debian since 2000 to 2010 when I
        switched to Ubuntu due to being hired by Canonical to work
        on Linaro.
[14:45] &lt;micahg&gt; hrw: so, are you familiar with forwarding patches
        to their BTS?
[14:46] &lt;hrw&gt; micahg: yes, send patch to upstream is always useful
[14:47] &lt;Laney&gt; are Debian's arm ports much different from ours at
        the individual package level?
[14:47] &lt;micahg&gt; hrw: have you looked at getting your cross compilers
        into Debian or is that not possible/relevant for Debian?
[14:48] &lt;hrw&gt; Laney: Debian/armel is armv4t when Ubuntu one is
        armv7-a. armhf are same
[14:48] &lt;bdrung&gt; hrw: which arm version is needed for armhf?
[14:48] &lt;hrw&gt; micahg: I am working on it. we (Emdebian guys and me)
        decided that it will be more useful to get cross build-deps
        support and then proper multiarch buildable cross compiler
        instead of current ubuntu one
[14:49] &lt;hrw&gt; bdrung: armv7-a which mean cortex-a5/7/8/9/15 and
        compatible cores
[14:49] &lt;hrw&gt; bdrung: neon support is not required, vfp3d16 is what
        all arm7a chips have
[14:50] &lt;hrw&gt; micahg: multiarch buildable cross is &lt;1h of work
        from my packages (+build time)
[14:51] &lt;hrw&gt; micahg: some changes will be needed in gcc-4.x
        probably but I had my hands there so many times...
[14:51] &lt;ScottK&gt; FWIW, I've worked with hrw on some arm porting
        issues (don't recall if I ended up sponsoring the uploads
        or not) and I found him very pleasant to work with.
[14:51] &lt;hrw&gt; ScottK: thanks
[14:52] &lt;bdrung&gt; any ready to vote or are there still open questions?
[14:52] &lt;hrw&gt; ScottK: it was soemthing with Qt problems. they got
        solved by ubuntu.arm and linaro teams iirc and then
        ubuntu/arm team did uploads
[14:52] &lt;stgraber&gt; I'm ready to vote
[14:53] &lt;micahg&gt; ready to vote
[14:54] &lt;tumbleweed&gt; when can I get an arm board with &gt;=2G of RAM?
[14:54] &lt;tumbleweed&gt; also ready
[14:54] &lt;Laney&gt; lets go
[14:54] &lt;hrw&gt; tumbleweed: there are such ones already.
[14:54] &lt;tumbleweed&gt; hrw: affordable?
[14:55] &lt;hrw&gt; tumbleweed: depends on definition of 'affordable'
[14:55] &lt;bdrung&gt; [VOTE] Should Marcin Juszkiewicz become MOTU?
[14:55] &lt;meetingology&gt; Please vote on: Should Marcin Juszkiewicz
        become MOTU?
[14:55] &lt;meetingology&gt; Public votes can be registered by saying +1,
        +0 or -1 in channel, (private votes
        don't work yet, but when they do it will be by messaging
        the channel followed by +1/-1/+0 to me)
[14:55] &lt;tumbleweed&gt; +1
[14:55] &lt;meetingology&gt; +1 received from tumbleweed
[14:55] &lt;Laney&gt; +1
[14:55] &lt;meetingology&gt; +1 received from Laney
[14:55] &lt;hrw&gt; tumbleweed: at last linaro connect I played with
        marvell board. quad a9, 4gb ddr3, 7xpcie x4 slots, 2 sata
        ports, 4x GbE - atx size beast
[14:55] &lt;stgraber&gt; +1
[14:55] &lt;meetingology&gt; +1 received from stgraber
[14:56] &lt;bdrung&gt; +1
[14:56] &lt;meetingology&gt; +1 received from bdrung
[14:56] &lt;tumbleweed&gt; hrw: nice
[14:57] &lt;micahg&gt; +1 would have liked to see more merges, but has
        been very responsive to comments in bugs
[14:57] &lt;meetingology&gt; +1 would have liked to see more merges, but
        has been very responsive to comments in bugs received from
        micahg
[14:57] &lt;hrw&gt; tumbleweed: or rather quad 'a9 compatible cores'
[14:57] &lt;bdrung&gt; [ENDVOTE]
[14:57] &lt;meetingology&gt; Voting ended on: Should Marcin Juszkiewicz
        become MOTU?
[14:57] &lt;meetingology&gt; Votes for:5 Votes against:0 Abstentions:0
[14:57] &lt;meetingology&gt; Motion carried
[14:57] &lt;tumbleweed&gt; hrw: as a community (hobby) ubuntu developer,
        affordable means "really cheap"
[14:57] &lt;tumbleweed&gt; hrw: congrats, welcome to MOTU
[14:58] &lt;hrw&gt; tumbleweed: then no. ram is most expensive part usually
[14:58] &lt;dholbach&gt; congratulations hrw!
[14:58] &lt;hrw&gt; thanks a lot guys!
[14:58] &lt;bdrung&gt; hrw: congrats
</pre>

  [162]: http://marcin.juszkiewicz.com.pl/

Originally published at [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2012/03/14/long-way-to-go/)
