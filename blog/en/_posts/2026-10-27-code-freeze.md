---
layout: post
title: "code-freeze, human verification of AI generated code"
tags: [shell, tools]
description: "Pairing with an AI, code grows faster than a person reads it. code-freeze puts a signature on each function a human actually read..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

While building cmdfound, I found it painful to read and re-check versions that,
although they met the specs from the outside, duplicated code and drifted away
from the architecture I had defined. So I thought, why not freeze the functions
I had already reviewed, to stabilize the code.
[code-freeze](https://github.com/javier-lopez/learn/blob/master/sh/tools/code-freeze)
is the smallest thing I could build for that.

    _resolve()   { #@reviewed 2026-10-05 m@javier.io 2e226ed
    _lock_free() { #@frozen 2026-10-05 m@javier.io 2e226ed

The tag says who read the function, when, and in which commit. `--check` takes
every signed function, finds its body in that commit and compares it with the
body today. Same body, silence. Anything else:

    $ code-freeze --check
    code-freeze: cmdfound.in _first_catalogs changed since 2e226ed (reviewed 2026-10-09 by m@javier.io)

`--reviewed FILE FUNCTION` writes or refreshes a tag after you read it,
`--frozen` marks the ones that should almost never move, and `--coverage`
counts, per file, what is signed and what drifted.

### It is not a lock

A frozen function can still be changed. Nothing stops the edit; the change just
turns red until I read the new body and sign it again. That changed the job of
the agent: it is free to touch anything, but it has to tell me which signed
functions it touched, because those are the ones I re-read. The cost of a
change became visible instead of forbidden.

### What signing did to cmdfound

[cmdfound](/blog/en/2026/10/27/cmdfound.html) was the first project that went
through it, and signing meant reading every function, one at a time. Read side
by side:

- each channel fetched with its own wrapper around wget or curl, and its own
  idea of retries and partial files;
- the machine was detected per channel under different names: `system` in
  nix-portable, `_platform` in github, for the same question;
- checksums, json reading, temporary files, locks: each a few lines, each
  written again wherever it was needed.

Nothing was wrong, that is why the tests never complained. It only showed up
because I had to approve each copy, and I kept approving the same thing.

The result: 45 `_api_` functions (cmdfound's contract: answers, fetching, what
a valid name or version is) and 21 `_util_` ones (what would read the same in
any shell program), that 18 channel files call 333 times. Later the same
reading collapsed three package formats into one shared runner (`apk`, `rpm`
and `apt` had grown the same catalog code), and the decompression of five
package formats into one function.

### The bug it caught that tests could not

In sh, a second definition of a function silently replaces the first one, for
the whole program. A new `_channel_home` written in a channel would have
shadowed the api's frozen `_channel_home` and changed what every channel
believed its directory was. Tests passed. `--check` refuses a file that defines
a name twice:

    code-freeze: cmdfound defines _channel_home more than once

### Signing in bulk

`--reviewed` refuses a file with uncommitted changes: a tag has to name a
commit that holds the body I read. Signing one function per commit did not
scale to a pass of fifty, so the agent learned to commit first, write all the
tags against that commit, and then prove it with `--check`.

### Takeaways

- Review is a property of a function, not of a pull request. Put it where the
  code lives.
- Make the cost of change visible, not impossible.
- Reading every function is where duplication shows up, and where the real
  understanding is. Tests will not find code that is correct twice.

Happy AI hacking! &#128522;
