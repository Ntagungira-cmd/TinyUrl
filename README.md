# TinyUrl
This repository contains both the client and server of the application  
## How to Run:  
### Server 
* Build application in exploded form: ``` mvn springboot:run ```  
* You can also run it as a container like this:  
  * build an image ``` docker build -t tinyurl . ```
  * create a container from the image ``` docker run -p 8080:8080 tinyurl ```
* To run the Tests: ``` mvn test ``` or use your intellij IDE  
### Client
* It uses the vite module bundler, to start ust run this command in your CLI ``` npm run dev ```
