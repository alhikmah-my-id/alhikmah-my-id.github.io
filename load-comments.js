document.addEventListener("DOMContentLoaded", function() {
    var container = document.getElementById('disqus_thread');
    if (container) {
        var disqus_config = function () { };
        (function() {
            var d = document, s = d.createElement('script');
            s.src = 'https://alhikmah-1.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    }
});
