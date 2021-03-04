This project was made with [Next.js](https://nextjs.org/).
</br>
Deployed on [Vercel](https://harmful-additives.vercel.app/)

## Tech Stack:
<ul>
  <li>Nextjs (Reactjs and Nodejs)</li>
  <li><a target="_blank" rel="noopener noreferrer" href="https://tesseract.projectnaptha.com/">Tesseractjs</a></li>
  <li><a target="_blank" rel="noopener noreferrer" href="https://material-ui.com/">Material Ui</a></li>
  <li>Python</li>
  <li>Mongodb</li>
</ul>

## Overview:
This is a project i started that I no longer have the time for so I made it public to demonstrate my React skills since its mostly front end code.
</br>
It is meant to help you find any harmful additives that are in your food. You can either search multiple items by manually typing out the name and hitting enter to add it to the search. Then clicking search to search my mongodb database. 
</br>
You can also upload an image and using Tesseractjs I can extract the text from the ingredient list and then you can search.
</br>
Works best with no more than 5 searches at once.

</br>
Look in ./data for txt files with the data you can search. I use a python script to generate a json file that gets inserted into my mongodb.
