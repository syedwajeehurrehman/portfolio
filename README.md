# Syed Wajeeh Ur Rehman — Portfolio & Digital Business Card

A one-page portfolio built with React, TypeScript and Vite. No backend, no database, no API keys.

## Run it on Windows

1. Install **Node.js 20 or newer** (LTS) from https://nodejs.org (accept the defaults).
2. Open this folder in File Explorer, click the address bar, type `cmd` and press Enter.
3. Run:

   ```
   npm install
   npm run dev
   ```

4. Open the address it prints (usually http://localhost:5173). Edits you save appear instantly.

To create the production version: `npm run build` (output goes to the `dist` folder). `npm run preview` serves that build locally.

## Put it online (free)

**Netlify Drop (simplest, no account setup beyond sign-in)**
1. Run `npm run build`.
2. Go to https://app.netlify.com/drop and drag the `dist` folder onto the page.
3. Netlify gives you a public URL. In Site settings you can rename it (e.g. `syedwajeeh.netlify.app`) or connect your own domain.

**Vercel or Netlify via GitHub (auto-updates on every change)**
1. Push this folder to a GitHub repository.
2. Import the repo on https://vercel.com or https://netlify.com. Build command `npm run build`, output folder `dist` (both detect Vite automatically).

**After you have a permanent URL**
- Copy `.env.example` to a new file named `.env`, set `VITE_SITE_URL=https://your-address` (no trailing slash), then rebuild/redeploy. On Vercel/Netlify, add the same variable in the project's environment settings instead. This makes the social preview image and canonical link absolute, which LinkedIn, WhatsApp and X need.
- **QR code:** generate one only after the URL is final, so printed cards never point to a dead link. Any reputable generator works (for example https://www.qr-code-generator.com or the QR option in Chrome's share menu: right-click the page → "Create QR code for this page"). Test it with your phone before printing.

## Updating your details (admin panel)

Open **`/admin`** on your live site (e.g. `https://your-site.netlify.app/admin/`) and sign in with GitHub. Only GitHub accounts with write access to this repository can sign in or save.

From there you can edit:
- **Profile & contact details**: name, role, headline, intro, email, phone/WhatsApp, Behance, location, availability badge
- **Services**: add, remove, reorder, change the text
- **Portfolio projects**: add a Behance project, upload or paste a cover image, choose which are featured
- **About**: paragraphs, portrait photo, experience list, tools
- **Process, strengths & form**: approach steps, "Why work with me" points, enquiry form project types

Press **Publish** and the change is saved to GitHub. The host then rebuilds the site, and the update is live in about a minute. The vCard, page title, description and structured data all update from your profile automatically.

**Using the admin on your own computer** (no sign-in needed): run `npm run dev` in one terminal and `npx decap-server` in a second terminal, then open http://localhost:5173/admin/index.html. Edits are written straight into the `content/` files.

### Editing by hand
All content lives in `content/*.json`. Colours, fonts and spacing are tokens at the top of `src/index.css`. The social preview image is `public/og-image.png` (1200×630).

## How the contact form works
There's no server, so the form doesn't pretend to send anything. "Compose email" opens the visitor's email app with the subject and message pre-filled; "Send via WhatsApp" opens WhatsApp with the same text. The page tells visitors this. If you later want messages delivered without the visitor's email app, a form service such as Formspree or Netlify Forms can be added; both need you to create an account.

## Notes
- Fonts (Inter, Inter Tight, JetBrains Mono) are self-hosted via Fontsource under the SIL Open Font License.
- Animations respect the "reduce motion" accessibility setting.
