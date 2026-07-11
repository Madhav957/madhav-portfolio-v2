# Madhav Jayanti — Portfolio

Dark, terminal-inspired personal portfolio for a Cloud Engineering / AWS / Backend student.

## Structure
```
index.html        Main page (all sections)
css/style.css      Design tokens + all styling, responsive
js/script.js       Typing animation, animated CLI terminal, scroll reveals, nav, contact form
assets/            Put your resume PDF here (Madhav_Jayanti_Resume.pdf) and any images
```

## To customize
- Replace `madhavjayanti` in the GitHub stats image URLs (in the GitHub section of index.html) with your real GitHub username.
- Update the `mailto:`, GitHub, and LinkedIn links (hero + contact section).
- Add your real project repo/demo links in the Featured Project and Other Projects sections.
- Drop your resume PDF into `assets/Madhav_Jayanti_Resume.pdf`.
- The contact form currently only shows a local confirmation message — wire `js/script.js`'s `initContactForm()` up to a real endpoint (e.g. Formspree, or API Gateway + Lambda + SES) to actually receive messages.

## Run locally
Just open `index.html` in a browser, or serve the folder:
```
python3 -m http.server 8000
```
