React component for displaying states in a ring based progress bar

![alt text](https://github.com/jeffras/react-ring-progress/blob/master/sample.PNG)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### USAGE

import RingProgress from 'RingProgress'
...
const ringProgressProps = {
  circles: [...],   // circles to display
  radius: 70,       // radius of circle
  donutWidth: 25,   // width of donut bar
  animate: false,   // animate the color of the in progress section
  demo: false,      // simulate the progress bar
  itemsPerRow: 3    // number of circles to display per row
}
<RingProgress {...ringProgressProps} classes={classes} />

### API

circles are defined as :
  {
    activeFill: '#00295B',  // Color of the active portion of the donut
    passiveFill: '#DDD',    // Color of the passive portion of the donut
    icon: 'accesstime',     // name of the material ui icon to display
    iconWidth: iconWidth,   // width of the icon
    text: 'In Lot',         // Text
    fontSize: fontSize,     // font size of text
    percentage: 100         // percentage to fill the donut
  }
  
