import React, { Component } from 'react'
import Snap from 'snapsvg-cjs'
import ReactSnap from './ReactSnap'

import AccessTime from '@material-ui/icons/AccessTime'
import Brush from '@material-ui/icons/Brush'
import Bubble from '@material-ui/icons/BubbleChart'
import Build from '@material-ui/icons/Build'
import Check from '@material-ui/icons/Check'
import Face from '@material-ui/icons/Face'
import Map from '@material-ui/icons/Map'
import MergeType from '@material-ui/icons/MergeType'
import Timelapse from '@material-ui/icons/Timelapse'
import Wash from '@material-ui/icons/LocalCarWash'

import './App.css'

function ColorLuminance(hex, lum) {

  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '')
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  lum = lum || 0

  // convert to decimal and change luminosity
  var rgb = "#", c, i
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16)
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
    rgb += ("00" + c).substr(c.length)
  }

  return rgb
}

function drawPieSection(snap, center, rIn, rOut, startDeg, delta, attr) {
  const startOut = {
    x: center.x + rOut * Math.cos(Math.PI * (startDeg) / 180),
    y: center.y + rOut * Math.sin(Math.PI * (startDeg) / 180)
  }

  const endOut = {
    x: center.x + rOut * Math.cos(Math.PI * (startDeg + delta) / 180),
    y: center.y + rOut * Math.sin(Math.PI * (startDeg + delta) / 180)
  }

  const startIn = {
    x: center.x + rIn * Math.cos(Math.PI * (startDeg + delta) / 180),
    y: center.y + rIn * Math.sin(Math.PI * (startDeg + delta) / 180)
  }

  const endIn = {
    x: center.x + rIn * Math.cos(Math.PI * (startDeg) / 180),
    y: center.y + rIn * Math.sin(Math.PI * (startDeg) / 180)
  }

  const largeArc = delta > 180 ? 1 : 0

  const svgPath =
    `M${startOut.x},${startOut.y}` +
    ` A${rOut},${rOut}` +
    ` 0 ${largeArc},1 ${endOut.x},${endOut.y}` +
    ` L${startIn.x},${startIn.y}` +
    ` A${rIn},${rIn}` +
    ` 0 ${largeArc},0 ${endIn.x},${endIn.y}` +
    ` L${startOut.x},${startOut.y} Z`

  const path = snap.path(svgPath)
  path.attr(attr)
  return path
}

class App extends Component {
  constructor(props) {
    super(props)
    const fontSize = 12
    const iconWidth = 60
    this.state = {
      clones: {},
      circles: [
        {
          activeFill: '#00295B',
          passiveFill: '#DDD',
          icon: 'accesstime',
          iconWidth: iconWidth,
          text: 'In Lot',
          fontSize: fontSize,
          percentage: 0
        },
        {
          activeFill: '#00632B',
          passiveFill: '#DDD',
          icon: 'map',
          iconWidth: iconWidth,
          text: 'Blue-Printing',
          fontSize: fontSize,
          percentage: 0
        },
        {
          activeFill: '#8B1D00',
          passiveFill: '#DDD',
          icon: 'timelapse',
          iconWidth: iconWidth,
          text: 'Waiting On Parts',
          fontSize: fontSize,
          percentage: 0
        },
        {
          activeFill: '#8B5500',
          passiveFill: '#DDD',
          icon: 'build',
          iconWidth: iconWidth,
          text: 'Repairing',
          fontSize: fontSize,
          percentage: 0
        },
        {
          activeFill: '#00387A',
          passiveFill: '#DDD',
          icon: 'timelapse2',
          iconWidth: iconWidth,
          text: 'Waiting for Paint',
          fontSize: fontSize,
          percentage: 0
        },
        {
          activeFill: '#00853A',
          passiveFill: '#DDD',
          icon: 'brush',
          iconWidth: iconWidth,
          text: 'Painting',
          fontSize: fontSize,
          percentage: 0
        },
        {
          activeFill: '#BB2700',
          passiveFill: '#DDD',
          icon: 'timelapse3',
          iconWidth: iconWidth,
          text: 'Waiting For Reassmble',
          fontSize: fontSize,
          percentage: 0
        },
        {
          activeFill: '#BB7200',
          passiveFill: '#DDD',
          icon: 'mergetype',
          iconWidth: iconWidth,
          text: 'Reassmble',
          fontSize: fontSize,
          percentage: 0
        },
        {
          activeFill: '#004598',
          passiveFill: '#DDD',
          icon: 'timelapse4',
          iconWidth: iconWidth,
          text: 'Waiting For Polish',
          fontSize: fontSize,
          percentage: 0
        },
        {
          activeFill: '#00A648',
          passiveFill: '#DDD',
          icon: 'bubble',
          iconWidth: iconWidth,
          text: 'Polish',
          fontSize: fontSize,
          percentage: 0
        },
        {
          activeFill: '#E83000',
          passiveFill: '#DDD',
          icon: 'timelapse5',
          iconWidth: iconWidth,
          text: 'Waiting For Wash',
          fontSize: fontSize,
          percentage: 0
        },
        {
          activeFill: '#E88E00',
          passiveFill: '#DDD',
          icon: 'wash',
          iconWidth: iconWidth,
          text: 'Wash',
          fontSize: fontSize,
          percentage: 0
        },
        {
          activeFill: '#005BC8',
          passiveFill: '#DDD',
          icon: 'check',
          iconWidth: iconWidth,
          text: 'Quality Control',
          fontSize: fontSize,
          percentage: 0
        },
        {
          activeFill: '#00D15B',
          passiveFill: '#DDD',
          icon: 'timelapse6',
          iconWidth: iconWidth,
          text: 'In Lot',
          fontSize: fontSize,
          percentage: 0
        },
        {
          activeFill: '#FF3500',
          passiveFill: '#DDD',
          icon: 'face',
          iconWidth: iconWidth,
          text: 'Waiting For Customer',
          fontSize: fontSize,
          percentage: 0
        },
      ]
    }
  }

  componentDidMount() {
    setTimeout(
      function () {
        var circles = this.state.circles
        var index = circles.findIndex(c => c.percentage < 100)
        if (index === -1)
          return
        circles[index].percentage += 5
        this.setState({ circles: circles })
        //this.componentDidMount()
      }.bind(this),
      5
    );
  }

  render() {

    const chunkSize = 8
    var circleGroups = [];
    while (this.state.circles.length) {
      circleGroups.push(this.state.circles.splice(0, chunkSize));
    }
    
    return (
      <div >
        <AccessTime id='accesstime' style={{ display: 'none' }} />
        <Brush id='brush' style={{ display: 'none' }} />
        <Bubble id='bubble' style={{ display: 'none' }} />
        <Build id='build' style={{ display: 'none' }} />
        <Check id='check' style={{ display: 'none' }} />
        <Face id='face' style={{ display: 'none' }} />
        <Map id='map' style={{ display: 'none' }} />
        <MergeType id='mergetype' style={{ display: 'none' }} />
        <Timelapse id='timelapse' style={{ display: 'none' }} />
        <Timelapse id='timelapse2' style={{ display: 'none' }} />
        <Timelapse id='timelapse3' style={{ display: 'none' }} />
        <Timelapse id='timelapse4' style={{ display: 'none' }} />
        <Timelapse id='timelapse5' style={{ display: 'none' }} />
        <Timelapse id='timelapse6' style={{ display: 'none' }} />
        <Wash id='wash' style={{ display: 'none' }} />
        <ReactSnap className='App-header' props>
          {snap => {

            const xOffset = 0
            const textOffset = 25
            const rowOffset = 45
            const donutWidth = 25
            const radius = 70
            const diameter = 2 * radius
            const maxRow = 8

            const attr = {
              stroke: '#000',
              strokeWidth: 0,
              height: '170px'
            }

            this.state.circles.forEach((c, i) => {
              const rowIndex = Math.floor(i / maxRow)
              const circleNumber = i % maxRow
              const x = (circleNumber * diameter) - (circleNumber * donutWidth) + radius + xOffset
              const y = radius + (rowIndex * diameter) + (rowIndex * rowOffset) + xOffset

              drawPieSection(snap,
                { x, y },
                radius - donutWidth, radius,
                0, 180,
                {
                  ...attr,
                  fill: c.passiveFill,
                  fillOpacity: 1
                }
              )

              drawPieSection(snap,
                { x, y },
                radius - donutWidth, radius,
                180, 180,
                {
                  ...attr,
                  fill: c.passiveFill,
                  fillOpacity: 1
                }
              )
            })

            this.state.circles.forEach(function (c, i) {
              const circleNumber = i % maxRow
              const x = (circleNumber * diameter) - (circleNumber * donutWidth) + radius + xOffset

              const percentageComplete = (c.percentage ? c.percentage : 100) * .01
              const rowIndex = Math.floor(i / maxRow)
              const y = radius + (rowIndex * diameter) + (rowIndex * rowOffset) + xOffset
              const pie = drawPieSection(snap,
                { x, y },
                c.percentage !== 0
                  ? radius - donutWidth
                  : radius - (donutWidth * .5) - 1,
                c.percentage !== 0
                  ? radius
                  : radius - (donutWidth * .5) + 1,
                circleNumber % 2 !== 0
                  ? 180 - (180 * percentageComplete)
                  : 180, 180 * percentageComplete,
                {
                  ...attr,
                  fill: c.activeFill,
                }
              )

              var icon
              const iconElement = document.getElementById(c.icon)
              const clone = iconElement.cloneNode(true)
              if (c.icon) {
                icon = Snap(clone)
                if (!icon)
                  throw new Error(`Icon ${c.icon} was not found`)

                icon.attr({
                  display: 'block',
                  width: c.iconWidth,
                  x: x - (c.iconWidth * .5),
                  color: c.activeFill
                })
                snap.append(icon)
                const svgHeight = snap.getBBox().height
                const iconHeight = 24
                const iconY = -(svgHeight / 2) + radius - iconHeight + (rowIndex * (rowOffset + textOffset + diameter))
                console.log(c.icon, rowIndex, svgHeight, snap.getBBox().height, iconHeight, iconY)
                icon.attr({
                  y: iconY,
                })

                console.log(c.icon, rowIndex, svgHeight, snap.getBBox().height, iconHeight, iconY)
              }

              if (false && c.percentage > 0 && c.percentage < 100) {
                const lum = ColorLuminance(c.activeFill, .8)
                const blink = (active) => {
                  const fillColor = active ? lum : c.activeFill
                  pie.animate({
                    fill: fillColor
                  }, 1500, () => {
                    blink(!active)
                  })

                  if (icon) {
                    icon.animate({
                      fill: fillColor
                    }, 1500, () => {
                      blink(!active)
                    })
                  }
                }
                blink(true)
              }

              const textY = diameter + (rowIndex * diameter) + (rowIndex * rowOffset) + xOffset + textOffset
              const text = snap.text(x, 2 * radius + textOffset, c.text)
              text.attr({
                'font-size': c.fontSize,
                'font-weight': 'bold',
                fill: c.textFill
              })

              const textWidth = text.getBBox().width
              text.attr({
                x: x - (textWidth * .5),
                y: textY
              })
            }.bind(this))
          }}
        </ReactSnap>
      </div>
    )
  }
}

export default App