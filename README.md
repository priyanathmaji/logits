# logits

A modern, feature-rich personal blog and portfolio website for technical writing, inspired by professional blogs like [colah's blog](https://colah.github.io/).

## ✨ Features

### Writing Experience
- 📝 **Enhanced Markdown Converter** with live preview
- 🎯 **YAML Front Matter** for easy metadata management
- 📄 **Templates** for quick post creation
- ⚡ **60% faster** blog post creation workflow

### Reader Experience
- 🎨 **Syntax Highlighting** (Highlight.js) - 190+ languages
- 📐 **Math Rendering** (KaTeX) - Fast, beautiful equations
- 💬 **Comments** (Disqus) - Community engagement
- 📚 **Auto Table of Contents** - Easy navigation for long posts
- 📊 **Reading Progress Bar** - Visual feedback
- 📋 **Copy Code Buttons** - One-click code copying
- 🔗 **Footnotes** - Academic-style references
- 🖼️ **Image Lightbox** - Click to enlarge
- 📱 **Responsive Design** - Perfect on all devices
- 🌓 **Dark/Light Themes** - Comfortable reading

## 🚀 Quick Start

1. **Open** `enhanced-blog-converter.html` in your browser
2. **Click** "Load Template" to see an example
3. **Edit** the content with your own
4. **Download** the generated HTML
5. **Save** to the `posts/` folder

That's it! See [QUICK_START.md](QUICK_START.md) for detailed guide.

## 📁 Project Structure

```
logits/
├── enhanced-blog-converter.html    # Advanced markdown-to-HTML converter
├── blog-converter.html             # Original converter
├── comparison.html                 # Before/after comparison
├── styles.css                      # Enhanced styles
├── script.js                       # Interactive features
├── templates/
│   ├── blog-template.md           # Markdown template
│   └── enhanced-post-template.html # HTML template
├── posts/                          # Blog posts
├── images/                         # Images
├── BLOG_ENHANCEMENTS.md           # Full documentation
├── QUICK_START.md                 # Quick reference
└── SUMMARY.md                     # Enhancement summary
```

## 📖 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes
- **[BLOG_ENHANCEMENTS.md](BLOG_ENHANCEMENTS.md)** - Complete feature documentation
- **[SUMMARY.md](SUMMARY.md)** - What's new and why
- **[comparison.html](comparison.html)** - Visual before/after comparison

## 🎯 Use Cases

Perfect for:
- Technical blog posts
- Machine learning tutorials
- Code documentation
- Academic writing
- Project portfolios

## 🛠️ Technologies

- **Markdown**: Marked.js
- **Math**: KaTeX
- **Code**: Highlight.js
- **Comments**: Disqus
- **Styling**: Custom CSS with CSS variables
- **JavaScript**: Vanilla JS (no frameworks)

## 📝 Writing Example

```markdown
---
title: Understanding Neural Networks
date: November 22, 2025
category: Machine Learning
tags: [AI, Deep Learning]
---

# Understanding Neural Networks

Math equations: $E = mc^2$

Code with syntax highlighting:
```python
def train_model():
    print("Training...")
```

Footnotes[^1] for references.

[^1]: This is a footnote.
```

## 🎨 Customization

All styling is controlled through CSS variables in `styles.css`:

```css
:root {
  --accent: #3b82f6;        /* Primary color */
  --bg-primary: #f7f9fc;    /* Background */
  --text-primary: #0b1220;  /* Text color */
}
```

## 🤝 Contributing

This is a personal project, but feel free to:
- Use as inspiration for your own blog
- Fork and customize
- Report issues
- Suggest improvements

## 📜 License

MIT License - Feel free to use for your own projects!

## 🙏 Acknowledgments

Inspired by:
- [colah's blog](https://colah.github.io/) - Exceptional technical writing
- Bootstrap - Responsive design patterns
- Various open-source libraries

## 🔗 Links

- [Live Demo](comparison.html) - See before/after comparison
- [Enhanced Converter](enhanced-blog-converter.html) - Try it now

---

**Made with ❤️ for better technical blogging**
