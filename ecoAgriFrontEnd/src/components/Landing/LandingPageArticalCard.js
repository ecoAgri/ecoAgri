import { Typography } from '@mui/material'
import React from 'react'

function LandingPageArticalCard(props) {
    return (
        <section className="flex-content padding_1x inline-photo show-on-scroll">
            <figure>
                <img src={props.image} alt="" />
                <article>
                    <span className="padding_1x">
                        <p><b>{props.title}</b></p>
                        <p>{props.content}</p>
                    </span>
                </article>
            </figure>
        </section>
    )
}

export default LandingPageArticalCard