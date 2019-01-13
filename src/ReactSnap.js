import React, { Component } from 'react'
import Snap from 'snapsvg-cjs'

const isFn = val => typeof val === "function"

export default class extends Component {
    componentDidMount() {
        const { children } = this.props
        if (this.svg && isFn(children)) {
            const snap = Snap(this.svg)
            snap.clear()
            children(snap)
        }
    }

    componentWillUpdate() {
        const { children } = this.props
        if (this.svg && isFn(children)) {
            const snap = Snap(this.svg)
            snap.clear()
            children(snap)
        }
    }

    render() {
        console.log('react snap')
        const { children, ...props } = this.props
        return (
            <svg
                {...props}
                ref={inst => {
                    if (inst) {
                        this.svg = inst
                    }
                }}
            >
                {!isFn(children) ? children : undefined}
            </svg>
        )
    }
}