# NerdBook Studio
Easy way to create an epub, pdf, mobi, html... writing in markdown with the power of Pandoc and KindleGen.
## Dependencies
+ [node](https://nodejs.org/)

If you only want to convert to PDF you don't need pandoc
+ [pandoc](http://pandoc.org/installing.html)

if you are a linux user, you maybe need to install libnotify-bin to get the
notifications system.
```zsh
$ sudo apt-get install libnotify-bin
```
## Download
```zsh
$ git clone https://github.com/orggue/nerdbook-studio.git
```
or download the .zip file [from here](https://github.com/orggue/nerdbook-studio/archive/master.zip).
## Install
```zsh
$ git clone https://github.com/orggue/nerdbook-studio.git
$ cd nerdbook-studio & rm -rf .git/ & rm .gitignore
$ npm install
```
## Run
This will create the .tmp/ and public/ folder, in the future it will allow you to choose the input file between markdown, latex ... and some global variables. 
```zsh
$ node init.js
```
To have a preview of what are you writting just type in the console:
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
## Templates
Now with the update (2015-12-09) you have a cool interactive menu to choose the name of the final book, language, write a pdf/word or an ebook and the layout of your project.
![config](http://nas.jorgechato.com/git/NBS/4.png)
![init](http://nas.jorgechato.com/git/NBS/5.png)
![pdf](http://nas.jorgechato.com/git/NBS/6.png)
![epub](http://nas.jorgechato.com/git/NBS/7.png)
### Examples
+ [base](https://github.com/orggue/nerdbook-studio/blob/master/examples/base.pdf)
+ [brain](https://github.com/orggue/nerdbook-studio/blob/master/examples/brain.pdf)
+ [team](https://github.com/orggue/nerdbook-studio/blob/master/examples/team.pdf)

## Structure
```zsh
.
├── .tmp            #Temporal files folder
│   ├── web
│   │   └── index.html
│   ├── book.full.tex
│   └── title.yaml
│   └── ...
├── book             #Studio directory
│   ├── chapters     #Folder with all chapters, each chapter in a seperate file
│   │   └── 01-Chapter 1.tex
│   ├── metadata     #Personal information and link to packages/style
│   │   ├── footer.tex
│   │   └── header.tex
│   ├── notes        #Plus files
│   │   ├── glossary.tex
│   │   ├── mr.tex
│   │   ├── notat.tex
│   │   └── refs.tex
│   └── title.yaml   #Metadata for the epub output
├── gulpfile.js
├── images           #add as much folders as you want, just remember inject it properly
│   └── 0.jpg
├── init.js
├── lib              #External packages
│   └── styles       #Custom styles
├── package.json
├── public           #output folder
│   ├── book.docx
│   ├── book.epub
│   └── book.pdf
└── README.md

```
## How to use
You only need to focus in book/ folder. It is made so you can focus in write your book and nothing else.
After you install it and run it you can start editing your book.
First you should change the title.yaml, header.tex and footer.tex with your personal information and needs.
In notes/ folder you have some empty files if you want to add a glossary, references... but you can add new files if you want. Make sure if you add new files you had to include it in the file you want it "as you can see in footer.tex". ex:
```latex
\include{glossary} 
```
### Recommendation
The chapters are in chapters/ folder, you can add as many as you want. I recomend to rename it starting with the number of the chapter, otherwise can be render in a wrong order. I recomend 3 digits, ex: 001-chaptername.tex, 002-chaptername.tex
### Add images
As you know, you can import images in your book typping:
```latex
\includegraphics{./images/0.jpg}
```
if you want to create different folders to each chapter, create it inside images/ folder and remember import it properly.
```latex
\includegraphics{./images/chapter-1/0.jpg}
```
## External packages and custom style
If you want to add a package do it into /lib folder and remember to add in header.tex:
```latex
\usepackage{packagename}
```
You also have a folder styles/ if you want to create your own style. Remember checking header.tex:
```latex
%Create your own file, mystyle.sty where you put all your own \newcommand statements, for example.
\usepackage{mystyle}
```
## Screenshot
![config](http://nas.jorgechato.com/git/NBS/0.png)
![init](http://nas.jorgechato.com/git/NBS/1.png)
![pdf](http://nas.jorgechato.com/git/NBS/2.png)
![epub](http://nas.jorgechato.com/git/NBS/3.png)
