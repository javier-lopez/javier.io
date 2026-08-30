---
layout: post
title: "creating launchpad group maps - motu"
tags: [ubuntu, motu]
description: "I\u2019m part of a neat couple of launchpad groups , in the past I\u2019ve seen some contribution maps in open source projects, and I though it would be cool to have s..."
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

I’m part of a [neat][278] couple of [launchpad][279] [groups][280], in the
past I’ve seen some contribution maps in open source projects, and I though it
would be cool to have some of those for lp groups. What follows is the process
for creating static (google) maps for your launchpad group.

[![map][281]][282]

**Marker**

You’ll need a marker (those ubuntu icons in the map), the featured one
is in png 24px × 32px format

**Google Account**

A google account is required, data will be saved in a [Fusion table][284]

**Web Hosting**

You’ll need web hosting if you want your map going online, otherwise, this
process can be replicated locally (for taking screenshots?)

* * *

Map capabilities are possible due to launchpad supporting Time Zone through
its [API][285], it’s not quite exact but it’s better that nothing (if you know
a better place from grabbing localization data please let me know).

I first grab Time Zones from all current members of an specific lp group,
these TZ are sent to a google geocoder (using the great [geopy][286] library)
and saved in a cvs file. The cvs file can then be uploaded to a Fusion table
and requested through javascript (to draw the marks). Hint: I first tried
running everything using only javascript but with large groups (>10 members)
the process took too much time.

<pre class="sh_sh">
wget https://raw.githubusercontent.com/chilicuil/learn/master/sh/tools/lp-g9n-team
sh lp-g9n-team your-lp-group #~ubuntumembers by default
</pre>

These two steps will create a file called **lp-g9n-team.csv** containing the
name, city, latitude and longitude of all your lp group members. Now it can be
uploaded to google, go to [docs.google.com][287] and create a new FusionTable:

[![][288]][289]

*New Fusion Table*

[![][290]][291]

*Export csv file*

[![][292]][293]

*Result*

Fusion Tablets can draw by themselves maps using data from a column of your
data, however I couldn’t find a method to customize the marker art.

For this to work, your dataset will need to be shared to everyone, by default
is private:

[![][294]][295]

*Select File->Share*

[![][296]][297]

*Options in Spanish, select the higher one*

You’ll need to grab the unique ID (will be used in the javascript code):

[![][298]][299]

*File->About this table*

[![][300]][301]

*Copy the ID*

Finally, once your data is online, you can grab this html code:

  * <https://gist.github.com/chilicuil/7478478>

And change the default dataset **1zq9pJyRjZB1FqOcqDhd8lKgCFov6VEDdag4tigQ**
for your own.

  [278]: https://launchpad.net/~ubuntumembers
  [279]: https://launchpad.net/~dholbach-huggers
  [280]: https://launchpad.net/~ubuntu-mars
  [281]: /assets/img/viajemotu-creating-launchpad-group-maps-1.jpg
  [282]: http://people.ubuntu.com/~chilicuil/ubuntumembers-map.html
  [284]: http://www.google.com/drive/apps.html#fusiontables
  [285]: https://help.launchpad.net/API/launchpadlib
  [286]: http://code.google.com/p/geopy/
  [287]: http://docs.google.com/
  [288]: /assets/img/viajemotu-creating-launchpad-group-maps-3.jpg
  [289]: /blog/en/2013/11/14/creating-launchpad-group-maps.htmlfusion/
  [290]: /assets/img/viajemotu-creating-launchpad-group-maps-4.jpg
  [291]: /blog/en/2013/11/14/creating-launchpad-group-maps.htmlupload/
  [292]: /assets/img/viajemotu-creating-launchpad-group-maps-5.jpg
  [293]: /blog/en/2013/11/14/creating-launchpad-group-maps.htmltable/
  [294]: /assets/img/viajemotu-creating-launchpad-group-maps-6.jpg
  [295]: /blog/en/2013/11/14/creating-launchpad-group-maps.htmlshare/
  [296]: /assets/img/viajemotu-creating-launchpad-group-maps-7.jpg
  [297]: /blog/en/2013/11/14/creating-launchpad-group-maps.htmlshare2/
  [298]: /assets/img/viajemotu-creating-launchpad-group-maps-8.jpg
  [299]: /blog/en/2013/11/14/creating-launchpad-group-maps.htmldetails/
  [300]: /assets/img/viajemotu-creating-launchpad-group-maps-9.jpg
  [301]: /blog/en/2013/11/14/creating-launchpad-group-maps.htmldetails2/

Originally published at [viajemotu.wordpress.com](https://viajemotu.wordpress.com/2013/11/14/launchpad-maps/)
