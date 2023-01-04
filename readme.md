[Back to Portfolio](https://github.com/Fooxless/Portfolio-Connor-Gryphon)

# MashFoodie Web App [2022]
The purpose of this cloud application is to allow an individual to generate a random image then download it in a variety of formats depending on how they would like to use it. Currently the different support formats are HD, HDV, 2k and 4k. The idea here, is that they don’t have to explicitly specify a single format, they can download the HD and 4k versions if they wish. In addition to generating and downloading a random image, a user is also able to go back through the global history and retrieve a recent previously downloaded image if it appears within the last 10 images generated.

![screenshot 3](https://user-images.githubusercontent.com/102510556/210462750-205a331d-561e-410e-84e4-192bc52521c8.PNG)

![screenshot 4](https://user-images.githubusercontent.com/102510556/210462756-713a96eb-61a9-4303-a840-2f16539af41c.PNG)

This cloud application was also set to scale depending on a load balancer managing a small cluster of ec2 instances. The load was generated from the image transformations of the random unsplash image to the differing resolutions. The architecture was created to support this scaling.

![Architecture](https://user-images.githubusercontent.com/102510556/210462939-4782c78c-3fde-465e-b921-43f446ca8c83.png)


### Getting Started
This application requires:
 - AWS credentials 
 
Build your client application first
``` 
cd client
npm run build
```

Start the server
```
cd ../server
node index.js
```

Open your browser and navigate to localhost:3000

*This project was a university assignment.*

*Other Team Members include: Mike Senna*
