import os
import re

# Get all HTML files in the posts directory
posts_dir = 'posts'
html_files = [f for f in os.listdir(posts_dir) if f.endswith('.html')]

# Old and new navbar patterns
old_pattern = r'<a href="../index\.html" class="nav-brand">Priyanath Maji</a>'
new_navbar = '''<a href="../index.html" class="nav-brand">
                <img src="../images/logx.PNG" alt="logits">
                <span>logits</span>
            </a>'''

updated_count = 0
skipped_count = 0

for filename in html_files:
    filepath = os.path.join(posts_dir, filename)
    
    # Read the file
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if it needs updating
    if 'Priyanath Maji</a>' in content and 'nav-brand' in content:
        # Replace the old navbar with new
        new_content = re.sub(old_pattern, new_navbar, content)
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f'✓ Updated: {filename}')
        updated_count += 1
    else:
        print(f'- Skipped: {filename} (already updated or no match)')
        skipped_count += 1

print(f'\nSummary:')
print(f'Updated: {updated_count} files')
print(f'Skipped: {skipped_count} files')
