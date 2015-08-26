# NerdBook Studio
Easy way to create an epub, pdf, mobi, html... writing in markdown with the power of Pandoc and KindleGen.

## Install
```zsh
$ git clone https://github.com/orggue/nerdbook-studio.git
$ cd nerdbook-studio
```
## Run
This will create the .tmp/ and public/ folder, in the future it will allow you to choose the input file between markdown, latex ... and some global variables. 
```zsh
$ npm start
```
To have a preview of what are you writting just tipe in the console:
```zsh
$ gulp
```
Some of the outputs:
```zsh
$ gulp word
$ gulp pdf
$ gulp epub
$ gulp publish      # this will create a word, a pdf and a epub
```
## Structure
```zsh
.
├── .tmp            #Temporal files folder
│   ├── web
│   │   └── index.html
│   ├── book.full.tex
│   └── title.txt
├── book             #Studio directory
│   ├── chapters     #Folder with all chapters, each chapter in a seperate file
│   │   └── 01-Chapter 1.tex
│   └── title.txt    #Metadata for the epub output
├── gulpfile.js
├── init.js
├── package.json
├── public           #output folder
│   ├── book.docx
│   ├── book.epub
│   └── book.pdf
└── README.md
```