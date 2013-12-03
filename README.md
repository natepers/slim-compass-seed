#Slim Compass Project Seed

A minimal project seed for getting started quickly using **Slim** erb and **SCSS**.

This project uses Node.js &amp; Grunt to compile SCSS & Slim in your development environment. There are addtional modules **commented out of the Gruntfile.js** for `JS linting`, automated testing with `Mocha`, compiling `Coffee Script` and using `JST templates`. These extra features may not be implemented correctly for your project.

By default we're also using [Jquery](http://jquery.com/), [Normalize](https://github.com/necolas/normalize.css), [HTML5 Biolerplate](http://html5boilerplate.com/) &amp; [Modernizr](http://modernizr.com/).

Also, there's no build process as of yet.

#####SCSS#####
By default we're including `SASS mixins` from [Bourbon](http://bourbon.io/docs/). Be sure to [visit the documentation](http://bourbon.io/docs/) for a full ist of available mixins.

#####Third Party Libraries &amp; Frameworks#####
These should be installed using Bower [http://bower.io/](http://bower.io/) and can be found in the `app/vendor/` directory by default.

## Setup 

#### Setup your environment

the following commands are from OSX may need to be adapted for other operating systems

1. **Homebrew**  
	- More info @ [http://brew.sh/](http://brew.sh/)  -or-  use an OS package manager of your choice 
2. **RVM** 
	- More info @ [http://rvm.io/rvm/install](http://rvm.io/rvm/install)
3. **Ruby**      ~1.9.2**
	- ````$ rvm install 1.9.2 ````
	- ````$ rvm use 1.9.2````
4. **Compass**  
	- ````$  gem install compass````
5. **Slim**   
	- ````$  gem install slim````
6. **Node**   
	- ````$ brew install node````
7. **NPM**  
	- Should have been installed with Node
8. **Bower**   
	- ````$ npm install bower -g````
9. **Grunt**   
	- ````$ npm install grunt -g````
10. **Grunt Command Line Interface**   
	- ````$ npm install grunt-cli -g````


#### Setup the project

Once you have all of that stuff just run the following from the project's root folder.

1. ````$ npm install````      
	- installs all of the packages in package.json
2. ````$ bower install````    
	- installs all the stuff in bower.json


#### Launch the server &amp; watch tasks 

1. ````$grunt server````     
	- compiles slim & scss, launches a server and watches for updates to js, scss, css, slim & html

