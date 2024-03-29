# CodeSamples

Hello there, here you will find some code samples of my portfolio and if you want to see it in action feel free to have a look at: https://maiknothbaum.eu/ 
This is the most recent coding project I worked on in my freetime in preparation for my job search. 

# backgroundAnimation

Just a fun visual feature for the website. Can be extended with behaviour but I had to move on and finish the rest of the portfolio stuff like the CMS or the deployment on the server. Currently you can choose between the triangle and circle shape. Only behaviour implemented is the click and drag.

The nice aspect of the code is that it is written in a modular way that multiple sketches can exists at the same time to eventually link certain events on pages to the sketch: e.g. clicking multiple times within a cetain time rage creates an extra sketch etc.

To run:
In the folder "backgroundAnimation" open "main.html" in your browser



# XML based content management system:
Python code has been modified so it can run locally to show that an xml can be unwrapped. In the folder "DjangoTemplates" you will find my try to create a template structure to display the content for the webite. It was my first time using Django and building some sort of CMS so of course there are things I would do differently now, for instance using the Django models and the wagtail CMS.

To run:
Run the "main.py". You might need to install missing packages and since it was developed on linux there could be some hickups when is comes to the path string on Windows OS.

How it works:
Most is described on the project page itself: https://maiknothbaum.eu/Portfolio/
In the folder you can check the XML file and see the structure that being used. When the projects are loaded they get passed on to the Django page rendering as a dict. The html files in the folder "DjangoTemplates" are embedded in the main html of the django app. From there on the content loaded from the xml is being styled as page elements using the templates in "DjangoTemplates/templates"
