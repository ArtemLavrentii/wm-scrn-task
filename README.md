# Minimalistic article display

Framework-less minimalistic display.
Uses webpack & babel just to get nice features of ES6&small size, while supporting all "modern-ish" browsers

## How to run
### Dev
```shell script
    npm start # Starts up webpack-dev-server
``` 

### Prod
```shell script
    npm build # And then open up build/index.html
```

## Tehnical info
This is a simple parser of `page/metadata/` that sends requests to respective wikipedia.

List of all wiki's languages was taken from https://en.wikipedia.org/wiki/List_of_Wikipedias, and language properties were taken from https://en.wikipedia.org/wiki/ISO_15924 ( mostly if it's RTL or LTR language ). This method isn't ideal, as some scripts ( Like Japanese ) could have multiple directions.

Data was parsed with <3 by https://wikitable2csv.ggor.de/ . 

## Small note
By default only first 10 languages are displayed. To change this behaviour "mad-mode" could be turned on in the config. This is due to the fact that this FE always displays all possible languages, even when page isn't available in that language. This was done intentionally to be compliant with task definition. 

