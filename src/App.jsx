import React, { Component } from 'react'
import RingProgress from './RingProgress'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import AccessTime from '@material-ui/icons/AccessTime'
import Brush from '@material-ui/icons/Brush'
import Bubble from '@material-ui/icons/BubbleChart'
import Build from '@material-ui/icons/Build'
import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'
import Face from '@material-ui/icons/Face'
import Map from '@material-ui/icons/Map'
import MergeType from '@material-ui/icons/MergeType'
import Pause from '@material-ui/icons/Pause'
import Play from '@material-ui/icons/PlayArrow'
import Timelapse from '@material-ui/icons/Timelapse'
import Wash from '@material-ui/icons/LocalCarWash'

import styles from './AppStyles'

const fontSize = 12
const iconWidth = 60
const demoCircles = [
  {
    activeFill: '#00295B',
    passiveFill: '#DDD',
    icon: 'accesstime',
    iconWidth: iconWidth,
    text: 'In Lot',
    fontSize: fontSize,
    percentage: 100
  },
  {
    activeFill: '#00632B',
    passiveFill: '#DDD',
    icon: 'map',
    iconWidth: iconWidth,
    text: 'Blue-Printing',
    fontSize: fontSize,
    percentage: 50
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
    text: 'Waiting For Re-assemble',
    fontSize: fontSize,
    percentage: 0
  },
  {
    activeFill: '#BB7200',
    passiveFill: '#DDD',
    icon: 'mergetype',
    iconWidth: iconWidth,
    text: 'Re-assemble',
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
  }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfCircles: 5,
      radius: 70,
      donutWidth: 25,
      animate: false,
      demo: false,
      itemsPerRow: 3
    }
  }

  // Demo
  demo(running) {
    if (!running)
      return;
    setTimeout(
      function () {
        var circles = demoCircles.slice(0, this.state.numberOfCircles)
        var index = circles.findIndex(c => c.percentage < 100)
        if (index === -1)
          return
        circles[index].percentage += 5
        this.setState({ circles: circles })
        this.demo(this.state.demo)
      }.bind(this),
      500
    );
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { classes } = this.props;

    const ringProgressProps = { ...this.state }
    ringProgressProps.circles = demoCircles.slice(0, this.state.numberOfCircles)
    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container>
              <Grid item>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="number-of-circles">Number Of Circles</InputLabel>
                  <Select
                    value={this.state.numberOfCircles}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'numberOfCircles',
                      id: 'number-of-circles',
                    }}
                  >
                    <MenuItem value={1}>One</MenuItem>
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={3}>Three</MenuItem>
                    <MenuItem value={4}>Four</MenuItem>
                    <MenuItem value={5}>Five</MenuItem>
                    <MenuItem value={6}>Six</MenuItem>
                    <MenuItem value={7}>Seven</MenuItem>
                    <MenuItem value={8}>Eight</MenuItem>
                    <MenuItem value={9}>Nine</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={11}>Eleven</MenuItem>
                    <MenuItem value={12}>Twelve</MenuItem>
                    <MenuItem value={13}>Thirteen</MenuItem>
                    <MenuItem value={14}>Fourteen</MenuItem>
                    <MenuItem value={15}>Fifteen</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="itemsPerRow">Number Per Row</InputLabel>
                  <Select
                    value={this.state.itemsPerRow}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'itemsPerRow',
                      id: 'itemsPerRow',
                    }}
                  >
                    <MenuItem value={1}>One</MenuItem>
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={3}>Three</MenuItem>
                    <MenuItem value={4}>Four</MenuItem>
                    <MenuItem value={5}>Five</MenuItem>
                    <MenuItem value={6}>Six</MenuItem>
                    <MenuItem value={7}>Seven</MenuItem>
                    <MenuItem value={8}>Eight</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item className={classes.toggle}>
                  <div className={classes.animateLabel}>
                    Animate
                  </div>
                  <ToggleButtonGroup
                    value={this.state.animate}
                    exclusive
                    onChange={(event, toggleValue) => {
                      this.setState({ animate: toggleValue })
                    }}
                    >
                    <ToggleButton value={true}>
                      <Check />
                    </ToggleButton>
                    <ToggleButton value={false}>
                      <Close />
                    </ToggleButton>
                  </ToggleButtonGroup>
              </Grid>
              <Grid item>
                  <div className={classes.animateLabel}>
                    Demo
                  </div>
                  <ToggleButtonGroup
                    value={this.state.demo}
                    exclusive
                    onChange={(event, toggleValue) => {
                      this.setState({ demo: toggleValue })
                      this.demo(toggleValue)
                    }}
                    >
                    <ToggleButton value={true}>
                      <Play />
                    </ToggleButton>
                    <ToggleButton value={false}>
                      <Pause />
                    </ToggleButton>
                  </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
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
          <RingProgress {...ringProgressProps} classes={classes} />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(App)