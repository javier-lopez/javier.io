/* Self-hosted asciinema playback.
 *
 * The recording lives in this repo, gzipped, under assets/<domain>/casts/
 * — mirroring the source it was archived from. The post used to embed
 * asciinema.org's own <script>, which makes the recording hostage to that
 * service: showterm.io died and took 14 embedded recordings with it, and
 * the Wayback Machine has a copy of none of them.
 *
 * Why the file is stored gzipped rather than plain: GitHub Pages already
 * compresses text on the wire (measured: search.json 587K -> 205K), so a
 * plain .json would reach the reader at the same 143K. Storing the .gz
 * buys nothing for the visitor — it keeps 1.4MB out of the repository,
 * which is the whole reason for the ten lines below.
 *
 * Usage, in a post:
 *   <div class="asciinema-cast"
 *        data-cast="/assets/asciinema.org/casts/132191.json.gz"
 *        data-start-at="10"></div>
 */
(function () {
  var nodes = document.querySelectorAll('.asciinema-cast');
  if (!nodes.length) return;

  var fail = function (el, href) {
    var p = document.createElement('p');
    p.className = 'asciinema-fallback';
    var a = document.createElement('a');
    a.href = href;
    a.textContent = 'Ver la grabación en asciinema.org';
    a.rel = 'noopener';
    p.appendChild(a);
    el.appendChild(p);
  };

  var load = function (el) {
    var src = el.getAttribute('data-cast');
    var away = el.getAttribute('data-fallback') || 'https://asciinema.org/';

    fetch(src)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.arrayBuffer();
      })
      .then(function (buf) {
        var head = new Uint8Array(buf, 0, Math.min(2, buf.byteLength));
        // Sniff the gzip magic number instead of trusting Content-Encoding.
        // A .gz is served as application/gzip with no encoding header, so
        // the bytes arrive compressed and we inflate them here — but if a
        // CDN ever decides to mark it Content-Encoding: gzip, fetch would
        // have inflated it already and inflating twice would throw. The
        // first two bytes answer that without guessing.
        if (head[0] !== 0x1f || head[1] !== 0x8b) {
          return new Response(buf).text();
        }
        if (typeof DecompressionStream !== 'function') {
          throw new Error('no DecompressionStream');
        }
        var stream = new Blob([buf]).stream()
          .pipeThrough(new DecompressionStream('gzip'));
        return new Response(stream).text();
      })
      .then(function (text) {
        // The player takes a URL, and an object URL is one — which sidesteps
        // needing its in-memory source API and keeps this working across
        // player versions.
        var url = URL.createObjectURL(
          new Blob([text], { type: 'application/json' }));
        var opts = { fit: 'width' };
        var at = el.getAttribute('data-start-at');
        if (at) opts.startAt = Number(at);
        var poster = el.getAttribute('data-poster');
        if (poster) opts.poster = poster;
        AsciinemaPlayer.create(url, el, opts);
      })
      .catch(function () { fail(el, away); });
  };

  Array.prototype.forEach.call(nodes, load);
})();
