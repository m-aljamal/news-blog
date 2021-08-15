import React from 'react'

export default function ButtonWithIcon({text,icon,...props}) {
    return (
        <div>
            {props.children}
            {icon}
        </div>
    )
}
