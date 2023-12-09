# COMP 1800 Project - LocalEco
![GitHub Logo](https://github.com/leozheng0901/1800_202330_BBY06/blob/main/images/icons/logo.png)

## 1. Project Description
LocalEco is a lightweight map web application that guides users to the nearest recycling spots around them. It also features a section that provides facts on recycling, and a reward system that motivates users to recycle regularly.

## 2. Names of Contributors
Short description of our contributors:

* Hi, I'm Jimmy Kong and I contributed to the Map, Rewards, and Profile features of this web application.
* Hi, I'm Leo Zheng and I contributed to the UI design, Navigation, and Search features of this web application.
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML 5, CSS
* JavaScript
* Bootstrap 5.0
* Firebase Version 8 (Authentication, Firestore, Storage, Hosting)
* MapBox API

## 4. Complete setup/installion/usage

### Set up / Installion
> [!TIP]
> Here are the steps to get a copy of our source code
* Fork your own copy of our project
* Create a local directory on your machine and get to that directory by using `cd <local directory>`
* Type `git clone <Github link of your forked copy>` to the command line

### Usage
> [!TIP]
> Here are the steps when you want to use our app
* Login our page with your own email and password
* Click on search button to use our map
* Follow the map and go to the recycling bin with a red pin on the map
* Click on "Start Recycling" button when you have reached there

## 5. Known Bugs and Limitations
> [!CAUTION]
> Here are some known bugs and limitations:
- Users might see duplicate history records of the same location now in their history page and we'll fix this soon!
- Users might find search page takes a few seconds to load. Please be patient at this moment and we'll fix this soon!
- Users might redeem level 1 recycling rewards only at this moment, we'll include more levels of rewards soon!

## 6. Features for Future
What we'd like to build in the future:
* Language page that support more than five languages
* App Localization to support users over the globe by adding more recycling data to Firestore database
* Currently, there's only Level 1 rewards. More rewards will be released very soon
	
## 7. Contents of Folder
Content of the project folder:

```

 Top level of project folder: 
├── .gitignore                       # Git ignore file
├── index.html                       # landing HTML file, this is what users see when you come to url
├── login.html                       # login HTML file, the log-in page
├── main.html                        # main HTML file, the landing page after 
├── map.html                         # map HTML file, the map users see after they have clicked on the "search cards" on search.html 
├── profile.html                     # profile HTML file, the page that displays users' profile
├── history.html                     # history HTML file, the page that displays users' recycling history record
├── language.html                    # language HTML file, the page that allows users to switch the app's display language
├── rewards.html                     # rewards HTML file, the page that allows users to redeem rewards after they have accumulated enough points
├── search_info.html                 # information HTML file, the page that allows users to see more information about the recycling locations
├── search.html                      # search HTML file, the page that allows users to search nearest recycling bins around them
├──
log-in or user set-up
└── README.md                        # woah, you're reading this now!

It has the following subfolders and files:
├── .git                             # Folder for git repo
├── images                           # Folder for images
        /icons
            /icon1.jpg
            /main_icon.png
            /logo.png
        /Aluminum_Containers.png
        /border.png
        /can.png
        /Cartons-and-Paper-Cups.png
        /emoji1.png
        /emoji2.png
        /emoji3.png
        /emoji4.png
        /emoji5.png
        /epa_report.jpg
        /Flexible-Plastic.png
        /flower_border.png
        /Glass_Containers.png
        /glass.png
        /interview.jpg
        /joe_biden.jpg
        /Paper-Packaging.png
        /Paper.png
        /Plastic-Containers.png
        /SE02.jpg
        /SE06.jpg
        /Steel_Containers.png
        /SW02.jpg
        
├── scripts                          # Folder for scripts
        /account.js                  # JS for account.html
        /authentication.js           # firebase API stuff, shared across pages
        /facts.js                    # JS for facts.html
        /header.js                   # JS for header template
        /history.js                  # JS for history.html
        /language.js                 # JS for language.html
        /main.js                     # JS for main.html
        /profile.js                  # JS for profile.html
        /rewards.js                  # JS for rewards.html
        /search_Info.js              # JS for search_info.html
        /search.js                   # JS for search.js
        /skeleton.js                 # JS for skeleton file

├── styles                           # Folder for styles
        /style.css                   # stylesheet shared across pages

├── text                             # Template files, shared across all HTML pages
        /fonts                       # stylesheet, shared across
            /VarelaRound-Regular.ttf # Google font
        /footer.html                 # footer template, shared across all html files
        /header.html                 # header template, shared across all html files
        /nav_after_login             # Naviagtion Bar template after login, shared across all html files
        /nav_before_login            # Navigation Bar template before login, shared across all html files

Firebase hosting files: 
├── .firebase
	/hosting..cache
├── .firebaserc
├── 404.html
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── storage.rules

```

## 8. Resources
- In-app icons from Feather v4.28.0 (Open Source https://feathericons.com/)
- LocalEco homemade Logo!
- (Source: https://fonts.google.com/specimen/Varela+Round)
- Free images Irasutoya (Source: https://www.irasutoya.com)

## 9. Contact 
* Jimmy Kong - tkong23@my.bcit.ca
* Leo Zheng - lzheng41@my.bcit.ca

## 10. Acknowledgements 
* <a href="https://fontawesome.com/">Font Awesome</a>
* <a href="https://fonts.google.com/">Google Fonts</a>
* <a href="https://getbootstrap.com/">Bootstrap</a>
* <a href="https://www.mapbox.com">Mapbox</a>




