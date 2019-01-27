import React, { Component } from 'react'
import Snap from 'snapsvg-cjs'
import ReactSnap from './ReactSnap'

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

function drawIcon(snap, c, x, y) {
  var icon
  const iconElement = document.getElementById(c.icon)
  const clone = iconElement.cloneNode(true)
  if (c.icon) {
    icon = Snap(clone)
    if (!icon)
      throw new Error(`Icon ${c.icon} was not found`)

    icon.attr({
      preserveAspectRatio: "xMinYMin meet",
      display: 'block',
      width: c.iconWidth,
      x: x - (c.iconWidth * .5),
      y: y - (c.iconWidth * .5),
      color: c.activeFill
    })
    snap.append(icon)
    return icon
  }
}

class RingProgress extends Component {
  
  render() {
    const { classes } = this.props
    const textOffset = 25
    const rowOffset = 45
    const diameter = 2 * this.props.radius

    const numRows = Math.ceil(this.props.circles.length/this.props.itemsPerRow) 
    const height = numRows * (diameter + textOffset + rowOffset)
    const width = this.props.itemsPerRow * diameter
    return (
      <div style={{height: height + 'px', width: width + 'px'}}>
        <ReactSnap className={classes.ringProgress} classes props>
          {snap => {
            
            const noOuterLines = {
              stroke: '#000',
              strokeWidth: 0
            }

            this.props.circles.forEach((c, i) => {
              const rowIndex = Math.floor(i / this.props.itemsPerRow)
              const circleNumber = i % this.props.itemsPerRow
              const x = (circleNumber * diameter) - (circleNumber * this.props.donutWidth) + this.props.radius
              const y = this.props.radius + (rowIndex * diameter) + (rowIndex * rowOffset)

              drawPieSection(snap,
                { x, y },
                this.props.radius - this.props.donutWidth, this.props.radius,
                0, 180,
                {
                  ...noOuterLines,
                  fill: c.passiveFill,
                  fillOpacity: 1
                }
              )

              drawPieSection(snap,
                { x, y },
                this.props.radius - this.props.donutWidth, this.props.radius,
                180, 180,
                {
                  ...noOuterLines,
                  fill: c.passiveFill,
                  fillOpacity: 1
                }
              )
            })

            this.props.circles.forEach(function (c, i) {
              const circleNumber = i % this.props.itemsPerRow
              const x = (circleNumber * diameter) - (circleNumber * this.props.donutWidth) + this.props.radius

              const percentageComplete = (c.percentage ? c.percentage : 100) * .01
              const rowIndex = Math.floor(i / this.props.itemsPerRow)
              const y = this.props.radius + (rowIndex * diameter) + (rowIndex * rowOffset)
              const pie = drawPieSection(snap,
                { x, y },
                c.percentage !== 0
                  ? this.props.radius - this.props.donutWidth
                  : this.props.radius - (this.props.donutWidth * .5) - 1,
                c.percentage !== 0
                  ? this.props.radius
                  : this.props.radius - (this.props.donutWidth * .5) + 1,
                circleNumber % 2 !== 0
                  ? 180 - (180 * percentageComplete)
                  : 180, 180 * percentageComplete,
                {
                  ...noOuterLines,
                  fill: c.activeFill,
                }
              )

              if (this.props.animate && c.percentage > 0 && c.percentage < 100) {
                const lum = ColorLuminance(c.activeFill, .8)
                const blink = (active) => {
                  const fillColor = active ? lum : c.activeFill
                  pie.animate({
                    fill: fillColor
                  }, 1500, () => {
                    blink(!active)
                  })
                }
                blink(true)
              }

            }.bind(this))

            this.props.circles.forEach(function (c, i) {
              const circleNumber = i % this.props.itemsPerRow
              const rowIndex = Math.floor(i / this.props.itemsPerRow)
              const x = (circleNumber * diameter) - (circleNumber * this.props.donutWidth) + this.props.radius
              const y = this.props.radius + (rowIndex * diameter) + (rowIndex * rowOffset)
              
              drawIcon(snap, c, x, y, rowIndex, rowOffset, diameter)
            }.bind(this))

            this.props.circles.forEach(function (c, i) {
              const circleNumber = i % this.props.itemsPerRow
              const x = (circleNumber * diameter) - (circleNumber * this.props.donutWidth) + this.props.radius

              const rowIndex = Math.floor(i / this.props.itemsPerRow)
              const textY = diameter + (rowIndex * diameter) + (rowIndex * rowOffset) + textOffset
              const text = snap.text(x, 2 * this.props.radius + textOffset, c.text)
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

export default RingProgress