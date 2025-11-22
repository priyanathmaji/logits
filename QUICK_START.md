# Quick Start Guide - Enhanced Blog System

## 🚀 Getting Started in 3 Steps

### Step 1: Open the Enhanced Converter
Open `enhanced-blog-converter.html` in your browser

### Step 2: Write Your Post
Click "Load Template" to see an example, then edit with your content

### Step 3: Generate & Save
Click "Download HTML" and save to the `posts/` folder

---

## ✍️ Writing Markdown with Front Matter

### Basic Structure
```markdown
---
title: Your Amazing Blog Post
date: November 22, 2025
category: Machine Learning
description: What this post is about
---

# Your Amazing Blog Post

Your content here...
```

---

## 📚 Common Patterns

### Headers
```markdown
# Main Title (H1) - Used once
## Section (H2)
### Subsection (H3)
```

### Text Formatting
```markdown
**bold text**
*italic text*
`inline code`
```

### Links & Images
```markdown
[Link text](https://example.com)
![Image description](../images/photo.jpg)
```

### Code Blocks
````markdown
```python
def hello():
    print("Hello, world!")
```
````

### Math
```markdown
Inline: $E = mc^2$

Display:
$$
\frac{\partial L}{\partial w} = \frac{\partial L}{\partial a} \cdot \frac{\partial a}{\partial z}
$$
```

### Footnotes
```markdown
This needs citation[^1].

[^1]: This is the footnote text.
```

### YouTube Videos
```markdown
[youtube:VIDEO_ID_HERE]
```

### Tables
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

### Blockquotes
```markdown
> This is a quote
> - Author Name
```

---

## 🎨 Features You Get Automatically

✅ **Syntax highlighting** for code  
✅ **Table of contents** (if 3+ headings)  
✅ **Reading progress bar**  
✅ **Copy code buttons**  
✅ **Math rendering**  
✅ **Footnote links**  
✅ **Image lightbox**  
✅ **Social sharing buttons**  
✅ **Comment section** (after Disqus setup)  

---

## ⚙️ One-Time Setup: Disqus Comments

1. Go to https://disqus.com and create account
2. Click "Get Started" → "I want to install Disqus on my site"
3. Choose a unique shortname (e.g., `myblog`)
4. In your HTML posts, find this line:
   ```javascript
   s.src = 'https://YOUR-DISQUS-SHORTNAME.disqus.com/embed.js';
   ```
5. Replace `YOUR-DISQUS-SHORTNAME` with your shortname

---

## 📝 Workflow

### Creating a New Post

1. **Plan**: Outline your post structure
2. **Write**: Use `enhanced-blog-converter.html`
3. **Preview**: Check the live preview panel
4. **Download**: Save HTML to `posts/` folder
5. **Add to Blog**: Copy blog card HTML to `blog.html`

### Updating an Existing Post

1. **Open**: The post HTML in editor
2. **Edit**: The content section
3. **Save**: Changes
4. **Test**: Open in browser

---

## 🎯 Tips for Great Posts

### Do's ✅
- Start with clear front matter
- Use descriptive headings
- Add code examples
- Include images/diagrams
- Use footnotes for extra info
- Break up long paragraphs
- Add a conclusion

### Don'ts ❌
- Skip the front matter
- Use vague titles
- Forget image alt text
- Leave code uncommented
- Make walls of text
- Forget to proofread

---

## 🔍 Testing Checklist

Before publishing, check:

- [ ] Title and metadata correct
- [ ] All images load
- [ ] Math renders properly
- [ ] Code highlights correctly
- [ ] Links work
- [ ] Footnotes jump to/from correctly
- [ ] Responsive on mobile
- [ ] Dark/light themes work

---

## 📂 File Locations

- **Templates**: `templates/blog-template.md`
- **Converter**: `enhanced-blog-converter.html`
- **Posts**: `posts/your-post.html`
- **Images**: `images/`
- **Styles**: `styles.css`
- **Scripts**: `script.js`
- **Docs**: `BLOG_ENHANCEMENTS.md`

---

## 🆘 Quick Troubleshooting

**Math not showing?**  
→ Check `$` delimiters are correct

**Code not colored?**  
→ Add language after triple backticks: ```python

**TOC not appearing?**  
→ Need at least 3 headings (## or ###)

**Image too large?**  
→ Resize before uploading (recommended max: 1200px wide)

---

## 🔗 Useful Links

- [Markdown Cheatsheet](https://www.markdownguide.org/cheat-sheet/)
- [KaTeX Supported Functions](https://katex.org/docs/supported.html)
- [Highlight.js Languages](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md)
- [Full Documentation](BLOG_ENHANCEMENTS.md)

---

**Happy Blogging! 🎉**

Remember: The enhanced converter is your friend. Use it to experiment and see what works!
