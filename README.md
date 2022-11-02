:warning: Nextcloud 26 is shipping an outdated browser warning page.
This app is therefore archived.

# 🌍 Browser warning

This app will show a warning on specific browser conditions on the log-in page

:woman_mechanic: See inside `/src/rules.js` to see what rules exists and how you can add some.

![screenshot-01-16_18-29-04](https://user-images.githubusercontent.com/14975046/51266875-ab4ce480-19bc-11e9-83eb-d6cf0a05cadf.png)



## 🏗 Development setup

1. ☁ Clone this app into the `apps` folder of your Nextcloud: `git clone https://github.com/nextcloud/browser_warning.git`
2. 👩‍💻 In the folder of the app, run the command `npm ci && npm run dev` to install dependencies and build the Javascript.
3. ✅ Enable the app through the app management of your Nextcloud
4. 🎉 Partytime! Help fix [some issues](https://github.com/nextcloud/browser_warning/issues) and [review pull requests](https://github.com/nextcloud/browser_warning/pulls) 👍


### 🧙 Advanced development stuff

To build the Javascript whenever you make changes, you can also use `npm run build`. Or `npm run watch` to automatically rebuild on every file save.
