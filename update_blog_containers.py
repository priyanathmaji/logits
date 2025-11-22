import os
import re

# Get all HTML files in the posts directory
posts_dir = 'posts'
html_files = [f for f in os.listdir(posts_dir) if f.endswith('.html')]

# Pattern to find and replace
old_pattern = r'<main class="container">'
new_pattern = '<main class="blog-container">'

updated_count = 0

for filename in html_files:
    filepath = os.path.join(posts_dir, filename)
    
    # Read the file
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the container class
    if old_pattern in content:
        new_content = content.replace(old_pattern, new_pattern)
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f'✓ Updated: {filename}')
        updated_count += 1
    else:
        print(f'- Skipped: {filename} (no match)')

print(f'\nTotal updated: {updated_count} files')
