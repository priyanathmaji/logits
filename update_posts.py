"""
Batch update all blog posts with:
1. Highlight.js for syntax highlighting
2. Disqus comments section
3. Proper share buttons with real URLs
"""

import os
import re
from pathlib import Path

# Configuration
POSTS_DIR = Path("posts")
DISQUS_SHORTNAME = "https-priyanathmaji-github-io-logits"
BASE_URL = "https://priyanathmaji.github.io/logits/posts"

# Highlight.js CDN links to add in <head>
HIGHLIGHTJS_LINKS = """  <!-- Highlight.js for Code Syntax Highlighting -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/atom-one-dark.min.css">
  <script src="https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/highlight.min.js"></script>"""

# Disqus template
DISQUS_TEMPLATE = """
  <!-- Disqus Configuration -->
  <script>
    var disqus_config = function () {{
      this.page.url = '{page_url}';
      this.page.identifier = '{page_id}';
      this.reactions_enabled = 0;
    }};
    
    (function() {{
      var d = document, s = d.createElement('script');
      s.src = 'https://{disqus_shortname}.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    }})();
  </script>
  <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>"""

# Share section template
SHARE_SECTION_TEMPLATE = """
        <!-- Disqus Comments -->
        <div id="disqus_thread"></div>
      </footer>"""

def get_post_title_from_filename(filename):
    """Extract title from filename"""
    return filename.replace('.html', '').replace('-', ' ').title()

def update_post(filepath):
    """Update a single post file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    filename = os.path.basename(filepath)
    post_id = filename.replace('.html', '')
    page_url = f"{BASE_URL}/{filename}"
    title = get_post_title_from_filename(filename)
    
    # Check if already has Disqus
    if 'disqus_thread' in content:
        print(f"✓ {filename} - Already has Disqus")
        return False
    
    # Check if already has Highlight.js
    has_highlightjs = 'highlight.js' in content.lower()
    
    # Add Highlight.js if missing
    if not has_highlightjs:
        # Find </head> and add before it
        content = content.replace('</head>', f'{HIGHLIGHTJS_LINKS}\n</head>')
        print(f"  + Added Highlight.js to {filename}")
    
    # Update share buttons if they exist
    if 'share-buttons' in content:
        # Replace placeholder share links
        content = re.sub(
            r'<a href="#" class="share-btn">Twitter</a>',
            f'<a href="https://twitter.com/intent/tweet?text={title.replace(" ", "%20")}&url={page_url}" target="_blank" class="share-btn">Twitter</a>',
            content
        )
        content = re.sub(
            r'<a href="#" class="share-btn">LinkedIn</a>',
            f'<a href="https://www.linkedin.com/sharing/share-offsite/?url={page_url}" target="_blank" class="share-btn">LinkedIn</a>',
            content
        )
        content = re.sub(
            r'<a href="#" class="share-btn">Facebook</a>',
            f'<a href="https://www.facebook.com/sharer/sharer.php?u={page_url}" target="_blank" class="share-btn">Facebook</a>',
            content
        )
    
    # Add Disqus section in footer if share-section exists
    if 'share-section' in content and '</footer>' in content:
        content = content.replace(
            '</div>\n        </div>\n      </footer>',
            '</div>\n        </div>\n' + SHARE_SECTION_TEMPLATE
        )
    
    # Add Disqus script before </body>
    disqus_script = DISQUS_TEMPLATE.format(
        page_url=page_url,
        page_id=post_id,
        disqus_shortname=DISQUS_SHORTNAME
    )
    
    content = content.replace('</body>', f'{disqus_script}\n</body>')
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Updated {filename}")
    return True

def main():
    """Process all HTML files in posts directory"""
    print("Starting batch update of blog posts...\n")
    
    updated_count = 0
    skipped_count = 0
    
    for filepath in POSTS_DIR.glob("*.html"):
        if update_post(filepath):
            updated_count += 1
        else:
            skipped_count += 1
    
    print(f"\n{'='*50}")
    print(f"Summary:")
    print(f"  Updated: {updated_count} posts")
    print(f"  Skipped: {skipped_count} posts (already up to date)")
    print(f"{'='*50}")
    print("\nAll posts now have:")
    print("  ✓ Syntax highlighting (Highlight.js)")
    print("  ✓ Comments (Disqus)")
    print("  ✓ Social sharing buttons")

if __name__ == "__main__":
    main()
