# AnnouncementsBot

---

Discord Bot for Hack_NCState's annual hackathon.
Check out our [website](https://hackncstate.org/).

---

## How to add announcements for a new year

1. Create a google sheet with a list of announcements with the following columns:
```
date time type title description location eventTime URL thumbnailURL imageURL
```
2. the code will only read in the range `A2:J`, if you want to add more info columns, update this in the code
3. location, time, and URLs are optional
4. Copy the sheets ID (the part of the URL after `https://docs.google.com/spreadsheets/d/` and before `/edit`)

---

## How to run the bot

1. clone the repo locally
2. create a Google Cloud application and enable the sheets API, download the auth file, and place it in the repo
3. edit the `.env.example` file by adding the bot token and other necessary config data and renaming it to `.env`
4. in a terminal, run `npm run start` or `npm run dev` (if you're actively developing)

---
